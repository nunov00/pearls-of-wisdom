# Reading polish — independent editorial review

- Reviewer: Codex /root/editorial_review (OpenAI), separate from the implementing agent.
- Author: Codex /root (OpenAI).
- Review date: 26 October 2026.
- Decision: ready; no blocker, important or newly open minor findings.
- Scope: the Owner-authorised second polish pass following the illustrated overview in [PR #13](https://github.com/nunov00/pearls-of-wisdom/pull/13), including the 26 October request for a less age-specific title.
- Reviewed remote implementation commit: `22945ff206b0de4b1e1ee4fae5fc4eabd9a0a34c`.
- Reviewed local implementation commit: `f2da0709a743a70ecaef73059386e6591caee7d5`.
- Local implementation tree: `b2d65de2240367e6815e0860e79308349618d8df`.
- Article: `src/content/articles/exercise-foundations-after-65.yaml`.
- Exact article SHA-256: `2796e344059be98efb89d214358f5f58b7d5bd64160419f73e39ad8afe23200f`.
- Correction rounds: 0. No content correction was requested during this polish review.

The article was fetched from the remote implementation commit and compared with the locally reviewed bytes: identical. This is an independent same-provider review, not different-provider review. The reviewer did not edit the source article or publication records.

## Recommendation selection and age framing

The independent blind selection recorded in the first review still applies: endurance/aerobic activity, deliberate strengthening and functional balance/multicomponent activity are appropriate complementary exercise foundations. Flexibility may address individual restrictions; nutrition and home hazards affect independence but are outside this exercise-focused scope.

The revised title, “Stay strong, steady and active as you get older”, is broader in tone without changing the basis of the numerical advice. The visible audience line explicitly identifies the targets as following guidance for ages 65+, and says to adapt activity to abilities and health. The balance paragraph also explicitly identifies adults aged 65 and over. It does not present these targets as a personalised prescription or guarantee.

## Source support and reference mapping

The three public source pages were independently opened and inspected earlier on 26 October 2026 for the preceding review. The final wording was checked against those same passages; no uninspected study is claimed as evidence.

| Source | Checked support in the revised wording |
| --- | --- |
| [WHO, Physical activity, 2021](https://www.who.int/europe/news-room/fact-sheets/item/physical-activity) | The aerobic range, separate strengthening target, and combined balance/strength recommendation on three or more days. The plain-language balance wording retains moderate or greater effort and the older-adult audience. |
| [CDC, Older Adult Activity: An Overview, 2025](https://www.cdc.gov/physical-activity-basics/guidelines/older-adults.html) | Strengthening frequency, daily function/independence and adaptation to abilities and conditions. |
| [CDC, What Counts as Physical Activity for Older Adults, 2025](https://www.cdc.gov/physical-activity-basics/adding-older-adults/what-counts.html) | The talk test, examples of strengthening activities, balance/fall-prevention guidance and activity overlap. |

The shortened WHO wording still describes varied activity combining balance practice and strength work, rather than substituting passive supported standing for a training programme. The vigorous/moderate mixture in the aerobic detail is now clearer. There is no unsupported ranking or quantified promise.

Claim-to-source associations remain correct for the displayed practical text: move cites WHO and CDC activity guidance; strength cites CDC overview and CDC activity guidance through `strength-practice`; balance cites WHO and CDC activity guidance. Numbered references and return links are derived from those IDs. The audit notes preserve claim text, evidence classifications, reference numbers, check dates, checked sections and limits behind one optional disclosure.

## Safety and other articles

The exercise audience/adaptation line and unsteadiness warning remain outside the full-guide disclosure. The expanded text also retains safety advice and the limits of an exercise-only guide. The three edited WebP illustrations were inspected: 600 × 600 with alpha transparency, appropriate alternative descriptions, and the balance image shows a hand resting on a fully visible chair. They are everyday illustrations, not technical exercise demonstrations.

The shared renderer was checked against the unchanged finance and learning article data. Finance still shows the arrears/local-debt-advice warning before expansion; the detailed text retains protection of essential payments and minimums, and the jurisdiction-dependent repayment-order caveat. Learning retains its learner/task limits and the distinction between recall practice and initial learning or skill mastery. Moving detailed evidence into the grouped audit notes does not remove an essential safety warning from either article.

The consistent short headings and removal of repeated internal navigation do not change the advice. The bottom return link closes the guide, the full-guide control remains native details/summary, and the share action remains secondary. This review does not claim actual-device rendering, automated browser success or production deployment.

## Findings

| ID | Severity | Status | Finding |
| --- | --- | --- | --- |
| source-title-who | minor | resolved | The inherited WHO reference title now matches the visible source title, “Physical activity”. |

No blocker or important findings remain.

## Validation performed

- Independently ran `npm test`: 16 tests passed, no failures.
- Compared the final remote article bytes with the reviewed local article and computed the SHA-256 above.
- Inspected the final article, shared renderer, relevant styles, unchanged other article safety fields, source mappings and transparent illustrations.
- No publication/release records were edited by this reviewer; production verification remains the implementing agent's separate task.
