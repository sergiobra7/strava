/* V3.1.9 reusable uploaded full-body character reference */
(function(){
'use strict';
const KEY='stravaUploadedCharacter319';
let image=null;
const readStored=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'{}')}catch{return {}}};
let cfg=readStored();
function persist(){try{localStorage.setItem(KEY,JSON.stringify(cfg))}catch(e){alert('Speichern nicht möglich: '+e.message)}}
const dbReq=indexedDB.open('stravaCharacterImages319',1);
dbReq.onupgradeneeded=()=>{const db=dbReq.result;if(!db.objectStoreNames.contains('images'))db.createObjectStore('images')};
dbReq.onsuccess=()=>{const tx=dbReq.result.transaction('images','readonly');const q=tx.objectStore('images').get('fullbody');q.onsuccess=()=>{image=q.result||null;draw()}};
function store(data){if(dbReq.readyState!=='done'||!dbReq.result)return;const tx=dbReq.result.transaction('images','readwrite');tx.objectStore('images').put(data,'fullbody')}
const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function draw(){
if(!['Nebenfiguren','Smart Director'].includes(state.tab))return;
const host=document.getElementById('view');if(!host)return;
let box=document.getElementById('uploadedCharacter319');if(box)return;
box=document.createElement('section');box.id='uploadedCharacter319';box.className='panel';box.style.cssText='border:2px solid #fc4c02;padding:14px;margin:12px 0;border-radius:12px';
const sides=state.director&&state.director.sides||[];
box.innerHTML='<h2>FIGUR AUS UPLOAD · FULL BODY</h2><p class="hint">Eigenes Ganzkörper-Referenzfoto lokal speichern, Figur auswählen und beim Prompt als Bild separat anhängen. Das Bild wird nicht in den kopierten Text eingebettet.</p>'+
'<label>Referenzfigur benennen</label><input id="charName319" value="'+esc(cfg.name||'Meine Full-Body-Figur')+'" placeholder="Figurenname" style="width:100%">'+
'<label>Full-Body-Foto auswählen</label><input type="file" accept="image/*" id="charFile319" style="width:100%">'+
'<img id="charPreview319" style="display:'+(image?'block':'none')+';max-height:220px;max-width:100%;object-fit:contain;margin:10px auto" '+(image?'src="'+image+'"':'')+'>'+
'<label>Figur zuweisen</label><select id="charTarget319" style="width:100%"><option value="">Nicht verwenden</option>'+sides.map((f,i)=>'<option value="'+i+'" '+(String(cfg.target)===String(i)?'selected':'')+'>Figur '+(i+1)+' · '+esc(f.type)+'</option>').join('')+'</select>'+
'<p class="hint">Bei Auswahl einer Figur werden deren Pose und Reaktion weiterhin über die bestehenden Dropdowns gesteuert. Identität und Ganzkörper-Outfit stammen aus dem Upload. Nach einem Gerätewechsel das Foto erneut hochladen.</p>';
host.insertAdjacentElement('afterbegin',box);
box.querySelector('#charName319').oninput=e=>{cfg.name=e.target.value;persist()};
box.querySelector('#charTarget319').onchange=e=>{cfg.target=e.target.value;persist()};
box.querySelector('#charFile319').onchange=e=>{const f=e.target.files[0];if(!f)return;if(!f.type.startsWith('image/'))return alert('Bitte Bilddatei auswählen');const reader=new FileReader();reader.onload=()=>{image=reader.result;store(image);const p=box.querySelector('#charPreview319');p.src=image;p.style.display='block';cfg.fileName=f.name;persist()};reader.readAsDataURL(f)};
}
const oldRender=render;render=function(){oldRender();draw()};
const oldPrompt=buildPrompt;buildPrompt=function(){let p=oldPrompt();const sides=state.director&&state.director.sides||[];const idx=Number(cfg.target);if(cfg.target===''||cfg.target===undefined||!sides[idx]||!sides[idx].enabled)return p;
const f=sides[idx];return p+'\n\n=== UPLOADED FULL-BODY CHARACTER REFERENCE — MANUAL OVERRIDE ===\n'+
'REQUIRED ATTACHMENT: User must attach the original full-body character photo separately alongside this prompt. The local browser preview is NOT transferred by copying this text.\n'+
'CHARACTER SLOT: Side figure '+(idx+1)+' ('+f.type+'). Reference identity: '+(cfg.name||'Uploaded full-body character')+'.\n'+
'IDENTITY LOCK: Preserve the attached full-body character reference: face, age, body proportions, hair, distinctive features, clothing and footwear. No redesign or substitute person.\n'+
'POSE AND REACTION: Use the selected pose, gesture, gaze and reaction for this figure; adapt naturally without changing identity.\n'+
'PRIORITY: This uploaded character identity overrides generic scene-cast descriptions for this one selected side figure. Other figures and the main runner remain unchanged.\n'};
draw();
})();