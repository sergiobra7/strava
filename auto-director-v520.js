/* BLACK SIGN · AUTO DIRECTOR V5.2.0 · autonomous documentary scene with audience controls */
(function(){
'use strict';
if(window.stravaAutoDirector520)return;
const TAB='AUTO DIRECTOR',KEY='strava-auto-director-520';
const DEFAULT={crowd:'500–800',control:'manual',against:75,support:10,gesture:'Deutlich & glaubwürdig',variation:1,colors:''};
function settings(){let x={};try{x=JSON.parse(localStorage.getItem(KEY)||'{}')||{}}catch(e){}return {...DEFAULT,...x}}
function set(k,v){const x=settings();x[k]=v;localStorage.setItem(KEY,JSON.stringify(x));return x}
function esc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]))}
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
 const yes=cfg.control==='auto'?null:Math.max(0,Math.min(100-pct,Number(cfg.support)||0));
 const neutral=pct==null?null:100-pct-yes;
 const audience=(pct==null?
   'Verhältnis nach provokativem Inhalt dramaturgisch eigenständig wählen: Mehrheitswiderspruch ist möglich, aber nicht immer nötig. Empörte, zustimmende und neutrale Zuschauer realistisch mischen.':
   'Verbindliche Verteilung: ungefähr '+pct+' % Gegner, '+yes+' % Unterstützer, '+neutral+' % unentschiedene oder beobachtende Personen. Diese Zahlen sind Anteile der sichtbar dargestellten Menge, nicht exakte einzeln zählbare Personen.');
 const cameras='03 · KAMERA – AUTONOME REGIE\n'+
  'Wähle selbstständig nur EINE physikalisch plausible Brennweite, EINEN Kameraabstand und EINE Kamerahöhe, passend zu einer monumentalen vertikalen Botschaft, dem erkennbaren Läufer und der Menge. Native 9:16. Keine widersprüchlichen Kamerapresets, kein künstlich gestreckter Körper.';
 const scene='05 · ORT, SZENE & HAUPTFIGUR — AUTONOME REGIE\n'+
  'Interpretation zuerst: Lies den exakten Plakattext und leite daraus den stärksten glaubwürdigen, öffentlichen Ort ab. Kein Wohnraum, kein privater Innenbereich. Wähle architektonisch passende öffentliche Treppen, Plätze, Bahnhofsareale, Markthallen oder Fußgängerbereiche nur wenn sie zum Text passen. Variiere Orte zwischen neuen Bildern.\n'+
  'Entscheide selbst über die wirkungsvollste Pose aus anatolischen Alltagsposen und authentischen Läuferposen, über Position vor/in/hinter der Menschenmenge und über den Blick. Sichere reale Auflagen bei Sitz-, Stufen- und Anlehnposen. Keine Zeigefingergeste des Läufers.\n'+
  'VERBINDLICH: Der Läufer zeigt ein natürliches, leicht asymmetrisches, überlegenes Schmunzeln. Kein übertriebenes Grinsen, keine künstlichen Zähne. Er bleibt selbstbewusst und entspannt gegen den Widerstand vieler Zuschauer, ohne drohende Gestik.';
 const people='06 · ZUSCHAUER & NEBENFIGUREN — AUTONOME PUBLIKUMSREGIE\n'+
  'Publikum verbindlich vorhanden, Zielgröße: '+cfg.crowd+' Zuschauer, soweit in einem einzelnen dokumentarischen 9:16-Foto räumlich plausibel. '+audience+'\n'+
  'Deutlich sichtbare, individuelle Reaktionen auf die PROVOKANTE BOTSCHAFT UND DEN LÄUFER: empörte offene Handgesten, fassungslose Blicke, Buhrufe, Daumen nach unten, emotionale Diskussionen. Keine gleichförmige synchronisierte Mimik. Manche schauen zur Hauptfigur und protestieren direkt gegen ihn; andere zum Plakat; Zustimmung und stille Beobachter sind ebenfalls möglich.\n'+
  'Gestenintensität: '+cfg.gesture+'. Keine Gewalt, keine körperlichen Angriffe oder unmittelbare Bedrohung. Unterschiedliche Altersgruppen, gerade auch ältere Menschen, reagieren glaubwürdig; niemand wird stereotyp als Gegner festgelegt. Gesicht, Schuhe und Plakattext bleiben klar erkennbar.';
 const sign='07 · BLACK SIGN & MONUMENTALES ANZEIGEMITTEL — AUTONOME REGIE\n'+
  'Die Botschaft ist überwiegend VERTIKAL gesetzt. Wähle selbst die stärkste überdimensionierte, hochkant-taugliche Plakatarchitektur zum Ort: mehrgeschossiger Fassadenhänger, frei abgehängtes XXL-Plakat mit sichtbaren Stahlseilen, monumentaler Hallenhänger, Gerüst-Megabanner oder vergleichbar außergewöhnliche Konstruktion. KEINE 08/15-Werbeständer, kleinen City-Lights oder gewöhnlichen Tafeln.\n'+
  'Echte tragfähige Wandanker, Stahltraversen und Sicherungen, keine schwebenden Konstruktionen. Textgröße und Zeilenanordnung so, dass der exakt vorgegebene Text vollständig lesbar bleibt. Kein Wechsel von Wortfarben oder Original-Zeilenumbrüchen.\n'+
  'TYPOGRAFIE-CENTER-LOCK — ABSOLUT VERBINDLICH: Alle sichtbaren Plakatzeilen werden EINZELN HORIZONTAL MITTIG auf derselben vertikalen Mittelachse der schwarzen Anzeigenfläche ausgerichtet (text-align: center); jede Zeile hat links und rechts denselben freien Abstand. Auch kurze Zeilen wie AM ENDE oder LIKEN! müssen exakt zentriert sein. NICHT linksbündig, nicht optisch nach links versetzt, nicht als linksbündiger Fließtext. Der gesamte zusammenhängende Textblock wird zusätzlich geometrisch HORIZONTAL und VERTIKAL in der nutzbaren schwarzen Textfläche zentriert, wobei die Original-Leerzeilen als Abstände erhalten bleiben. Mindestens 5 Prozent freier schwarzer Sicherheitsrand zu allen Plakaträndern, keine abgeschnittenen Buchstaben; Schriftgrößen je Zeile dürfen für eine starke vertikale Gesamtkomposition variieren, aber Wortlaut, Wortreihenfolge, Original-Zeilenumbrüche und Hex-Wortfarben bleiben 1:1 unverändert. Der CENTER-LOCK gilt für das Plakat selbst, nicht für die Position des Plakats oder die Hauptfigur im Gesamtfoto.';
 function swap(part,next,start){const pattern=new RegExp(start+'[\\s\\S]*?(?=\\n\\d{2} · |\\nVERBINDLICHER ABSCHLUSS:)');if(!pattern.test(part))throw Error('Promptabschnitt '+start+' fehlt');return part.replace(pattern,next+'\n')}
 raw=swap(raw,cameras,'03 · KAMERA');
 raw=swap(raw,scene,'05 · ORT');
 raw=swap(raw,people,'06 · ZUSCHAUER');
 raw=swap(raw,sign,'07 · BLACK SIGN');
 // Keep the original identity, outfit, shoe reference, exact text and original word-color map.
 // The auto instruction overrides stale final claims about earlier manual camera authority.
 raw=raw.replace(/VERBINDLICHER ABSCHLUSS:[^\n]*/,'VERBINDLICHER ABSCHLUSS: PERSON PHOTO und SHOE PHOTO bleiben verbindlich. Der exakte Original-Plakattext samt Wortfarbkarte bleibt unverändert. Kamera, Ort, Pose und Anzeigemittel werden ausschließlich durch AUTO DIRECTOR bestimmt; alte manuelle Szenenfilter gelten hier nicht.');
 if(String(cfg.colors||'').trim())raw+='\n\nEXAKTE ZUSÄTZLICHE WORTFARBVORGABE (höchste Priorität bei identischen Wörtern):\n'+String(cfg.colors).trim();
 raw+='\n\nAUTO DIRECTOR · KREATIVE ENTSCHEIDUNG: Wähle intern EINE harmonische Gesamtszene statt voneinander unabhängiger Einzelvorgaben. Inszeniere keinen identischen Aufbau der vorherigen Aufnahme. Variation '+cfg.variation+' als kreativer Impuls für einen neuen Blickwinkel und eine andere Komposition; nicht als sichtbaren Bildtext ausgeben.\nOUTPUT: Genau EIN natives 9:16 ultra-fotorealistisches Dokumentarfoto; keine Collage, kein CGI, keine Rückfragen.';
 return raw;
}
function view(){
 const c=settings(),pct=Math.min(100,Math.max(0,Number(c.against)||0)),yes=Math.min(100-pct,Math.max(0,Number(c.support)||0)),other=100-pct-yes;
 const style='width:100%;box-sizing:border-box;min-height:45px;border:1px solid #607287;border-radius:8px;background:#242e3a;color:#fff;padding:10px;font-size:15px';
 return '<div style="max-width:800px;margin:0 auto;padding:2px 3px 35px">'+
 '<section class="panel" style="border:1px solid #f36c3c;border-radius:13px;padding:16px">'+
 '<h2 style="margin:0 0 8px">AUTO DIRECTOR · KREATIVE FREIHEIT</h2>'+
 '<p style="color:#bdc8d4;font-size:14px">Die KI bestimmt Ort, monumentales Hochkantplakat, Pose, Position und Kamera selbst. Fest: Gesicht, Schuhe, Outfit, exakter Plakattext und überlegenes Schmunzeln.</p>'+
 '<label for="auto520Crowd" style="display:block;font-weight:bold;margin:14px 0 6px">PUBLIKUMSGRÖSSE</label>'+
 '<select id="auto520Crowd" style="'+style+'">'+['50–100','100–250','250–500','500–800','800–1500'].map(x=>'<option '+(x===c.crowd?'selected':'')+'>'+x+'</option>').join('')+'</select>'+
 '<label for="auto520Control" style="display:block;font-weight:bold;margin:14px 0 6px">MEINUNGSVERTEILUNG</label>'+
 '<select id="auto520Control" style="'+style+'"><option value="auto" '+(c.control==='auto'?'selected':'')+'>Automatisch · KI entscheidet</option><option value="manual" '+(c.control==='manual'?'selected':'')+'>Anteile selbst festlegen</option></select>'+
 '<div id="auto520Ratios" style="display:'+(c.control==='auto'?'none':'block')+';padding:12px 4px">'+
 '<label for="auto520Against" style="display:flex;justify-content:space-between;margin-bottom:8px"><b>GEGEN MICH</b><b id="auto520AgainstText">'+pct+' %</b></label>'+
 '<input id="auto520Against" type="range" min="0" max="100" step="5" value="'+pct+'" style="width:100%;accent-color:#f16d42">'+
 '<label for="auto520Support" style="display:flex;justify-content:space-between;margin:12px 0 8px"><b>FÜR MICH</b><b id="auto520SupportText">'+yes+' %</b></label>'+
 '<input id="auto520Support" type="range" min="0" max="'+(100-pct)+'" step="5" value="'+yes+'" style="width:100%;accent-color:#52bf8b">'+
 '<p style="font-size:14px;color:#c9d3df;margin:10px 0 0">NEUTRAL / UNENTSCHIEDEN: <b id="auto520Neutral">'+other+' %</b></p>'+
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
 const updateRatios=()=>{
  const a=Number(q('auto520Against').value),b=q('auto520Support');
  b.max=String(100-a);b.value=String(Math.min(Number(b.value),100-a));
  const y=Number(b.value);q('auto520AgainstText').textContent=a+' %';q('auto520SupportText').textContent=y+' %';q('auto520Neutral').textContent=100-a-y+' %';
  set('against',a);set('support',y);refresh();
 };
 q('auto520Crowd').onchange=e=>{set('crowd',e.target.value);refresh()};
 q('auto520Control').onchange=e=>{set('control',e.target.value);q('auto520Ratios').style.display=e.target.value==='auto'?'none':'block';refresh()};
 q('auto520Against').oninput=updateRatios;q('auto520Support').oninput=updateRatios;
 q('auto520Gesture').onchange=e=>{set('gesture',e.target.value);refresh()};
 q('auto520Colors').oninput=e=>{set('colors',e.target.value);refresh()};
 q('auto520New').onclick=()=>{set('variation',settings().variation+1);refresh()};
 q('auto520Copy').onclick=async()=>{
  try{const text=create();if(navigator.clipboard?.writeText)await navigator.clipboard.writeText(text);else{const temp=document.createElement('textarea');temp.value=text;document.body.appendChild(temp);temp.select();if(!document.execCommand('copy'))throw Error('Zwischenablage nicht verfügbar');temp.remove()}q('auto520Status').textContent='✓ Autonomer Prompt mit Plakat und Farbcodes kopiert';}
  catch(e){q('auto520Status').textContent='⚠ '+e.message}
 };
 if(q('auto520Close'))q('auto520Close').onclick=()=>{root.hidden=true;root.style.display='none';root.innerHTML=''};
 refresh();
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
 window.stravaAutoDirector520={version:'V5.2.3',prompt:create,settings,mount,open,tab:TAB};
 return;
}
const prevTabs=tabs;tabs=function(){const x=prevTabs();if(state.world!=='sign'||x.includes(TAB))return x;return [TAB,...x]};
const prevRender=render;render=function(){prevRender.apply(this,arguments);mount()};
window.stravaAutoDirector520={version:'V5.2.2',prompt:create,settings,mount,open,tab:TAB};
try{if(typeof state!=='undefined'&&state.world==='sign')render()}catch(e){console.warn('AUTO DIRECTOR Navigation konnte nicht aktualisiert werden',e)}
})();