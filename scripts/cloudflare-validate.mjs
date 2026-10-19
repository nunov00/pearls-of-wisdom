import {execFileSync} from 'node:child_process';import {fileURLToPath} from 'node:url';
execFileSync('npm',['run','build'],{stdio:'inherit',env:process.env});
const wrangler=fileURLToPath(new URL('../node_modules/wrangler/bin/wrangler.js',import.meta.url));
execFileSync(process.execPath,[wrangler,'deploy','--dry-run','--config','deploy/cloudflare/wrangler.jsonc'],{stdio:'inherit',env:process.env});
