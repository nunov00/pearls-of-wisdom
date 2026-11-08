import assert from 'node:assert/strict';
import test from 'node:test';
import { digest } from '../scripts/release-policy.mjs';
import { checkWeeklyPullRequest } from '../scripts/release-weekly-github.mjs';

const base = 'a'.repeat(40);
const head = 'b'.repeat(40);
const reviewed = 'c'.repeat(40);
const paths = { article: 'src/content/articles/article.yaml', cover: 'public/figures/cover.webp', shareCover: 'public/figures/share.jpg' };
const recordPaths = ['editorial/publications.json', 'editorial/reviews.json'];
const article = { id: 'article', publishedAt: '2026-11-16', claims: [], sources: [],
  mainImage: { src: '/figures/cover.webp', shareSrc: '/figures/share.jpg' } };
const bytes = { article: JSON.stringify(article), cover: 'cover', shareCover: 'share' };
const hashes = Object.fromEntries(Object.entries(bytes).map(([key, value]) => [key, digest(value)]));
const candidate = { articleId: article.id, paths, hashes, cycle: '2026-11-10', head: reviewed,
  publishedAt: article.publishedAt, reviewSlot: 1, correctionRounds: 0, imageGenerations: 1 };
const comment = (id, body) => ({ id, body, user: { login: 'owner' }, created_at: 'same', updated_at: 'same' });
const entry = (id, data) => comment(id, 'pearls-weekly ' + JSON.stringify({ pr: 1, ...data }));

function fixture() {
  const pr = { number: 1, state: 'open', changed_files: 5, base: { ref: 'main', sha: base },
    head: { sha: head, ref: 'weekly-article/example', repo: { full_name: 'owner/repo' } } };
  const files = [...recordPaths, ...Object.values(paths)];
  const afterReview = [...recordPaths];
  const ledger = [entry(10, { type: 'review-request', candidate })];
  for (const [role, provider] of [['author', 'codex'], ['reviewer', 'claude']]) {
    ledger.push(entry(ledger.length + 10, { ...candidate, type: 'receipt', requestId: 10, role, provider,
      runId: provider, decision: 'ready', articleScore: 9, coverScore: 9, findings: [] }));
  }
  const approvals = [comment(20, 'APPROVED · reviewer: Claude (Anthropic) · author: Codex (OpenAI) · commit ' + head)];
  const publication = { articleId: 'article', state: 'published', publishedAt: article.publishedAt, reviewId: 'review' };
  const review = { id: 'review', articleId: 'article', author: 'Codex (OpenAI)', reviewer: 'Claude (Anthropic)',
    decision: 'ready', reviewedCommit: reviewed, articleSha256: hashes.article, correctionRounds: 0, findings: [],
    illustrationSha256: { [paths.cover]: hashes.cover, [paths.shareCover]: hashes.shareCover } };
  const results = [];
  const errors = [];
  const response = (data) => ({ data });
  const github = {
    paginate: async (endpoint, input) => (await endpoint(input)).data,
    rest: {
      pulls: { get: async () => response(pr), list: async () => response([pr]),
        listFiles: async () => response(files.map((filename) => ({ filename }))) },
      issues: { listComments: async ({ issue_number }) => response(issue_number === 58 ? ledger : approvals) },
      checks: { listForRef: async () => response([]), create: async (result) => results.push(result) },
      repos: {
        compareCommitsWithBasehead: async ({ basehead }) => response({ status: 'ahead',
          files: (basehead.startsWith(reviewed) ? afterReview : files).map((filename) => ({ filename })) }),
        getContent: async ({ path, ref }) => {
          if (path === 'src/content/articles') return response([{ name: 'article.yaml', path: paths.article }]);
          const asset = Object.keys(paths).find((key) => paths[key] === path);
          const data = asset ? bytes[asset] : JSON.stringify(ref === base ? [] : [path === recordPaths[0] ? publication : review]);
          return response({ type: 'file', encoding: 'base64', content: Buffer.from(data).toString('base64') });
        },
      },
    },
  };
  const run = async (ledgerEvent = false) => {
    const context = { repo: { owner: 'owner', repo: 'repo' }, ...(ledgerEvent ?
      { eventName: 'issue_comment', payload: { issue: { number: 58 } } } :
      { eventName: 'pull_request_target', payload: { pull_request: { number: 1 } } }) };
    await checkWeeklyPullRequest({ github, context, trustedBase: base, core: { setFailed: (error) => errors.push(error) } });
    assert.equal(results.at(-1).head_sha, head);
    return results.at(-1).conclusion;
  };
  return { pr, files, afterReview, ledger, approvals, publication, review, run, errors };
}

test('ordinary changes pass even behind main and with unrelated invalid ledger data', async () => {
  const f = fixture();
  f.pr.head.ref = 'docs';
  f.pr.base.sha = reviewed;
  f.pr.changed_files = 1;
  f.files.splice(0, f.files.length, 'docs/change.md');
  f.ledger[0].updated_at = 'edited';
  assert.equal(await f.run(), 'success');
});

test('records without a classified request fail closed', async () => {
  const f = fixture();
  f.pr.head.ref = 'manual';
  f.ledger.length = 0;
  assert.equal(await f.run(), 'failure');
});

test('valid weekly records pass and a later ledger deletion invalidates them', async () => {
  const f = fixture();
  assert.equal(await f.run(), 'success');
  f.ledger.pop();
  assert.equal(await f.run(true), 'failure');
});

for (const [name, mutate] of [
  ['stale approval', (f) => { f.approvals[0].body = f.approvals[0].body.replace(head, reviewed); }],
  ['edited approval', (f) => { f.approvals[0].updated_at = 'edited'; }],
  ['new request without receipts', (f) => f.ledger.push(entry(13, { type: 'review-request', candidate }))],
  ['extra receipt', (f) => f.ledger.push({ ...f.ledger[2], id: 13 })],
  ['duplicate run ID', (f) => { f.ledger[2].body = f.ledger[2].body.replace('"runId":"claude"', '"runId":"codex"'); }],
  ['non-record diff', (f) => f.afterReview.push(paths.cover)],
  ['wrong date', (f) => { f.publication.publishedAt = '2026-11-23'; }],
  ['wrong review link', (f) => { f.publication.reviewId = 'other'; }],
  ['wrong image hash', (f) => { f.review.illustrationSha256[paths.shareCover] = hashes.cover; }],
  ['wrong findings', (f) => { f.review.findings = [{ severity: 'minor', status: 'open' }]; }],
]) {
  test('fails on ' + name, async () => {
    const f = fixture();
    mutate(f);
    assert.equal(await f.run(), 'failure');
    assert.equal(f.errors.length, 1);
  });
}
