import assert from 'node:assert/strict';
import test from 'node:test';
import { weeklySlot } from '../scripts/weekly-schedule.mjs';

const cases = [
  ['codex', '2026-11-10T07:42Z', null],
  ['codex', '2026-11-10T07:43Z', 'select'],
  ['codex', '2026-11-10T17:42Z', null],
  ['codex', '2026-11-10T17:43Z', 'rank'],
  ['claude', '2026-11-10T12:46Z', null],
  ['claude', '2026-11-10T12:47Z', 'topic-review'],
  ['claude', '2026-11-10T18:12Z', 'topic-review'],
  ['claude', '2026-11-10T18:13Z', null],
  ['codex', '2026-11-16T13:16Z', 'release'],
  ['codex', '2026-11-16T13:17Z', null],
  ['codex', '2026-11-15T08:13Z', null],
  ['claude', '2026-11-15T13:17Z', null],
  ['claude', '2026-11-16T13:17Z', null],
  ['unknown', '2026-11-10T08:13Z', null],
];

for (const [provider, time, stage] of cases) {
  test(`${provider} at ${time} routes to ${stage}`, () => {
    assert.equal(weeklySlot(provider, new Date(time))?.stage ?? null, stage);
  });
}

test('Wednesday to Saturday have four paired review slots in one cycle', () => {
  for (const [index, day] of ['11', '12', '13', '14'].entries()) {
    const date = `2026-11-${day}`;
    for (const [provider, time, stage] of [
      ['codex', '08:13', 'article'],
      ['claude', '13:17', 'article-review'],
    ]) {
      assert.deepEqual(weeklySlot(provider, new Date(`${date}T${time}Z`)), {
        cycle: '2026-11-10', date, stage, reviewSlot: index + 1,
      });
    }
  }
});

test('Monday release keeps the Tuesday cycle across both DST changes', () => {
  for (const [time, cycle] of [
    ['2027-03-29T07:13Z', '2027-03-23'],
    ['2027-11-01T08:13Z', '2027-10-26'],
  ]) {
    const result = weeklySlot('codex', new Date(time));
    assert.equal(result.stage, 'release');
    assert.equal(result.cycle, cycle);
  }
});

test('invalid inputs cannot select a stage', () => {
  assert.equal(weeklySlot('codex', '2026-11-10T08:13Z'), null);
  assert.equal(weeklySlot('codex', new Date(NaN)), null);
});
