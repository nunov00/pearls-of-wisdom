// Finite Pearls-2026-11-06 trial. Ongoing weekly operation is not authorised.
export function trialSlot(role, now) {
  const at = new Date(now);
  if (!Number.isFinite(at.getTime())) return null;
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Zurich', year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
  }).formatToParts(at).map(p => [p.type, p.value]));
  const date = `${p.year}-${p.month}-${p.day}`, time = `${p.hour}:${p.minute}`;
  const dates = ['2026-11-01','2026-11-02','2026-11-03','2026-11-04','2026-11-05'];
  const day = dates.indexOf(date);
  if (day < 0) return null;
  if (role === 'queue') return day === 0 && time >= '19:13'
    ? {date, stage:'select', action:'rank', reviewNumber:0, correctionRounds:0} : null;
  if (role === 'author' && time >= '09:13' && time < '14:17') return {
    date, stage:day === 0 ? 'select' : day === 1 ? 'draft' : 'revise',
    action:day === 0 ? 'select' : day === 1 ? 'draft' : 'revise',
    reviewNumber:day, correctionRounds:Math.max(0, day - 1)
  };
  if (role === 'reviewer' && time >= '14:17' && (day !== 0 || time < '19:13')) return {
    date, stage:day === 0 ? 'topic' : 'article', action:day === 0 ? 'topic' : 'review',
    reviewNumber:day, correctionRounds:Math.max(0, day - 1)
  };
  return null;
}
