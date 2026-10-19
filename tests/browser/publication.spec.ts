import {test, expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = ['/', '/library/', '/about/', '/feedback/', '/articles/exercise-foundations-after-65/', '/articles/remember-what-you-study/', '/articles/financial-breathing-room/'];

test('pages have accessible structure, no serious automated findings, and no phone overflow', async ({page}, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const route of routes) {
    await page.goto(route);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en-GB');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex,nofollow');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    const results = await new AxeBuilder({page}).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(results.violations.filter(v => ['serious', 'critical'].includes(v.impact || '')), JSON.stringify(results.violations)).toEqual([]);
    if (route === '/' || route === '/articles/remember-what-you-study/') {
      await page.screenshot({path: testInfo.outputPath(route === '/' ? 'home.png' : 'article.png'), fullPage: true});
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
  await page.getByLabel('Search the library').fill('studying');
  await expect(cards).toHaveCount(1);
  await expect(cards).toContainText('three-step routine');
  await page.getByLabel('Category', {exact: true}).selectOption('Finance');
  await expect(cards).toHaveCount(0);
  await expect(page.locator('#no-results')).toBeVisible();
  await page.getByLabel('Search the library').fill('');
  await expect(cards).toHaveCount(1);
  await expect(cards).toContainText('financial breathing room');
  await page.getByLabel('Category', {exact: true}).selectOption('');
  await page.getByLabel('Order', {exact: true}).selectOption('title');
  await expect(cards).toHaveCount(3);
  await expect(cards.first()).toContainText('three-step routine');
  await expect(page.locator('#no-results')).toBeHidden();
});

test('search fetch failure leaves readable articles and recovers on retry', async ({page}) => {
  let failures = 1;
  await page.route('**/search-index.json', route => failures-- > 0 ? route.abort() : route.continue());
  await page.goto('/library/');
  await page.getByLabel('Search the library').fill('study');
  await expect(page.locator('#search-status')).toContainText('temporarily unavailable');
  await expect(page.locator('[data-search-item]:visible')).toHaveCount(3);
  await page.getByLabel('Search the library').fill('studying');
  await expect(page.locator('[data-search-item]:visible')).toHaveCount(1);
});

test('skip link, recommendation anchors and evidence controls work', async ({page}) => {
  await page.goto('/articles/exercise-foundations-after-65/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', {name: 'Skip to content'})).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main')).toBeFocused();
  await page.getByRole('navigation', {name: 'Recommendations'}).getByRole('link').nth(1).click();
  await expect(page).toHaveURL(/#strength$/);
  const strength = page.locator('#strength');
  await strength.locator('summary').click();
  await expect(strength.locator('details')).toHaveAttribute('open', '');
  await expect(strength.locator('.claim a').first()).toHaveAttribute('href', /^https:\/\//);
  await expect(strength.locator('details')).toContainText('You do not need to push');
});

test('core reading and category navigation work without JavaScript', async ({browser, baseURL}) => {
  const context = await browser.newContext({javaScriptEnabled: false, baseURL});
  const page = await context.newPage();
  await page.goto('/library/');
  await expect(page.locator('[data-search-item]')).toHaveCount(3);
  await page.locator('.topic-links').getByRole('link', {name: 'Health', exact: true}).click();
  await page.getByRole('link', {name: 'Three exercise foundations for staying capable after 65', exact: true}).click();
  await expect(page.locator('.recommendation')).toHaveCount(3);
  await page.locator('.recommendation summary').first().click();
  await expect(page.locator('.recommendation details').first()).toHaveAttribute('open', '');
  await context.close();
});
