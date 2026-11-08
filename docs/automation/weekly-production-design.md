# Recurring Pearls of Wisdom production — design for independent review

This proposal has no runtime authority. The completed [6 November trial](https://github.com/nunov00/pearls-of-wisdom/issues/26) remains historical. Record the implementation review, merge and scheduler readback in a new activation and cycle ledger before production work. Never repurpose a trial task or issue.

## Authority and profile

Owner direction, 7 November 2026: “Sounds good. I guess you can make it the same as for the 5 minutes project, right? I don’t want to have to review manually.”

Use the [Five Minutes operating model](https://github.com/nunov00/five-minutes/blob/main/docs/automation/weekly-publication.md) for standing release authority. Codex authors, coordinates and handles Monday release or deferral. Claude independently reviews. The Owner sets the policy once. Routine qualifying releases need no Owner review or confirmation.

Standard governance was approved by the Owner and implemented in #49. The #52 connector probes verified that Protect main blocks an unapproved merge and accepts the same commit after independent approval. Policy, budget and reviewer changes, additional costs, clearing the publication pause and re-enabling tasks remain Owner decisions. Keep the Pearls editorial standards, release data, site, queue and Cloudflare integration.

## Weekly cadence

Owner direction, 8 November 2026: “Ok, proceed. As 5 minutes is published on Friday, maybe we can make the schedule to publish on Monday?”

All times are nominal Europe/Zurich dispatch targets. Start on a future Tuesday after activation. A separate calendar date cannot recover a missed stage.

| Day | Codex | Claude |
| --- | --- | --- |
| Tuesday | 09:13 compare candidates and request review. 19:13 reconcile ranking and commission one candidate. | 14:17 independently assess topic merit and ranking. |
| Wednesday–Saturday | 09:13 draft or revise the same candidate, validate and request the next eligible review. Freeze when qualified. | 14:17 review the exact eligible article and image bytes when requested. |
| Sunday | No scheduled work. | |
| Monday | 09:13 verify and publish or record deferral. | |


Use one combined ChatGPT task for both Tuesday stages and the Wednesday–Saturday and Monday morning stages. Test the actual saved schedule for precisely these seven weekly occurrences, including across Zurich daylight-saving changes. Use the actual local date, distinct Tuesday stage keys and bounded grace windows. On the Claude side, verify that a repeating routine can be configured and read back through the Claude Code scheduled routines interface. Record the saved ID, exact prompt, schedule expression, time zone and next occurrences. Verify both providers across Zurich daylight-saving transitions, preserving the author-to-reviewer handoff even if Claude stores UTC. If a provider stores UTC, use the winter-equivalent dispatches: Codex 08:13 and 18:13 UTC, Claude 13:17 UTC. These land inside the respective windows in both seasons. The trial used five one-offs and does not establish recurring support. Do not create replacement one-offs indefinitely or use paid APIs. If the reviewer routine is unavailable, record the blocker and keep activation paused.

## Evidence and publication

- Classify article, article-asset and release-record changes as material by path. Require exact-head `Governance verdict` under Standard plus a dedicated required weekly release check. The dedicated check uses trusted policy and verifies the actual Codex and Claude evidence, their provider provenance, both sets of ratings, and the article and cover hashes against the merge candidate. Missing, stale or inconsistent evidence fails the check. Prove the ruleset rejects a release without the required evidence before activation.

- One selected topic, one content PR and at most one release per Tuesday cycle. Reserve each stage and review before any mutation. Reconcile reservations, Git history, checks and live state on retry. An incomplete or ambiguous reservation blocks another write or generation. Use the append-only issue ledger and stop-and-reconcile procedure in [release evidence](weekly-release-evidence.md). Verify the behaviour under overlapping dispatches before activation.
- Keep the Pearls queue process, separate topic assessments, two topic correction rounds, four article review opportunities, three substantive article corrections, and at most four successful main-image generations over the article cycle. Reconcile uncertain image dispatches before proceeding. Missing review cannot create an extra opportunity. No Monday editing, extra review, candidate swap or budget reset.
- Require genuine Codex and Claude assessments of at least 9/10 each for the article and independently at least 9/10 each for the cover. Verify exact reviewed article and image hashes, source evidence, browser QA, closure of significant findings and final review provenance. Work that misses a quality or evidence gate goes to backlog with reasons.
- Prepare standard publication and review records from completed editorial receipts before Monday, following [release evidence](weekly-release-evidence.md). Require Claude’s exact-head technical approval of the record-only change, and verify the final article and image bytes against both editorial receipts. Monday verifies the unchanged head, required checks, actual Zurich date and production-origin build, then uses an expected-head merge. Re-read the base and head immediately before merging and stop on drift. The existing Cloudflare Git integration deploys from `main`. Record merge and public verification separately. An unverified deployment stays pending.
- Check task enabled state and an open `publication-paused` issue in the repository at entry, before writes and generation, and immediately before merge. Uncertain access stops work. The Owner can stop production in one step by opening an issue with that label. Read the label and rules from trusted repository state, never candidate content. Never clear the pause or enable a task from the routine. A paused or disabled workflow preserves drafts, review evidence and the latest good live release.

## Cycle closure and exceptions

- Record exactly one terminal outcome per cycle: Published (live verified), Deferred to backlog, or Blocked. Reconcile pending deployments before closing or commissioning another cycle. Each Tuesday requires a prior closure and verifies the latest recorded release is still live. A missing closure, unresolved deployment or live mismatch blocks new commissioning. Close deferred content PRs with reasons and preserve their branches and history. Reconcile unrelated queue edits against current main and preserve them. Changes affecting the commissioned topic or approved ranking block the cycle until resolved within its existing slots.
- Report Blocked and missing closure via one deduplicated GitHub issue assigned to the Owner. Use a separate scheduled GitHub Actions health check with no production write permissions to detect absent Monday closure even when Codex does not run. The health check may only record or update the incident and add the pause label. Missing closure at the Tuesday 07:30 Zurich health check, before selection opens at 08:43 (06:30 UTC if the scheduler stores UTC) pauses immediately. Before activation, demonstrate delivery to an Owner-visible channel and define recovery if the health check itself becomes unavailable. Routine deferrals are ledger outcomes.
- A credible material error in a live article triggers a pause and an incident notification. Correct or revert via a separately reviewed maintenance PR with green checks and live verification. Only the Owner clears the pause. The routine does not commission topics that require personalised medical or financial judgement.

## Implementation and activation acceptance

1. Obtain Claude’s independent design challenge. Review the recurring Claude execution path and permissions, overlapping dispatches, profile enforcement and the release boundary.
2. Implement a weekly runtime and dispatcher separate from the expired dated trial. Update the current governance and publishing instructions, record the Owner’s standing authority and add a durable activation/cycle ledger. Use trusted-main verification and test dates, stale or missing results, wrong hashes/head, stage replay, incomplete checks, pause, failed deployment and guarded release. Verify integration checks on exact heads.
3. Get independent exact-head implementation approval and green checks. Merge, then verify the controls and fresh scheduled access for both providers. Save and read back task IDs, prompts, time zone, actual occurrences and state. Check capacity without changing other projects’ tasks. Enable only after all activation evidence is recorded. Any missing gate leaves scheduling paused.
