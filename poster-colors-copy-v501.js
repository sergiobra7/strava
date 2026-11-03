/* BLACK SIGN · Plakatfarben als eigenständigen Zusatzauftrag kopieren. */
(function(){
'use strict';
function generate(){
 const sign=(typeof state!=='undefined'&&state.sign)||{};
 const input=document.getElementById('posterText321');
 const source=input?input.value:String(sign.signText||'');
 if(!source.trim())throw new Error('Bitte zuerst Plakattext eingeben.');
 const base=(document.getElementById('posterColor321')?.value||sign.signColor||'#FFFFFF').toUpperCase();
 const bg=(document.getElementById('posterBg321')?.value||'#000000').toUpperCase();
 const font=document.getElementById('posterFont321')?.value||'Impact';
 const margin=document.getElementById('posterMargin4517')?.value||'7';
 const tokens=source.split(/(\s+)/);
 const rows=[''];let num=0;let colored=0;
 tokens.forEach((token,i)=>{
   if(!token)return;
   if(/^\s+$/.test(token)){for(const ch of token)if(ch==='\n')rows.push('');return;}
   const active=(sign.wordColors||{})[i];
   if(active)colored++;
   const hex=String(active||base).toUpperCase();
   rows[rows.length-1]+=(rows[rows.length-1]?' ':'')+'['+(++num)+'|'+token+'|'+hex+']';
 });
 return [
 'PLAKATTEXT & WORTFARBEN – VERBINDLICHER ZUSATZAUFTRAG',
 'Übernimm in deinem eigenständigen Transformationsbild ausschließlich die folgende Plakatbeschriftung. Die übrige Szene, Person, Kleidung, Kamera und Pose werden durch deinen separaten Hauptauftrag bestimmt.',
 '',
 'ORIGINALTEXT – ZEILENUMBRÜCHE UND LEERZEILEN EXAKT BEIBEHALTEN:',
 '<<< PLAKATTEXT >>>',source,'<<< ENDE PLAKATTEXT >>>',
 '',
 'EXAKTE WORTFARBEN (WORTINDEX | ORIGINALWORT | HEX-FARBE):',
 ...rows.map((r,i)=>'ZEILE '+(i+1)+': '+(r||'[LEERZEILE]')),
 '',
 'PLAKATGESTALTUNG:',
 '- Hintergrundfarbe: '+bg+'. Standard-Textfarbe: '+base+'.',
 '- Schriftart: '+font+'. Zentrierung: jede Zeile auf derselben horizontalen Mittelachse.',
 '- Randabstand: '+margin+' % an den Seiten, sofern im Hauptauftrag nicht ausdrücklich anders vorgegeben.',
 '- Übernimm die Hex-Farbe jedes einzelnen Wortes exakt. Unmarkierte Wörter erhalten die Standard-Textfarbe.',
 '- Keine Übersetzung, Umformulierung, zusätzlichen Wörter, entfernten Leerzeilen oder geänderten Satzzeichen.',
 '- Diese Angaben betreffen ausschließlich die Schrift und ihre Farben auf dem Plakat, nicht die sonstige Bildgestaltung.'
 ].join('\n');
}
function mount(){
 if(typeof state==='undefined'||state.world!=='sign')return;
 const root=document.getElementById('poster321');
 if(!root||root.querySelector('#posterCopyColors501'))return;
 const host=document.createElement('section');
 host.id='posterCopyColors501';
 host.style.cssText='margin:16px 0;padding:14px;border:1px solid #69cf9b;border-radius:12px;background:#111b19';
 const title=document.createElement('h3');title.textContent='PLAKATTEXT & WORTFARBEN · SEPARAT KOPIEREN';
 const info=document.createElement('p');info.className='hint';info.textContent='Kopiert nur deinen Text, alle Zeilenumbrüche, Originalfarben und die Plakat-Typografie – ohne BLACK-SIGN-Szene.';
 const button=document.createElement('button');button.type='button';button.className='btn';button.id='posterColorsCopyButton501';button.style.cssText='width:100%;min-height:52px;background:#16875b';button.textContent='PLAKAT-FARB-PROMPT KOPIEREN';
 const status=document.createElement('p');status.className='hint';status.setAttribute('role','status');
 const preview=document.createElement('textarea');preview.readOnly=true;preview.rows=7;preview.setAttribute('aria-label','Separater Plakat-Farb-Prompt');preview.style.cssText='margin-top:8px;font-size:12px;white-space:pre-wrap;min-height:110px';
 preview.value='Zum Anzeigen und Kopieren den Button drücken.';
 button.onclick=async function(){
  let output;try{output=generate();preview.value=output}catch(e){status.textContent='⚠ '+e.message;return}
  try{
   if(!navigator.clipboard?.writeText)throw new Error('Zwischenablage nicht verfügbar');
   await navigator.clipboard.writeText(output);
   status.textContent='✓ Separater Plakat-Farb-Prompt kopiert · '+output.length+' Zeichen';
  }catch(e){
   preview.focus();preview.select();preview.setSelectionRange(0,output.length);
   const ok=document.execCommand('copy');
   status.textContent=ok?'✓ Plakat-Farb-Prompt kopiert':'Bitte den Text im Feld markieren und kopieren.';
  }
 };
 host.append(title,info,button,status,preview);
 const colorAudit=root.querySelector('#posterColorAudit321');
 if(colorAudit)colorAudit.insertAdjacentElement('afterend',host);else root.appendChild(host);
}
const oldRender=typeof render==='function'?render:null;
if(oldRender)render=function(){const result=oldRender.apply(this,arguments);mount();return result};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
window.stravaPosterColors501={generate,mount,version:'V5.0.1'};
})();