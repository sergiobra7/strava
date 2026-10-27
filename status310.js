/* STRAVA V3.1.0 — shared cast, natural background, live status. */
(function(){
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const conf=()=>{state.sign258=state.sign258||{};return state.sign258};
const crowd=()=>!!conf().forceAudience277;
const cast=()=>((state.director&&state.director.sides)||[]).filter(f=>f.enabled);
const background=()=>conf().background310||'Normal';
function mount(){
 const top=document.getElementById('tabs');if(!top)return;
 let box=document.getElementById('status310');
 if(!box){box=document.createElement('section');box.id='status310';box.style.cssText='margin:10px 18px;padding:12px;border:2px solid #fc4c02;border-radius:12px;background:#191d24;color:#eee;font-size:14px';top.parentNode.insertBefore(box,top);}
 const names=cast().map(f=>f.type).join(', ')||'Keine';
 const mode=state.world==='sign'?(conf().activeSceneSource267||'Normal'):'STRAVA WALL';
 const premium=state.premium290||state.sceneCore290||{};
 const scene=state.world==='sign'?(conf().activeSceneSource267==='premium'?(premium.title||'Premium-Szene'):(conf().activeSceneSource267==='standard'?'Normal-Szene':'Szene')):'Wand-Szene';
 const summary=(state.world==='sign'?'BLACK SIGN':'STRAVA WALL')+' · '+mode+' · '+scene+' · '+cast().length+' Nebenfigur(en) · Masse '+(crowd()?'EIN':'AUS')+' · Hintergrund '+background();
 box.innerHTML='<strong>LIVE STATUS · AKTIVE EINSTELLUNGEN</strong><div style="margin:8px 0;line-height:1.5">'+esc(summary)+'</div><details><summary style="cursor:pointer;color:#ff845c">Alle aktiven Einstellungen anzeigen</summary><div style="margin-top:8px">Figuren: '+esc(names)+'<br>Menschenmasse: '+(crowd()?'EIN':'AUS')+'<br>Hintergrundleben: '+esc(background())+'<br>Bildformat: '+esc(state.common?.format||'')+'<br>Zuletzt geändert: '+esc(conf().lastChange310||'—')+'</div></details>';
 if(state.world!=='sign')return;
 const view=document.getElementById('view');if(!view)return;
 const heading=[...view.querySelectorAll('h2,h3,summary')].find(x=>/NORMAL · FIGURENREGIE|PREMIUM/i.test(x.textContent||''));
 let host=document.getElementById('background310');
 if(!host&&heading){host=document.createElement('div');host.id='background310';host.style.cssText='padding:12px;margin:12px 0;border:1px solid #fc4c02;border-radius:10px';heading.parentNode.insertAdjacentElement('afterend',host);}
 if(host){host.innerHTML='<label style="display:block;font-weight:bold;margin-bottom:6px">NATÜRLICHES HINTERGRUNDLEBEN</label><select id="bgSelect310" style="width:100%;padding:12px;background:#111;color:white;border:1px solid #777;border-radius:7px">'+['Aus','Wenig','Normal','Viel'].map(x=>'<option '+(background()===x?'selected':'')+'>'+x+'</option>').join('')+'</select><small>Alltagspassanten beschäftigen sich mit ihrem Alltag; keine Zuschauergruppe.</small>';host.querySelector('select').onchange=e=>{conf().background310=e.target.value;conf().lastChange310='Hintergrundleben: '+e.target.value;save();mount();};}
}
const oldRender=render;render=function(){oldRender();mount()};
const oldPrompt=buildPrompt;buildPrompt=function(){
 let p=oldPrompt();if(state.world!=='sign')return p;
 const people=cast(),enabled=crowd(),bg=background();
 const directives='\n\n=== V3.1.0 AUTHORITATIVE CAST AND BACKGROUND OVERRIDE ===\n'+
 'MANUAL CAST OVERRIDES ALL NORMAL, PREMIUM AND CROWD SCENE TEMPLATES. Only the main runner and the '+people.length+' explicitly enabled named side character(s) may act as featured figures.\n'+
 people.map((f,i)=>'FEATURED SIDE CHARACTER '+(i+1)+': '+f.type+'; POSE '+(f.freePose||f.pose||'natural')+'; EXPRESSION '+(f.freeReaction||f.reaction||'natural')+'; GESTURE '+(f.gesture||'natural')+'; ACTION '+(f.freeAction||'none')+'; GAZE '+(f.target||'natural')+'; POSITION '+(f.outfit258?.position||'automatic')+'; PROP '+(f.prop||'none')).join('\n')+'\n'+
 'REACTING CROWD: '+(enabled?'ON — allow the explicitly configured audience':'OFF — NO reacting audience, no spectators, no crowd focused on the poster, regardless of Premium description')+'\n'+
 'AMBIENT BACKGROUND LIFE: '+bg+'. '+(bg==='Aus'?'No background passersby.':'Authentic incidental passersby engaged in venue-appropriate daily activities; they must NOT react to the poster or become an audience.')+'\n'+
 'Existing Premium scene is used for LOCATION, ARCHITECTURE, CAMERA and COMPOSITION only when its prescribed people conflict with this manual cast. Never add extra featured characters.\n=== END V3.1.0 OVERRIDE ===';
 return p+directives;
};
document.addEventListener('change',e=>{if(e.target&&e.target.matches('[data-bs-enabled],[data-normalfigure300],#normalCrowd300,[data-bs-sidebase],[data-bs-side]')){conf().lastChange310='Figurenregie';setTimeout(mount,50)}},true);
render();
})();