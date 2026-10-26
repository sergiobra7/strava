/* V2.7.5: Persistent exclusive scene selection and global back-to-top control. */
(function(){
'use strict';
const P=["XXL-Quadratschild","XXL-Rechteckschild quer","XXL-Rechteckschild hoch","Panorama-Schild","Handgehaltenes Protestschild","Doppelgriff-Plakat","Bodenplakat","Standbanner mit Ballast","A-Aufsteller","Holzrahmen-Plakat","Metallrahmen-Plakat","Stuhl-Plakat","Einkaufswagen-Plakat","Koffer-Plakat","Fahrrad-Plakat","Treppen-Plakat","Geländer-Plakat (nur zulässig befestigt)","Bank-Plakat","Staffelei-Plakat","Zwei separate Plakate"],R=["Stuhl","Sofa","Einkaufswagen","Fahrrad","Reisekoffer","Holzkiste","Sitzbank","Geländer","Breite Treppe","Niedrige Mauer","Staffelei","Holzrahmen","Metallrahmen","A-Aufsteller","Leichte Palette","Stabiler Hocker","Öffentliche Brüstung","Leerer Bollerwagen","Abgestellter Tretroller","Kleiner Klapptisch","Podest","Leichte Transportkiste","Parkbank","Stadtplatz-Stufe","Korb","Sporttasche","Schuhkarton","Klappstuhl","Freistehender Rahmen","Faltbarer Prospektständer","Schwarze Tafel","Schaukasten","Sitzwürfel","Handwagen","Leerer Getränkekasten","Breite Fensterbank","Steinblock","Niedrige Plattform","Rucksack","Keine Requisite"],H=["Über Kopf · beide Arme","Über Kopf · ein Arm (leichtes Schild)","Brusthoch · frontal","Schulterhoch · seitlich","Bodenplakat · beide Hände","Bodenplakat · eine Hand","Standbanner · Arme verschränkt","Standbanner · Treppenstufe","Standbanner · Geländer","Standbanner · Hände in Taschen","Quadratschild · offene Geste","Quadratschild · breiter Stand","Treppensitz · Plakat daneben","Rückwärtsstuhl · Plakat daneben","Bank · Plakat daneben","Niedrige Mauer · Plakat daneben","Hand am Rahmen","Leichtes Schild über Schulter"],L=["Neben Plakat links","Neben Plakat rechts","Eine Stufe erhöht","Zwei breite Stufen erhöht","Am Geländer angelehnt","Auf niedriger Mauer sitzend","Auf breiter Treppenstufe sitzend","Rückwärts auf Stuhl sitzend","Auf Bank sitzend","Breiter stabiler Stand","Hände an Hüfte","Arme verschränkt","Offene Hand präsentiert Schild","Unterarme auf Knien"],M=["Provokantes Grinsen · Kamera","Ironisches Lächeln · Kamera","Herausfordernder Blick · Kamera","Selbstbewusst · Kamera","Fassungslos · Publikum"],A=["Bestehende Publikumseinstellung","15–30 Passanten","30–60 Reisende","15–40 Kunden","15–40 Zuschauer","Gemischtes Publikum"],X=["Bestehende Reaktion","Lachen und diskutieren","Fassungslos und ungläubig","Aufmerksam und neugierig","Gemischte natürliche Reaktionen"],SC=[["BS-001 · BAHNHOFS-TREPPE – PROVOKANTES GRINSEN","Bahnhofsvorplatz","XXL-Rechteckschild quer","Breite Treppe","Standbanner · Treppenstufe","Eine Stufe erhöht","Provokantes Grinsen · Kamera","30–60 Reisende","Lachen und diskutieren"],["BS-002 · GELÄNDER – LÄSSIGE KONFRONTATION","Stadtpromenade","XXL-Quadratschild","Geländer","Standbanner · Geländer","Am Geländer angelehnt","Ironisches Lächeln · Kamera","15–30 Passanten","Fassungslos und ungläubig"],["BS-003 · DER RÜCKWÄRTSSTUHL – STILLES URTEIL","Bahnhofsvorplatz","Bodenplakat","Stuhl","Rückwärtsstuhl · Plakat daneben","Rückwärts auf Stuhl sitzend","Provokantes Grinsen · Kamera","30–60 Reisende","Gemischte natürliche Reaktionen"],["BS-004 · SUPERMARKT – EINKAUFSWAGEN-PROTEST","Supermarkt-Eingang","Einkaufswagen-Plakat","Einkaufswagen","Hand am Rahmen","Neben Plakat rechts","Provokantes Grinsen · Kamera","15–40 Kunden","Lachen und diskutieren"],["BS-005 · STADTPLATZ – SOFA DER AUSREDEN","Stadtplatz","Handgehaltenes Protestschild","Sofa","Brusthoch · frontal","Auf Bank sitzend","Ironisches Lächeln · Kamera","15–30 Passanten","Gemischte natürliche Reaktionen"],["BS-006 · PARK – FAHRRAD UND PROTESTSCHILD","Parkpromenade","Fahrrad-Plakat","Fahrrad","Schulterhoch · seitlich","Neben Plakat links","Selbstbewusst · Kamera","15–30 Passanten","Aufmerksam und neugierig"],["BS-007 · MARKTPLATZ – DOPPELTE BOTSCHAFT","Marktplatz","Zwei separate Plakate","Staffelei","Hand am Rahmen","Breiter stabiler Stand","Herausfordernder Blick · Kamera","15–30 Passanten","Gemischte natürliche Reaktionen"],["BS-008 · STADTTREPPE – PANORAMA-STATEMENT","Breite Stadttreppe","Panorama-Schild","Breite Treppe","Treppensitz · Plakat daneben","Auf breiter Treppenstufe sitzend","Provokantes Grinsen · Kamera","15–30 Passanten","Fassungslos und ungläubig"],["BS-009 · BAHNHOFSPLATZ – KOFFERSCHILD","Bahnhofsvorplatz","Koffer-Plakat","Reisekoffer","Bodenplakat · eine Hand","Neben Plakat rechts","Ironisches Lächeln · Kamera","30–60 Reisende","Aufmerksam und neugierig"],["BS-010 · INDUSTRIEPROMENADE – HOLZKISTE","Industriepark-Vorplatz","Holzrahmen-Plakat","Holzkiste","Bank · Plakat daneben","Auf niedriger Mauer sitzend","Herausfordernder Blick · Kamera","15–30 Passanten","Gemischte natürliche Reaktionen"],["BS-011 · FUẞGÄNGERZONE – SCHILD ÜBER KOPF","Fußgängerzone","Doppelgriff-Plakat","Keine Requisite","Über Kopf · beide Arme","Breiter stabiler Stand","Provokantes Grinsen · Kamera","15–30 Passanten","Lachen und diskutieren"],["BS-012 · MESSEPLATZ – A-AUFSTELLER","Messehaupteingang","A-Aufsteller","Keine Requisite","Standbanner · Hände in Taschen","Neben Plakat links","Selbstbewusst · Kamera","15–40 Zuschauer","Aufmerksam und neugierig"]];
const oldRender=render,oldPrompt=buildPrompt;
const esc270=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function cfg(){state.sign258=state.sign258||{};return state.sign258.premium270=state.sign258.premium270||{};}function jump270(id){const go=()=>{let el=document.getElementById(id);if(!el)return false;let top=el.getBoundingClientRect().top+window.pageYOffset;let header=document.querySelector('header');let offset=(header?header.getBoundingClientRect().height:150)+14;window.scrollTo(0,Math.max(0,top-offset));return true;};setTimeout(go,70);setTimeout(go,260);}
function jumpScene273(type){const go=()=>{let el=type==='crowd'?document.querySelector('[data-crowd267]'):document.querySelector('[data-scene258]');if(!el)return;let target=el.closest('.quick-item')||el;let header=document.querySelector('header');let offset=(header?header.getBoundingClientRect().height:150)+14;window.scrollTo(0,Math.max(0,target.getBoundingClientRect().top+window.pageYOffset-offset));};setTimeout(go,70);setTimeout(go,260);}
/* Global floating back-to-top button, independent of director tab rendering. */
function setupBackToTop275(){
  if(document.getElementById('backToTop275'))return;
  const key='stravaBackToTop277';
  const defaults={right:14,bottom:24};
  const b=document.createElement('button'),reset=document.createElement('button');
  b.type='button';b.id='backToTop275';b.textContent='↑';b.setAttribute('aria-label','Zu Werte aktualisieren und Master-Prompt kopieren');b.title='Zu den Prompt-Schnellzugriffen · zum Verschieben halten';
  b.style.cssText='position:fixed;z-index:9999;width:56px;height:56px;border-radius:50%;border:3px solid #fc4c02;background:#222832;color:#fff;font-size:32px;font-weight:900;box-shadow:0 4px 18px #0009;display:none;align-items:center;justify-content:center;cursor:pointer;touch-action:none';
  reset.type='button';reset.id='resetBackToTop277';reset.textContent='↺ Standard';
  reset.setAttribute('aria-label','Pfeilposition auf Standard zurücksetzen');
  reset.style.cssText='position:fixed;top:max(12px,env(safe-area-inset-top));right:max(12px,env(safe-area-inset-right));bottom:auto;left:auto;z-index:9998;border:1px solid #fc4c02;border-radius:22px;padding:8px 10px;background:#222832;color:#fff;font-size:12px;font-weight:700;display:none;box-shadow:0 4px 18px #0008;cursor:pointer';
  let pos={...defaults};
  try{const saved=JSON.parse(localStorage.getItem(key));if(saved&&Number.isFinite(saved.right)&&Number.isFinite(saved.bottom))pos={right:saved.right,bottom:saved.bottom};}catch(e){}
  function position(){
    const safeRight=Math.max(12,Math.min(pos.right,Math.max(12,window.innerWidth-70)));
    const safeBottom=Math.max(20,Math.min(pos.bottom,Math.max(20,window.innerHeight-85)));
    pos={right:safeRight,bottom:safeBottom};
    b.style.right=safeRight+'px';b.style.bottom=safeBottom+'px';
    /* Reset is deliberately anchored top-right, independent of the movable arrow. */
    reset.style.right='max(12px,env(safe-area-inset-right))';
    reset.style.left='auto';
    reset.style.top='max(12px,env(safe-area-inset-top))';
    reset.style.bottom='auto';
  }
  let down=null,dragged=false;
  b.addEventListener('pointerdown',e=>{down={x:e.clientX,y:e.clientY,right:pos.right,bottom:pos.bottom};dragged=false;try{b.setPointerCapture(e.pointerId);}catch(err){}});
  b.addEventListener('pointermove',e=>{if(!down)return;const dx=e.clientX-down.x,dy=e.clientY-down.y;if(Math.abs(dx)+Math.abs(dy)>7)dragged=true;if(dragged){pos.right=down.right-dx;pos.bottom=down.bottom-dy;position();}});
  b.addEventListener('pointerup',()=>{if(down&&dragged){try{localStorage.setItem(key,JSON.stringify(pos));}catch(e){}}down=null;});
  b.addEventListener('pointercancel',()=>{down=null;});
  b.onclick=()=>{if(dragged){dragged=false;return;}const target=document.getElementById('bottomActions279')||document.getElementById('directorRefresh267');if(target){target.scrollIntoView({behavior:'smooth',block:'center'});}else{try{window.scrollTo({top:document.documentElement.scrollHeight,behavior:'smooth'});}catch(e){window.scrollTo(0,document.documentElement.scrollHeight);}}};
  reset.onclick=()=>{dragged=false;down=null;pos={...defaults};try{localStorage.removeItem(key);}catch(e){}position();};
  document.body.appendChild(b);document.body.appendChild(reset);
  const update=()=>{const visible=state.world==='sign';b.style.display=visible?'flex':'none';reset.style.display=visible?'block':'none';};
  window.addEventListener('scroll',update,{passive:true});window.addEventListener('pageshow',update);window.addEventListener('resize',position);
  position();update();
}
setupBackToTop275();

/* V2.7.6 bakery name editor: one persistent name, optional suffix, visible signage toggle. */
function bakeryScene278(){
 if(state.world!=='sign')return false;
 const z=state.sign258||{};
 const source=z.activeSceneSource267||'standard';
 let scene='';
 if(source==='premium'){scene=String((z.premium270||{}).title||'');}
 else {
   const prompt=oldPrompt();
   const match=prompt.match(/^\[REG-01\] SCENE:\s*(.+)$/m);
   scene=match?match[1]:'';
 }
 return /bäckerei|bäcker|bakery|fırın|firin/i.test(scene);
}
function bakeryActive276(){return bakeryScene278();}
function bakeryName276(){
 const z=state.sign258||{},raw=String(z.bakeryName276||'').trim();
 if(!raw)return '';
 return z.bakeryNameMode276==='suffix'&& !/\bbäckerei\b/i.test(raw)?raw+' Bäckerei':raw;
}
function bakeryPanel276(){
 const z=state.sign258||{},mode=z.bakeryNameMode276||'full';
 const name=String(z.bakeryName276||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]));
 return '<section id="bakeryPanel276" style="border:2px solid #fc4c02;border-radius:12px;background:#211e1c;padding:14px;margin:12px 0">'+
 '<h3 style="color:#ff925d">BÄCKEREI · INDIVIDUELLER NAME</h3>'+
 '<label for="bakeryMode276">Namensmodus</label><select id="bakeryMode276"><option value="full" '+(mode==='full'?'selected':'')+'>Vollständigen Namen eingeben</option><option value="suffix" '+(mode==='suffix'?'selected':'')+'>Nur Name – „Bäckerei“ ergänzen</option></select>'+
 '<label for="bakeryName276" style="margin-top:12px">Bäckereiname (frei editierbar)</label><input id="bakeryName276" type="text" maxlength="110" placeholder="z. B. Schmidt Bäckerei oder Meyer" value="'+name+'" style="width:100%">'+
 '<label style="margin-top:12px"><input type="checkbox" id="bakeryVisible276" '+(z.bakeryVisible276!==false?'checked':'')+'> Name als reales Ladenschild im Bild sichtbar</label>'+
 '<div id="bakeryPreview276" style="margin-top:9px;color:#ffb285;font-weight:700"></div>'+
 '<div style="font-size:12px;color:#b9c2ce;margin-top:8px">Bleibt beim Szenenwechsel und bei „Werte aktualisieren“ gespeichert. Ohne Eingabe bleibt der normale Szenenort unverändert.</div></section>';
}
function bindBakery276(){
 const z=state.sign258||{},name=document.getElementById('bakeryName276'),mode=document.getElementById('bakeryMode276'),vis=document.getElementById('bakeryVisible276');
 if(!name||!mode||!vis)return;
 const update=()=>{z.bakeryName276=name.value;z.bakeryNameMode276=mode.value;z.bakeryVisible276=vis.checked;const prev=document.getElementById('bakeryPreview276');if(prev)prev.textContent='Vorschau: '+(bakeryName276()||'Kein individueller Name');save();};
 name.addEventListener('input',update);mode.addEventListener('change',update);vis.addEventListener('change',update);update();
}
const css=document.createElement('style');css.textContent=`#premiumTab270{border:2px solid #485261;border-radius:9px;background:#303845;color:white;padding:11px;font-weight:800;cursor:pointer}#premiumTab270.active{border:3px solid #fc4c02;background:#fc4c02}#premiumPanel270{border:2px solid #fc4c02;border-radius:12px;background:#1a222c;padding:12px;margin:10px 0}#premiumPanel270 label{display:block;margin:12px 0 5px;font-weight:700}#premiumPanel270 select{width:100%;background:#161c24;color:white;padding:10px;border:2px solid #586171;border-radius:8px}#premiumPanel270 select:focus{outline:2px solid #fc4c02}#premiumPanel270 .selected270{border:3px solid #fc4c02!important;background:#33271e!important}#premiumPanel270 .scene270{width:100%;text-align:left;display:block;border:2px solid #55606c;border-radius:11px;background:#252f39;color:#fff;padding:12px;margin:9px 0}#premiumPanel270 .scene270 small{display:block;line-height:1.65;color:#e4e6ea;margin-top:6px}#premiumPanel270 .action270{width:100%;padding:12px;background:#fc4c02;color:white;border:2px solid #fc4c02;border-radius:9px;font-weight:800;margin:8px 0}`;document.head.append(css);
function field(k,label,arr){let v=cfg()[k]||arr[0];return '<label>'+esc270(label)+'</label><select data-premium270="'+k+'">'+arr.map(z=>'<option '+(z===v?'selected':'')+'>'+esc270(z)+'</option>').join('')+'</select>';}
function card(c,i){let active=state.sign258.activeSceneSource267==='premium'&&cfg().scene===i;return '<button class="scene270 '+(active?'selected270':'')+'" data-scene270="'+i+'" aria-pressed="'+active+'"><strong>'+esc270(c[0])+'</strong><small>Ort: '+esc270(c[1])+'<br>Plakat: '+esc270(c[2])+'<br>Requisite: '+esc270(c[3])+'<br>Plakathaltung: '+esc270(c[4])+'<br>Hauptfigur: '+esc270(c[5])+'<br>Mimik: '+esc270(c[6])+'<br>Publikum: '+esc270(c[7])+' · '+esc270(c[8])+'</small></button>';}
function panel(){let p=cfg(),rotation=Number(p.rotation)||0,ordered=SC.map((c,i)=>({c,i}));ordered=ordered.slice(rotation%ordered.length).concat(ordered.slice(0,rotation%ordered.length));if(Number.isInteger(p.scene)&&!ordered.slice(0,10).some(o=>o.i===p.scene)){const active=ordered.find(o=>o.i===p.scene);if(active)ordered=[active,...ordered.filter(o=>o.i!==p.scene)];}return '<div id="premiumPanel270"><h3 style="color:#ff8b5b">PREMIUM-SZENEN · PLAKATE & REQUISITEN</h3><p>Eigenständige Fotomotive mit konkreter Situation. Alte Szenenvorschläge und Menschenmassen bleiben unverändert.</p><details id="premiumEditor270" '+(p.editorOpen!==false?'open':'')+'><summary style="padding:10px;font-weight:800">PLAKAT / REQUISITE / HALTUNG MANUELL ANPASSEN</summary>'+field('poster','Plakatvariante',P)+field('prop','Gegenstand / Requisite',R)+field('holding','Plakathaltung',H)+field('position','Position Hauptfigur',L)+field('expression','Mimik und Blick',M)+field('audience','Publikum',A)+field('reaction','Reaktion',X)+'</details><h3>PREMIUM-EMPFEHLUNGEN</h3><div id="premiumCards270">'+ordered.slice(0,10).map(o=>card(o.c,o.i)).join('')+'</div><button id="refreshPremium270" class="action270">10 WEITERE EMPFEHLUNGEN</button><p style="font-size:12px;color:#bfc9d2">Auswahl mit orangefarbenem Rahmen. Kamera, Gesicht, Outfit, Schuhfoto und manuelle Prioritäten bleiben erhalten.</p></div>';}
function bind(){const editor=document.getElementById('premiumEditor270');if(editor){const summary=editor.querySelector('summary');if(summary)summary.addEventListener('click',()=>{cfg().editorOpen=!editor.open;save();});}document.querySelectorAll('[data-scene270]').forEach(el=>el.onclick=()=>{const i=Number(el.dataset.scene270),c=SC[i],p=cfg();p.scene=i;p.title=c[0];p.location=c[1];p.poster=c[2];p.prop=c[3];p.holding=c[4];p.position=c[5];p.expression=c[6];p.audience=c[7];p.reaction=c[8];p.description='SCENE '+c[0]+'. EXACT LOCATION: '+c[1]+'. POSTER: '+c[2]+'. PHYSICAL PROP: '+c[3]+'. POSTER HOLDING: '+c[4]+'. RUNNER POSITION: '+c[5]+'. EXPRESSION: '+c[6]+'. AUDIENCE: '+c[7]+'. REACTION: '+c[8]+'. Static realistic documentary photograph. Use a stable, safe construction. Keep poster lettering and runner face unobstructed.';state.sign258.activeSceneSource267='premium';state.sign258.activeSceneId267=i;cfg().open=true;save();render();jump270('premiumPanel270');});document.querySelectorAll('[data-premium270]').forEach(el=>{el.classList.add('selected270');el.onchange=()=>{const p=cfg();p[el.dataset.premium270]=el.value;p.editorOpen=true;p.description='';save();const y=window.scrollY;render();const rebuilt=document.getElementById('premiumEditor270');if(rebuilt)rebuilt.open=true;window.scrollTo(0,y);};});document.getElementById('refreshPremium270').onclick=()=>{cfg().rotation=(Number(cfg().rotation)||0)+1;save();render();jump270('premiumPanel270');};}
function bottomActions279(){
 if(state.world!=='sign')return;
 const v=document.getElementById('view');if(!v)return;
 const previous=document.getElementById('bottomActions279');if(previous)previous.remove();
 const bar=document.createElement('section');
 bar.id='bottomActions279';
 bar.style.cssText='margin:28px 0 70px;padding:16px;border:2px solid #fc4c02;border-radius:12px;background:#171c24;display:flex;gap:12px;flex-wrap:wrap';
 bar.innerHTML='<button type="button" id="refreshBottom279" class="btn secondary" style="flex:1 1 240px;min-height:52px">↻ Werte aktualisieren</button><button type="button" id="copyBottom279" class="btn" style="flex:1 1 240px;min-height:52px">⧉ Master-Prompt direkt kopieren</button>';
 v.insertAdjacentElement('afterend',bar);
 document.getElementById('refreshBottom279').onclick=()=>{
   const original=document.getElementById('directorRefresh267');
   if(original&&typeof original.onclick==='function'){original.click();return;}
   save();render();
 };
 document.getElementById('copyBottom279').onclick=async e=>{
   const original=document.getElementById('directorCopy267');
   if(original&&typeof original.onclick==='function'){original.click();e.currentTarget.textContent='✓ Kopiervorgang gestartet';return;}
   const txt=buildPrompt();
   try{await navigator.clipboard.writeText(txt);}catch(err){
     const box=document.createElement('textarea');box.value=txt;document.body.appendChild(box);box.select();
     const ok=document.execCommand('copy');box.remove();if(!ok){alert('Kopieren nicht möglich. Bitte Master-Prompt im Reiter „Prompt & Projekt“ kopieren.');return;}
   }
   e.currentTarget.textContent='✓ Master-Prompt kopiert';
 };
}
render=function(){oldRender();bottomActions279();if(state.world==='sign'&&(state.tab==='Smart Director'||state.tab==='Ort & Kamera')){const v=document.getElementById('view');if(v){v.insertAdjacentHTML('afterbegin',bakeryPanel276());bindBakery276();}}if(state.world!=='sign'||state.tab!=='Smart Director')return;const v=document.getElementById('view');if(!v)return;const oldButtons=v.querySelector('[data-smartsub267="crowd"]');if(!oldButtons)return;const row=oldButtons.parentElement;const button=document.createElement('button');button.id='premiumTab270';button.type='button';button.textContent='Premium-Szenen · Plakate & Requisiten';button.className=cfg().open?'active':'';if(cfg().open){row.querySelectorAll('[data-smartsub267]').forEach(b=>{b.style.background='#303845';b.style.border='2px solid #485261';b.setAttribute('aria-pressed','false');});button.setAttribute('aria-pressed','true');}else{button.setAttribute('aria-pressed','false');row.querySelectorAll('[data-smartsub267]').forEach(b=>{const active=b.dataset.smartsub267===(state.sign258.smartSubtab267||'standard');b.style.background=active?'#fc4c02':'#303845';b.style.border=active?'3px solid #fc4c02':'2px solid #485261';b.setAttribute('aria-pressed',String(active));});}row.append(button);button.onclick=()=>{cfg().open=true;save();render();jump270('premiumPanel270');};row.querySelectorAll('[data-smartsub267]').forEach(b=>b.addEventListener('click',()=>{cfg().open=false;save();jumpScene273(b.dataset.smartsub267);},true));if(!cfg().open){const last=state.sign258.lastCrowd273;document.querySelectorAll('[data-crowd267]').forEach(el=>{const selected=state.sign258.activeSceneSource267==='crowd'&&Number(el.dataset.crowd267)===Number(state.sign258.activeSceneId267);el.style.border=selected?'3px solid #fc4c02':'';el.setAttribute('aria-pressed',String(selected));});return;}const top=row.parentElement.parentElement;let node=top.nextElementSibling;while(node){node.style.display='none';node=node.nextElementSibling;}top.insertAdjacentHTML('afterend',panel());bind();};
buildPrompt=function(){
 let base=oldPrompt();
 if(state.world!=='sign')return base;
 const z=state.sign258||{},p=cfg(),source=z.activeSceneSource267||'standard';
 const sceneMatch=base.match(/^\[REG-01\] SCENE:\s*(.+)$/m);
 const sceneName=sceneMatch?sceneMatch[1]:'';
 const premiumActive=source==='premium'&&Number.isInteger(p.scene)&&!!p.title;
 /* A stale category/venue is a saved preference, never an active location instruction.
    Only the current scene decides whether bakery signage applies. */
 const isBakery=/bäckerei|bäcker|bakery|fırın|firin/i.test(premiumActive?p.title:sceneName);
 const customName=isBakery?bakeryName276():'';
 /* Old additive situation defaults can contradict the selected scene. Suppress
    location instructions from the legacy block when they do not match the scene. */
 base=base.replace(/\n\n=== V2\.6\.9 ADDITIVE SITUATION DIRECTOR ===[\s\S]*?=== END V2\.6\.9 ===/g,block=>{
   const place=(block.match(/^EXACT SITUATION \/ LOCATION:\s*(.*)$/m)||[])[1]||'';
   const category=(block.match(/^SCENE CATEGORY:\s*(.*)$/m)||[])[1]||'';
   const relevant=place&&sceneName&&(
     sceneName.toLocaleLowerCase('de').includes(place.toLocaleLowerCase('de'))||
     place.toLocaleLowerCase('de').includes(sceneName.toLocaleLowerCase('de'))||
     (isBakery&&/bäckerei|bäcker|bakery|fırın|firin/i.test(place))
   );
   if(relevant)return block;
   const shoe=(block.match(/^MANDATORY ORIGINAL SHOE PHOTO LOCK:.*$/m)||[])[0]||'';
   return shoe?'\n\n'+shoe:'';
 });
 if(customName){
   const visible=z.bakeryVisible276!==false;
   base=base.replace(/^(\[REG-02\] LOCATION \/ ORT: ).*$/m,(_,prefix)=>prefix+customName);
   base+='\n\n=== BAKERY SCENE — STORED NAME APPLIES ONLY HERE ===\nEXACT VENUE NAME: '+customName+
    '\n'+(visible?'SIGNAGE ON: Show the exact name on the bakery storefront, preserving all letters and spacing.':'SIGNAGE OFF: Do not show the bakery name on shopfront signage.')+
    '\nDo not invent a different bakery name. Preserve exact camera geometry.\n=== END BAKERY SCENE ===';
 }
 if(!premiumActive)return base;
 return base+'\n\n=== ACTIVE PREMIUM SCENE ===\n'+
  (p.description||('SCENE '+p.title+'. EXACT LOCATION: '+(p.location||'selected venue')))+
  '\nPOSTER TYPE: '+(p.poster||'Automatic')+
  '\nPROP: '+(p.prop||'None')+
  '\nPOSTER HOLDING: '+(p.holding||'Automatic')+
  '\nRUNNER POSITION: '+(p.position||'Automatic')+
  '\nEXPRESSION: '+(p.expression||'Automatic')+
  '\nAUDIENCE: '+(p.audience||'Automatic')+
  '\nREACTION: '+(p.reaction||'Automatic')+
  '\nPreserve exact camera, face, shoes and manually chosen outfit.\n=== END ACTIVE PREMIUM SCENE ===';
};
})();