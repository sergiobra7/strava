/* V3.1.23 — measured maximum-fill poster typography and image-prompt priority. */
(function(){
'use strict';
let pending=0,observed=null;
function fit(){
 const host=document.getElementById('liveTextPreview307');
 const board=host?.firstElementChild,block=board?.firstElementChild;
 if(!board||!block)return;
 board.style.cssText+=';width:100%;max-width:none;min-height:0;height:auto;aspect-ratio:3/4;padding:12px 10px;box-sizing:border-box;display:flex;align-items:center;justify-content:center;overflow:hidden;';
 block.style.cssText+=';display:block;width:max-content;max-width:none;flex:none;line-height:1.08;letter-spacing:-.025em;overflow-wrap:normal;word-break:normal;text-align:center;';
 const rows=[...block.children];
 rows.forEach(row=>{row.style.whiteSpace='nowrap';row.style.overflowWrap='normal';row.style.wordBreak='normal';row.style.minHeight='1.08em';});
 const maxW=board.clientWidth-20-8,maxH=board.clientHeight-24-8;
 if(maxW<=0||maxH<=0)return;
 let lo=6,hi=180;
 for(let k=0;k<18;k++){
  const size=(lo+hi)/2;
  block.style.fontSize=size+'px';
  const measuredWidth=Math.max(block.scrollWidth,...rows.map(row=>row.scrollWidth));
  const measuredHeight=block.scrollHeight;
  if(measuredWidth<=maxW&&measuredHeight<=maxH)lo=size;else hi=size;
 }
 block.style.fontSize=Math.max(6,lo*.975).toFixed(2)+'px';
}
function schedule(){cancelAnimationFrame(pending);pending=requestAnimationFrame(fit)}
function attach(){
 const host=document.getElementById('liveTextPreview307');
 if(!host)return;
 if(observed!==host){
  observed=host;
  new MutationObserver(schedule).observe(host,{childList:true,subtree:true,characterData:true});
  if(typeof ResizeObserver!=='undefined')new ResizeObserver(schedule).observe(host);
 }
 schedule();
}
const oldRender=render;render=function(){oldRender();attach()};
const oldPrompt=buildPrompt;buildPrompt=function(){
 let p=oldPrompt();
 if(state.world==='sign')p+='\n\n=== ABSOLUTE BLACK SIGN DESIGN PRIORITY — MAXIMUM TEXT FILL ===\nThe sign is a visually dominant large black portrait board, held or positioned clearly toward the camera. Fill the usable sign face with the exact provided lines in very large, heavy condensed uppercase block lettering. Scale typography to the LARGEST size that fits ALL original lines, including intentional blank-line paragraph breaks. Maintain only a narrow physical safety margin (approximately 3–5% of the sign width) on all four edges. Avoid miniature lettering, excessive unused black space, small central text islands or unnecessarily large top/bottom margins. Preserve exact words, punctuation, line breaks, red-highlighted words and white unhighlighted words. Keep the complete text fully readable without cropping or overflowing. Use the supplied bakery poster photograph only as a reference for dominant poster-to-person scale and maximum typography fill, not as a compulsory location, pose or character reference.\n';
 return p;
};
document.addEventListener('input',e=>{if(e.target?.matches?.('textarea[data-bs-section="sign"][data-bs-key="signText"]'))schedule()},true);
if(document.fonts?.ready)document.fonts.ready.then(schedule);
attach();
})();