/* V3.1.9 reusable uploaded full-body character reference */
(function(){
'use strict';
const KEY='stravaUploadedCharacter319';

const readStored=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'{}')}catch{return {}}};
let cfg=readStored();
function persist(){try{localStorage.setItem(KEY,JSON.stringify(cfg))}catch(e){alert('Speichern nicht möglich: '+e.message)}}
const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function draw(){
if(!['Nebenfiguren','Smart Director'].includes(state.tab))return;
const host=document.getElementById('view');if(!host||document.getElementById('uploadedCharacter319'))return;
const sides=state.director&&state.director.sides||[];
const box=document.createElement('section');box.id='uploadedCharacter319';box.className='panel';box.style.cssText='border:2px solid #fc4c02;padding:14px;margin:12px 0;border-radius:12px';
box.innerHTML='<h2>FIGUR AUS REFERENZFOTO · PROMPT-ENDSTUFE</h2><p class="hint">KEIN Upload im Generator. Das Full-Body-Foto wird erst später zusammen mit dem fertigen Master-Prompt angehängt.</p>'+
'<label>Referenzfigur benennen</label><input id="charName319" value="'+esc(cfg.name||'Meine Full-Body-Figur')+'" placeholder="Figurenname" style="width:100%">'+
'<label>Figur auswählen</label><select id="charTarget319" style="width:100%"><option value="">Nicht verwenden</option>'+sides.map((f,i)=>'<option value="'+i+'" '+(String(cfg.target)===String(i)?'selected':'')+'>Figur '+(i+1)+' · '+esc(f.type)+'</option>').join('')+'</select>'+
'<p class="hint">Die Figur wird im Prompt als UPLOADED FULL-BODY REFERENCE markiert. Foto erst beim Einreichen des Prompts anhängen. Pose und Reaktion bleiben separat einstellbar.</p>';
host.insertAdjacentElement('afterbegin',box);
box.querySelector('#charName319').oninput=e=>{cfg.name=e.target.value;persist()};
box.querySelector('#charTarget319').onchange=e=>{cfg.target=e.target.value;persist()};
}
const oldRender=render;render=function(){oldRender();draw()};
const oldPrompt=buildPrompt;buildPrompt=function(){let p=oldPrompt();const sides=state.director&&state.director.sides||[];const idx=Number(cfg.target);if(cfg.target===''||cfg.target===undefined||!sides[idx]||!sides[idx].enabled)return p;
const f=sides[idx];return p+'\n\n=== FULL-BODY CHARACTER REFERENCE — ATTACH AT FINAL PROMPT STAGE ===\n'+
'REQUIRED ATTACHMENT: User must attach the original full-body character photo separately alongside this prompt. The local browser preview is NOT transferred by copying this text.\n'+
'CHARACTER SLOT: Side figure '+(idx+1)+' ('+f.type+'). Reference identity: '+(cfg.name||'Uploaded full-body character')+'.\n'+
'IDENTITY LOCK: Preserve the attached full-body character reference: face, age, body proportions, hair, distinctive features, clothing and footwear. No redesign or substitute person.\n'+
'POSE AND REACTION: Use the selected pose, gesture, gaze and reaction for this figure; adapt naturally without changing identity.\n'+
'PRIORITY: This uploaded character identity overrides generic scene-cast descriptions for this one selected side figure. Other figures and the main runner remain unchanged.\n'};
draw();
})();