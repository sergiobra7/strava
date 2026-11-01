/* STRAVA WALL V4.3.2 · ASF active final Wall source. BLACK SIGN untouched. */
(function(){
'use strict';
const KEYS=['facade','version','side','angle','width','runnerClearance','statsSafeArea','projection','runnerPose','scene','variant','statsPosition','routeScaleB','wallNote'];
const moods={
 Humorvoll:'Candid smiles, restrained laughter and organic side conversations.',
 Provokant:'Realistic skepticism, debate and natural open-hand gestures without staged outrage.',
 Natürlich:'Calm, believable everyday observation and diverse restrained expressions.'
};
const val=x=>String(x??'').trim();
function props(p){
 const s=val(p).toLowerCase(),result=[];
 if(/stuhl|sessel|hocker/.test(s))result.push('one real stable chair/stool with anatomically sound seated pose');
 if(/trepp|stufe/.test(s))result.push('real existing wide stairs/step with safe foot support');
 if(/bank/.test(s))result.push('real stable bench');
 if(/geländer|brüstung/.test(s))result.push('real load-bearing railing');
 if(/mauer|wand|fassade/.test(s))result.push('solid existing wall/ledge, separate from projected metrics');
 if(/flasche/.test(s))result.push('one realistic handheld running bottle');
 if(/mofa/.test(s))result.push('one stationary moped');
 return result.length?result:['no extra chair, ledge, stage or prop required'];
}
function effective(x){
 const c=x.common||{},w=x.wall||{},d=x.director||{};
 const pose=d.mainFreeMode==='Ersetzen'&&val(d.mainFreePose)?val(d.mainFreePose):val(c.runnerCustom)||val(w.runnerPose);
 return {c,w,d,pose,scene:sceneData[Number(w.scene)]};
}
function validate(x){
 const {c,w,pose,scene}=effective(x),errors=[],warnings=[];
 if(!scene)errors.push('invalid scene');
 if(!Object.hasOwn(moods,w.variant))errors.push('invalid variant');
 if(!pose)errors.push('missing pose');
 for(const k of ['facade','version','side','angle','runnerClearance','statsSafeArea','projection','statsPosition'])if(!val(w[k]))errors.push('missing '+k);
 for(const k of ['width','routeScaleB'])if(!Number.isFinite(Number(w[k]))||Number(w[k])<=0)errors.push('invalid '+k);
 if(!Number.isFinite(Number(c.cameraLens))||Number(c.cameraLens)<15||Number(c.cameraLens)>120)errors.push('invalid cameraLens');
 if(!Number.isFinite(Number(c.personDistance))||Number(c.personDistance)<=0)errors.push('invalid personDistance');
 if(!val(c.format))errors.push('missing format');
 if(scene&&val(scene[2])!==val(w.runnerPose))warnings.push('Manual runner pose overrides scene suggestion');
 if(/trepp|stufe/i.test(pose)&&w.statsPosition==='Mittig an der Fassade')warnings.push('Keep stairs and statistics on separate physical surfaces');
 return {pass:!errors.length,errors,warnings};
}
function figures(x){
 const c=x.common||{},d=x.director||{},all=d.sides||[],active=all.filter(f=>f&&f.enabled);
 if(all.length)return active.length?['Only explicitly enabled director figures appear.'].concat(active.map((f,i)=>'CHARACTER '+(i+1)+': '+[f.type,f.style,f.pose,f.reaction,f.target,f.gesture,f.prop,f.freePose,f.freeAction,f.freeReaction].filter(val).join(' | '))):['Solo runner; all director side characters disabled.'];
 const a=[];
 if(c.opaVisible)a.push('Older man: '+[c.opaStyle,c.opaPose,c.opaReaction,c.opaCustom].filter(val).join(' | '));
 if(c.teyzeVisible)a.push('Older woman: '+[c.teyzeStyle,c.teyzePose,c.teyzeReaction,c.teyzeCustom].filter(val).join(' | '));
 if(c.colleagueVisible)a.push('Colleague: '+[c.colleaguePose,c.colleagueReaction,c.colleagueCustom].filter(val).join(' | '));
 return a.length?['Only enabled legacy side characters appear.',...a]:['Solo runner; no other character required.'];
}
function build(x){
 const {c,w,d,scene,pose}=effective(x),a=validate(x);
 if(!a.pass)throw Error('ASF WALL: '+a.errors.join(' | '));
 const face=typeof window.stravaFaceIdentity258==='function'?val(window.stravaFaceIdentity258()):'Preserve exact facial identity from PERSON PHOTO, without beautification or change.';
 const lines=[
 'STRAVA WALL V4.3.2 — FINAL WALL-ONLY MASTER PROMPT',
 'ONE native '+val(c.format)+' ultra-photorealistic documentary running photograph; no CGI.',
 'CAMERA SETTINGS — SINGLE AUTHORITATIVE SOURCE: '+val(c.cameraLens)+' mm full-frame lens; '+val(c.personDistance)+' m camera-to-runner. Format '+val(c.format)+'. Do not read older lens/distance fields.',
 'PERSON PHOTO IDENTITY LOCK: '+face,
 'Real-life runner height 178 cm, natural head/body proportions; never transform original face.',
 'SHOE PHOTO: exact supplied shoe model and colors on BOTH feet; outfit brand never substitutes shoe photo.',
 'OUTFIT: '+[c.brand,c.collection,c.top,c.topColorName272||c.topColor,c.topColorHex272||c.topColorHex,c.pants,c.pantsColorName272||c.pantsColor,c.cap,c.socks,c.watch,c.customOutfit].filter(val).join(' | ')+'. Preserve selected logos and natural fabric.',
 'LOCATION: '+val(c.locationNote||'Real public environment')+'. '+(c.backgroundLock?'Preserve supplied LOCATION PHOTO architecture and perspective if attached.':'Use physically plausible surroundings.'),
 ...KEYS.map(k=>'WALL FIELD '+k+': '+(k==='runnerPose'?pose:k==='scene'?String(w.scene)+' — '+scene[0]:k==='wallNote'?val(w[k])||'(none)':val(w[k]))),
 'SCENE CONTEXT: '+scene[1]+'. Scene is context only; manual runner pose and explicitly enabled cast have priority.',
 'SELECTED MOOD: '+moods[w.variant],
 'POSE AUTHORITY: '+pose+'. Genuine body anatomy, realistic individual hands, gaze '+val(c.gaze)+' and expression '+val(c.expression)+'. User-defined pose replaces incompatible dropdown pose.',
 'PHYSICAL PROPS REQUIRED: '+props(pose).join(' | ')+'. Do not invent inappropriate support objects.',
 'WALL PROJECTION AUTHORITY: GPS trace, metric blocks and labels all follow the same single physical wall-plane perspective. Keep the '+val(w.statsSafeArea)+' safe area and scale selected GPS trace at '+val(w.routeScaleB)+'%. No floating data, duplicated wall artwork or invented numeric running statistics.',
 'COMPOSITION: Facade '+val(w.facade)+'; location on '+val(w.side)+' side; view '+val(w.angle)+'; width '+val(w.width)+' m; runner clearance '+val(w.runnerClearance)+'; stats placement '+val(w.statsPosition)+'. Prevent runner or other actors from covering key data.',
 'Only physically necessary props. No unnecessary wall-seating pose, chairs, staged crowds, flags or religious iconography.',
 ...figures(x)
 ];
 if(val(d.mainFreeAction))lines.push('USER-DIRECTED ACTION: '+val(d.mainFreeAction));
 if(val(d.mainFreeReaction))lines.push('USER-DIRECTED REACTION: '+val(d.mainFreeReaction));
 return lines.join('\n');
}
function audit(x){
 const check=validate(x),errors=[...check.errors];let prompt='';
 if(check.pass){
  try{prompt=build(x)}catch(e){errors.push(String(e.message||e))}
  for(const k of KEYS)if(!prompt.includes('WALL FIELD '+k+':'))errors.push('missing prompt field '+k);
  if(!prompt.includes('CAMERA SETTINGS — SINGLE AUTHORITATIVE SOURCE: '+val(x.common.cameraLens)))errors.push('camera not synchronized');
  if(/EXACT SIGN TEXT AND LINE BREAKS:|Word color map:|BLACK SIGN \/ PLAKAT/.test(prompt))errors.push('BLACK SIGN leakage');
 }
 return {pass:!errors.length,errors,warnings:check.warnings,fields:KEYS.length,prompt};
}
function matrix(){
 const defaults={facade:'Mittelhoch (empfohlen)',version:'A',side:'Rechts',angle:'Deutlich schräg (25–35°)',width:'30',runnerClearance:'Breiter Sicherheitsabstand (empfohlen)',statsSafeArea:'Mindestens 12 % freie Wandfläche rund um alle Daten',projection:'Gemeinsame perspektivische Wandprojektion (Pflicht)',statsPosition:'Wand frei halten; erste Statistikzeile sichtbar',routeScaleB:'70',wallNote:''};
 const results=[];
 for(let i=0;i<sceneData.length;i++)for(const variant of Object.keys(moods)){
  const x={wall:{...defaults,runnerPose:sceneData[i][2],scene:i,variant},common:{cameraLens:'24',personDistance:'15',format:'9:16'},director:{sides:[]}};
  const r=audit(x);results.push({scene:i+1,variant,pass:r.pass,errors:r.errors});
 }
 return {total:results.length,passed:results.filter(r=>r.pass).length,failures:results.filter(r=>!r.pass),missingPoses:sceneData.filter(s=>!poses.includes(s[2])).map(s=>s[0]),results};
}
const before=buildPrompt;
buildPrompt=function(){return state.world==='wall'?build(state):before.apply(this,arguments)};
window.stravaWallASF432={build,audit,matrix,validate,props,version:'V4.3.2'};
document.addEventListener('click',e=>{
 if(!e.target.closest('#wallAudit432')||state.world!=='wall')return;
 const status=document.getElementById('wallAuditStatus432');if(!status)return;
 const m=matrix(),a=audit(state);
 status.textContent='Szenen '+m.passed+'/'+m.total+' · Aktueller Prompt '+(a.pass?'ASF OK':'ASF Fehler: '+a.errors.join(' | '))+(a.warnings.length?' · '+a.warnings.join(' | '):'');
});
})();
