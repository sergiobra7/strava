/* V2.8.0 — event-scoped scene matrix, 50 distinct scene compositions per event type. */
(function(){
'use strict';
const EVENTS=[
 ['Bäckerei & Café','Bäckerei','Verkaufstresen','Schaufenster','Außenterrasse','Warteschlange','Eingangsbereich'],
 ['Bahnhof & Verkehr','Bahnhofsvorplatz','Bahnhofshalle','Bahnhofstreppe','Busbahnhof','Bahnhofspassage'],
 ['Supermarkt & Einkauf','Supermarkteingang','Einkaufswagenzone','Marktpassage','Kassenbereich','Parkplatz-Fußweg'],
 ['Sport & Laufveranstaltung','Stadionvorplatz','Marathon-Zielbereich','Laufmesse','Parklauf-Treffpunkt','Sporthallen-Vorplatz'],
 ['Arbeit & Büro','Bürovorplatz','Jobmesse','Pendlerplatz','Betriebshof-Fußweg','Business-Promenade'],
 ['Stadt & Öffentlichkeit','Marktplatz','Fußgängerzone','Rathausplatz','Stadtpromenade','Brunnenplatz'],
 ['Gastronomie & Restaurant','Restaurantterrasse','Restaurantvorplatz','Imbissbereich','Café-Vorplatz','Gastgarten'],
 ['Bildung & Campus','Universitätsvorplatz','Campusplatz','Bibliotheksvorplatz','Mensa-Vorplatz','Hochschul-Promenade'],
 ['Gesundheit & Alltag','Ärztehaus-Vorplatz','Apothekenstraße','Gesundheitsmesse','Klinikvorplatz','Reha-Veranstaltungsplatz'],
 ['Kultur & Veranstaltung','Kinovorplatz','Festivalzugang','Museumsplatz','Theatervorplatz','Stadtfestplatz'],
 ['Handwerk & Baustelle','Baustellen-Fußweg','Werkstattvorplatz','Baumarkt-Vorplatz','Gewerbehof','Materialausgabe'],
 ['Park & Freizeit','Parkeingang','Uferpromenade','Stadtparkweg','Freizeitanlage','Aussichtsplattform']
];
const ACTIONS=[
 ['Rückwärts auf stabilem Stuhl, Unterarme getrennt auf Lehne','Am Stuhl sicher befestigtes frontales XXL-Plakat','Fassungslos auf das Plakat schauen','Stuhl'],
 ['Stabiler Stand, XXL-Plakat mit beiden Händen über Kopf','Leichtes frontales XXL-Plakat mit sicheren Griffen','Laut und sichtbar lachen','Über Kopf'],
 ['Stehend neben freistehendem XXL-Plakat, offene Handfläche','Frontales XXL-Plakat auf standsicherem Fuß','Mit offenen Händen protestieren','Freistehend'],
 ['Sitzend auf vorhandener niedriger Bank, Hände auf Oberschenkeln','Frontales XXL-Plakat unmittelbar neben der Bank auf Ständer','Sich untereinander ungläubig ansehen','Bank'],
 ['Stehend mit beiden Händen an seitlichen Plakatgriffen','Frontales XXL-Plakat auf Brusthöhe','Erschrocken innehalten','Brusthöhe'],
 ['An vorhandene niedrige Mauer angelehnt, Arme locker','Frontales XXL-Plakat auf sicherem eigenständigem Ständer','Diskutieren und auf das Plakat blicken','Mauer'],
 ['Stabiler Stand hinter frontalem Plakat mit freiem Gesicht','Frontales XXL-Plakat auf sicherer Halterung','Kopfschüttelnd reagieren','Ständer'],
 ['Auf breiter vorhandener Stufe sitzend, Unterarme auf Knien','Frontales XXL-Plakat seitlich auf standsicherer Halterung','Überrascht die Hände heben','Stufe'],
 ['Seitlich neben frontalem Plakat stehend, eine Hand offen','Frontales XXL-Plakat auf niedriger sicherer Staffelei','Ungläubig stehen bleiben','Staffelei'],
 ['Auf feststehendem Hocker sitzend, Oberkörper aufrecht','Frontales XXL-Plakat vor dem Hocker auf eigenem Fuß','Mit offenen Handflächen lachen','Hocker']
];
const REACTIONS=['Fassungslos','Lachen','Empörung','Diskussion','Überraschung'];
const MODES=['standard','crowd','premium'];
function store(){state.sign258=state.sign258||{};return state.sign258.matrix280=state.sign258.matrix280||{event:0,mode:'standard',reaction:'Alle',prop:'Alle',rotation:0,selected:null};}
function escapeHTML(v){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\x27':'&#39;'}[c]));}
function make(e,i){const a=ACTIONS[i%10],loc=EVENTS[e][1+Math.floor(i/10)],variant=Math.floor(i/10),reaction=REACTIONS[(i+variant)%5];return {id:e*50+i,event:e,index:i,title:EVENTS[e][0].toUpperCase()+' · '+loc.toUpperCase()+' · '+(i+1),location:loc,pose:a[0],sign:a[1],reaction,prop:a[3],audience:'15–40 Personen VOR Läufer und Plakat auf der Kameraseite, mindestens 15 klar erkennbare Menschen',mode:MODES[(i+e)%3],detail:'Situation '+(variant+1)+' am '+loc+'. '+a[2]+'. Hauptfigur bleibt statisch. Schild steht exakt frontal zur Kamera; Zuschauer reagieren auf den tatsächlichen Plakattext.'};}
const ALL=EVENTS.flatMap((_,e)=>Array.from({length:50},(_,i)=>make(e,i)));
function candidates(){const f=store();return ALL.filter(c=>c.event===Number(f.event)&&(f.reaction==='Alle'||c.reaction===f.reaction)&&(f.prop==='Alle'||c.prop===f.prop));}
function panel(){const f=store(),items=candidates(),start=(Number(f.rotation)||0)%Math.max(1,items.length);const rotated=items.slice(start).concat(items.slice(0,start));const selected=ALL.find(c=>c.id===f.selected);if(selected&&!rotated.some(c=>c.id===selected.id)&&selected.event===Number(f.event))rotated.unshift(selected);
 const opts=(list,value)=>list.map(x=>'<option value="'+escapeHTML(x)+'" '+(x===value?'selected':'')+'>'+escapeHTML(x)+'</option>').join('');
 return '<section id="matrix280" style="border:2px solid #fc4c02;border-radius:14px;padding:14px;background:#181d25;margin:14px 0"><h3 style="color:#ff8755">INTELLIGENTE SZENENMATRIX · V2.8.0</h3><p>12 Ereignisarten × 50 Szenen = 600 konkrete Szenen. Ereignis, Reaktion und Requisite werden gemeinsam geprüft. Die Auswahl bleibt gespeichert.</p><div style="display:flex;flex-wrap:wrap;gap:10px"><label style="flex:1 1 180px">Ereignisart<select id="matrixEvent280" style="width:100%">'+EVENTS.map((x,i)=>'<option value="'+i+'" '+(Number(f.event)===i?'selected':'')+'>'+escapeHTML(x[0])+' (50)</option>').join('')+'</select></label><label style="flex:1 1 140px">Reaktion<select id="matrixReaction280" style="width:100%">'+opts(['Alle',...REACTIONS],f.reaction)+'</select></label><label style="flex:1 1 140px">Requisite<select id="matrixProp280" style="width:100%">'+opts(['Alle',...new Set(ACTIONS.map(a=>a[3]))],f.prop)+'</select></label></div><p style="color:#ff925d"><b>'+items.length+' passende Szenen</b> · keine gegensätzlichen Ereignisarten</p><div id="matrixCards280" style="display:grid;gap:9px">'+rotated.slice(0,10).map(c=>'<button type="button" data-matrix280="'+c.id+'" aria-pressed="'+(f.selected===c.id)+'" style="text-align:left;border:3px solid '+(f.selected===c.id?'#fc4c02':'#465261')+';background:'+(f.selected===c.id?'#33251f':'#242b34')+';color:#fff;border-radius:10px;padding:12px"><strong>'+escapeHTML(c.title)+'</strong><br><small>Handlung: '+escapeHTML(c.pose)+'<br>Plakat: '+escapeHTML(c.sign)+'<br>Publikum: '+escapeHTML(c.reaction)+' · '+escapeHTML(c.detail)+'</small></button>').join('')+'</div><button type="button" id="matrixMore280" class="btn" style="margin-top:12px">10 WEITERE PASSENDE SZENEN</button></section>';
}
function apply(c){const f=store(),z=state.sign258,p=z.premium270||(z.premium270={});f.selected=c.id;z.activeSceneSource267='matrix';z.activeSceneId267=c.id;z.location=c.location;z.crowdSelected267=null;z.crowdDescription267='';p.open=false;p.title='';p.description='';if(!z.manualSignPose284){state.sign.runnerPose=c.pose;state.sign.signType=c.sign;z.signMount=c.sign;}save();render();}
const priorRender=render;
render=function(){priorRender();if(state.world!=='sign'||state.tab!=='Smart Director')return;const v=document.getElementById('view');if(!v)return;const nav=v.querySelector('[data-smartsub267="crowd"]');if(!nav)return;const row=nav.parentElement;row.style.cssText+=';display:flex;flex-wrap:wrap;gap:8px;width:100%';const premium=document.getElementById('premiumTab270');if(premium)row.appendChild(premium);
 const outer=row.parentElement;outer.style.display='flex';outer.style.flexDirection='column';
 const matrix=document.createElement('div');matrix.innerHTML=panel();outer.insertAdjacentElement('afterend',matrix);
 const f=store();for(const [id,key] of [['matrixEvent280','event'],['matrixReaction280','reaction'],['matrixProp280','prop']]){const el=document.getElementById(id);if(el)el.onchange=()=>{f[key]=key==='event'?Number(el.value):el.value;f.rotation=0;save();render();};}
 document.querySelectorAll('[data-matrix280]').forEach(b=>b.onclick=()=>apply(ALL[Number(b.dataset.matrix280)]));
 const more=document.getElementById('matrixMore280');if(more)more.onclick=()=>{f.rotation+=10;save();render();};
 const source=state.sign258.activeSceneSource267;const p=state.sign258.premium270||{};const mode=p.open?'premium':state.sign258.smartSubtab267||'standard';
 for(const el of [...row.querySelectorAll('[data-smartsub267]'),...(premium?[premium]:[])]){const active=(el===premium?mode==='premium':el.dataset.smartsub267===mode);el.style.background=active?'#fc4c02':'#303845';el.style.border=active?'3px solid #fc4c02':'2px solid #485261';el.setAttribute('aria-pressed',String(active));}
};
const priorPrompt=buildPrompt;
buildPrompt=function(){let base=priorPrompt();if(state.world!=='sign'||state.sign258?.activeSceneSource267!=='matrix')return base;const f=store(),c=ALL.find(x=>x.id===f.selected);if(!c)return base;
 base=base.replace(/^(\[REG-01\] SCENE: ).*$/m,'$1'+c.title).replace(/^(\[REG-02\] LOCATION \/ ORT: ).*$/m,'$1'+c.location).replace(/^(\[REG-03\] MAIN RUNNER \/ POSE: ).*$/m,'$1'+(state.sign258.manualSignPose284?'MANUAL SIGN POSE — PRIORITY':c.pose));
 base=base.replace(/\n\n=== V2\.6\.9 ADDITIVE SITUATION DIRECTOR ===[\s\S]*?=== END V2\.6\.9 ===/g,'');
 const name=String(state.sign258.bakeryName276||'').trim(),bakery=c.event===0&&name;const exact=bakery?(state.sign258.bakeryNameMode276==='suffix'&&!/bäckerei/i.test(name)?name+' Bäckerei':name):'';
 if(exact)base=base.replace(/^(\[REG-02\] LOCATION \/ ORT: ).*$/m,'$1'+exact);
 return base+'\n\n=== ACTIVE SCENE MATRIX V2.8.0 — AUTHORITATIVE ===\nEVENT: '+EVENTS[c.event][0]+'\nSCENE: '+c.title+'\nLOCATION: '+c.location+'\nSTATIC ACTION: '+c.pose+'\nSIGN: '+c.sign+'\nCROWD REACTION: '+c.reaction+'; '+c.audience+'\nSCENE DETAIL: '+c.detail+(exact?'\nBAKERY NAME (ONLY FOR BAKERY EVENT): '+exact:'')+'\nMANUAL CAMERA, GAZE, OUTFIT, FACE, SHOE AND SIGN-POSE SETTINGS OVERRIDE AUTOMATIC SCENE DIRECTING. No walking or moving poses. All scene directions from previously selected cards are inactive.\n=== END ACTIVE SCENE MATRIX ===';
};
})();
