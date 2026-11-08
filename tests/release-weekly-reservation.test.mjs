import assert from 'node:assert/strict';
import test from 'node:test';
import { reserveWeeklySlot } from '../scripts/release-weekly-reservation.mjs';
import { weeklySlot } from '../scripts/weekly-schedule.mjs';

const evidenceCommit = 'a'.repeat(40);
const input = { owner: 'owner', repo: 'repo', evidenceCommit,
  slot: weeklySlot('codex', new Date('2026-11-10T08:13Z')) };
const ref = 'refs/heads/weekly-reservations/2026-11-10/select';

test('one of two concurrent attempts owns the slot', async () => {
  const refs = new Map();
  const git = {
    async createRef({ ref, sha }) {
      if (refs.has(ref)) throw Object.assign(new Error('Already exists'), { status: 422 });
      refs.set(ref, sha);
      return { status: 201 };
    },
    async getRef({ ref }) {
      const full = 'refs/' + ref;
      return { data: { ref: full, object: { type: 'commit', sha: refs.get(full) } } };
    },
  };
  const results = await Promise.allSettled([
    reserveWeeklySlot({ ...input, git }),
    reserveWeeklySlot({ ...input, git }),
  ]);
  assert.equal(results.filter(({ status }) => status === 'fulfilled').length, 1);
  assert.equal(results.find(({ status }) => status === 'fulfilled').value, ref);
  assert.match(results.find(({ status }) => status === 'rejected').reason.message, /stop and reconcile/);
});

test('an ambiguous creation does not grant permission to proceed', async () => {
  let reads = 0;
  const git = {
    async createRef() { throw new Error('Connection lost'); },
    async getRef() { reads++; },
  };
  await assert.rejects(reserveWeeklySlot({ ...input, git }), /stop and reconcile/);
  assert.equal(reads, 0);
});

test('a different readback commit does not grant permission to proceed', async () => {
  const git = {
    async createRef() { return { status: 201 }; },
    async getRef() { return { data: { ref, object: { type: 'commit', sha: 'b'.repeat(40) } } }; },
  };
  await assert.rejects(reserveWeeklySlot({ ...input, git }), /stop and reconcile/);
});
