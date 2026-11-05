export const typeLabels={paper:'論文整理',theory:'理論筆記',method:'研究方法'};
export async function loadArticles(){
 const get=async path=>{const res=await fetch(new URL(path,document.baseURI));if(!res.ok)throw new Error('文章載入失敗，請稍後再試。');return res.json();};
 const catalog=await get('content/catalog.json');
 if(!Array.isArray(catalog.articles)||new Set(catalog.articles).size!==catalog.articles.length)throw new Error('文章目錄格式有誤。');
 return Promise.all(catalog.articles.map(id=>{if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id))throw new Error('文章 ID 無效。');return get(`content/articles/${id}.json`);}));
}
export function filterArticles(articles,{q='',tag='',type=''}={}){
 const words=q.normalize('NFKC').toLowerCase().trim().split(/\s+/).filter(Boolean);
 return articles.filter(a=>(!tag||a.tags.includes(tag))&&(!type||a.type===type)&&words.every(w=>[a.title,a.summary,...a.tags,...(a.bibliography?.authors||[]),...a.sections.flatMap(s=>s.paragraphs)].join(' ').normalize('NFKC').toLowerCase().includes(w)));
}
