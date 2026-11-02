# Email protection — author assessment, initial draft

Run Pearls-2026-11-06, slot 2026-11-02, article review 1, correctionRounds 0. Author: Codex /root (OpenAI). **Open this assessment only after recording an initial independent judgement.** Exact PR head is recorded in the Manager request on #26; the content hashes below identify the bytes assessed here. This is author self-review, never independent approval.

## Whole-article assessment

**9/10. Ready for initial independent review, not publication.** The opening gives three short, distinct ideas. The guide supplies practical first steps, a one-device route and provider limits without a menu-by-menu matrix. Recovery is prepared before changing sign-in. Passkeys are not presented as magic or as an extra password; retained password routes and device access are covered. The scam section stays about account access, not the separate payment-scam proposal. All three foundations have checked primary guidance and explicit claim mappings.

Remaining minor weaknesses: the first section is denser than the other two because provider differences matter; eight references make the optional depth long. The cover uses a physical metaphor rather than demonstrating a provider interface. None of these is a blocker in my assessment. Claude may challenge that judgement. No account login, recovery, code-generation or security-product test was performed. This is guidance-based general education, not a tested universal procedure or a quantified risk-reduction claim.

The article and main-image scores are independent judgements; neither is averaged or rounded up. Claude's article/image assessment is not yet available. No ready pair, release record or publication approval exists.

## Evidence and selection

Fresh public retrieval on 2 November 2026 inspected all eight cited primary guidance pages. The article's source records provide exact URLs, checked sections, support and limits:

| Source ID | Inspection focus |
| --- | --- |
| google-codes | Purpose, setup conditions, generation/replacement and use |
| microsoft-code | Generation, storage, replacement and sign-in waiting-period qualification |
| microsoft-form | Important warning and prerequisites; distinguished from the code route |
| ncsc-email | Sign-in options, reuse and remaining password routes |
| google-passkey | Device requirements, setup warning, existing factors and lost-device section |
| fido | FAQ distinction between synced and device-bound credentials |
| google-2sv | Prompts, verification-code warnings and backup-code section |
| google-security | Device locks/updates and suspicious requests/activity |

Additional screens: NCSC's general passkeys page and Google 2SV troubleshooting informed the research, but are not substitutes for the article's cited support. No cited material source was blocked. Some web retrievals used equivalent language/context query parameters on the same provider help article. No full research paper or live account was inspected. FIDO marketing statistics and vendor-comparison claims were excluded. The NCSC email page addresses small organisations; only general principles corroborated by consumer provider guidance were applied.

The schema distinguishes guidance from editorial dependency inferences. No causal effect size, universal three-item ranking or measured omission harm is claimed. Recovery, authentication and approval behaviour were compared with password managers, hardware keys, account audits and broader scam education; the article records why those alternatives are supporting tools, a different scope or unsuitable as universal requirements. Device locking and updates remain essential context rather than being silently discarded to fit three headings.

Sunday m1–m3 are addressed in the draft: one-device preparation, provider-specific examples without dense paths, and the limits of phishing-resistant authentication. Scope is personal accounts with current access. Managed accounts, special protection programmes, existing compromise and coercive control are routed outside this preparation guide. Existing articles and their dates are byte-identical to the previous trial head. Intended new publishedAt is 2026-11-06; the local preview's future date is not a release claim.

## Main image

**Author image-quality score: 9/10.** One focal action, readable phone/email and paper-envelope relationship, warm deliberate light, convincing hand and drawer geometry, no secret/code/text leakage or visible artefact. It remains clear at phone and small landscape sizes. A centred square crops the phone's outer edge but retains the email symbol and recovery envelope. The composition differs from the three existing people-at-activity covers while keeping a coherent finish. No additional explanatory figure or overview thumbnails are needed.

Production: built-in image-generation tool, **one successful call, zero failures, zero refinements**, across this article cycle so far. The first result met the brief, so the allowance was not spent further. No paid API or fallback was used. Original generation was inspected, then resampled to the required 1200×630 WebP and matching JPEG; exports depict the same composition. These are the final repository assets, not references to a temporary generation file:

- `public/figures/email-recovery-main-v1.webp`
- `public/figures/email-recovery-main-v1.jpg`

Full generation prompt:

> Use case: illustration-story. Create an outstanding painterly editorial cover for an evidence-based article called Protect your main email account without locking yourself out. Reader question: if my phone disappeared, could I still reach my email? Convey calm preparedness and a way back in, without a guarantee of security. Scene: a cinematic close still life on a warm walnut entryway shelf, rich afternoon light. A modern dark smartphone standing slightly angled shows only one simple cream envelope symbol on its otherwise deep green screen, no letters or interface text. Beside it, a person's natural hand is placing a small unmarked cream paper envelope into a beautiful half-open shallow personal storage drawer. This is a visual metaphor for keeping recovery information separate from the phone; absolutely no visible codes, numbers or passwords. The phone and envelope are both large and close together within the central square area, the physical envelope is the focal point. Tactile paper, subtle painted wood grain, compelling interplay of sunlit amber and deep forest/teal shadows, contemporary editorial illustration with confident brushwork and refined soft edges, sophisticated magazine quality. Landscape composition about 1.9:1 suitable for a 1200x630 export, generous clean peripheral space; central square crop must retain phone and envelope. The hand must be anatomically convincing and the drawer physically plausible. Avoid laptop-at-desk stock scenes, padlocks, shields, floating icons, robots, blue cyber graphics, text, digits, logos and watermark. No technical diagram or exact instructions. Make it arresting and clear even as a small thumbnail.

Inspected the full-size WebP, square crop and 360×189 landscape preview, the cover in actual 320/390/1440px light and dark pages, and a comparison with the three recent covers. The JPEG shares the same resized source composition. No real messaging-service scrape or engagement test was performed.

## Exact content and illustration manifest

| Repository path | Raw SHA-256 | Bytes |
| --- | --- | --- |
| src/content/articles/protect-your-email.yaml | 00df492b93332f9622a656542023b60b56bb787711bce3f14ad12e3c47ba3100 | 16658 |
| public/figures/email-recovery-main-v1.webp | 44805de7b9e3af53985f49521574ebbafadc4ad07b1765ffb9d38e01d215395b | 129178 |
| public/figures/email-recovery-main-v1.jpg | a599d7e70caa4a516167fe9987ee42d75fde60eb15950a6f51c0e184e4f4d76b | 202834 |

Site paths map `/figures/…` to `public/figures/…`. The shared article component renders only this article's main WebP; the JPEG is its share copy. No overview image, optional figure or shared article-specific asset is referenced. Generic site chrome is excluded. Shared components, styles, scripts, dependencies, policy and release records are unchanged.

## Actual verification and visual inspection

Node v24.22.1, `npm ci --ignore-scripts && npm run verify`: exit 0, 329 packages installed, 43 Astro files with zero diagnostics, 28/28 tests passed. Validator: four article drafts, 21 queue entries. Preview build: 13 HTML pages, 64 static files and resolving internal links. npm's proxy warning did not block checks. A preservation check confirmed only topic-07 receives the new draft link/history; all other queue entries and existing article bytes/dates are unchanged.

`npm run qa:article -- /articles/protect-your-email/` exited 0 using the pinned helper and Chromium 153.0.8010.0, executable SHA-256 `53a15d6c3a3d27dfb54c4ba60278b1683136f70cf1e67e989da7dfbd3d451ef0`. No CDN installer or old ad-hoc browser. Manifest time: 2026-11-02T08:30:26.510Z.

All six full-page light-mode screenshots were opened and inspected: 320/390/1440px, each collapsed and expanded. Each expanded page was additionally inspected in consecutive 1200px strips at readable size. Checked the entire reading order, cover, title, three ideas, focus state, scope, contextual precautions, first steps, references/backlinks, limits and footer. No blocking clipping, unreadable text, broken image or horizontal overflow. Machine checks report scrollWidth equal to each viewport, loaded article image, keyboard Enter expansion, citation fragment navigation, closing/return control, no page errors and native disclosure with JavaScript disabled.

Temporary evidence paths in the working checkout: `.browser-qa/protect-your-email/{320,390,1440}-{collapsed,expanded}.png`, `result.json` and `inspect-*.jpg`. They are local inspection evidence, not permanent GitHub attachments. Desktop inspection aids crop whitespace and a few edge pixels; this is not clipping in the actual full-page capture.

Supplementary checks used temporary copies of the same QA script/runtime without repository script changes: dark mode at all three widths (manifest 08:31:28Z), with all three collapsed views and the 390 expanded view opened; cover retains contrast and detail. The evidence-notes disclosure was separately opened and its whole additional reading layer inspected at 390px in consecutive strips under `.browser-qa-evidence/protect-your-email/`. Full-sized cover/crops and the recent-cover comparison were opened. A captured-needs-visual-inspection manifest was never treated as sufficient on its own.

Limits: local editorial-preview Chromium only; no Safari/WebKit, live deployment, release build, complete accessibility certification or live provider workflow test. Browser captures of the intended future date do not establish publication. Final immutable head, tree equality, drift/duplicate rechecks and successful handoff read-back are recorded on #26 after publication of this draft commit.
