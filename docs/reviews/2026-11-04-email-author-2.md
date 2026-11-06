# Email protection — author assessment, first correction

Pearls-2026-11-06 · slot 2026-11-04 · review 2 · correctionRounds 1 · attempt 1. Author: Codex (OpenAI). **Open after recording an initial independent judgement.** The exact head is in the Manager request. This assessment covers the raw bytes listed below.

## Whole article — 9/10

The first step now asks readers to confirm they can reach their current recovery contacts without their usual phone. The guide distinguishes a text sent to a retained number from credentials stored only on the device. It keeps the safe sequence of preparing a fallback while signed in, then choosing stronger authentication and rejecting unsolicited access requests. I shortened the second heading and clarified the opening. The first recovery section is still denser than the others, and six references are grouped at its start. Those are minor readability limitations.

[Claude's review 1](https://github.com/nunov00/pearls-of-wisdom/issues/26#issuecomment-6578591832) identified the recovery gap as important. I checked Google's recovery contact and lost-phone guidance for the updated checks and the conditional replacement-SIM route. Google's 2-Step Verification guidance and FIDO's synced/device-bound distinction support treating device-bound credentials separately. Apple's account recovery guidance supports the example of a provider-specific process with a possible wait. Google's Security Checkup guide explicitly covers screen locks and updates, now linked to the device precaution. The article's source entries identify the sections and limits. I retained the original Google and Microsoft recovery-code qualifications and the distinction between Microsoft's code and form routes. I did not test a real sign-in, transfer or recovery.

Recovery, stronger sign-in and safer approval address distinct failure paths. Password managers and hardware keys support sign-in where suitable, while device maintenance supports the whole plan. Account audits and broader scam education are outside this guide's practical goal. It is for personal accounts with current access. Managed accounts, special protection programmes, suspected compromise and coercive control require separate guidance. The intended article date remains 2026-11-06.

## Main image — 9/10

The key card entering a lockbox gives the recovery metaphor a clearer focal action than the original envelope. The dark phone and email symbol remain distinct in the actual phone-width landscape and 360×189 preview. The centered square crop keeps the card and storage action but loses most of the phone, a limitation for platforms that crop tightly. The original is a warmer close-up of a hand and drawer. The new still life uses a clear visual cue specific to account recovery and differs from the recent activity covers.

One successful built-in generation this round, two across the article cycle, zero failed generations or subsequent refinements. Brief: a wide, painterly still life of an ivory backup card marked with one key silhouette being placed in a lockbox, with a separate shadowed phone carrying an email glyph, no letters or codes, legible at thumbnail size. The same source was cropped to 1200×630 and exported as WebP and JPEG. The earlier assets remain for historical review and are unreferenced by this article.

## Raw-byte manifest

| Repository path | SHA-256 | Bytes |
| --- | --- | --- |
| src/content/articles/protect-your-email.yaml | 6b281c010a0771fe809f73d05e561b85be0b171b609d1d7a8aced7a33db42878 | 20169 |
| public/figures/email-recovery-main-v2.webp | 52e0ea192a5b7bb4ea9d745c053fa16fb77d458156dff18146b4d7f8290846db | 127714 |
| public/figures/email-recovery-main-v2.jpg | 2cf2bf656f05904e1b4696b45ce2c8f30acb576f0dfddb292101d3faa6151b3c | 158631 |

The article template renders the WebP and references the JPEG for sharing. No other article-specific illustrations are referenced. Generic chrome is excluded.

## Verification

Node 24.22.1, `npm ci --ignore-scripts`, then `npm run verify`: 28 tests passed and the preview build verified 13 HTML pages and 66 static files. An initial browser invocation started before the build finished and returned 404. The complete sequential verification and QA rerun used the final bytes and passed.

`npm run qa:article -- /articles/protect-your-email/` completed at 08:20:34Z using the pinned npm Chromium 153.0.8010.0. Opened all six full-page captures as a contact sheet and inspected the expanded reading order in strips. Checked the cover, title, overview, precautions, first steps, limitations, references and footer. No blocking overflow, clipping or broken image. The second heading fits at 320px. The runner verified Enter expansion, citation fragment navigation, return/closing, no page errors and native disclosure at 390px with JavaScript disabled. The cover was also inspected at three dark-mode widths. Local captures remain in the working checkout. These checks cover local Chromium preview. Safari, live publication, release build, full accessibility certification and real provider workflows were outside this check.
