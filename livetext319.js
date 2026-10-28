/* V3.1.19 — Live BS-TX word list and restore default sign. */
(function(){
'use strict';
const defaultText="2 STUNDEN\nBURGER REINZIEHEN?\nEHRENSACHE, DIGGA!\n\n20 MINUTEN\nLAUFEN?\nFEHLT DER DRIVE!\n\nABER WENN DIE HOSE\nAM KNOPF PLATZT,\nGIBT ES PLÖTZLICH\nSCHULDIGE!";
const tokenize=t=>(t.match(/\S+/g)||[]);
function mapColors(oldText,newText,colors){
 const a=tokenize(oldText),b=tokenize(newText),out={};
 const dp=Array.from({length:a.length+1},()=>new Uint16Array(b.length+1));
 for(let i=a.length-1;i>=0;i--)for(let j=b.length-1;j>=0;j--)dp[i][j]=a[i]===b[j]?dp[i+1][j+1]+1:Math.max(dp[i+1][j],dp[i][j+1]);
 let i=0,j=0;
 while(i<a.length&&j<b.length){if(a[i]===b[j]){if(colors[i])out[j]=colors[i];i++;j++}else if(dp[i+1][j]>=dp[i][j+1])i++;else j++}
 return out;
}
function updateTokens(){
 const old=document.querySelector('[data-word258]');if(!old)return;
 const parent=old.parentElement;
 const selected=new Set((state.sign258?.selectedWords||[]).map(Number));
 parent.innerHTML=tokenize(state.sign.signText).map((word,i)=>'<button type="button" class="btn '+(selected.has(i)?'':'secondary')+'" data-word258="'+i+'" style="padding:7px;background:'+(selected.has(i)?'#fc4c02':'')+'">'+word.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))+'</button>').join('');
 parent.querySelectorAll('[data-word258]').forEach(el=>{
  el.style.touchAction='manipulation';el.style.minHeight='46px';
  let touched=0;
  const toggle=e=>{if(typeof window.stravaToggleWord333==='function')window.stravaToggleWord333(Number(el.dataset.word258),e);};
  el.addEventListener('pointerup',e=>{if(e.pointerType==='touch'||e.pointerType==='pen'){touched=Date.now();toggle(e);}});
  el.addEventListener('click',e=>{if(Date.now()-touched<650){e.preventDefault();return;}toggle(e);});
 });
}
function bind(){
 const area=document.querySelector('textarea[data-bs-section="sign"][data-bs-key="signText"]');
 if(!area||area.dataset.fixed319)return;
 area.dataset.fixed319='1';
 area.addEventListener('input',e=>{
  // Keep the original BS-TX input handler running: it refreshes the live preview.
  const previous=state.sign.signText||'',next=area.value;
  state.sign.wordColors=mapColors(previous,next,state.sign.wordColors||{});
  state.sign.signText=next;
  state.sign258.selectedWords=[];
  save();updateTokens();
  // The original sign258 input handler now refreshes liveTextPreview307 after this capture listener.
 },true);
 const reset=document.getElementById('resetColors258');
 if(reset&&!document.getElementById('restoreDefault319')){
  const btn=document.createElement('button');btn.type='button';btn.id='restoreDefault319';btn.className='btn secondary';btn.style.cssText='margin:10px 0;display:block';btn.textContent='Standardtext + rote Markierungen wiederherstellen';
  reset.insertAdjacentElement('afterend',btn);
  btn.onclick=()=>{
   state.sign.signText=defaultText;
   state.sign.wordColors={};
   tokenize(defaultText).forEach((word,i)=>{if(['EHRENSACHE,','DIGGA!','FEHLT','DER','DRIVE!','SCHULDIGE!'].includes(word))state.sign.wordColors[i]='#ff3434'});
   state.sign258.selectedWords=[];save();render();
  };
 }
}
const prev=render;render=function(){prev();bind()};
bind();
})();