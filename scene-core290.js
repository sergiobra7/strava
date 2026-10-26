/* V2.9.0 — single authoritative scene selection gate. */
(function(){
'use strict';
const previousRender=render, previousPrompt=buildPrompt;
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const normal=s=>String(s||'').toLocaleLowerCase('de').replace(/[\s\-–_]+/g,' ').trim();
function config(){
 const z=state.sign258||(state.sign258={}),p=z.premium270||(z.premium270={});
 return {z,p,venue:z.situation269||'Bahnhofsvorplatz',category:z.situationCategory269||'Bahnhof & Verkehr',poster:p.poster||'XXL-Rechteckschild quer',holding:p.holding||'Über Kopf · beide Arme',prop:p.prop||'Keine Requisite',position:p.position||'Breiter stabiler Stand',expression:p.expression||'Kamera',audience:z.audience269&&z.audience269!=='Bestehende Director-Publikumsauswahl'?z.audience269:(p.audience||'15–30 Passanten'),reaction:z.reaction269&&z.reaction269!=='Bestehende Director-Reaktionen'?z.reaction269:(p.reaction||'Fassungslos')};
}
function validate(c){
 const problems=[];
 if(/über kopf/i.test(c.holding)&&/bodenplakat|standbanner|aufsteller|staffelei|einkaufswagen.plakat|koffer.plakat|fahrrad.plakat/i.test(c.poster))problems.push('Plakatvariante kann nicht gleichzeitig über Kopf gehalten werden.');
 if(/über kopf/i.test(c.holding)&&/sitzend|neben plakat|angelehnt/i.test(c.position))problems.push('Position der Hauptfigur widerspricht der Über-Kopf-Haltung.');
 if(/rückwärtsstuhl/i.test(c.holding)&&!/stuhl/i.test(c.prop))problems.push('Rückwärtsstuhl erfordert einen Stuhl als Requisite.');
 return problems;
}
function generate(c,idx){
 const n=idx+1,variants=['Publikum frontal zur Kamera, Läufer mittig','Läufer leicht links, Zuschauer rechts','Läufer leicht rechts, Zuschauer links','Breiter Hintergrund mit erkennbarem Bahnhof','Frontaler Blick auf Läufer und Schild','Zuschauer im Vordergrund, Läufer dahinter','Mehrere Reaktionen im Publikum','Symmetrische Komposition','Großzügige freie Gehfläche','Statischer dokumentarischer Moment'];
 return {id:n,title:'PREMIUM '+String(n).padStart(3,'0')+' · '+c.venue+' · '+variants[idx%10],variant:variants[idx%10]};
}
function setActive(c,item){
 const {z,p}=c;
 p.scene=20000+item.id;p.title=item.title;p.location=c.venue;
 p.description='AUTHORITATIVE PREMIUM SCENE. EXACT LOCATION: '+c.venue+'. CATEGORY: '+c.category+'. POSTER: '+c.poster+'. POSTER HOLDING: '+c.holding+'. PROP: '+c.prop+'. RUNNER POSITION: '+c.position+'. EXPRESSION: '+c.expression+'. AUDIENCE: '+c.audience+'. REACTION: '+c.reaction+'. COMPOSITION: '+item.variant+'. Static scene, physically feasible, sign faces camera, no venue substitution.';
 z.activeSceneSource267='premium';z.activeSceneId267=p.scene;p.open=true;
 save();render();
}
function premium(){
 const c=config(),panel=document.getElementById('premiumPanel270'),cards=document.getElementById('premiumCards270');
 if(!panel||!cards)return;
 const problems=validate(c);
 const offset=((Number(c.p.rotation)||0)%5)*10;
 const list=problems.length?[]:Array.from({length:10},(_,i)=>generate(c,offset+i));
 cards.innerHTML=problems.length?'<div role="alert" style="border:2px solid #ff9b54;border-radius:10px;padding:14px">'+problems.map(esc).join('<br>')+' Bitte die markierten Einstellungen oben korrigieren. Keine widersprüchlichen Vorschläge.</div>':list.map((item,i)=>'<button type="button" class="scene270" data-core290="'+i+'" style="display:block;width:100%;text-align:left;margin:10px 0"><strong>'+esc(item.title)+'</strong><small>Ort: '+esc(c.venue)+'<br>Plakat: '+esc(c.poster)+'<br>Requisite: '+esc(c.prop)+'<br>Plakathaltung: '+esc(c.holding)+'<br>Position: '+esc(c.position)+'<br>Publikum: '+esc(c.audience)+'<br>Reaktion: '+esc(c.reaction)+'</small></button>').join('');
 cards.querySelectorAll('[data-core290]').forEach(b=>b.onclick=()=>setActive(config(),list[Number(b.dataset.core290)]));
 // Avoid showing independent matrix suggestions while Premium is the active mode.
 const matrix=document.getElementById('matrix280');if(matrix)matrix.style.display='none';
}
function reconcile(){
 if(state.world!=='sign'||state.tab!=='Smart Director')return;
 const c=config();
 if(c.p.open)premium();
 else{
  const matrix=document.getElementById('matrix280');if(matrix)matrix.style.display='';
 }
 // Explicit venue change invalidates previously selected Premium scene.
 if(c.z.activeSceneSource267==='premium'&&c.p.location&&normal(c.p.location)!==normal(c.venue)){
  c.p.scene=null;c.p.title='';c.p.description='';c.p.location='';c.z.activeSceneSource267='';c.z.activeSceneId267=null;save();
 }
}
render=function(){previousRender();reconcile();};
buildPrompt=function(){
 let base=previousPrompt();
 if(state.world!=='sign')return base;
 const c=config();
 // Strip stale Premium blocks and the legacy independent situation block.
 base=base.replace(/\n\n=== ACTIVE PREMIUM SCENE ===[\s\S]*?=== END ACTIVE PREMIUM SCENE ===/g,'');
 base=base.replace(/\n\n=== V2\.6\.9 ADDITIVE SITUATION DIRECTOR ===[\s\S]*?=== END V2\.6\.9 ===/g,'');
 if(c.z.activeSceneSource267!=='premium'||!c.p.open)return base;
 const problems=validate(c);
 if(problems.length)return base+'\n\nSCENE VALIDATION ERROR: '+problems.join(' | ')+' DO NOT GENERATE UNTIL CORRECTED.';
 const selected=c.p.title||('Premium scene · '+c.venue);
 base=base.replace(/^(\[REG-01\] SCENE: ).*$/m,'$1'+selected);
 base=base.replace(/^(\[REG-02\] LOCATION \/ ORT: ).*$/m,'$1'+c.venue);
 return base+'\n\n=== AUTHORITATIVE V2.9.0 SCENE LOCK ===\nEXACT VENUE: '+c.venue+'\nCATEGORY: '+c.category+'\nPOSTER: '+c.poster+'\nHOLDING: '+c.holding+'\nPROP: '+c.prop+'\nRUNNER POSITION: '+c.position+'\nEXPRESSION: '+c.expression+'\nAUDIENCE: '+c.audience+'\nREACTION: '+c.reaction+'\n'+(c.p.description||'')+'\nNo alternative location, no contradictory pose, preserve camera distance and lens.\n=== END AUTHORITATIVE SCENE LOCK ===';
};
window.stravaSceneCore290={config,validate,generate};
render();
})();