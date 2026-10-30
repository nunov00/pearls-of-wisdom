import test from 'node:test';
import assert from 'node:assert/strict';
import {trialSlot,nextArticleReview} from '../scripts/trial-schedule.mjs';
import {trialMayRun} from '../scripts/automation-policy.mjs';
import fs from 'node:fs';
const done=(...numbers)=>numbers.map(n=>({reviewNumber:n,slotDate:`2026-11-0${n+1}`}));
const policy=JSON.parse(fs.readFileSync(new URL('../editorial/automation.json',import.meta.url)));
test('finite trial routes Sunday topic/ranking and four normal article review opportunities',()=>{
 for(const [date,number] of [['01',0],['02',1],['03',2],['04',3],['05',4]]){
  const state={completedReviews:done(...Array.from({length:Math.max(0,number-1)},(_,i)=>i+1))};
  const morning=trialSlot('author',`2026-11-${date}T08:13:00Z`,state);
  const afternoon=trialSlot('reviewer',`2026-11-${date}T13:17:00Z`,state);
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
test('missed deliveries reuse later existing slots without advancing a pending review or resetting its budget',()=>{
 // Monday review 1 exists; Tuesday delivery missing: Wednesday still serves review 2.
 const missing={completedReviews:done(1)};
 for(const role of ['author','reviewer']){
  const slot=trialSlot(role,`2026-11-04T${role==='author'?'08:13':'13:17'}:00Z`,missing);
  assert.equal(slot.slotNumber,3);assert.equal(slot.reviewNumber,2);assert.equal(slot.correctionRounds,1);
 }
 // A real Paused result consumes its review number; next existing slot may repair it.
 const afterPause=trialSlot('author','2026-11-04T08:13:00Z',{completedReviews:done(1,2)});
 assert.equal(afterPause.reviewNumber,3);assert.equal(afterPause.correctionRounds,2);
 const last=trialSlot('reviewer','2026-11-05T13:17:00Z',missing);
 assert.equal(last.reviewNumber,2);assert.equal(last.lastArticleSlot,true);
 const firstLate=trialSlot('author','2026-11-03T08:13:00Z',{completedReviews:[]});
 assert.equal(trialSlot('reviewer','2026-11-04T13:17:00Z',{completedReviews:[{reviewNumber:1,slotDate:'2026-11-05'}]}),null);
 assert.equal(firstLate.stage,'draft');assert.equal(firstLate.reviewNumber,1);
 const usedToday={completedReviews:[{reviewNumber:1,slotDate:'2026-11-03'}]};
 assert.equal(trialSlot('reviewer','2026-11-03T14:00:00Z',usedToday),null);
 assert.equal(trialSlot('author','2026-11-04T08:13:00Z',usedToday).reviewNumber,2);
 assert.equal(trialSlot('reviewer','2026-11-03T13:17:00Z',{completedReviews:done(1,2)}),null);
 assert.equal(trialSlot('reviewer','2026-11-05T13:17:00Z',{completedReviews:done(1,2,3,4)}),null);
});
test('ambiguous, absent, duplicate, skipped and over-budget review histories fail closed',()=>{
 for(const bad of [undefined,null,{},[0],[2],done(1,3),done(1,1),done(1,2,3,4,5),[{reviewNumber:1,slotDate:'2027-11-02'}], [{reviewNumber:1,slotDate:'2026-11-03'},{reviewNumber:2,slotDate:'2026-11-03'}]]){
  assert.equal(nextArticleReview(bad),null);
  assert.equal(trialSlot('reviewer','2026-11-05T13:17:00Z',{completedReviews:bad}),null);
 }
 assert.equal(nextArticleReview([]),1);assert.equal(nextArticleReview(done(1,2,3)),4);
});
test('early, late, midnight, unknown roles and post-trial invocations never add a session or publish',()=>{
 for(const role of ['author','queue','reviewer','publish','unknown']) for(const date of ['2026-10-31T13:17:00Z','2026-11-06T08:13:00Z','2026-11-08T13:17:00Z','2027-11-01T13:17:00Z','invalid']) assert.equal(trialSlot(role,date,{completedReviews:[]}),null);
 assert.equal(trialSlot('author','2026-11-02T08:12:59Z',{completedReviews:[]}),null);
 assert.equal(trialSlot('author','2026-11-02T13:17:00Z',{completedReviews:[]}),null);
 assert.equal(trialSlot('reviewer','2026-11-02T13:16:59Z',{completedReviews:[]}),null);
 assert.equal(trialSlot('queue','2026-11-01T18:12:59Z'),null);
 assert.equal(trialSlot('reviewer','2026-11-01T18:13:00Z'),null);
 assert.equal(trialSlot('queue','2026-11-01T23:00:00Z'),null);
 assert.equal(trialSlot('reviewer','2026-11-02T23:00:00Z',{completedReviews:[]}),null);
});
