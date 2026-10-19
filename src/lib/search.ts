export type SearchEntry={id:string;slug:string;title:string;category:string;date:string;searchText:string};
export function searchArticles(entries:SearchEntry[],query:string,category:string,order:string):SearchEntry[]{
 const words=query.toLowerCase().trim().split(/\s+/).filter(Boolean);
 return entries.filter(a=>words.every(w=>a.searchText.includes(w))&&(!category||a.category===category)).sort((a,b)=>order==='title'?a.title.localeCompare(b.title):order==='oldest'?a.date.localeCompare(b.date)||a.id.localeCompare(b.id):b.date.localeCompare(a.date)||a.id.localeCompare(b.id));
}
