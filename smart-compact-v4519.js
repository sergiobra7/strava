/* STRAVA RUN V4.5.19 — Smart Compact Prompt Engine.
 * Additive prompt-output adapter. FULL calls the existing master source unchanged.
 * Stored settings/presets/cameras and source renders remain untouched.
 */
(function(){
'use strict';
if(typeof buildPrompt!=='function'||typeof render!=='function'||window.stravaCompact4519)return;
var fullBuilder=buildPrompt, originalRender=render;
var STORE='strava-compact-mode-v4519';
var MODES=['FULL','SMART COMPACT','ULTRA COMPACT'];
var mode='SMART COMPACT';
try{var stored=localStorage.getItem(STORE);if(MODES.includes(stored))mode=stored}catch(e){}
var cached=null,inBuild=false;
function str(v){return v==null?'':String(v)}
function clean(v){return str(v).trim()}
function escapeHtml(v){return str(v).replace(/[&<>"']/g,function(x){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','"':'&quot;'}[x]})}
function add(lines,key,value){if(value!==undefined&&value!==null&&clean(value)!=='')lines.push(key+': '+clean(value))}
function line(full,prefix){var a=str(full).split('\n');for(var i=0;i<a.length;i++)if(a[i].startsWith(prefix))return a[i].slice(prefix.length).trim();return ''}
function bodyBetween(full,start,end){var i=full.indexOf(start);if(i<0)return '';i+=start.length;var j=full.indexOf(end,i);return full.slice(i,j<0?full.length:j).trim()}
function boolActive(v){return !(v===false||v===null||v===undefined||v===0||v==='0'||v==='OFF'||v==='Aus'||v==='Keine'||v==='none'||v==='Nein')}
function compactValue(v){return clean(v).replace(/[ \t]+/g,' ')}
function attached(){return 'PERSON PHOTO + SHOE PHOTO supplied separately at image generation; preserve exact original faces, head geometry and both shoes. Do not invent unavailable pixel detail.'}
function camera(full,isWall){
 var c=state.common||{},wall=window.stravaWall450?.get?.()||{},lens,dist;
 if(isWall){
  function effective(key){var v=clean(wall[key+'Manual']).replace(',','.');return v&&Number(v)>0?v:clean(wall[key])}
  lens=effective('lens');dist=effective('distance');
 }else{
  lens=clean(c.cameraLens)||clean(c.lens);
  dist=clean(c.personDistance)||clean(c.distance);
 }
 var match=full.match(/FOCAL LENGTH:\s*([0-9.,]+)\s*mm/i);
 if(!lens&&match)lens=match[1];
 match=full.match(/CAMERA DISTANCE:\s*([0-9.,]+)\s*m/i);
 if(!dist&&match)dist=match[1];
 if(!lens){match=full.match(/Camera:\s*([0-9.,]+)\s*mm/i);lens=match?.[1]||'24'}
 if(!dist){match=full.match(/camera sensor exactly\s*([0-9.,]+)\s*m/i);dist=match?.[1]||'20'}
 var format='9:16 native portrait';
 var view=line(full,'Viewpoint:')||'Natural documentary';
 var premium=state.sign258?.premium270||{};
 var scene=window.stravaSignature400?.get?.()?.values||{};
 var height=clean(premium.cameraHeight311)||line(full,'Camera height:')||'Natural documentary height';
 var site=isWall?wall.location:(scene.venue||line(full,'Location:')||clean(state.sign258?.locationMode));
 var angle=isWall?wall.angle:(clean(premium.camera)||clean(state.sign258?.camera)||view);
 return {lens:clean(lens).replace(',','.'),distance:clean(dist).replace(',','.'),format,view,height,site,angle};
}
function identity(full){
 var piece=bodyBetween(full,'01 / REFERENCE IDENTITY','02 / LOCATION AND CAMERA');
 if(!piece)piece=line(full,'PERSON PHOTO:');
 // Retain full original face instructions verbatim (including editable multiline instructions).
 piece=piece.replace(/\n?Use the separately attached SHOE PHOTO[^\n]*/g,'')
   .replace(/\n?If a LOCATION PHOTO[^\n]*/g,'').trim();
 if(!/PERSON PHOTO/i.test(piece))piece='PERSON PHOTO: '+piece;
 return piece||attached();
}
function sourceColors(text){
 var mapped='';
 if(typeof window.stravaSignColorMap318==='function'){
  try{mapped=window.stravaSignColorMap318(state.sign||{}).lines||''}catch(e){}
 }
 if(!mapped){
  var z=state.sign||{},tokens=text.match(/\S+|\s+/g)||[],i=0,rows=[];
  text.split('\n').forEach(function(row,index){
   var items=[];var matches=[...row.matchAll(/\S+|\s+/g)];
   matches.forEach(function(m){if(!/^\s+$/.test(m[0]))items.push('['+i+'|'+m[0]+'|'+(z.wordColors?.[i]||z.signColor||'#FFFFFF')+']');i++});
   rows.push('L'+(index+1)+': '+(items.join(' ')||'[EMPTY]'));
  });
  mapped=rows.join('\n');
 }
 return str(mapped).trim();
}
function exactText(full){
 var t=str(state.sign?.signText);
 if(!t)return bodyBetween(full,'<<< SIGN TEXT START >>>','<<< SIGN TEXT END >>>');
 return t;
}
function getOutfit(full){return line(full,'Outfit:')||line(full,'FULL OUTFIT LOCK:')}
function signatureFields(){
 var snapshot=window.stravaSignature400?.get?.();
 if(!snapshot?.enabled)return {details:[],custom:[]};
 var selected=snapshot.values||{},notes=snapshot.notes||{};
 var fields=[],custom=[],overridden=new Set();
 Object.keys(notes).forEach(function(k){
  var arr=Array.isArray(notes[k])?notes[k]:[];
  arr.filter(function(x){return x?.active&&clean(x.text)}).forEach(function(x){
   var target=clean(x.field||x.key||x.filter||k);
   custom.push(target+(x.title?' / '+x.title:'')+'='+clean(x.text));
   if(target)overridden.add(target);
  });
 });
 Object.entries(selected).forEach(function(pair){
  var k=pair[0],v=pair[1];
  if(!boolActive(v)||overridden.has(k))return;
  fields.push(k+'='+compactValue(v));
 });
 return {details:fields,custom:custom};
}
function typography(){
 var api=window.stravaTypography430;
 if(!api)return '';
 try{
  var o=api.options(),l=api.layout(o),rows=l.lines.map(function(x){return x.fontSize.toFixed(1)});
  return 'font='+l.font+'; size='+str(o.size||56)+'/120; centered 50%; margin='+(100*l.safeMargin).toFixed(0)+'% each side; plane='+l.width+'x'+l.height+'; rows='+rows.join(',');
 }catch(e){return 'exact user font and source lines; centered at 50%'}
}
function wallFields(){
 var w=window.stravaWall450?.get?.()||{},x=[];
 // Every configured, actively operative output control is included.
 var keys=['mode','location','scenario','poseCategory','pose','gaze','mood','runnerAngle','runnerDepth','runnerHorizontal','runnerRelativeSize',
 'brand','club','collection','top','topColor','topColorHex','topLogo','zipColor','topDetails','pants','pantsColor','pantsLogoColor','cap','socks','watch','customOutfit',
 'crowd','distribution','height','side','width','angle','space','placement','statsSize','gpsSize','projection','spacing','extra'];
 keys.forEach(function(k){if(k==='gpsSize'&&w.mode!=='bpm')return;if(k==='poseCategory'&&w.poseCategory==='Alle bisherigen Posen')return;
 if(k==='customOutfit'||k==='extra'){if(!clean(w[k]))return}add(x,k,w[k])});
 if(w.opa){
  add(x,'opa','1970s rural Anatolian grandfather');
  ['opaProfile','opaAge','opaBuild','opaHead','opaBeard','opaClothing','opaShirt','opaPants','opaShoes','opaPose','opaGaze','opaReaction','opaCustom'].forEach(function(k){if(k==='opaCustom'&&!clean(w[k]))return;add(x,k,w[k])});
 }
 if(w.mantel)add(x,'mantel','Coat-wearing man');
 return x;
}
function signFields(full,ultra){
 var x=[],sig=signatureFields(),outfit=getOutfit(full);
 add(x,'Outfit',outfit);
 add(x,'Location-photo lock',line(full,'If a LOCATION PHOTO'));
 add(x,'Physical display',line(full,'SIGNATURE DISPLAY INSTALLATION:')||line(full,'ORIGINAL SIGN TYPE:'));
 var cap=line(full,'Text alignment:');add(x,'Typography alignment',cap||'CENTERED, sign-local 50%');
 add(x,'Typography',typography());
 var p=state.sign258?.premium270||{};
 if(clean(p.title))add(x,'Active Premium scene',p.title);
 var fullLines=full.split('\n');
 var premium=fullLines.filter(function(v){return v.includes('[original displayed value:')});
 if(premium.length)x.push('PREMIUM ACTIVE VALUES: '+premium.join(' | '));
 if(sig.details.length)x.push('SIGNATURE ACTIVE FIELDS: '+sig.details.join(' | '));
 if(sig.custom.length)x.push('ACTIVE CUSTOM OVERRIDES (supersede same-field dropdowns): '+sig.custom.join(' | '));
 for(const key of ['Legacy side-character details:','Premium scene cast:','Premium-selected figure appearance:','Audience:','Background ambience:']){
  var v=line(full,key);if(v&&!/No Premium|none|no premium override/i.test(v))add(x,key.replace(':',''),v);
 }
 if(!sig.details.length){
  add(x,'Pose / gaze / expression',line(full,'Pose:'));
  add(x,'Outfit and side cast',line(full,'Legacy side-character details:'));
 }
 return x;
}
function issues(full,isWall){
 var errors=[],warn=[];
 var cam=camera(full,isWall);
 if(!(Number(cam.lens)>0&&Number(cam.distance)>0))errors.push('Camera values must be positive.');
 if(!isWall){
  var text=exactText(full);
  if(!text.trim())errors.push('Exact message is empty.');
  var colors=sourceColors(text),wordCount=(text.match(/\S+/g)||[]).length;
  var hex=(colors.match(/#[0-9a-f]{6}\b/gi)||[]).length;
  if(!colors||hex<wordCount)errors.push('Incomplete per-word color map: '+hex+'/'+wordCount+' words.');
  var snap=window.stravaSignature400?.get?.(),values=snap?.enabled?snap.values||{}:{};
  if(/(hängend|overhead|über Kopf)/i.test(values.pose||'')&&/LED-Wand|Fassade/i.test(values.mount||''))warn.push('Check body pose vs. fixed wall; do not invent handheld LEDs.');
  if(snap?.enabled&&/Plakat vor Körper/i.test(values.pose||'')&&/oberhalb/i.test(values.relation||''))warn.push('Body pose and elevated display may be incompatible.');
  var lp=full.match(/Location:\s*([^\n]+)/),sg=values.venue;
  if(sg&&lp&&!lp[1].includes(sg))warn.push('Scene location differs from Signature venue: Signature wins.');
 }else{
  var w=window.stravaWall450?.get?.()||{};
  if(w.mode==='bpm')warn.push('Two original statistics screenshots (normal + BPM) must be supplied at generation; do not recreate data.');
  else warn.push('One original statistics screenshot must be supplied at generation.');
 }
 return {errors,warnings:warn,cam};
}
function commonHeaders(lines,cam){
 lines.push('CAMERA / OPTICS');
 lines.push('Focal: '+cam.lens+' mm full-frame; distance to runner: '+cam.distance+' m; format: '+cam.format+'.');
 lines.push('Camera height: '+cam.height+'; viewpoint: '+cam.view+'; location: '+cam.site+'; angle: '+cam.angle+'.');
 lines.push('OUTPUT / REALISM');
 lines.push('Exactly one native '+cam.format+' authentic documentary photograph; coherent scale, anatomy, hands, feet, lighting, shadows, mounts and perspective; no CGI or synthetic poster.');
}
function buildSign(full,ultra){
 var data=issues(full,false),cam=data.cam,t=exactText(full),colors=sourceColors(t),s=signatureFields(),l=[];
 commonHeaders(l,cam);
 l.push('LOCATION / SCENE');
 l.push(clean(line(full,'Location:'))||cam.site);
 if(!ultra){var view=line(full,'Viewpoint:');if(view)l.push('Atmosphere / view: '+view)}
 l.push('MAIN RUNNER / IDENTITY / POSE');
 l.push(identity(full));
 l.push('SHOE PHOTO: '+(line(full,'Use the separately attached SHOE PHOTO')||'Exact separately supplied shoes on both feet; no brand substitutions.'));
 var pose=clean(s.details.find(function(x){return x.startsWith('pose=')}))||line(full,'Pose:');
 if(pose)l.push('Pose and gaze: '+pose);
 var o=getOutfit(full);if(o)l.push('Outfit: '+o);
 l.push('CROWD / AUDIENCE');
 var crowd=line(full,'Audience:');if(crowd)l.push(crowd);
 l.push('Natural non-cloned crowd; preserve chosen count, attention, reactions, placements and sightlines; no blocking runner or sign.');
 l.push('SIGN / PLACARD / BANNER');
 l.push('All print/LED graphics sign-local centered, then map the complete flat graphic onto the physical display plane. Preserve mounts, sign format, original font, text geometry, colors, and selected edge margin.');
 var display=line(full,'SIGNATURE DISPLAY INSTALLATION:');if(display)l.push(display);
 l.push('Typography: '+typography());
 if(!ultra){
  var look=full.match(/DISPLAY MATERIAL AUTHORITY — (?:XXL LED SCREEN|PHYSICAL PRINT):[^\n]*/);
  if(look)l.push(look[0].replace(/DISPLAY MATERIAL AUTHORITY — /,'Material: ').slice(0,500));
 }
 if(s.details.length)l.push('ACTIVE SCENE SETTINGS: '+s.details.join('; '));
 if(s.custom.length)l.push('ACTIVE CUSTOM OVERRIDES (highest local priority): '+s.custom.join('; '));
 var premium=full.split('\n').filter(function(x){return x.includes('[original displayed value:')});
 if(premium.length)l.push('ACTIVE PREMIUM SETTINGS: '+premium.join(' | '));
 var active=signFields(full,ultra);
 active.filter(function(x){return /^(Legacy side-character details|Premium scene cast|Premium-selected figure appearance|Background ambience):/.test(x)}).forEach(function(x){l.push(x)});
 l.push('EXACT MESSAGE — DO NOT EDIT');
 l.push('<<< SIGN TEXT START >>>');
 l.push(t);
 l.push('<<< SIGN TEXT END >>>');
 l.push('EXACT PER-WORD COLORS — source-token order');
 l.push(colors);
 l.push('FINAL VALIDATION');
 l.push(ultra?'Match face and shoes, camera, 2D text/colors, one-plane perspective, real mounts, selected pose/crowd; never invent extras.':'Reference identity and shoes must match. Exact text, diacritics, layout, word colors and physical display plane must match the active source; naturally separate all limbs and keep sign legible. Manual camera and active custom overrides take precedence; report unresolvable conflicts.');
 return l.join('\n');
}
function buildWall(full,ultra){
 var x=issues(full,true),c=x.cam,w=window.stravaWall450?.get?.()||{},l=[];
 commonHeaders(l,c);
 l.push('LOCATION / SCENE');
 l.push('Place: '+(w.location||c.site)+'; wall: deep matte BLACK bricks with BLACK mortar, never gray or brown. '+(w.height||'')+'; '+(w.width||'')+' m; side '+(w.side||'')+'; wall angle '+(w.angle||'')+'; open space '+(w.space||'')+'.');
 l.push('MAIN RUNNER / IDENTITY / POSE');
 l.push('PERSON PHOTO: preserve exact reference face, pores, age, natural asymmetry and head. No beautification/reconstruction; SHOE PHOTO alone determines exact shoes on both feet.');
 l.push('Pose '+(w.pose||'')+'; gaze '+(w.gaze||'')+'; expression '+(w.mood||'')+'; rotation '+(w.runnerAngle||'')+'; position '+(w.runnerDepth||'')+', '+(w.runnerHorizontal||'')+', scale '+(w.runnerRelativeSize||'')+'. Anatomical contact and support must be real.');
 l.push('CROWD / AUDIENCE');
 l.push('Count '+str(w.crowd||0)+'; distribution '+(w.distribution||'')+'; natural irregular faces; do not obscure runner or source statistics.');
 l.push('SIGN / PLACARD / BANNER');
 l.push('BLACK BRICK WALL STATISTICS: '+(w.mode==='bpm'?'TWO source screenshots, original stats+BPM+GPS; STRAVA wordmark/shoe icon orange #FC4C02, statistics/icons LEFT grid, GPS route CENTERED.':'ONE normal Strava statistics screenshot, STATS ONLY; no BPM and no separate GPS.'));
 l.push('The original screenshots are authoritative for ALL numbers, labels, kerning, fonts, graph geometry, orange route and symbols. Only crop/uniform-scale/source-pixel perspective-map; NO OCR, redraw, hallucinated stats or synthetic typography. Pixel-perfect identity requires final source-pixel compositing.');
 l.push('Wall projection '+(w.projection||'')+'; statistics '+str(w.statsSize||'')+'% area at '+(w.placement||'')+'; GPS '+(w.mode==='bpm'?str(w.gpsSize)+'%':'OFF')+'; spacing '+(w.spacing||'')+'.');
 l.push('ACTIVE SETTINGS');
 var fields=wallFields();l.push(fields.join(ultra?'; ':'\n'));
 l.push('EXACT MESSAGE / SOURCE DATA');
 l.push(w.mode==='bpm'?'Use the original TWO attached STRAVA screenshots unchanged, no missing/added metrics.':'Use the original ONE attached STRAVA screenshot unchanged, no missing/added metrics.');
 l.push('FINAL VALIDATION');
 l.push('Match PERSON/SHOE references, original statistics pixels, exact GPS if active, black brick, natural perspective, anatomy and safe crowd; no invented metrics or logos.');
 return l.join('\n');
}
function calculate(){
 if(inBuild)throw Error('Compact engine re-entry');
 inBuild=true;
 try{
  var full=str(fullBuilder()),wall=state.world==='wall',smart=wall?buildWall(full,false):buildSign(full,false),ultra=wall?buildWall(full,true):buildSign(full,true),check=issues(full,wall);
  function verify(p,label){
   if(!p.startsWith('CAMERA / OPTICS'))check.errors.push(label+': camera header missing');
   if(!p.includes(check.cam.lens+' mm')||!p.includes(check.cam.distance+' m'))check.errors.push(label+': active camera not included');
   if(!wall){
    var text=exactText(full),colors=sourceColors(text);
    if(!p.includes(text))check.errors.push(label+': altered message text');
    if(!p.includes(colors))check.errors.push(label+': altered source word colors');
    var sig=signatureFields();
    sig.custom.forEach(function(x){if(!p.includes(x))check.errors.push(label+': active custom field omitted '+x.slice(0,35))});
    sig.details.forEach(function(x){if(!p.includes(x))check.errors.push(label+': active field omitted '+x.slice(0,35))});
   }else{
    wallFields().forEach(function(x){if(!p.includes(x))check.errors.push(label+': active wall setting omitted '+x.slice(0,35))});
   }
  }
  verify(smart,'SMART');verify(ultra,'ULTRA');
  return {full,smart,ultra,check};
 }finally{inBuild=false}
}
function selected(data){return mode==='FULL'?data.full:mode==='ULTRA COMPACT'?data.ultra:data.smart}
buildPrompt=function(){return selected(calculate())};
function lengths(d){var n=d.full.length||1;return {full:d.full.length,smart:d.smart.length,ultra:d.ultra.length,smartSaving:(100*(1-d.smart.length/n)).toFixed(1),ultraSaving:(100*(1-d.ultra.length/n)).toFixed(1)}}
function panel(){
 return '<section id="compactPanel4519" class="panel" style="border:1px solid #586374;padding:14px;margin:12px 0;border-radius:12px">'+
 '<h3>SMART COMPACT PROMPT ENGINE</h3><label for="compactMode4519">Prompt-Modus</label><select id="compactMode4519">'+MODES.map(function(x){return '<option value="'+x+'"'+(x===mode?' selected':'')+'>'+x+'</option>'}).join('')+'</select>'+
 '<div id="compactCounts4519" aria-live="polite" style="margin:10px 0"></div><div id="compactAudit4519" role="status" style="font-size:13px"></div>'+
 '<button id="compactCompare4519" type="button" class="btn secondary">Alle Modi vergleichen</button></section>';
}
function augment(){
 var wall=state.world==='wall',area=document.getElementById('view'),tab=state.tab;
 if(!area||(wall?tab!=='Prompt & Export':tab!=='Prompt'&&tab!=='Smart Director'))return;
 if(area.querySelector('#compactPanel4519'))return;
 var container=document.createElement('div');container.innerHTML=panel();
 var host=wall?document.getElementById('w450prompt'):(document.getElementById('promptText')||document.getElementById('signatureXXL400'));
 if(host&&host.parentElement){host.parentElement.insertBefore(container.firstElementChild,host)}else area.prepend(container.firstElementChild);
 var control=document.getElementById('compactMode4519'),counter=document.getElementById('compactCounts4519'),audit=document.getElementById('compactAudit4519'),preview=wall?document.getElementById('w450prompt'):document.getElementById('promptText');
 function update(){
  try{
   var d=calculate(),n=lengths(d),e=d.check.errors,warning=d.check.warnings;
   counter.textContent='FULL '+n.full+' Zeichen · SMART '+n.smart+' (−'+n.smartSaving+' %) · ULTRA '+n.ultra+' (−'+n.ultraSaving+' %)';
   audit.textContent=(e.length?'BLOCKIERT: '+e.join(' | '):'Prüfung: aktive Einstellungen und Quellen übernommen.')+(warning.length?' Hinweise: '+warning.join(' | '):'');
   audit.style.color=e.length?'#ff9a91':'#96dfb9';
   if(preview)preview.textContent=e.length?'PROMPT BLOCKIERT: '+e.join(' | '):selected(d);
  }catch(e){audit.textContent='Prompt-Prüfung fehlgeschlagen: '+e.message;audit.style.color='#ff9a91'}
 }
 control.onchange=function(){mode=this.value;try{localStorage.setItem(STORE,mode)}catch(e){}update()};
 document.getElementById('compactCompare4519').onclick=update;
 if(wall){
  ['w450generate','w450copy','w450download'].forEach(function(id){
   var btn=document.getElementById(id);if(!btn)return;
   btn.addEventListener('click',function(ev){
    ev.preventDefault();ev.stopImmediatePropagation();
    try{var d=calculate();if(d.check.errors.length)throw Error(d.check.errors.join(' | '));var p=selected(d);if(preview)preview.textContent=p;
      if(id==='w450copy'){navigator.clipboard.writeText(p).catch(function(e){audit.textContent='Copy failed: '+e.message})}
      if(id==='w450download'){var blob=new Blob([p],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='strava-run-'+mode.toLowerCase().replace(/\s+/g,'-')+'.txt';a.click();setTimeout(function(){URL.revokeObjectURL(url)},1000)}
    }catch(e){audit.textContent='Prompt exportiert NICHT: '+e.message}
   },true);
  });
 }
 update();
}
render=function(){var result=originalRender.apply(this,arguments);augment();return result};
window.stravaCompact4519={version:'V4.5.19',modes:MODES.slice(),getMode:function(){return mode},setMode:function(v){if(!MODES.includes(v))throw Error('Unknown mode');mode=v;try{localStorage.setItem(STORE,v)}catch(e){};augment()},generate:function(){return calculate()},metrics:function(){return lengths(calculate())},validate:function(){return calculate().check},full:function(){return fullBuilder()}};
augment();
})();
