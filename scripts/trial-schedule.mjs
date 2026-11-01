// Finite Pearls-2026-11-06 trial. Ongoing weekly operation is not authorised.
// Completed numbers must come from reconciled genuine reviewer comments, not labels.
export function nextArticleReview(completed) {
  if (!Array.isArray(completed) || completed.length > 4 ||
      completed.some((r, i) => !r || !Number.isInteger(r.reviewNumber) || r.reviewNumber !== i + 1 ||
        !['2026-11-02','2026-11-03','2026-11-04','2026-11-05'].includes(r.slotDate) ||
        (i > 0 && r.slotDate <= completed[i-1].slotDate))) return null;
  return completed.length < 4 ? completed.length + 1 : null;
}
export function trialSlot(role, now, {completedReviews} = {}) {
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
  // Allow 30 minutes of early scheduler dispatch; prerequisites still govern handoffs.
  // Keep original end boundaries, calendar dates and review budgets unchanged.
  if (role === 'queue') return day === 0 && time >= '18:43'
    ? {date, stage:'select', action:'rank', slotNumber:0, reviewNumber:0, correctionRounds:0} : null;
  const author = role === 'author' && time >= '08:43' && time < '14:17';
  const reviewer = role === 'reviewer' && time >= '13:47' && (day !== 0 || time < '19:13');
  if (!author && !reviewer) return null;
  if (day === 0) return {date, stage:author?'select':'topic', action:author?'select':'topic', slotNumber:0, reviewNumber:0, correctionRounds:0};
  const number = nextArticleReview(completedReviews);
  // One genuine result at most per dated opportunity; numbers cannot leap ahead.
  if (number === null || number > day || completedReviews.some(r => r.slotDate >= date)) return null;
  return {
    date, stage:reviewer?'article':number===1?'draft':'revise',
    action:reviewer?'review':number===1?'draft':'revise',
    slotNumber:day, reviewNumber:number, correctionRounds:number-1,
    lastArticleSlot:day===4
  };
}
