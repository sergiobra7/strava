
'use strict';
const aw={base:null,graphic:null,quad:null,opacity:.93,scale:.8,crop:0,drag:-1};
function initAutoWall(){
 const c=document.getElementById('awCanvas'); if(!c)return;
 const load=(id,key)=>{document.getElementById(id).onchange=e=>{const f=e.target.files[0];if(!f)return;const url=URL.createObjectURL(f),im=new Image();im.onload=()=>{aw[key]=im;URL.revokeObjectURL(url);if(key==='base'){c.width=im.naturalWidth;c.height=im.naturalHeight;awResetQuad()}awDraw()};im.src=url}};
 load('awBase','base');load('awGraphic','graphic');
 for(const [id,key,div,label] of [['awOpacity','opacity',100,'awOpacityLabel'],['awScale','scale',100,'awScaleLabel'],['awCrop','crop',100,'awCropLabel']]){
 const el=document.getElementById(id);el.value=Math.round(aw[key]*div);
 el.oninput=()=>{aw[key]=Number(el.value)/div;document.getElementById(label).textContent=el.value+'%';awDraw()};
 document.getElementById(label).textContent=el.value+'%';
 }
 document.getElementById('awReset').onclick=()=>{awResetQuad();awDraw()};
 document.getElementById('awDownload').onclick=()=>{if(!aw.base||!aw.graphic){alert('Bitte beide Bilder hochladen.');return}awDraw(false);const a=document.createElement('a');a.download='STRAVA_WALL_V2.5.3_HOMOGRAPHY.png';a.href=c.toDataURL('image/png');a.click();awDraw(true)};
 const coords=e=>{const r=c.getBoundingClientRect();return {x:(e.clientX-r.left)*c.width/r.width,y:(e.clientY-r.top)*c.height/r.height}};
 c.onpointerdown=e=>{if(!aw.quad)return;const p=coords(e),limit=Math.max(c.width,c.height)*.07;let best=limit;aw.drag=-1;aw.quad.forEach((q,i)=>{const d=Math.hypot(q.x-p.x,q.y-p.y);if(d<best){best=d;aw.drag=i}});if(aw.drag>=0)c.setPointerCapture(e.pointerId)};
 c.onpointermove=e=>{if(aw.drag<0)return;const p=coords(e);aw.quad[aw.drag]={x:Math.max(0,Math.min(c.width,p.x)),y:Math.max(0,Math.min(c.height,p.y))};awDraw()};
 c.onpointerup=()=>{aw.drag=-1};c.onpointercancel=()=>{aw.drag=-1};
 awDraw();
}
function awResetQuad(){const c=document.getElementById('awCanvas');if(!c)return;const w=c.width,h=c.height;aw.quad=[{x:.66*w,y:.16*h},{x:.96*w,y:.14*h},{x:.96*w,y:.80*h},{x:.66*w,y:.83*h}]}
function awInterp(u,v){
 // True 4-point projective mapping: one wall plane for logo, all metrics and GPS trace.
 const q=aw.quad; if(!q)return {x:0,y:0};
 const [p0,p1,p2,p3]=q;
 const dx1=p1.x-p2.x,dy1=p1.y-p2.y,dx2=p3.x-p2.x,dy2=p3.y-p2.y;
 const sx=p0.x-p1.x+p2.x-p3.x,sy=p0.y-p1.y+p2.y-p3.y;
 const den=dx1*dy2-dx2*dy1;
 let g=0,h=0;
 if(Math.abs(den)>1e-9){g=(sx*dy2-dx2*sy)/den;h=(dx1*sy-sx*dy1)/den;}
 const a=p1.x-p0.x+g*p1.x,b=p3.x-p0.x+h*p3.x,c=p0.x;
 const d=p1.y-p0.y+g*p1.y,e=p3.y-p0.y+h*p3.y,f=p0.y;
 const w=g*u+h*v+1;
 return {x:(a*u+b*v+c)/w,y:(d*u+e*v+f)/w};
}
function awTriangle(ctx,img,s,t,d){
 const [a,b,c]=s,[p,q,r]=d;
 const den=a.x*(b.y-c.y)+b.x*(c.y-a.y)+c.x*(a.y-b.y);
 if(Math.abs(den)<.001)return;
 const A=(p.x*(b.y-c.y)+q.x*(c.y-a.y)+r.x*(a.y-b.y))/den;
 const B=(p.y*(b.y-c.y)+q.y*(c.y-a.y)+r.y*(a.y-b.y))/den;
 const C=(p.x*(c.x-b.x)+q.x*(a.x-c.x)+r.x*(b.x-a.x))/den;
 const D=(p.y*(c.x-b.x)+q.y*(a.x-c.x)+r.y*(b.x-a.x))/den;
 const E=(p.x*(b.x*c.y-c.x*b.y)+q.x*(c.x*a.y-a.x*c.y)+r.x*(a.x*b.y-b.x*a.y))/den;
 const F=(p.y*(b.x*c.y-c.x*b.y)+q.y*(c.x*a.y-a.x*c.y)+r.y*(a.x*b.y-b.x*a.y))/den;
 ctx.save();ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.lineTo(r.x,r.y);ctx.closePath();ctx.clip();
 ctx.setTransform(A,B,C,D,E,F);ctx.drawImage(img,0,0);ctx.restore();
}
function awDraw(handles=true){
 const c=document.getElementById('awCanvas');if(!c)return;const ctx=c.getContext('2d');ctx.clearRect(0,0,c.width,c.height);
 if(aw.base)ctx.drawImage(aw.base,0,0,c.width,c.height);
 if(aw.graphic&&aw.quad){
 const src=document.createElement('canvas');const im=aw.graphic;const top=Math.round(im.height*aw.crop),bot=top;
 src.width=im.width;src.height=Math.max(1,im.height-top-bot);
 src.getContext('2d').drawImage(im,0,top,im.width,src.height,0,0,src.width,src.height);
 const n=32,m=48;ctx.globalAlpha=aw.opacity;
 for(let j=0;j<m;j++)for(let i=0;i<n;i++){
 const u=i/n,v=j/m,u2=(i+1)/n,v2=(j+1)/m;
 const su=(1-aw.scale)/2+u*aw.scale,sv=(1-aw.scale)/2+v*aw.scale;
 const su2=(1-aw.scale)/2+u2*aw.scale,sv2=(1-aw.scale)/2+v2*aw.scale;
 const p=awInterp(su,sv),q=awInterp(su2,sv),r=awInterp(su2,sv2),t=awInterp(su,sv2);
 const a={x:u*src.width,y:v*src.height},b={x:u2*src.width,y:v*src.height},d={x:u2*src.width,y:v2*src.height},e={x:u*src.width,y:v2*src.height};
 awTriangle(ctx,src,[a,b,d],[p,q,r]);awTriangle(ctx,src,[a,d,e],[p,r,t]);
 }
 ctx.globalAlpha=1;
 }
 if(handles&&aw.quad){
 ctx.save();ctx.strokeStyle='#ff8500';ctx.lineWidth=Math.max(2,c.width/400);ctx.setLineDash([8,5]);ctx.beginPath();aw.quad.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.closePath();ctx.stroke();ctx.setLineDash([]);
 for(const p of aw.quad){ctx.fillStyle='#ff8500';ctx.beginPath();ctx.arc(p.x,p.y,Math.max(9,c.width/90),0,Math.PI*2);ctx.fill();ctx.strokeStyle='white';ctx.stroke()}ctx.restore();
 }
 const m=document.getElementById('awMessage');if(m)m.textContent=aw.base&&aw.graphic?'Orange Eckpunkte an die Wandfläche ziehen. Danach PNG speichern.':'Beide Bilder hochladen, um die Projektion zu sehen.';
}
