/* V3.1.1 — Premium uses the existing shared figure library; no new tab. */
(function(){
'use strict';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function draw(){
 if(state.world!=='sign')return;
 const panel=document.getElementById('premiumPanel270');if(!panel)return;
 let box=document.getElementById('premiumCast311');
 if(!box){box=document.createElement('details');box.id='premiumCast311';box.open=true;box.style.cssText='margin:14px 0;border:2px solid #fc4c02;border-radius:12px;padding:14px;background:#181c23';box.innerHTML='<summary style="font-size:18px;font-weight:800;cursor:pointer">FIGUREN & MENSCHENMASSE · MANUELL</summary><div id="premiumCastBody311"></div>';const cards=document.getElementById('premiumCards270');if(cards)cards.parentNode.insertBefore(box,cards);else panel.append(box);}
 const z=state.sign258||(state.sign258={});const sides=state.director?.sides||[];
 const select=(f,i,key,label)=>{let options=window.stravaSideOptions311?window.stravaSideOptions311(f,key):[];if(f[key]&&!options.includes(f[key]))options=[f[key],...options];return '<label style="display:block;margin:8px 0;font-size:14px">'+esc(label)+'<select data-premium-side311="'+i+'" data-key311="'+key+'" style="width:100%;padding:10px;background:#111;color:white;border:1px solid #666;border-radius:7px">'+options.map(x=>'<option value="'+esc(x)+'" '+(x===f[key]?'selected':'')+'>'+esc(x)+'</option>').join('')+'</select></label>'};
 const body=box.querySelector('#premiumCastBody311');
 body.innerHTML='<label style="display:block;margin:12px 0"><input type="checkbox" id="premiumCrowd311" '+(z.forceAudience277?'checked':'')+'> Menschenmasse einschalten</label>'+
 sides.map((f,i)=>'<div style="padding:9px 0;border-top:1px solid #414651"><label style="font-weight:700"><input type="checkbox" data-premium-enable311="'+i+'" '+(f.enabled?'checked':'')+'> '+esc(f.type)+'</label>'+
 (f.enabled?'<div style="padding:8px 0 4px 16px">'+select(f,i,'pose','Pose / Körperhaltung')+select(f,i,'reaction','Mimik / Reaktion')+select(f,i,'gesture','Handgeste')+select(f,i,'target','Blickrichtung')+select(f,i,'position','Position')+select(f,i,'prop','Requisit')+'</div>':'')+'</div>').join('')+
 '<div style="font-size:12px;color:#adb4c0;margin-top:10px">Figuren und Posen sind mit dem bestehenden Reiter Nebenfiguren synchronisiert. Die Premium-Szene bleibt beim Wechsel erhalten.</div>';
 const remember=()=>{z.lastChange310='Premium · Figurenregie';save();render()};
 body.querySelector('#premiumCrowd311').onchange=e=>{z.forceAudience277=e.target.checked;remember()};
 body.querySelectorAll('[data-premium-enable311]').forEach(e=>e.onchange=()=>{sides[+e.dataset.premiumEnable311].enabled=e.checked;remember()});
 body.querySelectorAll('[data-premium-side311]').forEach(e=>e.onchange=()=>{sides[+e.dataset.premiumSide311][e.dataset.key311]=e.value;remember()});
}
const previous=render;render=function(){const wasOpen=document.getElementById('premiumCast311')?.open;previous();draw();if(wasOpen===false){let b=document.getElementById('premiumCast311');if(b)b.open=false;}};
draw();
})();