/* V3.1.18 — outfit defaults and live word-color tracking. */
(function(){
'use strict';
const key='stravaOutfitDefaults318';
try{if(localStorage.getItem(key)!=='done'){
 const c=state.common;
 Object.assign(c,{brand:'PUMA',topColor:'COROS Lime Green (Gelbgrün)',topColorName272:'Individuell',topColorHex272:'#76BB40',pantsColor:'Schwarz',pantsColorName272:'Schwarz',pantsColorHex272:'#000000',pantsLogoColor270:'#76BB40',pantsLogoVisible270:true,cap:'Rote Cap rückwärts'});
 const colors=state.sign.wordColors||{};
 for(const i of Object.keys(colors))if(colors[i]&&colors[i].toLowerCase()!=='#ffffff')colors[i]='#ff3434';
 state.sign.wordColors=colors;
 save();localStorage.setItem(key,'done');
}}catch(e){console.warn(e)}
function remap(oldText,newText,colors){
 const a=oldText.split(/(\s+)/),b=newText.split(/(\s+)/);
 const oldWords=a.map((w,i)=>({w,i})).filter(x=>x.w.trim());
 const newWords=b.map((w,i)=>({w,i})).filter(x=>x.w.trim());
 const m=oldWords.length,n=newWords.length;
 if(m*n>100000)return {};
 const dp=Array.from({length:m+1},()=>new Uint16Array(n+1));
 for(let i=m-1;i>=0;i--)for(let j=n-1;j>=0;j--)dp[i][j]=oldWords[i].w===newWords[j].w?1+dp[i+1][j+1]:Math.max(dp[i+1][j],dp[i][j+1]);
 let i=0,j=0,result={};
 while(i<m&&j<n){if(oldWords[i].w===newWords[j].w){if(colors[oldWords[i].i])result[newWords[j].i]=colors[oldWords[i].i];i++;j++}else if(dp[i+1][j]>=dp[i][j+1])i++;else j++}
 return result;
}
let last=state.sign.signText;
function bind(){
 const area=document.querySelector('textarea[data-section="sign"][data-key="signText"]');
 if(!area||area.dataset.live318)return;
 area.dataset.live318='1';
 area.addEventListener('input',()=>{
  const next=area.value;
  state.sign.wordColors=remap(last,next,state.sign.wordColors||{});
  last=next;
  state.sign.signText=next;
  save();
  const colored=document.querySelectorAll('[data-word]');
  if(colored.length){const words=next.split(/(\s+)/);colored.forEach(el=>{let i=Number(el.dataset.word);if(words[i]!==undefined)el.textContent=words[i]})}
 },{capture:true});
}
const prior=render;render=function(){prior();last=state.sign.signText;bind()};
bind();
})();