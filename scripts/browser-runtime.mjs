// Test tooling only: npm's lockfile supplies the browser; no Playwright CDN download.
import {createHash, randomUUID} from 'node:crypto';
import {createReadStream, createWriteStream} from 'node:fs';
import {chmod, mkdir, readFile, rename, rm} from 'node:fs/promises';
import {createRequire} from 'node:module';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {pipeline} from 'node:stream/promises';
import {createBrotliDecompress} from 'node:zlib';

export const browserSha256 = '53a15d6c3a3d27dfb54c4ba60278b1683136f70cf1e67e989da7dfbd3d451ef0';
export const browserVersion = '153.0.8010.0';
const require = createRequire(import.meta.url);

export async function verifyBrowser(file) {
  const bytes = await readFile(file);
  if (!bytes.subarray(0, 4).equals(Buffer.from([0x7f, 0x45, 0x4c, 0x46])) ||
      createHash('sha256').update(bytes).digest('hex') !== browserSha256) {
    throw new Error('Chromium integrity check failed: expected the pinned ELF executable, not HTML or corrupt bytes');
  }
}

export async function prepareBrowser({cacheDir = path.join(tmpdir(), 'pearls-chromium-153')} = {}) {
  if (process.platform !== 'linux' || process.arch !== 'x64') {
    throw new Error('Pinned QA runtime requires Linux x64; report this platform limit, do not skip visual QA');
  }
  await mkdir(cacheDir, {recursive: true});
  const executablePath = path.join(cacheDir, 'chromium');
  try {
    await verifyBrowser(executablePath);
    await chmod(executablePath, 0o700);
  } catch {
    // A stale/partial cache never becomes a successful setup. Repair from locked npm bytes.
    const entry = require.resolve('@sparticuz/chromium');
    const compressed = path.resolve(path.dirname(entry), '../bin/chromium.br');
    const temporary = path.join(cacheDir, `chromium-${randomUUID()}.partial`);
    try {
      await pipeline(createReadStream(compressed), createBrotliDecompress(), createWriteStream(temporary, {mode: 0o700, flags: 'wx'}));
      await verifyBrowser(temporary);
      await rename(temporary, executablePath);
    } finally {
      await rm(temporary, {force: true});
    }
  }
  return {executablePath, args: ['--no-sandbox', '--disable-gpu', '--disable-software-rasterizer', '--no-zygote']};
}
