/* V3.1.11 Premium compact figure selector, final-stage photo reference only */
(function(){
'use strict';
const escapeHtml=value=>String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
function drawPremiumFigures(){
 if(state.world!=='sign')return;
 const panel=document.getElementById('premiumPanel270');
 if(!panel)return;
 let box=document.getElementById('premiumCast311');
 if(!box){
  box=document.createElement('details');box.id='premiumCast311';box.open=true;
  box.style.cssText='margin:14px 0;border:2px solid #fc4c02;border-radius:12px;padding:14px;background:#181c23';
  box.innerHTML='<summary style="font-size:18px;font-weight:800;cursor:pointer">FIGUREN &amp; MENSCHENMASSE · MANUELL</summary><div id="premiumCastBody311"></div>';
  const cards=document.getElementById('premiumCards270');
  if(cards)cards.parentNode.insertBefore(box,cards);else panel.append(box);
 }
 const settings=state.sign258||(state.sign258={});
 const figures=state.director?.sides||[];
 const selected=Number(settings.premiumSlot320??0);
 const index=figures.length?Math.min(Math.max(selected,0),figures.length-1):-1;
 const f=figures[index];
 const optionsFor=(key)=>{
  if(!f)return '';
  let options=window.stravaSideOptions311?window.stravaSideOptions311(f,key):[];
  const current=key==='position'?(f.outfit258?.position||'Automatisch'):f[key];
  if(current&&!options.includes(current))options=[current,...options];
  return options.map(value=>'<option value="'+escapeHtml(value)+'" '+(value===current?'selected':'')+'>'+escapeHtml(value)+'</option>').join('');
 };
 const select=(key,label)=>'<label style="display:block;margin:9px 0">'+escapeHtml(label)+'<select data-premium-control320="'+key+'" style="width:100%;padding:11px;background:#111;color:white;border:1px solid #666;border-radius:7px">'+optionsFor(key)+'</select></label>';
 const body=box.querySelector('#premiumCastBody311');
 body.innerHTML='<label style="display:block;margin:12px 0"><input type="checkbox" id="premiumCrowd311" '+(settings.forceAudience277?'checked':'')+'> Menschenmasse einschalten</label>'+
 '<label style="display:block;margin:12px 0">Figur auswählen<select id="premiumSlot320" style="width:100%;padding:12px;background:#111;color:white;border:1px solid #666;border-radius:7px">'+figures.map((figure,i)=>'<option value="'+i+'" '+(i===index&&!f?.reference320?'selected':'')+'>Figur '+(i+1)+' · '+escapeHtml(figure.type)+'</option>').join('')+'<option value="reference" '+(f?.reference320?'selected':'')+'>Eigene Figur · Full-Body-Foto im finalen Prompt</option></select></label>'+
 (f? '<label style="display:block;margin:12px 0"><input type="checkbox" id="premiumEnabled320" '+(f.enabled?'checked':'')+'> Diese Figur einschalten</label>'+
 (f.reference320?'<label style="display:block;margin:12px 0">Referenzname<input id="premiumReferenceName320" style="width:100%;padding:11px" value="'+escapeHtml(f.referenceName320||'Meine Full-Body-Figur')+'"></label><p style="color:#adb4c0">Das Full-Body-Foto erst zusammen mit dem fertigen Master-Prompt anhängen. Kein Datei-Upload im Generator.</p>':'')+
 (f.enabled?select('pose','Pose / Körperhaltung')+select('reaction','Mimik / Reaktion')+select('gesture','Handgeste')+select('target','Blickrichtung')+select('position','Position')+select('prop','Requisit'):''):'<p>Keine Nebenfiguren vorhanden.</p>')+
 '<p style="font-size:12px;color:#adb4c0">Die Figurenplätze bleiben mit Nebenfiguren synchronisiert. Andere Figuren bleiben beim Wechsel erhalten.</p>';
 const remember=()=>{settings.lastChange310='Premium · Figurenregie';save();render()};
 body.querySelector('#premiumCrowd311').onchange=e=>{settings.forceAudience277=e.target.checked;remember()};
 const slot=body.querySelector('#premiumSlot320');
 if(slot)slot.onchange=e=>{
  if(e.target.value==='reference'){f.reference320=true;f.enabled=true;f.type='Eigene Figur aus beigefügtem Full-Body-Referenzfoto';f.outfit258={kind:'profession',preset:'Individuell',cap:'Wie Referenzfoto',coat:'Wie Referenzfoto',top:'Wie Referenzfoto',bottom:'Wie Referenzfoto',shoes:'Wie Referenzfoto',palette:'Wie Referenzfoto',accessory:'Keine',position:f.outfit258?.position||'Automatisch',custom:'IDENTITY AND COMPLETE OUTFIT FROM ATTACHED FULL-BODY PHOTO ONLY. Never use former character archetype.'}}
  else{settings.premiumSlot320=Number(e.target.value)}
  remember();
 };
 if(!f)return;
 body.querySelector('#premiumEnabled320').onchange=e=>{f.enabled=e.target.checked;remember()};
 const refName=body.querySelector('#premiumReferenceName320');
 if(refName)refName.oninput=e=>{f.referenceName320=e.target.value;save()};
 body.querySelectorAll('[data-premium-control320]').forEach(el=>el.onchange=()=>{
  if(el.dataset.premiumControl320==='position'){f.outfit258=f.outfit258||{};f.outfit258.position=el.value}
  else f[el.dataset.premiumControl320]=el.value;
  remember();
 });
}
const previousRender=render;
render=function(){const wasOpen=document.getElementById('premiumCast311')?.open;previousRender();drawPremiumFigures();if(wasOpen===false){const box=document.getElementById('premiumCast311');if(box)box.open=false}};
const previousPrompt=buildPrompt;
buildPrompt=function(){
 let prompt=previousPrompt();
 (state.director?.sides||[]).forEach((figure,index)=>{
  if(!figure.enabled||!figure.reference320)return;
  prompt+='\n\n=== PREMIUM CUSTOM FIGURE '+(index+1)+' — FULL BODY REFERENCE AT FINAL STAGE ===\n';
  prompt+='REFERENCE NAME: '+(figure.referenceName320||'Custom full-body figure')+'.\n';
  prompt+='HARD REPLACEMENT: This slot is NOT an Anatolian grandfather, village elder or any former default character. Use ONLY the person shown in the attached full-body reference photograph. Do not retain prior identity, age, clothes, headwear or archetype. Do not generate an additional grandfather as a substitute.\n';
  prompt+='Attach this character full-body photograph separately ONLY when submitting the finished master prompt for image generation. No image is uploaded to the generator.\n';
  prompt+='Preserve exact face, body proportions, identity, outfit and footwear from this reference; follow this figure\'s manually selected pose, reaction, gaze and gesture. Override generic character appearance for this figure only.\n';
 });
 return prompt;
};
drawPremiumFigures();
})();