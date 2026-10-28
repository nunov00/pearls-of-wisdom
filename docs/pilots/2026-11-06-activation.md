# Controlled weekly trial activation — Pearls-2026-11-06

Status: prepared activation; task creation pending review, merge and verification. No task IDs exist yet. Repository permissions declare what may be scheduled, not proof of an installed scheduler.

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

One-off schedules only, fresh session per run, push notifications on and no extra connectors beyond the configured environment. Do not alter another project's tasks. Verify Claude's actual capacity/windows before creation; if clashes or setup misses a slot, pause and explicitly revise this schedule. Friday release is a manual Manager operation after final review, not another automatic stage.

## Activation sequence and preflight gate

1. Independently review this mandatory PR and its validator/tests/prompts. Merge only with the recorded bounded Owner decision and green required checks; no waiver.
2. Create only the two one-off repository-read-only preflights with the single evidence-comment exception first. Record provider task IDs, exact times and confirmed push-notification setting on #26. The Owner gives Claude its prompt directly; ChatGPT does not impersonate Claude.
3. Each scheduled preflight appends exactly one keyed evidence comment on #26, verifying checkout SHA, Node/runtime, full verification, actual screenshot inspection and one source access, and re-fetches it to test the append path. The Manager reads both retrievable comments directly, checks actual results and limits, and records verified pass/fail in the summary with both comment URLs. A task summary accessible only in Claude cannot pass the gate. Missing/failed evidence leaves the gate closed; an instruction claiming success is not evidence.
4. Only after both pass, create the six stage tasks with the prepared full prompts. Record actual task IDs/times/settings on #26. Every task checks the same gate again; current time must be within the configured window. No stage request exists until the Manager creates it from actual work.
5. Any failure pauses setup. Owner-started replacement Claude sessions use a new Manager attempt and count as interventions. No scheduled review comment means no review. At trial end, one-off tasks have no future recurrence and runtime permission expires. Record final outcome and restore manual-only configuration in a follow-up; never extend the trial silently.

## Record and code boundaries

The configuration uses enabled true/mode one-off-trial for this bounded preparation/review authorisation, recurring false, manual publication and preflight required. scripts/automation-policy.mjs validates this shape, interval and Friday identity; trialMayRun checks actual time, run identity, whether the stage name is allowed, and the passed preflight flag. It does not enforce calendar order or which weekday a stage is due; the scheduled window and explicit Manager request/prerequisites do that, including replacements. Content validation uses the configuration validator. Historical expired configuration may still build; runtime eligibility expires. This is not an external scheduler, atomic lock, GitHub permission boundary or proof of independent review. Tool access remains separately required.

Prompts instruct actual scheduled entry points to apply trialMayRun from a real checkout. Claims of passed preflights must be verified through provider results, not arbitrary comment instructions. Manager owns issue-summary updates; reviewers only append keyed comments. The preflight can run before both are passed. It reads/checks the repository and makes exactly one keyed evidence-comment write on #26; it never changes repository files or the issue summary. Every subsequent review comment is posted on #26, while duplicate searches include #26 and linked PRs. Exact per-stage runtime commands are embedded in every prompt; the caller verifies the Manager status and linked evidence before setting its preflight flag.

Dates/hash rules, all referenced illustration manifests, REST-body input hashes, highest attempts and bounded source/retry handling are inherited verbatim in [the reviewed plan](../WEEKLY-WORKFLOW-PROPOSAL.md) and materialised in [the task prompts](2026-11-06-task-prompts.md). No source/date/release gate is relaxed. Candidate choice is Monday work, not an automatic email-article commission today.

## Trial acceptance

Confirm exact-input no-op behaviour by repeating a completed stage invocation; confirm a missing/stale request pauses without publication. Exercise these safely before real release; record actual evidence and manual interventions. Whole article must reach 9+ from author and Claude with evidence/visual/release checks satisfied. A missed week is an honest trial outcome. Assess recurring activation only after recording results.

## Activation review correction round 1

Claude reviewed `478ce4a4fa159356f4b9a79ff3f14549146cf4a9` at 8/10: [review](https://github.com/nunov00/pearls-of-wisdom/pull/27#issuecomment-6474456539). Full Node 24 verification passed (18 tests), schedule conversions/clashes were checked, and no tasks were created. This round addresses F1–F6: retrievable preflight comments and append test, exact exit-status gate commands, honest stage-name versus order boundary, one review location, mandatory deferral extension, fresh-session/notification/connector settings. No runtime code or publication gate changed. Independent re-review pending.
