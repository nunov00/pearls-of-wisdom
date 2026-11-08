import assert from 'node:assert/strict';
import test from 'node:test';
import { digest } from '../scripts/release-policy.mjs';
import { assertWeeklyRelease, validateWeeklyRelease, weeklyReservationKey } from '../scripts/release-weekly-policy.mjs';

const cycle = '2026-11-10';
const date = '2026-11-16';
const head = 'a'.repeat(40);
const bytes = { article: Buffer.from('article'), cover: Buffer.from('cover'), shareCover: Buffer.from('share') };
const hashes = Object.fromEntries(Object.entries(bytes).map(([asset, value]) => [asset, digest(value)]));
const articleId = 'weekly-article';
const paths = { article: 'src/content/articles/weekly-article.yaml', cover: 'public/figures/weekly.webp', shareCover: 'public/figures/weekly.jpg' };
const candidate = { articleId, paths, cycle, publishedAt: date, head, hashes, reviewSlot: 4, correctionRounds: 3, imageGenerations: 4 };
const releaseSlot = { cycle, date, stage: 'release' };
const receipt = { articleId, paths, cycle, head, hashes, reviewSlot: 4, decision: 'ready', articleScore: 9, coverScore: 9, findings: [] };
const author = { ...receipt, role: 'author', provider: 'codex' };
const reviewer = { ...receipt, role: 'reviewer', provider: 'claude' };
const evidence = { candidate, releaseSlot, bytes, receipts: [author, reviewer] };

test('accepts an exact Monday candidate with two qualifying receipts', () => {
  assert.doesNotThrow(() => assertWeeklyRelease(evidence));
});

test('rejects changed Git bytes, a different release date and exhausted budgets', () => {
  assert.throws(() => assertWeeklyRelease({ ...evidence, bytes: { ...bytes, shareCover: Buffer.from('replacement') } }), /manifest/);
  assert.throws(() => assertWeeklyRelease({ ...evidence, releaseSlot: { ...releaseSlot, date: '2026-11-23' } }), /Monday/);
  assert.throws(() => assertWeeklyRelease({ ...evidence, candidate: { ...candidate, imageGenerations: 5 } }), /budget/);
});

test('rejects missing, stale, low-scoring and unresolved review evidence', () => {
  assert.throws(() => assertWeeklyRelease({ ...evidence, receipts: [author] }), /Two review/);
  for (const change of [{ head: 'b'.repeat(40) }, { provider: 'codex' }, { reviewSlot: 3 }]) {
    assert.throws(() => assertWeeklyRelease({ ...evidence, receipts: [author, { ...reviewer, ...change }] }), /stale/);
  }
  assert.throws(() => assertWeeklyRelease({ ...evidence, receipts: [author, { ...reviewer, coverScore: 8 }] }), /scores/);
  assert.throws(() => assertWeeklyRelease({ ...evidence, receipts: [author, {
    ...reviewer, findings: [{ severity: 'important', status: 'open' }],
  }] }), /findings/);
});

test('reservation keys separate stages and bound review slots', () => {
  assert.equal(weeklyReservationKey({ cycle, stage: 'release', reviewSlot: 0 }), cycle + '/release');
  assert.equal(weeklyReservationKey({ cycle, stage: 'article-review', reviewSlot: 4 }), cycle + '/article-review/4');
  assert.throws(() => weeklyReservationKey({ cycle, stage: 'article-review', reviewSlot: 5 }), /slot/);
});

test('validates final weekly records alongside a manual release', () => {
  const manual = { id: 'manual', publishedAt: '2026-11-06', claims: [], sources: [] };
  const weekly = { id: articleId, publishedAt: date, claims: [], sources: [],
    mainImage: { src: '/figures/weekly.webp', shareSrc: '/figures/weekly.jpg' } };
  const existing = {
    articles: [manual, weekly], bytesById: { manual: bytes.article },
    publications: [{ articleId: 'manual', state: 'published', publishedAt: manual.publishedAt, reviewId: 'manual-review' }],
    reviews: [{ id: 'manual-review', articleId: 'manual', decision: 'ready', author: 'A', reviewer: 'B',
      reviewedCommit: head, articleSha256: hashes.article, correctionRounds: 0, findings: [] }],
  };
  const ready = {
    ...evidence, candidate: { ...candidate, reviewSlot: 3, correctionRounds: 2 },
    receipts: evidence.receipts.map((entry) => ({ ...entry, reviewSlot: 3 })),
  };
  const recordPaths = ['editorial/reviews.json', 'editorial/publications.json'];
  const publication = { articleId, state: 'published', publishedAt: date, reviewId: 'weekly-review' };
  const weeklyReview = { id: publication.reviewId, articleId, decision: 'ready',
    author: 'Codex (OpenAI)', reviewer: 'Claude (Anthropic)', reviewedCommit: head,
    articleSha256: hashes.article, correctionRounds: 2, findings: [],
    illustrationSha256: { [paths.cover]: hashes.cover, [paths.shareCover]: hashes.shareCover } };
  const final = { ...existing, publications: [...existing.publications, publication],
    reviews: [...existing.reviews, weeklyReview] };
  assert.equal(validateWeeklyRelease(ready, final, paths.article, existing, recordPaths), true);
  assert.throws(() => validateWeeklyRelease(evidence, final, paths.article, existing, recordPaths), /No technical/);
  assert.throws(() => validateWeeklyRelease(ready, final, paths.article, existing, [...recordPaths, paths.article]), /Only publication/);
  assert.throws(() => validateWeeklyRelease(ready, final, 'src/content/articles/other.yaml', existing, recordPaths), /image paths/);
  assert.throws(() => validateWeeklyRelease(ready, {
    ...final, reviews: [...existing.reviews, { ...weeklyReview, reviewedCommit: 'b'.repeat(40) }],
  }, paths.article, existing, recordPaths), /records do not match/);
});

test('rejects invalid cycle dates, non-Monday release dates and mismatched receipts', () => {
  for (const cycle of ['2026-13-99', '2026-11-11']) {
    assert.throws(() => weeklyReservationKey({ cycle, stage: 'release', reviewSlot: 0 }), /cycle/);
  }
  assert.equal(weeklyReservationKey({ cycle, stage: 'outcome', reviewSlot: 0 }), cycle + '/outcome');
  assert.throws(() => weeklyReservationKey({ cycle, stage: 'release', reviewSlot: 1 }), /slot/);
  assert.throws(() => assertWeeklyRelease({ ...evidence, candidate: { ...candidate, publishedAt: '2026-11-17' },
    releaseSlot: { ...releaseSlot, date: '2026-11-17' } }), /Monday/);
  assert.throws(() => assertWeeklyRelease({ ...evidence, receipts: [reviewer, reviewer] }), /stale/);
  assert.throws(() => assertWeeklyRelease({ ...evidence, candidate: { ...candidate, correctionRounds: 4 } }), /budget/);
  assert.throws(() => assertWeeklyRelease({ ...evidence, receipts: [{ ...author, decision: 'revise' }, reviewer] }), /stale/);
  assert.throws(() => assertWeeklyRelease({ ...evidence, receipts: [{ ...author, hashes: {} }, reviewer] }), /stale/);
  assert.throws(() => assertWeeklyRelease({ ...evidence, receipts: [author, { ...reviewer, paths: {} }] }), /stale/);
});
