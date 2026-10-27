# Finance pilot: manual review cycles

Owner direction, 27 October 2026: use the third pilot to test one PR, a Codex whole-article score, a Claude whole-article score, then consolidated amendments to the same PR aiming for 9+ from both. The Owner confirmed: “Ok, proceed. For the real thing we will likely schedule tasks for you and Claude.” Scheduling is future intent; none is enabled here.

## Cycle procedure

1. Codex posts the PR, then reviews its exact head commit and records an honest score, reasons, remaining findings and checks performed.
2. The Owner gives Claude the PR link and short handoff below. Claude reviews that same commit and posts its score and findings on the PR. A pasted review must still identify the reviewed commit and actual checks.
3. Codex reads both reviews, consolidates findings by blocker/important/minor, amends the same PR and explains decisions. Both review the updated head again.
4. Stop when both reviewers give at least 9 and all blocker/important findings are resolved. Keep the existing two-correction-round limit: initial review plus at most two amended cycles, then defer/reassess with the Owner if still short. No score inflation, averaging away blockers or implicit waiver.

The PR remains open until Claude's review and the agreed cycle are complete. Neither a passing build nor the supporting same-provider source check replaces Claude's review. No merge, publication or reference-pilot acceptance is claimed by this document. Existing exact-byte release records and final-head review safeguards still apply.

## Reviewer context

Read AGENTS.md, docs/EDITORIAL.md and docs/PUBLISHING.md. Site readers range from mature teenagers to older adults, including people helping others. This article's financial guidance concerns adult household finances; that is not a site-wide age restriction. Assess the whole article: accuracy and sources, usefulness and scope, brief overview and expanded guide, distinct illustrations, phone/desktop readability and working references/controls. Numerical targets and general small print belong in the guide; retain essential qualifications in the overview.

Score honestly out of ten. Report blocker/important/minor findings with concrete improvements and the commit checked. Say what was actually inspected; do not claim a live check of an unmerged PR. Do not edit or merge during the independent review.

## Cycle log

- Cycle 1: initial finance pilot prepared. Exact commit, Codex rating and test evidence will be recorded in a PR comment after posting. Claude: pending.
- Corrections: none yet. Consolidation: pending both reviews.

## Illustration production record

Built-in image generation, 27 October 2026; three separate illustrations, transparent backgrounds preserved, optimised to 600px WebP in public/figures/:

- finance-plan.webp: contemporary adult man checking bills against a large calendar; blue shirt, lilac table, coral accents; simple editorial digital gouache, no text/currency marks/background box.
- finance-buffer.webp: contemporary adult man placing a plain coin in a modest reserve jar; same palette and medium, no promise of wealth or returns.
- finance-debt.webp: contemporary adult man comparing two debt statements; same palette and medium, no actual figures or rates. Generation's extra hand was removed with a targeted image edit; final illustration has two hands holding the two sheets.

The jar is a visual metaphor, not a recommendation to store a reserve as physical cash. Alt text describes visible content without inventing readable rates.
