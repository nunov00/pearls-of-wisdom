# Weekly production operating contract

Owner decisions of 7–8 November 2026 approved manager-led weekly production and Monday publication with independent Claude review. On 18 November the Owner requested completion of testing and activation in one session. This contract implements those decisions within Standard governance. The dated November trial is historical.

## Activation

Use issue #58 as the append-only activation and cycle ledger. The manager may activate only after implementation approval, green checks, live evidence-check verification, protected-merge refusal, watchdog delivery verification and saved production prompts for both providers. Keep one Codex task and one Claude reviewer routine. Preserve their existing seven and five weekly dispatches and Europe/Zurich routing.

Record provider IDs, exact prompt text, saved schedule, timezone and enabled state. Record actual provider dispatch evidence and test links. An activation record is one unedited owner-account comment beginning `pearls-weekly ` followed by JSON with `type: "activation"` and `firstCycle` set to a future Tuesday. Separate prose in the ledger explains the Owner decision and links the checks. Production starts on that Tuesday. Before activation or the first cycle, report readiness gaps without editorial writes.

A publication-paused issue, an inactive task, unreadable control state or an unresolved prior deployment stops production. Only the Owner clears a genuine publication pause or changes quality, review, cost or activation policy. Disposable verification incidents may be closed as part of their recorded test cleanup. The watchdog can be stopped by disabling its workflow. A failed or missing watchdog run requires manual ledger reconciliation before commissioning.

## Entry and reconciliation

Read current main AGENTS.md, PROJECT.md, GOVERNANCE.md, docs/EDITORIAL.md, this contract, weekly-release-evidence.md and the schedule router. Read issue #58 and all comments, open publication-paused issues, current candidate PRs and the current task state. Derive the slot from the actual dispatch instant using weeklySlot(provider, instant). Use the returned cycle and stage. A null slot stops the invocation. Never replay a missed calendar day.

Reserve stage keys through release-weekly-ledger.mjs before any mutation. Use a unique provider run reference and confirm the posted start by readback. Reconcile duplicate, incomplete or uncertain starts against Git and generation history before retrying. Complete the stage only after its work and evidence have been verified. The issue API supplies procedural reconciliation, with no atomic-lock claim.

The first activated Tuesday verifies the latest live release and requires no prior recurring-cycle outcome. Each later Tuesday requires exactly one valid prior terminal outcome and a verified latest live release. Reconcile pending deployment or missing closure before starting another candidate. Preserve unrelated queue edits and published article dates.

## Codex stages

- Tuesday select compares and separately scores candidate appeal and practical usefulness, records source-supported briefs and requests Claude topic review in the ledger. Preserve the existing queue and at most two topic correction rounds.
- Tuesday rank reads the genuine Claude result, reconciles ranking and commissions one candidate. Missing review defers commissioning. Record topic, cycle and PR identity once.
- Wednesday to Saturday article slots draft or revise that same candidate. Set its publication date to the cycle's Monday before editorial review. Research primary sources, run content and browser checks, inspect the actual cover and share images, and record honest author scores and hashes. Request only the next eligible Claude review. Allow four article reviews, three substantive correction rounds and four successful main-image generations per cycle. Reconcile uncertain image dispatches. Both providers must score the article and cover independently at least 9/10, with significant findings resolved.
- After editorial qualification, freeze the reviewed bytes and append matching publication and review records. Request Claude's technical approval on that final head in a remaining existing slot. A Saturday first qualification defers because the record-only review cannot fit into the cycle. Preserve all prior records.
- Monday release performs verification only. Require the unchanged approved head and base, exact article and image hashes, genuine provider receipts and the fresh required GitHub checks. Dispatch Weekly release evidence from trusted main for that PR immediately before merging and verify the particular run succeeds for the current head and base. Re-read both immediately before an expected-head guarded merge. Verify the Cloudflare build at the approved public origin and the actual new article. A merge with uncertain deployment remains pending.
- Record one terminal outcome as Published only after live verification, Deferred to backlog for a missed quality/evidence gate, or Blocked for an operational failure. Close a deferred content PR with its reasons while retaining its branch. Record the watchdog-compatible outcome entry described in weekly-release-evidence.md.

## Claude stages

Tuesday topic-review independently assesses the requested briefs and ranking. Wednesday to Saturday article-review acts only on a recorded eligible request. Reserve the stage, inspect exact requested Git article and image bytes, sources, rendering and findings, and post a genuine review receipt. Do not assume that a previous green check or score covers changed bytes. Use the existing review budgets and actual provider session reference.

If the request is for final integration review, verify that only the matching release records changed after editorial qualification, and approve or reject the actual current PR head using GOVERNANCE.md's approval format. It consumes the existing dispatch window and adds no editorial review opportunity. The reviewer never edits or publishes the candidate.

## Evidence

Use the exact request, receipt, record and approval formats enforced by release-weekly-github.mjs and release-weekly-policy.mjs. The request comment binds PR, candidate, cycle, reviewed commit, paths and all three hashes. The two receipts bind requestId, role, provider, distinct runId, decision, scores, findings and the same candidate fields. Verify account, unedited comments, actual provider provenance and exact correspondence. Never manufacture a provider review or convert a test fixture into production evidence.

Ledger readers accept one machine-readable line per comment, optionally followed only by the exact attribution footer `\n\n---\n_Generated by [Claude Code](https://claude.ai/code)_`, which Claude's GitHub write routes append automatically (observed 24 November 2026 in #58 and #67). Any other trailing text remains invalid. Edited comments remain rejected.

Append terminal outcomes as `pearls-weekly {"type":"outcome","key":"<Tuesday cycle>/outcome","outcome":"published"}`, using `deferred` or `blocked` as appropriate. Preserve details and evidence links alongside each machine-readable record.

## Verified controls and remaining limits

PR #61 received Claude approval and passed all required checks before merge. Live PR #65 first failed without a current-head manual confirmation and then passed Weekly release evidence after verification of unchanged publication records. The active Protect main ruleset now requires that GitHub Actions check alongside baseline, privacy and Governance verdict. The expected-head merge attempt on #62 was refused specifically because Weekly release evidence failed. Both disposable PRs were closed without merging.

The watchdog ran from main in #44269626776 and correctly reported inactive production. Isolated branch run #44270218503 exercised the main script using a synthetic in-memory activation, real GITHUB_TOKEN issue creation, pause labelling and assignment. An immediate second call created a duplicate before the new issue was visible through the list API. Both test incidents (#63 and #64) were closed. Later run #44271297304 successfully detected those closed incidents and suppressed another creation. Weekly workflow concurrency serialises scheduled watchdog runs. On an uncertain create response, inspect the actual incident list before rerunning. Test state was never written to the production ledger.

Implementation and policy changes require Standard review on their exact commits. Editorial receipts additionally require the real Codex and Claude pair. Shared GitHub credentials provide procedural provider provenance, not cryptographic provider authentication.
