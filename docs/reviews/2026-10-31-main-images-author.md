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

Presentation scores: exercise 9/10, study 9/10, finance 9/10. The images are attractive, recognisable at phone size and coherent with the existing illustrated people. The exercise scene is the most visually expansive; study and finance use clear task cues. Minor trade-offs: the three new scenes use similar blue shirts and warm light, and the exercise background is relatively detailed. On narrow phones the banner adds a short scroll before the third idea; this is the intended image-first trade-off, with typography unchanged.

These are **presentation assessments**, not a newly verified whole-article publication score. I read the rendered overview and expanded guidance, but did not freshly re-open external evidence sources in this image-only pass. Do not reinterpret historical review scores as a new exact-byte approval. Claude must review the exact updated articles and all illustration bytes, record findings and actual evidence/QA checks, and assess whole-article quality. Complete any outstanding author whole-article verification before publication.

## Publication boundary

No publication/release records were changed. Their existing article hashes are intentionally stale for these proposed revisions, so this branch is for editorial preview and independent review, not deployment. After the required author/Claude final quality assessments, update matching release records in this PR, verify exact head and manifests, and run the release build. Never change old records to claim Claude approved bytes that were not reviewed.

No Safari, dark-mode screenshot, live deployment or real social-service preview was tested in this pass. Review feedback must be handled before merge/publication; no merge or deployment is authorised by this author note alone.
