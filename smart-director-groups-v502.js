/* BLACK SIGN · Smart Director: 4 Gruppen statt 10 Kacheln, bestehende Auswahlfunktionen bleiben erhalten. */
(function(){
'use strict';
const MATRIX=[
 {id:'ort-plakat',title:'ORT & PLAKAT',icon:'📍',items:[['ort','Ortsgruppe & Standort'],['bereich','Bereich & Umgebung'],['display','Anzeigenmittel'],['befestigung','Befestigung'],['requisiten','Requisiten']]},
 {id:'hauptfigur',title:'HAUPTFIGUR',icon:'🧍',items:[['pose','Pose & Sitzfläche'],['handlung','Handlung & Gesichtsausdruck']]},
 {id:'menschen',title:'MENSCHENMENGE',icon:'👥',items:[['publikum','Publikum & Verteilung'],['figuren','Nebenfiguren & Blickrichtung']]},
 {id:'kamera',title:'KAMERA',icon:'📷',items:[['kamera','Kamera, Brennweite & Format']]}
];
let expanded='ort-plakat';
let busy=false;
const all=MATRIX.flatMap(g=>g.items.map(i=>i[0]));
function audit(){
 const root=document.querySelector('#ps350');
 const original=root?root.querySelector('.ps-grid'):null;
 const buttons=original?Array.from(original.querySelectorAll('[data-ps-open]')):[];
 const expected=new Set(all),actual=new Set(buttons.map(b=>b.dataset.psOpen));
 const missing=[...expected].filter(x=>!actual.has(x));
 const extra=[...actual].filter(x=>!expected.has(x));
 const duplicates=all.filter((x,i)=>all.indexOf(x)!==i);
 const ok=MATRIX.length===4&&all.length===10&&!missing.length&&!extra.length&&!duplicates.length;
 return {ok,groups:MATRIX.length,fields:all.length,missing,extra,duplicates,originalButtons:buttons.length,mode:'Oberflächen-Matrix; keine Bildgenerierung getestet'};
}
function createButton(label,onclick,active){
 const b=document.createElement('button');
 b.type='button';b.textContent=label;b.style.cssText='cursor:pointer;color:#f3f5f7;background:'+(active?'#462819':'#202833')+';border:1px solid '+(active?'#fc4c02':'#566271')+';border-radius:10px;padding:11px;text-align:left;font-size:14px;font-weight:700;min-height:46px;width:100%';
 b.onclick=onclick;return b;
}
function mount(){
 if(busy)return;
 const root=document.querySelector('#ps350');if(!root)return;
 const grid=root.querySelector('.ps-grid');
 if(!grid)return;
 const original=Array.from(grid.querySelectorAll('[data-ps-open]'));
 const auditResult=audit();
 if(!auditResult.ok){console.warn('Smart Director Matrix nicht vollständig',auditResult);return;}
 const active=(original.find(b=>b.classList.contains('on'))||{}).dataset?.psOpen||'ort';
 const category=MATRIX.find(g=>g.items.some(i=>i[0]===active));
 if(!expanded||!MATRIX.some(g=>g.id===expanded))expanded=category?.id||MATRIX[0].id;
 let wrap=root.querySelector('#smartDirectorGroups502');
 if(wrap&&wrap.dataset.active===active&&wrap.dataset.expanded===expanded)return;
 busy=true;
 try{
  grid.style.display='none';
  if(!wrap){wrap=document.createElement('div');wrap.id='smartDirectorGroups502';grid.insertAdjacentElement('beforebegin',wrap);}
  wrap.dataset.active=active;wrap.dataset.expanded=expanded;
  wrap.style.cssText='display:grid;gap:9px;margin:12px 0;';
  wrap.replaceChildren();
  const heading=document.createElement('div');heading.style.cssText='font-size:14px;font-weight:800;color:#a8ddbf;margin:4px 0';heading.textContent='4 HAUPTBEREICHE · EINEN ÖFFNEN';wrap.appendChild(heading);
  for(const group of MATRIX){
   const shell=document.createElement('section');shell.style.cssText='border:1px solid '+(expanded===group.id?'#69cf9b':'#495563')+';border-radius:12px;background:#151b23;overflow:hidden';
   const header=createButton(group.icon+'  '+group.title+'  '+(expanded===group.id?'▴':'▾'),()=>{
    const prior=expanded;expanded=prior===group.id?'':group.id;
    const first=group.items[0][0];
    if(expanded&&(!group.items.some(i=>i[0]===active))){
      const old=original.find(b=>b.dataset.psOpen===first);
      if(old){old.click();return;}
    }
    // Originalbereich bleibt unverändert; nur die kompakte Gruppennavigation wechselt.
    wrap.dataset.active='';
    mount();
   },expanded===group.id);
   header.style.cssText+='border:0;border-radius:0;background:'+(expanded===group.id?'#24392f':'#202833')+';padding:14px 12px;font-size:15px;font-weight:800';
   shell.appendChild(header);
   if(expanded===group.id){
    const options=document.createElement('div');options.style.cssText='display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;padding:10px';
    for(const [key,label] of group.items){
      const option=createButton(label,()=>{
       const old=Array.from(document.querySelectorAll('#ps350 .ps-grid [data-ps-open]')).find(b=>b.dataset.psOpen===key);
       if(old)old.click();
      },active===key);
      option.dataset.groupFilter502=key;
      options.appendChild(option);
    }
    shell.appendChild(options);
   }
   wrap.appendChild(shell);
  }
  const mainPanel=grid.nextElementSibling;
  if(mainPanel&&mainPanel!==wrap&&mainPanel.style){
   mainPanel.style.display=expanded?'':'none';
  }
  const promo=grid.previousElementSibling;
  if(promo&&promo.id==='smartDirectorGroups502'){
   const oldPromo=promo.previousElementSibling;
   if(oldPromo&&oldPromo.querySelector('#psGoPoster412')){
    oldPromo.style.cssText='margin:6px 0;padding:8px;border:1px solid #536173;border-radius:9px;background:#151c24';
    const desc=oldPromo.querySelector('p');if(desc)desc.style.display='none';
    const name=oldPromo.querySelector('b');if(name)name.style.display='none';
    const shortcut=oldPromo.querySelector('#psGoPoster412');if(shortcut){shortcut.textContent='Plakat & Farben öffnen';shortcut.style.cssText='padding:9px 12px;width:100%;font-size:13px';}
   }
  }
  window.stravaDirectorMatrix502Last=auditResult;
 }finally{busy=false;}
}
let scheduled=false;
function schedule(){
 if(scheduled)return;scheduled=true;
 Promise.resolve().then(()=>{scheduled=false;mount()});
}
function init(){
 const view=document.getElementById('view');
 if(!view)return;
 const observer=new MutationObserver(schedule);
 observer.observe(view,{childList:true,subtree:true});
 mount();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
window.stravaDirectorMatrix502={audit,matrix:MATRIX.map(g=>({group:g.title,fields:g.items.map(x=>x[1])})),mount,version:'V5.0.2'};
})();