const zurich = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/Zurich',
  weekday: 'short', year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
});

const reviewDays = ['Wed', 'Thu', 'Fri', 'Sat'];
const cycleDays = ['Tue', ...reviewDays, 'Sun', 'Mon'];

// Calendar routing only. Activation and ledger checks are separate.
export function weeklySlot(provider, instant) {
  if (!(instant instanceof Date) || !Number.isFinite(instant.getTime())) return null;
  const local = Object.fromEntries(zurich.formatToParts(instant).map(({ type, value }) => [type, value]));
  const date = `${local.year}-${local.month}-${local.day}`;
  const time = `${local.hour}:${local.minute}`;
  const offset = cycleDays.indexOf(local.weekday);
  const cycle = new Date(Date.parse(date + 'T00:00:00Z') - offset * 86_400_000).toISOString().slice(0, 10);
  const reviewSlot = reviewDays.indexOf(local.weekday) + 1;
  const morning = time >= '08:43' && time < '14:17';
  let stage;

  if (provider === 'codex') {
    if (offset === 0 && morning) stage = 'select';
    if (offset === 0 && time >= '18:43') stage = 'rank';
    if (reviewSlot && morning) stage = 'article';
    if (offset === 6 && morning) stage = 'release';
  } else if (provider === 'claude' && time >= '13:47') {
    if (offset === 0 && time < '19:13') stage = 'topic-review';
    if (reviewSlot) stage = 'article-review';
  }
  return stage ? { cycle, date, stage, reviewSlot } : null;
}
