import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';

test('source backup preserves content but excludes local credentials, runtime state and old archives', () => {
  const fixture = fs.mkdtempSync(path.join(os.tmpdir(), 'pearls-backup-'));
  const script = fileURLToPath(new URL('../scripts/backup.mjs', import.meta.url));
  const files = ['article.yaml', '.env.local', '.dev.vars', '.wrangler/state/token', 'nested/.dev.vars.preview', 'test-results/trace.zip', 'custom/pearls-source-old.tar.gz'];
  try {
    for (const name of files) {
      const target = path.join(fixture, name);
      fs.mkdirSync(path.dirname(target), {recursive:true});
      fs.writeFileSync(target, name === 'article.yaml' ? 'title: Kept content\n' : 'synthetic private fixture\n');
    }
    const archive = execFileSync(process.execPath, [script], {cwd:fixture, encoding:'utf8'}).trim();
    const entries = execFileSync('tar', ['-tzf', archive], {encoding:'utf8'});
    assert.match(entries, /article\.yaml/);
    for (const forbidden of ['.env.local', '.dev.vars', '.wrangler', 'trace.zip', 'pearls-source-old']) assert.equal(entries.includes(forbidden), false, forbidden);
    assert.match(fs.readFileSync(archive + '.sha256', 'utf8'), new RegExp('^' + createHash('sha256').update(fs.readFileSync(archive)).digest('hex')));
    assert.equal(execFileSync('tar', ['-xOzf', archive, './article.yaml'], {encoding:'utf8'}), 'title: Kept content\n');
  } finally {
    fs.rmSync(fixture, {recursive:true, force:true});
  }
});
