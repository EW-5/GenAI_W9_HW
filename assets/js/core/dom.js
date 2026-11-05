export function el(tag,attrs={},...children) {
 const n=document.createElement(tag);
 for(const [k,v] of Object.entries(attrs)) {if(k==='class')n.className=v;else if(k.startsWith('on'))n.addEventListener(k.slice(2),v);else if(v!==null&&v!==undefined)n.setAttribute(k,String(v));}
 for(const c of children.flat(Infinity)) if(c!==null&&c!==undefined)n.append(c instanceof Node?c:document.createTextNode(String(c)));
 return n;
}
export const $=s=>document.querySelector(s);
export function link(path,params={}) {const u=new URL(path,document.baseURI);for(const [k,v] of Object.entries(params))if(v)u.searchParams.set(k,v);return u.href;}
export function external(url,text) {try{const u=new URL(url);if(!['https:','http:'].includes(u.protocol))throw Error();return el('a',{href:u.href,target:'_blank',rel:'noopener noreferrer'},text);}catch{return el('span',{},text);}}
