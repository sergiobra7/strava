/* V3.1.9 reusable uploaded full-body character reference */
(function(){
'use strict';
const KEY='stravaUploadedCharacter319';

const readStored=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'{}')}catch{return {}}};
let cfg=readStored();
function persist(){try{localStorage.setItem(KEY,JSON.stringify(cfg))}catch(e){alert('Speichern nicht möglich: '+e.message)}}
const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
/* Duplicate top reference panel removed. Existing saved reference assignment and prompt support retained. */
const oldPrompt=buildPrompt;buildPrompt=function(){let p=oldPrompt();const sides=state.director&&state.director.sides||[];const idx=Number(cfg.target);if(cfg.target===''||cfg.target===undefined||!sides[idx]||!sides[idx].enabled)return p;
const f=sides[idx];return p+'\n\n=== FULL-BODY CHARACTER REFERENCE — ATTACH AT FINAL PROMPT STAGE ===\n'+
'REQUIRED ATTACHMENT: User must attach the original full-body character photo separately alongside this prompt. The local browser preview is NOT transferred by copying this text.\n'+
'CHARACTER SLOT: Side figure '+(idx+1)+' ('+f.type+'). Reference identity: '+(cfg.name||'Uploaded full-body character')+'.\n'+
'IDENTITY LOCK: Preserve the attached full-body character reference: face, age, body proportions, hair, distinctive features, clothing and footwear. No redesign or substitute person.\n'+
'POSE AND REACTION: Use the selected pose, gesture, gaze and reaction for this figure; adapt naturally without changing identity.\n'+
'PRIORITY: This uploaded character identity overrides generic scene-cast descriptions for this one selected side figure. Other figures and the main runner remain unchanged.\n'};
})();
