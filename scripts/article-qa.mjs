// Run AFTER npm run verify. Local editorial preview, not a release or approval.
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {mkdir, readFile, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {chromium} from '@playwright/test';
import {browserSha256, browserVersion, prepareBrowser} from './browser-runtime.mjs';

const route = process.argv[2] || '/articles/exercise-foundations-after-65/';
assert.match(route, /^\/articles\/[a-z0-9-]+\/$/, 'Supply one local article route');
const root = path.resolve('dist');
const output = path.resolve('.browser-qa', route.split('/')[2]);
await mkdir(output, {recursive: true});
// A previous run's manifest must never certify this run after a failure.
await writeFile(path.join(output, 'result.json'), JSON.stringify({status: 'running', route}));
const types = {'.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.woff2':'font/woff2', '.webp':'image/webp', '.svg':'image/svg+xml'};
const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url, 'http://localhost');
    let file = path.resolve(root, '.' + decodeURIComponent(url.pathname));
    if (!file.startsWith(root + path.sep)) throw new Error('Invalid path');
    if (url.pathname.endsWith('/')) file = path.join(file, 'index.html');
    const body = await readFile(file);
    response.writeHead(200, {'Content-Type': types[path.extname(file)] || 'application/octet-stream'});
    response.end(body);
  } catch { response.writeHead(404); response.end('Not found'); }
});
// Server and browser must share a process/network namespace in scheduled containers.
await new Promise((resolve, reject) => {server.once('error', reject); server.listen(0, '127.0.0.1', resolve);});
const base = `http://127.0.0.1:${server.address().port}`;
let browser;
try {
  browser = await chromium.launch({...await prepareBrowser(), headless: true, timeout: 30000});
  assert.equal(browser.version(), browserVersion);
  const results = [];
  for (const width of [320, 390, 1440]) {
    const page = await browser.newPage({viewport: {width, height: 900}, deviceScaleFactor: 1});
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const response = await page.goto(base + route, {waitUntil: 'networkidle', timeout: 30000});
    assert.equal(response.status(), 200);
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.locator('#full-guide').evaluate(e => e.open), false);
    for (const state of ['collapsed', 'expanded']) {
      if (state === 'expanded') {
        await page.locator('#full-guide > summary').focus();
        await page.keyboard.press('Enter');
        assert.equal(await page.locator('#full-guide').evaluate(e => e.open), true);
      }
      const layout = await page.evaluate(() => ({width: innerWidth, scrollWidth: document.documentElement.scrollWidth,
        images: [...document.querySelectorAll('article img')].map(e => ({src:e.getAttribute('src'), loaded:e.complete && e.naturalWidth > 0}))}));
      assert.ok(layout.scrollWidth <= width, `${width}px ${state}: horizontal overflow`);
      assert.ok(layout.images.every(e => e.loaded), 'Broken article image');
      const screenshot = path.join(output, `${width}-${state}.png`);
      await page.screenshot({path: screenshot, fullPage: true});
      results.push({width, state, screenshot, ...layout});
    }
    const citation = page.locator('.footnote').first();
    const target = await citation.getAttribute('href');
    await citation.click();
    assert.equal(new URL(page.url()).hash, target);
    await page.locator('.return-overview').click();
    assert.equal(await page.locator('#full-guide').evaluate(e => e.open), false);
    assert.deepEqual(errors, []);
    await page.close();
  }
  const context = await browser.newContext({javaScriptEnabled: false, viewport: {width: 390, height: 900}});
  const page = await context.newPage();
  await page.goto(base + route);
  await page.locator('#full-guide > summary').click();
  assert.equal(await page.locator('#full-guide').evaluate(e => e.open), true);
  await context.close();
  const result = {status:'captured-needs-visual-inspection', route, browser:browser.version(), browserSha256,
    checkedAt:new Date().toISOString(), noJavaScriptDisclosure:true, results};
  await writeFile(path.join(output, 'result.json'), JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result, null, 2));
} catch (error) {
  await writeFile(path.join(output, 'result.json'), JSON.stringify({status:'failed', route, error:error.message}));
  throw error;
} finally {
  await browser?.close();
  await new Promise(resolve => server.close(resolve));
}
