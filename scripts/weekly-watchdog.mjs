import { readWeeklyLedger } from './release-weekly-ledger.mjs';
import { weeklyReservationKey } from './release-weekly-policy.mjs';

const clock = new Intl.DateTimeFormat('sv-SE', {
  timeZone: 'Europe/Zurich', year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
});
const closedOutcomes = ['published', 'deferred', 'blocked'];
const pauseLabel = 'publication-paused';

export async function checkWeeklyClosure({ github, repo, instant = new Date(), dryRun = false }) {
  const parts = Object.fromEntries(clock.formatToParts(instant).map(({ type, value }) => [type, value]));
  const date = new Date(parts.year + '-' + parts.month + '-' + parts.day + 'T00:00:00Z');
  if (date.getUTCDay() !== 2 || parts.hour + ':' + parts.minute < '07:30') return 'outside watchdog window';
  date.setUTCDate(date.getUTCDate() - 7);
  const cycle = date.toISOString().slice(0, 10);
  const key = weeklyReservationKey({ cycle, stage: 'outcome', reviewSlot: 0 });

  const comments = await github.paginate(github.rest.issues.listComments, {
    ...repo, issue_number: 58, per_page: 100,
  });
  const entries = readWeeklyLedger(comments, repo.owner);
  const activation = entries.filter(({ type }) => type === 'activation').at(-1);
  if (!activation) return 'production inactive';
  weeklyReservationKey({ cycle: activation.firstCycle, stage: 'select', reviewSlot: 0 });
  if (cycle < activation.firstCycle) return 'no prior production cycle';
  const outcomes = entries.filter((entry) => entry.type === 'outcome' && entry.key === key && entry.commentId > activation.commentId);
  if (outcomes.length === 1 && closedOutcomes.includes(outcomes[0].outcome)) return 'cycle closed';

  const marker = '<!-- pearls-weekly-watchdog:' + cycle + ' -->';
  const issues = await github.paginate(github.rest.issues.listForRepo, { ...repo, state: 'all', per_page: 100 });
  const incident = issues.find((issue) => !issue.pull_request && issue.body?.includes(marker));
  if (incident) return 'incident already recorded in #' + incident.number;
  if (dryRun) return 'would report missing or ambiguous closure for ' + cycle;

  try {
    await github.rest.issues.getLabel({ ...repo, name: pauseLabel });
  } catch (error) {
    if (error.status !== 404) throw error;
    await github.rest.issues.createLabel({ ...repo, name: pauseLabel, color: 'b60205',
      description: 'Pause automated publication' });
  }
  const { data } = await github.rest.issues.create({
    ...repo,
    title: 'Pearls weekly cycle needs reconciliation (' + cycle + ')',
    body: marker + '\n\nThe weekly ledger (#58) has no single valid terminal outcome for the cycle that began on ' +
      cycle + '. Reconcile the release and deployment before clearing the pause.',
    labels: [pauseLabel],
    assignees: [repo.owner],
  });
  if (!data.labels?.some(({ name }) => name === pauseLabel) ||
      !data.assignees?.some(({ login }) => login === repo.owner)) {
    throw new Error('Incident #' + data.number + ' needs its pause label or owner assignment verified');
  }
  return 'incident created in #' + data.number;
}
