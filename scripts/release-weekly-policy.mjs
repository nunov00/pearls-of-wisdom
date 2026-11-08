import { digest, validateRelease } from './release-policy.mjs';

const sha = /^[a-f0-9]{40}$/;
const assets = ['article', 'cover', 'shareCover'];

function tuesday(cycle) {
  if (typeof cycle !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(cycle)) throw new Error('Invalid cycle');
  const start = new Date(cycle + 'T00:00:00Z');
  if (start.getUTCDay() !== 2 || start.toISOString().slice(0, 10) !== cycle) throw new Error('Invalid Tuesday cycle');
  return start;
}

export function weeklyReservationKey({ cycle, stage, reviewSlot }) {
  const singleStages = ['select', 'topic-review', 'rank', 'release', 'outcome'];
  const reviewStages = ['article', 'article-review'];
  tuesday(cycle);
  if (singleStages.includes(stage) && reviewSlot === 0) return `${cycle}/${stage}`;
  if (reviewStages.includes(stage) && Number.isInteger(reviewSlot) && reviewSlot >= 1 && reviewSlot <= 4) {
    return `${cycle}/${stage}/${reviewSlot}`;
  }
  throw new Error('Invalid weekly stage or review slot');
}

// The caller must verify receipt provenance and fetch the candidate bytes
// from the specified Git head before calling this content check.
export function assertWeeklyRelease({ candidate, releaseSlot, bytes, receipts }) {
  const monday = tuesday(candidate.cycle);
  monday.setUTCDate(monday.getUTCDate() + 6);
  if (candidate.publishedAt !== monday.toISOString().slice(0, 10) || releaseSlot?.stage !== 'release' || candidate.cycle !== releaseSlot.cycle ||
      candidate.publishedAt !== releaseSlot.date || typeof candidate.head !== 'string' || !sha.test(candidate.head)) {
    throw new Error('Candidate does not match the Monday release slot');
  }
  if (!Number.isInteger(candidate.reviewSlot) || candidate.reviewSlot < 1 || candidate.reviewSlot > 4 ||
      !Number.isInteger(candidate.correctionRounds) || candidate.correctionRounds < 0 ||
      candidate.correctionRounds >= candidate.reviewSlot ||
      !Number.isInteger(candidate.imageGenerations) || candidate.imageGenerations < 1 ||
      candidate.imageGenerations > 4) {
    throw new Error('Invalid review or image budget');
  }

  if (typeof candidate.articleId !== 'string' || !/^[a-z0-9-]+$/.test(candidate.articleId) ||
      !/^src\/content\/articles\/[a-z0-9-]+\.yaml$/.test(candidate.paths?.article) ||
      !/^public\/figures\/[a-z0-9-]+\.(png|jpg|webp)$/.test(candidate.paths?.cover) ||
      !/^public\/figures\/[a-z0-9-]+\.(png|jpg)$/.test(candidate.paths?.shareCover)) {
    throw new Error('Invalid weekly article identity or asset paths');
  }
  const hashes = Object.fromEntries(assets.map((asset) => {
    if (!(bytes?.[asset] instanceof Uint8Array) || bytes[asset].length === 0) {
      throw new Error(`Missing ${asset} bytes`);
    }
    return [asset, digest(bytes[asset])];
  }));
  if (assets.some((asset) => candidate.hashes?.[asset] !== hashes[asset])) {
    throw new Error('Candidate manifest does not match Git bytes');
  }
  if (!Array.isArray(receipts) || receipts.length !== 2) throw new Error('Two review receipts required');
  for (const [role, provider] of [['author', 'codex'], ['reviewer', 'claude']]) {
    const matches = receipts.filter((receipt) => receipt?.role === role);
    const receipt = matches[0];
    if (matches.length !== 1 || receipt.provider !== provider || receipt.cycle !== candidate.cycle ||
        receipt.articleId !== candidate.articleId ||
        assets.some((asset) => receipt.paths?.[asset] !== candidate.paths[asset]) ||
        receipt.head !== candidate.head || receipt.reviewSlot !== candidate.reviewSlot ||
        receipt.decision !== 'ready' || assets.some((asset) => receipt.hashes?.[asset] !== hashes[asset])) {
      throw new Error(`Missing or stale ${role} receipt`);
    }
    if (![receipt.articleScore, receipt.coverScore].every((score) => Number.isFinite(score) && score >= 9 && score <= 10)) {
      throw new Error(`${role} article and cover scores must both be at least 9/10`);
    }
    if (!Array.isArray(receipt.findings) || receipt.findings.some((finding) =>
      !['blocker', 'important', 'minor'].includes(finding?.severity) ||
      !['open', 'resolved'].includes(finding?.status) ||
      (finding.severity !== 'minor' && finding.status !== 'resolved'))) {
      throw new Error(`${role} has unresolved or invalid findings`);
    }
  }
}

/**
 * Validate a weekly intent alongside existing release records. The integration
 * must derive articlePath, parsed article data and bytes from the same Git head,
 * authenticate both receipts, and bind the intent to the reserved cycle.
 */
export function validateWeeklyRelease(evidence, existing, articlePath) {
  assertWeeklyRelease(evidence);
  const { candidate, bytes, receipts, releaseSlot } = evidence;
  const article = existing.articles.find(({ id }) => id === candidate.articleId);
  if (!article || articlePath !== candidate.paths.article ||
      candidate.paths.cover !== 'public' + article.mainImage?.src ||
      candidate.paths.shareCover !== 'public' + article.mainImage?.shareSrc) {
    throw new Error('Weekly intent does not match the article and its image paths');
  }
  const reviewId = `weekly:${candidate.cycle}:${candidate.articleId}`;
  if (existing.reviews.some(({ id }) => id === reviewId)) throw new Error('Duplicate weekly review record');
  return validateRelease({
    ...existing,
    today: releaseSlot.date,
    bytesById: { ...existing.bytesById, [candidate.articleId]: bytes.article },
    publications: [...existing.publications, {
      articleId: candidate.articleId, state: 'published', publishedAt: candidate.publishedAt, reviewId,
    }],
    reviews: [...existing.reviews, {
      id: reviewId, articleId: candidate.articleId, author: 'Codex', reviewer: 'Claude',
      reviewedCommit: candidate.head, articleSha256: candidate.hashes.article,
      correctionRounds: candidate.correctionRounds, decision: 'ready',
      findings: receipts.flatMap(({ findings }) => findings),
    }],
  });
}
