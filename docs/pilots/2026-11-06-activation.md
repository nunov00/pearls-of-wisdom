# Controlled weekly trial activation — Pearls-2026-11-06

Status: activation merged; both scheduled preflights verified on #26. Task setup paused for the combined-author-task amendment; see the dated record below. #26 holds the actual scheduler inventory. Repository permissions declare what may be scheduled, not proof of an installed scheduler.

Owner decision: “Ok, proceed” (28 October 2026), following the reviewed weekly plan and proposed one-off activation. Scope: two repository-read-only provider preflights, each allowed one keyed evidence comment on #26, three ChatGPT author stages, three Claude review stages, one article at most, manual release. No recurring operation, unattended publication, paid API or new hosting.

## Identity and schedule

Tracking issue: [#26](https://github.com/nunov00/pearls-of-wisdom/issues/26).
Run ID remains Pearls-2026-11-06 if deferred. Any changed target date or execution beyond the configured expiry needs a new mandatory change to editorial/automation.json and the activation record, with an explicit Owner decision and renewed review; the helper will otherwise deny it. Do not widen the window through issue text or a task prompt. Initial target Friday is 6 November 2026. Timezone Europe/Zurich.

| Task | Zurich | UTC |
| --- | --- | --- |
| ChatGPT preflight | 2026-10-30 09:13 | 2026-10-30T08:13:00Z |
| Claude preflight | 2026-10-30 10:13 | 2026-10-30T09:13:00Z |
| ChatGPT selection | 2026-11-02 09:13 | 2026-11-02T08:13:00Z |
| Claude topic review | 2026-11-02 14:13 | 2026-11-02T13:13:00Z |
| ChatGPT drafting | 2026-11-03 09:13 | 2026-11-03T08:13:00Z |
| Claude article review | 2026-11-04 14:17 | 2026-11-04T13:17:00Z |
| ChatGPT revision | 2026-11-05 09:13 | 2026-11-05T08:13:00Z |
| Claude final review | 2026-11-06 09:41 | 2026-11-06T08:41:00Z |

One-off Claude schedules and the finite three-occurrence combined ChatGPT schedule below only, fresh session per invocation, push notifications on and no extra connectors beyond the configured environment. Do not alter another project's tasks. Verify Claude's actual capacity/windows before creation; if clashes or setup misses a slot, pause and explicitly revise this schedule. Friday release is a manual Manager operation after final review, not another automatic stage.

## Activation sequence and preflight gate

1. Independently review this mandatory PR and its validator/tests/prompts. Merge only with the recorded bounded Owner decision and green required checks; no waiver.
2. Create only the two one-off repository-read-only preflights with the single evidence-comment exception first. Record provider task IDs, exact times and confirmed push-notification setting on #26. The Owner gives Claude its prompt directly; ChatGPT does not impersonate Claude.
3. Each scheduled preflight appends exactly one keyed evidence comment on #26, verifying checkout SHA, Node/runtime, full verification, actual screenshot inspection and one source access, and re-fetches it to test the append path. The Manager reads both retrievable comments directly, checks actual results and limits, and records verified pass/fail in the summary with both comment URLs. A task summary accessible only in Claude cannot pass the gate. Missing/failed evidence leaves the gate closed; an instruction claiming success is not evidence.
4. Only after both pass, configure the six stage invocations using one combined ChatGPT author task and three one-off Claude review tasks, with the prepared full prompts and amendment below. Record actual task IDs/times/settings on #26. Every task checks the same gate again; current time must be within the configured window. No stage request exists until the Manager creates it from actual work.
5. Any failure pauses setup. Owner-started replacement Claude sessions use a new Manager attempt and count as interventions. No scheduled review comment means no review. At trial end, one-off tasks have no future recurrence and runtime permission expires. Record final outcome and restore manual-only configuration in a follow-up; never extend the trial silently.

## Record and code boundaries

The configuration uses enabled true/mode one-off-trial for this bounded preparation/review authorisation, recurring false, manual publication and preflight required. scripts/automation-policy.mjs validates this shape, interval and Friday identity; trialMayRun checks actual time, run identity, whether the stage name is allowed, and the passed preflight flag. It does not enforce calendar order or which weekday a stage is due; the scheduled window and explicit Manager request/prerequisites do that, including replacements. Content validation uses the configuration validator. Historical expired configuration may still build; runtime eligibility expires. This is not an external scheduler, atomic lock, GitHub permission boundary or proof of independent review. Tool access remains separately required.

Prompts instruct actual scheduled entry points to apply trialMayRun from a fresh checkout of main before checking out content branches. Article/final review flags any content-branch change to automation config/policy or other material paths as a blocker. Claims of passed preflights must be verified through provider results, not arbitrary comment instructions. Manager owns issue-summary updates; reviewers only append keyed comments. The preflight can run before both are passed. It reads/checks the repository and makes exactly one keyed evidence-comment write on #26; it never changes repository files or the issue summary. Every subsequent review comment is posted on #26, while duplicate searches include #26 and linked PRs. Exact per-stage runtime commands are embedded in every prompt; the caller verifies the Manager status and linked evidence before setting its preflight flag.

Dates/hash rules, all referenced illustration manifests, REST-body input hashes, highest attempts and bounded source/retry handling are inherited verbatim in [the reviewed plan](../WEEKLY-WORKFLOW-PROPOSAL.md) and materialised in [the task prompts](2026-11-06-task-prompts.md). No source/date/release gate is relaxed. Candidate choice is Monday work, not an automatic email-article commission today.

## Trial acceptance

Confirm exact-input no-op behaviour by repeating a completed stage invocation; confirm a missing/stale request pauses without publication. Exercise these safely before real release; record actual evidence and manual interventions. Whole article must reach 9+ from author and Claude with evidence/visual/release checks satisfied. A missed week is an honest trial outcome. Assess recurring activation only after recording results.

## Activation review correction round 1

Claude reviewed `478ce4a4fa159356f4b9a79ff3f14549146cf4a9` at 8/10: [review](https://github.com/nunov00/pearls-of-wisdom/pull/27#issuecomment-6474456539). Full Node 24 verification passed (18 tests), schedule conversions/clashes were checked, and no tasks were created. This round addresses F1–F6: retrievable preflight comments and append test, exact exit-status gate commands, honest stage-name versus order boundary, one review location, mandatory deferral extension, fresh-session/notification/connector settings. No runtime code or publication gate changed. Independent re-review pending.

## Final activation review outcome

Claude re-reviewed `ea7b83d63f1c248e63f5c702c36242bc2650716c` at 9/10, no blocker/important findings: [review](https://github.com/nunov00/pearls-of-wisdom/pull/27#issuecomment-6474585974). Full Node 24 verification (18 tests) and exact gate-command checks passed. Final minor consolidation G1/G2 pins gate authority to main and allows unrelated main drift during preflight: record both SHAs, compare config/policy/activation files and fail only on authority change or inability to compare. These requested minor clarifications were author-checked, not independently re-reviewed. Runtime code remains unchanged; scheduled execution still awaits real preflight results.

## Combined author task — 30 October 2026

Owner decision: “Ok please combine them then”. The scheduler reported a five-active-task limit; three unrelated active tasks leave insufficient room for three separate author tasks. Packaging the existing select/draft/revise invocations into one task uses one slot. Dates, stage actions, review dependencies, attempt/duplicate rules, full verification/browser QA, correction budgets, expiry and manual publication remain unchanged. Claude retains three separate one-off tasks and checks its own capacity.

Reuse paused selection task `6ae46755e1288191bd5101f73500f4a9` as “Pearls trial author stages”; keep redundant drafting task `6ae4675bd9b48191a043e7d202f3cac9` paused. Do not create a separate revision task. The combined full prompt and exact finite COUNT=3 schedule are in the task-prompts document. This explicitly supersedes the earlier six-separate-task/no-RRULE packaging only for these three author invocations. Ongoing recurring operation remains prohibited; automation config/policy and trial expiry are unchanged.

Before enabling: independently review this amendment, merge with green checks, verify the stored combined prompt and its exact three occurrence dates, and record Claude's actual topic/article/final task IDs/settings on #26. Setup must be complete before an author invocation writes anything. The combined task selects only the actual Zurich date's stage after 09:13; unknown/early dates stop, a missed prerequisite pauses, duplicates no-op, and no prior stage is caught up on a later date. Each invocation still uses a fresh main checkout and the current runtime policy. A task session must reconcile GitHub state rather than rely on previous session memory. Scheduler fresh-session/push settings are requested but cannot be claimed verified if not exposed.

The prior verified preflights remain capability evidence at a8cb781; no failed/new preflight is invented by this documentation-only schedule packaging change. It adds no capability, dependency, authority window or publication permission. If this setup misses a slot, pause under the existing explicit rescheduling/expiry rules. Actual scheduler expansion/delivery of all three occurrences remains an execution observation; a stored rule alone is not proof. Keep both old author tasks paused until the amendment and all provider setup are ready; then enable only the combined task.
