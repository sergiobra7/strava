/* BLACK SIGN · AUTO DIRECTOR V5.2.0 · autonomous documentary scene with audience controls */
(function(){
'use strict';
if(window.stravaAutoDirector520)return;
const TAB='AUTO DIRECTOR',KEY='strava-auto-director-520';
const DEFAULT={crowd:'500–800',control:'manual',against:75,support:10,gesture:'Deutlich & glaubwürdig',variation:1,colors:'',poseMode:'auto',poseText:'',cameraMode:'auto',cameraLens:24,cameraDistance:12};
function settings(){let x={};try{x=JSON.parse(localStorage.getItem(KEY)||'{}')||{}}catch(e){}const c={...DEFAULT,...x};const a=Math.max(0,Math.min(100,Math.round((Number(c.against)||0)/5)*5));return {...c,against:a,support:100-a}}
function set(k,v){const x=settings();x[k]=v;localStorage.setItem(KEY,JSON.stringify(x));return x}
function esc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]))}
const HOCKER_POSE='Chillig auf einem alten, sichtbar abgenutzten Holzhocker im anatolischen Alltagsstil um 1970 sitzen. Beine breit und natürlich angewinkelt, beide Unterarme locker nach vorne über den angewinkelten Knien abgelegt, Hände entspannt, Oberkörper kompakt und natürlich. Hocker steht fest und physikalisch plausibel auf dem Boden. Der Läufer schmunzelt souverän; keine übertriebene Zahndarstellung.';
function chosenPose(cfg){
 if(cfg.poseMode==='hocker')return HOCKER_POSE;
 if(cfg.poseMode==='custom')return String(cfg.poseText||'').trim();
 return '';
}
function source(){
 if(typeof window.stravaSignDeutsch500?.prompt==='function')return window.stravaSignDeutsch500.prompt();
 if(typeof buildPrompt==='function')return buildPrompt();
 return '';
}
function create(){
 if(typeof state==='undefined'||state.world!=='sign')throw Error('AUTO DIRECTOR nur für BLACK SIGN.');
 let raw=String(source()),z=state.sign||{},cfg=settings();
 if(!raw.startsWith('Transformiere die Person aus dem beigefügten Gesichtsfoto'))throw Error('Deutscher BLACK-SIGN-Transformationsauftrag nicht verfügbar.');
 if(!String(z.signText||'').trim())throw Error('Plakattext fehlt. Bitte zuerst im Reiter Plakat eintragen.');
 const pct=cfg.control==='auto'?null:Math.max(0,Math.min(100,Number(cfg.against)||0));
 const yes=cfg.control==='auto'?null:100-pct;
 const neutral=pct==null?null:100-pct-yes;
 const audience=(pct==null?
   'Verhältnis nach provokativem Inhalt dramaturgisch eigenständig wählen: Mehrheitswiderspruch ist möglich, aber nicht immer nötig. Empörte, zustimmende und neutrale Zuschauer realistisch mischen.':
   'Verbindliche Verteilung: ungefähr '+pct+' % Gegner, '+yes+' % Unterstützer, '+neutral+' % unentschiedene oder beobachtende Personen. Diese Zahlen sind Anteile der sichtbar dargestellten Menge, nicht exakte einzeln zählbare Personen.');
 const lockedPose=chosenPose(cfg);
 if(cfg.poseMode==='custom'&&!lockedPose)throw Error('Bitte eigene Pose eintragen oder Automatisch auswählen.');
 const chosenCamera=cfg.cameraMode==='preset'?
   {lens:24,distance:12}:
   cfg.cameraMode==='manual'?{lens:Number(cfg.cameraLens),distance:Number(cfg.cameraDistance)}:null;
 if(chosenCamera&&(!Number.isFinite(chosenCamera.lens)||chosenCamera.lens<16||chosenCamera.lens>200||!Number.isFinite(chosenCamera.distance)||chosenCamera.distance<1||chosenCamera.distance>200))throw Error('Kamera ungültig: Brennweite 16–200 mm, Entfernung 1–200 m.');
 const cameras=chosenCamera?
   '03 · KAMERA – MANUELLER KAMERA-LOCK\n- VERBINDLICHE BRENNWEITE: '+chosenCamera.lens+' mm (Vollformat).\n- VERBINDLICHER KAMERAABSTAND zur Hauptfigur: '+chosenCamera.distance+' m.\n- Diese Werte sind die EINZIGE Kameraquelle. Alte und automatisch vorgeschlagene Brennweiten und Entfernungen ignorieren. Kamerahöhe, Aufnahmewinkel und Komposition wählt die KI innerhalb der festen Werte physikalisch glaubwürdig, ohne überlange Beine oder gestreckten Oberkörper. Natives 9:16.':
   '03 · KAMERA – AUTONOME REGIE\nWähle selbstständig nur EINE physikalisch plausible Brennweite, EINEN Kameraabstand und EINE Kamerahöhe, passend zu einer monumentalen vertikalen Botschaft, dem erkennbaren Läufer und der Menge. Native 9:16. Keine widersprüchlichen Kamerapresets, kein künstlich gestreckter Körper.';
 const scene='05 · ORT, SZENE & HAUPTFIGUR — AUTONOME REGIE\n'+
  'Interpretation zuerst: Lies den exakten Plakattext und leite daraus den stärksten glaubwürdigen, öffentlichen Ort ab. Kein Wohnraum, kein privater Innenbereich. Wähle architektonisch passende öffentliche Treppen, Plätze, Bahnhofsareale, Markthallen oder Fußgängerbereiche nur wenn sie zum Text passen. Variiere Orte zwischen neuen Bildern.\n'+
  (lockedPose?
    'POSE — MANUELLER LOCK, ABSOLUT VERBINDLICH: '+lockedPose+' Die KI darf diese ausdrücklich vorgegebene Pose NICHT durch eine andere ersetzen. Sie entscheidet weiterhin frei über öffentlichen Ort, Architektur, monumentales Anzeigemittel, Position und Blick; die Kamera richtet sich nach Abschnitt 03 (automatisch oder verbindlich manuell). Alle freien Entscheidungen werden auf die Pose abgestimmt. Requisiten und Abstützungen müssen tragfähig und realistisch sein. Keine Zeigefingergeste des Läufers.\n':
    'POSE — AUTONOM: Entscheide selbst über die wirkungsvollste Pose aus anatolischen Alltagsposen und authentischen Läuferposen sowie Position vor/in/hinter der Menschenmenge und Blickrichtung. Sichere reale Auflagen bei Sitz-, Stufen- und Anlehnposen. Keine Zeigefingergeste des Läufers.\n')+
  'VERBINDLICH: Der Läufer zeigt ein natürliches, leicht asymmetrisches, überlegenes Schmunzeln. Kein übertriebenes Grinsen, keine künstlichen Zähne. Er bleibt selbstbewusst und entspannt gegen den Widerstand vieler Zuschauer, ohne drohende Gestik.';
 const people='06 · ZUSCHAUER & NEBENFIGUREN — AUTONOME PUBLIKUMSREGIE\n'+
  'Publikum verbindlich vorhanden, Zielgröße: '+cfg.crowd+' Zuschauer, soweit in einem einzelnen dokumentarischen 9:16-Foto räumlich plausibel. '+audience+'\n'+
  'Deutlich sichtbare, individuelle Reaktionen auf die PROVOKANTE BOTSCHAFT UND DEN LÄUFER: empörte offene Handgesten, fassungslose Blicke, Buhrufe, Daumen nach unten, emotionale Diskussionen. PROTEST-RICHTUNGS-LOCK: Die Gegner buhen ausdrücklich DEN LÄUFER aus, schauen ihn dabei an und richten ihre ablehnenden Handzeichen, offenen Handflächen und Daumen nach unten sichtbar IN SEINE RICHTUNG. Einige protestieren zusätzlich gegen den Plakattext oder zeigen auf die Beschriftung. Die Gegner lehnen die Botschaft und ihre Hauptfigur ab; Unterstützer zeigen Zustimmung gegenüber dem Läufer. Keine gleichförmige synchronisierte Mimik, keine Gewalt oder körperlichen Angriffe.\n'+
  'Gestenintensität: '+cfg.gesture+'. Keine Gewalt, keine körperlichen Angriffe oder unmittelbare Bedrohung. Unterschiedliche Altersgruppen, gerade auch ältere Menschen, reagieren glaubwürdig; niemand wird stereotyp als Gegner festgelegt. Gesicht, Schuhe und Plakattext bleiben klar erkennbar.';
 const sign='07 · BLACK SIGN & MONUMENTALES ANZEIGEMITTEL — AUTONOME REGIE\n'+
  'Die Botschaft ist überwiegend VERTIKAL gesetzt. Wähle selbst die stärkste überdimensionierte, hochkant-taugliche Plakatarchitektur zum Ort: mehrgeschossiger Fassadenhänger, frei abgehängtes XXL-Plakat mit sichtbaren Stahlseilen, monumentaler Hallenhänger, Gerüst-Megabanner oder vergleichbar außergewöhnliche Konstruktion. KEINE 08/15-Werbeständer, kleinen City-Lights oder gewöhnlichen Tafeln.\n'+
  'Echte tragfähige Wandanker, Stahltraversen und Sicherungen, keine schwebenden Konstruktionen. Textgröße und Zeilenanordnung so, dass der exakt vorgegebene Text vollständig lesbar bleibt. Kein Wechsel von Wortfarben oder Original-Zeilenumbrüchen.\n'+
  'TYPOGRAFIE-CENTER-LOCK — ABSOLUT VERBINDLICH: Alle sichtbaren Plakatzeilen werden EINZELN HORIZONTAL MITTIG auf derselben vertikalen Mittelachse der schwarzen Anzeigenfläche ausgerichtet (text-align: center); jede Zeile hat links und rechts denselben freien Abstand. Auch kurze Zeilen wie AM ENDE oder LIKEN! müssen exakt zentriert sein. NICHT linksbündig, nicht optisch nach links versetzt, nicht als linksbündiger Fließtext. Der gesamte zusammenhängende Textblock wird zusätzlich geometrisch HORIZONTAL und VERTIKAL in der nutzbaren schwarzen Textfläche zentriert, wobei die Original-Leerzeilen als Abstände erhalten bleiben. Mindestens 5 Prozent freier schwarzer Sicherheitsrand zu allen Plakaträndern, keine abgeschnittenen Buchstaben; Schriftgrößen je Zeile dürfen für eine starke vertikale Gesamtkomposition variieren, aber Wortlaut, Wortreihenfolge, Original-Zeilenumbrüche und Hex-Wortfarben bleiben 1:1 unverändert. Der CENTER-LOCK gilt für das Plakat selbst, nicht für die Position des Plakats oder die Hauptfigur im Gesamtfoto.';
 function swap(part,next,start){const pattern=new RegExp(start+'[\\s\\S]*?(?=\\n\\d{2} · |\\nVERBINDLICHER ABSCHLUSS:)');if(!pattern.test(part))throw Error('Promptabschnitt '+start+' fehlt');return part.replace(pattern,next+'\n')}
 raw=raw.replace(/(01 · GESICHT & IDENTITÄT[\s\S]*?)(?=\n02 · SCHUHE)/,function(all,section){
  return section+'\n- PROPORTIONS-LOCK: Körpergröße ausschließlich für diesen Bildtest verbindlich 168 cm; dies ist ausdrücklich NICHT die reale Körpergröße. Kompakte, natürlich proportionierte Statur ohne künstlich verlängerte Beine, ohne gestreckten Oberkörper und ohne übergroße oder schlaksige Silhouette. Keine körperstreckende Untersicht; Kamera bevorzugt auf Brust- bis Augenhöhe. Gesicht und Anatomie dürfen nicht gestaucht oder unnatürlich verkürzt werden.';
 });
 raw=swap(raw,cameras,'03 · KAMERA');
 raw=swap(raw,scene,'05 · ORT');
 raw=swap(raw,people,'06 · ZUSCHAUER');
 raw=swap(raw,sign,'07 · BLACK SIGN');
 // Keep the original identity, outfit, shoe reference, exact text and original word-color map.
 // The auto instruction overrides stale final claims about earlier manual camera authority.
 raw=raw.replace(/VERBINDLICHER ABSCHLUSS:[^\n]*/,'VERBINDLICHER ABSCHLUSS: PERSON PHOTO und SHOE PHOTO bleiben verbindlich. Der exakte Original-Plakattext samt Wortfarbkarte bleibt unverändert. Ort und Anzeigemittel werden durch AUTO DIRECTOR bestimmt. Kamera: '+(chosenCamera?'MANUELLER KAMERA-LOCK '+chosenCamera.lens+' mm und '+chosenCamera.distance+' m IST VERBINDLICH.':'AUTO DIRECTOR wählt selbstständig.')+' Pose: '+(lockedPose?'MANUELLE POSE IST VERBINDLICH, AUTO DIRECTOR DARF SIE NICHT ÜBERSCHREIBEN.':'AUTO DIRECTOR entscheidet frei.')+' Alte manuelle Szenenfilter gelten hier nicht.');
 if(String(cfg.colors||'').trim())raw+='\n\nEXAKTE ZUSÄTZLICHE WORTFARBVORGABE (höchste Priorität bei identischen Wörtern):\n'+String(cfg.colors).trim();
 raw+='\n\nAUTO DIRECTOR · KREATIVE ENTSCHEIDUNG: Wähle intern EINE harmonische Gesamtszene statt voneinander unabhängiger Einzelvorgaben. '+(lockedPose?'BEACHTE DEN MANUELLEN POSE-LOCK; alle übrigen Szenenentscheidungen bleiben frei.':'WÄHLE DIE POSE SELBSTSTÄNDIG.')+' Inszeniere keinen identischen Aufbau der vorherigen Aufnahme. Variation '+cfg.variation+' als kreativer Impuls für einen neuen Blickwinkel und eine andere Komposition; nicht als sichtbaren Bildtext ausgeben.\nOUTPUT: Genau EIN natives 9:16 ultra-fotorealistisches Dokumentarfoto; keine Collage, kein CGI, keine Rückfragen.';
 return raw;
}
function view(){
 const c=settings(),pct=Math.min(100,Math.max(0,Number(c.against)||0)),yes=100-pct,other=0;
 const style='width:100%;box-sizing:border-box;min-height:45px;border:1px solid #607287;border-radius:8px;background:#242e3a;color:#fff;padding:10px;font-size:15px';
 return '<div style="max-width:800px;margin:0 auto;padding:2px 3px 35px">'+
 '<section class="panel" style="border:1px solid #f36c3c;border-radius:13px;padding:16px">'+
 '<h2 style="margin:0 0 8px">AUTO DIRECTOR · KREATIVE FREIHEIT</h2>'+
 '<p style="color:#bdc8d4;font-size:14px">Die KI bestimmt Ort, monumentales Hochkantplakat und Position selbst; Pose und Kamera kannst du automatisch lassen oder verbindlich festlegen. Fest: Gesicht, Schuhe, Outfit, exakter Plakattext, 168 cm nur als Bildtest-Proportion und überlegenes Schmunzeln. Die Gegner richten Buhrufe und Handzeichen sichtbar gegen den Läufer.</p>'+
 '<label for="auto525PoseMode" style="display:block;font-weight:bold;margin:14px 0 6px">POSE · AUTOMATISCH ODER FESTLEGEN</label>'+
 '<select id="auto525PoseMode" style="'+style+'">'+
 '<option value="auto" '+(c.poseMode==='auto'?'selected':'')+'>KI entscheidet selbst</option>'+
 '<option value="hocker" '+(c.poseMode==='hocker'?'selected':'')+'>Anatolischer Holzhocker 1970 · chillig sitzen</option>'+
 '<option value="custom" '+(c.poseMode==='custom'?'selected':'')+'>Eigene Pose eingeben</option></select>'+
 '<div id="auto525PoseCustomWrap" style="display:'+(c.poseMode==='custom'?'block':'none')+';margin:10px 0">'+
 '<label for="auto525PoseText" style="display:block;font-size:13px;color:#bdc8d4;margin:5px 0">DEINE VERBINDLICHE POSE · TEXT WIRD AUTOMATISCH GESPEICHERT</label>'+
 '<textarea id="auto525PoseText" rows="4" style="'+style+';resize:vertical" placeholder="Beschreibe die gewünschte Pose genau ...">'+esc(c.poseText||'')+'</textarea></div>'+
 '<p style="font-size:12px;color:#bdc8d4;margin:7px 0 4px">Nur die gewählte Pose wird festgelegt. Ort, Kamera, Anzeigemittel und Publikum bleiben im AUTO DIRECTOR.</p>'+
 '<label for="auto526CameraMode" style="display:block;font-weight:bold;margin:14px 0 6px">KAMERA · AUTOMATISCH ODER FESTLEGEN</label>'+
 '<select id="auto526CameraMode" style="'+style+'">'+
 '<option value="auto" '+(c.cameraMode==='auto'?'selected':'')+'>KI entscheidet Brennweite und Entfernung</option>'+
 '<option value="preset" '+(c.cameraMode==='preset'?'selected':'')+'>Getestetes Preset · 24 mm / 12 m</option>'+
 '<option value="manual" '+(c.cameraMode==='manual'?'selected':'')+'>Manuelle Brennweite und Entfernung</option></select>'+
 '<div id="auto526CameraManual" style="display:'+(c.cameraMode==='manual'?'block':'none')+';margin:10px 0">'+
 '<label for="auto526Lens" style="display:block;font-size:13px;color:#bdc8d4;margin:5px 0">BRENNWEITE (mm · 16–200)</label>'+
 '<input id="auto526Lens" type="number" min="16" max="200" step="1" inputmode="numeric" value="'+esc(c.cameraLens)+'" style="'+style+'">'+
 '<label for="auto526Distance" style="display:block;font-size:13px;color:#bdc8d4;margin:9px 0 5px">ENTFERNUNG (m · 1–200)</label>'+
 '<input id="auto526Distance" type="number" min="1" max="200" step="1" inputmode="numeric" value="'+esc(c.cameraDistance)+'" style="'+style+'"></div>'+
 '<p style="font-size:12px;color:#bdc8d4;margin:7px 0 4px">Bei festen Kamerawerten wählt die KI weiterhin Ort, XXL-Anzeigemittel und Bildkomposition. 24 mm / 12 m ist eine Bildgenerierungs-Vorgabe, keine garantierte optische Messung.</p>'+
 '<label for="auto520Crowd" style="display:block;font-weight:bold;margin:14px 0 6px">PUBLIKUMSGRÖSSE</label>'+
 '<select id="auto520Crowd" style="'+style+'">'+['50–100','100–250','250–500','500–800','800–1500'].map(x=>'<option '+(x===c.crowd?'selected':'')+'>'+x+'</option>').join('')+'</select>'+
 '<label for="auto520Control" style="display:block;font-weight:bold;margin:14px 0 6px">MEINUNGSVERTEILUNG</label>'+
 '<select id="auto520Control" style="'+style+'"><option value="auto" '+(c.control==='auto'?'selected':'')+'>Automatisch · KI entscheidet</option><option value="manual" '+(c.control==='manual'?'selected':'')+'>Anteile selbst festlegen</option></select>'+
 '<div id="auto520Ratios" style="display:'+(c.control==='auto'?'none':'block')+';padding:12px 4px">'+
 '<label for="auto520Against" style="display:flex;justify-content:space-between;margin-bottom:8px"><b>GEGEN MICH</b><b id="auto520AgainstText">'+pct+' %</b></label>'+
 '<input id="auto520Against" type="range" min="0" max="100" step="5" value="'+pct+'" style="width:100%;accent-color:#f16d42">'+
 '<label for="auto520Support" style="display:flex;justify-content:space-between;margin:12px 0 8px"><b>FÜR MICH</b><b id="auto520SupportText">'+yes+' %</b></label>'+
 '<input id="auto520Support" type="range" min="0" max="100" step="5" value="'+yes+'" style="width:100%;accent-color:#52bf8b">'+
 '<p style="font-size:14px;color:#c9d3df;margin:10px 0 0">SUMME: <b id="auto520Total">100 %</b> · NEUTRAL: <b id="auto520Neutral">'+other+' %</b> (bei manueller Verteilung)</p>'+
 '</div>'+
 '<label for="auto520Gesture" style="display:block;font-weight:bold;margin:14px 0 6px">PROTESTGESTEN</label>'+
 '<select id="auto520Gesture" style="'+style+'">'+['Deutlich & glaubwürdig','Sehr energisch · starke Empörung','Gemischt · spontane Alltagsreaktionen'].map(x=>'<option '+(x===c.gesture?'selected':'')+'>'+x+'</option>').join('')+'</select>'+
 '<p style="margin:14px 0 6px;color:#bdc8d4;font-size:13px">PLAKAT: Originaltext und Wortfarben automatisch aus dem Reiter Plakat. Optional zusätzliche eigene Farbcode-Vorgaben einfügen.</p>'+
 '<textarea id="auto520Colors" rows="3" style="'+style+';resize:vertical" placeholder="Optional: zusätzliche Wortfarbcodes 1:1 einfügen">'+esc(c.colors)+'</textarea>'+
 '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:15px">'+
 '<button class="btn" type="button" id="auto520New" style="flex:1">↻ NEUE KREATIVE VARIATION</button>'+
 '<button class="btn" type="button" id="auto520Copy" style="flex:1;background:#18704e">PROMPT KOPIEREN</button></div>'+
 '<p id="auto520Status" role="status" style="font-size:13px;color:#91ddbd;margin:10px 0 0">Variation '+c.variation+' · gespeichert</p>'+
 '</section>'+
 '<section class="panel"><h3>TRANSFORMATIONSAUFTRAG · VORSCHAU</h3><pre id="auto520Prompt" style="white-space:pre-wrap;overflow-wrap:anywhere;max-height:520px;overflow:auto;font-size:12px;background:#111923;padding:14px;border-radius:8px;border:1px solid #354454"></pre></section>'+
 '</div>';
}
function mount(force){
 if(typeof state==='undefined'||state.world!=='sign'||(state.tab!==TAB&&!force))return false;
 const separate=document.getElementById('autoDirectorHost522');
 const root=separate||document.getElementById('view');
 if(!root)return false;
 if(separate){separate.hidden=false;separate.style.display='block';}
 root.innerHTML=(separate?'<button type="button" id="auto520Close" style="padding:10px 13px;background:#344253;color:white;border:1px solid #8191a4;border-radius:8px;margin:8px 0">✕ AUTO DIRECTOR SCHLIESSEN</button>':'')+view();
 const q=id=>document.getElementById(id);
 const refresh=()=>{try{q('auto520Prompt').textContent=create();q('auto520Status').textContent='Variation '+settings().variation+' · gespeichert'}catch(e){q('auto520Prompt').textContent='⚠ '+e.message;q('auto520Status').textContent='⚠ '+e.message}};
 const updateRatios=(changed)=>{
  const against=q('auto520Against'),support=q('auto520Support');
  const a=changed==='support'?100-Number(support.value):Number(against.value);
  const safe=Math.max(0,Math.min(100,Math.round(a/5)*5));
  against.value=String(safe);support.value=String(100-safe);
  against.max='100';support.max='100';
  q('auto520AgainstText').textContent=safe+' %';
  q('auto520SupportText').textContent=(100-safe)+' %';
  q('auto520Neutral').textContent='0 %';q('auto520Total').textContent='100 %';
  const c=settings();try{localStorage.setItem(KEY,JSON.stringify({...c,against:safe,support:100-safe}))}catch(e){}
  refresh();
 };
 q('auto525PoseMode').onchange=e=>{
  set('poseMode',e.target.value);
  q('auto525PoseCustomWrap').style.display=e.target.value==='custom'?'block':'none';
  refresh();
 };
 q('auto525PoseText').oninput=e=>{set('poseText',e.target.value);refresh()};
 q('auto526CameraMode').onchange=e=>{
  set('cameraMode',e.target.value);
  q('auto526CameraManual').style.display=e.target.value==='manual'?'block':'none';
  refresh();
 };
 q('auto526Lens').oninput=e=>{set('cameraLens',e.target.value);refresh()};
 q('auto526Distance').oninput=e=>{set('cameraDistance',e.target.value);refresh()};
 q('auto520Crowd').onchange=e=>{set('crowd',e.target.value);refresh()};
 q('auto520Control').onchange=e=>{set('control',e.target.value);q('auto520Ratios').style.display=e.target.value==='auto'?'none':'block';refresh()};
 q('auto520Against').oninput=()=>updateRatios('against');q('auto520Support').oninput=()=>updateRatios('support');
 q('auto520Gesture').onchange=e=>{set('gesture',e.target.value);refresh()};
 q('auto520Colors').oninput=e=>{set('colors',e.target.value);refresh()};
 q('auto520New').onclick=()=>{set('variation',settings().variation+1);refresh()};
 q('auto520Copy').onclick=async()=>{
  try{const text=create();if(navigator.clipboard?.writeText)await navigator.clipboard.writeText(text);else{const temp=document.createElement('textarea');temp.value=text;document.body.appendChild(temp);temp.select();if(!document.execCommand('copy'))throw Error('Zwischenablage nicht verfügbar');temp.remove()}q('auto520Status').textContent='✓ Autonomer Prompt mit Plakat und Farbcodes kopiert';}
  catch(e){q('auto520Status').textContent='⚠ '+e.message}
 };
 if(q('auto520Close'))q('auto520Close').onclick=()=>{root.hidden=true;root.style.display='none';root.innerHTML=''};
 updateRatios('against');
 return true;
}
function open(){
 if(typeof state!=='undefined'){state.world='sign';state.tab=TAB;try{if(typeof save==='function')save()}catch(e){}}
 document.querySelectorAll('.world').forEach(el=>el.classList.toggle('active',el.dataset.world==='sign'));
 const ok=mount(true);
 if(ok){const el=document.getElementById('autoDirectorHost522')||document.getElementById('view');el.scrollIntoView?.({behavior:'instant',block:'start'})}
 return ok;
}
if(typeof tabs!=='function'||typeof render!=='function'){
 window.stravaAutoDirector520={version:(document.querySelector('meta[name="strava-release"]')?.content||'V5.3.0'),prompt:create,settings,mount,open,tab:TAB};
 return;
}
const prevTabs=tabs;tabs=function(){const x=prevTabs();if(state.world!=='sign'||x.includes(TAB))return x;return [TAB,...x]};
const prevRender=render;render=function(){prevRender.apply(this,arguments);mount()};
window.stravaAutoDirector520={version:(document.querySelector('meta[name="strava-release"]')?.content||'V5.3.0'),prompt:create,settings,mount,open,tab:TAB};
try{if(typeof state!=='undefined'&&state.world==='sign')render()}catch(e){console.warn('AUTO DIRECTOR Navigation konnte nicht aktualisiert werden',e)}
})();