/* V3.1.22 — Maximal sign typography with narrow safe margins. */
(function(){
'use strict';
let raf=0;
function fit(){
 const host=document.getElementById('liveTextPreview307');if(!host)return;
 const outer=host.firstElementChild,inner=outer&&outer.firstElementChild;
 if(!inner||!outer)return;
 outer.style.maxWidth='none';outer.style.width='100%';outer.style.minHeight='0';outer.style.height='auto';outer.style.aspectRatio='3 / 4';outer.style.padding='12px 10px';outer.style.boxSizing='border-box';
 inner.style.width='100%';inner.style.lineHeight='1.08';inner.style.letterSpacing='-.025em';inner.style.overflowWrap='normal';inner.style.wordBreak='normal';
 const rows=Array.from(inner.children);
 rows.forEach(row=>{row.style.whiteSpace='nowrap';row.style.overflowWrap='normal';row.style.minHeight='1.08em'});
 const availableW=Math.max(40,outer.clientWidth-20-14);
 const availableH=Math.max(70,outer.clientHeight-24-14);
 const textRows=(state.sign.signText||'').split('\n');
 const canvas=document.createElement('canvas');const ctx=canvas.getContext('2d');
 const fitAt=size=>{
  ctx.font='900 '+size+'px Impact, "Arial Narrow", Arial, sans-serif';
  const maxWidth=Math.max(0,...textRows.map(row=>ctx.measureText(row.toUpperCase()).width));
  const neededH=textRows.length*size*1.08;
  return maxWidth<=availableW && neededH<=availableH;
 };
 let low=8,high=120;
 for(let n=0;n<16;n++){const mid=(low+high)/2;if(fitAt(mid))low=mid;else high=mid}
 inner.style.fontSize=Math.max(8,low*.95).toFixed(2)+'px';
}
function schedule(){cancelAnimationFrame(raf);raf=requestAnimationFrame(fit)}
function observe(){
 const host=document.getElementById('liveTextPreview307');
 if(!host||host.dataset.fit322)return;
 host.dataset.fit322='1';
 const observer=new MutationObserver(schedule);
 observer.observe(host,{childList:true,subtree:true,characterData:true});
 if(typeof ResizeObserver!=='undefined')new ResizeObserver(schedule).observe(host);
 schedule();
}
const previous=render;render=function(){previous();observe()};
observe();
})();