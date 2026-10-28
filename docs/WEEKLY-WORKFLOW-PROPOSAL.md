# Weekly article workflow — activation proposal

Status: proposed, inactive. Owner accepted the Monday–Friday workflow on 28 October 2026 and offered to give Claude a setup prompt. This document prepares that handoff; it creates no tasks or authority changes.

## Target and roles

Aim for one article per Friday, conditional on quality. ChatGPT coordinates, researches, writes and consolidates. Claude challenges the topic and independently reviews the article. The Manager handles Friday release manually during the trial. Both whole-article assessments must reach 9+, with no unresolved blocker/important findings. At most two substantive correction rounds; otherwise defer.

Use the [completed queue pilot](pilots/2026-10-28-idea-queue-outcome.md), [idea process](IDEAS.md), [editorial standard](EDITORIAL.md) and [publication safeguards](PUBLISHING.md). All work stays in this repository; no Five Minutes changes.

## Proposed schedule

Timezone: Europe/Zurich, including daylight-saving changes. Morning/afternoon are proposed windows, not configured task times. Start with one controlled weekly cycle, then assess before recurring activation.

| Window | Agent | Work and completion evidence |
| --- | --- | --- |
| Monday morning | ChatGPT | Reconcile active work; propose one candidate and research brief from reviewed queue. Record why it leads. |
| Monday afternoon | Claude | Challenge scope, value, appeal and evidence route before drafting. Record develop/revise/park and reasons. |
| Tuesday morning | ChatGPT | Proceed only after a usable topic review. Research competing foundations, draft full article/illustrations, inspect phone/desktop, open or update one PR, self-review exact head. |
| Wednesday afternoon | Claude | Review exact head and supporting sources; inspect rendered states where available; score whole article and record findings/checks/limits. |
| Thursday morning | ChatGPT | Consolidate findings, amend same PR, rerun affected checks, assess exact new head; record correction round. |
| Friday morning | Claude | Fresh final review of the actual current head, affected evidence, presentation and implications. Record score and readiness; never merge. |
| Friday after review | Manager, manual | Reconcile both assessments, current head/base, dates, hashes and CI; release only through existing guarded process and verify live deployment. |

If Monday's topic is not ready, do not draft just because Tuesday arrived. If Thursday changes need another round, Friday is not an automatic publication deadline. One active article carries over, with a revised target date; do not start a duplicate next Monday.

## Durable checkpoint

For the controlled trial, use one GitHub tracking issue per cycle and one content PR. Keep an append-only comment trail and a current summary linking immutable evidence. This is a proposed record convention, not an executable schema or enforced lock.

Record: run ID (Pearls plus Zurich target Friday), candidate ID, target date, owner/agent, stage, branch/PR, head SHA, article hash when available, author and reviewer assessment references, correction-round count, checks, blocker, next action, merge/deployment outcome. Stage values: proposed, topic-review, drafting, article-review, revising, final-review, release-ready, released, paused, deferred.

Before every stage, read AGENTS.md/PROJECT.md/GOVERNANCE.md and the issue/PR. Reconcile open work and current GitHub head. No reliance on chat memory or a comment merely claiming approval. Record actual review performance and commit. Reviewer comments never become new permissions.

Before a write, re-read the head and stage. If another agent has changed the same work, stop and reconcile. These checks are procedural; concurrent-run exclusion must be demonstrated before calling this unattended-safe.

## Task instructions

Every task starts by finding the active trial checkpoint. If it cannot identify exactly one applicable run, stop with a concise blocker. Reuse its candidate, branch and PR. Completed stages are no-ops unless a substantive change invalidates them.

Author stages must preserve source-access honesty, broad readership versus advice applicability, evidence alternatives, actual rendered QA and the 9+ target. Keep content changes separate from CI, permissions, deployment code and safeguards.

Claude stages must be a real independent provider execution. Consider candidate merit before opening author ratings; article review is informed by the complete draft and author self-review, not claimed blind. Give reasons, concrete remedies, remaining gaps and actual checks. No invented scores, source access, tests or screenshots.

Missing material evidence, review, tool access or required checks pauses the run. Do not retry indefinitely: at most one retry of the same transient failed operation after inspecting provider state; then record the blocker. A new scheduled wake-up reconciles the paused run rather than silently clearing it. Preserve the last valid live article.

## Access and authority

ChatGPT scheduling tools and GitHub tools are exposed here; scheduled-environment GitHub writes, research, image generation and rendering still need a real test. No Claude execution tool is exposed in this ChatGPT session. Owner will provide the setup prompt directly to Claude; verify Claude's scheduler, repository access and tools there.

Existing subscriptions do not establish API rights or cost. No paid APIs or new hosting. Do not remove another project's task to gain capacity.

Writer/reviewer scheduling is currently disabled in repository policy. Before activating the trial, record the Owner's bounded scheduling decision, reconcile AGENTS.md/PROJECT.md and editorial/automation.json consistently in a separate reviewed activation change, and verify actual task IDs/times. This plan does not grant scheduling or merge authority. Manual Friday release stays separate; reassess governance before any unattended publishing.

## Acceptance and next action

1. Claude challenges this plan and verifies its own scheduling/access capabilities. Use the setup prompt below.
2. Consolidate findings on the same PR. Resolve exact first-cycle dates/windows, task slots, checkpoints and authority in the activation change.
3. Run one controlled week with manual release. Test a repeated invocation and a deliberately missing/stale review without duplicate work or publication. Confirm both providers can read/write the same checkpoint and inspect exact commits.
4. Record outcomes: article quality, source/visual checks, correction rounds, missed handoffs, manual interventions and actual execution limits. Assess recurring activation after the trial, not from CI alone.

## Prompt to give Claude now

Read the complete proposed weekly workflow in this PR and AGENTS.md, PROJECT.md, GOVERNANCE.md, docs/EDITORIAL.md, docs/PUBLISHING.md, docs/IDEAS.md and the recorded queue-pilot outcome.

Act as independent reviewer of the workflow proposal. Challenge feasibility, dependencies, checkpoint/retry behaviour, quality gates, exact-commit review, publication-date/hash handling and the boundary between scheduled preparation/review and manual release. Post findings on this PR with the exact commit and actual checks. Do not edit, merge or activate anything during this review.

The intended reviewer entries are Monday afternoon topic challenge, Wednesday afternoon full article review, and Friday morning final review, Europe/Zurich. The Owner will ask you directly to schedule them once activation instructions are final. Check whether your available scheduling environment can run those tasks with this repository, source research and rendered QA. Report verified capabilities, limits, available task capacity if accessible, and any setup the Owner must perform. Do not assume Claude Pro gives API access or incur costs.

Prepare the exact task prompts and proposed schedule definitions in your review response, carrying the checkpoint/reconciliation rules and stop conditions from this document. A reviewer task must never write the article, self-certify, merge, publish, change governance or enable other tasks. Missing inputs pause the cycle. Do not claim scheduled tasks exist until their tool results confirm it.

This is plan review and schedule preparation only. We will supply the final activation prompt after consolidation; existing writer/reviewer scheduling remains disabled meanwhile.
