/* BLACK SIGN V5.0.9 — one authoritative eight-filter matrix for all PREMIUM cards, selection and copy. */
(function(){
'use strict';
if(window.stravaPremiumUnified509)return;
const KEYS=['ort','bereich','anzeige','position','pose','mimik','blick','kamera'];
const NAMES=['ORT','BEREICH','ANZEIGEMITTEL','POSITION','POSE','MIMIK','BLICKRICHTUNG','KAMERA'];
const PREF='strava-quick-director-506',STUDIO='strava-premium-studio-350';
const AUTOPOS=['Ganz vorne · frei sichtbar','Vorderer Mittelgrund','Mittig in der Menschenmenge','Leicht hinter der ersten Reihe','Hinterer Mittelgrund','Seitlich links vor der Menge','Seitlich rechts vor der Menge','Mitten im Gerangel','Direkt unter dem Plakat','Ganz hinten im Publikum'];
const AUTOGAZE=['Direkt in die Kamera','Zum Publikum','Zum Plakat','Seitlich'];
const AUTOMIMIC=['Selbstbewusst','Provokantes Grinsen','Überlegenes Schmunzeln','Eiskalt ernst','Nachdenklich','Herausfordernd','Gelassen','Ernst'];
function json(key){try{return JSON.parse(localStorage.getItem(key)||'{}')||{}}catch(e){return {}}}
function escapeHtml(value){return String(value==null?'':value).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]))}
function rawRows(card){
 const small=card.querySelector('[data-ps-scene] small');
 if(!small)return {};
 const html=small.innerHTML.replace(/<br\s*\/?>/gi,'\n');
 const box=document.createElement('div');box.innerHTML=html;
 const lines=box.textContent.split('\n').map(x=>x.trim()).filter(Boolean);
 const out={};
 for(const line of lines){
  for(const [label,key] of [['Anzeige:','anzeige'],['Ort:','ort'],['Bereich:','bereich'],['Pose:','pose'],['Kamera:','kamera'],['Brennweite:','optics']]){
   const at=line.indexOf(label);if(at>=0)out[key]=line.slice(at+label.length).trim();
  }
 }
 return out;
}
function readableCamera(m){
 const x=String(m||'').match(/([\d.,]+)\s*mm.*?Entfernung:\s*([\d.,]+)\s*m/i);
 if(!x)return null;
 return {lens:Number(x[1].replace(',','.')),distance:Number(x[2].replace(',','.'))};
}
function placeCompatibleMount(display,loc){
 const name=String(display||'').toLowerCase(),where=String(loc||'').toLowerCase();
 const outdoorFestival=/volksfest|stadtfest|sportevent|messe|marktplatz|stadtplatz|stadionvorplatz|stadtpark|uferweg|sportplatz|brücke|skatepark|parkdeck|supermarktparkplatz|promenade|wochenmarkt|tankstelle/.test(where);
 if(/straßenbanner/.test(name)){
  return outdoorFestival?'An öffentlich genehmigter, standfester XXL-Stahltraverse mit sichtbar verankerten Stützen und statisch gesicherter Abhängung, nicht an erfundenen Hausfassaden':'Zwischen zwei vorhandenen tragfähigen Fassaden mit sichtbaren Spannseilen, Wandankern und Sicherungen';
 }
 if(/dach/.test(name))return 'An einer real vorhandenen tragfähigen Dachkonstruktion mit Sicht-Stahlstützen und statisch gesicherter Montage';
 if(/balkon/.test(name))return 'An einem real vorhandenen tragfähigen Balkon mit Ösen und Gurtbefestigung';
 if(/led/.test(name))return 'Auf tragfähiger Stahl-Unterkonstruktion mit sichtbaren Fundamenten beziehungsweise Fassadenankern und gesicherter Kabelzuführung';
 if(/bäckerei|werkstatttor/.test(name))return 'An einem vorhandenen geeigneten Gebäuderahmen mit sichtbaren mechanischen Befestigungen';
 return 'An einer real tragfähigen XXL-Werbekonstruktion mit sichtbar verschraubten Stahlstreben und Ankerpunkten';
}
function displayFits(display,loc){
 const d=String(display||'').toLowerCase(),p=String(loc||'').toLowerCase();
 if(/balkon/.test(d)&&!/balkon|gebäude|fassade|hauseingang|hochhaus|altstadt|innenhof/.test(p))return false;
 if(/werkstatttor/.test(d)&&!/werkstatt|autowerkstatt|rolltor|industrie|lagerhalle|gewerbehof/.test(p))return false;
 if(/bäckerei-banner/.test(d)&&!/bäckerei|bahnhof|altstadt|straße|fußgängerzone|marktplatz/.test(p))return false;
 if(/dach/.test(d)&&!/gebäude|fassade|haus|bahnhof|bäckerei|geschäft|markt|altstadt|straße|supermarkt|gewerbe|werkstatt|kiosk|restaurant|café|einkaufs|baustelle|stadtplatz/.test(p))return false;
 return true;
}
function normalizedPosition(place,initial){
 if(/keine|ohne publik|0 personen/i.test(String(initial||'')) && /gerangel|menschenmenge|publikum|reihe/i.test(place))return 'Ganz vorne · frei sichtbar';
 return place;
}
function choosePose(n,loc,area,display,preferSport){
 const api=window.stravaPoseCatalog508;
 if(!api?.poses?.length)return 'Stehen';
 const allowed=api.poses.filter(p=>api.resolve(p.name,loc,area,display).ok);
 const sport=allowed.filter(p=>p.group==='SPORTLER'),anat=allowed.filter(p=>p.group.startsWith('ANATOLISCH'));
 const pool=preferSport?(sport.length?sport:allowed):(anat.length?anat:allowed);
 return pool.length?pool[(n*17+3)%pool.length].name:'Stehen';
}
function setOf(n,card){
 const data=json(STUDIO),q=json(PREF),old=card.dataset?.rawRows509?JSON.parse(card.dataset.rawRows509):rawRows(card);
 const place=data.location&&data.location!=='Automatisch'?data.location:(old.ort||'Stadtplatz');
 const area=data.area311&&data.area311!=='Automatisch'?data.area311:(old.bereich||'Hauptbereich');
 const display=data.display316&&data.display316!=='BLACK SIGN'?data.display316:(old.anzeige||'BLACK SIGN');
 const pos=q.position&&q.position!=='Automatisch'?q.position:AUTOPOS[n%AUTOPOS.length];
 const explicitPose=q.pose&&q.pose!=='Automatisch'?q.pose:(data.pose&&data.pose!=='Automatisch'?data.pose:null);
 const catalog=window.stravaPoseCatalog508;
 const pose=explicitPose||choosePose(n,place,area,display,n%3===0);
 const resolution=catalog?.poses.some(item=>item.name===pose)?catalog.resolve(pose,place,area,display):{ok:true,description:'Natürliche stabile Körperhaltung.'};
 const mime=q.mimik&&q.mimik!=='Automatisch'?q.mimik:AUTOMIMIC[n%AUTOMIMIC.length];
 const gaze=q.blick&&q.blick!=='Automatisch'?q.blick:AUTOGAZE[n%AUTOGAZE.length];
 const camera=window.stravaCameraBridge4531?.read?.();
 const original=readableCamera(old.optics);
 const isManual=!!data.manualCamera;
 const lens=isManual&&Number(camera?.lens)>0?Number(camera.lens):original?.lens||Number(camera?.lens)||28;
 const distance=isManual&&Number(camera?.distance)>0?Number(camera.distance):original?.distance||Number(camera?.distance)||20;
 const eye=isManual||q.kamera&&q.kamera!=='Automatisch · PREMIUM-Szenenkamera'?'Manuell':'Szenenkamera';
 const errors=[];
 if(!catalog?.poses?.length)errors.push('130-Posen-Katalog noch nicht geladen');
 if(!displayFits(display,place))errors.push('Anzeigemittel passt nicht zu diesem Ort');
 if(!resolution?.ok)errors.push('Pose benötigt eine fehlende Requisite oder Auflage');
 if(!(lens>=10&&lens<=200&&distance>=1&&distance<=500))errors.push('Kamerawerte ungültig');
 const crowdPref=String(data.crowd316||data.audience||'');
 if(/^keine$/i.test(crowdPref)&&/gerangel|menschenmenge|publikum|reihe/i.test(pos)&&q.position&&q.position!=='Automatisch')errors.push('Position erfordert Publikum; bisherige Publikumseinstellung ist Keine');
 const position=normalizedPosition(pos,crowdPref); 
 return {n,ort:place,bereich:area,anzeige:display,position,pose,mimik:mime,blick:gaze,kamera:lens+' mm / '+distance+' m'+(eye==='Manuell'?' · Manuell':''),lens,distance,
  requirement:resolution?.description||'',mount:placeCompatibleMount(display,place),errors};
}
function panelText(x){
 return KEYS.map((key,i)=>'<div style="display:grid;grid-template-columns:112px minmax(0,1fr);gap:8px;align-items:start;padding:5px 0;'+(i?'border-top:1px solid #ffffff16;':'')+'"><span style="font-size:12px;font-weight:850;color:#afb9c8">'+NAMES[i]+'</span><span style="font-size:14px;font-weight:650;overflow-wrap:anywhere;color:#fff">'+escapeHtml(x[key])+'</span></div>').join('');
}
function updateCards(){
 const root=document.getElementById('ps350');
 if(!root)return;
 const cards=[...root.querySelectorAll('.ps-card')];
 if(cards.length!==10)return;
 // Reject unsupported display/venue pairs at the source selector, not only on the card.
 const venue=json(STUDIO).location||'Automatisch';
 const mediaSelect=root.querySelector('[data-quick506="anzeige"]');
 if(mediaSelect&&venue!=='Automatisch'){
  for(const option of [...mediaSelect.options]){
   const compatible=displayFits(option.value,venue);
   option.disabled=!compatible;
   option.title=compatible?'':'Für diesen Ort ohne passende tragfähige Architektur nicht geeignet';
  }
 }
 cards.forEach((card,i)=>{
   const existing=card.dataset.unified509;
   const prefs=JSON.stringify([json(STUDIO).location,json(STUDIO).area311,json(STUDIO).display316,json(STUDIO).pose,json(STUDIO).manualCamera,json(PREF)]);
   if(existing===prefs)return;
   const model=setOf(i,card);
   const button=card.querySelector('[data-ps-scene]'),small=button?.querySelector('small');
   if(!button||!small)return;
   // Preserve original handlers and original diagnostic data in the DOM; only simplify the presentation.
   if(!card.dataset.rawRows509)card.dataset.rawRows509=JSON.stringify(rawRows(card));
   card.dataset.unified509=prefs;card.dataset.model509=JSON.stringify(model);
   const title=button.querySelector('strong');
   if(title)title.textContent='PREMIUM '+String((json(STUDIO).round||0)*10+i+1).padStart(3,'0')+' · '+model.ort;
   small.innerHTML=panelText(model);
   for(const child of [...card.children]){
     if(child!==button&&!child.matches('[data-ps-apply-copy]'))child.style.display='none';
   }
   let warning=card.querySelector('.unified509-warning');
   if(!warning){warning=document.createElement('div');warning.className='unified509-warning';card.appendChild(warning)}
   warning.style.cssText='margin:7px 0;color:#ffb08a;font-size:12px;font-weight:700;display:'+(model.errors.length?'block':'none');
   warning.textContent=model.errors.length?'⚠ '+model.errors.join(' · '):'';
 });
 const selected=cards.findIndex(card=>card.classList.contains('on'));
 const active=cards[Math.max(0,selected)];
 const activeModel=active?.dataset.model509?JSON.parse(active.dataset.model509):null;
 const live=[...root.querySelectorAll('.ps-title')].find(node=>node.textContent.includes('LIVE · AKTIVE AUSWAHL')||node.textContent.includes('FILTERVORSCHAU · PREMIUM'));
 const summary=live?.parentElement?.querySelector('.ps-summary');
 if(live)live.textContent=selected>=0?'LIVE · AKTIVE AUSWAHL':'FILTERVORSCHAU · PREMIUM 001';
 if(summary&&activeModel){
   const signature=JSON.stringify(activeModel);
   if(summary.dataset.matrix509!==signature){
    summary.dataset.matrix509=signature;
    summary.innerHTML=panelText(activeModel);
   }
   const legacyDetails=live.parentElement.querySelector('details');
   if(legacyDetails)legacyDetails.style.display='none';
 }
}
function models(n){
 const c=document.querySelector('#ps350 .ps-card [data-ps-scene="'+n+'"]')?.closest('.ps-card');
 if(!c)return null;
 try{
  const saved=JSON.parse(c.dataset.model509||'null');
  if(saved)return saved;
 }catch(e){}
 return setOf(n,c);
}
function saveState(){
 try{if(typeof save==='function')save();else localStorage.setItem('stravaV25',JSON.stringify(state))}catch(e){console.warn('Premium save',e)}
}
function selectResolved(n,model){
 if(!model||model.errors.length)throw Error(model?.errors.join('; ')||'Szenenwerte fehlen');
 const q=state.sign258=state.sign258||{};
 const premium=q.premium270=q.premium270||{};
 premium.location=model.ort;premium.area311=model.bereich;premium.position=model.pose;
 premium.pose=model.pose;premium.expression=model.mimik;premium.mainGaze=model.blick;
 premium.action=model.mimik;premium.positionInCrowd=model.position;
 premium.camera=model.kamera;premium.manualLens=model.lens;premium.manualDistance=model.distance;
 premium.poster=model.anzeige+' · 9:16';premium.display316=model.anzeige;
 premium.holding=model.mount;premium.seat311=model.requirement;premium.description='Acht verbindliche Szenenfilter: '+KEYS.map(k=>NAMES[KEYS.indexOf(k)]+' '+model[k]).join('; ');
 q.activeSceneSource267='premium';
 state.sign=state.sign||{};state.sign.signType=model.anzeige;state.sign.signMountDetail=model.mount;state.sign.signMountChoice='Automatisch passend zum Plakattyp';
 saveState();
 window.stravaPremiumUnified509Active=model;
 return model;
}
function overridePrompt(original,x){
 let output=String(original||'');
 if(!output.startsWith('Transformiere die Person aus dem beigefügten Gesichtsfoto'))throw Error('Deutscher Transformations-Prompt fehlt');
 // Eight authoritative scene values; all legacy scene data must yield to these.
 const block=[
  '- EINZIGE SZENENFILTER — PREMIUM '+String(x.n+1)+':',
  '- ORT: '+x.ort+'.',
  '- BEREICH: '+x.bereich+'.',
  '- ANZEIGEMITTEL: '+x.anzeige+'.',
  '- POSITION: '+x.position+'.',
  '- POSE: '+x.pose+'. '+x.requirement,
  '- MIMIK: '+x.mimik+'.',
  '- BLICKRICHTUNG: '+x.blick+'.',
  '- KAMERA: '+x.lens+' mm; '+x.distance+' m; natives Bildformat 9:16.',
  '- Montage intern: '+x.mount+'.',
  '- Vorrang: Diese acht Felder sind für die Hauptfigur und die Szene verbindlich. Frühere abweichende Szenen-Presets, Requisiten, Hauptfigurenaktionen oder Kamerapresets ignorieren. Publikum und Nebenfiguren bleiben natürlich und dürfen die Pose, den Blick und die Plakatfläche nicht verdecken.'
 ].join('\n');
 const anchor='05 · ORT, SZENE & HAUPTFIGUR';
 if(!output.includes(anchor))throw Error('Hauptfigurblock fehlt');
 output=output.replace(anchor,anchor+'\n'+block);
 const sceneLine=output.match(/^- Gewählte Pose: .*$/m);
 if(sceneLine)output=output.replace(sceneLine[0],'- Gewählte Pose: '+x.pose+'. Blick: '+x.blick+'. Ausdruck und Handlung der Hauptfigur: '+x.mimik+'.');
 output=output.replace(/^- Verbindliche Läuferposition im Gedränge und Bildraum: .*$/m,'- Verbindliche Läuferposition im Gedränge und Bildraum: '+x.position+'.');
 output=output.replace(/^- Anzeigenart: .*$/m,'- Anzeigenart: '+x.anzeige+'. Befestigung: '+x.mount+'.');
 output=output.replace(/^- Brennweite: .*$/m,'- Brennweite: '+x.lens+' mm Vollformat; Kameraabstand zum Läufer: '+x.distance+' m; natives Format: 9:16.');
 return output;
}
let scheduled=false;
function schedule(){
 if(scheduled)return;scheduled=true;
 Promise.resolve().then(()=>{scheduled=false;updateCards()});
}
function init(){
 const catalogNode=document.getElementById('stravaPoseCatalog508Script');
 if(catalogNode&&!window.stravaPoseCatalog508){
  catalogNode.addEventListener('load',()=>{
   document.querySelectorAll('#ps350 .ps-card').forEach(card=>{delete card.dataset.unified509});
   updateCards();
  },{once:true});
 }
 const view=document.getElementById('view');if(view){
  const observer=new MutationObserver(records=>{if(records.some(r=>r.target===view||r.addedNodes.length&&[...r.addedNodes].some(node=>node.id==='ps350'||node.querySelector?.('#ps350'))))schedule()});
  observer.observe(view,{childList:true,subtree:true});
 }
 updateCards();
}
function status(msg,error){
 let node=document.getElementById('premiumUnified509Notice');
 if(!node){node=document.createElement('div');node.id='premiumUnified509Notice';node.setAttribute('role','status');node.style.cssText='position:fixed;left:12px;right:12px;bottom:24px;z-index:999999;padding:13px;border-radius:10px;background:#142b24;border:2px solid #41b882;color:#fff;font-size:14px;font-weight:700';document.body.appendChild(node)}
 node.style.borderColor=error?'#f67b63':'#41b882';node.textContent=msg;
}
async function copy(text){
 if(navigator.clipboard?.writeText){try{await navigator.clipboard.writeText(text);return true}catch(e){}}
 const ta=document.createElement('textarea');ta.value=text;ta.style.cssText='position:fixed;top:12%;left:5%;width:90%;height:42vh;z-index:999999';document.body.appendChild(ta);ta.focus();ta.select();let ok=false;try{ok=!!document.execCommand('copy')}catch(e){}if(ok)ta.remove();return ok;
}
function clickHandler(event){
 const element=event.target?.closest?.('#ps350 [data-ps-apply-copy],#ps350 [data-ps-scene]');
 if(!element)return;
 const n=Number(element.dataset.psApplyCopy??element.dataset.psScene);
 if(!Number.isInteger(n)||n<0||n>9)return;
 const model=models(n);
 if(!model)return;
 if(model.errors.length){event.preventDefault();event.stopImmediatePropagation();status('⚠ '+model.errors.join(' · '),true);return}
 if(element.hasAttribute('data-ps-scene')){
   Promise.resolve().then(()=>{try{selectResolved(n,model)}catch(e){status(String(e.message),true)}});
   return;
 }
 event.preventDefault();event.stopImmediatePropagation();
 try{
   const btn=document.querySelector('#ps350 [data-ps-scene="'+n+'"]');
   if(!btn)throw Error('PREMIUM-Szene fehlt');
   btn.click(); // Reuses the original selection and camera pipeline.
   selectResolved(n,model);
   const text=overridePrompt(buildPrompt(),model);
   copy(text).then(ok=>status(ok?'✓ PREMIUM '+String(n+1)+' übernommen · 8 Filter synchron · deutscher Prompt kopiert':'Kopieren nicht erlaubt; Zwischenablage prüfen',!ok));
 }catch(e){status('⚠ '+String(e.message||e),true);console.error('PREMIUM 509',e)}
}
const audit=function(){
 const cards=[...document.querySelectorAll('#ps350 .ps-card')],issues=[];
 cards.forEach((card,n)=>{
  const m=models(n);if(!m){issues.push({n,reason:'Modell fehlt'});return}
  for(const k of KEYS)if(!String(m[k]||'').trim())issues.push({n,k,reason:'Leerer Filter'});
  if(m.errors.length)issues.push({n,reason:m.errors.join('; ')});
  if(card.querySelectorAll('[data-ps-scene] small > div').length!==8)issues.push({n,reason:'Nicht exakt acht sichtbare Filter'});
 });
 return {pass:cards.length===10&&issues.length===0,scenes:cards.length,filters:KEYS.length,issues,keys:KEYS,poseCatalog:window.stravaPoseCatalog508?.audit?.()};
};
window.stravaPremiumUnified509={version:'V5.0.9.1',audit,resolve:setOf,apply:selectResolved,render:updateCards,prompt:overridePrompt,keys:KEYS,displayFits,placeCompatibleMount};
document.addEventListener('click',clickHandler,true);
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();