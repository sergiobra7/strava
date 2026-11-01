/* STRAVA WALL V4.5.0 — wall-only six-tab redesign. No BLACK SIGN code touched. */
(function(){
"use strict";
if(typeof state==="undefined"||typeof render!=="function"||typeof buildPrompt!=="function")return;
var NAMES=["Presets","Statistikmodus","Szene & Figuren","Wandarchitektur","Statistik & Projektion","Prompt & Export"];
var KEY="strava-wall-six-tabs-v450";
var defaults={mode:"bpm",location:"Breite Einkaufsstraße",lens:"24",distance:"20",pose:"Locker stehend",gaze:"Direkt in die Kamera",mood:"Locker",outfit:"PUMA Lime Green / Schwarz",opa:false,mantel:false,crowd:20,distribution:"Natürlich verstreut",height:"Mittelhoch (3–5 Etagen)",side:"Rechts",width:"30",angle:"Leicht schräg",surface:"Backstein",space:"Breit",placement:"Links",statsSize:75,gpsSize:70,projection:"Direkt auf der Fassade",spacing:"Ausgewogen",extra:""};
var cfg;try{cfg=Object.assign({},defaults,JSON.parse(localStorage.getItem(KEY)||"{}"))}catch(e){cfg=Object.assign({},defaults)}
var active="Presets";
function esc(x){return String(x==null?"":x).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function persist(){try{localStorage.setItem(KEY,JSON.stringify(cfg));if(typeof save==="function")save()}catch(e){console.warn("Wall settings not saved",e)}}
function input(k,label,type){return '<div class="field"><label>'+label+'</label><input data-w450="'+k+'" type="'+(type||"text")+'" value="'+esc(cfg[k])+'"></div>'}
function select(k,label,options){return '<div class="field"><label>'+label+'</label><select data-w450="'+k+'">'+options.map(function(o){return '<option value="'+esc(o)+'"'+(String(cfg[k])===String(o)?" selected":"")+'>'+esc(o)+'</option>'}).join("")+'</select></div>'}
function range(k,label,min,max){return '<div class="field"><label>'+label+': <b>'+cfg[k]+' %</b></label><input type="range" data-w450="'+k+'" min="'+min+'" max="'+max+'" step="5" value="'+cfg[k]+'"></div>'}
function toggle(k,label){return '<label class="check"><input type="checkbox" data-w450="'+k+'"'+(cfg[k]?" checked":"")+'> '+label+'</label>'}
function group(label,body,opened){return '<details class="panel" '+(opened?"open":"")+' style="margin-bottom:10px"><summary style="cursor:pointer;font-size:15px;font-weight:800">'+label+'</summary><div style="padding-top:14px">'+body+'</div></details>'}
function content(){
switch(active){
case "Presets":return '<section class="panel"><h2>Meine Presets · mit echter Bildvorschau</h2><div id="w450gallery" class="grid"></div><div class="field"><label>Presetname</label><input id="w450presetName" placeholder="Meine Inszenierung"></div><div class="field"><label>Ergebnisbild für die Vorschau</label><input id="w450presetImage" type="file" accept="image/*"><p class="hint">Optional: echtes fertiges Bild auswählen. Lokal gespeichert.</p></div><div class="actions"><button id="w450savePreset" class="btn">Preset speichern</button><button id="w450reset" class="btn secondary">Auf Standard zurücksetzen</button><button id="w450exportPresets" class="btn secondary">Presets sichern</button></div><div class="field" style="margin-top:12px"><label>Preset-Sicherung importieren</label><input id="w450importPresets" type="file" accept=".json,application/json"></div><div id="w450status" class="hint"></div></section>';
case "Statistikmodus":return '<section class="panel"><h2>Statistikmodus</h2><label class="check"><input type="radio" name="w450mode" value="bpm" '+(cfg.mode==="bpm"?"checked":"")+'> A · Statistik + BPM + Karte</label><label class="check"><input type="radio" name="w450mode" value="only" '+(cfg.mode==="only"?"checked":"")+'> B · Nur Statistik</label><div class="notice" style="margin-top:16px" id="w450modeInfo">'+(cfg.mode==="bpm"?"In ChatGPT: normale Strava-Statistik und BPM-Screenshot anhängen. Die Karte wird aus den vorhandenen Referenzen übernommen.":"In ChatGPT: nur den normalen Strava-Statistik-Screenshot anhängen.")+'</div><p class="hint">Keine Uploads im Generator. Die Auswahl steuert den Bildprompt.</p></section>';
case "Szene & Figuren":
var locations=["Breite Einkaufsstraße","Großer Marktplatz","Bahnhofsvorplatz","Bäckerei an breiter Straße","Markthalle mit Vorplatz","Einkaufspark-Promenade","Supermarkt-Eingang","Balkon 1. Stock","Balkon 2. Stock","Baustelle","Busbahnhof","Industriefassade an Platz","Dachterrasse","Freie Szene (Zusatzanweisung)"];
return group("1 · Szene & Kamera",select("location","Aufnahmeort",locations)+select("lens","Brennweite",["18","20","24","28","35","50"])+select("distance","Kameraabstand in m",["10","12","15","20","25","30","40"])+ '<p class="hint">Ausgabe: 9:16 Hochformat. Brennweite und Abstand sind verbindlich.</p>',true)+
group("2 · Hauptfigur",'<div class="notice">PERSON PHOTO: Identität 1:1. SHOE PHOTO: einzig verbindliche Schuhreferenz. Referenzbilder erst in ChatGPT anhängen.</div>'+select("outfit","Outfit",["PUMA Lime Green / Schwarz","Adidas Rot / Gelb","Eigenes Outfit (Zusatzanweisung)"])+select("pose","Pose",["Locker stehend","Chillig rückwärts auf Stuhl","Natürlich gehend","Laufbewegung","Lässig angelehnt","Arme verschränkt","Sitzend auf Treppe","Individuelle Pose (Zusatzanweisung)"])+select("gaze","Blickrichtung",["Direkt in die Kamera","Zur Statistik-Wand","Seitlich zur Umgebung"])+select("mood","Mimik",["Locker","Ernst","Frech"]),false)+
group("3 · Nebenfiguren",toggle("opa","Dorf-Opa aktivieren")+toggle("mantel","Mantelmann aktivieren")+'<p class="hint">Figuren nur bei Aktivierung im Prompt. Natürliche Pose und eindeutige Blickrichtung.</p>',false)+
group("4 · Publikum",'<div class="field"><label>Anzahl: '+cfg.crowd+'</label><input type="range" data-w450="crowd" min="0" max="40" step="5" value="'+cfg.crowd+'"></div>'+select("distribution","Verteilung",["Natürlich verstreut","Lockerer Halbkreis","Belebte Alltagsszene"])+'<p class="hint">Keine künstlichen Reihen, natürliche Gestik und Abstände; Statistik nicht verdecken.</p>',false);
case "Wandarchitektur":return '<section class="panel"><h2>Wandarchitektur</h2>'+select("height","Wandhöhe",["Niedrig (1–2 Etagen)","Mittelhoch (3–5 Etagen)","Monumental (6+ Etagen)"])+select("side","Wandseite",["Links","Zentral","Rechts"])+select("width","Wandbreite in m",["15","20","30","40","50"])+select("angle","Kamerawinkel zur Wand",["Frontal","Leicht schräg","Deutlich schräg"])+select("surface","Fassadenmaterial",["Backstein","Beton","Putzfassade","Industriefassade"])+select("space","Freiraum vor Wand",["Normal","Breit","Sehr breit"])+'</section>';
case "Statistik & Projektion":return '<section class="panel"><h2>Statistik & Projektion</h2>'+select("placement","Statistikposition",["Links","Mitte","Rechts"])+range("statsSize","Statistikgröße",40,95)+(cfg.mode==="bpm"?range("gpsSize","GPS-Streckengröße",40,100):"")+select("projection","Darstellungsart",["Direkt auf der Fassade","Realistische Lichtprojektion","Großflächiger Wanddruck"])+select("spacing","Elementabstand",["Kompakt","Ausgewogen","Großzügig"])+'<div class="notice">Originaldaten nicht erfinden, umschreiben oder überdecken. Ein Prompt allein garantiert keine pixelgenaue Montage.</div></section>';
case "Prompt & Export":return '<section class="panel"><h2>Prompt & Export</h2><div class="field"><label>Eigene Zusatzanweisungen</label><textarea data-w450="extra" id="w450extra">'+esc(cfg.extra)+'</textarea></div><div class="actions"><button id="w450generate" class="btn">Prompt erstellen</button><button id="w450copy" class="btn secondary">Prompt kopieren</button><button id="w450download" class="btn secondary">Als TXT exportieren</button></div><pre class="prompt" id="w450prompt" style="margin-top:12px"></pre></section>';
}return "";
}
function wallPrompt(){
var lines=[
"STRAVA WALL V4.5 — SIX TAB MASTER PROMPT",
"CAMERA SETTINGS — SINGLE AUTHORITATIVE SOURCE",
"FOCAL LENGTH: "+cfg.lens+" mm full-frame equivalent",
"CAMERA DISTANCE: "+cfg.distance+" m from runner",
"IMAGE FORMAT: native 9:16 portrait",
"OUTPUT: Exactly one ultra-photorealistic documentary photograph; natural anatomy, light and perspective; no CGI.",
"PERSON PHOTO: preserve exact facial identity, eyes, eyebrows, nose, lips, jaw, beard, pores, asymmetry, age, head size and natural anatomy. No beautification, no face redesign. Transform it 1:1.",
"SHOE PHOTO: use the separately attached shoe reference as sole authority for both feet; exact model, silhouette, colors, logos, laces and sole.",
"STATISTICS MODE: "+(cfg.mode==="bpm"?"WITH BPM + MAP. Expect TWO Strava screenshots attached in ChatGPT: regular run statistics and BPM statistics. Preserve available GPS map from supplied reference.":"STATISTICS ONLY. Expect ONE normal Strava statistics screenshot attached in ChatGPT. No BPM chart and no separate GPS map."),
"STRAVA REFERENCE LOCK: preserve visible original numbers, pace, distance, time, labels, chart paths and GPS geometry; do not invent, alter, redraw or fabricate data. Exact source-pixel fidelity cannot be guaranteed in generative output; if precise fidelity is mandatory, composite original screenshots.",
"SCENE: "+cfg.location+". Natural real-world location with visible context.",
"RUNNER: "+cfg.pose+"; gaze "+cfg.gaze+"; expression "+cfg.mood+"; outfit "+cfg.outfit+".",
"SIDE FIGURES: "+(cfg.opa?"natural elderly village man; ":"")+(cfg.mantel?"coat-wearing man; ":"")+(!cfg.opa&&!cfg.mantel?"none":"")+".",
"CROWD: "+cfg.crowd+" people; "+cfg.distribution+"; varied natural gestures, irregular spacing, no artificial lines, no obstruction of statistics.",
"FACADE: "+cfg.height+", "+cfg.width+" m wide; wall on image "+cfg.side+"; "+cfg.angle+"; surface "+cfg.surface+"; foreground space "+cfg.space+".",
"WALL STATISTICS: position "+cfg.placement+"; size "+cfg.statsSize+"% of usable wall; "+cfg.projection+"; spacing "+cfg.spacing+".",
cfg.mode==="bpm"?"GPS MAP SCALE: "+cfg.gpsSize+"% of planned GPS region.":"GPS MAP: not applicable.",
"Perspective-correct statistics on a physically coherent wall. Keep all readable statistics visible.",
"No flags, religious symbols/buildings, fake logos, extra text or invented measurements.",
cfg.extra?"USER ADDITIONAL INSTRUCTIONS (cannot override identity, camera or statistics locks): "+cfg.extra:""
];return lines.filter(Boolean).join("\n\n");
}
var prevRender=render,prevPrompt=buildPrompt,prevTabs=tabs;
tabs=function(){return state.world==="wall"?NAMES.slice():prevTabs()};
render=function(){
if(state.world!=="wall"){prevRender();return}
if(!NAMES.includes(active))active="Presets";
state.tab=active;
document.querySelectorAll(".world").forEach(function(b){b.classList.toggle("active",b.dataset.world===state.world)});
document.getElementById("tabs").innerHTML=NAMES.map(function(n){return '<button class="tab '+(n===active?"active":"")+'" data-w450tab="'+esc(n)+'">'+esc(n)+'</button>'}).join("");
document.getElementById("view").innerHTML=content();
document.querySelectorAll("[data-w450tab]").forEach(function(el){el.onclick=function(){active=el.dataset.w450tab;render()}});
document.querySelectorAll("[data-w450]").forEach(function(el){function change(){cfg[el.dataset.w450]=el.type==="checkbox"?el.checked:el.type==="range"?Number(el.value):el.value;persist();if(el.type!=="textarea"&&el.type!=="text")render()}el.addEventListener(el.type==="range"?"input":"change",change);if(el.tagName==="TEXTAREA")el.addEventListener("input",change)});
document.querySelectorAll('input[name="w450mode"]').forEach(function(el){el.onchange=function(){cfg.mode=el.value;persist();render()}});
if(active==="Prompt & Export"){
var pre=document.getElementById("w450prompt");pre.textContent=wallPrompt();
document.getElementById("w450generate").onclick=function(){pre.textContent=wallPrompt()};
document.getElementById("w450copy").onclick=function(){pre.textContent=wallPrompt();navigator.clipboard.writeText(pre.textContent).catch(function(){})};
document.getElementById("w450download").onclick=function(){downloadText("strava-wall-prompt-v450.txt",wallPrompt(),"text/plain")};
}
if(active==="Presets")initPresets();
};
buildPrompt=function(){return state.world==="wall"?wallPrompt():prevPrompt()};
function downloadText(name,content,type){var u=URL.createObjectURL(new Blob([content],{type:type||"application/json"}));var a=document.createElement("a");a.href=u;a.download=name;a.click();setTimeout(function(){URL.revokeObjectURL(u)},1000)}
var PRESETKEY="strava-wall-presets-v450";
function getPresets(){try{return JSON.parse(localStorage.getItem(PRESETKEY)||"[]")}catch(e){return []}}
function setPresets(items){localStorage.setItem(PRESETKEY,JSON.stringify(items))}
function initPresets(){
var status=document.getElementById("w450status");
function report(s){status.textContent=s}
function redraw(){var root=document.getElementById("w450gallery");root.innerHTML=getPresets().map(function(p){return '<div class="panel" style="padding:10px">'+(p.image?'<img src="'+esc(p.image)+'" style="width:100%;aspect-ratio:4/5;object-fit:cover;border-radius:8px">':'<div style="aspect-ratio:4/5;background:#242c36;border-radius:8px;display:grid;place-items:center;color:#a7b0bc">Kein Ergebnisbild</div>')+'<b>'+esc(p.name)+'</b><div class="actions"><button class="btn secondary" data-preset-load="'+esc(p.id)+'">Laden</button><button class="btn secondary" data-preset-update="'+esc(p.id)+'">Aktualisieren</button><button class="btn ghost" data-preset-delete="'+esc(p.id)+'">Löschen</button></div></div>'}).join("")||'<p class="hint">Noch keine Presets gespeichert.</p>';
root.querySelectorAll("[data-preset-load]").forEach(function(b){b.onclick=function(){var p=getPresets().find(function(p){return p.id===b.dataset.presetLoad});if(p){cfg=Object.assign({},defaults,p.settings);persist();render()}}});
root.querySelectorAll("[data-preset-update]").forEach(function(b){b.onclick=function(){var all=getPresets(),p=all.find(function(p){return p.id===b.dataset.presetUpdate});if(p){p.settings=Object.assign({},cfg);var name=document.getElementById("w450presetName").value.trim();if(name)p.name=name;setPresets(all);redraw();report("Preset-Einstellungen aktualisiert")}}});
root.querySelectorAll("[data-preset-delete]").forEach(function(b){b.onclick=function(){if(confirm("Preset wirklich löschen?")){setPresets(getPresets().filter(function(p){return p.id!==b.dataset.presetDelete}));redraw()}}});
}
redraw();
document.getElementById("w450savePreset").onclick=async function(){
var file=document.getElementById("w450presetImage").files[0],name=document.getElementById("w450presetName").value.trim()||"Preset "+(getPresets().length+1),image="";
if(file){try{image=await thumbnail(file)}catch(e){report("Vorschaubild konnte nicht verarbeitet werden");return}}
var all=getPresets();all.push({id:String(Date.now())+Math.random().toString(36).slice(2),name:name,image:image,settings:Object.assign({},cfg)});
try{setPresets(all);redraw();report("Preset mit Einstellungen gespeichert")}catch(e){report("Speicher voll. Presets bitte sichern und alte Bilder entfernen.")}
};
document.getElementById("w450reset").onclick=function(){if(confirm("Einstellungen auf Standard zurücksetzen? Presets bleiben erhalten.")){cfg=Object.assign({},defaults);persist();render()}};
document.getElementById("w450exportPresets").onclick=function(){downloadText("strava-wall-presets-v450.json",JSON.stringify(getPresets()),"application/json")};
document.getElementById("w450importPresets").onchange=async function(){try{var data=JSON.parse(await this.files[0].text());if(!Array.isArray(data)||data.some(function(p){return !p||typeof p.name!=="string"||!p.settings}))throw Error("Ungültiges Format");setPresets(data);redraw();report("Presets importiert")}catch(e){report("Importfehler: "+e.message)}};
}
function thumbnail(file){return new Promise(function(resolve,reject){var img=new Image(),url=URL.createObjectURL(file);img.onload=function(){try{var c=document.createElement("canvas"),w=320,h=400;c.width=w;c.height=h;var scale=Math.max(w/img.width,h/img.height),sw=w/scale,sh=h/scale;c.getContext("2d").drawImage(img,(img.width-sw)/2,(img.height-sh)/2,sw,sh,0,0,w,h);resolve(c.toDataURL("image/jpeg",.72))}catch(e){reject(e)}finally{URL.revokeObjectURL(url)}};img.onerror=reject;img.src=url})}
if(state.world==="wall"){active=NAMES.includes(state.tab)?state.tab:"Presets";render()}
window.stravaWall450={tabs:NAMES.slice(),get:function(){return Object.assign({},cfg)},prompt:wallPrompt,version:"V4.5.0"};
})();