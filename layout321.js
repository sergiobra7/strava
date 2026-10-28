/* V3.2.1 — move existing situation director immediately before premium scenes; no content changes */
(function(){
 'use strict';
 function position(){
  if(state.world!=='sign'||state.tab!=='Smart Director')return;
  const situ=document.getElementById('situ269');
  const premium=document.getElementById('premiumPanel270');
  if(!situ||!premium||!premium.parentNode)return;
  if(situ.nextElementSibling===premium)return;
  premium.parentNode.insertBefore(situ,premium);
 }
 const old=render;
 render=function(){old();position();};
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',position);
 else position();
})();