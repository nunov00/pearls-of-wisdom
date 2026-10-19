import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
// A deliberate guard, not a substitute for a recorded Owner decision.
if(process.env.PUBLIC_LAUNCH_APPROVED!=='true')throw new Error('Public launch is not authorised. Use cf:validate for a local dry run.');
if(process.env.RELEASE!=='1'||!process.env.SITE_URL)throw new Error('RELEASE=1 and the approved SITE_URL are required.');
const origin=new URL(process.env.SITE_URL);if(origin.protocol!=='https:'||origin.username||origin.password||origin.pathname!=='/'||origin.search||origin.hash)throw new Error('SITE_URL must be the approved HTTPS origin.');
execFileSync('npm',['run','verify'],{stdio:'inherit',env:process.env});
const wrangler=fileURLToPath(new URL('../node_modules/wrangler/bin/wrangler.js',import.meta.url));
execFileSync(process.execPath,[wrangler,'deploy','--config','deploy/cloudflare/wrangler.jsonc'],{stdio:'inherit',env:process.env});
