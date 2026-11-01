/* BLACK SIGN SMART COMPACT V4.5.20 — additive, does not change saved projects or FULL prompt. */
(function(){
"use strict";
if(typeof buildPrompt!=="function"||typeof promptView!=="function"||typeof bind!=="function")return;
var fullPrompt4520=buildPrompt,originalView4520=promptView,originalBind4520=bind,mode4520="full";
function section4520(s,start,end){
 var a=s.indexOf(start);if(a<0)return "";a+=start.length;
 var b=end?s.indexOf(end,a):-1;return s.slice(a,b>=0?b:s.length).trim();
}
function first4520(s,regex){var m=s.match(regex);return m?m[1].trim():""}
function line4520(s,prefix){return (s.split("\n").find(function(row){return row.trim().startsWith(prefix)})||"").trim()}
function body4520(full,ultra){
 var short=!!ultra,sign=state.sign||{},common=state.common||{},ty=window.stravaTypography430;
 var options=ty&&ty.options?ty.options():{};
 var text=String(sign.signText||"").replace(/\r\n?/g,"\n");
 // All dynamic content comes from the ACTIVE FULL prompt and active sign state.
 var message=section4520(full,"<<< SIGN TEXT START >>>","<<< SIGN TEXT END >>>").replace(/\n+$/,"");
 if(message!==text.replace(/\n+$/,""))throw Error("ASF: FULL und aktiver Plakattext unterscheiden sich.");
 var colors=window.stravaSignColorMap318?window.stravaSignColorMap318(sign).lines:"";
 if(!colors)throw Error("ASF: Wortfarbenkarte fehlt.");
 var map=String(colors).trim();
 var sourceMap=section4520(full,"EXACT PER-WORD COLOR MAP (the actual per-token hex values below are authoritative; never substitute a generic red):","05 / PEOPLE AND BACKGROUND");
 if(!sourceMap.includes(map))throw Error("ASF: FULL-Wortfarbenkarte stimmt nicht mit aktivem Editor überein.");
 var focal=first4520(full,/^FOCAL LENGTH:\s*(.+)$/m)||first4520(full,/^Camera:\s*(.+)$/m);
 var distance=first4520(full,/^CAMERA DISTANCE:\s*(.+)$/m);
 var format=first4520(full,/^IMAGE FORMAT:\s*(.+)$/m)||"native 9:16 portrait";
 var viewpoint=line4520(full,"Viewpoint:")||line4520(full,"Camera view:");
 var site=line4520(full,"Location:");
 var camBlock=["CAMERA / OPTICS — SINGLE AUTHORITY",
 "Focal length: "+focal+"; camera-to-runner distance: "+distance+"; format: "+format+".",
 viewpoint,site,
 "Manual camera values override presets; never alter the selected lens, distance or composition."];
 // Preserve author-editable identity instruction verbatim, without summarizing.
 var identity=section4520(full,"01 / REFERENCE IDENTITY","02 / LOCATION AND CAMERA");
 if(!identity)identity="PERSON PHOTO: exact identity, age, facial proportions, hair, beard and original skin texture; SHOE PHOTO: exact reference shoes on both feet.";
 var locSection=section4520(full,"02 / LOCATION AND CAMERA","03 / RUNNER AND OUTFIT");
 var runnerSection=section4520(full,"03 / RUNNER AND OUTFIT","04 / PHYSICAL SIGN AND PRINT");
 var peopleSection=section4520(full,"05 / PEOPLE AND BACKGROUND","06 / FINAL CONSISTENCY CHECK");
 var signature=section4520(full,"SIGNATURE PROTEST XXL — AUTHORITATIVE SCENE COMPOSITION:","PERMANENT CENTERLINE TYPOGRAPHY LOCK");
 var signatureLines=signature.split("\n").filter(function(row){
  row=row.trim();
  if(!row)return false;
  return /^(0[1-4]|[0-9]{2}[A-Z]?)\s*[·/]|^[^:\n]{2,100}:\s/.test(row);
 });
 var activeSignature=signatureLines.map(function(x){return x.trim()}).join("\n");
 var intro=signature.slice(0,signature.indexOf("\n")).trim();
 var portraitExtras=section4520(full,"BODY PROPORTION REFERENCE — 178 CM ADULT HEIGHT (USER CONFIRMED):","RUNNER POSITION — SINGLE SPATIAL AUTHORITY:");
 var poseDirection=line4520(full,"RUNNER POSITION — SINGLE SPATIAL AUTHORITY:");
 var crowdDirection=line4520(full,"DYNAMIC COMPOSITION — CONSTANT PRINCIPLES, VARIABLE GEOMETRY:");
 var material=line4520(full,"DISPLAY MATERIAL AUTHORITY — XXL LED SCREEN:")||line4520(full,"DISPLAY MATERIAL AUTHORITY — PHYSICAL PRINT:");
 var perspective=line4520(full,"SIGN PLANE PERSPECTIVE LOCK — ABSOLUTE:");
 var margin=line4520(full,"SINGLE MARGIN AUTHORITY — ABSOLUTE:");
 var signInstall=line4520(full,"SIGNATURE DISPLAY INSTALLATION:")||line4520(full,"ORIGINAL SIGN TYPE:");
 var physical=line4520(full,"PHYSICAL ANCHOR LOCK:");
 var topLogo=line4520(full,"GARMENT BRAND MARKS — FINAL AUTHORITATIVE RULE:");
 var fieldBlock=runnerSection.split("\n").filter(function(line){
  return /^(Pose:|Outfit:|Gesture:|ANATOMY LOCK|CROSSED ARMS|SIDE CHARACTER ANATOMY)/.test(line);
 });
 var audience=peopleSection.split("\n").filter(function(row){
  return /^(Audience:|Premium scene cast:|Premium-selected figure appearance|Legacy side-character details:|Background ambience:|VENUE NEUTRALITY LOCK:)/.test(row);
 });
 // No inactive cast descriptions in compact output. Full prompt retained intact.
 audience=audience.filter(function(row){
  if(/^Premium scene cast:\s*No Premium cast override/.test(row))return false;
  if(/^Premium-selected figure appearance.*No Premium/.test(row))return false;
  if(/^Legacy side-character details:/.test(row)&&/No Premium cast override/.test(peopleSection))return false;
  return true;
 });
 var typed=["Typography: "+(options.font||"selected font")+"; text size "+(options.size||"selected")+"; center axis 50%; edge margin "+Math.round(Number(options.margin||0)*100)+"%."];
 if(!short&&ty&&ty.layout){
  var layout=ty.layout(options);
  typed.push("Measured sign-local rows: "+layout.lines.map(function(row){
    return row.empty?"[EMPTY]":row.number+" "+(100*row.width/layout.width).toFixed(1)+"% width / "+row.fontSize.toFixed(1)+"px";
  }).join("; ")+".");
 }
 var rows=camBlock.concat([
 "OUTPUT / REALISM",
 "Exactly ONE authentic native "+format+" documentary photograph; realistic faces, anatomy, fingers, shoes, light, shadows and coherent 3D depth. No CGI.",
 "LOCATION / SCENE",
 locSection.split("\n").filter(function(row){return /^(Location:|Viewpoint:|Selected Premium scene:)/.test(row)}).join("\n"),
 "MAIN RUNNER / IDENTITY / POSE",
 identity,
 fieldBlock.filter(function(row){return !short||/^(Pose:|Outfit:|Gesture:)/.test(row)}).join("\n"),
 portraitExtras?"Body: 178 cm adult, natural seated/standing proportions; preserve source face and camera.":"",
 "Position: "+poseDirection.replace(/^RUNNER POSITION — SINGLE SPATIAL AUTHORITY:\s*/,""),
 "CROWD / AUDIENCE",
 audience.join("\n"),
 "Spectators react with varied authentic gazes and gestures toward the runner or sign; natural depth, no clones or blocking the face or lettering.",
 "SIGN / PLACARD / BANNER",
 signInstall,
 activeSignature,
 material,
 physical&&!short?physical:"",
 typed.join("\n"),
 "Perspective: project the entire centered 2D text graphic as ONE plane onto the actual display; keep the original font, colors, margins and row spacing. Never warp individual lines.",
 "EXACT MESSAGE — VERBATIM",
 "<<< SIGN TEXT START >>>",
 message,
 "<<< SIGN TEXT END >>>",
 "EXACT PER-WORD COLOR MAP",
 map,
 "FINAL VALIDATION",
 "Camera, PERSON PHOTO, SHOE PHOTO, pose, clothing, position, crowd, display mount, complete source text and EVERY per-word hex color mandatory; do not add inactive figures, invented signs or logos."
 ]);
 if(!short&&perspective)rows.push("Perspective authority: "+perspective.replace(/^SIGN PLANE PERSPECTIVE LOCK — ABSOLUTE:\s*/,""));
 if(!short&&margin)rows.push("Margin authority: "+margin.replace(/^SINGLE MARGIN AUTHORITY — ABSOLUTE:\s*/,""));
 if(!short&&topLogo)rows.push(topLogo);
 if(!short&&crowdDirection)rows.push("Crowd geometry: "+crowdDirection.replace(/^DYNAMIC COMPOSITION — CONSTANT PRINCIPLES, VARIABLE GEOMETRY:\s*/,""));
 // Active custom directives must survive. They are drawn from real FULL output.
 var overrideLines=full.split("\n").filter(function(row){return row.includes("CUSTOM OVERRIDE (AUTHORITATIVE):")});
 overrideLines.forEach(function(row){if(!rows.some(function(x){return x.includes(row.trim())}))rows.push(row)});
 var out=rows.filter(Boolean).join("\n");
 if(!out.includes(message)||!out.includes(map))throw Error("ASF: Nachricht oder Wortfarben fehlen.");
 return out;
}
function reports4520(full,smart,ultra){
 var warnings=[],sign=state.sign||{};
 if(!full.includes(String(sign.signText||"").trim()))warnings.push("Plakattext im FULL-Prompt nicht gefunden.");
 if(!full.includes("PERSON PHOTO"))warnings.push("PERSON PHOTO-Anweisung fehlt.");
 if(!full.includes("SHOE PHOTO"))warnings.push("SHOE PHOTO-Anweisung fehlt.");
 if(!window.stravaTypography430)warnings.push("Typography Engine nicht geladen.");
 warnings.push("Prüfen: PERSON PHOTO und SHOE PHOTO als Anhänge bereitstellen. Ob Referenzen wirklich angehängt sind, ist im Browser nicht zuverlässig erkennbar.");
 if(smart.length>=full.length)warnings.push("SMART ist aktuell nicht kürzer als FULL.");
 if(ultra.length>=smart.length)warnings.push("ULTRA ist aktuell nicht kürzer als SMART.");
 return warnings;
}
function selected4520(){var full=fullPrompt4520();return mode4520==="full"?full:body4520(full,mode4520==="ultra")}
function refresh4520(){
 if(state.world!=="sign"||state.tab!=="Prompt")return;
 try{
  var full=fullPrompt4520(),smart=body4520(full,false),ultra=body4520(full,true);
  var prompt=mode4520==="full"?full:mode4520==="smart"?smart:ultra;
  var pre=document.getElementById("promptText"),counts=document.getElementById("sign4520metrics"),warnings=document.getElementById("sign4520warnings");
  if(pre)pre.textContent=prompt;
  if(counts)counts.textContent="FULL "+full.length+" Zeichen · SMART "+smart.length+" ("+(100*(1-smart.length/full.length)).toFixed(1)+" % weniger) · ULTRA "+ultra.length+" ("+(100*(1-ultra.length/full.length)).toFixed(1)+" % weniger)";
  if(warnings)warnings.textContent="Prüfung: "+reports4520(full,smart,ultra).join(" ");
 }catch(e){
  var err=document.getElementById("sign4520warnings");if(err)err.textContent="⚠ PROMPT BLOCKIERT: "+String(e.message||e);
  var pre=document.getElementById("promptText");if(pre)pre.textContent="";
 }
}
promptView=function(){
 return originalView4520().replace('<pre id="promptText"', 
 '<label for="sign4520mode">Prompt-Modus</label><select id="sign4520mode"><option value="full">FULL · Original unverändert (Standard)</option><option value="smart">SMART COMPACT</option><option value="ultra">ULTRA COMPACT</option></select><p id="sign4520metrics" class="hint"></p><p id="sign4520warnings" class="hint" role="status"></p><pre id="promptText"');
};
bind=function(){
 originalBind4520();
 if(state.world==="sign"&&state.tab==="Prompt"){
  var select=document.getElementById("sign4520mode");
  if(select){select.value=mode4520;select.onchange=function(){mode4520=select.value;refresh4520()}}
  refresh4520();
 }
};
buildPrompt=function(){return state.world==="sign"?selected4520():fullPrompt4520()};
window.stravaSignCompact4520={full:fullPrompt4520,compact:body4520,prompt:selected4520,refresh:refresh4520,mode:function(){return mode4520},version:"V4.5.20"};
})();