# Idea-queue pilot outcome — 28 October 2026

## Outcome

**Successful manual idea-generation and review trial; complete through queue consolidation and merge.** Independent challenge materially improved the candidate order, hooks, scope and audit trail. The trial did not commission or produce a new article, test unattended execution or demonstrate reader demand.

Owner requested this outcome record on 28 October and identified turning the successful process into a repeatable automated workflow as the next workstream. That records direction for subsequent design; this outcome record does not enable tasks or change approval/publication authority.

## Evidence and review trail

- [PR #23](https://github.com/nunov00/pearls-of-wisdom/pull/23): one PR from proposal through correction, re-review and merge.
- Initial author proposal: `7a37765c189e75b61f378eb6ca102daebf1f7590`.
- [Claude initial review](https://github.com/nunov00/pearls-of-wisdom/pull/23#issuecomment-6473046934): that exact commit; source spot-checks, process challenge, candidate dispositions and proposed order.
- One substantive correction round: `e00840349a565edc261cd6b2bb21df993999858d`.
- [Claude re-review](https://github.com/nunov00/pearls-of-wisdom/pull/23#issuecomment-6473189511): that exact amended commit; confirmed substantive findings resolved and queue/shortlist consistency. It was informed by the initial review, not blind.
- Final administrative cleanup: `3187c963bc1ab5192bd43f8a29c301e54f36ed66`; removed stale status wording, recorded the outcome and normalised spacing. Self-checked, not independently re-reviewed. No candidate or merit-order change.
- Final-head [Baseline](https://github.com/nunov00/pearls-of-wisdom/actions/runs/40716711162) and [Privacy check](https://github.com/nunov00/pearls-of-wisdom/actions/runs/40716710506) both passed.
- Verified merged as `bcc464c427e0addee3977c4dd8f94b9dd52215a3`.

The author recorded separate usefulness and appeal scores. Claude supplied reasoned written judgements, not numerical scores. No overall 9+ article rating or paired numerical calibration was established by this queue trial.

## Pool and candidate results

The original 13 entries became 15 after adding photo recovery and leftovers. Three linked initial article entries were unchanged, leaving 12 future ideas. All original IDs and history were preserved. Six retitles now retain their earlier title/description and reason in history.

Eight candidates were assessed: **four develop, two revise, two park/revise**. Four other ideas remain in the wider pool. No idea was deleted or rejected.

| Merit rank | Candidate | Consolidated disposition | Remaining development |
| --- | --- | --- | --- |
| 1 | Main email protection and recovery | Develop | Check provider-specific recovery and backup routes. |
| 2 | Leftovers | Develop | Check Scottish guidance and food-specific exceptions, including rice. |
| 3 | Personal photo recovery | Develop | Verify consumer sync, retention, deletion and restore behaviour. |
| 4 | Sleep | Develop with narrowed scope | Verify age applicability and clinical boundaries. |
| 5 | Teeth and gums | Revise | Develop the misconception-led hook and compare candidate foundations. |
| 6 | Focused work | Revise evidence first | Find stronger primary evidence for the actual proposed actions. |
| 7 | Everyday meals | Park | Find a distinctive, practical angle. |
| 8 | Household energy | Park/revise | Narrow scope and establish evidence suited to varied homes. |

The four retained alternatives concern stress, disagreements, parental support for study, and exercise adherence. Their refinement/parking reasons remain in the [shortlist](../ideas/2026-10-28-shortlist.md).

Email remains the leading research candidate because it combines a specific reader problem, potential practical value and a credible initial evidence route. **No first commission has been recorded.** Merit order is separate from publication sequencing.

## What the trial changed

- Moved leftovers from fourth to second and photos from seventh to third. Variety no longer depresses merit rank.
- Strengthened email and dental hooks; clarified teen readership separately from the applicability of adult evidence.
- Corrected the overstated consumer-backup source limitation.
- Moved author ratings after neutral-ID briefs. The first review was only partly shielded from ratings; this is not retroactively described as blind.
- Preserved earlier queue history, explicitly recorded retitles and distinguished current counts from historical validation.
- Kept weak or broad ideas available with reasons rather than quietly deleting or recreating them.

## Limits

Evidence screens are preliminary, not claim-level article certification. Microsoft Research and Energy Saving Trust returned 403 to Claude; the author's earlier access does not establish independent verification. Claude did not fetch new sources during re-review or run full local verification. CI results and scripted preservation checks are recorded separately from those limits.

One batch does not establish reliable autonomous selection, recovery from interrupted runs, sustained topic quality, elapsed effort or operating cost. No deployment verification is needed to establish this repository-only queue outcome; no new publication or live-site change is claimed.

## Handoff to automation design

Use [IDEAS.md](../IDEAS.md) and this worked example as the starting specification. Preserve the distinct steps: discovery and deduplication, candidate briefs, author assessment, independent challenge, bounded correction, consolidation, and a separate commissioning decision.

The next design should make run identity, exact reviewed commits, durable checkpoints, duplicate prevention, retries, source-access failures and review/merge boundaries concrete. Verify available provider access and costs rather than assuming subscriptions provide APIs. Define a controlled trial and its acceptance criteria before scheduling execution.

As checked for this outcome record, `editorial/automation.json` remains `enabled: false`, `mode: manual-only`. No scheduler, paid service, authority change or Five Minutes modification is introduced here.
