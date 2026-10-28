const fields = ['enabled','mode','reason','runId','issue','timezone','startsAt','endsAt','recurring','publication','preflightRequired'];
export function validateAutomation(a) {
  if (!a || typeof a !== 'object' || Array.isArray(a)) throw new Error('Invalid automation record');
  if (a.enabled === false && a.mode === 'manual-only') {
    if (Object.keys(a).some(k => !['enabled','mode','reason'].includes(k))) throw new Error('Unexpected manual automation field');
    return 'disabled';
  }
  if (Object.keys(a).some(k => !fields.includes(k)) || fields.some(k => !(k in a))) throw new Error('Invalid trial fields');
  if (a.enabled !== true || a.mode !== 'one-off-trial' || a.recurring !== false || a.publication !== 'manual' || a.preflightRequired !== true) throw new Error('Only a preflight-gated one-off trial with manual publication is authorised');
  if (a.timezone !== 'Europe/Zurich' || !/^Pearls-\d{4}-\d{2}-\d{2}$/.test(a.runId) || !Number.isInteger(a.issue) || a.issue < 1 || typeof a.reason !== 'string' || !a.reason.trim()) throw new Error('Invalid trial identity');
  const iso = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;
  for (const k of ['startsAt','endsAt']) if (!iso.test(a[k]) || !Number.isFinite(Date.parse(a[k])) || new Date(a[k]).toISOString().replace('.000Z','Z') !== a[k]) throw new Error('Invalid trial timestamp');
  const start = Date.parse(a.startsAt), end = Date.parse(a.endsAt);
  if (end <= start || end - start > 8 * 86400000) throw new Error('Trial must be bounded to eight days including preflight');
  const target = a.runId.slice(7);
  if (Number.isNaN(Date.parse(target)) || new Date(target).toISOString().slice(0,10) !== target || new Date(target).getUTCDay() !== 5 || new Intl.DateTimeFormat('en-CA',{timeZone:a.timezone,year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(end)) !== target) throw new Error('Trial must end on its target Friday in Zurich');
  return 'one-off-trial';
}
export function trialMayRun(a, {runId, now, preflightPassed, stage}) {
  validateAutomation(a);
  if (a.mode !== 'one-off-trial' || runId !== a.runId || !Number.isFinite(Date.parse(now))) return false;
  const at = Date.parse(now);
  if (at < Date.parse(a.startsAt) || at > Date.parse(a.endsAt)) return false;
  return stage === 'preflight' || (preflightPassed === true && ['select','draft','revise','topic','article','final'].includes(stage));
}
