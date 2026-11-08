import { digest } from './release-policy.mjs';

const sha = /^[a-f0-9]{40}$/;
const assets = ['article', 'cover', 'shareCover'];

export function weeklyReservationKey({ cycle, stage, reviewSlot }) {
  const singleStages = ['select', 'topic-review', 'rank', 'release'];
  const reviewStages = ['article', 'article-review'];
  if (!/^\d{4}-\d{2}-\d{2}$/.test(cycle)) throw new Error('Invalid cycle');
  if (singleStages.includes(stage) && reviewSlot === 0) return `${cycle}/${stage}`;
  if (reviewStages.includes(stage) && Number.isInteger(reviewSlot) && reviewSlot >= 1 && reviewSlot <= 4) {
    return `${cycle}/${stage}/${reviewSlot}`;
  }
  throw new Error('Invalid weekly stage or review slot');
}

// The caller must verify receipt provenance and fetch the candidate bytes
// from the specified Git head before calling this content check.
export function assertWeeklyRelease({ candidate, releaseSlot, bytes, receipts }) {
  if (releaseSlot?.stage !== 'release' || candidate.cycle !== releaseSlot.cycle ||
      candidate.publishedAt !== releaseSlot.date || !sha.test(candidate.head)) {
    throw new Error('Candidate does not match the Monday release slot');
  }
  if (!Number.isInteger(candidate.reviewSlot) || candidate.reviewSlot < 1 || candidate.reviewSlot > 4 ||
      !Number.isInteger(candidate.correctionRounds) || candidate.correctionRounds < 0 ||
      candidate.correctionRounds >= candidate.reviewSlot ||
      !Number.isInteger(candidate.imageGenerations) || candidate.imageGenerations < 0 ||
      candidate.imageGenerations > 4) {
    throw new Error('Invalid review or image budget');
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
