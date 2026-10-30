# Repeatable Chromium checks

The 30 October scheduled preflight received a 195-byte HTML “Site Unavailable” response from the Playwright browser CDN, despite HTTP 200. A manual replacement proved a working alternative; the durable fix removes that CDN from the required Chromium path.

Use Node 24 in a fresh Linux x64 checkout:

```sh
npm ci --ignore-scripts
npm run verify
npm run qa:article -- /articles/exercise-foundations-after-65/
```

For content work, replace the route with the actual article route. Run the runtime gate from current main before any content checkout as required by the trial. These commands grant no publication or task authority.

`@sparticuz/chromium` is an exact, development-only dependency (153.0.0), including compressed Chromium 153.0.8010.0. The npm lockfile checks package integrity. `scripts/browser-runtime.mjs` decompresses only its executable using Node's Brotli stream: no package lifecycle script, tar ownership operation, GPU runtime, shell download, or CDN installer is needed. It requires the pinned ELF header and full SHA-256 before use, including on cached runs. It replaces corrupt/partial cached bytes atomically from the installed package. A missing/corrupt npm package, unsupported platform, hash mismatch or launch failure stops the check with an error. Never accept an HTTP status alone as proof a browser downloaded.

`npm run qa:article` starts the local static server and Playwright in one process, avoiding separate execution network namespaces. It captures 320/390/1440px collapsed/expanded screenshots, checks image loading and overflow, keyboard expansion, references, closing and native no-JavaScript disclosure. Its manifest is reset at invocation; only completion writes `captured-needs-visual-inspection`. **Open and inspect all six screenshots** before recording visual QA as passed. Output is `.browser-qa/<article-slug>/`; do not commit generated files. A capture result is neither a full editorial review nor a publication approval.

The Chromium project in the existing Playwright suite uses the same pinned runtime:

```sh
npm run test:browser -- --project=chromium-desktop
```

WebKit still requires its own installation and is not claimed by Chromium QA. The pinned runtime is older than Playwright's default bundled browser; actual launch/control/screenshot checks must succeed. Upgrades require updating both the exact package/lockfile and expected binary version/hash, then testing in a fresh environment. Do not silently switch binaries or lower screenshot requirements.

External package/network outages can still prevent setup; they must pause the run, never produce a passing preflight. The specific unavailable Playwright CDN download is no longer required. Browser setup must run in each fresh scheduled environment; a previous interactive success or temporary directory is not evidence that a future run has a browser.

Owner direction, 30 October 2026: “Well, you should make sure that it doesn’t happen in the future.” Apply the repeatable setup to future trial prompts and verify through a fresh one-off replacement preflight under a new Manager attempt. Keep the same trial expiry, both-provider gate and manual publication boundary.
