/* STRAVA RUN V3.2.0 — modular presentation, locations and physical compatibility */
(function(){
'use strict';
const C={
media:['Bestehendes XXL-Plakat','XXL-Protestschild','Freistehende XXL-Tafel','Bodenplakat','Holzrahmen-Plakat','Kundenstopper','Roll-up-Banner','Mobiles LED-Display','Bauzaunbanner','Werbeanhaenger','Einkaufswagen-Plakat','Lastenrad-Werbetafel','Marktstand-Werbefront','Schaufensterbanner','Rednerpult-Tafel','Litfasssaeule','Mobile Werbetafel','Panorama-Banner','XXL-Schwenkfahne','Rechteckige Bannerfahne','Querbanner mit zwei Stangen','Beachflag XXL','Balkonfahne','Dachterrassenfahne','Fahnenrucksack','Doppelfahne','Grosse Haengefahne','Auslegerfahne'],
prop:['Keine Zusatzrequisite','Alter Holzstuhl','Stabiler Holzhocker','Barhocker','Alter Sessel','Breite Holzkiste','Niedriges Holzpodest','Kleines Rednerpodest','Breite Treppenstufe','Parkbank','Niedrige Steinplattform','Breiter Betonblock','Stabile Holzplattform','Einkaufswagen','Marktstand','Reisekoffer','Altes Moped','Fahrrad','Lastenrad','Kleine Buehnenplattform','Einzelner alter Holzbalken','Zwei gestapelte Holzbalken','Massiver Baumstamm','Verwitterter Balkenstapel','Rustikale Balkenbank','Alte Holzbohlen','Zwei senkrechte Holzbalken','Balken vor alter Scheune','Alter Holzbalken im Dorfhof','Verwitterter Holzrahmen'],
height:['Kein erhoehter Standort','Balkon 1. Stock','Balkon 2. Stock','Balkon 3. Stock','Alter Wohnhausbalkon','Traditioneller Holzbalkon','Grosse Dachterrasse','Dachterrasse mit Stadtpanorama','Dachterrasse eines Cafes','Parkhaus-Oberdeck','Buerogebaeude-Terrasse','Wohnblock-Innenhofbalkon','Aussengang eines Wohnhauses','Bahnhofsgalerie','Einkaufspassage obere Galerie','Breite Gebaeudetreppe','Erhoehter Treppenabsatz','Aussichtsterrasse','Terrasse ueber einem Laden','Hotelbalkon','Innenhof mit mehreren Balkonen'],
market:['Neutraler Supermarktparkplatz','Neutraler Supermarkteingang','Neutrale Einkaufswagenzone','Parkplatzmitte','Parkplatzrand','Parkplatz am Abend','Parkplatz bei Regen','Parkplatz am Morgen','Neutrale breite Glasfront','Neutrale Filiale mit Aussentreppe'],
pose:['Automatisch passend','Stehend, Plakat ueber Kopf','Stehend, Plakat vor Brust','Stehend, auf Botschaft zeigen','Sitzend, Plakat bodengestuetzt','Rueckwaerts auf Stuhl sitzend','Sitzend auf Holzbalken','Hinter Werbemittel stehend','Neben Werbemittel stehend','Beide Haende an Fahnenstange','Hinter Balkongelaender stehend','Auf stabilem Podest stehend'],
mount:['Automatisch physikalisch passend','Beide Haende','Bodenstuetze','Stabiler Standfuss','Beschwerter Standfuss','Mast mit Querarm','Geländerbefestigung','Tragfaehiger Holzrahmen','Wagenbefestigung','Zwei Haltestangen'],
wind:['Windstill','Leichter Wind','Maessiger Wind'],fabric:['Glatt gespannt','Leicht gespannt','Locker fallend'],
weathering:['Leicht gealtert','Stark verwittert','Jahrzehnte im Freien','Extrem rissig und vermoost'],
crowd:['Bestehende Figuren beibehalten','Keine Zuschauer','Passanten unten','Nachbarn gegenueber','Zuschauer auf Balkonen','Gemischte Zuschauer mit Reaktionen'],
camera:['Automatisch szenengerecht','Strassenniveau, leichte Untersicht','Gegenueberliegendes Gebaeude','Gleiche Ebene, frontal','Innenhof, leichte Untersicht'],
lens:['Automatisch','24 mm','28 mm','35 mm']
};
const defaults={mediaOn:false,media:C.media[0],propOn:false,prop:C.prop[0],heightOn:false,height:C.height[0],marketOn:false,market:C.market[0],poseOn:false,pose:C.pose[0],mount:C.mount[0],wind:C.wind[0],fabric:C.fabric[0],weathering:C.weathering[2],crowdOn:false,crowd:C.crowd[0],cameraOn:false,camera:C.camera[0],lens:C.lens[0]};
function config(){let s=state.sign258||(state.sign258={});return s.master320||(s.master320={...defaults});}
function escapeHtml(x){return String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
const groups=[
 ['mediaOn','WERBEMITTEL','media','Werbemittel'],
 ['propOn','GEGENSTAND & ALTES HOLZ','prop','Gegenstand'],
 ['heightOn','ERHOEHTE STANDORTE','height','Standort'],
 ['marketOn','NEUTRALE SUPERMARKT-KULISSEN','market','Kulisse'],
 ['poseOn','KOERPERHALTUNG','pose','Haltung'],
 ['crowdOn','PUBLIKUM','crowd','Reaktionen'],
 ['cameraOn','KAMERAPERSPEKTIVE','camera','Perspektive']
];
function draw(){
 if(state.world!=='sign')return;
 const premium=document.getElementById('premiumPanel270');if(!premium||!premium.parentNode)return;
 const host=premium.parentNode;
 let box=document.getElementById('master320'),c=config();
 if(!box){box=document.createElement('details');box.id='master320';box.style.cssText='margin:12px 0 18px;border:2px solid #fc4c02;border-radius:14px;padding:14px;background:#202630;color:#fff';host.append(box);}
 if(box.nextElementSibling!==premium)host.insertBefore(box,premium);
 let wasOpen=box.open;
 const select=(key,label)=>'<label style="display:block;margin:9px 0 5px">'+label+'</label><select data-m320="'+key+'" style="width:100%;padding:10px;border-radius:8px;background:#10151c;color:white;border:1px solid #667">'+C[key].map(v=>'<option '+(c[key]===v?'selected':'')+'>'+escapeHtml(v)+'</option>').join('')+'</select>';
 let html='<summary style="font-weight:800;font-size:17px;cursor:pointer">MASTER-INSZENIERUNG V3.2.3 · BALKONE & DACHTERRASSEN</summary><p style="font-size:12px;color:#d0d5db">Jeder Bereich ist einzeln abschaltbar. Bestehende Premium-Szenen, Text, Outfit und Figuren bleiben erhalten.</p>';
 for(let [on,title,key,label] of groups)html+='<div style="padding:9px;margin:9px 0;border:1px solid #48515d;border-radius:10px"><label style="display:flex;align-items:center;gap:9px"><input type="checkbox" data-m320="'+on+'" '+(c[on]?'checked':'')+' style="width:18px;height:18px"> <b>'+title+'</b></label>'+select(key,label)+'</div>';
 html+='<div style="padding:9px;border:1px solid #48515d;border-radius:10px"><b>DETAILS & PHYSIK</b>'+select('mount','Befestigung / Halterung')+select('wind','Fahnen-Wind')+select('fabric','Stoffspannung')+select('weathering','Holz-Verwitterung')+select('lens','Brennweite (nur ohne manuelle Kamera)')+'</div>';
 html+='<p style="font-size:12px;color:#cbd5e1">Keine echten Supermarktmarken oder Logos. Keine Personen auf Geländern, morschen Balken oder instabilen Stühlen. Unpassende Posen werden im Prompt physikalisch angepasst; deine Text- und Outfitwerte bleiben unberuehrt.</p>';
 box.innerHTML=html;box.open=wasOpen;
 box.querySelectorAll('[data-m320]').forEach(el=>el.onchange=()=>{let key=el.dataset.m320;c[key]=el.type==='checkbox'?el.checked:el.value;save();let y=scrollY;render();scrollTo(0,y);});
}
const prevRender=render;render=function(){prevRender();draw();};
const prevPrompt=buildPrompt;buildPrompt=function(){
 let p=prevPrompt();if(state.world!=='sign')return p;
 const c=config();if(!groups.some(g=>c[g[0]]))return p;
 let out=['\n\n=== V3.2.0 MASTER PRESENTATION DIRECTOR — FINAL SCENE PRIORITY ===','Retain exact manually entered sign text, line breaks, red/white word colors, maximum readable typography, runner identity, PUMA outfit, cap, original selected figures and all other unrelated settings. The following activated choices override only conflicting location, prop, pose or presentation descriptions. Treat all objects as physical real-world objects photographed together with coherent perspective, light, scale, contact shadows and real mechanical supports. Never composite a fake billboard onto a photograph.'];
 if(c.mediaOn)out.push('PHYSICAL MESSAGE CARRIER: '+c.media+'. Present full original sign text on one flat readable surface, safely within the frame. Mounting: '+c.mount+'. Fabric tension: '+c.fabric+'. Wind: '+c.wind+'. For long text use a taut supported fabric/banner, not a flapping distorted flag. Any frame, mast, support and fastening must be visible and physically plausible.');
 if(c.propOn&&c.prop!==C.prop[0])out.push('PROP: '+c.prop+'. Weathering: '+c.weathering+'. Aged timber is rough, cracked, grey, mossy, decades outdoors, naturally resting on ground. If supporting a person or banner, the load-bearing core and joints must be structurally sound. Provide clear feet/seat contact, stable placement, plausible grip and shadows. No standing on an ordinary chair or rotten timber.');
 if(c.heightOn&&c.height!==C.height[0])out.push('ELEVATED LOCATION: '+c.height+'. The person stands fully BEHIND a realistic safe balcony/roof/terrace guardrail or on a wide stable landing, never on railing or edge. If a hanging banner is selected, mount it to suitable structure with realistic visible attachments; no unsupported weight or dangerous protrusion. Show credible view from street or courtyard below.');
 if(c.marketOn)out.push('ANONYMOUS GERMAN GROCERY STORE BACKGROUND: '+c.market+'. Include plausible building, glass entrance, cart shelter, parked vehicles, road markings and natural depth. STRICTLY NO real retailer names, logos, brand colors or imitation trademarks; no suggestion of sponsorship. If elevated location is also enabled, show the neutral store from the elevated viewpoint rather than teleporting the subject to the parking lot.');
 if(c.poseOn)out.push('SELECTED BODY POSE: '+c.pose+'. Adjust only if incompatible with the chosen carrier or location. Standing and sitting require stable support; hands grip real load-bearing edges or pole; avoid extra limbs and floating boards. If the selected pose requires a chair but none is selected, include a sturdy chair as necessary physical support. Explain the adjustment through the resulting visual composition.');
 if(c.crowdOn)out.push('BACKGROUND AUDIENCE: '+c.crowd+'. Realistic distance, subtle authentic reactions, no staged identical poses, avoid distracting from legible main text.');
 if(c.cameraOn)out.push('SCENE CAMERA: '+c.camera+'. Lens suggestion: '+c.lens+'. If manual camera controls are enabled in existing settings, those user-entered controls take precedence over this suggestion. Ensure full readable banner and safe architectural geometry.');
 out.push('COMBINATION PRIORITY: For balcony plus flag use secured balcony banner; for roof plus board use weighted freestanding stand; for aged timber plus seated person use sound broad stable timber; for supermarket plus shopping cart attach board to cart; for large long copy prefer rigid board or taut banner. Never silently alter the user original text, sign colors, identity, outfit or camera manual values.\n=== END MASTER PRESENTATION DIRECTOR ===');
 return p+out.join('\n');
};
draw();
})();