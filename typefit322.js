/* V3.1.24 — maximal poster typography with per-line fitting and paragraph spacing. */
(function(){
'use strict';
let frame=0,observed=null;
function fit(){
 const host=document.getElementById('liveTextPreview307');
 const board=host?.firstElementChild,block=board?.firstElementChild;
 if(!board||!block)return;
 const rows=[...block.children],lines=(state.sign.signText||'').split('\n');
 if(!rows.length)return;
 board.style.width='100%';board.style.maxWidth='none';board.style.minHeight='0';
 board.style.height='auto';board.style.aspectRatio='3 / 4';
 board.style.padding='4% 4%';board.style.boxSizing='border-box';
 board.style.display='flex';board.style.alignItems='center';board.style.justifyContent='center';
 board.style.overflow='hidden';
 block.style.display='block';block.style.width='100%';block.style.maxWidth='100%';
 block.style.flex='none';block.style.textAlign='center';block.style.lineHeight='1.04';
 block.style.letterSpacing='-.025em';block.style.overflowWrap='normal';
 const maxW=board.clientWidth-board.clientWidth*.08-4,maxH=board.clientHeight-board.clientHeight*.08-4;
 if(maxW<50||maxH<50)return;
 const nonempty=lines.filter(t=>t.trim()).length||1;
 const blank=lines.length-nonempty;
 const context=document.createElement('canvas').getContext('2d');
 const face='Impact, "Arial Narrow", sans-serif';
 function layout(scale,apply){
  let total=0;
  for(let i=0;i<rows.length;i++){
   const row=rows[i],line=lines[i]||'';
   row.style.whiteSpace='nowrap';row.style.wordBreak='normal';row.style.overflowWrap='normal';
   row.style.minHeight='0';row.style.margin='0';row.style.padding='0';
   if(!line.trim()){
    const h=scale*.70;
    if(apply){row.style.height=h.toFixed(2)+'px';row.style.fontSize='1px';row.style.lineHeight='1'}
    total+=h;continue;
   }
   let lo=5,hi=160;
   for(let k=0;k<14;k++){
    const m=(lo+hi)/2;
    context.font='900 '+m+'px '+face;
    if(context.measureText(line.toUpperCase()).width<=maxW)lo=m;else hi=m;
   }
   const size=Math.min(lo*.96,scale);
   if(apply){row.style.height='auto';row.style.fontSize=size.toFixed(2)+'px';row.style.lineHeight='1.04';}
   total+=size*1.04;
  }
  return total;
 }
 let lo=7,hi=160;
 for(let k=0;k<17;k++){const m=(lo+hi)/2;if(layout(m,false)<=maxH)lo=m;else hi=m}
 layout(lo*.975,true);
 block.style.fontSize='1px';
}
function schedule(){cancelAnimationFrame(frame);frame=requestAnimationFrame(fit)}
function attach(){
 const host=document.getElementById('liveTextPreview307');if(!host)return;
 if(observed!==host){
  observed=host;
  new MutationObserver(schedule).observe(host,{childList:true,subtree:true,characterData:true});
  if(typeof ResizeObserver!=='undefined')new ResizeObserver(schedule).observe(host);
 }
 schedule();
}
const priorRender=render;render=function(){priorRender();attach()};
const priorPrompt=buildPrompt;buildPrompt=function(){
 let p=priorPrompt();
 if(state.world==='sign')p+='\n\n=== BLACK SIGN: MAXIMUM POSTER TYPOGRAPHY — REFERENCE IMAGE LAYOUT ===\nMake the physical black poster large, visually dominant, and face-on to camera. Use ultra-bold condensed uppercase block letters. Every nonempty original text line may have its OWN optimal font size: shorter lines should be enlarged individually; longer lines must be sized to fit without wrapping or clipping. Preserve the exact authored line breaks and paragraph breaks, with clearly visible paragraph separation. Match the latest supermarket poster reference: an oversized physically dominant overhead black sign, near-edge-to-edge heavy lettering, conspicuous white lines and powerful red emphasis. The combined text composition must use nearly all usable poster width AND height, with a STRICT 4% clear safety margin on all four edges, measured from the physical sign border to the outermost visible glyph. No glyph may touch or cross the border. Do not make a small centered island of text or leave excessive unused black space. Keep every word and punctuation mark fully visible and preserve all user-assigned red/white word colors. This is the highest priority for sign typography; the poster reference image defines scale and visual density, not the scene or characters.\n';
 return p;
};
document.addEventListener('input',e=>{if(e.target?.matches?.('textarea[data-bs-section="sign"][data-bs-key="signText"]'))schedule()},true);
if(document.fonts?.ready)document.fonts.ready.then(schedule);
attach();
})();