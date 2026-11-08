# Monday release evidence and cycle records

This contract is for implementation and review. It does not activate publishing or replace the existing manual release policy.

Use one scheduled Codex task for all seven weekly dispatches from the [Monday design](weekly-production-design.md). Claude uses one separate reviewer routine. The Tuesday watchdog runs in GitHub Actions.

## Cycle ledger

Use one GitHub issue, with append-only comments, for activation and cycle evidence. Derive the slot from actual Zurich dispatch time with `weeklySlot` and use `weeklyReservationKey(slot)` as the stage key. Before any editorial write or generation, read the ledger and reconcile the candidate PR and current Git state. Append a start entry with the unique run ID and reread it. Stop before mutation if another start exists for the key, a prior stage is incomplete, or the read or write is uncertain. Recheck before writes and generation. This is procedural duplicate handling, as in Five Minutes. Issue comments do not provide an atomic lock. Do not run overlapping jobs for the same stage, replay uncertain mutations, or use the experimental Git ref adapter. Claude's routine only writes review evidence for a recorded request. It does not edit or publish the candidate.

Keep one candidate and one terminal outcome per Tuesday cycle. Record Published only after checking the live site. Otherwise record Deferred or Blocked, or leave deployment pending until reconciled. The Tuesday GitHub Actions watchdog reads the same ledger. There is one scheduled Codex task and one separate Claude review routine.

## Release through the existing Cloudflare build

Keep the current publication and review JSON files and Cloudflare's existing build from `main`. Use the cycle ledger for the intent and exact-head receipts. Require separate Codex and Claude scores of at least 9/10 for the article and cover, both linked to the reviewed article commit and exact article and image hashes. A provider name in a comment or candidate file is not proof of provenance. The release check must verify evidence through authorised surfaces or block.

Once both editorial receipts qualify, prepare the standard publication and review records from the completed evidence on the same PR before Monday. The review record names the actual earlier article commit. The next existing Claude slot may independently approve the final integration head after confirming that the only post-review changes are the matching release records and that all reviewed bytes are identical. This is technical approval and cannot revise the article, rescore it, extend the four review opportunities or change the date. If there is no remaining slot, defer. Monday verifies the unchanged approved head, the receipt and record correspondence, green required checks and the actual Zurich date, then merges and verifies the existing Cloudflare deployment.

The dedicated release check must use trusted base code and reject missing evidence, changes outside the allowed paths, inconsistent records and any drift in the reviewed article or images. The editorial content SHA and the approved final PR head serve distinct purposes. Before activation, independently review and test this distinction, simulate overlapping or uncertain dispatches and verify that the existing release build still includes older articles. This design has no runtime authority.
