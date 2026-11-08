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

const endings = ['complete', 'abandoned'];

function isOpenStart(entry, entries) {
  return entry.type === 'start' && !entries.some((end) => endings.includes(end.type) &&
    end.key === entry.key && end.runId === entry.runId && end.commentId > entry.commentId);
}

// The caller checks previous-cycle closure. Deleted comments are not observable.
// readComments must fetch every page from the configured ledger issue.
// A post or readback error is terminal for this dispatch.
export async function startWeeklyStage({ readComments, appendComment, account, slot, runId }) {
  if (typeof runId !== 'string' || !runId.trim()) throw new Error('Run ID required');
  const key = weeklyReservationKey(slot);
  const entries = readWeeklyLedger(await readComments(), account);
  if (entries.some((entry) => entry.key === key || entry.runId === runId)) {
    throw new Error('Stage already recorded; reconcile before continuing');
  }
  if (entries.some((entry) => entry.key?.startsWith(slot.cycle + '/') && isOpenStart(entry, entries))) throw new Error('Earlier stage is incomplete');

  const created = await appendComment(prefix + JSON.stringify({ type: 'start', key, runId }));
  const readback = readWeeklyLedger(await readComments(), account);
  const starts = readback.filter((entry) => entry.key === key);
  if (starts.length !== 1 || starts[0].type !== 'start' || starts[0].runId !== runId ||
      !Number.isSafeInteger(created?.id) || starts[0].commentId !== created.id) {
    throw new Error('Stage start is ambiguous; stop and reconcile');
  }
  if (readback.some((entry) => entry.key !== key && entry.key?.startsWith(slot.cycle + '/') && isOpenStart(entry, readback))) {
    throw new Error('Another stage is incomplete; stop and reconcile');
  }
  return starts[0];
}

async function endWeeklyStage({ readComments, appendComment, account, start }, type) {
  const entries = readWeeklyLedger(await readComments(), account);
  const matches = entries.filter((entry) => entry.key === start.key && entry.runId === start.runId);
  if (matches.length !== 1 || matches[0].type !== 'start' || matches[0].commentId !== start.commentId) {
    throw new Error('Stage start is missing or already closed; stop and reconcile');
  }
  const created = await appendComment(prefix + JSON.stringify({ type, key: start.key, runId: start.runId }));
  const readback = readWeeklyLedger(await readComments(), account);
  const ends = readback.filter((entry) => entry.key === start.key && entry.runId === start.runId && endings.includes(entry.type));
  if (ends.length !== 1 || ends[0].type !== type || !Number.isSafeInteger(created?.id) ||
      ends[0].commentId !== created.id || created.id <= start.commentId ||
      !readback.some((entry) => entry.type === 'start' && entry.key === start.key &&
        entry.runId === start.runId && entry.commentId === start.commentId)) {
    throw new Error('Stage closure is ambiguous; stop and reconcile');
  }
  return ends[0];
}

export function completeWeeklyStage(input) {
  return endWeeklyStage(input, 'complete');
}

// The caller must first verify that the abandoned run made no mutation.
export function abandonWeeklyStage(input) {
  return endWeeklyStage(input, 'abandoned');
}
