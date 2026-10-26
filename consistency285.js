/* V2.8.5 — venue and manual-configuration consistency for Premium cards. */
(function(){
'use strict';
const previous=render;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const poses=['Frontal stehend, beide Arme gestreckt','Stabiler breiter Stand','Auf vorhandenem sicheren Platz stehend','Aufrecht mit frontalem Plakat','Leicht seitlich, Schild frontal','Mittig vor den Zuschauern','Statisch, beide Hände an den Griffen','Auf dem Vorplatz mit freiem Gesicht','Körper frontal zur Kamera','Sicherer Stand, Arme symmetrisch'];
function build(){
 const z=state.sign258||{},p=z.premium270||{},venue=z.situation269||'Bahnhofsvorplatz';
 const category=z.situationCategory269||'Bahnhof & Verkehr';
 const holding=p.holding||'Über Kopf · beide Arme';
 const poster=p.poster||'XXL-Rechteckschild quer';
 const prop=p.prop||'Keine';
 const position=p.position||'Stehend';
 const expression=p.expression||'Kamera';
 const audience=z.audience269&&z.audience269!=='Bestehende Director-Publikumsauswahl'?z.audience269:(p.audience||'Natürliches Publikum');
 const reaction=z.reaction269&&z.reaction269!=='Bestehende Director-Reaktionen'?z.reaction269:(p.reaction||'Natürlich');
 const over=/über kopf/i.test(holding);
 const invalid=over&&(/standbanner|bodenplakat|aufsteller|staffelei|einkaufswagen|koffer-plakat|fahrrad-plakat/i.test(poster)||/neben plakat|sitzend|angelehnt/i.test(position));
 const wrap=document.getElementById('premiumCards270');if(!wrap)return;
 if(invalid){wrap.innerHTML='<div style="border:2px solid #ffb04a;border-radius:10px;padding:14px">⚠️ Die gewählte Plakathaltung „'+esc(holding)+'“ widerspricht der Plakatvariante oder Position. Bitte oben eine kompatible Kombination wählen. Es werden keine widersprüchlichen Szenen vorgeschlagen.</div>';return;}
 const count=10,offset=((Number(p.rotation)||0)*count)%50;
 wrap.innerHTML=Array.from({length:count},(_,i)=>{
   const n=offset+i+1,pose=over?'Beide Arme gestreckt, leichtes Schild über Kopf':poses[(n-1)%poses.length];
   const scene='PS-'+String(n).padStart(3,'0')+' · '+venue.toUpperCase()+' · '+(over?'PLAKAT ÜBER KOPF': 'STATISCHE PLAKATSZENE')+' '+n;
   return '<button class="scene270" type="button" data-consistent285="'+i+'" style="display:block;width:100%;text-align:left;margin:10px 0"><strong>'+esc(scene)+'</strong><small>Ort: '+esc(venue)+'<br>Kategorie: '+esc(category)+'<br>Plakat: '+esc(poster)+'<br>Requisite: '+esc(prop)+'<br>Plakathaltung: '+esc(holding)+'<br>Hauptfigur: '+esc(over?pose:position)+'<br>Mimik: '+esc(expression)+'<br>Publikum: '+esc(audience)+' · '+esc(reaction)+'</small></button>';
 }).join('');
 wrap.querySelectorAll('[data-consistent285]').forEach(button=>button.addEventListener('click',()=>{
   const n=offset+Number(button.dataset.consistent285)+1;
   const title='PS-'+String(n).padStart(3,'0')+' · '+venue+' · '+(over?'Plakat über Kopf':'Statische Plakatszene');
   p.scene=10000+n;p.title=title;p.location=venue;p.audience=audience;p.reaction=reaction;
   p.description='EXACT VENUE LOCK: '+venue+'. CATEGORY: '+category+'. STATIC POSE: '+(over?'Both arms extended, lightweight poster held safely overhead':position)+'. POSTER: '+poster+'. HOLDING: '+holding+'. PROP: '+prop+'. EXPRESSION: '+expression+'. AUDIENCE: '+audience+'. REACTION: '+reaction+'. No alternative location. No incompatible pose or support structure.';
   z.activeSceneSource267='premium';z.activeSceneId267=p.scene;p.open=true;save();render();
   const el=document.getElementById('premiumPanel270');if(el)el.scrollIntoView({block:'start'});
 }));
}
render=function(){previous();if(state.world==='sign'&&state.tab==='Smart Director'&&state.sign258?.premium270?.open)build();};
render();
})();