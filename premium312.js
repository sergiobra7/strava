/* V3.1.12: one linked Premium figure selector; no in-app uploads. */
(function(){
'use strict';
function enhance(){
 const box=document.getElementById('premiumCastBody311');
 if(!box||document.getElementById('premiumFigure312'))return;
 const slots=document.getElementById('premiumSlot320');
 const character=document.getElementById('premiumCharacter320');
 if(!slots||!character)return;
 const figures=state.director&&state.director.sides||[];
 const z=state.sign258||(state.sign258={});
 const idx=Math.max(0,Math.min(Number(z.premiumSlot320)||0,figures.length-1));
 const current=figures[idx];
 const label=document.createElement('label');
 label.id='premiumFigure312';label.style.cssText='display:block;margin:12px 0';
 label.textContent='Figur auswählen';
 const menu=document.createElement('select');menu.id='premiumSingle312';
 menu.style.cssText='width:100%;padding:12px;background:#111;color:white;border:1px solid #666;border-radius:7px';
 const all=typeof ALL_CHARACTERS!=='undefined'?ALL_CHARACTERS.map(x=>x.name):[];
 const types=[...new Set([...figures.map(f=>f.type),...all])];
 for(const name of types){const option=document.createElement('option');option.value='type:'+name;option.textContent=name;menu.append(option)}
 const special=document.createElement('option');special.value='reference';special.textContent='Eigene Figur · Full-Body-Referenz im finalen Prompt';menu.append(special);
 menu.value=current&&current.reference320?'reference':'type:'+(current?current.type:'');
 label.append(menu);
 slots.closest('label').replaceWith(label);
 character.closest('label').remove();
 menu.onchange=()=>{
  const f=figures[idx];if(!f)return;
  if(menu.value==='reference'){f.reference320=true;f.enabled=true}
  else{f.reference320=false;f.type=menu.value.slice(5)}
  z.lastChange310='Premium · Figurenregie';
  save();render();
 };
}
const old=render;render=function(){old();enhance()};
enhance();
})();