import { weeklyReservationKey } from './release-weekly-policy.mjs';

const prefix = 'pearls-weekly ';

export function readWeeklyLedger(comments, account) {
  if (!Array.isArray(comments) || typeof account !== 'string' || !account) throw new Error('Ledger unavailable');
  return comments.filter(({ body }) => body?.startsWith(prefix)).map((comment) => {
    if (comment.user?.login !== account || !comment.created_at || comment.created_at !== comment.updated_at) {
      throw new Error('Edited or unauthorised ledger entry');
    }
    const entry = JSON.parse(comment.body.slice(prefix.length));
    if (!entry || typeof entry !== 'object') throw new Error('Invalid ledger entry');
    return { ...entry, commentId: comment.id };
  });
}

// readComments must fetch every page from the configured ledger issue.
// A post or readback error is terminal for this dispatch.
export async function startWeeklyStage({ readComments, appendComment, account, slot, runId }) {
  if (typeof runId !== 'string' || !runId.trim()) throw new Error('Run ID required');
  const key = weeklyReservationKey(slot);
  const entries = readWeeklyLedger(await readComments(), account);
  if (entries.some((entry) => entry.key === key || entry.runId === runId)) {
    throw new Error('Stage already recorded; reconcile before continuing');
  }
  const openStart = entries.some((entry) => entry.type === 'start' && entry.key?.startsWith(slot.cycle + '/') &&
    !entries.some((end) => ['complete', 'abandoned'].includes(end.type) &&
      end.key === entry.key && end.runId === entry.runId && end.commentId > entry.commentId));
  if (openStart) throw new Error('Earlier stage is incomplete');

  const created = await appendComment(prefix + JSON.stringify({ type: 'start', key, runId }));
  const readback = readWeeklyLedger(await readComments(), account);
  const starts = readback.filter((entry) => entry.key === key);
  if (starts.length !== 1 || starts[0].type !== 'start' || starts[0].runId !== runId ||
      !Number.isSafeInteger(created?.id) || starts[0].commentId !== created.id) {
    throw new Error('Stage start is ambiguous; stop and reconcile');
  }
  return starts[0];
}
