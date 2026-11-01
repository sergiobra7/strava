/* STRAVA WALL V4.4.0 — seven clean Wall screens; retains protected BLACK SIGN renderer. */
(function(){
'use strict';
const TABS=[
 ['scene','01 · Szene & Ort'],['stats','02 · STRAVA-Statistik & Wand'],
 ['runner','03 · Hauptläufer'],['cast','04 · Nebenfiguren'],
 ['camera','05 · Kamera & Fotos'],['projection','06 · Auto-Wand'],
 ['output','07 · Prompt & Presets']
];
const escapeHTML=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let urls=[];
function clean(){urls.forEach(u=>URL.revokeObjectURL(u));urls=[]}
function current(){return state.wall.statsMode440==='only'?'only':'bpm'}
function sourcePanel(role,label){
 return '<div class="field" style="border:1px solid #49515a;padding:12px;border-radius:10px">'+
 '<label><b>'+label+'</b></label><input type="file" accept="image/png,image/jpeg,image/webp" data-wall-source440="'+role+'">'+
 '<div data-wall-source-preview440="'+role+'" style="font-size:12px;color:#b8c7d0;margin:7px 0">Lokale Datei wird geprüft …</div>'+
 '<button class="btn secondary" type="button" data-wall-remove440="'+role+'">Quelle entfernen</button></div>';
}
function scene(){
 const id=Number(state.wall.scene)||0,sc=sceneData[id]||sceneData[0];
 return '<div class="notice"><b>STRAVA WALL · Szene & Ort</b><p>30 Szenen mit je drei Stimmungen. Szenen sind Vorschläge; manuelle Posen und deine eigene Beschreibung haben Vorrang.</p></div>'+
 panel('Szenenauswahl','<label>Szene</label><select id="scenePick">'+sceneData.map((a,i)=>'<option value="'+i+'" '+(id===i?'selected':'')+'>'+String(i+1).padStart(2,'0')+' · '+escapeHTML(a[0])+'</option>').join('')+'</select>'+
 field('Stimmung','variant',['Humorvoll','Provokant','Natürlich'],'wall')+
 '<p class="hint">'+escapeHTML(sc[1])+'</p><p class="hint">Vorgeschlagene Pose: '+escapeHTML(sc[2])+'</p><button type="button" class="btn" id="applyScene">Szenenpose übernehmen</button>')+
 panel('Echter Standort',area('Standort / Beschreibung','locationNote','common')+
 '<p class="hint">LOCATION PHOTO separat zum endgültigen Bildauftrag hinzufügen; vorhandene Architektur darf nicht ersetzt werden.</p>');
}
function stats(){
 const mode=current(),w=state.wall;
 return '<div class="notice"><b>STRAVA-STATISTIK & WAND · Originaldaten</b><p>Die Ausgangsbilder werden als Originalpixel verarbeitet. Keine Zahlen- oder GPS-Neuzeichnung durch die Web-App.</p></div>'+
 panel('1 · Statistikmodus',
 '<label>Welche Ansicht?</label><select id="wallMode440"><option value="bpm" '+(mode==='bpm'?'selected':'')+'>A · Statistik + BPM + Karte · 2 Screenshots</option><option value="only" '+(mode==='only'?'selected':'')+'>B · Statistik only · 1 Screenshot</option></select>'+
 '<p class="hint">'+(mode==='bpm'?'Vollstatistik einschließlich Avg HR/BPM aus Screenshot A; originale orange GPS-Route aus Screenshot B.':'Nur die tatsächlich im einzelnen Screenshot sichtbaren Werte und gegebenenfalls die dort vorhandene GPS-Route. Kein BPM ergänzen.')+'</p>')+
 panel('2 · Original-STRAVA-Screenshots',
 mode==='bpm'?sourcePanel('bpm','A · Vollstatistik mit Avg HR/BPM')+sourcePanel('route','B · Statistik/Karte mit orangefarbener Route'):sourcePanel('solo','C · Originalstatistik ohne BPM')+
 '<p id="wallSourceStatus440" role="status" class="hint">Quellenstatus wird geprüft.</p>'+
 '<div class="actions"><button id="wallMakeOverlay440" class="btn" type="button">Originalpixel-Vorlage als transparentes PNG erstellen</button></div>'+
 '<canvas id="wallOverlayPreview440" width="600" height="800" style="width:100%;max-width:420px;background:repeating-conic-gradient(#292929 0% 25%, #414141 0% 50%) 50% / 22px 22px;border:1px solid #59616b;border-radius:9px"></canvas>'+
 '<p class="hint">Das PNG wird nur aus den sichtbaren Originalpixeln zusammengesetzt. Schwarzer Screenshot-Hintergrund wird transparent; Buchstaben und GPS-Linie werden nicht neu erzeugt. PNG danach als Grafik für Auto-Wand nutzen und die Original-Screenshots beim finalen Bildauftrag ebenfalls anhängen.</p>')+
 wallSignView();
}
function runner(){
 return '<div class="notice"><b>Hauptläufer</b><p>Aktive eigene Pose hat Vorrang vor Szenenvorschlägen. Alle Originalfotos für die Bildgenerierung separat anhängen.</p></div>'+
 panel('Läuferpose',field('Pose','runnerPose',poses,'wall')+area('Individuelle Pose (Vorrang)','runnerCustom','common')+
 field('Blickrichtung','gaze',['Direkt in Kamera','Zur STRAVA-Statistik','Seitlich zum Opa','In die Ferne'],'common')+
 field('Gesichtsausdruck','expression',['Provokant grinsend','Locker lächelnd','Ernst','Natürlich entspannt'],'common'))+
 outfitView()+
 panel('Identitätsschutz','<p>PERSON PHOTO 1:1. Separates SHOE PHOTO bestimmt auf beiden Füßen das konkrete Modell. Keine Verschönerung und keine falschen Logos.</p>');
}
function cast(){
 return '<div class="notice"><b>Nebenfiguren</b><p>Der erweiterte Director bestimmt die Figuren, wenn er verwendet wird. Keine zusätzlichen Personen nur aufgrund einer Szenenbeschreibung.</p></div>'+
 panel('Klassische Figuren',
 check('Opa anzeigen','opaVisible')+field('Opa-Pose','opaPose',opaPoses)+area('Opa-Pose – frei','opaCustom')+
 check('Teyze anzeigen','teyzeVisible')+field('Teyze-Pose','teyzePose',teyzePoses)+area('Teyze-Pose – frei','teyzeCustom')+
 check('Kollege anzeigen','colleagueVisible')+area('Kollege-Pose – frei','colleagueCustom'))+
 '<details class="panel"><summary><b>Erweiterter Nebenfiguren-Director</b></summary>'+sideDirector()+'</details>';
}
function camera(){
 return '<div class="notice"><b>Kamera & Fotos</b><p>Genau eine Kameraquelle. Die angezeigten Werte werden direkt in den STRAVA-WALL-Prompt übernommen.</p></div>'+
 cameraView()+panel('Bildformat',field('Ausgabeformat','format',['4:5','9:16'],'common'))+
 panel('Referenzfoto-Vertrag','<p><b>PERSON PHOTO:</b> Gesicht und Anatomie 1:1.</p><p><b>SHOE PHOTO:</b> genaues Modell auf beiden Füßen.</p><p><b>LOCATION PHOTO:</b> echte Straßen- und Gebäudearchitektur.</p><p><b>STRAVA ORIGINAL-SCREENSHOTS:</b> je nach Modus zwei oder eins. Lokale Uploads werden nicht automatisch an ChatGPT angehängt.</p>');
}
function output(){
 return '<div class="notice"><b>Export & Sicherheit</b><p>Vor dem Kopieren muss die Auswahl vollständig sein und die notwendigen Screenshot-Dateien müssen lokal vorliegen. Die Anhänge musst du anschließend selbst zum Bildauftrag hinzufügen.</p></div>'+
 panel('ASF · Aktiver Status','<button type="button" class="btn" id="wallAudit440">Aktuelle Einstellungen und 90 Szenen prüfen</button><p id="wallAuditStatus440" role="status" class="hint">Nicht geprüft</p>')+
 promptView()+projectView()+presetsTab398();
}
function draw(){
 if(state.world!=='wall')return false;
 if(!TABS.some(t=>t[0]===state.tab))state.tab='scene';
 const tabs=document.getElementById('tabs'),view=document.getElementById('view');
 document.querySelectorAll('[data-world]').forEach(b=>b.classList.toggle('active',b.dataset.world===state.world));
 tabs.innerHTML=TABS.map(t=>'<button class="tab '+(t[0]===state.tab?'active':'')+'" data-walltab440="'+t[0]+'">'+t[1]+'</button>').join('');
 clean();const views={scene,stats,runner,cast,camera,projection:autoWallView,output};
 view.innerHTML=views[state.tab]();
 return true;
}
async function refreshSources(){
 const mode=current(),api=window.stravaWallSources440;
 if(!api)return;
 const check=await api.ready(mode),status=document.getElementById('wallSourceStatus440');
 if(status)status.textContent=check.ok?'✓ Alle Pflicht-Screenshots lokal gespeichert.':'⚠ Fehlende Original-Screenshots: '+check.missing.join(', ');
 for(const role of check.required){
  const host=document.querySelector('[data-wall-source-preview440="'+role+'"]');if(!host)continue;
  const blob=await api.get(role);if(!blob){host.textContent='Noch keine Originaldatei hochgeladen';continue}
  const url=URL.createObjectURL(blob);urls.push(url);
  host.innerHTML='<span>✓ '+Math.round(blob.size/1024)+' KB lokal gespeichert</span><img alt="Original STRAVA Screenshot" src="'+url+'" style="display:block;max-height:160px;max-width:100%;margin:8px 0">';
 }
}
async function safePrompt(){
 const api=window.stravaWallSources440,check=await api.ready(current());
 if(!check.ok)throw Error('Original-Screenshots fehlen: '+check.missing.join(', '));
 return buildPrompt();
}
function bind(){
 document.querySelectorAll('[data-walltab440]').forEach(b=>b.onclick=()=>{state.tab=b.dataset.walltab440;save();render()});
 document.querySelectorAll('[data-section][data-key]').forEach(e=>{
  const update=()=>{const v=e.type==='checkbox'?e.checked:e.value;state[e.dataset.section][e.dataset.key]=v;save()};
  e.onchange=()=>{update();render()};
  if(e.tagName==='TEXTAREA'||e.type==='text'||e.type==='number')e.oninput=update;
 });
 const sceneSelect=document.getElementById('scenePick');if(sceneSelect)sceneSelect.onchange=()=>{state.wall.scene=Number(sceneSelect.value);save();render()};
 const apply=document.getElementById('applyScene');if(apply)apply.onclick=()=>{
  const s=sceneData[Number(state.wall.scene)];if(!s)return;
  state.wall.runnerPose=s[2];state.common.runnerCustom='';
  if(!(state.director?.sides||[]).length){state.common.opaPose=s[3];state.common.teyzePose=s[4]}
  save();render();
 };
 if(state.tab==='cast'&&typeof sideBind==='function')sideBind();
 if(state.tab==='projection'&&typeof initAutoWall==='function')initAutoWall();
 if(state.tab==='output'){
  if(typeof presetBind399==='function')presetBind399();
  if(typeof archiveBind413==='function')archiveBind413();
  const ex=document.getElementById('exportJson');if(ex)ex.onclick=()=>download('STRAVA_WALL_SETTINGS_V440.json',JSON.stringify(state,null,2),'application/json');
  const imp=document.getElementById('importJson');if(imp)imp.onchange=()=>{const file=imp.files?.[0];if(!file)return;file.text().then(s=>{const x=JSON.parse(s);if(!x.wall||!x.common)throw Error('Ungültiges Projekt');state.wall={...state.wall,...x.wall};state.common={...state.common,...x.common};save();render()}).catch(e=>alert(e.message))};
  const check=document.getElementById('wallAudit440');if(check)check.onclick=async()=>{const el=document.getElementById('wallAuditStatus440');try{const a=window.stravaWallASF432.audit(state),m=window.stravaWallASF432.matrix(),r=await window.stravaWallSources440.ready(current());el.textContent='Szenen '+m.passed+'/'+m.total+' · 14 Wall-Filter '+(a.pass?'OK':'FEHLER '+a.errors.join(', '))+' · Screenshots '+(r.ok?'bereit':'FEHLEN: '+r.missing.join(', '))}catch(e){el.textContent='ASF FEHLER: '+e.message}};
  const cp=document.getElementById('copyPrompt');if(cp)cp.onclick=async()=>{try{const p=await safePrompt();await navigator.clipboard.writeText(p);cp.textContent='✓ Prompt kopiert'}catch(e){alert(e.message)}};
  const dl=document.getElementById('downloadPrompt');if(dl)dl.onclick=async()=>{try{download('STRAVA_WALL_V440_PROMPT.txt',await safePrompt(),'text/plain')}catch(e){alert(e.message)}};
 }
 if(state.tab==='stats'){
  const m=document.getElementById('wallMode440');m.onchange=()=>{state.wall.statsMode440=m.value;state.wall.version=m.value==='bpm'?'A':'B';save();render()};
  document.querySelectorAll('[data-wall-source440]').forEach(e=>e.onchange=async()=>{try{if(!e.files?.[0])return;await window.stravaWallSources440.set(e.dataset.wallSource440,e.files[0]);await refreshSources()}catch(err){alert('Speichern fehlgeschlagen: '+err.message)}});
  document.querySelectorAll('[data-wall-remove440]').forEach(b=>b.onclick=async()=>{await window.stravaWallSources440.del(b.dataset.wallRemove440);render()});
  const mk=document.getElementById('wallMakeOverlay440');mk.onclick=async()=>{try{const c=document.getElementById('wallOverlayPreview440');await window.stravaWallSources440.make(current(),c);const a=document.createElement('a');a.download=current()==='bpm'?'STRAVA_WALL_BPM_KARTE_ORIGINAL.png':'STRAVA_WALL_STATISTIK_ONLY_ORIGINAL.png';a.href=c.toDataURL('image/png');a.click()}catch(e){alert(e.message)}};
  refreshSources().catch(e=>{const el=document.getElementById('wallSourceStatus440');if(el)el.textContent='Speicherprüfung fehlgeschlagen: '+e.message});
  const oldAudit=document.getElementById('wallAudit432');if(oldAudit)oldAudit.onclick=()=>{const a=window.stravaWallASF432.audit(state);document.getElementById('wallAuditStatus432').textContent=a.pass?'ASF Wall-Filter OK':'ASF Wall-Filter: '+a.errors.join(', ')};
 }
}
const prior=render;
render=function(){
 if(state.world!=='wall')return prior.apply(this,arguments);
 if(!draw())return;
 bind();
};
window.stravaWallUI440={tabs:TABS.map(t=>t[0]),draw,bind,version:'V4.4.0'};
if(state.world==='wall')render();
})();