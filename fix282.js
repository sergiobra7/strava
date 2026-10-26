/* V2.8.2: final DOM reconciliation after all director render wrappers. */
(function(){
'use strict';
const before=render;
render=function(){
 before();
 const view=document.getElementById('view');
 if(!view||state.world!=='sign'||state.tab!=='Smart Director')return;
 const standard=view.querySelector('[data-smartsub267="standard"]');
 const crowd=view.querySelector('[data-smartsub267="crowd"]');
 const premium=view.querySelector('#premiumTab270');
 if(!standard||!crowd||!premium)return;
 const previous=document.getElementById('primaryModes281');
 if(previous)previous.remove();
 const bar=document.createElement('section');
 bar.id='primaryModes282';
 bar.setAttribute('aria-label','Smart Director Hauptkategorien');
 bar.style.cssText='display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;padding:10px;margin:0 0 12px;border:2px solid #fc4c02;border-radius:12px;background:#181d25;box-sizing:border-box;width:100%';
 const current=state.sign258||{};
 const active=current.premium270?.open?'premium':current.smartSubtab267||'standard';
 [[standard,'standard','Normale Vorschläge'],[crowd,'crowd','Menschenmasse'],[premium,'premium','Premium']].forEach(([button,mode,label])=>{
   button.textContent=label;
   button.style.cssText='min-width:0;width:100%;box-sizing:border-box;white-space:normal;overflow-wrap:anywhere;line-height:1.2;padding:12px 3px;font-size:clamp(10px,2.6vw,14px);background:'+(active===mode?'#fc4c02':'#303845')+';border:'+(active===mode?'3px solid #fc4c02':'2px solid #485261')+';color:white;border-radius:9px;cursor:pointer';
   button.setAttribute('aria-pressed',String(active===mode));
   bar.appendChild(button);
 });
 // The Smart Director tab is outside #view. The first item inside #view
 // is therefore the earliest possible place immediately below that tab.
 view.insertAdjacentElement('afterbegin',bar);
};
function scrollToPrompt(){
 let target=document.getElementById('bottomActions279');
 if(!target&&state.world==='sign'){
   const view=document.getElementById('view');
   if(view&&typeof bottomActions279==='function')bottomActions279();
   target=document.getElementById('bottomActions279');
 }
 if(!target)target=document.getElementById('copyBottom279')||document.getElementById('directorCopy267');
 if(!target)return;
 const move=()=>{const rect=target.getBoundingClientRect();const y=Math.max(0,window.scrollY+rect.top-Math.max(12,(window.innerHeight-rect.height)/2));window.scrollTo({top:y,behavior:'smooth'});};
 move();
 setTimeout(move,180);
}
function bindArrow(){
 const arrow=document.getElementById('backToTop275');
 if(!arrow||arrow.dataset.promptJump282)return;
 arrow.dataset.promptJump282='true';
 // Capture phase supersedes legacy click-to-top logic.
 arrow.addEventListener('click',function(e){
   e.stopImmediatePropagation();e.preventDefault();
   if(arrow.dataset.moving282==='true'){arrow.dataset.moving282='false';return;}
   scrollToPrompt();
 },true);
 let start=null;
 arrow.addEventListener('pointerdown',e=>{start={x:e.clientX,y:e.clientY};arrow.dataset.moving282='false';},true);
 arrow.addEventListener('pointermove',e=>{if(start&&Math.abs(e.clientX-start.x)+Math.abs(e.clientY-start.y)>9)arrow.dataset.moving282='true';},true);
 arrow.addEventListener('pointerup',()=>{start=null;},true);
}
bindArrow();
render();
})();