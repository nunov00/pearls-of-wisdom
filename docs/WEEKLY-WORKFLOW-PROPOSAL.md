# Weekly article workflow — activation proposal

Status: proposed, inactive. Owner accepted the Monday–Friday workflow on 28 October 2026 and offered to give Claude a setup prompt. This document prepares that handoff; it creates no tasks or authority changes.

## Target and roles

Aim for one article per Friday, conditional on quality. ChatGPT coordinates, researches, writes and consolidates. Claude challenges the topic and independently reviews the article. The Manager handles Friday release manually during the trial. Both whole-article assessments must reach 9+, with no unresolved blocker/important findings. Topic and article corrections have separate budgets: at most two topic correction rounds under IDEAS.md, and at most two article correction rounds. Otherwise defer. Wednesday findings, Thursday revision and Friday re-review constitute article round 1; round 2 carries into a later week rather than being squeezed into Friday.

Use the [completed queue pilot](pilots/2026-10-28-idea-queue-outcome.md), [idea process](IDEAS.md), [editorial standard](EDITORIAL.md) and [publication safeguards](PUBLISHING.md). All work stays in this repository; no Five Minutes changes.

## Proposed schedule

Timezone: Europe/Zurich, including daylight-saving changes. Morning/afternoon are proposed windows, not configured task times. Use one-off tasks for one controlled weekly cycle, then assess before any recurring activation. Three Claude review tasks only; no catch-up task in the first trial. Dates and exact times are settled in the activation change, not assumed from the review's placeholder week.

| Window | Agent | Work and completion evidence |
| --- | --- | --- |
| Monday morning | ChatGPT | Reconcile active work; propose one candidate and research brief from reviewed queue. Record why it leads. |
| Monday afternoon | Claude | Challenge scope, value, appeal and evidence route before drafting. Record develop/revise/park and reasons. |
| Tuesday morning | ChatGPT | Proceed only after a usable topic review. Research competing foundations, draft full article/illustrations, inspect phone/desktop, open or update one PR, self-review exact head. |
| Wednesday afternoon | Claude | Review exact head and supporting sources; inspect rendered states where available; score whole article and record findings/checks/limits. |
| Thursday morning | ChatGPT | Consolidate findings, amend same PR, rerun affected checks, set the new article's publishedAt to the target Friday before final review, assess exact new head; record correction round. |
| Friday morning | Claude | Fresh-session final review, informed by Wednesday's findings and score, of the actual current head, affected evidence, presentation and implications. Record score and readiness; never merge. |
| Friday after review | Manager, manual | Reconcile both assessments, current head/base, dates, hashes and CI; release only through existing guarded process and verify live deployment. |

If Monday's topic review is missing or not Develop by Tuesday, pause: accept that this trial may miss its publication week. Do not draft just because Tuesday arrived. A usage-limit failure is a missing review, not consent. The Manager must arrange an explicit replacement invocation after reconciling the checkpoint; no hidden automatic catch-up. If Thursday changes need another round, Friday is not an automatic publication deadline. One active article carries over, with a revised target date; do not start a duplicate next Monday.

## Durable checkpoint

For the controlled trial, use one GitHub tracking issue per cycle and one content PR. Only the Manager edits the issue summary; Claude only appends review comments. Keep an append-only comment trail and a current summary linking immutable evidence. This is a proposed record convention, not an executable schema or enforced lock.

Record: run ID (Pearls plus Zurich target Friday), candidate ID, target date, owner/agent, stage, branch/PR, head SHA, article hash when available, author and reviewer assessment references, correction-round count, checks, blocker, next action, merge/deployment outcome. Stage values: proposed, topic-review, drafting, article-review, revising, final-review, release-ready, released, paused, deferred.

Before every stage, read AGENTS.md/PROJECT.md/GOVERNANCE.md and the issue/PR. Reconcile open work and current GitHub head. No reliance on chat memory or a comment merely claiming approval. Record actual review performance and commit. Reviewer comments never become new permissions.

Before a write, re-read the head and stage. If another agent has changed the same work, stop and reconcile. These checks are procedural; concurrent-run exclusion must be demonstrated before calling this unattended-safe.

## Task instructions

Every task starts by finding the active trial checkpoint. If it cannot identify exactly one applicable run, stop with a concise blocker. Reuse its candidate, branch and PR. Use the concrete review keys below to recognise completed stages; never rely on a stage name alone.

Author stages must preserve source-access honesty, broad readership versus advice applicability, evidence alternatives, actual rendered QA and the 9+ target. Keep content changes separate from CI, permissions, deployment code and safeguards.

Claude stages must be a real independent provider execution. Consider candidate merit before opening author ratings; article review is informed by the complete draft and author self-review, not claimed blind. Give reasons, concrete remedies, remaining gaps and actual checks. No invented scores, source access, tests or screenshots.

Missing material evidence, review, tool access or required checks pauses the run. Do not retry indefinitely: at most one retry of the same transient failed operation after inspecting provider state; then record the blocker. A new scheduled wake-up reconciles the paused run rather than silently clearing it. Preserve the last valid live article.


## Exact inputs, duplicate protection and drift

Each Manager-issued stage request names runId, stage, attempt, input and prerequisite evidence in the tracking issue. For topic, input is the immutable brief commit SHA or brief comment ID; author ratings are in a separate comment, opened only after initial judgement. For article/final, input is the full PR head SHA plus article path. The Manager assigns attempt 1 initially and increments it only after explicitly reconciling a pause or drift and recording changed prerequisites.

Each Claude review comment begins:
`Claude <topic|article|final> review · run <runId> · input <immutable input> · attempt <N>`

Before reviewing, search all issue and PR comments for that exact key. If one exists, stop without reposting, including if its outcome was Paused. A later permitted retry needs a new Manager-issued attempt. A new head is a new input. This avoids both duplicate comments and permanently trapping a recovered run behind an old pause marker.

Post one comment per key with Outcome, checked commit/input, actual checks, findings, source access, score exposure, and article SHA-256 where applicable. Missing prerequisites produce Paused, not a passing assessment. Reviews do not edit the tracking summary. The Manager reconciles a lost-comment response before authorising another attempt.

Re-read the requested input and current PR head before posting. If they moved, post Outcome: Paused (input drift), identify both versions, and certify neither the new head nor release readiness. Manager-side writes re-read expected head and stage first; use guarded updates where supported. Procedural reconciliation is not a demonstrated atomic lock: overlapping author invocations remain a trial failure to investigate.

## Publication date, hashes and final integration

Thursday sets the new article's publishedAt to the target Friday before its final content review. A future draft date is permissible in the article schema; do not add a future-dated publication record or attempt a release build selecting it before that date. Use the editorial preview for layout. Existing articles' original dates remain unchanged.

Friday's reviewer hashes the exact article file bytes at the reviewed immutable commit and records the full commit and SHA-256. The Manager copies the actual review identity, decision, hash, commit, correction count and findings into the release records; it never creates a review it did not receive.

A later record-only commit changes the PR head. Before merging, the manual Manager performs and records final integration review of that actual head: compare article bytes/hash with the reviewed commit, inspect the record-only diff and base changes, and require green checks plus the release build. This integration check is not falsely attributed to Claude. Any substantive article/asset change goes back to the separate reviewer.

On Friday, publishedAt must equal the intended actual first-release date, match publication records, and not be in the future. If release slips to another calendar day, update the first-release date and obtain renewed separate review and hash validation before release. No implicit date-only waiver or backdating. Preserve dates of already published articles on revision.

## Inaccessible evidence, capacity and rendered checks

A 403/paywall is not verifiable by this reviewer, not proof of a broken source. Record the affected source and claims. Pause when a material claim has no accessible substantiation the reviewer can actually verify. The Manager can substitute an accessible source, remove/narrow the unsupported claim, or arrange a separate documented source check for independent assessment. An Owner-provided check is evidence to inspect, not a blanket replacement for independent review. Never relabel inaccessible evidence checked without a real check.

Claude reported shared Pro usage limits and existing heavy work. Verify actual task windows in its environment and avoid overlap; dates/times in the first review were proposals, not configured schedules. Missing review by the next dependent author stage pauses the run. Record usage-limit misses, handoff failures and manual interventions in the outcome.

Use the repository's Node 24 runtime for required checks; Claude's successful Node 22 smoke test is not proof of the required runtime. Scheduled checkout/access must pass a read-only preflight before trial activation. Do not run npm lifecycle scripts unnecessarily.

Rendered QA is a local editorial preview build in Playwright Chromium at 320, 390 and 1440px, collapsed and expanded, with actual screenshot inspection. The preview banner is expected. This is not a release bundle, WebKit, real iPhone Safari or proof of complete accessibility. Missing required rendering/check access pauses readiness; record platform limits accurately.

## Access and authority

ChatGPT scheduling tools and GitHub tools are exposed here; scheduled-environment GitHub writes, research, image generation and rendering still need a real test. No Claude execution tool is exposed in this ChatGPT session. Owner will provide the setup prompt directly to Claude; Claude's review verified its scheduler definitions, repository read/comment access, local build and Chromium screenshots. A scheduled run's checkout and tools remain unverified.

Existing subscriptions do not establish API rights or cost. No paid APIs or new hosting. Do not remove another project's task to gain capacity.

Writer/reviewer scheduling is currently disabled in repository policy. Classify the separate activation PR as mandatory: it changes the scheduling prohibition and editorial/automation.json, a material path. Include an explicit Owner decision covering the bounded one-off trial, not recurring publication. Before activating the trial, record the Owner's bounded scheduling decision, reconcile AGENTS.md/PROJECT.md and editorial/automation.json consistently in a separate reviewed activation change, and verify actual task IDs/times. This plan does not grant scheduling or merge authority. Manual Friday release stays separate; reassess governance before any unattended publishing.

## Acceptance and next action

1. Claude re-reviews this corrected plan using the focused handoff below.
2. Consolidate findings on the same PR. Resolve exact first-cycle dates/windows, task slots, checkpoints and authority in the activation change.
3. Run one controlled week with manual release. Test a repeated invocation and a deliberately missing/stale review without duplicate work or publication. Confirm both providers can read the checkpoint, only the Manager edits its summary, and reviewers append keyed comments and inspect exact commits.
4. Record outcomes: article quality, source/visual checks, correction rounds, missed handoffs, manual interventions and actual execution limits. Assess recurring activation after the trial, not from CI alone.

## Review consolidation and focused handoff

Claude reviewed `de5318534600e71769d5bd25a0babee439da8398`: [review](https://github.com/nunov00/pearls-of-wisdom/pull/25#issuecomment-6473599545), plan score 7/10. This correction addresses I1–I5 and M1–M7. No capability is inferred beyond Claude's actual reported checks; the scheduled environment remains untested.

Decisions: retain the existing two-round topic limit separately from two article rounds; choose three one-off Claude tasks and accept a missed Monday rather than add a catch-up schedule; use Manager-issued attempts so a Paused marker does not prevent an explicit recovered retry; require renewed separate review after a changed release date; keep manual final integration and release distinct from Claude's content review. No publication safeguards are weakened.

For re-review, read the exact amended head and compare with your I1–I5/M1–M7. Check the preview/release-date path against schema.ts and release-policy.mjs, marker/attempt behaviour for duplicate, paused and drifted inputs, missed-Monday handling, source-access limits, separate correction budgets, Manager-only summary edits, Node/runtime requirements and mandatory activation boundary. Rate the revised plan honestly and identify remaining blockers/important/minor issues. Do not schedule, edit, merge or publish.

The final activation prompts must be self-contained copies of these stage rules, with actual issue/PR/run IDs, approved dates/windows and task identities. Do not use unexpanded COMMON placeholders. Prepare them after this re-review; the earlier review's prompts need the attempt-key, drift, date and source clarifications here. Existing scheduling remains disabled.
