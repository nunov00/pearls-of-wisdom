# Controlled weekly trial activation — Pearls-2026-11-06

Status: prepared activation; task creation pending review, merge and verification. No task IDs exist yet. Repository permissions declare what may be scheduled, not proof of an installed scheduler.

Owner decision: “Ok, proceed” (28 October 2026), following the reviewed weekly plan and proposed one-off activation. Scope: two read-only provider preflights, three ChatGPT author stages, three Claude review stages, one article at most, manual release. No recurring operation, unattended publication, paid API or new hosting.

## Identity and schedule

Tracking issue: [#26](https://github.com/nunov00/pearls-of-wisdom/issues/26).
Run ID remains Pearls-2026-11-06 if deferred; revised target dates must be explicit and re-reviewed. Initial target Friday is 6 November 2026. Timezone Europe/Zurich.

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

One-off schedules only, notifications on. Do not alter another project's tasks. Verify Claude's actual capacity/windows before creation; if clashes or setup misses a slot, pause and explicitly revise this schedule. Friday release is a manual Manager operation after final review, not another automatic stage.

## Activation sequence and preflight gate

1. Independently review this mandatory PR and its validator/tests/prompts. Merge only with the recorded bounded Owner decision and green required checks; no waiver.
2. Create only the two one-off read-only preflights first. Record provider task IDs, exact times and confirmed push-notification setting on #26. The Owner gives Claude its prompt directly; ChatGPT does not impersonate Claude.
3. Retrieve the actual preflight results. Manager verifies exact commit/check evidence from each provider's scheduled session, records links and pass/fail on #26, and sets both-provider preflight status there. A result summary alone must not be invented as a pass.
4. Only after both pass, create the six stage tasks with the prepared full prompts. Record actual task IDs/times/settings on #26. Every task checks the same gate again; current time must be within the configured window. No stage request exists until the Manager creates it from actual work.
5. Any failure pauses setup. Owner-started replacement Claude sessions use a new Manager attempt and count as interventions. No scheduled review comment means no review. At trial end, one-off tasks have no future recurrence and runtime permission expires. Record final outcome and restore manual-only configuration in a follow-up; never extend the trial silently.

## Record and code boundaries

The configuration uses enabled true/mode one-off-trial for this bounded preparation/review authorisation, recurring false, manual publication and preflight required. scripts/automation-policy.mjs validates this shape, interval and Friday identity; trialMayRun checks actual time, run, stage and preflight. Content validation uses the configuration validator. Historical expired configuration may still build; runtime eligibility expires. This is not an external scheduler, atomic lock, GitHub permission boundary or proof of independent review. Tool access remains separately required.

Prompts instruct actual scheduled entry points to apply trialMayRun from a real checkout. Claims of passed preflights must be verified through provider results, not arbitrary comment instructions. Manager owns issue-summary updates; reviewers only append keyed comments. The preflight itself can run before both are passed but is read-only and reports only through its task summary.

Dates/hash rules, all referenced illustration manifests, REST-body input hashes, highest attempts and bounded source/retry handling are inherited verbatim in [the reviewed plan](../WEEKLY-WORKFLOW-PROPOSAL.md) and materialised in [the task prompts](2026-11-06-task-prompts.md). No source/date/release gate is relaxed. Candidate choice is Monday work, not an automatic email-article commission today.

## Trial acceptance

Confirm exact-input no-op behaviour by repeating a completed stage invocation; confirm a missing/stale request pauses without publication. Exercise these safely before real release; record actual evidence and manual interventions. Whole article must reach 9+ from author and Claude with evidence/visual/release checks satisfied. A missed week is an honest trial outcome. Assess recurring activation only after recording results.
