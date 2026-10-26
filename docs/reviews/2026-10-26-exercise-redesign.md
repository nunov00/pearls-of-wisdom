# Exercise redesign — independent editorial review

- Reviewer: Codex /root/editorial_review (OpenAI), separate from the implementing agent.
- Author: Codex /root (OpenAI).
- Review date: 26 October 2026.
- Decision: ready; no blocker or important findings.
- Review class: material (optional presentation/source metadata added to the content schema).
- Handoff: PR #13, https://github.com/nunov00/pearls-of-wisdom/pull/13.
- Reviewed remote implementation commit: `3fe13b53ef36b64acf57dad8a565c57cfb165867`.
- Reviewed local implementation commit: `5df65cf2d6b7768a246c4f94ad0f19e282ce8d5d`.
- Implementation tree: `5bb02bd228bbeb06e34c6efca6943f29574a58b0`.
- Article: `src/content/articles/exercise-foundations-after-65.yaml`.
- Exact article SHA-256: `d2543bd999fead74a4a7effb2ae2292b64af9eef62fe91630b285d4f063f36b4`.
- Correction rounds: 0. No content corrections were needed in this review.

The final article bytes were fetched from the remote implementation commit and compared with the locally reviewed file: identical. This is an independent same-provider review, not different-provider review or a claim of deployment verification.

## Recommendation selection

Before reading the current article or its selection rationale, the reviewer independently selected aerobic/endurance activity, deliberate strengthening, and functional balance/multicomponent activity as the three leading complementary exercise aims for adults aged 65 and over. Flexibility may matter for particular restrictions but is not established here as an equivalent universal fourth foundation. Nutrition and home hazards affect independence but fall outside the exercise-focused scope.

The final article matches those candidates and does not imply a measured ranking or promise to prevent every fall or illness.

## Source checks and citation mapping

All three original source pages were independently opened and their relevant text inspected on 26 October 2026. The checks used the accessible public guidance pages, not a claim to have reviewed every underlying study.

| Source | Sections inspected | Support checked against the final article |
| --- | --- | --- |
| [WHO, Physical activity, 2021](https://www.who.int/europe/news-room/fact-sheets/item/physical-activity) | Physical activity recommendations, adults and older adults | Weekly aerobic target of 150–300 minutes of moderate activity; strengthening on two or more days; varied multicomponent balance and strength activity at moderate or greater intensity on three or more days. |
| [CDC, Older Adult Activity: An Overview, 2025](https://www.cdc.gov/physical-activity-basics/guidelines/older-adults.html) | Recommendations, adaptation to ability, benefits | Separate strengthening recommendation, daily function/independence benefits, and adapting activity to abilities and conditions. |
| [CDC, What Counts as Physical Activity for Older Adults, 2025](https://www.cdc.gov/physical-activity-basics/adding-older-adults/what-counts.html) | Measuring intensity, muscle strengthening, balance, multicomponent activity | Talk test; weights, bands and body-weight examples; balance/fall-prevention guidance and overlap among training aims. |

The renderer derives citation numbers from each recommendation's claim IDs and those claims' source IDs. For this article the resulting sources also support the practical `whatToDo` text: move cites WHO and CDC activity guidance; strength cites CDC overview plus CDC activity guidance through the new `strength-practice` qualification; balance cites WHO and CDC activity guidance. These associations were checked rather than assuming a benefit citation automatically supports practical targets. Reference return links use the corresponding recommendation/source citation IDs.

Publication years match the source page dates. The original publication date remains 19 October 2026; the revision and evidence-check dates are 26 October 2026, with matching revision history.

## Scope, safety and presentation

The compact overview contains exactly the three core ideas. Audience/adaptation text and the unsteadiness warning remain outside the collapsed full guide. The balance recommendation preserves WHO's combined balance/strength activity and intensity qualification. The images are illustrative everyday scenes, not exercise instructions; the balance image depicts supported standing and does not ask readers to practise unsupported. Each of the three 600 × 600 WebP images has an appropriate alternative description.

The expanded guide retains practical first steps, supporting evidence, source limits and the wider-independence caveat. Native details/summary markup provides reading without JavaScript. This review inspected the shared renderer, schema, article data and images; it does not certify rendering on an actual iPhone or successful production deployment.

## Findings

| ID | Severity | Status | Finding |
| --- | --- | --- | --- |
| source-title-who | minor | open | The inherited reference title is “Physical activity recommendations”; the WHO page's visible title is “Physical activity”. The linked page and checked recommendations are correct. Exact-title polish can be made in a later content revision with a refreshed hash. |

## Validation performed

- Independently ran `npm test`: 16 tests passed, no failures.
- Checked the final article SHA-256 and compared its bytes with the reviewed remote commit.
- Inspected the compact overview, visible safety placement, claim/source-to-footnote mapping, reference return IDs, optional schema fields and all three images.
- No publication records were edited by this reviewer. No independent browser or deployment success is claimed.
