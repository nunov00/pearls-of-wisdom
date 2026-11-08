import assert from 'node:assert/strict';
import test from 'node:test';
import { abandonWeeklyStage, completeWeeklyStage, startWeeklyStage } from '../scripts/release-weekly-ledger.mjs';

const time = '2026-11-10T08:13:00Z';
const account = 'owner';
const slot = { cycle: '2026-11-10', stage: 'select', reviewSlot: 0 };
const comment = (body, id) => ({ body, id, user: { login: account }, created_at: time, updated_at: time });

test('records a unique stage and refuses a replay', async () => {
  const entries = [];
  const input = { account, slot, runId: 'first', readComments: async () => entries,
    appendComment: async (body) => {
      const entry = comment(body, 1);
      entries.push(entry);
      return entry;
    } };
  assert.equal((await startWeeklyStage(input)).commentId, 1);
  await assert.rejects(startWeeklyStage({ ...input, runId: 'second' }), /already recorded/);
  await assert.rejects(startWeeklyStage({ ...input, runId: 'second', slot: { ...slot, stage: 'rank' } }), /incomplete/);
});

test('stops if another start appears before readback', async () => {
  const entries = [];
  await assert.rejects(startWeeklyStage({ account, slot, runId: 'first', readComments: async () => entries,
    appendComment: async (body) => {
      entries.push(comment(body, 1), comment(body.replace('first', 'second'), 2));
      return entries[0];
    } }), /ambiguous/);
});

test('stops on an edited entry or a lost write response', async () => {
  const input = { account, slot, runId: 'first', readComments: async () => [],
    appendComment: async () => { throw new Error('write response lost'); } };
  await assert.rejects(startWeeklyStage(input), /write response lost/);
  await assert.rejects(startWeeklyStage({ ...input, readComments: async () =>
    [{ ...comment('pearls-weekly {}', 1), updated_at: '2026-11-10T08:14:00Z' }] }), /Edited/);
});

test('different stages cannot both pass readback when their starts overlap', async () => {
  const entries = [];
  const input = { account, readComments: async () => [...entries],
    appendComment: async (body) => {
      const entry = comment(body, entries.length + 1);
      entries.push(entry);
      return entry;
    } };
  const results = await Promise.allSettled([
    startWeeklyStage({ ...input, slot, runId: 'first' }),
    startWeeklyStage({ ...input, slot: { ...slot, stage: 'rank' }, runId: 'second' }),
  ]);
  assert.equal(entries.length, 2);
  assert.ok(results.every((result) => result.status === 'rejected' && /Another stage/.test(result.reason.message)));
});

for (const [type, close] of [['complete', completeWeeklyStage], ['abandoned', abandonWeeklyStage]]) {
  test(`${type} unblocks the next stage without reopening the original slot`, async () => {
    const entries = [];
    const input = { account, readComments: async () => [...entries],
      appendComment: async (body) => {
        const entry = comment(body, entries.length + 1);
        entries.push(entry);
        return entry;
      } };
    const start = await startWeeklyStage({ ...input, slot, runId: 'first' });
    const next = { ...input, slot: { ...slot, stage: 'rank' }, runId: 'second' };
    await input.appendComment('pearls-weekly ' + JSON.stringify({ type, key: start.key, runId: 'wrong' }));
    await assert.rejects(startWeeklyStage(next), /incomplete/);
    assert.equal((await close({ ...input, start })).type, type);
    await assert.rejects(close({ ...input, start }), /already closed/);
    await assert.rejects(startWeeklyStage({ ...input, slot, runId: 'replay' }), /already recorded/);
    assert.equal((await startWeeklyStage(next)).runId, 'second');
  });
}
