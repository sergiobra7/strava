/* STRAVA RUN TRANSFORM V4.7.0 — independent German photographic prompt engine.
   Uses existing poster/outfit data read-only. Never calls BLACK SIGN buildPrompt,
   never changes Premium, ASF or STRAVA WALL state. */
(function(){
'use strict';
if(typeof tabs!=='function'||typeof render!=='function')return;
const KEY='strava-transform-v470';
const LEGACY_KEY='strava-transform-v460';
const tabName='TRANSFORM';
const presets=[
 ['Monumentaler Treppenbalkon','Auf einem eindrucksvollen öffentlichen Steinbalkon hoch über einer breiten Freitreppe. Das schwarze XXL-Banner ist fest an der historischen Fassade über dem Podest verankert.','Ein Fuß steht auf einer niedrigen Steinstufe, ein Unterarm ruht auf dem angewinkelten Knie; er lehnt sich selbstbewusst nach vorn und grinst herausfordernd.'],
 ['Bahnhofsvorplatz','Auf der breiten öffentlichen Steintreppe vor einem monumentalen Bahnhofsgebäude. Das schwarze XXL-Banner hängt sicher an der Fassade hinter ihm.','Er steht mit verschränkten Armen und leicht provokantem Grinsen seitlich vor dem Banner.'],
 ['Markthalle','In der großen öffentlichen Markthalle mit hohem Glasdach und breiten Durchgängen. Das schwarze XXL-Banner hängt an einem sichtbaren stabilen Träger über dem Durchgang.','Er steht lässig und selbstbewusst auf einer breiten Treppenstufe, eine Hand ruht auf dem Geländer.'],
 ['Einkaufsstraße','Mitten in einer weitläufigen belebten Fußgängerzone mit breiten Ladenfassaden und öffentlichen Sitzstufen. Das XXL-Banner ist sichtbar und sicher über dem Platz aufgehängt.','Er lehnt lässig neben einem Einkaufswagen an einem niedrigen öffentlichen Steinpodest.'],
 ['Bäckereivorplatz','Vor einer gut besuchten generischen Bäckerei an einer breiten öffentlichen Einkaufsstraße. Das schwarze XXL-Banner hängt sichtbar befestigt an der Fassade.','Er lehnt locker an einem Einkaufswagen und grinst direkt in die Kamera.'],
 ['Hochgelegene Stadtterrasse','Auf einer großen öffentlichen Aussichtsterrasse über einem dicht besuchten Stadtplatz. Das schwarze XXL-Banner ist mit sichtbaren Halterungen an einer massiven Wand befestigt.','Er steht aufrecht am Geländer, die Unterarme entspannt darauf abgelegt, das Gesicht frei zur Kamera.'],
 ['Bahnhofspassage','In einer riesigen öffentlichen Bahnhofspassage mit breiten Treppen, hohen Säulen und einem offenen Vorplatz. Das schwarze Banner hängt an einem echten, fest montierten Querträger.','Er sitzt rückwärts auf einem stabilen Stuhl, die Unterarme leicht versetzt auf der Lehne, beide Hände natürlich sichtbar.'],
 ['Altstadtplatz','Auf einem weitläufigen historischen Altstadtplatz mit monumentaler Freitreppe. Das schwarze XXL-Banner ist fest an einer großen Steinfront montiert.','Er steht breit und stabil auf dem obersten Absatz, die Arme verschränkt und mit frechem Grinsen.']
,
 ["Glasbrücke über Foodcourt","Im Obergeschoss einer lichtdurchfluteten öffentlichen Einkaufsgalerie über einem riesigen Foodcourt. Ein schwarzes XXL-Stoffbanner hängt mit sichtbaren Stahlseilen an zwei massiven Dachträgern über dem Atrium.","Er lehnt die Unterarme lässig auf die breite Geländerauflage der Glasbrücke und grinst in die Kamera. Unten essen Besucher Pizza."],
 ["Rolltreppen-Galerie","Auf der oberen Galerie einer gewaltigen Shopping-Passage mit gläsernen Rolltreppen und öffentlichem Foodcourt. Das riesige schwarze Banner hängt an echten Deckenankern gut sichtbar über dem zentralen Durchgang.","Er steht neben der Rolltreppe am festen Geländer, beide Füße sicher auf dem Galerieboden; neben ihm diskutieren neugierige Passanten."],
 ["Supermarkt-Kassenmeile","Am überdachten öffentlichen Ausgang eines großen Supermarkts mit langen Schaufenstern und Einkaufswagen. Das XXL-Banner ist sichtbar an einer massiven Außenwand befestigt.","Er steht gelassen neben einem Einkaufswagen, die Arme verschränkt; die Kundschaft mit Einkaufstüten reagiert auf den Text."],
 ["Markthalle unter Glasdach","Auf einer breiten öffentlichen Besuchergalerie in einer riesigen Markthalle unter einem hohen Glasdach. Das schwarze XXL-Banner hängt von einem sichtbaren, robusten Dachquerträger.","Er stützt sich mit beiden Unterarmen auf das Galeriegeländer und blickt provokant zur Kamera; Marktbesucher schauen hinauf."],
 ["Bäckerei mit Warteschlange","Vor einer großen generischen Bäckerei am öffentlichen Platz mit einer langen Warteschlange. Das schwarze Banner hängt mit sichtbaren Ösen sicher an einer hohen modernen Fassade.","Er lehnt selbstbewusst am Einkaufswagen neben der öffentlichen Eingangspassage, eine Hand locker auf dem Griff."],
 ["Food-Truck-Festival","Auf einem weitläufigen öffentlichen Food-Truck-Festival mit bunten neutralen Ständen und vielen Essensgästen. Das XXL-Banner ist an einer gesicherten temporären Traversenkonstruktion befestigt.","Er steht auf einem niedrigen gesicherten Podium am Rand der Essenszone, mit verschränkten Armen und frechem Grinsen."],
 ["Großer Pizza-Abholbereich","Vor dem öffentlichen Eingang einer großzügigen anonymen Pizza-Abholhalle mit Fenstern und Sitzgelegenheiten. Ein riesiges schwarzes Banner ist an der Außenfront mit Stahlösen befestigt.","Er steht entspannt direkt neben einem hohen Stapel neutraler Pizzakartons, lächelt provokant und schaut zur Kamera."],
 ["Bahnhofshalle mit Obergalerie","Auf der öffentlich zugänglichen Galerie einer futuristischen Bahnhofshalle mit hohen Glasbögen. Ein monumentales schwarzes Banner hängt an sichtbaren, stabilen Deckenträgern.","Er steht direkt am Geländer der Galerie, die Arme verschränkt, während Reisende unten zu den roten Worten hinaufschauen."],
 ["Straßenbahn-Haltestelleninsel","Auf einer breiten öffentlichen Straßenbahn-Haltestelleninsel zwischen mehreren überdachten Bahnsteigen. Das schwarze XXL-Banner hängt sichtbar an einer gesicherten temporären Stahltraverse über der Wartefläche.","Er steht breit und gelassen neben dem Fahrgastunterstand und schaut provozierend in die Kamera."],
 ["Busbahnhof mit Überdachung","Im großen öffentlichen Busbahnhof unter einem weit ausladenden Glasdach. Das schwarze Banner hängt von einer festen Metalltraverse hinter dem sicheren Wartebereich.","Er lehnt locker an einem stabilen Geländer und sieht die Kamera mit frechem Grinsen an; Wartende gestikulieren zum Text."],
 ["Fußgängerbrücke über Stadtverkehr","Auf einer breiten öffentlichen Fußgängerbrücke über einem dicht belebten Stadtboulevard. Das gewaltige Banner ist an einer benachbarten massiven Gebäudefront sichtbar befestigt.","Er lehnt mit beiden Unterarmen auf dem breiten Brückengeländer und blickt direkt in die Kamera."],
 ["Bahnhofsvorplatz modern","Auf einem modernen weitläufigen Bahnhofsvorplatz mit überdachten Wartezonen, ohne historische Steintreppen. Ein riesiges schwarzes Banner hängt an einer gesicherten Stahlrahmenkonstruktion.","Er steht mittig vor dem Ankunftsstrom mit verschränkten Armen, ruhig und bewusst provozierend."],
 ["U-Bahn-Vorplatz","Vor einer großen öffentlichen U-Bahn-Station mit modernen Glasaufzügen, breiter Rampe und Menschenstrom. Das XXL-Banner ist an einer hohen ebenen Außenwand glaubwürdig befestigt.","Er steht auf einer flachen sicheren Plattform neben dem Stationszugang und grinst in die Kamera."],
 ["Stadion-Außenumlauf","Auf dem breiten öffentlich zugänglichen Außenumlauf eines gigantischen Stadions, mit Menschen auf mehreren Ebenen. Das riesige schwarze Banner hängt mit sichtbaren Halterungen an der massiven Stadionaußenhaut.","Er lehnt die Unterarme auf ein breites festes Brüstungsgeländer und schaut gelassen zur Kamera."],
 ["Öffentliche Laufbahn mit Tribüne","An einer öffentlich zugänglichen städtischen Laufbahn mit großer Zuschauertribüne. Das XXL-Banner ist an einer stabilen Tribünenfront gesichert, nicht über der Laufbahn schwebend.","Er steht entspannt auf dem breiten Zugangsweg vor den Tribünen, Arme verschränkt, Schuhe vollständig sichtbar."],
 ["Sporthallen-Foyer","Im gigantischen öffentlichen Foyer einer Mehrzweck-Sportarena mit hohen Glasfassaden und großen Besuchertreppen. Das XXL-Banner hängt an echten Metalltraversen über dem Atrium.","Er steht lässig am breiten oberen Besuchergeländer und schaut mit frechem Grinsen zur Kamera."],
 ["Schwimmbad-Vorplatz","Auf dem überdachten öffentlichen Vorplatz eines großen Hallenbads mit modernen Glasflächen und langen Gehwegen. Ein schwarzes XXL-Banner ist an einer hohen Außenfassade montiert.","Er steht direkt neben einem stabilen Handlauf mit verschränkten Armen, trocken und vollständig bekleidet."],
 ["Industriehafen-Kai","An einer abgesicherten öffentlich zugänglichen Hafenpromenade gegenüber einer monumentalen Industrie-Krananlage. Das große schwarze Banner hängt an einer festen Hallenfassade mit sichtbaren Ösen und Seilen.","Er lehnt lässig am breiten Promenadengeländer, mit sicherem Abstand zum Wasser, und grinst direkt in die Kamera."],
 ["Container-Promenade","Auf einer öffentlichen Hafenpromenade gegenüber hohen gestapelten Schiffscontainern. Ein riesiges schwarzes Stoffbanner ist an einem gesicherten Ausstellungsträger verankert.","Er steht vor einem breiten fest montierten Geländer, Arme verschränkt und bewusst asymmetrisch im Vordergrund."],
 ["Gasometer-Vorplatz","Auf einem großen öffentlichen Industriepark-Vorplatz vor einem gewaltigen zylindrischen Gasbehälter. Das schwarze Banner hängt glaubwürdig an einer rechteckigen seitlichen Ausstellungswand.","Er steht auf einem niedrigen öffentlichen Besucherpodest, leicht schräg zur Kamera mit frechem Grinsen."],
 ["Lagerhallen-Passage","In einer großen öffentlich zugänglichen Ausstellungspassage einer ehemaligen Industriehalle mit Stahlstreben und Oberlichtern. Das XXL-Banner ist sicher am Stahlquerträger montiert.","Er sitzt lässig rückwärts auf einem stabilen Besucher-Stuhl und sieht direkt in die Kamera."],
 ["Parkdeck mit Stadtsilhouette","Auf einem breiten öffentlichen Parkdeck mit freier Sicht auf die Stadtsilhouette. Das XXL-Banner hängt an einer hohen angrenzenden massiven Gebäudewand; klare Verankerungen sind sichtbar.","Er lehnt entspannt am breiten, sicheren Parkdeckgeländer, beide Füße vollständig sichtbar."],
 ["Skywalk über Fußgängerzone","Auf einem spektakulären verglasten öffentlichen Skywalk über einer breiten Fußgängerzone. Das Banner hängt an einer benachbarten großen Glas-Stahl-Fassadenstruktur mit sichtbaren Halterungen.","Er steht direkt hinter der breiten Geländerauflage des Skywalks, Arme verschränkt und Gesicht zur Kamera."],
 ["Aussichtsplattform am Fluss","Auf einer weitläufigen öffentlichen Aussichtsplattform am Fluss mit imposanter Skyline. Das schwarze XXL-Banner ist an einer angrenzenden massiven Gebäudefront verankert.","Er lehnt mit beiden Unterarmen am breiten Geländer, natürlich proportioniert und nicht über den Rand gebeugt."],
 ["Stadtpark-Rampe","Auf einer breiten öffentlichen Rampe in einem modernen Stadtpark mit terrassierten Grünflächen und weitläufigen Wegen. Das große Banner ist sicher an einer angrenzenden Veranstaltungsbühne befestigt.","Er steht auf einer flachen Besucherplattform mit verschränkten Armen, während Menschen von den Parkwegen hinaufblicken."],
 ["Rathausplatz modern","Auf einem großen öffentlichen Platz vor einer modernen skulpturalen Glasfassade mit eindrucksvoller Geometrie. Das riesige schwarze Banner ist sichtbar und sicher in einer hohen Fassadennische befestigt.","Er steht mit breitem, stabilem Stand vor der Fassade, Arme verschränkt, und blickt grinsend direkt in die Kamera."],
 ["Museumshof mit Glasdach","In einem öffentlich zugänglichen Museumshof unter einem spektakulären Glasdach. Das XXL-Banner hängt an einer hohen ebenen Innenhofwand mit sichtbaren Stahlösen.","Er sitzt lässig auf einer breiten öffentlichen Sitzbank, ein Arm ruht auf der Rückenlehne, beide Schuhe im Bild."],
 ["Konzerthallen-Plaza","Auf dem weiten öffentlichen Vorplatz einer modernen Konzerthalle mit geschwungenem Dach und großen Glasfronten. Das XXL-Banner ist sicher an einer flachen Seitenfassade befestigt.","Er steht auf einem gesicherten niedrigen Bühnenpodest, die Arme verschränkt und mit provokantem Lächeln."],
 ["Fußgängerzone mit Stadtlichtern","Auf einer sehr breiten belebten Einkaufsstraße zwischen modernen Gebäudefronten und großen öffentlichen Sitzbänken. Das XXL-Banner hängt mit sichtbaren Halterungen an einer hohen Hauswand.","Er lehnt mit dem Rücken lässig an einer stabilen öffentlichen Bank, ein Fuß flach am Boden, und schaut in die Kamera."],
 ["Hochhaus-Atrium","Im öffentlich zugänglichen mehrstöckigen Atrium eines modernen Hochhauses mit offenen Galerien. Das riesige schwarze Banner hängt von einem sichtbar tragfähigen Deckenträger über dem Foyer.","Er steht oben an der Besucherbalustrade, beide Hände entspannt am Geländer und sein Gesicht frei sichtbar."],
 ["Öffentliche Fahrrad-Promenade","Auf einer breiten städtischen Rad- und Fußgängerpromenade mit öffentlichem Wartebereich. Das gigantische Banner hängt an einem gesicherten festen Rahmen über der Platzfläche, ohne den Weg zu blockieren.","Er steht abseits des Verkehrs auf einer breiten Aussichtsfläche, Arme verschränkt und direkt zur Kamera."],
 ["Große Einkaufspassage Außenhof","In einem großzügigen öffentlichen Außenhof eines Einkaufsparks mit mehreren Etagen und überdachten Gängen. Das schwarze XXL-Banner hängt fest an der zentralen Fassade.","Er steht vor einem Einkaufswagen mit beiden Händen locker auf dem Griff; um ihn herum reagieren Passanten mit vollen Einkaufstüten."],
 ["Freiluft-Bühne am Markt","Auf einer breiten gesicherten öffentlichen Veranstaltungsbühne mitten auf einem Marktplatz mit moderner Architektur. Ein schwarzes XXL-Banner ist hinter ihm an einer echten Bühnentraverse befestigt.","Er steht breit und selbstbewusst im Vordergrund, Arme verschränkt, während Zuschauer direkt zum Plakat schauen."],
 ["Öffentliche Hafenterrasse","Auf einer großen öffentlichen Hafenterrasse mit Blick auf Lagerkräne und Schiffe. Ein gewaltiges schwarzes Banner hängt an der Wand eines modernen Besucherzentrums.","Er sitzt lässig auf einer breiten fest eingebauten Sitzbank, ein Unterarm auf einem Knie, beide Füße auf der Terrasse."],
 ["Glasüberdachte Bahnhofspromenade","Auf einer weitläufigen glasüberdachten Bahnhofs-Promenade mit breiten Rolltreppen und Einkaufspassagen. Das Banner hängt an einer gesicherten hohen Hallenwand.","Er lehnt mit verschränkten Armen an einer massiven Stütze auf dem öffentlichen Vorplatz, deutlich vor dem Banner."],
 ["Arena-Parkhausdach","Auf einem öffentlich zugänglichen Parkdeck gegenüber einer großen Sportarena, mit vielen Zuschauern auf den Fußwegen. Das XXL-Banner ist sichtbar an der Arenafassade befestigt.","Er steht entspannt an einem breiten sicheren Geländer und lächelt provozierend in die Kamera."]
];
const categories={"Glasbrücke über Foodcourt":"Konsum & Gastronomie","Rolltreppen-Galerie":"Konsum & Gastronomie","Supermarkt-Kassenmeile":"Konsum & Gastronomie","Markthalle unter Glasdach":"Konsum & Gastronomie","Bäckerei mit Warteschlange":"Konsum & Gastronomie","Food-Truck-Festival":"Konsum & Gastronomie","Großer Pizza-Abholbereich":"Konsum & Gastronomie","Bahnhofshalle mit Obergalerie":"Verkehr & Straße","Straßenbahn-Haltestelleninsel":"Verkehr & Straße","Busbahnhof mit Überdachung":"Verkehr & Straße","Fußgängerbrücke über Stadtverkehr":"Verkehr & Straße","Bahnhofsvorplatz modern":"Verkehr & Straße","U-Bahn-Vorplatz":"Verkehr & Straße","Stadion-Außenumlauf":"Sport & Arena","Öffentliche Laufbahn mit Tribüne":"Sport & Arena","Sporthallen-Foyer":"Sport & Arena","Schwimmbad-Vorplatz":"Sport & Arena","Industriehafen-Kai":"Industrie & Hafen","Container-Promenade":"Industrie & Hafen","Gasometer-Vorplatz":"Industrie & Hafen","Lagerhallen-Passage":"Industrie & Hafen","Parkdeck mit Stadtsilhouette":"Aussicht & Höhe","Skywalk über Fußgängerzone":"Aussicht & Höhe","Aussichtsplattform am Fluss":"Aussicht & Höhe","Stadtpark-Rampe":"Aussicht & Höhe","Rathausplatz modern":"Stadt & Architektur","Museumshof mit Glasdach":"Stadt & Architektur","Konzerthallen-Plaza":"Stadt & Architektur","Fußgängerzone mit Stadtlichtern":"Stadt & Architektur","Hochhaus-Atrium":"Stadt & Architektur","Öffentliche Fahrrad-Promenade":"Verkehr & Straße","Große Einkaufspassage Außenhof":"Konsum & Gastronomie","Freiluft-Bühne am Markt":"Stadt & Architektur","Öffentliche Hafenterrasse":"Industrie & Hafen","Glasüberdachte Bahnhofspromenade":"Verkehr & Straße","Arena-Parkhausdach":"Sport & Arena"};
const poses=[
 ['Aus Szene übernehmen',''],
 ['Arme verschränkt','Er steht mit natürlich verschränkten Armen, selbstbewusstem Stand und frechem Blick direkt zur Kamera.'],
 ['Überkopf-Plakat','Er hält eine eigenständige, handhabbare schwarze Protesttafel mit beiden Händen über dem Kopf; beide Arme sind anatomisch korrekt, die Hände greifen sichtbar den tragfähigen Rahmen. Ein zusätzliches Fassadenbanner wird nicht erzeugt.'],
 ['Fuß auf Stufe','Ein Fuß steht auf einer niedrigen öffentlichen Steinstufe. Er stützt den Unterarm locker auf das angewinkelte Knie und schaut frech direkt in die Kamera.'],
 ['An Geländer lehnen','Er lehnt sich mit beiden Unterarmen locker an ein festes öffentliches Geländer. Beide Füße stehen sicher und natürlich.'],
 ['Anatolisch sitzend','Er sitzt mit natürlich angewinkelten Beinen auf einer breiten öffentlichen Steinstufe, ein Unterarm ruht auf einem Knie. Das Gesicht ist frei sichtbar.'],
 ['Rückwärts auf Stuhl','Er sitzt rückwärts auf einem stabilen vorhandenen Stuhl, die Unterarme leicht versetzt auf der Lehne. Hände und Handgelenke sind sichtbar.']
];
const crowds=[
 ['Empört und aufgebracht','Hunderte aufgebrachte Menschen richten ihre Blicke überwiegend direkt auf die provokanten Aussagen des Plakats. Viele sind empört, wütend oder fassungslos, diskutieren hitzig, schütteln den Kopf oder gestikulieren mit offenen Händen in Richtung der roten Schlüsselwörter. Nicht alle machen dasselbe; ihre Reaktionen bleiben verschieden und natürlich.'],
 ['Wütend und diskutierend','Hunderte verärgerte Zuschauer lesen das Plakat. Einige diskutieren heftig, andere schimpfen sichtbar oder weisen mit offenen Händen auf die provokanten Aussagen. Viele sind empört, einzelne bleiben verblüfft oder skeptisch.'],
 ['Schockiert und verwirrt','Die Passanten sind sichtbar überrascht und irritiert. Die meisten schauen direkt auf den Bannertext; einzelne diskutieren, andere bleiben fassungslos stehen und reagieren mit ungläubigen Gesichtsausdrücken.'],
 ['Gemischt, aber aufmerksam','Eine große lebhafte Menschenmenge betrachtet das Plakat. Einige sind empört, andere lachen ungläubig oder diskutieren lautstark. Die Aufmerksamkeit richtet sich überwiegend auf die geschriebene Botschaft.']
];
function safe(s){return String(s??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));}
function load(){try{const x=JSON.parse(localStorage.getItem(KEY)||localStorage.getItem(LEGACY_KEY)||'{}');return {scene:x.scene||presets[0][0],pose:x.pose||poses[0][0],crowd:x.crowd||crowds[0][0],extra:x.extra||'',world:x.world||'Alle Bildwelten',perspective:x.perspective||'Leichter Weitwinkel',history:Array.isArray(x.history)?x.history.slice(-12):[],saved:Array.isArray(x.saved)?x.saved:[]};}catch(e){return {scene:presets[0][0],pose:poses[0][0],crowd:crowds[0][0],extra:'',world:'Alle Bildwelten',perspective:'Leichter Weitwinkel',history:[],saved:[]};}}
let settings=load();
function store(){localStorage.setItem(KEY,JSON.stringify(settings));}
function poster(){return (state.sign&&state.sign.signText)||'';}
function posterColors(){const z=state.sign||{};try{if(window.stravaSignColorMap318){const m=window.stravaSignColorMap318(z);return m.lines;}}catch(e){}return poster().split('\n').map((line,i)=>'ZEILE '+(i+1)+': '+(line||'[LEERZEILE]')).join('\n');}
function posterFont(){try{const p=JSON.parse(localStorage.getItem('stravaPoster321')||'{}');return p.font||'Impact';}catch(e){return 'Impact';}}
function outfit(){
 const c=state.common||{};
 const brand=c.brand||'PUMA',top=c.top||'Full-Zip-Laufjacke',color=c.topColorHex||c.topColor||'#DFFF00';
 const pants=c.pants||'sportliche Jogginghose',pcol=c.pantsColor||'Schwarz';
 return 'Er trägt die gewählte '+brand+'-'+top+' in '+color+', dazu eine '+pcol+'e '+brand+'-'+pants+', '+(c.cap||'rote Cap rückwärts')+', '+(c.socks||'schwarze Socken')+' und '+(c.watch||'eine schwarze Sportuhr')+'. Verwende exakt die Laufschuhe aus dem separat beigefügten SHOE PHOTO. Keine erfundenen oder mehrfachen Markenlogos; keine zusätzlichen Ärmelstreifen.';
}

const worlds=['Alle Bildwelten','Konsum & Gastronomie','Verkehr & Straße','Sport & Arena','Industrie & Hafen','Aussicht & Höhe','Stadt & Architektur'];
const perspectives={
 'Leichter Weitwinkel':'Eine natürliche leicht weitwinklige Fotoperspektive zeigt viel von der eindrucksvollen Umgebung, das gigantische Plakat und das Publikum. Die Hauptfigur bleibt im nahen, gut erkennbaren Vordergrund, mit unverzerrtem Gesicht und normalen Körperproportionen.',
 'Gesicht im Vordergrund':'Die Hauptfigur steht deutlich im Vordergrund. Gesicht, Bart und Augen sind klar erkennbar; das große Plakat und die Publikumsreaktionen bleiben vollständig im Bild.',
 'Ausgewogene Perspektive':'Eine natürliche dokumentarische Perspektive balanciert Hauptfigur, gigantisches Banner und sichtbar reagierendes Publikum.',
 'Monumentale Übersicht':'Die Szene vermittelt außergewöhnliche räumliche Größe und Tiefe. Die Architektur und das riesige Plakat bleiben vollständig erkennbar, ohne die Hauptfigur winzig werden zu lassen.'
};
const categoryKeywords={
 'Konsum & Gastronomie':/PIZZA|ESSEN|BURGER|FOOD|KAFFEE|BÄCK|SUPERMARKT|EINKAUF|FAST.FOOD|LIEFER|KÜHLSCHRANK|SOFA/,
 'Verkehr & Straße':/BUS|BAHN|AMPEL|HALTESTELLE|SPRINT|VERKEHR|FAHR|ZU FUSS|WARTEN/,
 'Sport & Arena':/SPORT|FITNESS|TRAIN|JOGG|LAUF|KILOMETER|KM|MARATHON/,
 'Industrie & Hafen':/ARBEIT|SCHICHT|WERK|JOB|FABRIK/,
 'Aussicht & Höhe':/TREPPE|STUFEN|AUFZUG|FAUL|OBEN|UNTEN|STEIG/,
 'Stadt & Architektur':/ALLTAG|HANDY|INTERNET|LIK(E|EN)|VIDEO/
};
function category(name){return categories[name]||({'Bahnhofsvorplatz':'Verkehr & Straße','Bahnhofspassage':'Verkehr & Straße','Markthalle':'Konsum & Gastronomie','Bäckereivorplatz':'Konsum & Gastronomie','Einkaufsstraße':'Konsum & Gastronomie','Hochgelegene Stadtterrasse':'Aussicht & Höhe','Monumentaler Treppenbalkon':'Aussicht & Höhe','Altstadtplatz':'Stadt & Architektur'})[name]||'Stadt & Architektur';}
function scenesForWorld(world){return presets.filter(p=>world==='Alle Bildwelten'||category(p[0])===world);}
function chooseCandidates(exclude){
 const all=scenesForWorld(settings.world);
 const recent=new Set((settings.history||[]).slice(-9));
 let pool=all.filter(p=>!recent.has(p[0])&&!(exclude||[]).includes(p[0]));
 if(!pool.length)pool=all.filter(p=>!(exclude||[]).includes(p[0]));
 if(!pool.length)pool=all;
 const txt=poster().toUpperCase();
 const scored=pool.map(p=>{
   const cat=category(p[0]),rx=categoryKeywords[cat],hit=rx&&rx.test(txt);
   const pizza=/PIZZA|BURGER|ESSEN|FOOD/.test(txt);
   const direct=pizza&&/Foodcourt|Pizza|Food-Truck|Markthalle|Einkauf/.test(p[0]);
   return {p,weight:1+(hit?4:0)+(direct?4:0)};
 });
 return scored;
}
function pickScene(exclude){
 const weighted=chooseCandidates(exclude);
 const total=weighted.reduce((n,x)=>n+x.weight,0);
 let t=Math.random()*total;
 for(const x of weighted){t-=x.weight;if(t<=0)return x.p[0];}
 return weighted[weighted.length-1].p[0];
}
function markScene(name){settings.history=(settings.history||[]).filter(x=>x!==name);settings.history.push(name);settings.history=settings.history.slice(-12);}
function safePoseFor(sceneName,selectedPose){
 const name=sceneName||'',cat=category(name);
 if(selectedPose==='Aus Szene übernehmen')return 'Aus Szene übernehmen';
 if(selectedPose==='An Geländer lehnen'&&!/Geländer|Brücke|Galerie|Skywalk|Promenade|Terrasse|Parkdeck|Umlauf|Atrium|Rampe|Hafen|Aussicht/.test(name))return 'Aus Szene übernehmen';
 if(selectedPose==='Anatolisch sitzend'&&!/Treppe|Bahnhof|Sitz|Park|Stadion|Galerie|Parkdeck|Promenade/.test(name))return 'Aus Szene übernehmen';
 if(selectedPose==='Fuß auf Stufe'&&!/Treppe|Stufe|Bahnhof|Arena|Museum|Galerie/.test(name))return 'Aus Szene übernehmen';
 if(selectedPose==='Rückwärts auf Stuhl'&&!/Food|Markt|Halle|Museum|Bäck|Pizza|Einkauf|Passage/.test(name))return 'Aus Szene übernehmen';
 return selectedPose;
}

function sceneValues(config){
 const values=config||settings;const current=presets.find(p=>p[0]===values.scene)||presets[0];
 if(values.scene==='Aktuelle Premium-Szene'){
  const r=window.stravaEffectiveScene390&&window.stravaEffectiveScene390();
  const c=r&&r.effective;
  if(c)return ['Aktuelle Premium-Szene','An einem öffentlichen Ort: '+c.place+'. Das gewählte XXL-Plakat ist sichtbar und physikalisch glaubwürdig an einer geeigneten öffentlichen Architektur befestigt.','Hauptfigur-Pose: '+c.pose+'. Handlung: '+c.action+'. Das Gesicht bleibt zur Kamera erkennbar.'];
 }
 return current;
}
function createPrompt(config){
 const active=config||settings;
 const z=state.sign||{},text=String(poster()).trim();if(!text)throw Error('Im Plakat-Editor fehlt ein Text.');
 const selected=sceneValues(active);const approvedPose=safePoseFor(active.scene,active.pose);const pose=poses.find(p=>p[0]===approvedPose);
 const poseText=pose&&pose[1]?pose[1]:selected[2];
 const crowd=(crowds.find(p=>p[0]===active.crowd)||crowds[0])[1];
 const overHead=approvedPose==='Überkopf-Plakat';
 const backdrop=overHead?selected[1].replace(/Das schwarze XXL-Banner[^.]*\./g,'').replace(/Das XXL-Banner[^.]*\./g,'').replace(/Das schwarze Banner[^.]*\./g,'') : selected[1];
 const mount=overHead?'Die Protesttafel wird tatsächlich mit beiden Händen über dem Kopf gehalten und ist als handhabbares Schild konstruiert.':'Ein einziges monumentales schwarzes Protestplakat ist vollständig sichtbar, baulich glaubwürdig verankert und verdeckt weder Gesicht noch Körper.';
 const perWord=posterColors();
 const notes=(active.extra||'').trim();
 const formatted=[
 'Transformiere diese Person aus dem beigefügten Gesichtsfoto in einen selbstbewussten Marathonläufer, der an einem außergewöhnlichen öffentlichen Ort eine provokative Demonstration gegen Bewegungsfaulheit veranstaltet.',
 '',
 'GESICHT UND IDENTITÄT:',
 'Bewahre sein echtes Gesicht aus dem PERSON PHOTO 1:1: dieselben Augen, Augenbrauen, Nase, Lippen, Bart, natürliche Hautstruktur und individuellen Gesichtszüge. Keine Verschönerung und keine Veränderung der Identität. Ein normal proportionierter erwachsener Körper mit natürlicher Kopfgröße, natürlichem Oberkörper und realistischen Beinen, ohne künstliche Streckung.',
 '',
 'OUTFIT UND SCHUHE:',
 outfit(),
 '',
 'DIE SZENE:',
 backdrop,
 poseText,
 'Der Marathonläufer bleibt gut erkennbar, selbstbewusst und ruhig. Sein Gesicht und seine Schuhe sind sichtbar, während die Menschen auf seine provokante Botschaft reagieren.',
 perspectives[active.perspective]||perspectives['Leichter Weitwinkel'],
 mount,
 '',
 'DIE EMPÖRTE MENSCHENMENGE:',
 crowd,
 'Die Menschen stehen in unregelmäßigen Gruppen mit natürlicher Tiefenstaffelung und verschiedenartigen Gesten. Keine gleichförmig ausgerichteten Köpfe, keine choreografierte Menge und keine Gewalt.',
 '',
 'EXAKTER TEXT AUF DEM SCHWARZEN PLAKAT:',
 text,
 '',
 'SCHRIFT, ROT-WEISS-FARBEN UND ABSÄTZE:',
 'Verwende die im Plakat-Editor gewählte Schrift '+posterFont()+'. Die Großbuchstaben sind kräftig, breit, massiv und klar lesbar, nicht horizontal gestaucht und nicht künstlich verengt. Der Text ist sauber mittig gesetzt. Exakte Wörter, Satzzeichen und Zeilenumbrüche beibehalten. Zwischen den inhaltlichen Textblöcken bleibt die vorhandene Leerzeile deutlich sichtbar; nicht zwischen jede einzelne Zeile zusätzlichen Abstand einfügen.',
 'Diese Wortfarben sind verbindlich. Jedes einzelne Wort erhält exakt die angegebene Farbe; die Leerzeilen bleiben leer:',
 perWord,
 'Rote Schlüsselwörter sind Signalrot #FF4B30, sofern der Plakat-Editor diese Farbe festgelegt hat. Die tatsächlich ausgewählten Einzelwortfarben aus der obigen Liste haben stets Vorrang.',
 '',
 ...(notes?['ZUSÄTZLICHER SZENENWUNSCH:',notes,'']:[]),
 'FOTOGRAFISCHE UMSETZUNG:',
 'Ein einziges ultrafotorealistisches dokumentarisches Straßenfoto mit natürlichem Tageslicht, glaubwürdigen Schatten, realen Materialien und authentischen Reaktionen. Das Gesicht und der vollständige Text sind gut zu erkennen. Keine künstliche Illustration, kein CGI, keine erfundenen Geschäftsnamen. Genau ein Bild im nativen 9:16-Hochformat.'
 ].join('\n');
 return formatted;
}
function option(list,selected){return list.map(x=>'<option value="'+safe(x)+'"'+(selected===x?' selected':'')+'>'+safe(x)+'</option>').join('');}
function view(){
 const current=sceneValues();
 const allScenes=scenesForWorld(settings.world).map(p=>p[0]);
 return '<section class="panel" id="transform460" style="border:2px solid #69cf9b">'+
 '<h2>TRANSFORM-STUDIO · V4.7.0</h2><p class="hint">Deutscher Smart Scene Director · 44 eigenständige Schauplätze · keine Kamera-Pflichtwerte · Plakat-Editor bleibt erhalten.</p>'+
 '<div class="field"><label for="tfWorld460">01 · Bildwelt</label><select id="tfWorld460">'+option(worlds,settings.world)+'</select></div>'+
 '<div class="field"><label for="tfScene460">02 · Schauplatz & Auftritt</label><select id="tfScene460">'+option([...allScenes,'Aktuelle Premium-Szene'],settings.scene)+'</select><p class="hint">Wird automatisch passend zur Bildwelt und zum Plakat empfohlen.</p></div>'+
 '<div class="field"><label for="tfPose460">03 · Deine Pose</label><select id="tfPose460">'+option(poses.map(x=>x[0]),settings.pose)+'</select></div>'+
 '<div class="field"><label for="tfCrowd460">04 · Zuschauerreaktion</label><select id="tfCrowd460">'+option(crowds.map(x=>x[0]),settings.crowd)+'</select></div>'+
 '<div class="field"><label for="tfPerspective460">05 · Bildwirkung (keine Kamera-Millimeter)</label><select id="tfPerspective460">'+option(Object.keys(perspectives),settings.perspective)+'</select></div>'+
 '<div class="field"><label for="tfExtra460">06 · Eigene Szenenergänzung (optional)</label><textarea rows="2" id="tfExtra460" placeholder="z. B. Zuschauer zeigen empört auf die roten Wörter">'+safe(settings.extra)+'</textarea></div>'+
 '<div class="notice" style="border-left-color:#69cf9b"><b>07 · Plakat & Outfit direkt aus deinen vorhandenen Einstellungen</b><p class="hint">Plakattext, Leerzeilen und Wortfarben aus Plakat. Outfit aus Hauptfigur. Kein zweiter Plakat-Editor.</p>'+
 '<div style="white-space:pre-wrap;font-size:12px;background:#0f131a;padding:10px;border-radius:8px">'+safe(poster()||'Noch kein Plakattext')+'</div><button class="btn secondary" type="button" id="tfPoster460" style="margin-top:9px">Plakat-Editor öffnen</button></div>'+
 '<div class="actions"><button class="btn secondary" type="button" id="tfRandom470">ÜBERRASCH MICH · neue Szene</button><button class="btn secondary" type="button" id="tfVariants470">3 KREATIVE VARIANTEN</button></div>'+
 '<div id="tfVariantsView470" style="display:grid;gap:10px;margin:12px 0"></div>'+
 '<div class="actions"><button class="btn" type="button" id="tfCopy460" style="width:100%;min-height:52px;background:#16875b">AKTUALISIEREN & PROMPT KOPIEREN</button><button class="btn secondary" type="button" id="tfRefresh460">Vorschau aktualisieren</button></div>'+
 '<p id="tfStatus460" role="status" class="hint" style="min-height:20px"></p>'+
 '<label for="tfPreview460">Dein natürlich formulierter deutscher Transformations-Prompt</label>'+
 '<textarea id="tfPreview460" readonly rows="16" style="min-height:330px;font-size:13px"></textarea>'+
 '<div class="actions"><button type="button" class="btn secondary" id="tfSave460">Szene als TRANSFORM-Preset speichern</button></div>'+
 '<div class="field"><label for="tfSaved460">Meine TRANSFORM-Presets</label><select id="tfSaved460"><option value="">Gespeicherten Entwurf auswählen</option>'+settings.saved.map((x,i)=>'<option value="'+i+'">'+safe(x.name)+'</option>').join('')+'</select></div>'+
 '<div class="actions"><button type="button" class="btn secondary" id="tfLoad460">Preset laden</button><button type="button" class="btn ghost" id="tfDelete460">Preset löschen</button></div>'+
 '<p class="hint">Angehängte Bilder werden weiterhin beim Erzeugen des Bildes als PERSON PHOTO und SHOE PHOTO beigefügt. Der neue Reiter erzeugt nur den Textauftrag.</p></section>';
}
function bind(){
 const root=document.getElementById('transform460');if(!root)return;
 const el=id=>root.querySelector('#'+id);
 const status=el('tfStatus460'),preview=el('tfPreview460');
 function read(){
  settings.scene=el('tfScene460').value;
 settings.world=el('tfWorld460').value;
 settings.perspective=el('tfPerspective460').value;
  settings.pose=el('tfPose460').value;
  settings.crowd=el('tfCrowd460').value;
  settings.extra=el('tfExtra460').value;
  store();
 }
 function refresh(){
  try{read();const prompt=createPrompt();preview.value=prompt;status.textContent='✓ Vorschau aktualisiert · '+prompt.length+' Zeichen · Plakattext und Farben aus dem Editor';return prompt;}
  catch(e){status.textContent='⚠ '+e.message;return '';}
 }
 ['tfScene460','tfPose460','tfCrowd460','tfExtra460','tfPerspective460'].forEach(id=>el(id).addEventListener('change',refresh));
 el('tfRefresh460').onclick=refresh;
 el('tfWorld460').onchange=function(){settings.world=el('tfWorld460').value;settings.scene=pickScene();settings.pose='Aus Szene übernehmen';store();render();};
 el('tfRandom470').onclick=function(){read();settings.scene=pickScene();settings.pose='Aus Szene übernehmen';settings.crowd=crowds[Math.floor(Math.random()*crowds.length)][0];markScene(settings.scene);store();render();};
 el('tfVariants470').onclick=function(){read();const used=[];let html='';window.stravaTransformVariants470=[];for(let i=0;i<3;i++){const scene=pickScene(used);used.push(scene);const variant={...settings,scene,pose:'Aus Szene übernehmen'};const result=createPrompt(variant);window.stravaTransformVariants470.push(result);markScene(scene);html+='<div class="scene"><strong>VARIANTE '+(i+1)+' · '+safe(scene)+'</strong><p class="tiny">'+safe(category(scene))+' · '+result.length+' Zeichen</p><button class="btn secondary" type="button" data-tfcopy="'+i+'">Diesen Auftrag kopieren</button></div>';}store();el('tfVariantsView470').innerHTML=html;el('tfVariantsView470').querySelectorAll('[data-tfcopy]').forEach(btn=>btn.onclick=function(){const i=Number(btn.dataset.tfcopy),v=window.stravaTransformVariants470[i];if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(v).then(()=>{status.textContent='✓ Variante '+(i+1)+' kopiert';},()=>{preview.value=v;preview.focus();preview.select();document.execCommand('copy');status.textContent='Variante in Vorschau ausgewählt';});}else{preview.value=v;preview.focus();preview.select();document.execCommand('copy');status.textContent='Variante kopiert';}});status.textContent='✓ Drei unterschiedliche Szenen zusammengestellt';};
 el('tfPoster460').onclick=function(){state.tab='Plakat';save();render();window.scrollTo(0,0);};
 el('tfCopy460').onclick=function(){
  const prompt=refresh();if(!prompt)return;
  const fallback=function(){
   preview.focus();preview.select();preview.setSelectionRange(0,prompt.length);
   const ok=document.execCommand('copy');
   status.textContent=ok?'✓ TRANSFORM-Prompt kopiert · '+prompt.length+' Zeichen':'⚠ Text in der Vorschau markieren und manuell kopieren';
  };
  if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(prompt).then(()=>{status.textContent='✓ TRANSFORM-Prompt kopiert · '+prompt.length+' Zeichen';},fallback);
  else fallback();
 };
 el('tfSave460').onclick=function(){
  read();const name=window.prompt('Name für den TRANSFORM-Entwurf',settings.scene);if(!name||!name.trim())return;
  settings.saved.push({name:name.trim(),scene:settings.scene,pose:settings.pose,crowd:settings.crowd,extra:settings.extra,world:settings.world,perspective:settings.perspective});store();render();
 };
 el('tfLoad460').onclick=function(){const x=settings.saved[Number(el('tfSaved460').value)];if(!x||!el('tfSaved460').value)return;Object.assign(settings,{scene:x.scene,pose:x.pose,crowd:x.crowd,extra:x.extra});store();render();};
 el('tfDelete460').onclick=function(){const v=el('tfSaved460').value;if(v==='')return;settings.saved.splice(Number(v),1);store();render();};
 refresh();
}
const oldTabs=tabs;tabs=function(){const values=oldTabs();if(state.world!=='sign')return values;return values.includes(tabName)?values:[...values.slice(0,2),tabName,...values.slice(2)];};
const oldRender=render;render=function(){
 oldRender();
 if(state.world!=='sign'||state.tab!==tabName)return;
 const holder=document.getElementById('view');if(!holder)return;
 holder.innerHTML=view();bind();
};
/* Repaint the navigation immediately after installing the new tab; the first page render happened earlier. */
if(state.world==='sign')render();
window.stravaTransform460={createPrompt:createPrompt,version:'V4.7.0',getSettings:()=>JSON.parse(JSON.stringify(settings))};
})();