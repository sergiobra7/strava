/* V3.1.25 — linked Premium scene camera and independent manual camera memory. */
(function(){
'use strict';
window.stravaPremiumSceneValues325=function(index){
 const i=Math.max(0,Number(index)||0);
 const lenses=[24,28,35,20,24,28,35,24,20,28];
 const distances=[15,12,20,10,18,15,25,12,8,20];
 return {lens:lenses[i%lenses.length],distance:distances[i%distances.length]};
};
window.stravaPremiumCamera325=function(){
 const s=state.sign258||{};
 if(s.manualCamera267||s.activeSceneSource267!=='premium')return;
 const index=Number(s.activeSceneId267);
 if(!Number.isInteger(index)||index<0)return;
 const values=window.stravaPremiumSceneValues325(index);
 state.common.cameraLens=String(values.lens);
 state.common.personDistance=String(values.distance);
};
})();