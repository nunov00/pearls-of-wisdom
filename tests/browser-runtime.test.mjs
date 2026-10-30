import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp, rm, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {prepareBrowser, verifyBrowser} from '../scripts/browser-runtime.mjs';

test('browser integrity rejects the observed HTML download and incomplete executables', async () => {
  const directory = await mkdtemp(path.join(tmpdir(), 'pearls-browser-test-'));
  try {
    const file = path.join(directory, 'chromium');
    for (const bytes of [Buffer.from('<html><h1>Site Unavailable</h1></html>'), Buffer.from([0x7f, 0x45, 0x4c, 0x46, 0])]) {
      await writeFile(file, bytes);
      await assert.rejects(verifyBrowser(file), /integrity check failed/);
    }
    await assert.rejects(verifyBrowser(path.join(directory, 'missing')), /ENOENT/);
  } finally {await rm(directory, {recursive:true, force:true});}
});

test('fresh browser setup repairs a cached HTML response without a CDN', {skip:process.platform !== 'linux' || process.arch !== 'x64'}, async () => {
  const cacheDir = await mkdtemp(path.join(tmpdir(), 'pearls-browser-repair-'));
  try {
    const first = await prepareBrowser({cacheDir});
    await verifyBrowser(first.executablePath);
    await writeFile(first.executablePath, '<html>Site Unavailable</html>');
    const repaired = await prepareBrowser({cacheDir});
    await verifyBrowser(repaired.executablePath);
  } finally {await rm(cacheDir, {recursive:true, force:true});}
});
