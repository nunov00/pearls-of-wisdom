# Pearls of Wisdom

A small, evidence-based practical publication. Working identity; pre-launch.

## Current status

The local MVP includes Today, Library search and filters, category pages, article evidence panels, sharing, About, content validation, publication safeguards and backup tooling. Three sourced example articles are **drafts awaiting independent review**. The repositories now exist; no public site or scheduled writer/reviewer exists. The Owner approved implementation on 19 October 2026 and explicitly excluded scheduling.

## Run locally

Use Node 24 and the committed lockfile:

```sh
npm ci --ignore-scripts
npm run verify
npm run dev
```

The default build is an editorial preview. It includes drafts, noindex metadata and a visible preview banner. This is **not access control**: do not upload the preview publicly. `dist/` is portable static output.

## Commands

| Command | Purpose |
|---|---|
| `npm run verify` | Type/markup diagnostics, focused policy tests, validated build, internal-link checks |
| `npm run links` | Source reachability report; 1 = dead link, 2 = uncertain, 0 = reachable |
| `npm run backlog -- <article-id> <reason>` | Return an existing article to the revision queue without changing its dates |
| `npm run backup` | Source archive and checksum under ignored `backups/` |
| `npm run release:check` | Reject missing/stale/self reviews and unresolved significant findings |

No script sends content to a social platform, calls a paid model or schedules work. Deployment is not connected. Pinned Wrangler and local dry-run/guarded deployment commands are available; see deploy/cloudflare/README.md.

## GitHub repositories

Source: `nunov00/pearls-of-wisdom`. Private feedback: `nunov00/pearls-of-wisdom-feedback`. The inherited governance template is retained. Initial implementation is transferred via a feature PR; no public deployment or recurring task is configured. CI runs only for PRs and main pushes.

Feedback has a page and a narrow Cloudflare adapter, disabled by default. It stores only category/message in the private repository after server-side spam verification and a runtime repository-privacy check. See [docs/FEEDBACK.md](docs/FEEDBACK.md) for setup and limitations.

See [PROJECT.md](PROJECT.md), [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md), [docs/EDITORIAL.md](docs/EDITORIAL.md), [docs/PUBLISHING.md](docs/PUBLISHING.md) and [docs/OPERATIONS.md](docs/OPERATIONS.md).
