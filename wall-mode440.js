/* STRAVA WALL V4.4.0 — Screenshot mode authority, original-pixel contract. */
(function(){
'use strict';
function mode(x){return x?.wall?.statsMode440==='only'?'only':'bpm'}
function required(x){return mode(x)==='bpm'?['bpm','route']:['solo']}
function description(x){
 const bpm=mode(x)==='bpm';
 const header='\n\nSTRAVA WALL DATA SOURCE MASTER LOCK V4.4.0 — ABSOLUTE SOURCE PRIORITY:';
 const rules=[
  header,
  'This section controls the physical BLACK-BRICK STRAVA STATISTICS WALL, not the freestanding BLACK SIGN system.',
  bpm?'MODE A — FULL STATISTICS + AVG HR/BPM + ORIGINAL ORANGE GPS ROUTE: TWO user-supplied STRAVA SCREENSHOT image references are mandatory.':'MODE B — STATISTICS ONLY, NO BPM: ONE user-supplied standard STRAVA SCREENSHOT without BPM is mandatory.',
  bpm?'SCREENSHOT A (BPM / COMPLETE STATS): authoritative original pixels for Distance, Pace, Time, Elev Gain, Cal, Avg HR/BPM and STRAVA branding, only to the extent they appear in the screenshot.':'SCREENSHOT C (NORMAL STATS ONLY): authoritative original pixels for every visible metric, its units, layout and any GPS route actually present; do not insert a BPM/Avg HR field.',
  bpm?'SCREENSHOT B (STATS / ROUTE): authoritative ORIGINAL GPS geometry. Extract the visible orange route; do not trace a new path, invent a map, duplicate the stats from B or change its topology.':'If SCREENSHOT C contains an orange route, reproduce those original pixels. If it contains no route, do NOT invent a route or map.',
  'The required original screenshots MUST be uploaded to the final image-generation conversation as distinct image references. Files staged only in the website do not automatically become chat attachments.',
  'Use the PNG pixel-overlay exported by STRAVA WALL if available as the print/layout reference. It is assembled from the real visible source pixels with the nearly-black screenshot background made transparent; all lettering, colors and route strokes come from the originals.',
  'Do not OCR and rewrite or recreate numerals or glyphs in the website. Do not hallucinate run data, interpolate absent values, round digits, add missing labels or replace the route. When the image generator cannot preserve data exactly, use final perspective compositing of the original PNG overlay onto the photographed brick wall.',
  'LAYOUT — SINGLE PHYSICAL BLACK BRICK WALL: MODE A reference composition puts the wall statistics LEFT and the runner near center with the source city environment visible RIGHT; MODE B reference composition puts compact statistics on the RIGHT wall with the runner on real steps to the LEFT. However, the explicitly selected WALL FIELD side (currently '+String(x.wall?.side||'Rechts')+') and chosen runner pose are authoritative over these reference compositions. Show believable natural brick wall termination, architectural depth and unblocked original LOCATION PHOTO context. Do not fill the entire photograph with a featureless black poster.',
  'ON THE WALL: STRAVA branding and white source-derived metrics with the orange source-derived route. Both follow one physically coherent wall-plane perspective. No floating UI, digital signage, poster edges or synthetic overlays.',
  'Keep a natural clear corridor between the runner and the wall data. Do not obscure any text or route with the runner or supporting figures. Preserve exact person identity and supplied shoes.',
  'Original screenshot pixel dimensions and placement may be scaled, translated and perspective-warped onto the wall plane, but the source content must not be redrawn or changed.',
  'Wall field version A is full BPM mode; version B is reduced stats-only mode. No legacy preset may override this screenshot mode.'
 ];
 return rules.join('\n');
}
const previous=buildPrompt;
buildPrompt=function(){
 if(state.world!=='wall')return previous.apply(this,arguments);
 return String(previous.apply(this,arguments))+description(state);
};
window.stravaWallMode440={mode,required,description,version:'V4.4.0'};
})();