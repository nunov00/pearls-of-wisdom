# Recurring Pearls of Wisdom production — design for independent review

This proposal has no runtime authority. The completed [6 November trial](https://github.com/nunov00/pearls-of-wisdom/issues/26) remains historical. Record the implementation review, merge and scheduler readback in a new activation and cycle ledger before production work. Never repurpose a trial task or issue.

## Authority and profile

Owner direction, 7 November 2026: “Sounds good. I guess you can make it the same as for the 5 minutes project, right? I don’t want to have to review manually.”

Use the [Five Minutes operating model](https://github.com/nunov00/five-minutes/blob/main/docs/automation/weekly-publication.md) for standing release authority. Codex authors, coordinates and handles Friday release or deferral. Claude independently reviews. The Owner sets the policy once. Routine qualifying releases need no Owner review or confirmation.

Recommend Standard controls for unattended publication, with green checks and agent approval and no per-release Owner approval. The Owner must explicitly decide on Lightweight → Standard before a mandatory transition PR records that decision and the standing Friday release authority. Verify the ruleset before lifting the transition freeze. Policy, budget and reviewer changes, additional costs, clearing the publication pause and re-enabling tasks remain Owner decisions. Keep the Pearls editorial standards, release data, site, queue and Cloudflare integration.

## Weekly cadence

All times are nominal Europe/Zurich dispatch targets. Start on a future Sunday after activation. A separate calendar date cannot recover a missed stage.

| Day | Codex | Claude |
| --- | --- | --- |
| Sunday | 09:13 compare candidates and request review. 19:13 reconcile ranking and commission one candidate. | 14:17 independently assess topic merit and ranking. |
| Monday–Thursday | 09:13 draft or revise the same candidate, validate and request the next eligible review. Freeze when qualified. | 14:17 review the exact eligible article and image bytes when requested. |
| Friday | 09:13 verify and publish or record deferral. | |
| Saturday | No scheduled work. | |

Use one combined ChatGPT task for both Sunday stages and the weekday stages. Test the actual saved schedule for precisely these seven weekly occurrences, including across Zurich daylight-saving changes. Use the actual local date, distinct Sunday stage keys and bounded grace windows. On the Claude side, verify that a repeating routine can be configured and read back through the Claude Code scheduled routines interface. Record the saved ID, exact prompt, schedule expression, time zone and next occurrences. Verify both providers across Zurich daylight-saving transitions, preserving the author-to-reviewer handoff even if Claude stores UTC. The trial used five one-offs and does not establish recurring support. Do not create replacement one-offs indefinitely or use paid APIs. If the reviewer routine is unavailable, record the blocker and keep activation paused.

## Evidence and publication

- Classify article, article-asset and release-record changes as material by path. Require exact-head `governance/approval` under Standard plus a dedicated required weekly release check. The dedicated check uses trusted policy and verifies the actual Codex and Claude evidence, their provider provenance, both sets of ratings, and the article and cover hashes against the merge candidate. Missing, stale or inconsistent evidence fails the check. Prove the ruleset rejects a release without the required evidence before activation.

- One selected topic, one content PR and at most one release per Sunday cycle. Reserve each stage and review before any mutation. Reconcile reservations, Git history, checks and live state on retry. An incomplete or ambiguous reservation blocks another write or generation. Review implementation must demonstrate safe duplicate and overlapping dispatch handling.
- Keep the Pearls queue process, separate topic assessments, two topic correction rounds, four article review opportunities, three substantive article corrections, and at most four successful main-image generations over the article cycle. Reconcile uncertain image dispatches before proceeding. Missing review cannot create an extra opportunity. No Friday editing, extra review, candidate swap or budget reset.
- Require genuine Codex and Claude assessments of at least 9/10 each for the article and independently at least 9/10 each for the cover. Verify exact reviewed article and image hashes, source evidence, browser QA, closure of significant findings and final review provenance. Work that misses a quality or evidence gate goes to backlog with reasons.
- Before each Claude article review, include the candidate release record on that same PR head. It references the preceding immutable content commit and exact hashes and uses Friday's intended date. It must make no claim of completed review or publication before either happens. Confirm the record schema can represent this without fabricated evidence. Claude gives exact-head technical approval alongside qualifying editorial evidence when warranted. Friday Codex verifies the actual Zurich date, both assessments, the record and release bytes on that same unchanged head, verifies required checks and runs release validation and production-origin build with trusted tooling. Any head change invalidates approval. Friday cannot create a new head or re-date a release. Candidate code and configuration must stay outside the content path. Require up-to-date branches in the ruleset, validate the exact base and head, re-read both immediately before an expected-head merge and stop on drift. Git integration deploys the resulting main commit. Record merge and public verification separately, including live article/date/metadata, cover hashes and home/library/sitemap links. An unverified deploy stays pending with evidence. Reconcile before retry and never publish the same candidate twice.
- Check task enabled state and an open `publication-paused` issue in the repository at entry, before writes and generation, and immediately before merge. Uncertain access stops work. The Owner can stop production in one step by opening an issue with that label. Read the label and rules from trusted repository state, never candidate content. Never clear the pause or enable a task from the routine. A paused or disabled workflow preserves drafts, review evidence and the latest good live release.

## Cycle closure and exceptions

- Record exactly one terminal outcome per cycle: Published (live verified), Deferred to backlog, or Blocked. Reconcile pending deployments before closing or commissioning another cycle. Each Sunday requires a prior closure and verifies the latest recorded release is still live. A missing closure, unresolved deployment or live mismatch blocks new commissioning. Close deferred content PRs with reasons and preserve their branches and history. Reconcile unrelated queue edits against current main and preserve them. Changes affecting the commissioned topic or approved ranking block the cycle until resolved within its existing slots.
- Report Blocked and missing closure via one deduplicated GitHub issue assigned to the Owner. Use a separate scheduled GitHub Actions health check with no production write permissions to detect absent Friday closure even when Codex does not run. The health check may only record or update the incident and add the pause label. Missing closure at the Saturday check pauses immediately. Before activation, demonstrate delivery to an Owner-visible channel and define recovery if the health check itself becomes unavailable. Routine deferrals are ledger outcomes.
- A credible material error in a live article triggers a pause and an incident notification. Correct or revert via a separately reviewed maintenance PR with green checks and live verification. Only the Owner clears the pause. The routine does not commission topics that require personalised medical or financial judgement.

## Implementation and activation acceptance

1. Obtain Claude’s independent design challenge. Review the recurring Claude execution path and permissions, overlapping dispatches, profile enforcement and the release boundary.
2. Implement a weekly runtime and dispatcher separate from the expired dated trial. Update the current governance and publishing instructions, record the Owner’s standing authority and add a durable activation/cycle ledger. Use trusted-main verification and test dates, stale or missing results, wrong hashes/head, stage replay, incomplete checks, pause, failed deployment and guarded release. Verify integration checks on exact heads.
3. Get independent exact-head implementation approval and green checks. Merge, then verify the controls and fresh scheduled access for both providers. Save and read back task IDs, prompts, time zone, actual occurrences and state. Check capacity without changing other projects’ tasks. Enable only after all activation evidence is recorded. Any missing gate leaves scheduling paused.
