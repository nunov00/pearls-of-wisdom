"""Bundle the built preview into one offline HTML review file; never a production release."""
from pathlib import Path
import re,json,html,sys
root=Path(__file__).resolve().parents[1];dist=root/'dist'
output=Path(sys.argv[1]) if len(sys.argv)>1 else root.parent/'pearls-of-wisdom-preview.html'
base=(dist/'index.html').read_text()
css='\n'.join(p.read_text() for p in (dist/'_astro').glob('*.css'))
base=re.sub(r'<script\b[^>]*>.*?</script>','',base,flags=re.S)
base=re.sub(r'<link[^>]+(?:stylesheet|icon)[^>]*>','',base)
base=base.replace('</head>','<style>'+css+'</style></head>')
sections=[]
for p in sorted(dist.rglob('*.html')):
 relative=p.relative_to(dist).as_posix();route='/' if relative=='index.html' else '/'+relative.removesuffix('index.html') if relative.endswith('/index.html') else '/'+relative
 text=p.read_text();content=re.search(r'<main\b[^>]*>(.*?)</main>',text,re.S).group(1)
 content=re.sub(r'<script\b[^>]*>.*?</script>','',content,flags=re.S)
 content=re.sub(r'href="(#[^"]*)"',lambda m:'href="#'+route+m[1]+'"',content)
 sections.append('<section data-preview-route="'+html.escape(route)+'" hidden>'+content+'</section>')
base=re.sub(r'<main\b[^>]*>.*?</main>','<main id="main">'+''.join(sections)+'</main>',base,flags=re.S)
base=re.sub(r'href="(/[^" ]*)"',r'href="#\1"',base)
index=(dist/'search-index.json').read_text().replace('<','\\u003c')
script=r'''
const catalogue=CATALOGUE;
function route(){if(location.hash==='#main'){document.querySelector('#main').focus();return;}const value=decodeURI(location.hash.slice(1)||'/');const split=value.indexOf('#');const path=split<0?value:value.slice(0,split);const target=split<0?'':value.slice(split+1);let active=null;for(const page of document.querySelectorAll('[data-preview-route]')){page.hidden=page.dataset.previewRoute!==path;if(!page.hidden)active=page;}if(!active){active=document.querySelector('[data-preview-route="/404.html"]');active.hidden=false;}for(const a of document.querySelectorAll('.site-header nav a')){const match=a.hash==='#'+path;a.toggleAttribute('aria-current',match);if(match)a.setAttribute('aria-current','page');}window.scrollTo(0,0);if(target){const el=active.querySelector('[id="'+CSS.escape(target)+'"]');el?.scrollIntoView();}}
window.addEventListener('hashchange',route);route();
const search=document.querySelector('#search'),category=document.querySelector('#category'),sort=document.querySelector('#sort');
function filter(){const words=search.value.toLowerCase().trim().split(/\s+/).filter(Boolean);const selected=catalogue.filter(a=>words.every(w=>a.searchText.includes(w))&&(!category.value||a.category===category.value));selected.sort((a,b)=>sort.value==='title'?a.title.localeCompare(b.title):sort.value==='oldest'?a.date.localeCompare(b.date)||a.id.localeCompare(b.id):b.date.localeCompare(a.date)||a.id.localeCompare(b.id));const container=document.querySelector('#results');const cards=Array.from(container.querySelectorAll('[data-search-item]'));for(const card of cards)card.hidden=true;for(const a of selected){const card=cards.find(c=>c.querySelector('h3 a').getAttribute('href')==='#/articles/'+a.slug+'/');if(card){card.hidden=false;container.append(card);}}document.querySelector('#search-status').textContent=selected.length+' articles';document.querySelector('#no-results').hidden=selected.length!==0;}
search.addEventListener('input',filter);category.addEventListener('change',filter);sort.addEventListener('change',filter);
for(const button of document.querySelectorAll('#share'))button.addEventListener('click',()=>{button.closest('.share-row').querySelector('#share-status').textContent='Offline preview: share the published URL after launch.';});
'''.replace('CATALOGUE',index)
base=base.replace('</body>','<script>'+script+'</script></body>')
output.write_text(base)
print(output)
