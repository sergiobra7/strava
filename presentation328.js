/* V3.1.28 neutral supermarket presentation controls */
(function(){
'use strict';
const props={
'Keine Zusatzrequisite':['Bestehende Haltung beibehalten'],
'Breites niedriges Holzpodest':['Stehend, beide Fuesse fest auf Podest, Plakat ueber Kopf','Stehend, Plakat vor Brust'],
'Holzstuhl':['Sitzend rueckwaerts, Plakat bodengestuetzt','Sitzend normal, Plakat daneben'],
'Stabile Holzkiste':['Stehend auf breiter Kiste, Plakat ueber Kopf','Sitzend, Plakat abgestuetzt'],
'Niedrige breite Treppenstufe':['Stehend, Plakat ueber Kopf','Stehend, Plakat vor Brust'],
'Barhocker':['Sitzend, Plakat auf Boden abgestuetzt'],
'Sessel':['Sitzend, Tafel auf Staender daneben'],
'Rednerpodest':['Stehend, Plakat vor Brust','Stehend, Plakat ueber Kopf'],
'Einkaufswagen mit Werbetafel':['Hinter Wagen, Haende am Griff','Neben Wagen, auf Text zeigen'],
'Marktstand mit Textfront':['Hinter Stand, auf Text zeigen'],
'Bodentafel mit Standfuss':['Neben Tafel, Hand an Oberkante','Neben Tafel, auf Text zeigen']
};
const scenes=['Neutraler Supermarktparkplatz','Neutraler Supermarkteingang','Neutrale Einkaufswagenzone','Neutraler Parkplatz am Abend','Neutrale Parkplatzrandzone'];
const esc=x=>String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const cfg=()=>{let s=state.sign258||(state.sign258={});return s.presentation328||(s.presentation328={enabled:false,prop:'Keine Zusatzrequisite',pose:'Bestehende Haltung beibehalten',parking:false,scene:scenes[0],lens:'28 mm'});};
const sel=(id,arr,value)=>'<select id="'+id+'" style="width:100%;padding:10px;background:#151b23;color:white;border:1px solid #647182;border-radius:8px">'+arr.map(v=>'<option value="'+esc(v)+'" '+(v===value?'selected':'')+'>'+esc(v)+'</option>').join('')+'</select>';
function draw(){
 if(state.world!=='sign')return;
 let host=document.getElementById('premiumPanel270')||document.getElementById('view');if(!host)return;
 let box=document.getElementById('presentation328');if(!box){box=document.createElement('details');box.id='presentation328';box.style.cssText='margin:14px 0;padding:14px;background:#1b242d;border:2px solid #fc4c02;border-radius:12px;color:white';host.prepend(box);}
 let c=cfg(),open=box.open;if(!props[c.prop])c.prop='Keine Zusatzrequisite';let poses=props[c.prop];if(!poses.includes(c.pose))c.pose=poses[0];
 box.innerHTML='<summary style="font-size:17px;font-weight:800;cursor:pointer">PRAESENTATION & NEUTRALE SUPERMARKT-SZENEN</summary><div style="padding-top:12px"><label style="display:block;margin:10px 0"><input type="checkbox" id="p328on" '+(c.enabled?'checked':'')+'> Praesentationsfilter aktivieren</label><label>Gegenstand</label>'+sel('p328prop',Object.keys(props),c.prop)+'<label>Passende Haltung</label>'+sel('p328pose',poses,c.pose)+'<label style="display:block;margin:12px 0"><input type="checkbox" id="p328parking" '+(c.parking?'checked':'')+'> Neutrale Supermarktkulisse aktivieren</label><label>Parkplatz-Szene</label>'+sel('p328scene',scenes,c.scene)+'<label>Leichter Weitwinkel</label>'+sel('p328lens',['24 mm','28 mm','35 mm'],c.lens)+'<p style="font-size:12px;color:#cbd3da">Ohne aktive Filter bleiben bestehende Szenen und Haltungen erhalten. Keine realen Supermarktmarken oder Logos.</p></div>';box.open=open;
 const bind=(id,key,check)=>{let el=document.getElementById(id);if(el)el.onchange=()=>{c[key]=check?el.checked:el.value;if(key==='prop')c.pose=props[c.prop][0];save();let y=scrollY;render();scrollTo(0,y);};};
 bind('p328on','enabled',true);bind('p328prop','prop');bind('p328pose','pose');bind('p328parking','parking',true);bind('p328scene','scene');bind('p328lens','lens');
}
let oldRender=render;render=function(){oldRender();draw()};
let oldPrompt=buildPrompt;buildPrompt=function(){
 let p=oldPrompt();if(state.world!=='sign')return p;let c=cfg();if(!c.enabled)return p;
 p+='\n\n=== REALISTIC PRESENTATION OVERRIDE ===\n';
 if(c.prop!=='Keine Zusatzrequisite')p+='Selected prop: '+c.prop+'. Selected pose: '+c.pose+'. Override incompatible prior prop and body pose descriptions. Correct hand grip, physical weight, contact, stable support, coherent light and shadows. Chair is sitting-only. Do not float, paste, composite or distort the sign. Keep exact user text and colors.\n';
 if(c.parking)p+='NEUTRAL GROCERY STORE PARKING SCENE: '+c.scene+'. Camera suggestion: '+c.lens+'. Override conflicting background locations. Show a plausible anonymous grocery store with parking bays, shopping carts, glass entrance and real architectural depth in the background. STRICTLY NO REAL BRAND NAMES, TRADEMARKS, STORE LOGOS OR IMITATION LOGOS anywhere on building, signage, carts, uniforms or props. No implied corporate endorsement. The store must be an integral photographed building, not a pasted background. Keep runner and sign clearly visible in foreground. Preserve manually chosen runner identity, outfit, exact sign text and colors.\n';
 return p;
};
document.addEventListener('DOMContentLoaded',draw);draw();
})();