import {test, expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = ['/', '/library/', '/about/', '/feedback/', '/articles/exercise-foundations-after-65/', '/articles/remember-what-you-study/', '/articles/financial-breathing-room/'];
const release = process.env.RELEASE === '1';

test('pages have accessible structure, no serious automated findings, and no phone overflow', async ({page}, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const route of routes) {
    await page.goto(route);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en-GB');
    if (release) await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
    else await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex,nofollow');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    const results = await new AxeBuilder({page}).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(results.violations.filter(v => ['serious', 'critical'].includes(v.impact || '')), JSON.stringify(results.violations)).toEqual([]);
    if (route === '/' || route === '/articles/remember-what-you-study/' || route === '/articles/financial-breathing-room/') {
      await page.screenshot({path: testInfo.outputPath(route === '/' ? 'home.png' : route.includes('financial-') ? 'finance-overview.png' : 'article.png'), fullPage: true});
    }
  }
  expect(errors).toEqual([]);
  await page.setViewportSize({width: 320, height: 740});
  for (const route of ['/', '/library/', '/articles/remember-what-you-study/']) {
    await page.goto(route);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
});

test('search, category, empty state and reset agree with visible articles', async ({page}) => {
  await page.goto('/library/');
  const cards = page.locator('[data-search-item]:visible');
  await expect(cards).toHaveCount(3);
  await page.getByLabel('Search the library').fill('study');
  await expect(cards).toHaveCount(1);
  await expect(cards).toContainText('Remember more of what you study');
  await page.getByRole('combobox', {name: /^Category/}).selectOption('Finance');
  await expect(cards).toHaveCount(0);
  await expect(page.locator('#no-results')).toBeVisible();
  await page.getByLabel('Search the library').fill('');
  await expect(cards).toHaveCount(1);
  await expect(cards).toContainText('Give your money more breathing room');
  await page.getByRole('combobox', {name: /^Category/}).selectOption('');
  await page.getByRole('combobox', {name: /^Order/}).selectOption('title');
  await expect(cards).toHaveCount(3);
  await expect(cards.first()).toContainText('Give your money more breathing room');
  await expect(page.locator('#no-results')).toBeHidden();
});

test('search fetch failure leaves readable articles and recovers on retry', async ({page}) => {
  let failures = 1;
  await page.route('**/search-index.json', route => failures-- > 0 ? route.abort() : route.continue());
  await page.goto('/library/');
  await page.getByLabel('Search the library').fill('learning');
  await expect(page.locator('#search-status')).toContainText('temporarily unavailable');
  await expect(page.locator('[data-search-item]:visible')).toHaveCount(3);
  await page.getByLabel('Search the library').fill('study');
  await expect(page.locator('[data-search-item]:visible')).toHaveCount(1);
});

test('overview, references and return control work with accessible reading', async ({page}, testInfo) => {
  await page.goto('/articles/exercise-foundations-after-65/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', {name: 'Skip to content'})).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main')).toBeFocused();
  await expect(page.locator('.full-guide')).not.toHaveAttribute('open', '');
  await expect(page.locator('.idea-overview>li')).toHaveCount(3);
  await expect(page.locator('.full-guide>summary')).toHaveText('Read more ↓Show less ↑');
  await expect(page.locator('.article-header .eyebrow')).toHaveCount(0);
  await expect(page.locator('.share-row').getByRole('link', {name: 'More in Health →'})).toHaveAttribute('href', '/categories/health/');
  await expect(page.locator('.guide-scope')).toBeHidden();
  await expect(page.locator('.safety-note')).toBeHidden();
  await page.locator('.hero-card .idea-overview h2').first().click();
  await expect(page.locator('.full-guide')).toHaveAttribute('open', '');
  await page.locator('.full-guide>summary').click();
  await expect(page.locator('.full-guide')).not.toHaveAttribute('open', '');
  await page.locator('.full-guide>summary').focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('.full-guide')).toHaveAttribute('open', '');
  await expect(page.locator('.guide-scope')).toBeVisible();
  await expect(page.locator('.safety-note')).toBeVisible();
  await expect(page.getByRole('navigation', {name: 'Recommendations'})).toHaveCount(0);
  const strength = page.locator('#strength');
  await expect(strength.getByRole('heading')).toHaveText('Build strength');
  await expect(page.locator('.recommendation-title .number')).toHaveCount(0);
  await expect(strength).toContainText('keep the movement controlled');
  await expect(strength.locator('details')).toHaveCount(0);
  await page.screenshot({path: testInfo.outputPath('exercise-expanded.png'), fullPage: true});
  await strength.locator('.footnote').first().click();
  await expect(page).toHaveURL(/#reference-cdc-overview$/);
  await page.locator('#reference-cdc-overview .reference-returns a').first().click();
  await expect(page).toHaveURL(/#cite-strength-cdc-overview$/);
  await page.locator('.evidence-notes>summary').click();
  await expect(page.locator('.evidence-notes')).toContainText('consensus based');
  await page.getByRole('link', {name:'Back to the three ideas'}).click();
  await expect(page.locator('.full-guide')).not.toHaveAttribute('open', '');
  await expect(page.locator('.full-guide>summary')).toBeFocused();
  await page.goto('/articles/exercise-foundations-after-65/#balance');
  await expect(page.locator('.full-guide')).toHaveAttribute('open', '');
  await expect(page.locator('#balance')).toBeVisible();
});

test('core reading and category navigation work without JavaScript', async ({browser, baseURL}) => {
  const context = await browser.newContext({javaScriptEnabled: false, baseURL});
  const page = await context.newPage();
  await page.goto('/library/');
  await expect(page.locator('[data-search-item]')).toHaveCount(3);
  await page.locator('.topic-links').getByRole('link', {name: 'Health', exact: true}).click();
  await page.getByRole('link', {name: 'Stay strong, steady and active as you get older', exact: true}).click();
  await expect(page.locator('.recommendation')).toHaveCount(3);
  await page.locator('.full-guide>summary').click();
  await expect(page.locator('#strength')).toBeVisible();
  await expect(page.locator('#strength')).toContainText('keep the movement controlled');
  await page.getByRole('link', {name:'Back to the three ideas'}).click();
  await expect(page.locator('.idea-overview')).toBeVisible();
  await context.close();
});

test('release metadata shows approved dated articles without draft labels', async ({page}) => {
  test.skip(!release, 'Run after an explicit release build');
  await page.goto('/');
  await expect(page.locator('.preview-banner')).toHaveCount(0);
  await expect(page.locator('.idea-overview>li')).toHaveCount(3);
  await expect(page.locator('.full-guide')).not.toHaveAttribute('open', '');
  for (const route of routes.filter(path => path.startsWith('/articles/'))) {
    await page.goto(route);
    await page.locator('.full-guide>summary').click();
    await expect(page.locator('.article-meta time').first()).toHaveAttribute('datetime', '2026-10-19');
    await expect(page.locator('.article-meta')).not.toContainText('draft');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', new URL(route, process.env.SITE_URL).href);
    const article = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent() || '{}');
    expect(article.datePublished).toBe('2026-10-19');
    expect(article.mainEntityOfPage).toBe(new URL(route, process.env.SITE_URL).href);
  }
});


test('citations stay with the preceding word at phone and desktop widths', async ({page}) => {
  for (const width of [320, 390, 1280]) {
    await page.setViewportSize({width, height: 900});
    for (const route of routes.filter(path => path.startsWith('/articles/'))) {
      await page.goto(route);
      await page.locator('.full-guide>summary').click();
      await page.evaluate(() => document.fonts.ready);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      const attached = await page.locator('.citation-tail').evaluateAll(tails => tails.every(tail => {
        const word = tail.querySelector('.citation-word')!.getBoundingClientRect();
        return Array.from(tail.querySelectorAll('.footnote')).every(link => {
          const rect = link.getBoundingClientRect();
          return rect.bottom >= word.top && rect.top <= word.bottom;
        });
      }));
      expect(attached).toBe(true);
    }
  }
});


test('study pilot connects the illustrated ideas to a usable routine', async ({page}, testInfo) => {
  await page.goto('/articles/remember-what-you-study/');
  await expect(page.locator('.full-guide')).not.toHaveAttribute('open', '');
  await expect(page.locator('.idea-overview h2')).toHaveText(['Try from memory', 'Check what you missed', 'Come back later']);
  await expect(page.locator('.idea-overview img')).toHaveCount(3);
  expect(await page.locator('.idea-overview img').evaluateAll(images => images.every(image => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0))).toBe(true);
  await page.locator('.full-guide>summary').click();
  await expect(page.locator('.recommendation h2')).toHaveText(['Try from memory', 'Check what you missed', 'Come back later']);
  await expect(page.locator('#retrieve')).toContainText('Spanish');
  await expect(page.locator('#correct')).toContainText('gracias');
  await expect(page.locator('#space')).toContainText('not an optimal formula');
  expect(await page.locator('.site-header .wordmark small').evaluate(e => parseFloat(getComputedStyle(e).fontSize))).toBeGreaterThanOrEqual(15);
  expect(await page.locator('.article-card .card-bottom').first().evaluate(e => parseFloat(getComputedStyle(e).fontSize))).toBeGreaterThanOrEqual(15);
  await page.screenshot({path: testInfo.outputPath('study-expanded.png'), fullPage: true});
});


test('finance pilot keeps priorities clear and its illustrated guide usable', async ({page}, testInfo) => {
  await page.goto('/articles/financial-breathing-room/');
  await expect(page.locator('.full-guide')).not.toHaveAttribute('open', '');
  await expect(page.locator('.idea-overview h2')).toHaveText(['See what is due', 'Keep a little in reserve', 'Reduce borrowing costs']);
  await expect(page.locator('.idea-overview')).toContainText('Keep essentials covered');
  await expect(page.locator('.idea-overview img')).toHaveCount(3);
  for (const image of await page.locator('.idea-overview img').all()) {
    await expect(image).toBeVisible();
    await expect.poll(() => image.evaluate(e => (e as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  }
  await page.locator('.full-guide>summary').click();
  await expect(page.locator('.action')).toHaveCount(3);
  await expect(page.locator('#debt .what')).toContainText('local rules');
  await expect(page.locator('#debt .safety-note')).toContainText('independent local debt advice');
  await expect(page.locator('#buffer')).toContainText('without missing essentials or required debt payments');
  await expect(page.locator('.guide-scope')).toContainText('first wage');
  await expect(page.locator('.guide-scope')).toContainText('borrowing guidance concerns adults');
  await expect(page.locator('#cash-flow')).toContainText('phone bill');
  await expect(page.locator('#debt .what')).toContainText('court fines');
  for (const id of ['cash-flow', 'buffer', 'debt']) {
    await expect(page.locator(`#${id} .supporting-detail`).first()).toContainText('In the repair example:');
    expect(await page.locator(`#${id} .supporting-detail`).count()).toBeGreaterThan(1);
  }
  await expect(page.locator('#debt .help-links a')).toHaveCount(2);
  await expect(page.locator('#debt .help-links a').first()).toHaveAttribute('href', 'https://www.moneyhelper.org.uk/en/money-troubles/dealing-with-debt/debt-advice-locator');
  await expect(page.locator('#debt .help-links a').last()).toHaveAttribute('href', 'https://www.consumerfinance.gov/ask-cfpb/what-is-credit-counseling-en-1451/');
  const readingMetrics = await page.locator('#debt').evaluate(section => {
    const citation = section.querySelector('.footnote')!;
    return {
      mainTextPx: parseFloat(getComputedStyle(section.querySelector('.what')!).fontSize),
      supportingTextPx: parseFloat(getComputedStyle(section.querySelector('.supporting-detail')!).fontSize),
      citationGlyphHeightPx: citation.getBoundingClientRect().height,
      citationHitAreaHeightPx: parseFloat(getComputedStyle(citation, '::after').height),
      helpLinkHeightsPx: Array.from(section.querySelectorAll('.help-links a')).map(a => a.getBoundingClientRect().height),
    };
  });
  expect(readingMetrics.mainTextPx).toBeGreaterThanOrEqual(20);
  expect(readingMetrics.supportingTextPx).toBeGreaterThanOrEqual(18);
  expect(readingMetrics.citationHitAreaHeightPx).toBeGreaterThanOrEqual(24);
  expect(readingMetrics.helpLinkHeightsPx.every(height => height >= 44)).toBe(true);
  await testInfo.attach('finance-reading-metrics', {body: JSON.stringify(readingMetrics), contentType: 'application/json'});

  await page.screenshot({path: testInfo.outputPath('finance-expanded.png'), fullPage: true});
  await page.locator('#debt .footnote').first().click();
  await expect(page.locator(':target')).toHaveAttribute('id', /^reference-/);
  await page.getByRole('link', {name: 'Back to the three ideas'}).click();
  await expect(page.locator('.full-guide')).not.toHaveAttribute('open', '');
});
