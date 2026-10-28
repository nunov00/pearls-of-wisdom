import test from 'node:test';
import assert from 'node:assert/strict';
import {validateAutomation, trialMayRun} from '../scripts/automation-policy.mjs';
const valid = () => ({"enabled":true,"mode":"one-off-trial","reason":"Owner: Ok, proceed (2026-10-28), bounded weekly preparation/review trial; manual publication only.","runId":"Pearls-2026-11-06","issue":26,"timezone":"Europe/Zurich","startsAt":"2026-10-30T08:13:00Z","endsAt":"2026-11-06T17:00:00Z","recurring":false,"publication":"manual","preflightRequired":true});
test('manual mode remains valid; only bounded one-off preparation/review can be enabled', () => {
 assert.equal(validateAutomation({enabled:false,mode:'manual-only',reason:'disabled'}),'disabled');
 assert.equal(validateAutomation(valid()),'one-off-trial');
 for (const mutate of [a=>a.recurring=true,a=>a.publication='automatic',a=>a.preflightRequired=false,a=>a.mode='weekly',a=>a.endsAt='2026-12-06T17:00:00Z',a=>a.endsAt=a.startsAt,a=>a.timezone='UTC',a=>a.extraAuthority='merge',a=>a.endsAt='2026-11-06T99:00:00Z',a=>a.runId='Pearls-2026-11-05']) {
  const a=valid(); mutate(a); assert.throws(()=>validateAutomation(a));
 }
});
test('runtime gate rejects missing preflight, wrong run, expired window and publication stages', () => {
 const args={runId:'Pearls-2026-11-06',now:'2026-11-02T09:00:00Z',preflightPassed:true,stage:'draft'};
 assert.equal(trialMayRun(valid(),args),true);
 for (const patch of [{preflightPassed:false},{runId:'Pearls-2026-11-13'},{now:'2026-10-29T09:00:00Z'},{now:'2026-11-06T17:00:01Z'},{stage:'publish'},{stage:'merge'},{stage:'unknown'},{now:'invalid'}]) assert.equal(trialMayRun(valid(),{...args,...patch}),false);
 assert.equal(trialMayRun(valid(),{...args,preflightPassed:false,stage:'preflight'}),true);
 assert.equal(trialMayRun({enabled:false,mode:'manual-only'},args),false);
});
