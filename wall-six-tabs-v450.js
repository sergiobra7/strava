/* STRAVA WALL V4.5.6 — full BLACK SIGN Smart Director venue catalog copied into wall-only selector */
(function(){
"use strict";
if(typeof state==="undefined"||typeof render!=="function"||typeof buildPrompt!=="function")return;
var NAMES=["Presets","Statistikmodus","Szene & Kamera","Hauptfigur","Nebenfiguren","Wandarchitektur","Statistik & Projektion","Prompt & Export"];
var KEY="strava-wall-six-tabs-v450";
var defaults={mode:"bpm",scenario:"0",location:"Breite Einkaufsstraße",lens:"24",distance:"20",pose:"Auf Bank sitzend, Beine locker nach vorne",gaze:"Direkt in die Kamera",mood:"Ernst",outfit:"PUMA Lime Green / Schwarz",opa:true,mantel:false,crowd:20,distribution:"Natürlich verstreut",height:"Mittelhoch (3–5 Etagen)",side:"Rechts",width:"30",angle:"Leicht schräg",surface:"Schwarzer Backstein",space:"Breit",placement:"Links",statsSize:75,gpsSize:70,projection:"Direkt auf der Fassade",spacing:"Ausgewogen",extra:""};
var cfg;try{cfg=Object.assign({},defaults,JSON.parse(localStorage.getItem(KEY)||"{}"))}catch(e){cfg=Object.assign({},defaults)}
var active="Presets";
var outfitDefaults={brand:"PUMA",club:"Kein Verein",collection:"Training",top:"Full-Zip-Laufjacke",topColor:"Neon Gelbgrün (#DFFF00)",topColorHex:"#DFFF00",topDetails:"Keine Ärmelstreifen",topLogo:"Schwarzes PUMA-Logo links auf der Brust",zipColor:"Schwarz",pants:"Lange Trainingshose, regulärer Schnitt",pantsColor:"Schwarz",pantsLogoColor:"#DFFF00",cap:"Rote Cap rückwärts",socks:"Schwarz",watch:"COROS PACE Pro, schwarz, Display aus",customOutfit:""};
var opaDefaults={opaAge:"75–85 Jahre",opaBuild:"Schlank und drahtig",opaHead:"Dunkle Schiebermütze",opaBeard:"Markanter grauer Schnurrbart",opaClothing:"Braunes Cord-Sakko, kariertes Hemd, Stoffhose",opaShirt:"Braun-blau kariert",opaPants:"Dunkle, weite Stoffhose",opaShoes:"Abgetragene braune Lederschuhe",opaPose:"Auf abgestelltem alten Mofa, ein Fuß am Boden",opaGaze:"Zum Läufer",opaReaction:"Ungläubig",opaProfile:"OPA 01 · Klassisch",opaCustom:""};
var fullDefaults=Object.assign({},defaults,outfitDefaults,opaDefaults);
var migrationKey="strava-wall-v452-default-migration";
if(!localStorage.getItem(migrationKey)){
 if(cfg.top==="Longsleeve"&&cfg.topColor==="COROS Lime Green (Gelbgrün)"&&!cfg.topColorHex){cfg.top="Full-Zip-Laufjacke";cfg.topColor="Rot";}
 // Respect an existing user choice to disable the Opa; fresh/default profiles enable him.
 try{localStorage.setItem(migrationKey,"1")}catch(e){}
}
cfg=Object.assign({},fullDefaults,cfg);cfg.surface="Schwarzer Backstein";
var migration453="strava-wall-v453-photo-outfit-default-migration";
try{
 if(!localStorage.getItem(migration453)){
  // Only migrate the former complete factory outfit; customized WALL outfits are untouched.
  var oldFactory=(cfg.brand==="PUMA"&&cfg.club==="Kein Verein"&&cfg.collection==="Training"&&cfg.top==="Full-Zip-Laufjacke"&&cfg.topColor==="Rot"&&!cfg.topColorHex&&cfg.pants==="Laufshorts"&&cfg.pantsColor==="Schwarz"&&cfg.cap==="Rote Cap rückwärts"&&cfg.socks==="Schwarz"&&cfg.watch==="COROS PACE Pro, schwarz, Display aus"&&!cfg.customOutfit);
  if(oldFactory){
   Object.assign(cfg,{topColor:fullDefaults.topColor,topColorHex:fullDefaults.topColorHex,topLogo:fullDefaults.topLogo,zipColor:fullDefaults.zipColor,pants:fullDefaults.pants,pantsLogoColor:fullDefaults.pantsLogoColor});
   if(cfg.pose==="Locker stehend")cfg.pose=fullDefaults.pose;
   if(cfg.mood==="Locker")cfg.mood=fullDefaults.mood;
   localStorage.setItem(KEY,JSON.stringify(cfg));
  }
  localStorage.setItem(migration453,"1");
 }
}catch(e){console.warn("Wall photo default migration skipped",e)}


function esc(x){return String(x==null?"":x).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function persist(){try{localStorage.setItem(KEY,JSON.stringify(cfg));if(typeof save==="function")save()}catch(e){console.warn("Wall settings not saved",e)}}
function input(k,label,type){return '<div class="field"><label>'+label+'</label><input data-w450="'+k+'" type="'+(type||"text")+'" value="'+esc(cfg[k])+'"></div>'}
function select(k,label,options){return '<div class="field"><label>'+label+'</label><select data-w450="'+k+'">'+options.map(function(o){return '<option value="'+esc(o)+'"'+((k==="scenario"?String(cfg[k])===String(parseInt(o,10)):String(cfg[k])===String(o))?" selected":"")+'>'+esc(o)+'</option>'}).join("")+'</select></div>'}
function range(k,label,min,max){return '<div class="field"><label>'+label+': <b>'+cfg[k]+' %</b></label><input type="range" data-w450="'+k+'" min="'+min+'" max="'+max+'" step="5" value="'+cfg[k]+'"></div>'}
function toggle(k,label){return '<label class="check"><input type="checkbox" data-w450="'+k+'"'+(cfg[k]?" checked":"")+'> '+label+'</label>'}
function group(label,body,opened){return '<details class="panel" '+(opened?"open":"")+' style="margin-bottom:10px"><summary style="cursor:pointer;font-size:15px;font-weight:800">'+label+'</summary><div style="padding-top:14px">'+body+'</div></details>'}
var blackSignVenueCatalog456=[["Breite Einkaufsstraße","City","BFSWX"],["Großer Marktplatz","City","FSWPX"],["Bahnhofsvorplatz","Verkehr","FSWPX"],["Bäckerei an breiter Straße","City","BFSWX"],["Markthalle mit Vorplatz","City","FSWPX"],["Einkaufspark-Promenade","Shopping","FSWPX"],["Dachterrasse über Fußgängerzone","Höhe","BFSWP"],["Industriefassade an Platz","Industrial","FSWPX"],["Stadionvorplatz mit Tribünenaufgang","Sport & Events","FSWPX"],["Arena-Eingang mit LED-Fassade","Sport & Events","FSWPX"],["Fußballstadion-Promenade","Sport & Events","FSWPX"],["Messezentrum Glasfassade","Sport & Events","FSWPX"],["Konzertarena-Freitreppe","Sport & Events","FSWPX"],["Open-Air-Bühnenvorplatz","Sport & Events","WPX"],["Sportplatz-Tribünenzugang","Sport & Events","FSWPX"],["Großparkplatz vor Supermarkt","Shopping","FPX"],["Parkhaus-Auffahrt und Vorplatz","Shopping","FSWPX"],["Shopping-Center Haupteingang","Shopping","BFSWPX"],["Baumarkt-Vorplatz","Shopping","FPX"],["Autokino-Parkplatz","Shopping","FPX"],["Einkaufsarkade mit Galerie","Shopping","BFSW"],["Straßenbahn-Knotenpunkt","Verkehr","FSWX"],["Busbahnhof mit Überdachung","Verkehr","FSWPX"],["U-Bahn-Ausgang mit Freitreppe","Verkehr","FSW"],["Flughafen-Terminalvorplatz","Verkehr","FSWPX"],["Fährterminal-Promenade","Verkehr","FSWPX"],["Altstadt-Torplatz","Architektur","FSWPX"],["Rathaus-Freitreppe","Architektur","FSWPX"],["Brutalistische Betonterrassen","Architektur","BFSWPX"],["Hochhaus-Plaza mit Glasfassade","Architektur","FSWPX"],["Innenstadt-Unterführung","Architektur","FSW"],["Brückenplatz mit Betonpfeilern","Architektur","FSWPX"],["Universitätscampus mit Freitreppe","Campus & Kultur","FSWPX"],["Bibliotheks-Vorplatz","Campus & Kultur","FSWPX"],["Kongresszentrum-Freitreppe","Campus & Kultur","FSWPX"],["Kulturzentrum mit Arkaden","Campus & Kultur","BFSWPX"],["Kino-Premierenplatz","Freizeit","FSWPX"],["Freiluft-Amphitheater","Freizeit","SWP"],["Volksfest-Eingangsplatz","Freizeit","FWPX"],["Freizeitpark-Eingangsallee","Freizeit","BFSWPX"],["City-Skatepark mit Betonstufen","Freizeit","SWP"],["Hafenpromenade mit Lagerhaus","Wasser & Promenade","FSWPX"],["Rheinpromenade mit Treppenstufen","Wasser & Promenade","SWPX"],["Strandpromenade mit Hotelbalkonen","Wasser & Promenade","BFSWPX"],["Marina-Vorplatz mit Promenadentreppe","Wasser & Promenade","FSWPX"],["Baustellenzaun am Stadtplatz","Industrial","FSWPX"],["Containerterminal-Vorplatz","Industrial","FSWPX"],["Backsteinfabrik mit Hof","Industrial","BFSWPX"],["Logistikzentrum-Eingangsplatz","Industrial","FSWPX"]];
var previousWallLocations456=["Supermarkt-Eingang","Balkon 1. Stock","Balkon 2. Stock","Baustelle","Busbahnhof","Dachterrasse","Freie Szene (Zusatzanweisung)"];
function wallLocationSelect456(){
 var groups=[];
 blackSignVenueCatalog456.forEach(function(v){
  var g=groups.find(function(x){return x.name===v[1]});
  if(!g){g={name:v[1],items:[]};groups.push(g)}
  g.items.push(v[0]);
 });
 if(previousWallLocations456.length)groups.push({name:"Bisherige STRAVA-WALL-Orte",items:previousWallLocations456});
 // Keep unknown locations from user backups selectable without changing them.
 if(cfg.location&&!groups.some(function(g){return g.items.includes(cfg.location)}))groups.push({name:"Gespeicherter eigener Ort",items:[cfg.location]});
 return '<div class="field"><label>Aufnahmeort · '+blackSignVenueCatalog456.length+' BLACK SIGN Smart-Director-Orte</label><select data-w450="location">'+groups.map(function(g){
  return '<optgroup label="'+esc(g.name)+'">'+g.items.map(function(place){return '<option value="'+esc(place)+'"'+(cfg.location===place?' selected':'')+'>'+esc(place)+'</option>'}).join("")+'</optgroup>';
 }).join("")+'</select></div>';
}
function content(){
switch(active){
case "Presets":return '<section class="panel"><h2>Meine Presets · mit echter Bildvorschau</h2><div id="w450gallery" class="grid"></div><div class="field"><label>Presetname</label><input id="w450presetName" placeholder="Meine Inszenierung"></div><div class="field"><label>Ergebnisbild für die Vorschau</label><input id="w450presetImage" type="file" accept="image/*"><p class="hint">Für die echte Vorschau das fertige Ergebnisfoto auswählen. Beim iPhone-Teilen wird es zusätzlich als JPG bereitgestellt; JSON selbst hat keine Fotovorschau.</p></div><div class="actions"><button id="w450savePreset" class="btn">Preset speichern</button><button id="w450reset" class="btn secondary">Auf Standard zurücksetzen</button><button id="w450shareAllPresets" class="btn secondary">Alle Presets teilen</button><button id="w450exportPresets" class="btn secondary">Alle Presets herunterladen</button></div><div class="field" style="margin-top:12px"><label>Preset-Sicherung importieren</label><input id="w450importPresets" type="file" accept=".json,application/json"></div><div id="w450status" class="hint"></div></section>';
case "Statistikmodus":return '<section class="panel"><h2>Statistikmodus</h2><label class="check"><input type="radio" name="w450mode" value="bpm" '+(cfg.mode==="bpm"?"checked":"")+'> A · Statistik + BPM + Karte</label><label class="check"><input type="radio" name="w450mode" value="only" '+(cfg.mode==="only"?"checked":"")+'> B · Nur Statistik</label><div class="notice" style="margin-top:16px" id="w450modeInfo">'+(cfg.mode==="bpm"?"In ChatGPT: normale Strava-Statistik und BPM-Screenshot anhängen. Die Karte wird aus den vorhandenen Referenzen übernommen.":"In ChatGPT: nur den normalen Strava-Statistik-Screenshot anhängen.")+'</div><p class="hint">Keine Uploads im Generator. Die Auswahl steuert den Bildprompt.</p></section>';
case "Szene & Kamera":
return '<section class="panel"><h2>Szene & Kamera</h2>'+wallLocationSelect456()+(typeof sceneData!=="undefined"?select("scenario","Bestehendes Szenen-Set (30 Originale)",sceneData.map(function(x,i){return String(i).padStart(2,"0")+" · "+x[0]})):"")+select("lens","Brennweite",["18","20","24","28","35","50"])+select("distance","Kameraabstand in m",["10","12","15","20","25","30","40"])+'<p class="hint">Verbindliche Kameraquelle. Bildformat 9:16.</p></section>'+group("Pose, Blick & Mimik",select("pose","Läuferpose",typeof poses!=="undefined"?poses:["Locker stehend","Laufbewegung"])+select("gaze","Blickrichtung",["Direkt in die Kamera","Zur Statistik-Wand","Seitlich zur Umgebung"])+select("mood","Mimik",["Ernst","Locker","Frech","Locker-ernst"]),false);
case "Hauptfigur":
return '<div class="notice">PERSON PHOTO Identität 1:1. SHOE PHOTO ist die alleinige Schuhreferenz. Identische Outfit-Auswahl wie BLACK SIGN, unabhängig gespeichert.</div>'+
group("Marke & Oberteil",select("brand","Sportmarke",["PUMA","Adidas","Nike","Under Armour","Neutral / ohne Marke"])+select("club","Verein",["Kein Verein","Vereinsoutfit (nur wenn ausdrücklich beschrieben)"])+select("collection","Kollektion",["Training","Running","Lifestyle","Winter"])+select("top","Oberteil",["Full-Zip-Laufjacke","Half-Zip-Laufjacke","Longsleeve","Kurzarm-Funktionsshirt","Laufweste","Winterlaufjacke","Thermo-Longsleeve","Hoodie","Individuell"])+select("topColor","Oberteilfarbe",["Neon Gelbgrün (#DFFF00)","Rot","Grün","Schwarz","Gelb","Weiß","Blau","Grau","Orange","Dunkelblau","COROS Neon grün","COROS Neon Yellow (Neongelb)","COROS Lime Green (Gelbgrün)","COROS Neon Green (Neongrün)","COROS Streckenlinie – leuchtendes Neongelbgrün"])+input("topColorHex","Eigener Oberteil-Farbcode (HEX)")+input("topLogo","Brustlogo (Position / Farbe)")+select("zipColor","Reißverschlussfarbe",["Schwarz","Weiß","Ton-in-Ton","Individuell"])+select("topDetails","Ärmel- / Markendetails",["Keine Ärmelstreifen","Nur tatsächlich vorhandene Details laut Outfit-Referenz","Explizit gewählte modellgetreue Streifen"]),true)+
group("Hose & Zubehör",select("pants","Hose",["Laufshorts","Lange Trainingshose, regulärer Schnitt","Winter-Trainingshose, regulärer Schnitt","Sportliche Jogginghose"])+select("pantsColor","Hosenfarbe",["Schwarz","Dunkelgrau","Dunkelblau","Grau","Grün","Rot"])+input("pantsLogoColor","Hosenlogo / Detailfarbe (HEX)")+select("cap","Cap",["Rote Cap rückwärts","Schwarze Cap rückwärts","Weiße Cap rückwärts","Keine Cap","Laufmütze Winter","Individuell"])+select("socks","Socken",["Schwarz","Weiß","Dunkelgrau","Individuell"])+select("watch","Uhr",["COROS PACE Pro, schwarz, Display aus","Schwarze Sportuhr, Display aus","Keine Uhr"])+'<div class="field"><label>Zusätzliche Outfit-Details</label><textarea data-w450="customOutfit">'+esc(cfg.customOutfit)+'</textarea></div>',false);
case "Nebenfiguren":
return group("Anatolischer Dorf-Opa · 1970er Jahre",toggle("opa","Dorf-Opa aktivieren")+(cfg.opa?'<div class="notice">Authentischer anatolischer Dorf-Opa im Stil der 1970er Jahre. Keine moderne mitteleuropäische Rentnerkleidung, keine Karikatur.</div>'+select("opaProfile","Opa-Vorlage",["OPA 01 · Klassisch","OPA 02 · Leichter Bauch","OPA 03 · Kräftig","OPA 04 · Drahtig","OPA 05 · Gemütlich","OPA 06 · Dorfältester","OPA 07 · Markant","OPA 08 · Klein & stämmig"])+select("opaAge","Alter",["65–75 Jahre","75–85 Jahre","85–90 Jahre"])+select("opaBuild","Körperbau",["Schlank und drahtig","Normal","Klein und stämmig","Leicht gebeugt","Breitschultrig und kräftig"])+select("opaHead","Kopfbedeckung",["Dunkle Schiebermütze","Braune Schiebermütze","Gestrickte Dorfmütze","Keine Kopfbedeckung"])+select("opaBeard","Bart / Schnurrbart",["Markanter grauer Schnurrbart","Dichter weißer Schnurrbart","Schmaler Schnurrbart","Kurzer grauer Bart","Glattrasiert"])+select("opaClothing","Bekleidung",["Braunes Cord-Sakko, kariertes Hemd, Stoffhose","Dunkle Weste, helles Hemd, weite Stoffhose","Alte Strickjacke, Hemd, Stoffhose","Dunkles Sakko im Stil der 1970er"])+select("opaShirt","Hemd",["Braun-blau kariert","Grau kariert","Helles Baumwollhemd","Individuell in Opa-Beschreibung"])+select("opaPants","Hose",["Dunkle, weite Stoffhose","Braune Stoffhose","Dunkelgraue Stoffhose"])+select("opaShoes","Schuhe",["Abgetragene braune Lederschuhe","Schlichte dunkle Lederschuhe","Alte robuste Arbeitsschuhe"])+select("opaPose","Pose / Handlung",typeof opaPoses!=="undefined"?opaPoses:["Am alten Mofa stehend","Mit Teeglas auf Holzstuhl","Auf einer Bank sitzend"])+select("opaGaze","Blickrichtung",["Zum Läufer","Zur Wand","Direkt in Kamera","Zum Publikum","Zur Teyze","Seitlich nach links","Seitlich nach rechts"])+select("opaReaction","Reaktion",["Ungläubig","Skeptisch","Schmunzelnd","Ernst","Lachend","Nachdenklich"])+'<div class="field"><label>Eigene Opa-Beschreibung</label><textarea data-w450="opaCustom">'+esc(cfg.opaCustom)+'</textarea></div>':""),true)+
group("Weitere Figuren",toggle("mantel","Mantelmann aktivieren"),false)+
group("Publikum",'<div class="field"><label>Personenanzahl: '+cfg.crowd+'</label><input type="range" data-w450="crowd" min="0" max="100" step="5" value="'+cfg.crowd+'"></div>'+select("distribution","Verteilung",["Natürlich verstreut","Lockerer Halbkreis","Belebte Alltagsszene"]),false);
case "Wandarchitektur":return '<section class="panel"><h2>Wandarchitektur</h2>'+select("height","Wandhöhe",["Niedrig (1–2 Etagen)","Mittelhoch (3–5 Etagen)","Monumental (6+ Etagen)"])+select("side","Wandseite",["Links","Zentral","Rechts"])+select("width","Wandbreite in m",["15","20","30","40","50"])+select("angle","Kamerawinkel zur Wand",["Frontal","Leicht schräg","Deutlich schräg"])+'<div class="notice"><b>Feste Wandfarbe:</b> tiefschwarze Backsteinfassade, schwarze Fugen. Keine roten oder braunen Ziegel.</div>'+select("space","Freiraum vor Wand",["Normal","Breit","Sehr breit"])+'</section>';
case "Statistik & Projektion":return '<section class="panel"><h2>Statistik & Projektion</h2>'+select("placement","Statistikposition",["Links","Mitte","Rechts"])+range("statsSize","Statistikgröße",40,95)+(cfg.mode==="bpm"?range("gpsSize","GPS-Streckengröße",40,100):"")+select("projection","Darstellungsart",["Direkt auf der Fassade","Realistische Lichtprojektion","Großflächiger Wanddruck"])+select("spacing","Elementabstand",["Kompakt","Ausgewogen","Großzügig"])+'<div class="notice"><b>ORIGINAL-PIXEL-LOCK:</b> Schriftart, Zeichenformen, Zahlen, Einheiten, Farben, Diagramme und GPS-Strecke ausschließlich aus den originalen Strava-Screenshots übernehmen. Skalieren und perspektivisch verzerren erlaubt; kein Neusetzen der Schrift. Für garantierte Pixelidentität ist eine Montage der Originalpixel nötig – ein Bildprompt allein garantiert sie nicht.</div></section>';
case "Prompt & Export":return '<section class="panel"><h2>Prompt & Export</h2><div class="field"><label>Eigene Zusatzanweisungen</label><textarea data-w450="extra" id="w450extra">'+esc(cfg.extra)+'</textarea></div><div class="actions"><button id="w450generate" class="btn">Prompt erstellen</button><button id="w450copy" class="btn secondary">Prompt kopieren</button><button id="w450download" class="btn secondary">Als TXT exportieren</button></div><pre class="prompt" id="w450prompt" style="margin-top:12px"></pre></section>';
}return "";
}
function wallPrompt(){
var lines=[
"STRAVA WALL V4.5.6 — EIGHT TAB MASTER PROMPT",
"CAMERA SETTINGS — SINGLE AUTHORITATIVE SOURCE",
"FOCAL LENGTH: "+cfg.lens+" mm full-frame equivalent",
"CAMERA DISTANCE: "+cfg.distance+" m from runner",
"IMAGE FORMAT: native 9:16 portrait",
"OUTPUT: Exactly one ultra-photorealistic documentary photograph; natural anatomy, light and perspective; no CGI.",
"PERSON PHOTO: preserve exact facial identity, eyes, eyebrows, nose, lips, jaw, beard, pores, asymmetry, age, head size and natural anatomy. No beautification, no face redesign. Transform it 1:1.",
"SHOE PHOTO: use the separately attached shoe reference as sole authority for both feet; exact model, silhouette, colors, logos, laces and sole.",
"STATISTICS MODE: "+(cfg.mode==="bpm"?"WITH BPM + MAP. Expect TWO Strava screenshots attached in ChatGPT: regular run statistics and BPM statistics. Preserve available GPS map from supplied reference.":"STATISTICS ONLY. Expect ONE normal Strava statistics screenshot attached in ChatGPT. No BPM chart and no separate GPS map."),
"STRAVA ORIGINAL TYPEFACE & SOURCE-PIXEL LOCK — ABSOLUTE PRIORITY: Transfer the screenshot’s EXACT original typographic glyphs, font shapes, weight, kerning, line spacing, numerals, decimal separators, units, labels, STRAVA branding, chart traces, GPS topology, orange route, colors and visible source layout. NO OCR transcription, no reconstructed font, no retypesetting, no translation, no rounding, no replacement of metrics or logo. Crop and arrange only existing screenshot pixels; uniform scaling and realistic perspective-warp of whole source regions are permitted. Reproduce no statistic absent from the original screenshots.",
"ORIGINAL SCREENSHOT COMPOSITING: If available, use the existing STRAVA WALL source-pixel overlay exported from the original screenshots. Keep all typography, statistics, chart and GPS-route as actual source image pixels in that overlay, mask away only the near-black screenshot backdrop, then perspective-composite those pixels onto the physical BLACK BRICK wall. If the image-generation process cannot physically composite unchanged source pixels, the prompt alone CANNOT guarantee exact font or data. Perform final pixel overlay compositing after generation rather than repainting or hallucinating any character.",
cfg.mode==="bpm"?"BPM LAYOUT ABSOLUTE LOCK: The STRAVA wordmark AND the STRAVA shoe emblem are BOTH exactly STRAVA ORANGE #FC4C02 (not white), and they are both aligned to the SAME LEFT EDGE as the left-aligned statistics block. They must never be centered independently. Keep the ORIGINAL GPS route horizontally CENTERED in its dedicated GPS display area of the wall; never left-align it merely because the text and icons are left-aligned. Do NOT modify the route geometry or color. Only permitted source-pixel translation, uniform resizing and perspective warp.":"STATISTICS ONLY: preserve screenshot source alignment and do not add BPM.",
"SCENE: "+cfg.location+". Natural real-world location with visible context.",
"ORIGINAL SCENE SET: "+(typeof sceneData!=="undefined"&&sceneData[parseInt(cfg.scenario,10)]?sceneData[parseInt(cfg.scenario,10)][0]+" — "+sceneData[parseInt(cfg.scenario,10)][1]:"No scene preset")+".",
"RUNNER: "+cfg.pose+"; gaze "+cfg.gaze+"; expression "+cfg.mood+".",
"FULL OUTFIT LOCK: Brand "+cfg.brand+"; club "+cfg.club+"; collection "+cfg.collection+"; top "+cfg.top+"; top color "+(cfg.topColorHex||cfg.topColor)+"; chest logo "+cfg.topLogo+"; zipper "+cfg.zipColor+"; sleeve details "+cfg.topDetails+"; pants "+cfg.pants+"; pants color "+cfg.pantsColor+"; pants logo / detail color "+cfg.pantsLogoColor+"; cap "+cfg.cap+"; socks "+cfg.socks+"; watch "+cfg.watch+"; custom outfit "+cfg.customOutfit+". No invented sleeve stripes or tights.",
"SIDE FIGURES: "+(cfg.opa?"ANATOLIAN TURKISH VILLAGE GRANDFATHER, historically plausible 1970s rural Turkey, NOT modern German pensioner style. Profile "+cfg.opaProfile+"; age "+cfg.opaAge+"; build "+cfg.opaBuild+"; headwear "+cfg.opaHead+"; facial hair "+cfg.opaBeard+"; period outfit "+cfg.opaClothing+"; shirt "+cfg.opaShirt+"; trousers "+cfg.opaPants+"; shoes "+cfg.opaShoes+"; pose "+cfg.opaPose+"; gaze "+cfg.opaGaze+"; reaction "+cfg.opaReaction+"; custom "+cfg.opaCustom+". Weathered natural fabrics, no caricature or costume. ":"")+(cfg.mantel?"Coat-wearing man; ":"")+(!cfg.opa&&!cfg.mantel?"none":"")+".",
"CROWD: "+cfg.crowd+" people; "+cfg.distribution+"; varied natural gestures, irregular spacing, no artificial lines, no obstruction of statistics.",
"BLACK FACADE ABSOLUTE LOCK: Entire statistics wall is deep matte BLACK BRICK with BLACK mortar joints. NO red, brown, terracotta, beige, grey, or white wall; black texture visible under realistic light.",
"FACADE: "+cfg.height+", "+cfg.width+" m wide; wall on image "+cfg.side+"; "+cfg.angle+"; BLACK brick surface; foreground space "+cfg.space+".",
"WALL STATISTICS: position "+cfg.placement+"; size "+cfg.statsSize+"% of usable wall; "+cfg.projection+"; spacing "+cfg.spacing+".",
cfg.mode==="bpm"?"GPS MAP SCALE: "+cfg.gpsSize+"% of planned GPS region; GPS route remains CENTERED.":"GPS MAP: not applicable.",
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
document.querySelectorAll("[data-w450]").forEach(function(el){function change(){cfg[el.dataset.w450]=el.type==="checkbox"?el.checked:el.type==="range"?Number(el.value):el.dataset.w450==="scenario"?String(parseInt(el.value,10)):el.value;persist();if(el.type!=="textarea"&&el.type!=="text"){var expanded=Array.from(document.querySelectorAll("#view details")).map(function(d,i){return d.open?i:-1}).filter(function(i){return i>=0});render();document.querySelectorAll("#view details").forEach(function(d,i){d.open=expanded.includes(i)})}}el.addEventListener(el.type==="range"?"input":"change",change);if(el.tagName==="TEXTAREA")el.addEventListener("input",change)});
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

function safePresetName(name){
 return String(name||"Strava-Wall").trim().replace(/[\\/:*?"<>|\x00-\x1F]/g,"").replace(/\s+/g,"-").replace(/\.+$/g,"").slice(0,90)||"Strava-Wall";
}
function previewFile(p){
 if(!p.image||!p.image.startsWith("data:image/jpeg;base64,"))return null;
 try{
  var raw=atob(p.image.split(",")[1]),bytes=new Uint8Array(raw.length);
  for(var i=0;i<raw.length;i++)bytes[i]=raw.charCodeAt(i);
  return new File([bytes],safePresetName(p.name)+".jpg",{type:"image/jpeg"});
 }catch(e){return null}
}
function individualBackup(p){return {format:"strava-wall-single-preset",version:1,preset:p}}
function presetShareFiles(p){
 var name=safePresetName(p.name);
 var json=new File([JSON.stringify(individualBackup(p),null,2)],name+".json",{type:"application/json"});
 var jpg=previewFile(p);
 return jpg?[json,jpg]:[json];
}
function downloadFile(file){
 var url=URL.createObjectURL(file),anchor=document.createElement("a");
 anchor.href=url;anchor.download=file.name;anchor.click();
 setTimeout(function(){URL.revokeObjectURL(url)},1500);
}
function downloadPreset(p){
 presetShareFiles(p).forEach(downloadFile);
}
function sharePreset(p,report){
 var files=presetShareFiles(p);
 if(typeof navigator.share!=="function"||(typeof navigator.canShare==="function"&&!navigator.canShare({files:files}))){
  report("Datei-Teilen nicht unterstützt. Bitte im Safari öffnen oder die separate Download-Funktion benutzen.");
  return;
 }
 // Execute navigator.share synchronously on the click activation (no await before it).
 try{
  Promise.resolve(navigator.share({files:files,title:p.name})).then(
   function(){report("Teilen abgeschlossen")},
   function(e){report(e&&e.name==="AbortError"?"Teilen abgebrochen":"Teilen fehlgeschlagen: "+(e&&e.message||"Unbekannter Fehler"))}
  );
 }catch(e){report("Teilen nicht möglich: "+e.message)}
}
function initPresets(){
 var status=document.getElementById("w450status");
 function report(msg){status.textContent=msg}
 function redraw(){
  var root=document.getElementById("w450gallery");
  root.innerHTML=getPresets().map(function(p){
   return '<div class="panel" style="padding:10px">'+
    (p.image?'<img src="'+esc(p.image)+'" alt="Gespeichertes STRAVA-WALL-Ergebnisbild" style="width:100%;aspect-ratio:4/5;object-fit:cover;border-radius:8px">':
    '<div style="aspect-ratio:4/5;background:#242c36;border-radius:8px;display:grid;place-items:center;color:#a7b0bc">Ergebnisbild fehlt – bitte ergänzen</div>')+
    '<b>'+esc(p.name)+'</b><div class="actions">'+
    '<button class="btn secondary" data-preset-load="'+esc(p.id)+'">Laden</button>'+
    '<button class="btn secondary" data-preset-share="'+esc(p.id)+'">iPhone-Teilen</button>'+
    '<button class="btn secondary" data-preset-download="'+esc(p.id)+'">Herunterladen</button>'+
    '<button class="btn secondary" data-preset-update="'+esc(p.id)+'">Aktualisieren</button>'+
    '<button class="btn ghost" data-preset-delete="'+esc(p.id)+'">Löschen</button></div></div>';
  }).join("")||'<p class="hint">Noch keine Presets gespeichert.</p>';
  root.querySelectorAll("[data-preset-load]").forEach(function(b){b.onclick=function(){
   var p=getPresets().find(function(p){return p.id===b.dataset.presetLoad});
   if(p){cfg=Object.assign({},fullDefaults,p.settings);cfg.surface="Schwarzer Backstein";persist();render()}
  }});
  root.querySelectorAll("[data-preset-share]").forEach(function(b){b.onclick=function(){
   var p=getPresets().find(function(p){return p.id===b.dataset.presetShare});
   if(p)sharePreset(p,report);
  }});
  root.querySelectorAll("[data-preset-download]").forEach(function(b){b.onclick=function(){
   var p=getPresets().find(function(p){return p.id===b.dataset.presetDownload});
   if(p){downloadPreset(p);report("Dateien für "+p.name+" heruntergeladen")}
  }});
  root.querySelectorAll("[data-preset-update]").forEach(function(b){b.onclick=async function(){
   var all=getPresets(),p=all.find(function(p){return p.id===b.dataset.presetUpdate});if(!p)return;
   var name=document.getElementById("w450presetName").value.trim();
   var file=document.getElementById("w450presetImage").files[0];
   if(file){try{p.image=await thumbnail(file)}catch(e){report("Vorschaufoto konnte nicht geladen werden");return}}
   if(name)p.name=name;
   p.settings=Object.assign({},cfg);
   try{setPresets(all);redraw();report("Preset aktualisiert"+(file?" – mit neuem Bild":""))}
   catch(e){report("Speicher voll; bitte Presets sichern und aufräumen")}
  }});
  root.querySelectorAll("[data-preset-delete]").forEach(function(b){b.onclick=function(){
   if(confirm("Preset wirklich löschen?")){setPresets(getPresets().filter(function(p){return p.id!==b.dataset.presetDelete}));redraw()}
  }});
 }
 redraw();
 document.getElementById("w450savePreset").onclick=async function(){
  var file=document.getElementById("w450presetImage").files[0];
  var name=document.getElementById("w450presetName").value.trim()||"Preset "+(getPresets().length+1);
  if(!file){report("Bitte das fertige Ergebnisfoto auswählen, damit eine echte Bildvorschau gespeichert wird.");return}
  var image;try{image=await thumbnail(file)}catch(e){report("Vorschaufoto konnte nicht geladen werden");return}
  var all=getPresets();all.push({id:String(Date.now())+Math.random().toString(36).slice(2),name:name,image:image,settings:Object.assign({},cfg)});
  try{setPresets(all);redraw();report("Preset mit echter Bildvorschau gespeichert. Zum Teilen im Preset 'iPhone-Teilen' auswählen.")}
  catch(e){report("Speicher voll; bitte alte Presets sichern oder entfernen")}
 };
 document.getElementById("w450reset").onclick=function(){
  if(confirm("Einstellungen auf Standard zurücksetzen? Presets bleiben erhalten.")){cfg=Object.assign({},fullDefaults);persist();render()}
 };
 document.getElementById("w450shareAllPresets").onclick=function(){
  var title=document.getElementById("w450presetName").value.trim();
  var name=title?safePresetName(title)+"-Sicherung.json":"Strava-Wall-Alle-Presets.json";
  var json=new File([JSON.stringify(getPresets())],name,{type:"application/json"});
  if(typeof navigator.share!=="function"||(typeof navigator.canShare==="function"&&!navigator.canShare({files:[json]}))){
   report("Native Datei-Freigabe nicht verfügbar. Benutze 'Herunterladen' oder öffne den Generator in Safari.");return;
  }
  try{Promise.resolve(navigator.share({files:[json],title:title||"STRAVA WALL Presets"})).then(
   function(){report("Sicherung geteilt")},
   function(e){report(e&&e.name==="AbortError"?"Teilen abgebrochen":"Teilen nicht möglich: "+(e&&e.message||"Fehler"))}
  )}catch(e){report("Teilen nicht möglich: "+e.message)}
 };
 document.getElementById("w450exportPresets").onclick=function(){
  var title=document.getElementById("w450presetName").value.trim();
  var name=title?safePresetName(title)+"-Sicherung.json":"Strava-Wall-Alle-Presets.json";
  downloadText(name,JSON.stringify(getPresets()),"application/json");
  report("JSON-Backup gespeichert. Für natives Teilen bitte beim gewünschten Preset 'iPhone-Teilen' auswählen.");
 };
 document.getElementById("w450importPresets").onchange=async function(){
  try{
   var data=JSON.parse(await this.files[0].text());
   if(!Array.isArray(data)){
    if(data&&data.format==="strava-wall-single-preset"&&data.preset)data=[data.preset];
    else throw Error("Unbekanntes Sicherungsformat");
   }
   if(data.some(function(p){return !p||typeof p.name!=="string"||!p.settings}))throw Error("Ungültiges Preset");
   var merged=getPresets();
   data.forEach(function(p){var i=merged.findIndex(function(old){return old.id===p.id});if(i>=0)merged[i]=p;else merged.push(p)});
   setPresets(merged);redraw();report("Presets importiert");
  }catch(e){report("Importfehler: "+e.message)}
 };
}
function thumbnail(file){return new Promise(function(resolve,reject){var img=new Image(),url=URL.createObjectURL(file);img.onload=function(){try{var c=document.createElement("canvas"),w=320,h=400;c.width=w;c.height=h;var scale=Math.max(w/img.width,h/img.height),sw=w/scale,sh=h/scale;c.getContext("2d").drawImage(img,(img.width-sw)/2,(img.height-sh)/2,sw,sh,0,0,w,h);resolve(c.toDataURL("image/jpeg",.72))}catch(e){reject(e)}finally{URL.revokeObjectURL(url)}};img.onerror=reject;img.src=url})}
if(state.world==="wall"){active=NAMES.includes(state.tab)?state.tab:"Presets";render()}
window.stravaWall450={tabs:NAMES.slice(),get:function(){return Object.assign({},cfg)},prompt:wallPrompt,version:"V4.5.6"};
})();