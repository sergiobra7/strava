/* BLACK SIGN V5.0.6: Seven direct selectors, no nested group tiles. */
(function(){
'use strict';
if(window.stravaDirectorQuick506)return;
const LOCATIONS=["Automatisch","Altstadt","Außentreppe","Autowerkstatt","Bäckerei","Backsteinfassade","Bahnhofseingang","Bahnhofsvorplatz","Baumarkt","Baustelle","Bauzaun","Breite Straße","Brücke","Bushaltestelle","Café","Dönerladen","Einkaufszentrum","Eisdiele","Fitnessstudio","Fußgängerzone","Gewerbehof","Großes Rolltor","Hauseingang","Hochhausfassade","Imbiss","Industriehalle","Industriehof","Innenhof","Kiosk","Lagerhalle","Marktplatz","Messevorplatz","Möbelhaus","Parkdeck","Parkhaus","Promenade","Restaurant","Rohbau","Skatepark","Sportevent","Sporthalle","Sportplatz","Stadion","Stadionvorplatz","Stadtfest","Stadtpark","Stadtplatz","Straßenbahnhaltestelle","Supermarkt","Supermarkteingang","Supermarktparkplatz","Tankstelle","Uferweg","Volksfest","Waschanlage","Waschsalon","Werkstatt","Wochenmarkt"];
const DISPLAYS=["BLACK SIGN","XXL-Straßenbanner","Horizontale LED-Wand","Auskragende XXL-LED","Vertikale LED-Wand","Dachwerbetafel XXL","Freistehende XXL-Werbetafel","Dachwerbung über Geschäft","Werbetafel auf Stahlstütze","Verkehrsknoten-Werbetafel","Balkonbanner XXL","Werkstatttor-Banner","Bäckerei-Banner"];
const POSES=['Automatisch','Stehen','Sitzen','Rückwärts sitzen','Lehnen','Bewegung','Gestikulieren','Interaktion'];
const MIMIK=['Automatisch','Provokantes Grinsen','Überlegenes Schmunzeln','Eiskalt ernst','Herausfordernd','Ungläubig lachend','Gelassen','Ernst','Nachdenklich','Überrascht','Geschockt','Selbstbewusst'];
const BLICKE=['Automatisch','Direkt in die Kamera','Zum Plakat','Zum Publikum','Seitlich','Zu einer Nebenfigur'];
const KAMERAS=['Automatisch · PREMIUM-Szenenkamera','28 mm / 8 m','35 mm / 10 m','24 mm / 15 m','28 mm / 20 m','35 mm / 8 m','Manuell'];
const ORDER=['ort','bereich','anzeige','pose','mimik','blick','kamera'];
const LABELS={ort:'ORT',bereich:'BEREICH',anzeige:'ANZEIGEMITTEL',pose:'POSE',mimik:'MIMIK',blick:'BLICKRICHTUNG',kamera:'KAMERA'};
const KEY='strava-premium-studio-350',PREF='strava-quick-director-506';
function saved(){try{return JSON.parse(localStorage.getItem(KEY)||'{}')||{}}catch(e){return {}}}
function prefs(){try{return JSON.parse(localStorage.getItem(PREF)||'{}')||{}}catch(e){return {}}}
function put(k,v){const p=prefs();p[k]=v;localStorage.setItem(PREF,JSON.stringify(p));return p}
function areaChoices(place){
 const fn=window.stravaSmartSceneMatrix311?.choices;
 let vals=[];try{if(typeof fn==='function')vals=fn('area311',place==='Automatisch'?'':place)}catch(e){}
 return ['Automatisch',...new Set(vals.filter(Boolean))];
}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function originalSelect(group,key,value){
 const root=document.getElementById('ps350');
 if(!root)return false;
 const tile=root.querySelector('.ps-grid [data-ps-open="'+group+'"]');
 if(!tile)return false;
 tile.click();
 const newRoot=document.getElementById('ps350');
 const target=Array.from(newRoot?.querySelectorAll('[data-ps-key]')||[]).find(b=>b.dataset.psKey===key&&b.dataset.psVal===value);
 if(!target){console.warn('Quick Director: original filter unavailable',group,key,value);return false;}
 target.click();return true;
}
function selectLocation(value){
 const root=document.getElementById('ps350');
 const tile=root?.querySelector('.ps-grid [data-ps-open="ort"]');
 if(!tile)return false;
 tile.click();
 const view=document.getElementById('ps350');
 if(value==='Automatisch')return originalSelect('ort','location','Automatisch');
 const candidate=Array.from(view?.querySelectorAll('[data-ps-venue415]')||[]).find(b=>b.dataset.psVenue415===value);
 if(!candidate){console.warn('Quick Director: location not available',value);return false;}
 candidate.click();return true;
}
function setCamera(choice){
 const bridge=window.stravaCameraBridge4531;
 if(!bridge?.set)return false;
 if(choice===KAMERAS[0]){bridge.set('manual',false);put('kamera',choice);return true}
 if(choice==='Manuell'){bridge.set('manual',true);put('kamera',choice);return true}
 const m=choice.match(/^(\d+) mm \/ (\d+) m$/);
 if(!m)return false;
 bridge.set('manual',true);
 const ok=bridge.set('lens',Number(m[1]))&&bridge.set('distance',Number(m[2]));
 if(ok)put('kamera',choice);
 return ok;
}
function apply(k,v){
 let ok=false;
 if(k==='ort')ok=selectLocation(v);
 else if(k==='bereich')ok=originalSelect('bereich','area311',v);
 else if(k==='anzeige')ok=originalSelect('display','display316',v);
 else if(k==='pose')ok=originalSelect('pose','pose',v);
 else if(k==='kamera')ok=setCamera(v);
 else if(k==='mimik'||k==='blick'){put(k,v);ok=true;try{if(typeof render==='function')render()}catch(e){console.warn('Quick Director: refresh',e)}}
 if(!ok)console.warn('Quick Director: selection not applied',k,v);
 return ok;
}
function choices(k,p){
 if(k==='ort')return LOCATIONS;
 if(k==='bereich')return areaChoices(p.location||'Automatisch');
 if(k==='anzeige')return DISPLAYS;
 if(k==='pose')return POSES;
 if(k==='mimik')return MIMIK;
 if(k==='blick')return BLICKE;
 return KAMERAS;
}
function current(k,p,pref){
 if(k==='ort')return p.location||'Automatisch';
 if(k==='bereich')return p.area311||'Automatisch';
 if(k==='anzeige')return p.display316||'BLACK SIGN';
 if(k==='pose')return p.pose||'Automatisch';
 if(k==='mimik'||k==='blick')return pref[k]||'Automatisch';
 if(k==='kamera'){
  const o=window.stravaCameraBridge4531?.read?.();
  if(o?.manual){const v=o.lens+' mm / '+o.distance+' m';return KAMERAS.includes(v)?v:'Manuell'}
  return KAMERAS[0];
 }
 return '';
}
let mounting=false;
function mount(){
 if(mounting)return;
 const root=document.getElementById('ps350');
 if(!root||!root.querySelector('.ps-grid'))return;
 mounting=true;
 try{
  const p=saved(),pref=prefs(),grid=root.querySelector('.ps-grid');
  grid.style.display='none';
  const oldGroups=root.querySelector('#smartDirectorGroups502');if(oldGroups)oldGroups.style.display='none';
  const originalBody=grid.nextElementSibling;
  if(originalBody&&originalBody.id!=='smartDirectorGroups502')originalBody.style.display='none';
  const oldHeader=root.querySelector('.ps-panel > .ps-title');
  if(oldHeader&&oldHeader.textContent.includes('FILTERÜBERSICHT'))oldHeader.textContent='SZENENSTEUERUNG · 7 DIREKTE AUSWAHLFELDER';
  let host=root.querySelector('#smartDirectorQuick506');
  if(!host){host=document.createElement('div');host.id='smartDirectorQuick506';grid.insertAdjacentElement('beforebegin',host)}
  host.style.cssText='display:grid;gap:9px;margin:12px 0 16px;';
  const signature=JSON.stringify({p:{location:p.location,area:p.area311,display:p.display316,pose:p.pose},pref,camera:window.stravaCameraBridge4531?.read?.()});
  if(host.dataset.signature===signature)return;
  host.dataset.signature=signature;
  host.innerHTML=ORDER.map(k=>{
    const list=choices(k,p),val=current(k,p,pref);
    const opts=list.includes(val)?list:[...list,val];
    return '<div style="display:grid;grid-template-columns:107px minmax(0,1fr);gap:9px;align-items:center">'+
      '<label for="quick506-'+k+'" style="font-weight:800;letter-spacing:.03em;font-size:12px;color:#f3f5f7">'+LABELS[k]+'</label>'+
      '<select id="quick506-'+k+'" data-quick506="'+k+'" style="display:block;width:100%;min-width:0;min-height:46px;background:#252e3a;color:#fff;border:1px solid #617082;border-radius:9px;padding:9px 30px 9px 10px;font-size:14px">'+
      opts.map(v=>'<option value="'+esc(v)+'"'+(v===val?' selected':'')+'>'+esc(v)+'</option>').join('')+'</select></div>'
  }).join('');
  host.querySelectorAll('[data-quick506]').forEach(select=>{
   select.onchange=function(){
     const k=this.dataset.quick506,v=this.value;
     if(!apply(k,v)){host.dataset.signature='';mount()}
     else requestAnimationFrame(()=>{const fresh=document.getElementById('ps350');if(fresh)mount()});
   };
  });
  const legacyBanner=root.querySelector('#psGoPoster412')?.closest('div.ps-grid')||null;
  const posterLink=root.querySelector('#psGoPoster412')?.parentElement;
  if(posterLink&&posterLink!==host)posterLink.style.display='none';
  window.stravaDirectorQuick506Last={visible:ORDER.length,fields:ORDER,options:ORDER.map(k=>({field:k,count:choices(k,p).length}))};
 }finally{mounting=false}
}
let scheduled=false;
function schedule(){
 if(scheduled)return;scheduled=true;
 Promise.resolve().then(()=>{scheduled=false;mount()});
}
function init(){
 const view=document.getElementById('view');if(!view)return;
 const ob=new MutationObserver(records=>{
  if(records.some(r=>r.target===view||(r.target.id==='ps350'&&!r.target.closest('#smartDirectorQuick506'))))schedule();
 });
 ob.observe(view,{childList:true,subtree:true});mount();
}
const oldPrompt=typeof buildPrompt==='function'?buildPrompt:null;
if(oldPrompt){
 buildPrompt=function(){
  let output=oldPrompt.apply(this,arguments);
  if(state.world!=='sign')return output;
  const q=prefs();
  if((!q.mimik||q.mimik==='Automatisch')&&(!q.blick||q.blick==='Automatisch'))return output;
  output=String(output).replace(/^(- Gewählte Pose: .*? Blick: )(.*?)(\. Ausdruck und Handlung: )(.*?)(\.)$/m,(full,a,g,b,m,c)=>{
   return a+(q.blick&&q.blick!=='Automatisch'?q.blick:g)+b+(q.mimik&&q.mimik!=='Automatisch'?q.mimik:m)+c;
  });
  return output;
 };
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
window.stravaDirectorQuick506={version:'V5.0.6',mount,apply,fields:ORDER,locations:LOCATIONS.length,displayOptions:DISPLAYS.length};
})();