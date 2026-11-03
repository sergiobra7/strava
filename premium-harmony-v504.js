/* BLACK SIGN V5.0.4 · Single-source Premium scene consistency and German copy path. */
(function(){
'use strict';
if(window.stravaPremiumHarmony504)return;
const originalEffective=window.stravaEffectiveScene390;
if(typeof originalEffective!=='function')return;
const clone=x=>JSON.parse(JSON.stringify(x));
const str=x=>String(x==null?'':x).trim();
const isSeated=x=>/^(Sitzen|Rückwärts sitzen)$/.test(str(x));
function normalize(input){
 const x={...input},sign=state.sign||{},physical=str(sign.signType)||'Freistehendes XXL-Plakat bis Boden';
 const mount=str(typeof window.stravaMounting416==='function'?window.stravaMounting416():sign.signMountDetail)||'Zur Anzeigenart passende sichtbare Befestigung';
 x.carrier=physical;x.display316=physical;x.hold=mount;x.format='9:16';
 x.position=str(sign.signPosition)||'Rechts';
 if(isSeated(x.pose)){
  if(x.pose==='Rückwärts sitzen')x.seat='Stuhl';
  else if(!str(x.seat)||x.seat==='Keine'||x.seat==='Automatisch')x.seat='stabile passende Sitzfläche';
 }else x.seat='Keine';
 if(x.cast==='Alleine'&&/Begleitperson|mit Opa|mit Teyze/i.test(str(x.action))){
  x.action='Ruhig die Botschaft betrachten';
 }
 x.companion=x.cast==='Alleine'?'Keine':x.cast;
 const audience=str(x.audience);
 if(/^(Keine|0|Ohne Publikum)$/i.test(audience)){
  x.audience='Keine';
  x.crowdLayout316='Keine gezielte Zuschauergruppe; allenfalls einzelne natürliche Passanten';
 }else x.crowdLayout316=str(x.crowdLayout316)||'Natürlich verteilt';
 x.title=str(x.place)+' · '+(x.cast==='Alleine'?'Solo':str(x.cast))+' · '+str(x.action);
 return x;
}
window.stravaEffectiveScene390=function(){
 const result=originalEffective.apply(this,arguments);
 if(!result||!result.effective)return result;
 return {...result,effective:normalize(result.effective)};
};
function diagnostics(){
 const failures=[],warnings=[];
 const current=originalEffective();
 if(current?.effective){
  const x=normalize(current.effective),s=state.sign||{};
  if(x.carrier!==str(s.signType))failures.push('Plakattyp nicht synchron');
  if(x.hold!==str(window.stravaMounting416?.()))failures.push('Montage nicht synchron');
  if(x.cast==='Alleine'&&/Begleitperson/i.test(x.action))failures.push('Solo-/Begleitpersonen-Konflikt');
  if(isSeated(x.pose)&&x.seat==='Keine')failures.push('Sitzpose ohne Sitzfläche');
  if(x.format!=='9:16')failures.push('Falsches Format');
 }
 const camera=window.stravaCameraBridge4531?.read?.();
 if(camera&&(!(Number(camera.lens)>0)||!(Number(camera.distance)>0)||camera.format!=='9:16'))failures.push('Ungültige Kamera');
 for(const [name,key] of [['Grundmatrix','stravaSmartSceneAudit311'],['Szenenmatrix','stravaPremiumScenesAudit380'],['Filtermatrix','stravaPremiumFilterAudit3166']]){
  const fn=window[key];if(typeof fn!=='function'){warnings.push(name+' nicht verfügbar');continue;}
  try{
   const a=fn();if(a.issues?.length)warnings.push(name+': '+a.issues.length+' Hinweise');if(a.problems?.length)warnings.push(name+': '+a.problems.length+' Hinweise');
  }catch(e){warnings.push(name+': Testfehler '+str(e.message))}
 }
 const groups=window.stravaDirectorMatrix502?.audit?.();
 if(groups&&!groups.ok)failures.push('Vier-Gruppen-Matrix unvollständig');
 return {pass:!failures.length,failures,warnings,scene:current?.effective||null,camera,groups};
}
function addGermanSceneFields(prompt,x){
 let output=str(prompt);
 if(!output.startsWith('Transformiere die Person aus dem beigefügten Gesichtsfoto'))throw Error('Deutscher Transformations-Prompt ist nicht aktiv.');
 if(!output.includes('05 · ORT, SZENE & HAUPTFIGUR')||!output.includes('06 · ZUSCHAUER & NEBENFIGUREN'))throw Error('Die vereinbarte 10-Punkte-Struktur fehlt.');
 const info=['- PREMIUM-Bereich: '+str(x.area)+'.','- Requisite: '+str(x.prop||'Keine')+'.'];
 if(isSeated(x.pose))info.push('- Verbindliche Sitzfläche: '+str(x.seat)+'.');
 output=output.replace('05 · ORT, SZENE & HAUPTFIGUR','05 · ORT, SZENE & HAUPTFIGUR\n'+info.join('\n'));
 const crowd=/^Keine$/i.test(str(x.audience))?'Keine gezielt versammelte Menschenmenge':'Gewählte Publikumsanordnung: '+str(x.crowdLayout316);
 output=output.replace('06 · ZUSCHAUER & NEBENFIGUREN','06 · ZUSCHAUER & NEBENFIGUREN\n- '+crowd+'.');
 return output;
}
function showStatus(message,ok){
 let node=document.getElementById('premiumHarmonyNotice504');
 if(!node){node=document.createElement('div');node.id='premiumHarmonyNotice504';node.setAttribute('role','status');node.style.cssText='position:fixed;left:12px;right:12px;bottom:24px;z-index:999999;padding:14px;border-radius:12px;background:#142b24;border:2px solid #41b882;color:#fff;font-weight:700;box-shadow:0 8px 24px #000b';document.body.appendChild(node);}
 node.style.borderColor=ok?'#41b882':'#ff9b69';node.textContent=message;
}
async function copy(text){
 if(navigator.clipboard?.writeText){try{await navigator.clipboard.writeText(text);return true}catch(e){}}
 const ta=document.createElement('textarea');ta.value=text;ta.style.cssText='position:fixed;top:10%;left:5%;width:90%;height:45vh;z-index:999999';document.body.appendChild(ta);ta.focus();ta.select();let ok=false;
 try{ok=!!document.execCommand('copy')}catch(e){}
 if(ok)ta.remove();
 return ok;
}
document.addEventListener('click',function(event){
 const button=event.target?.closest?.('#ps350 [data-ps-apply-copy]');
 if(!button)return;
 event.preventDefault();event.stopImmediatePropagation();
 const n=Number(button.dataset.psApplyCopy);
 const original=document.querySelector('#ps350 [data-ps-scene="'+n+'"]');
 if(!Number.isInteger(n)||n<0||n>9||!original){showStatus('PREMIUM-Szene nicht gefunden.',false);return;}
 try{
  original.click();
  const selected=window.stravaEffectiveScene390?.();
  if(!selected?.effective)throw Error('Szenenübernahme fehlgeschlagen');
  const x=selected.effective;
  const camera=window.stravaCameraBridge4531?.read?.();
  if(camera&&(!(Number(camera.lens)>0)||!(Number(camera.distance)>0)))throw Error('Kamerawerte ungültig');
  // Preserve the output of the existing German generator; do not append the legacy English priority block.
  const output=addGermanSceneFields(buildPrompt(),x);
  if(camera){
   const lensMatch=output.match(/Brennweite:\s*([\d.,]+)\s*mm/);
   const distanceMatch=output.match(/Kameraabstand zum Läufer:\s*([\d.,]+)\s*m/);
   if(lensMatch&&Math.abs(Number(lensMatch[1].replace(',','.'))-Number(camera.lens))>.01)throw Error('Brennweite stimmt nicht mit der Auswahl überein');
   if(distanceMatch&&Math.abs(Number(distanceMatch[1].replace(',','.'))-Number(camera.distance))>.01)throw Error('Kameraentfernung stimmt nicht mit der Auswahl überein');
  }
  copy(output).then(ok=>showStatus(ok?'✓ PREMIUM übernommen · deutscher Transformations-Prompt kopiert · '+output.length+' Zeichen':'Kopieren nicht erlaubt. Bitte Zwischenablage-Freigabe prüfen.',ok));
 }catch(err){showStatus('⚠ '+str(err?.message||err),false);console.error('PREMIUM Harmonisierung',err);}
},true);
window.stravaPremiumHarmony504={version:'V5.0.4',normalize,diagnostics,addGermanSceneFields};
})();