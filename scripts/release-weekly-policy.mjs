import { isDeepStrictEqual } from 'node:util';
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

// Inputs are fetched by trusted code from the base, reviewed and final Git
// trees. The caller verifies exact-head technical approval and ledger identity.
export function validateWeeklyRelease(evidence, existing, articlePath, baseRecords, changedAfterReview) {
  assertWeeklyRelease(evidence);
  const { candidate, bytes, receipts, releaseSlot } = evidence;
  const article = existing.articles.find(({ id }) => id === candidate.articleId);
  if (!article || articlePath !== candidate.paths.article ||
      candidate.paths.cover !== 'public' + article.mainImage?.src ||
      candidate.paths.shareCover !== 'public' + article.mainImage?.shareSrc) {
    throw new Error('Weekly intent does not match the article and its image paths');
  }
  if (candidate.reviewSlot >= 4) throw new Error('No technical review slot remains');
  const recordPaths = ['editorial/publications.json', 'editorial/reviews.json'];
  if (!isDeepStrictEqual([...changedAfterReview].sort(), recordPaths)) {
    throw new Error('Only publication and review records may change after editorial review');
  }
  const publication = existing.publications.at(-1);
  const review = existing.reviews.at(-1);
  if (!isDeepStrictEqual(existing.publications.slice(0, -1), baseRecords.publications) ||
      !isDeepStrictEqual(existing.reviews.slice(0, -1), baseRecords.reviews) ||
      !publication || !review || !review.id || baseRecords.reviews.some(({ id }) => id === review.id) ||
      publication.articleId !== candidate.articleId || publication.state !== 'published' ||
      publication.publishedAt !== candidate.publishedAt || publication.reviewId !== review.id ||
      review.articleId !== candidate.articleId || review.reviewedCommit !== candidate.head ||
      review.articleSha256 !== candidate.hashes.article || review.correctionRounds !== candidate.correctionRounds ||
      review.author !== 'Codex (OpenAI)' || review.reviewer !== 'Claude (Anthropic)' ||
      !isDeepStrictEqual(review.findings, receipts.flatMap(({ findings }) => findings)) ||
      Object.entries(candidate.paths).some(([asset, path]) =>
        asset !== 'article' && review.illustrationSha256?.[path] !== candidate.hashes[asset])) {
    throw new Error('Final release records do not match the verified receipts');
  }
  return validateRelease({
    ...existing,
    today: releaseSlot.date,
    bytesById: { ...existing.bytesById, [candidate.articleId]: bytes.article },
  });
}
