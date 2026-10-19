import {visibleArticles} from '../lib/catalogue';
export const prerender=true;
export function GET(){return new Response(JSON.stringify(visibleArticles().map(a=>({id:a.id,slug:a.slug,title:a.title,category:a.category,date:a.publishedAt||'',searchText:[a.title,a.description,a.category,...a.keywords].join(' ').toLowerCase()}))),{headers:{'Content-Type':'application/json'}});}
