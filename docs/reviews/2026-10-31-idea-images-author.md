# Painterly idea illustrations — author review

Author: Codex (OpenAI). Independent Claude review: pending.

## Scope

The Owner requested remaking the three small images for each existing article in a style similar to the accepted main images. Nine new, versioned, transparent WebP assets replace the overview references. The existing assets remain available for historical versions. No template, layout, typography, automation, guidance, claim, source, main image or share image changes. A comparison against base bcc75f7ae65dd8f899eadcf5f825d79b9f67bafe confirms that the only article changes are overview image paths/alt text and a revision-history entry. Revised dates already equal 31 October; original publication/evidence dates are preserved.

This is manual work outside the finite weekly trial. It does not consume trial reviews or authorise edits to issue #26.

## Production and visual judgement

Built-in image generation produced the nine painterly vignettes, with transparent backgrounds. Condensed prompt directions are in `2026-10-31-idea-images-prompts.json`. Final assets are 600×600 RGBA WebPs with transparent pixels, 75–109 KB each (decimal units). They are deliberately simpler than the wide main scenes: recognisable people and one or two large props, soft local grounding and no rectangular scenic backdrop. The complete current YAML/illustration raw-byte hashes are in `2026-10-31-idea-images-manifest.json`.

- Exercise: walking, manageable shopping bags and a supportive chair remain distinct. The balance image has both feet planted and a hand on a sturdy four-legged chair; it does not demonstrate an unsupported balance challenge. Shopping bags represent everyday capacity, not a prescribed strengthening routine.
- Study: looking away with a closed book, comparing a card with an open book, and a calendar with separated markers differentiate recall/check/return. Calendar dots are illustrative, not a prescribed spacing formula. No readable generated copy is introduced.
- Finance: bill/calendar, a modest coin reserve and two statements/calculator communicate timing, reserves and comparison. No legible rates, amounts, return promises or wealth symbolism. Existing text still prioritises essentials before extra debt repayments.

Inspected all nine full-size generated outputs and a thumbnail comparison at 90 and 144 pixels. Props and silhouettes are recognisable; small decorative foliage is secondary. The exercise full figures have less facial detail at thumbnail size than the closer study/finance portraits, but the actions remain clear. Matching clothing/palette is coherent, not exact character-identity preservation.

## Actual checks

- Node 24.22.1, fresh `npm ci --ignore-scripts`, then `SITE_URL=<approved origin> npm run verify`: passed; 27 tests, no type errors/warnings, 11 pages, 54 static files and valid internal links.
- `npm run qa:article -- /articles/<slug>/` for all three articles: image loading, overflow, keyboard expansion, citation/return controls and no-JavaScript disclosure passed. Opened and inspected all 18 full-page screenshots, 320/390/1440px collapsed/expanded.
- Opened and inspected three additional 390px dark-mode overview screenshots. The alpha edges blend with the tinted dark cards; no solid boxes or conspicuous edge halos.
- `npm run test:browser -- --project=chromium-desktop`: 9 passed, 1 release-only test skipped; includes automated accessibility checks, not accessibility certification.
- Checked all nine exports for exact 600×600 dimensions and actual alpha transparency. Compared article objects with the base after excluding overview image metadata and revision history: identical. The accepted main/share image bytes remain in the manifest.

Screenshots are local QA output, not committed source. No Safari, live deployment, real messaging-service scrape or release-mode build claimed for this unapproved content revision.

## Author whole-article assessment

Exercise 9/10, study 9/10, finance 9/10, covering the current manifest's whole articles and illustrations. Both reading layers were inspected again, with their recommendations, exceptions, first steps and references intact. The evidence check performed earlier on 31 October is documented in `2026-10-31-main-images-author.md`; the exact guidance and source objects are unchanged from that same-day check. No additional fresh external-source retrieval or full journal-paper reading is claimed for this image pass. These are new author assessments, not a reuse of Claude's PR37 approval for changed image bytes.

Reasons: exercise retains three complementary activity aims and supported-balance precautions while matching its main image; study offers a clear connected recall/check/return routine with more coherent illustrations and no fixed-interval claim; finance keeps priority bills, affordable reserves and jurisdiction limits clear while improving visual consistency. Minor trade-offs: repeated blue clothing and warm tones, some decorative foliage, full-figure exercise faces naturally smaller, and the existing finance debt section remains denser than the other guides. No blocker or important finding in author review.

## Claude handoff / publication boundary

Review the exact PR head and manifest, all nine replacement images and all unchanged main/share images, both article layers, visual suitability and whole-article quality. Record genuine checks/limits, scores and findings; do not treat source availability or previous article scores as independent verification of the new bytes. Keep the site-wide readership distinct from an article's evidence population.

Publication records are deliberately unchanged while independent review is pending. They do not certify these changed YAML bytes; no merge or release until the required final author/Claude assessments agree at 9+ and blockers/important findings are resolved. Then add matching records, verify the unchanged reviewed bytes and run release checks/build before integration. Never manufacture a reviewer record.
