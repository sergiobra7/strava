/* V2.9.2 — mandatory DB / Hauptbahnhof signage for Bahnhofsvorplatz. */
(function(){
'use strict';
const prior=buildPrompt;
function isStation(v){return /bahnhofsvorplatz|hauptbahnhof.?vorplatz/i.test(String(v||''));}
buildPrompt=function(){
 let base=prior();
 if(state.world!=='sign')return base;
 const z=state.sign258||{};
 const scene=(base.match(/^\[REG-01\] SCENE:\s*(.*)$/m)||[])[1]||'';
 const location=(base.match(/^\[REG-02\] LOCATION \/ ORT:\s*(.*)$/m)||[])[1]||'';
 const selected=z.situation269||'';
 const active=z.activeSceneSource267||'standard';
 // Do not impose station architecture on unrelated selected scenes.
 const station=isStation(location)||isStation(scene)||(active==='premium'&&isStation(selected));
 if(!station)return base;
 const stationName=String(z.stationName292||'').trim();
 const line=stationName?stationName.toLocaleUpperCase('de'):'HAUPTBAHNHOF';
 return base+'\n\n=== MANDATORY BAHNHOFSVORPLATZ STATION SIGNAGE V2.9.2 ===\n'+
 'SCENE TYPE: Bahnhofsvorplatz, real German central railway station forecourt.\n'+
 'ARCHITECTURE: In the recognizable station entrance or main facade background, show a realistic red DB square logo, and DIRECTLY BELOW that DB logo a prominent, sharply legible station name reading exactly: '+line+'.\n'+
 'The station name is physically mounted on the same building signage structure below the DB logo; it must not float, be placed on the protest poster, or appear as a graphic overlay. Preserve perspective, daylight, distance and camera framing.\n'+
 (stationName?'USE THE USER-SPECIFIED STATION NAME EXACTLY.\n':'No city was specified: use the generic word HAUPTBAHNHOF only; do not invent a city or an unsupported real station name.\n')+
 'IMPORTANT: If a DB logo is visible anywhere in the scene, the directly associated HAUPTBAHNHOF station-name sign MUST be visible below it. Both signs must remain readable without zooming or changing camera distance. Do not change the main poster wording.\n'+
 '=== END MANDATORY STATION SIGNAGE ===';
};
window.stationSignage292={isStation};
})();