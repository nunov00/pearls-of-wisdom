export const prerender=true;
export function GET(){return new Response(process.env.RELEASE==='1'?'User-agent: *\nAllow: /\nSitemap: '+process.env.SITE_URL+'/sitemap.xml\n':'User-agent: *\nDisallow: /\n');}
