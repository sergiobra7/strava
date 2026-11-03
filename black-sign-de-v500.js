(function(){
"use strict";
if(typeof buildPrompt!=="function")return;
const previous=buildPrompt;
function getSource(){try{const api=window.stravaSignCompact4524;return String(api&&api.full?api.full():previous());}catch(e){return String(previous());}}
function line(s,key){const x=s.split("\n").find(v=>v.startsWith(key));return x?x.slice(key.length).trim():"";}
function part(s,a,b){const x=s.indexOf(a);if(x<0)return "";const y=b?s.indexOf(b,x+a.length):-1;return s.slice(x+a.length,y<0?undefined:y).trim();}
function pick(s,k){return line(s,k).replace(/\s+/g," ").trim();}
function clean(v){return String(v===undefined||v===null?"":v).trim();}
function list(v){return Array.isArray(v)?v.filter(Boolean).join(", "):clean(v);}
function getSourceLine(s,re){return (s.split("\n").find(l=>re.test(l))||"").trim();}
function dePrompt(){
 const z=state.sign||{},c=state.common||{},d=state.director||{},s=getSource();
 const p=state.sign258&&state.sign258.premium270||{}, premium=!!(p.selected||p.enabled||p.active);
 const camera=pick(s,"FOCAL LENGTH:").replace(/\s*mm.*/i,"")||clean(p.manualCamera?p.manualLens:c.cameraLens||c.lens)||"28";
 const distance=pick(s,"CAMERA DISTANCE:").replace(/\s*m\b.*/i,"")||clean(p.manualCamera?p.manualDistance:c.personDistance||c.distance)||"20";
 const format=pick(s,"IMAGE FORMAT:").split(" ")[0]||clean(c.format)||"9:16";
 const place=pick(s,"Location:").split(". Selected Premium scene:")[0].replace(/\.$/,"")||clean(p.location||c.location||z.location)||"gewählter öffentlicher Ort";
 const viewpoint=pick(s,"Viewpoint:").replace(/\.$/,"")||clean(p.camera)||"realistische Straßenperspektive";
 let pose=pick(s,"Pose:").split(". Gaze:")[0]||clean(z.runnerPose)||"natürliche, ausgewählte Pose";
 let gaze=(pick(s,"Pose:").split("Gaze:")[1]||"").split(". Expression/action:")[0]||clean(z.mainGaze)||"natürlicher Blick";
 let act=(pick(s,"Pose:").split("Expression/action:")[1]||"").trim()||"natürlicher Gesichtsausdruck";
 let quick={};try{quick=JSON.parse(localStorage.getItem('strava-quick-director-506')||'{}')||{}}catch(e){}
 if(quick.blick&&quick.blick!=='Automatisch')gaze=String(quick.blick);
 if(quick.mimik&&quick.mimik!=='Automatisch')act=String(quick.mimik);
 let poseGuidance='';
 if(quick.pose&&quick.pose!=='Automatisch'){
  const catalog=window.stravaPoseCatalog508;
  const selected=catalog?.resolve(quick.pose,JSON.parse(localStorage.getItem('strava-premium-studio-350')||'{}').location,JSON.parse(localStorage.getItem('strava-premium-studio-350')||'{}').area311,z.signType);
  if(selected?.ok){pose=quick.pose;poseGuidance=selected.description;}
  else{poseGuidance='Ausgewählte Spezialpose ist am aktuellen Ort nicht umsetzbar; natürliche sichere Standardhaltung statt einer unmöglichen Requisite.';}
 }
 const outfit=pick(s,"Outfit:").split(". Use only")[0]||[c.brand,c.top,c.topColor,c.pants,c.cap,c.socks,c.watch].filter(Boolean).join("; ");
 const crowd=pick(s,"Audience:").split(". ")[0]||clean(z.audience)||"entsprechend der gewählten Zuschaueroption";
 const cast=pick(s,"Premium scene cast:").split(". A selected")[0]||"";
 const sides=Array.isArray(d.sides)?d.sides.filter(x=>x.enabled).map(x=>[x.type,x.outfit,x.clothing,x.pose,x.reaction,x.target,x.gesture,x.notes].filter(Boolean).join(" / ")).join("; "):"";
 const ambience=pick(s,"Background ambience:").replace(/\.$/,"")||clean(p.ambience)||"natürliche Alltagsatmosphäre";
 const signType=pick(s,"ORIGINAL SIGN TYPE:").split(". ORIGINAL SIGN POSITION:")[0]||clean(z.signType);
 const signPosition=(pick(s,"ORIGINAL SIGN TYPE:").split("ORIGINAL SIGN POSITION:")[1]||"").split(". ORIGINAL MOUNTING DETAILS:")[0]||clean(z.signPosition);
 const mount=(pick(s,"ORIGINAL SIGN TYPE:").split("ORIGINAL MOUNTING DETAILS:")[1]||"").replace(/\. These are.*/,"")||clean(z.signMountDetail);
 const font=getSourceLine(s,/^Font: /).replace(/^Font: /,"").split(". Reproduce")[0]||clean(z.posterFont)||"ausgewählte Schriftart";
 const sign=part(s,"<<< SIGN TEXT START >>>","<<< SIGN TEXT END >>>")||clean(z.signText);
 const colorMap=part(s,"EXACT PER-WORD COLOR MAP (", "\n\n05 / PEOPLE AND BACKGROUND").replace(/^[^\n]*\n/,"")||(typeof window.stravaSignColorMap318==="function"?window.stravaSignColorMap318(z).lines:"Wortfarben aus dem Plakat-Editor");
 const custom=[getSourceLine(s,/^CUSTOM USER PROMPT:/i),getSourceLine(s,/^USER ADDITIONAL INSTRUCTIONS:/i),getSourceLine(s,/^ACTIVE USER OVERRIDE:/i)].filter(Boolean);
 const locPhoto=c.backgroundLock?"Falls ein LOCATION PHOTO beigefügt ist, dessen Architektur, Perspektive und vorhandene Details als Referenz erhalten.":"";
 const runnerPlacement=getSourceLine(s,/^RUNNER POSITION — SINGLE SPATIAL AUTHORITY:/i).replace(/^RUNNER POSITION — SINGLE SPATIAL AUTHORITY:\s*/i,"");
 const placements={
  'Ganz vorne · frei sichtbar':'Läufer klar im Vordergrund vor allen Zuschauern, ungehinderter Blick auf Gesicht, Körper und Plakat. Menschenmenge nur hinter ihm.',
  'Vorderer Mittelgrund':'Läufer im vorderen Mittelgrund, einzelne Passanten dahinter; räumlich natürlich gestaffelt.',
  'Mittig in der Menschenmenge':'Läufer mitten unter Zuschauern im Mittelgrund, sichtbar von Menschen flankiert; Gesicht und Plakat bleiben unverdeckt.',
  'Mitten im Gerangel':'Läufer im lebhaften dicht gedrängten Menschenstrom, Menschen seitlich und teilweise davor, aber nie über Gesicht, Hände oder wichtigen Text; dokumentarisches Gedränge.',
  'Leicht hinter der ersten Reihe':'Läufer hinter den ersten Zuschauern, einzelne Vordergrundpersonen am unteren Bildrand; der Läufer bleibt erkennbar.',
  'Hinterer Mittelgrund':'Läufer deutlich tiefer in der Szene hinter mehreren Passantengruppen; realistische kleinere Bildgröße.',
  'Ganz hinten im Publikum':'Läufer im Hintergrund jenseits der Menschenmenge, bewusst klein und dennoch erkennbar; das Plakat bleibt lesbar.',
  'Seitlich links vor der Menge':'Läufer links im vorderen Bildbereich, Menschenmenge dahinter und nach rechts versetzt.',
  'Seitlich rechts vor der Menge':'Läufer rechts im vorderen Bildbereich, Menschenmenge dahinter und nach links versetzt.',
  'Direkt unter dem Plakat':'Läufer räumlich plausibel unmittelbar unterhalb der befestigten Anzeigenfläche, nicht davor schwebend; gesamter Text bleibt sichtbar.'
 };
 const chosenPosition=clean(quick.position);
 const positionRule=chosenPosition&&chosenPosition!=='Automatisch'?placements[chosenPosition]||chosenPosition:runnerPlacement;
 const typMargin=getSourceLine(s,/^SINGLE MARGIN AUTHORITY/i);
 const lines=[
 "Transformiere die Person aus dem beigefügten Gesichtsfoto 1:1 in den Marathonläufer der nachfolgend gewählten öffentlichen Szene. Verwende die reale Person aus PERSON PHOTO als Identitätsvorlage, erfinde kein neues Gesicht. Verändere nur Kleidung, Haltung und Inszenierung entsprechend den Einstellungen.",
 "",
 "01 · GESICHT & IDENTITÄT",
 "- PERSON PHOTO: dieselben Augen, Augenbrauen, Nase, Lippen, Bart, Kieferform, Hautporen, Asymmetrien und Altersmerkmale. Keine Verschönerung, Verjüngung oder Gesichtsneugestaltung.",
 "- Natürliche Kopf- und Körperproportionen; Körpergröße für diesen Bildtest 168 cm (provisorische Darstellung, nicht die reale Körpergröße). Natürliche, kompakte Proportionen; keine gestreckten Beine und kein verlängerter Oberkörper.",
 "",
 "02 · SCHUHE",
 "- SHOE PHOTO: ausschließliche Schuhreferenz für beide Füße. Modell, Form, Farben, Logos, Nähte, Schnürung und Sohlen exakt übernehmen; weder Personfoto noch Outfitmarke dürfen die Schuhe ersetzen.",
 "",
 "03 · KAMERA – EINZIGE VERBINDLICHE QUELLE",
 "- Brennweite: "+camera+" mm Vollformat; Kameraabstand zum Läufer: "+distance+" m; natives Format: "+format+".",
 "- Perspektive: "+viewpoint+". Keine automatische Brennweitenänderung, kein nachträgliches Heranzoomen oder künstliches Vergrößern des Läufers. Natürliche räumliche Maßstäbe.",
 "",
 "04 · OUTFIT",
 "- Gewählte Kleidung und Farben: "+outfit+".",
 "- Logos nur gemäß den ausgewählten Sichtbarkeits- und Farboptionen; keine erfundenen Logos oder zusätzlichen Ärmelstreifen.",
 "",
 "05 · ORT, SZENE & HAUPTFIGUR",
 "- Öffentlicher Ort: "+place+". "+locPhoto,
 "- Gewählte Pose: "+pose+". Blick: "+gaze+". Ausdruck und Handlung: "+act+".",
 poseGuidance?"- POSE-UND-HANDLUNGS-LOCK: "+poseGuidance:"",
 positionRule?"- Verbindliche Läuferposition im Gedränge und Bildraum: "+positionRule:"",
 "- Keine Zeigefingergeste, sofern nicht ausdrücklich als Pose gewählt. Anatomisch korrekte Hände, Arme, Gelenke und natürliche Stand- bzw. Sitzkontakte.",
 "",
 "06 · ZUSCHAUER & NEBENFIGUREN",
 "- Gewählte Zuschauerzahl und Verteilung: "+crowd+". Realistische Abstände, Vorder-, Mittel- und Hintergrund; keine Menschenmenge erfinden, falls deaktiviert.",
 cast&& !/No Premium|Automatic|None/i.test(cast)?"- Ausgewählte Nebenfiguren: "+cast+".":"",
 sides?"- Weitere aktivierte Nebenfiguren und Reaktionen: "+sides+".":"",
 "- Natürlich unterschiedliche Altersgruppen, Staturen, Körpergewichte, Kleidung, Gestik und glaubwürdige Reaktionen. Niemand verdeckt unbeabsichtigt Gesicht oder Plakat.",
 "",
 "07 · BLACK SIGN & PLAKATARCHITEKTUR",
 "- Anzeigenart: "+signType+". Gewählte Position: "+signPosition+". Befestigung: "+mount+".",
 "- Ein real gebautes Plakat mit zur Anzeigenart passenden, sichtbaren Halterungen; keine schwebenden Schilder oder physikalisch unmögliche Befestigung.",
 "- Alle Textzeilen auf einer gemeinsamen horizontalen Mittelachse zentrieren (CENTER LOCK). Sicherheitsränder ausschließlich aus den ausgewählten Typografieeinstellungen; keine überlagernden Buchstaben.",
 typMargin?"- Aktive Randvorgabe: "+typMargin.replace(/^SINGLE MARGIN AUTHORITY[^:]*:\s*/,""):"",
 "- Schriftart: "+font+". Text und Wortfarben aus dem Editor unverändert übernehmen.",
 "",
 "08 · PLAKATTEXT & WORTFARBEN – EXAKT",
 "<<< PLAKATTEXT >>>", sign, "<<< ENDE PLAKATTEXT >>>",
 "Wortfarben pro Originalwort (Hexwerte verbindlich):",colorMap,
 "- Keine zusätzlichen, ausgelassenen oder übersetzten Wörter; alle Leerzeilen, Zeilenumbrüche und Satzzeichen beibehalten.",
 "",
 "09 · BILDQUALITÄT",
 "- Genau ein ultra-fotorealistisches Dokumentarfoto, kein CGI, keine Illustration. Natürliche Haut, Stoffe, Schatten, Perspektive und physikalisch stimmige Materialien.",
 "- Echte Anatomie bei allen Personen: keine verschmolzenen Arme, fehlenden Hände oder doppelten Finger. Hauptfigur und Beschriftung bleiben erkennbar.",
 "",
 "10 · REALITÄTS-LOCK – ECHTES LEBEN",
 "- Umgebung, öffentliche Architektur, Boden, Geländer, Straßen, Wetter und Licht wirken wie in einer realen Alltagsszene.",
 "- Zuschauer sind glaubwürdige normale Menschen mit individuellen Körperformen und Gewichten, nicht uniforme Models oder künstliche Figuren.",
 "- Menschenmenge und Reaktionen entsprechen einer echten spontanen Situation statt einer gestellten Film- oder Werbeszene.",
 "- Atmosphäre: "+ambience+". Keine realen Orts-, Laden- oder Firmennamen und keine erfundenen Werbelogos.",
 "",
 "VERBINDLICHER ABSCHLUSS: PERSON PHOTO für das Gesicht, SHOE PHOTO für beide Schuhe, die einmaligen Kamerawerte und der exakt gewählte Plakattext samt Wortfarben haben Vorrang. Beide Referenzfotos beim Generieren separat beifügen."
 ];
 if(custom.length)lines.push("INDIVIDUELLE NUTZERVORGABEN:",...custom);
 return lines.filter(x=>x!==""||true).join("\n").replace(/\n{3,}/g,"\n\n");
}
buildPrompt=function(){return state.world==="sign"?dePrompt():previous.apply(this,arguments)};
window.stravaSignDeutsch500={version:"V5.0",prompt:dePrompt,original:previous};
const oldRender=render;
render=function(){oldRender.apply(this,arguments);if(state.world!=="sign")return;
 const pre=document.querySelector("#view pre.prompt");
 if(pre)try{pre.textContent=dePrompt()}catch(e){console.error("BLACK SIGN DE",e)}
 const mode=document.getElementById("signCompactMode4524");if(mode){mode.value="full";mode.disabled=true;mode.style.display="none";const info=document.getElementById("signCompactStats4524");if(info)info.textContent="DEUTSCHER TRANSFORMATIONSAUFTRAG · V5.0 · "+(pre?pre.textContent.length:"")+" Zeichen";}
};
})();