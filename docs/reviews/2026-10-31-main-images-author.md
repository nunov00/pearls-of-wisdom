# Main images — author handoff, 31 October 2026

Author: Codex (OpenAI). Independent reviewer: Claude, pending.

## Scope and intent

Add main images to the three existing articles using the template introduced in #35 and the editorial rule in #36. The Owner accepted the exercise proposal and authorised matching study/finance images and one review PR. This is manual work outside the finite weekly trial; do not use its review slots or issue #26.

Each scene uses natural daylight, illustrated people and cobalt blue accents. Exercise depicts everyday movement and independence, study depicts recall with a closed book, and finance depicts organising household money with a modest reserve. They are topic introductions, not complete diagrams of the three recommendations. Original publication and evidence-check dates are preserved; revised dates and revision histories identify the visual addition. Guidance, claims, sources and recommendation illustrations are unchanged.

## Production

Images were created with the built-in image-generation tool. Final prompt direction:

- Exercise: wide premium editorial illustration of two older adults walking on a level sunlit park path, cobalt clothing, a modest shopping bag, believable anatomy, no text or unsupported exercise demonstration.
- Study: matching painterly editorial scene of an adult recalling an answer at a desk, pen and answer card, reference book closed, natural daylight, no readable text or fantastical memory symbols.
- Finance: matching scene of an adult organising household papers with a calculator and modest savings jar, bright uncluttered home, no readable amounts or promises of wealth.

Exports are exactly 1200×630, WebP for pages and JPEG for sharing. Combined six-asset size is about 1.12 MB; each page loads one main WebP (about 120–201 KB). Full-size generated originals are not needed by the application. All referenced illustration and article raw-byte SHA-256 values are in `2026-10-31-main-images-manifest.json`. That manifest is author input, not an independent approval.

## Checks actually performed

- Node 24.22.1, `npm ci --ignore-scripts`, then `SITE_URL=https://pearls-of-wisdom.vitoria-nuno.workers.dev npm run verify`: passed.
- `npm run qa:article -- /articles/<slug>/` for all three articles: passed automated checks; opened and visually inspected all 18 full-page screenshots (320/390/1440px, collapsed/expanded). Images load, no horizontal overflow, headings and supporting illustrations remain distinct, and guide layout remains readable. Keyboard expansion, citations, return control and no-JavaScript disclosure are checked by the runner.
- `npm run test:browser -- --project=chromium-desktop`: 9 passed, 1 release-only test skipped. Includes automated accessibility checks; this is not accessibility certification.
- Inspected built HTML metadata for all three article URLs and the homepage: correct absolute JPEG image URLs, descriptive alt, large share-card type; homepage stays website, article routes stay article. This is metadata inspection, not a real messaging-service scrape.
- Inspected generated artwork and final rendered placements. No legible generated copy, unsafe demonstrated exercises or investment-return claims were introduced.

## Author assessment

Author whole-article scores: exercise 9/10, study 9/10, finance 9/10. The images are attractive, recognisable at phone size and coherent with the existing illustrated people. The exercise scene is the most visually expansive; study and finance use clear task cues. Minor trade-offs: the three new scenes use similar blue shirts and warm light, and the exercise background is relatively detailed. On narrow phones the banner adds a short scroll before the third idea; this is the intended image-first trade-off, with typography unchanged.

After the initial presentation pass, I completed the author whole-article review: read both layers, exceptions, sources and excluded alternatives, and freshly opened all eleven cited source pages. This assessment covers the article and illustration bytes in the accompanying manifest; it is self-review, not independent approval. Claude must review the same exact updated articles and all illustration bytes, record findings and actual checks, and assess whole-article quality.

Reasons for the whole-article scores:

- Exercise 9/10: distinct endurance/strength/balance aims, manageable starts, older-adult applicability and supported-balance precautions are clear. The main image shows ordinary walking, not a claim that walking replaces strengthening or balance training. Minor limitation: a broad exercise introduction cannot provide an individual routine.
- Study 9/10: the recall/check/return sequence and one continuous example make the evidence usable; spacing is not presented as a fixed scientific formula, and feedback overlaps recall explicitly. The closed-book scene reinforces the first action. Minor limitation: these foundations do not cover every practical skill.
- Finance 9/10: timing, affordable reserves and borrowing costs form complementary steps. Essential and priority bills precede extra repayments, with jurisdiction limits and direct help routes. The main image shows modest organisation and reserves rather than wealth promises. Minor limitation: the debt section remains the densest, though its caveats are useful and paragraph structure is readable.

### Source recheck, 31 October 2026

Inspected the relevant text on each article's existing source URLs; the report below describes access actually achieved, not a new systematic literature review. No reader-facing guidance or evidence dates were edited in this visual revision.

- Exercise: WHO Europe physical-activity fact sheet, adult and older-adult recommendations; CDC older-adult overview, recommendations/benefits; CDC what-counts page, intensity, strengthening and balance sections. The stated weekly targets, activity categories, talk test and functional/fall-prevention rationale are supported. Retained adaptations to ability and the separate-strengthening requirement.
- Study: APS publisher page for Dunlosky et al. (2013), including its explicit high-utility assessment of testing and distributed practice; Learning Scientists FAQ on strategy overlap, spacing intervals, corrective feedback and difficulty/scaffolding. The APS publisher summary was inspected, not the full journal paper; no claim of full-paper reading is made. The article makes appropriately broad claims, labels practical examples as examples and avoids numerical effect claims.
- Finance: CFPB emergency-fund guide (cash-flow timing, situational targets, automatic-transfer overdraft risks, safe/accessible reserve and borrowing costs); archived CFPB debt-reduction guide (higher-rate-first versus smaller-balance-first); MoneyHelper prioritising debts (consequence-based priorities and urgent help); MoneyHelper advice locator (free/confidential advice and benefits checks); MoneyHelper personal-loans guide (unsecured borrowing and early-repayment costs); CFPB credit-counselling guide (reputation, qualifications and written fees). All eleven cited pages were accessible. Direct help-destination submission flows were not exercised.

Source URLs are preserved verbatim in the manifest's article YAML inputs and were opened directly for this check. No new material unsupported claim or blocking finding was found. Claude's independent judgement and exact-byte approval remain outstanding.

## Publication boundary

No publication/release records were changed. Their existing article hashes are intentionally stale for these proposed revisions, so this branch is for editorial preview and independent review, not deployment. After Claude’s required final quality assessment agrees on these exact bytes, update matching release records in this PR, verify exact head and manifests, and run the release build. Never change old records to claim Claude approved bytes that were not reviewed.

No Safari, dark-mode screenshot, live deployment or real social-service preview was tested in this pass. Review feedback must be handled before merge/publication; no merge or deployment is authorised by this author note alone.

## Integration update after independent review

Claude approved the unchanged article/illustration bytes at full commit b9b55a9574bc3778d66915382b67f76aff80b69c, scoring each whole article 9/10: https://github.com/nunov00/pearls-of-wisdom/pull/37#issuecomment-6549170794 . Its report verifies all 18 manifest entries, dimensions, full-size images, phone/desktop and light/dark Chromium renders, and share metadata. Claude explicitly used Node 22 rather than 24, did not recheck sources or reread unchanged prose line by line, and did not test Safari or a real messaging preview. The author independently ran Node 24 checks and freshly inspected source pages as recorded above. These limits remain part of the review record.

No article or image byte changed after that approval. Matching new review records now retain the exact reviewed full commit, raw article/illustration hashes, both scores and the genuine review link; publication records point to them without changing original publication dates. Historical records are preserved. The existing release hash check is unchanged. `npm run release:check` and the Node 24 release-mode `npm run verify` pass.

Minor style feedback is retained without altering approved assets. The accepted exercise direction is the style reference for this set, so no additional Owner style decision is needed to complete this revision. Similar study/finance compositions and a broader range of ages/settings are useful considerations for future imagery. The report does not establish a site-wide reader age. Final integration/CI and any merge/deployment are tracked on the PR; earlier pending-status paragraphs describe the author handoff state.
