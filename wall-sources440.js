/* STRAVA WALL V4.4.0 — Original STRAVA screenshot storage and pixel-preserving overlay. */
(function(){
'use strict';
const DATABASE='strava-wall-source-v440', STORE='photos',ROLES=['bpm','route','solo'];
let dbPromise;
function db(){
 if(!dbPromise)dbPromise=new Promise((resolve,reject)=>{
  const r=indexedDB.open(DATABASE,1);
  r.onupgradeneeded=()=>r.result.createObjectStore(STORE);
  r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);
 });
 return dbPromise;
}
async function get(role){
 const d=await db();return new Promise((ok,no)=>{
  const t=d.transaction(STORE,'readonly'),r=t.objectStore(STORE).get(role);
  r.onsuccess=()=>ok(r.result||null);r.onerror=()=>no(r.error);
 });
}
async function set(role,blob){
 if(!ROLES.includes(role))throw Error('Unbekannte STRAVA-Quelle');
 const d=await db();return new Promise((ok,no)=>{
  const t=d.transaction(STORE,'readwrite');
  t.objectStore(STORE).put(blob,role);t.oncomplete=()=>ok(true);t.onerror=()=>no(t.error);
 });
}
async function del(role){
 const d=await db();return new Promise((ok,no)=>{
  const t=d.transaction(STORE,'readwrite');t.objectStore(STORE).delete(role);
  t.oncomplete=()=>ok(true);t.onerror=()=>no(t.error);
 });
}
async function ready(mode){
 const need=mode==='bpm'?['bpm','route']:['solo'];
 const found=await Promise.all(need.map(get));
 return {ok:found.every(Boolean),required:need,present:need.filter((r,i)=>!!found[i]),missing:need.filter((r,i)=>!found[i])};
}
function bitmap(blob){
 return new Promise((ok,no)=>{
  const u=URL.createObjectURL(blob),im=new Image();
  im.onload=()=>{URL.revokeObjectURL(u);ok(im)};
  im.onerror=()=>{URL.revokeObjectURL(u);no(Error('Bild konnte nicht geladen werden'))};
  im.src=u;
 });
}
function extract(img,orangeOnly){
 const c=document.createElement('canvas');
 c.width=img.naturalWidth;c.height=img.naturalHeight;
 const x=c.getContext('2d',{willReadFrequently:true});x.drawImage(img,0,0);
 const frame=x.getImageData(0,0,c.width,c.height),a=frame.data;
 let left=c.width,right=-1,top=c.height,bottom=-1,count=0;
 for(let y=0;y<c.height;y++)for(let px=0;px<c.width;px++){
  const i=(y*c.width+px)*4,r=a[i],g=a[i+1],b=a[i+2],alpha=a[i+3];
  const orange=r>110&&r>g*1.34&&g>b*1.22&&g>32;
  const keep=alpha>5&&(orangeOnly?orange:Math.max(r,g,b)>37);
  if(!keep){a[i+3]=0;continue}
  if(orangeOnly&&!orange){a[i+3]=0;continue}
  left=Math.min(left,px);right=Math.max(right,px);
  top=Math.min(top,y);bottom=Math.max(bottom,y);count++;
 }
 if(!count)throw Error(orangeOnly?'Keine orange Route im Karten-Screenshot erkannt':'Keine sichtbaren Statistik-Pixel im Screenshot erkannt');
 x.putImageData(frame,0,0);
 const pad=Math.max(3,Math.round(c.width*.01));
 const sx=Math.max(0,left-pad),sy=Math.max(0,top-pad),sw=Math.min(c.width-sx,right-left+1+2*pad),sh=Math.min(c.height-sy,bottom-top+1+2*pad);
 const cropped=document.createElement('canvas');cropped.width=sw;cropped.height=sh;
 cropped.getContext('2d').drawImage(c,sx,sy,sw,sh,0,0,sw,sh);
 return cropped;
}
function fit(ctx,img,box){
 const ratio=Math.min(box.w/img.width,box.h/img.height);
 const w=img.width*ratio,h=img.height*ratio;
 ctx.drawImage(img,box.x+(box.w-w)/2,box.y+(box.h-h)/2,w,h);
}
async function make(mode,canvas){
 const check=await ready(mode);
 if(!check.ok)throw Error('Pflichtreferenzen fehlen: '+check.missing.join(', '));
 canvas.width=1200;canvas.height=1600;
 const ctx=canvas.getContext('2d');ctx.clearRect(0,0,1200,1600);
 if(mode==='bpm'){
  const stats=extract(await bitmap(await get('bpm')),false);
  const route=extract(await bitmap(await get('route')),true);
  fit(ctx,stats,{x:65,y:95,w:1070,h:710});
  fit(ctx,route,{x:160,y:830,w:880,h:650});
 }else{
  const solo=extract(await bitmap(await get('solo')),false);
  fit(ctx,solo,{x:70,y:80,w:1060,h:1440});
 }
 return {ok:true,mode,width:1200,height:1600};
}
function downloadOriginal(blob,name){
 const a=document.createElement('a'),u=URL.createObjectURL(blob);
 a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();
 setTimeout(()=>URL.revokeObjectURL(u),1000);
}
window.stravaWallSources440={get,set,del,ready,make,bitmap,downloadOriginal,version:'V4.4.0'};
})();
/* BLACK SIGN V5.0 bootstrap: load after legacy modules; STRAVA WALL unchanged. */
window.addEventListener('load',function(){
 if(window.stravaSignDeutsch500||document.getElementById('blackSignDeutsch500'))return;
 var script=document.createElement('script');
 script.id='blackSignDeutsch500';
 script.src='black-sign-de-v500.js?v=505-168cm-20261103';
 script.onload=function(){if(typeof render==='function'&&typeof state!=='undefined'&&state.world==='sign')render()};
 script.onerror=function(){console.error('BLACK SIGN V5.0 konnte nicht geladen werden.')};
 document.body.appendChild(script);
},{once:true});

/* Add the isolated poster-color copy action without changing the editor. */
window.addEventListener('load',function(){
 if(document.getElementById('stravaPosterColors501'))return;
 var el=document.createElement('script');
 el.id='stravaPosterColors501';
 el.src='poster-colors-copy-v501.js?v=501-20261103';
 el.onerror=function(){console.error('Plakat-Farb-Prompt konnte nicht geladen werden.')};
 document.body.appendChild(el);
},{once:true});

/* Smart Director: vier zusammengefasste Filterbereiche, Originale bleiben aktiv. */
window.addEventListener('load',function(){
 if(document.getElementById('smartDirectorGroups502Script'))return;
 var script=document.createElement('script');
 script.id='smartDirectorGroups502Script';
 script.src='smart-director-groups-v502.js?v=503-20261103';
 script.onerror=function(){console.error('Smart Director Gruppen konnten nicht geladen werden.')};
 document.body.appendChild(script);
},{once:true});

/* BLACK SIGN Premium V5.0.4: harmonize scenes and German copy output. */
window.addEventListener('load',function(){
 if(document.getElementById('premiumHarmony504Script'))return;
 var script=document.createElement('script');
 script.id='premiumHarmony504Script';
 script.src='premium-harmony-v504.js?v=504-20261103';
 script.onerror=function(){console.error('PREMIUM Harmonisierung konnte nicht geladen werden.')};
 document.body.appendChild(script);
},{once:true});

/* BLACK SIGN V5.0.6 · Seven direct Smart Director controls. */
window.addEventListener('load',function(){
 if(document.getElementById('smartDirectorQuick506Script'))return;
 var el=document.createElement('script');
 el.id='smartDirectorQuick506Script';
 el.src='smart-director-quick-v506.js?v=506-20261103';
 el.onerror=function(){console.error('Direkte Smart Director Auswahlfelder konnten nicht geladen werden.')};
 document.body.appendChild(el);
},{once:true});
