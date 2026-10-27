/* V3.1.14 — Top logo color and visibility, independent of garment color. */
(function(){
'use strict';
function ensurePants(){
 const root=document.getElementById('view');if(!root||document.getElementById('pantsLogo270')||document.getElementById('pantsLogoFallback315'))return;
 const field=Array.from(root.querySelectorAll('[data-key="pantsColor"]'))[0];
 if(!field)return;
 const c=state.common;
 const panel=document.createElement('div');panel.id='pantsLogoFallback315';
 panel.style.cssText='border:2px solid #fc4c02;border-radius:12px;padding:14px;margin:12px 0;background:#171b22';
 panel.innerHTML='<div style="color:#fc4c02;font-weight:700;margin-bottom:12px">Hosen-Markenlogo · separat einstellbar</div><label style="display:block;margin:10px 0"><input type="checkbox" id="pantsVisible315"> Markenlogo auf der Hose sichtbar</label><div>Logo-Farbe separat auswählen</div><input type="color" id="pantsPicker315" style="width:120px;height:56px;display:block;margin:8px 0"><label>HEX-Farbe<input type="text" id="pantsHex315" maxlength="7" style="display:block;width:100%;padding:12px;background:#0b0d11;color:white;border:1px solid #505866;border-radius:8px;margin-top:8px"></label>';
 field.closest('.field').insertAdjacentElement('afterend',panel);
 const check=panel.querySelector('#pantsVisible315'),picker=panel.querySelector('#pantsPicker315'),hex=panel.querySelector('#pantsHex315');
 check.checked=c.pantsLogoVisible270!==false;
 picker.value=/^#[0-9a-f]{6}$/i.test(c.pantsLogoColor270||'')?c.pantsLogoColor270:'#ffffff';hex.value=picker.value;
 check.onchange=()=>{c.pantsLogoVisible270=check.checked;save()};
 picker.oninput=()=>{c.pantsLogoColor270=picker.value;hex.value=picker.value;save()};
 hex.onchange=()=>{if(/^#[0-9a-f]{6}$/i.test(hex.value.trim())){c.pantsLogoColor270=hex.value.trim();picker.value=c.pantsLogoColor270;save()}else hex.value=picker.value};
}
function install(){
 ensurePants();
 const root=document.getElementById('view')||document.body;
 const labels=Array.from(root.querySelectorAll('label'));
 const topLabel=labels.find(l=>/^(Oberteilfarbe|Eigener Oberteil-Farbcode)/.test((l.textContent||'').trim()));
 if(!topLabel||document.getElementById('topLogoPanel314'))return;
 const c=state.common;
 const panel=document.createElement('div');panel.id='topLogoPanel314';
 panel.style.cssText='border:2px solid #fc4c02;border-radius:12px;padding:14px;margin:16px 0;background:#171b22';
 const title=document.createElement('div');title.style.cssText='color:#fc4c02;font-size:18px;font-weight:700;margin-bottom:12px';title.textContent='Oberteil-Markenlogo · separat einstellbar';panel.append(title);
 const toggle=document.createElement('label');toggle.style.cssText='display:block;margin:10px 0';const check=document.createElement('input');check.type='checkbox';check.checked=c.topLogoVisible314!==false;toggle.append(check,document.createTextNode(' Markenlogo auf dem Oberteil sichtbar'));panel.append(toggle);
 const text=document.createElement('div');text.textContent='Logo-Farbe separat auswählen';panel.append(text);
 const picker=document.createElement('input');picker.type='color';picker.value=/^#[0-9a-f]{6}$/i.test(c.topLogoColor314||'')?c.topLogoColor314:'#ffffff';picker.style.cssText='width:120px;height:56px;display:block;margin:8px 0 12px';panel.append(picker);
 const caption=document.createElement('label');caption.textContent='HEX-Farbe';caption.style.cssText='display:block';
 const hex=document.createElement('input');hex.type='text';hex.value=picker.value;hex.placeholder='#FFFFFF';hex.style.cssText='display:block;width:100%;padding:12px;background:#0b0d11;color:white;border:1px solid #505866;border-radius:8px;margin-top:8px';caption.append(hex);panel.append(caption);
 const hint=document.createElement('p');hint.style.cssText='color:#a7b0bc;font-size:13px';hint.textContent='Logo der ausgewählten Sportmarke: '+(c.brand||'Neutral')+'. Unabhängig von Oberteil- und Hosenfarbe.';panel.append(hint);
 topLabel.parentElement.parentElement.insertBefore(panel,topLabel.parentElement.nextSibling);
 const persist=()=>{save()};
 check.onchange=()=>{c.topLogoVisible314=check.checked;persist()};
 picker.oninput=()=>{c.topLogoColor314=picker.value;hex.value=picker.value;persist()};
 hex.onchange=()=>{if(/^#[0-9a-f]{6}$/i.test(hex.value.trim())){c.topLogoColor314=hex.value.trim();picker.value=c.topLogoColor314;persist()}else hex.value=picker.value};
}
const priorRender=render;render=function(){priorRender();install()};
const priorPrompt=buildPrompt;buildPrompt=function(){
 let p=priorPrompt(),c=state.common;
 p+='\n\n=== TOP BRAND LOGO — INDEPENDENT COLOR CONTROL ===\n';
 p+='Selected sports brand: '+(c.brand||'Neutral')+'.\n';
 p+=c.topLogoVisible314===false?'No brand logo on upper garment.\n':'Show an authentic, realistically sized and legible '+(c.brand||'sports brand')+' logo on the upper garment, using exact logo color '+(c.topLogoColor314||'#FFFFFF')+'. The logo color is INDEPENDENT of the upper garment color and pants logo color. Do not recolor the garment.\n';
 return p;
};
install();
})();