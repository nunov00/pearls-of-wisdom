import assert from 'node:assert/strict';
import test from 'node:test';
import { digest } from '../scripts/release-policy.mjs';
import { assertWeeklyRelease, weeklyReservationKey } from '../scripts/release-weekly-policy.mjs';

const cycle = '2026-11-10';
const date = '2026-11-16';
const head = 'a'.repeat(40);
const bytes = { article: Buffer.from('article'), cover: Buffer.from('cover'), shareCover: Buffer.from('share') };
const hashes = Object.fromEntries(Object.entries(bytes).map(([asset, value]) => [asset, digest(value)]));
const candidate = { cycle, publishedAt: date, head, hashes, reviewSlot: 4, correctionRounds: 3, imageGenerations: 4 };
const releaseSlot = { cycle, date, stage: 'release' };
const receipt = { cycle, head, hashes, reviewSlot: 4, decision: 'ready', articleScore: 9, coverScore: 9, findings: [] };
const author = { ...receipt, role: 'author', provider: 'codex' };
const reviewer = { ...receipt, role: 'reviewer', provider: 'claude' };
const evidence = { candidate, releaseSlot, bytes, receipts: [author, reviewer] };

test('accepts an exact Monday candidate with two qualifying receipts', () => {
  assert.doesNotThrow(() => assertWeeklyRelease(evidence));
});

test('rejects changed Git bytes, a different release date and exhausted budgets', () => {
  assert.throws(() => assertWeeklyRelease({ ...evidence, bytes: { ...bytes, shareCover: Buffer.from('replacement') } }), /manifest/);
  assert.throws(() => assertWeeklyRelease({ ...evidence, releaseSlot: { ...releaseSlot, date: '2026-11-23' } }), /Monday/);
  assert.throws(() => assertWeeklyRelease({ ...evidence, candidate: { ...candidate, imageGenerations: 5 } }), /budget/);
});

test('rejects missing, stale, low-scoring and unresolved review evidence', () => {
  assert.throws(() => assertWeeklyRelease({ ...evidence, receipts: [author] }), /Two review/);
  for (const change of [{ head: 'b'.repeat(40) }, { provider: 'codex' }, { reviewSlot: 3 }]) {
    assert.throws(() => assertWeeklyRelease({ ...evidence, receipts: [author, { ...reviewer, ...change }] }), /stale/);
  }
  assert.throws(() => assertWeeklyRelease({ ...evidence, receipts: [author, { ...reviewer, coverScore: 8 }] }), /scores/);
  assert.throws(() => assertWeeklyRelease({ ...evidence, receipts: [author, {
    ...reviewer, findings: [{ severity: 'important', status: 'open' }],
  }] }), /findings/);
});

test('reservation keys separate stages and bound review slots', () => {
  assert.equal(weeklyReservationKey({ cycle, stage: 'release', reviewSlot: 0 }), cycle + '/release');
  assert.equal(weeklyReservationKey({ cycle, stage: 'article-review', reviewSlot: 4 }), cycle + '/article-review/4');
  assert.throws(() => weeklyReservationKey({ cycle, stage: 'article-review', reviewSlot: 5 }), /slot/);
});
