import assert from 'node:assert/strict';
import test from 'node:test';
import { checkWeeklyClosure } from '../scripts/weekly-watchdog.mjs';

function fixture() {
  const comments = [];
  const incidents = [];
  const labels = [];
  const github = {
    paginate: async (endpoint, input) => (await endpoint(input)).data,
    rest: { issues: {
      listComments: async () => ({ data: comments }),
      listForRepo: async () => ({ data: incidents }),
      getLabel: async () => {
        if (!labels.length) throw Object.assign(new Error('Missing label'), { status: 404 });
      },
      createLabel: async ({ name }) => labels.push(name),
      create: async ({ title, body, labels: names, assignees }) => {
        const data = { number: 22, title, body, labels: names.map((name) => ({ name })),
          assignees: assignees.map((login) => ({ login })) };
        incidents.push(data);
        return { data };
      },
    } },
  };
  return {
    incidents, labels,
    add: (entry) => comments.push({ id: comments.length + 1, body: 'pearls-weekly ' + JSON.stringify(entry),
      user: { login: 'owner' }, created_at: 'same', updated_at: 'same' }),
    run: (instant = '2026-11-24T06:30Z', dryRun = false) =>
      checkWeeklyClosure({ github, repo: { owner: 'owner', repo: 'repo' }, instant: new Date(instant), dryRun }),
  };
}

test('inactive, first-cycle and closed ledgers do not raise an incident', async () => {
  const f = fixture();
  assert.equal(await f.run(), 'production inactive');
  f.add({ type: 'activation', firstCycle: '2026-11-17' });
  assert.equal(await f.run('2026-11-17T06:30Z'), 'no prior production cycle');
  f.add({ type: 'outcome', key: '2026-11-17/outcome', outcome: 'deferred' });
  assert.equal(await f.run(), 'cycle closed');
  assert.deepEqual(f.incidents, []);
});

test('replay does not write, and repeated live checks create one assigned pause issue', async () => {
  const f = fixture();
  f.add({ type: 'activation', firstCycle: '2026-11-17' });
  assert.match(await f.run(undefined, true), /would report/);
  assert.deepEqual(f.labels, []);
  assert.deepEqual(f.incidents, []);
  assert.equal(await f.run(), 'incident created in #22');
  assert.equal(await f.run(), 'incident already recorded in #22');
  assert.deepEqual(f.labels, ['publication-paused']);
  assert.equal(f.incidents.length, 1);
  assert.deepEqual(f.incidents[0].labels, [{ name: 'publication-paused' }]);
  assert.deepEqual(f.incidents[0].assignees, [{ login: 'owner' }]);
});

test('Zurich summer and winter dispatches detect an ambiguous outcome for the prior Tuesday', async () => {
  for (const [now, cycle] of [['2026-07-07T06:30Z', '2026-06-30'], ['2026-11-24T06:30Z', '2026-11-17']]) {
    const f = fixture();
    f.add({ type: 'activation', firstCycle: cycle });
    for (const outcome of ['blocked', 'published']) f.add({ type: 'outcome', key: cycle + '/outcome', outcome });
    assert.equal(await f.run(now, true), 'would report missing or ambiguous closure for ' + cycle);
  }
});
