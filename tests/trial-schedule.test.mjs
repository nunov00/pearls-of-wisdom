import test from 'node:test';
import assert from 'node:assert/strict';
import {trialSlot} from '../scripts/trial-schedule.mjs';
import {trialMayRun} from '../scripts/automation-policy.mjs';
import fs from 'node:fs';
const policy=JSON.parse(fs.readFileSync(new URL('../editorial/automation.json',import.meta.url)));
test('finite trial routes Sunday topic/ranking and four dated article review cycles',()=>{
 for(const [date,number] of [['01',0],['02',1],['03',2],['04',3],['05',4]]){
  const morning=trialSlot('author',`2026-11-${date}T08:13:00Z`);
  const afternoon=trialSlot('reviewer',`2026-11-${date}T13:17:00Z`);
  assert.equal(morning.reviewNumber,number);assert.equal(afternoon.reviewNumber,number);
  assert.equal(morning.correctionRounds,Math.max(0,number-1));
  assert.equal(afternoon.stage,number===0?'topic':'article');
  for(const slot of [morning,afternoon]){
   assert.equal(trialMayRun(policy,{runId:policy.runId,now:`2026-11-${date}T13:17:00Z`,stage:slot.stage,preflightPassed:true}),true);
   assert.equal(trialMayRun(policy,{runId:policy.runId,now:`2026-11-${date}T13:17:00Z`,stage:slot.stage,preflightPassed:false}),false);
  }
 }
 assert.equal(trialSlot('queue','2026-11-01T18:13:00Z').action,'rank');
 assert.equal(trialSlot('queue','2026-11-02T18:13:00Z'),null);
});
test('early, late, midnight, unknown roles and post-trial invocations never catch up or publish',()=>{
 for(const role of ['author','queue','reviewer','publish','unknown']) for(const date of ['2026-10-31T13:17:00Z','2026-11-06T08:13:00Z','2026-11-08T13:17:00Z','invalid']) assert.equal(trialSlot(role,date),null);
 assert.equal(trialSlot('author','2026-11-02T08:12:59Z'),null);
 assert.equal(trialSlot('author','2026-11-02T13:17:00Z'),null);
 assert.equal(trialSlot('reviewer','2026-11-02T13:16:59Z'),null);
 assert.equal(trialSlot('queue','2026-11-01T18:12:59Z'),null);
 assert.equal(trialSlot('reviewer','2026-11-01T18:13:00Z'),null);
 assert.equal(trialSlot('queue','2026-11-01T23:00:00Z'),null);
 assert.equal(trialSlot('reviewer','2026-11-02T23:00:00Z'),null);
 assert.equal(trialSlot('author','2026-11-05T08:13:00Z').correctionRounds,3);
});
