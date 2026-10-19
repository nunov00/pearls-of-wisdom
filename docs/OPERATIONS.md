# Operations and recovery

## Initial setup

Both GitHub repositories exist and are private. No Cloudflare resource, domain or scheduled task has been configured by this implementation. CI has only PR/push triggers. Credentials are not included.

Use Node 24 and `npm ci --ignore-scripts`. `npm run verify` checks types, policy tests, validated generation, H1/language/noindex rules, internal links and file size/count. Core content needs no JavaScript. Browser visual QA, accessibility automation, WebKit and actual iPhone Safari checks remain required before launch; they were not available in the initial environment.

## Cloudflare

The inactive `deploy/cloudflare/wrangler.jsonc` has workers_dev disabled and no custom domain. The feedback adapter is disabled and has no secrets. Do not connect a Git integration that would auto-publish draft builds. After launch approval, use an approved SITE_URL and RELEASE=1 for production, verify checks and connect least-privilege deployment access. Prefer Cloudflare’s Git integration to storing a token in GitHub where suitable. Verify preview isolation and shared free-tier quotas first. Pin Wrangler when the real deployment adapter is activated rather than using an unpinned global tool.

## Backup

`npm run backup` creates a compressed source archive and SHA-256 checksum. It excludes dependencies, build output, Git internals, environment files and prior backups. Archive includes content/evidence, queue, schemas, scripts, config, lockfile and docs. Keep a dated copy outside the primary repository. The initial source package is also retained as a deliverable.

After the repository exists, add `git bundle create <backup-path> --all` to preserve branches/history. Do not claim Git history is backed up until that step has run. Agree retention and backup destination before launch; local backups alone are insufficient.

## Restore drill

Extract an archive into a new empty directory, run `npm ci --ignore-scripts`, then `npm run verify`. Confirm article IDs and checksums before attaching a remote or deploying. Restoration must not overwrite an existing checkout. Reattach only verified credentials outside source control.

## Rollback

Before launch, record a known-good Cloudflare deployment version and verify provider rollback. If a release is bad, restore that version, confirm live behaviour, then make the matching corrective/revert PR so the next deployment cannot restore the fault. Keep original article dates. No real provider rollback has been tested because no deployment exists.

## Failure diagnostics

Validation failure: inspect the named article/field and fix source. Review failure: return to the same PR, bounded to two rounds. Source failure: record blocked/partial status, do not fabricate access. Build failure: retain last good deployment. Unknown deploy result: inspect provider state before retry. Missing schedule capability: stay manual. Quota pressure: reduce redundant builds/reviews, never silently buy capacity.
