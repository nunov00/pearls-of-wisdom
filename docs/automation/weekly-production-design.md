# Recurring Pearls of Wisdom production — design for independent review

This proposal has no runtime authority. The completed [6 November trial](https://github.com/nunov00/pearls-of-wisdom/issues/26) remains historical. Record the implementation review, merge and scheduler readback in a new activation and cycle ledger before production work. Never repurpose a trial task or issue.

## Authority and profile

Owner direction, 7 November 2026: “Sounds good. I guess you can make it the same as for the 5 minutes project, right? I don’t want to have to review manually.”

Use the [Five Minutes operating model](https://github.com/nunov00/five-minutes/blob/main/docs/automation/weekly-publication.md) for standing release authority. Codex authors, coordinates and handles Friday release or deferral. Claude independently reviews. The Owner sets the policy once. Routine qualifying releases need no Owner review or confirmation.

Recommend Standard controls for unattended publication, with green checks and agent approval and no per-release Owner approval. Review the profile assessment and GitHub enforcement separately before activation. Keep the Pearls editorial standards, release data, site, queue and Cloudflare integration.

## Weekly cadence

All times are nominal Europe/Zurich dispatch targets. Start on a future Sunday after activation. A separate calendar date cannot recover a missed stage.

| Day | Codex | Claude |
| --- | --- | --- |
| Sunday | 09:13 compare candidates and request review. 19:13 reconcile ranking and commission one candidate. | 14:17 independently assess topic merit and ranking. |
| Monday–Thursday | 09:13 draft or revise the same candidate, validate and request the next eligible review. Freeze when qualified. | 14:17 review the exact eligible article and image bytes when requested. |
| Friday | 09:13 verify and publish or record deferral. | |
| Saturday | No scheduled work. | |

Use one combined ChatGPT task for both Sunday stages and the weekday stages. Test the actual saved schedule for precisely these seven weekly occurrences, including across Zurich daylight-saving changes. Use the actual local date, distinct Sunday stage keys and bounded grace windows. On the Claude side, verify that a repeating routine can be configured and read back through a supported surface. The trial used five one-offs and does not establish recurring support. Do not create replacement one-offs indefinitely or use paid APIs. If the reviewer routine is unavailable, record the blocker and keep activation paused.

## Evidence and publication

- One selected topic, one content PR and at most one release per Sunday cycle. Reserve each stage and review before any mutation. Reconcile reservations, Git history, checks and live state on retry. An incomplete or ambiguous reservation blocks another write or generation. Review implementation must demonstrate safe duplicate and overlapping dispatch handling.
- Keep the Pearls queue process, separate topic assessments, two topic correction rounds, four article review opportunities, three substantive article corrections, and at most four successful main-image generations over the article cycle. Reconcile uncertain image dispatches before proceeding. Missing review cannot create an extra opportunity. No Friday editing, extra review, candidate swap or budget reset.
- Require genuine Codex and Claude assessments of at least 9/10 each for the article and independently at least 9/10 each for the cover. Verify exact reviewed article and image hashes, source evidence, browser QA, closure of significant findings and final review provenance. Work that misses a quality or evidence gate goes to backlog with reasons.
- Friday Codex verifies the actual local publication date and immutable reviewed bytes, permits only the existing release-record addition after content freeze, reviews the resulting integration head, verifies required checks and runs release validation and production-origin build with trusted tooling. Candidate code and configuration must stay outside the content path. Use an expected-head merge. Git integration deploys the resulting main commit. Record merge and public verification separately, including live article/date/metadata, cover hashes and home/library/sitemap links. An unverified deploy stays pending with evidence. Reconcile before retry and never publish the same candidate twice.
- Check task enabled state and the repository publication pause at entry, before writes and generation, and immediately before merge. Uncertain access stops work. Never clear the pause or enable a task from the routine. A paused or disabled workflow preserves drafts, review evidence and the latest good live release.

## Implementation and activation acceptance

1. Obtain Claude’s independent design challenge. Review the recurring Claude execution path and permissions, overlapping dispatches, profile enforcement and the release boundary.
2. Implement a weekly runtime and dispatcher separate from the expired dated trial. Update the current governance and publishing instructions, record the Owner’s standing authority and add a durable activation/cycle ledger. Use trusted-main verification and test dates, stale or missing results, wrong hashes/head, stage replay, incomplete checks, pause, failed deployment and guarded release. Verify integration checks on exact heads.
3. Get independent exact-head implementation approval and green checks. Merge, then verify the controls and fresh scheduled access for both providers. Save and read back task IDs, prompts, time zone, actual occurrences and state. Check capacity without changing other projects’ tasks. Enable only after all activation evidence is recorded. Any missing gate leaves scheduling paused.
