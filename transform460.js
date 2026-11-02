/* STRAVA RUN TRANSFORM V4.6.0 — independent German photographic prompt engine.
   Uses existing poster/outfit data read-only. Never calls BLACK SIGN buildPrompt,
   never changes Premium, ASF or STRAVA WALL state. */
(function(){
'use strict';
if(typeof tabs!=='function'||typeof render!=='function')return;
const KEY='strava-transform-v460';
const tabName='TRANSFORM';
const presets=[
 ['Monumentaler Treppenbalkon','Auf einem eindrucksvollen öffentlichen Steinbalkon hoch über einer breiten Freitreppe. Das schwarze XXL-Banner ist fest an der historischen Fassade über dem Podest verankert.','Ein Fuß steht auf einer niedrigen Steinstufe, ein Unterarm ruht auf dem angewinkelten Knie; er lehnt sich selbstbewusst nach vorn und grinst herausfordernd.'],
 ['Bahnhofsvorplatz','Auf der breiten öffentlichen Steintreppe vor einem monumentalen Bahnhofsgebäude. Das schwarze XXL-Banner hängt sicher an der Fassade hinter ihm.','Er steht mit verschränkten Armen und leicht provokantem Grinsen seitlich vor dem Banner.'],
 ['Markthalle','In der großen öffentlichen Markthalle mit hohem Glasdach und breiten Durchgängen. Das schwarze XXL-Banner hängt an einem sichtbaren stabilen Träger über dem Durchgang.','Er steht lässig und selbstbewusst auf einer breiten Treppenstufe, eine Hand ruht auf dem Geländer.'],
 ['Einkaufsstraße','Mitten in einer weitläufigen belebten Fußgängerzone mit breiten Ladenfassaden und öffentlichen Sitzstufen. Das XXL-Banner ist sichtbar und sicher über dem Platz aufgehängt.','Er lehnt lässig neben einem Einkaufswagen an einem niedrigen öffentlichen Steinpodest.'],
 ['Bäckereivorplatz','Vor einer gut besuchten generischen Bäckerei an einer breiten öffentlichen Einkaufsstraße. Das schwarze XXL-Banner hängt sichtbar befestigt an der Fassade.','Er lehnt locker an einem Einkaufswagen und grinst direkt in die Kamera.'],
 ['Hochgelegene Stadtterrasse','Auf einer großen öffentlichen Aussichtsterrasse über einem dicht besuchten Stadtplatz. Das schwarze XXL-Banner ist mit sichtbaren Halterungen an einer massiven Wand befestigt.','Er steht aufrecht am Geländer, die Unterarme entspannt darauf abgelegt, das Gesicht frei zur Kamera.'],
 ['Bahnhofspassage','In einer riesigen öffentlichen Bahnhofspassage mit breiten Treppen, hohen Säulen und einem offenen Vorplatz. Das schwarze Banner hängt an einem echten, fest montierten Querträger.','Er sitzt rückwärts auf einem stabilen Stuhl, die Unterarme leicht versetzt auf der Lehne, beide Hände natürlich sichtbar.'],
 ['Altstadtplatz','Auf einem weitläufigen historischen Altstadtplatz mit monumentaler Freitreppe. Das schwarze XXL-Banner ist fest an einer großen Steinfront montiert.','Er steht breit und stabil auf dem obersten Absatz, die Arme verschränkt und mit frechem Grinsen.']
];
const poses=[
 ['Aus Szene übernehmen',''],
 ['Arme verschränkt','Er steht mit natürlich verschränkten Armen, selbstbewusstem Stand und frechem Blick direkt zur Kamera.'],
 ['Überkopf-Plakat','Er hält eine eigenständige, handhabbare schwarze Protesttafel mit beiden Händen über dem Kopf; beide Arme sind anatomisch korrekt, die Hände greifen sichtbar den tragfähigen Rahmen. Ein zusätzliches Fassadenbanner wird nicht erzeugt.'],
 ['Fuß auf Stufe','Ein Fuß steht auf einer niedrigen öffentlichen Steinstufe. Er stützt den Unterarm locker auf das angewinkelte Knie und schaut frech direkt in die Kamera.'],
 ['An Geländer lehnen','Er lehnt sich mit beiden Unterarmen locker an ein festes öffentliches Geländer. Beide Füße stehen sicher und natürlich.'],
 ['Anatolisch sitzend','Er sitzt mit natürlich angewinkelten Beinen auf einer breiten öffentlichen Steinstufe, ein Unterarm ruht auf einem Knie. Das Gesicht ist frei sichtbar.'],
 ['Rückwärts auf Stuhl','Er sitzt rückwärts auf einem stabilen vorhandenen Stuhl, die Unterarme leicht versetzt auf der Lehne. Hände und Handgelenke sind sichtbar.']
];
const crowds=[
 ['Empört und aufgebracht','Hunderte aufgebrachte Menschen richten ihre Blicke überwiegend direkt auf die provokanten Aussagen des Plakats. Viele sind empört, wütend oder fassungslos, diskutieren hitzig, schütteln den Kopf oder gestikulieren mit offenen Händen in Richtung der roten Schlüsselwörter. Nicht alle machen dasselbe; ihre Reaktionen bleiben verschieden und natürlich.'],
 ['Wütend und diskutierend','Hunderte verärgerte Zuschauer lesen das Plakat. Einige diskutieren heftig, andere schimpfen sichtbar oder weisen mit offenen Händen auf die provokanten Aussagen. Viele sind empört, einzelne bleiben verblüfft oder skeptisch.'],
 ['Schockiert und verwirrt','Die Passanten sind sichtbar überrascht und irritiert. Die meisten schauen direkt auf den Bannertext; einzelne diskutieren, andere bleiben fassungslos stehen und reagieren mit ungläubigen Gesichtsausdrücken.'],
 ['Gemischt, aber aufmerksam','Eine große lebhafte Menschenmenge betrachtet das Plakat. Einige sind empört, andere lachen ungläubig oder diskutieren lautstark. Die Aufmerksamkeit richtet sich überwiegend auf die geschriebene Botschaft.']
];
function safe(s){return String(s??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));}
function load(){try{const x=JSON.parse(localStorage.getItem(KEY)||'{}');return {scene:x.scene||presets[0][0],pose:x.pose||poses[0][0],crowd:x.crowd||crowds[0][0],extra:x.extra||'',saved:Array.isArray(x.saved)?x.saved:[]};}catch(e){return {scene:presets[0][0],pose:poses[0][0],crowd:crowds[0][0],extra:'',saved:[]};}}
let settings=load();
function store(){localStorage.setItem(KEY,JSON.stringify(settings));}
function poster(){return (state.sign&&state.sign.signText)||'';}
function posterColors(){const z=state.sign||{};try{if(window.stravaSignColorMap318){const m=window.stravaSignColorMap318(z);return m.lines;}}catch(e){}return poster().split('\n').map((line,i)=>'ZEILE '+(i+1)+': '+(line||'[LEERZEILE]')).join('\n');}
function posterFont(){try{const p=JSON.parse(localStorage.getItem('stravaPoster321')||'{}');return p.font||'Impact';}catch(e){return 'Impact';}}
function outfit(){
 const c=state.common||{};
 const brand=c.brand||'PUMA',top=c.top||'Full-Zip-Laufjacke',color=c.topColorHex||c.topColor||'#DFFF00';
 const pants=c.pants||'sportliche Jogginghose',pcol=c.pantsColor||'Schwarz';
 return 'Er trägt die gewählte '+brand+'-'+top+' in '+color+', dazu eine '+pcol+'e '+brand+'-'+pants+', '+(c.cap||'rote Cap rückwärts')+', '+(c.socks||'schwarze Socken')+' und '+(c.watch||'eine schwarze Sportuhr')+'. Verwende exakt die Laufschuhe aus dem separat beigefügten SHOE PHOTO. Keine erfundenen oder mehrfachen Markenlogos; keine zusätzlichen Ärmelstreifen.';
}
function sceneValues(){
 const current=presets.find(p=>p[0]===settings.scene)||presets[0];
 if(settings.scene==='Aktuelle Premium-Szene'){
  const r=window.stravaEffectiveScene390&&window.stravaEffectiveScene390();
  const c=r&&r.effective;
  if(c)return ['Aktuelle Premium-Szene','An einem öffentlichen Ort: '+c.place+'. Das gewählte XXL-Plakat ist sichtbar und physikalisch glaubwürdig an einer geeigneten öffentlichen Architektur befestigt.','Hauptfigur-Pose: '+c.pose+'. Handlung: '+c.action+'. Das Gesicht bleibt zur Kamera erkennbar.'];
 }
 return current;
}
function createPrompt(){
 const z=state.sign||{},text=String(poster()).trim();if(!text)throw Error('Im Plakat-Editor fehlt ein Text.');
 const selected=sceneValues();const pose=poses.find(p=>p[0]===settings.pose);
 const poseText=pose&&pose[1]?pose[1]:selected[2];
 const crowd=(crowds.find(p=>p[0]===settings.crowd)||crowds[0])[1];
 const overHead=settings.pose==='Überkopf-Plakat';
 const backdrop=overHead?selected[1].replace(/Das schwarze XXL-Banner[^.]*\./g,'').replace(/Das XXL-Banner[^.]*\./g,'').replace(/Das schwarze Banner[^.]*\./g,'') : selected[1];
 const mount=overHead?'Die Protesttafel wird tatsächlich mit beiden Händen über dem Kopf gehalten und ist als handhabbares Schild konstruiert.':'Ein einziges monumentales schwarzes Protestplakat ist vollständig sichtbar, baulich glaubwürdig verankert und verdeckt weder Gesicht noch Körper.';
 const perWord=posterColors();
 const notes=settings.extra.trim();
 const formatted=[
 'Transformiere diese Person aus dem beigefügten Gesichtsfoto in einen selbstbewussten Marathonläufer, der an einem außergewöhnlichen öffentlichen Ort eine provokative Demonstration gegen Bewegungsfaulheit veranstaltet.',
 '',
 'GESICHT UND IDENTITÄT:',
 'Bewahre sein echtes Gesicht aus dem PERSON PHOTO 1:1: dieselben Augen, Augenbrauen, Nase, Lippen, Bart, natürliche Hautstruktur und individuellen Gesichtszüge. Keine Verschönerung und keine Veränderung der Identität. Ein normal proportionierter erwachsener Körper mit natürlicher Kopfgröße, natürlichem Oberkörper und realistischen Beinen, ohne künstliche Streckung.',
 '',
 'OUTFIT UND SCHUHE:',
 outfit(),
 '',
 'DIE SZENE:',
 backdrop,
 poseText,
 'Der Marathonläufer bleibt gut erkennbar, selbstbewusst und ruhig. Sein Gesicht und seine Schuhe sind sichtbar, während die Menschen auf seine provokante Botschaft reagieren.',
 mount,
 '',
 'DIE EMPÖRTE MENSCHENMENGE:',
 crowd,
 'Die Menschen stehen in unregelmäßigen Gruppen mit natürlicher Tiefenstaffelung und verschiedenartigen Gesten. Keine gleichförmig ausgerichteten Köpfe, keine choreografierte Menge und keine Gewalt.',
 '',
 'EXAKTER TEXT AUF DEM SCHWARZEN PLAKAT:',
 text,
 '',
 'SCHRIFT, ROT-WEISS-FARBEN UND ABSÄTZE:',
 'Verwende die im Plakat-Editor gewählte Schrift '+posterFont()+'. Die Großbuchstaben sind kräftig, breit, massiv und klar lesbar, nicht horizontal gestaucht und nicht künstlich verengt. Der Text ist sauber mittig gesetzt. Exakte Wörter, Satzzeichen und Zeilenumbrüche beibehalten. Zwischen den inhaltlichen Textblöcken bleibt die vorhandene Leerzeile deutlich sichtbar; nicht zwischen jede einzelne Zeile zusätzlichen Abstand einfügen.',
 'Diese Wortfarben sind verbindlich. Jedes einzelne Wort erhält exakt die angegebene Farbe; die Leerzeilen bleiben leer:',
 perWord,
 'Rote Schlüsselwörter sind Signalrot #FF4B30, sofern der Plakat-Editor diese Farbe festgelegt hat. Die tatsächlich ausgewählten Einzelwortfarben aus der obigen Liste haben stets Vorrang.',
 '',
 ...(notes?['ZUSÄTZLICHER SZENENWUNSCH:',notes,'']:[]),
 'FOTOGRAFISCHE UMSETZUNG:',
 'Ein einziges ultrafotorealistisches dokumentarisches Straßenfoto mit natürlichem Tageslicht, glaubwürdigen Schatten, realen Materialien und authentischen Reaktionen. Das Gesicht und der vollständige Text sind gut zu erkennen. Keine künstliche Illustration, kein CGI, keine erfundenen Geschäftsnamen. Genau ein Bild im nativen 9:16-Hochformat.'
 ].join('\n');
 return formatted;
}
function option(list,selected){return list.map(x=>'<option value="'+safe(x)+'"'+(selected===x?' selected':'')+'>'+safe(x)+'</option>').join('');}
function view(){
 const current=sceneValues();
 return '<section class="panel" id="transform460" style="border:2px solid #69cf9b">'+
 '<h2>TRANSFORM · DEUTSCHER SMART DIRECTOR</h2><p class="hint">Eigenständiger, kurzer Bildauftrag. Beginnt immer mit „Transformiere diese Person …“. Keine ASF-, Kamera- oder Premium-Prompt-Blöcke.</p>'+
 '<div class="field"><label for="tfScene460">01 · Schauplatz</label><select id="tfScene460">'+option([...presets.map(x=>x[0]),'Aktuelle Premium-Szene'],settings.scene)+'</select></div>'+
 '<div class="field"><label for="tfPose460">02 · Deine Pose</label><select id="tfPose460">'+option(poses.map(x=>x[0]),settings.pose)+'</select></div>'+
 '<div class="field"><label for="tfCrowd460">03 · Zuschauerreaktion</label><select id="tfCrowd460">'+option(crowds.map(x=>x[0]),settings.crowd)+'</select></div>'+
 '<div class="field"><label for="tfExtra460">04 · Eigene Szenenergänzung (optional)</label><textarea rows="2" id="tfExtra460" placeholder="z. B. Zuschauer zeigen empört auf die roten Wörter">'+safe(settings.extra)+'</textarea></div>'+
 '<div class="notice" style="border-left-color:#69cf9b"><b>05 · Plakat & Outfit direkt aus deinen vorhandenen Einstellungen</b><p class="hint">Plakattext, Leerzeilen und Wortfarben aus Plakat. Outfit aus Hauptfigur. Kein zweiter Plakat-Editor.</p>'+
 '<div style="white-space:pre-wrap;font-size:12px;background:#0f131a;padding:10px;border-radius:8px">'+safe(poster()||'Noch kein Plakattext')+'</div><button class="btn secondary" type="button" id="tfPoster460" style="margin-top:9px">Plakat-Editor öffnen</button></div>'+
 '<div class="actions"><button class="btn" type="button" id="tfCopy460" style="width:100%;min-height:52px;background:#16875b">AKTUALISIEREN & PROMPT KOPIEREN</button><button class="btn secondary" type="button" id="tfRefresh460">Vorschau aktualisieren</button></div>'+
 '<p id="tfStatus460" role="status" class="hint" style="min-height:20px"></p>'+
 '<label for="tfPreview460">Dein natürlich formulierter deutscher Transformations-Prompt</label>'+
 '<textarea id="tfPreview460" readonly rows="16" style="min-height:330px;font-size:13px"></textarea>'+
 '<div class="actions"><button type="button" class="btn secondary" id="tfSave460">Szene als TRANSFORM-Preset speichern</button></div>'+
 '<div class="field"><label for="tfSaved460">Meine TRANSFORM-Presets</label><select id="tfSaved460"><option value="">Gespeicherten Entwurf auswählen</option>'+settings.saved.map((x,i)=>'<option value="'+i+'">'+safe(x.name)+'</option>').join('')+'</select></div>'+
 '<div class="actions"><button type="button" class="btn secondary" id="tfLoad460">Preset laden</button><button type="button" class="btn ghost" id="tfDelete460">Preset löschen</button></div>'+
 '<p class="hint">Angehängte Bilder werden weiterhin beim Erzeugen des Bildes als PERSON PHOTO und SHOE PHOTO beigefügt. Der neue Reiter erzeugt nur den Textauftrag.</p></section>';
}
function bind(){
 const root=document.getElementById('transform460');if(!root)return;
 const el=id=>root.querySelector('#'+id);
 const status=el('tfStatus460'),preview=el('tfPreview460');
 function read(){
  settings.scene=el('tfScene460').value;
  settings.pose=el('tfPose460').value;
  settings.crowd=el('tfCrowd460').value;
  settings.extra=el('tfExtra460').value;
  store();
 }
 function refresh(){
  try{read();const prompt=createPrompt();preview.value=prompt;status.textContent='✓ Vorschau aktualisiert · '+prompt.length+' Zeichen · Plakattext und Farben aus dem Editor';return prompt;}
  catch(e){status.textContent='⚠ '+e.message;return '';}
 }
 ['tfScene460','tfPose460','tfCrowd460','tfExtra460'].forEach(id=>el(id).addEventListener('change',refresh));
 el('tfRefresh460').onclick=refresh;
 el('tfPoster460').onclick=function(){state.tab='Plakat';save();render();window.scrollTo(0,0);};
 el('tfCopy460').onclick=function(){
  const prompt=refresh();if(!prompt)return;
  const fallback=function(){
   preview.focus();preview.select();preview.setSelectionRange(0,prompt.length);
   const ok=document.execCommand('copy');
   status.textContent=ok?'✓ TRANSFORM-Prompt kopiert · '+prompt.length+' Zeichen':'⚠ Text in der Vorschau markieren und manuell kopieren';
  };
  if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(prompt).then(()=>{status.textContent='✓ TRANSFORM-Prompt kopiert · '+prompt.length+' Zeichen';},fallback);
  else fallback();
 };
 el('tfSave460').onclick=function(){
  read();const name=window.prompt('Name für den TRANSFORM-Entwurf',settings.scene);if(!name||!name.trim())return;
  settings.saved.push({name:name.trim(),scene:settings.scene,pose:settings.pose,crowd:settings.crowd,extra:settings.extra});store();render();
 };
 el('tfLoad460').onclick=function(){const x=settings.saved[Number(el('tfSaved460').value)];if(!x||!el('tfSaved460').value)return;Object.assign(settings,{scene:x.scene,pose:x.pose,crowd:x.crowd,extra:x.extra});store();render();};
 el('tfDelete460').onclick=function(){const v=el('tfSaved460').value;if(v==='')return;settings.saved.splice(Number(v),1);store();render();};
 refresh();
}
const oldTabs=tabs;tabs=function(){const values=oldTabs();if(state.world!=='sign')return values;return values.includes(tabName)?values:[...values.slice(0,2),tabName,...values.slice(2)];};
const oldRender=render;render=function(){
 oldRender();
 if(state.world!=='sign'||state.tab!==tabName)return;
 const holder=document.getElementById('view');if(!holder)return;
 holder.innerHTML=view();bind();
};
/* Repaint the navigation immediately after installing the new tab; the first page render happened earlier. */
if(state.world==='sign')render();
window.stravaTransform460={createPrompt:createPrompt,version:'V4.6.0',getSettings:()=>JSON.parse(JSON.stringify(settings))};
})();