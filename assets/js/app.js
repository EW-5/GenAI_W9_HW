import {el,$,link,external} from './core/dom.js';
import {loadArticles,filterArticles,typeLabels} from './core/data-store.js';
const isArticle=document.body.dataset.page==='paper';
$('#site-header').append(el('div',{class:'site-nav'},el('a',{class:'brand',href:link('index.html')},el('img',{src:'assets/atlas.svg',width:'32',height:'32',alt:''}),el('span',{},'Research Atlas')),el('nav',{'aria-label':'主要導覽'},el('a',{href:link('index.html')},'研究筆記'),el('a',{href:link('index.html')+'#adding'},'關於這裡'))));
$('#site-footer').append(el('div',{class:'footer-inner'},el('span',{},'Research Atlas'),el('span',{},'整理研究，留下理解的路徑。'),el('a',{href:link('index.html')},'回到內容列表 ↑')));
function demoNotice(){return el('aside',{class:'demo-notice'},el('strong',{},'示範資料'),el('span',{},'以下內容為合成閱讀情境，展示整理格式，不代表真實研究成果。'));}
function card(a,index){return el('article',{class:`article-card tone-${index%3}`},el('div',{class:'card-top'},el('span',{class:'content-type'},typeLabels[a.type]),a.isDemo?el('span',{class:'demo-pill'},'Demo · 合成示範'):null),el('h2',{},el('a',{href:link('paper.html',{id:a.id})},a.title)),el('p',{class:'card-summary'},a.summary),el('div',{class:'card-tags'},a.tags.map(t=>el('a',{class:'tag',href:link('index.html',{tag:t})},t))),el('div',{class:'card-end'},el('span',{},a.bibliography?.year?`${a.bibliography.year} · ${a.isDemo?'示範內容':'研究筆記'}`:'知識筆記'),el('a',{class:'read-link',href:link('paper.html',{id:a.id}),'aria-label':`閱讀 ${a.title}`},'閱讀全文 ↗')));}
function renderIndex(articles){
 const main=$('#main');const params=new URLSearchParams(location.search);let selectedTag=params.get('tag')||'';
 main.append(el('header',{class:'intro'},el('span',{class:'eyebrow'},'A NOTEBOOK FOR RESEARCH'),el('h1',{},'把研究，',el('br',{class:'small-break'}),'整理成可以讀懂的筆記。'),el('p',{},'這裡收錄論文整理、理論筆記與研究方法。從一個問題開始，沿著方法、發現與反思，慢慢建立自己的研究理解。')));
 if(articles.length&&articles.every(a=>a.isDemo))main.append(demoNotice());
 const input=el('input',{id:'search',type:'search',placeholder:'搜尋標題、主題或內容…','aria-label':'搜尋研究內容',value:params.get('q')||''});
 const type=el('select',{id:'type','aria-label':'內容類型'},el('option',{value:''},'所有內容類型'),Object.entries(typeLabels).map(([v,t])=>el('option',{value:v},t)));type.value=params.get('type')||'';
 const tagList=el('div',{class:'filter-tags','aria-label':'主題篩選'}),counter=el('p',{class:'result-count','aria-live':'polite'}),list=el('div',{class:'article-grid',id:'article-list'});
 const tags=[...new Set(articles.flatMap(a=>a.tags))];
 const buttons=['',...tags].map(t=>{const b=el('button',{type:'button',class:'filter-tag','aria-pressed':String(t===selectedTag),onclick:()=>{selectedTag=t;update();}},t||'全部主題');tagList.append(b);return {b,t};});
 const reset=el('button',{class:'reset',type:'button',onclick:()=>{input.value='';type.value='';selectedTag='';update();}},'清除篩選');
 const form=el('form',{class:'search-form'},input,el('button',{type:'submit',class:'search-button'},'搜尋'));form.addEventListener('submit',e=>{e.preventDefault();update();});
 main.append(el('section',{class:'collection','aria-label':'研究內容'},el('div',{class:'collection-title'},el('h2',{},'研究內容'),el('span',{class:'eyebrow'},'READ · THINK · CONNECT')),el('div',{class:'search-row'},form,type),tagList,el('div',{class:'result-row'},counter,reset),list));
 function update(write=true){const filtered=filterArticles(articles,{q:input.value,tag:selectedTag,type:type.value});counter.textContent=`${filtered.length} 篇內容`;for(const {b,t} of buttons)b.setAttribute('aria-pressed',String(t===selectedTag));list.replaceChildren(...(filtered.length?filtered.map(card):[el('section',{class:'empty-state'},el('h2',{},'沒有符合條件的內容'),el('p',{},'換個關鍵字，或清除篩選再看看。'))]));if(write){const u=new URL(location.href);u.search='';for(const [k,v] of Object.entries({q:input.value.trim(),tag:selectedTag,type:type.value}))if(v)u.searchParams.set(k,v);history.replaceState(null,'',u);}}
 input.addEventListener('input',()=>update());type.addEventListener('change',()=>update());update(false);
 main.append(el('section',{class:'about',id:'adding'},el('div',{},el('span',{class:'eyebrow'},'GROW ONE NOTE AT A TIME'),el('h2',{},'知識，一篇一篇累積。')),el('div',{},el('p',{},'Research Atlas 是一個持續整理研究內容的小型網站。論文、理論與方法，可以有不同章節，但都保留來源與閱讀者自己的反思。'),el('p',{},'之後提供新的論文或筆記時，AI 可依 AGENTS.md 沿用格式新增文章，內容就會出現在這份清單中。'))));
}
function renderArticle(articles){
 const main=$('#main'),id=new URLSearchParams(location.search).get('id'),a=articles.find(a=>a.id===id);
 if(!a){document.title='找不到文章 · Research Atlas';main.append(el('section',{class:'empty-state'},el('span',{class:'eyebrow'},'ARTICLE NOT FOUND'),el('h1',{},'找不到這篇文章'),el('p',{},'文章連結可能有誤，請返回列表選擇內容。'),el('a',{class:'back-link',href:link('index.html')},'← 返回研究筆記')));return;}
 document.title=`${a.title} · Research Atlas`;
 main.append(el('a',{class:'back-link',href:link('index.html')},'← 返回研究筆記'),el('header',{class:'article-heading'},el('div',{class:'card-top'},el('span',{class:'content-type'},typeLabels[a.type]),a.isDemo?el('span',{class:'demo-pill'},'Demo · 合成示範'):null),el('h1',{},a.title),el('p',{class:'lead'},a.summary),el('div',{class:'article-meta'},el('span',{},`更新 ${a.updatedAt}`),a.tags.map(t=>el('a',{class:'tag',href:link('index.html',{tag:t})},t)))));
 if(a.isDemo)main.append(demoNotice());
 const toc=el('aside',{class:'toc','aria-label':'文章目錄'},el('span',{class:'eyebrow'},'ON THIS PAGE'),el('h2',{},'文章目錄'),el('nav',{},a.bibliography?el('a',{href:'#bibliography'},'基本書目資訊'):null,a.sections.map(s=>el('a',{href:`#${s.id}`},s.title)),el('a',{href:'#sources'},'來源與閱讀說明')));
 const body=el('article',{class:'reading-body'});
 if(a.bibliography){const b=a.bibliography;body.append(el('section',{class:'bibliography',id:'bibliography'},el('h2',{},'基本書目資訊'),el('dl',{},[['作者',b.authors.join('、')],['年份',b.year??'未提供'],['出版來源',b.venue||'未提供'],['DOI',b.doi||'未提供']].map(([term,value])=>[el('dt',{},term),el('dd',{},value)])),el('p',{},b.note),b.url?external(b.url,'開啟原文 ↗'):null));}
 for(const [i,s] of a.sections.entries())body.append(el('section',{class:'reading-section',id:s.id},el('span',{class:'section-number'},String(i+1).padStart(2,'0')),el('h2',{},s.title),s.paragraphs.map(p=>el('p',{},p))));
 body.append(el('section',{class:'sources',id:'sources'},el('h2',{},'來源與閱讀說明'),a.sources.map(s=>el('div',{},s.url?external(s.url,s.label+' ↗'):el('strong',{},s.label),el('p',{},s.locator))),el('p',{class:'source-note'},a.isDemo?'本文為合成示範，不是學術論文的真實摘要或實證研究結果。':'研究資訊與閱讀者反思應分開理解；未確認內容以文內標示為準。')));
 main.append(el('div',{class:'reading-layout'},toc,body));
 const related=articles.filter(other=>other.id!==a.id&&other.tags.some(t=>a.tags.includes(t))).slice(0,3);
 if(related.length)main.append(el('section',{class:'related'},el('div',{class:'collection-title'},el('h2',{},'接著閱讀')),el('div',{class:'article-grid'},related.map(card))));
 main.append(el('a',{class:'back-bottom',href:link('index.html')},'← 回到所有研究內容'));
}
try{const articles=await loadArticles();$('#main').replaceChildren();if(isArticle)renderArticle(articles);else renderIndex(articles);}catch(error){$('#main').replaceChildren(el('section',{class:'empty-state',role:'alert'},el('h1',{},'暫時無法載入文章'),el('p',{},error.message),el('button',{onclick:()=>location.reload()},'重新載入')));}
