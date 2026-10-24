import * as THREE from 'three';
import {RoomEnvironment} from 'three/examples/jsm/environments/RoomEnvironment.js';
import portraitUrl from './portrait.jpeg';
const W=2.25,H=2.7,T=.075,GAP=.004,OFF=W/2+GAP,SHI=H-.1,SWI=W-.062,CXI=(2*GAP+W-.038)/2,XEDGE=GAP+W-.05,PZ=(T+.01)/2,CW=700,CH=832,CS=.9;
const FIN={titanium:'#b9b7b1',graphite:'#3b3c3f',coral:'#d99c8d',sage:'#a9b6a0'};
const POSM=[[-1.0,1.8,.2],[0,2.0,-.3],[1.0,1.75,.3],[-1.05,-1.65,.3],[0,-1.8,-.3],[1.05,-1.65,.2]];
const POS=[[-2.05,.95,.3],[-2.55,-.2,-.6],[-2.0,-1.05,.5],[2.05,1.0,-.2],[2.55,-.15,.4],[2.0,-1.1,-.5]];
const mobile=()=>innerWidth<760||innerWidth/innerHeight<.9;
const ease=(a,b,x)=>{x=Math.min(1,Math.max(0,(x-a)/(b-a)));return x*x*(3-2*x)};
const radii=(side,o,i)=>side>0?[i,o,o,i]:[o,i,i,o];
function outline([a,b,c,d],w,h){const s=new THREE.Shape(),x=-w/2,y=-h/2,X=w/2,Y=h/2;s.moveTo(x+d,y);s.lineTo(X-c,y);s.quadraticCurveTo(X,y,X,y+c);s.lineTo(X,Y-b);s.quadraticCurveTo(X,Y,X-b,Y);s.lineTo(x+a,Y);s.quadraticCurveTo(x,Y,x,Y-a);s.lineTo(x,y+d);s.quadraticCurveTo(x,y,x+d,y);return s}
function flat(r,w,h){const g=new THREE.ShapeGeometry(outline(r,w,h),10),p=g.attributes.position,u=g.attributes.uv;for(let i=0;i<p.count;i++)u.setXY(i,p.getX(i)/w+.5,p.getY(i)/h+.5);return g}
function slab(r,w,h,d){const g=new THREE.ExtrudeGeometry(outline(r,w-.04,h-.04),{depth:d-.04,bevelEnabled:true,bevelThickness:.02,bevelSize:.02,bevelSegments:5,curveSegments:12});g.translate(0,0,-(d-.04)/2);return g}
function canvasTex(w,h,draw){const c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d'),tex=new THREE.CanvasTexture(c);tex.colorSpace=THREE.SRGBColorSpace;tex.anisotropy=8;const run=()=>{g.clearRect(0,0,w,h);g.textAlign='left';draw(g);g.textAlign='left';tex.needsUpdate=true};run();return {tex,draw:run}}
function screenTex(kind,photo,label){
  const card=(g,y,t,s)=>{g.textAlign='left';g.fillStyle='#ffffff2b';g.beginPath();g.roundRect(40,y,620,88,26);g.fill();g.fillStyle='#fff';g.font='700 27px Manrope Variable, sans-serif';g.fillText(t,74,y+38);g.font='400 20px DM Mono, monospace';g.fillStyle='#ffffffc4';g.fillText(s,74,y+67)};
  return canvasTex(CW,CH,g=>{
    if(kind==='lock'){
      g.fillStyle='#1b1c1a';g.fillRect(0,0,CW,CH);
      if(photo.complete&&photo.naturalWidth){const r=Math.max(CW/photo.naturalWidth,CH/photo.naturalHeight);g.drawImage(photo,(CW-photo.naturalWidth*r)/2,0,photo.naturalWidth*r,photo.naturalHeight*r)}
      const gr=g.createLinearGradient(0,0,0,CH);gr.addColorStop(0,'#0006');gr.addColorStop(.1,'#0000');gr.addColorStop(.36,'#0000');gr.addColorStop(.6,'#000b');gr.addColorStop(1,'#000e');g.fillStyle=gr;g.fillRect(0,0,CW,CH);
      const d=new Date();g.fillStyle='#fff';g.font='500 22px DM Mono, monospace';g.fillText('INFINITE OJ',44,56);g.textAlign='right';g.fillText('5G   87% ▭',CW-44,56);
      g.textAlign='center';g.font='500 22px DM Mono, monospace';g.fillStyle='#ffffffe0';g.fillText(d.toLocaleDateString('en-NG',{weekday:'long',month:'long',day:'numeric'}).toUpperCase(),350,350);
      g.fillStyle='#fff';g.font='400 235px Anton, sans-serif';g.fillText(d.toLocaleTimeString('en-NG',{hour:'2-digit',minute:'2-digit',hour12:false}),350,556);
      card(g,596,'Kinda is live','SOCIAL TASK APP · NOW');card(g,696,'Ghost Protocol','E2E ENCRYPTED · 2H AGO');
      g.fillStyle='#ffffffd0';g.textAlign='center';g.font='500 20px DM Mono, monospace';g.fillText('SCROLL TO UNFOLD',350,812);
    }else{g.fillStyle='#f4f3ef';g.fillRect(0,0,CW,CH);g.fillStyle='#e6e5e0';g.font='400 170px Anton, sans-serif';g.textAlign='center';g.fillText(label,350,470)}
  });
}
function cardTex(it){return canvasTex(512,512,g=>{g.fillStyle=it.tone;g.fillRect(0,0,512,512);g.fillStyle='#171816';g.font='500 22px DM Mono, monospace';g.fillText((it.sub||'').toUpperCase(),36,60);g.font='400 112px Anton, sans-serif';const words=it.title.toUpperCase().split(' ');let y=512-46-(words.length-1)*104;words.forEach(w=>{g.fillText(w,36,y);y+=104});g.font='500 22px DM Mono, monospace';g.textAlign='right';g.fillText('OPEN ↗',476,60)})}
const rp=(x,y,w,h,[a,b,c,d])=>`M${x+a} ${y}H${x+w-b}A${b} ${b} 0 0 1 ${x+w} ${y+b}V${y+h-c}A${c} ${c} 0 0 1 ${x+w-c} ${y+h}H${x+d}A${d} ${d} 0 0 1 ${x} ${y+h-d}V${y+a}A${a} ${a} 0 0 1 ${x+a} ${y}Z`;
export function createPhone({host,overlay,onState,onProgress=()=>{},atTop=()=>true,items=[],onPick=()=>{}}){
  const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;
  const cv=renderer.domElement;cv.className='gl';host.prepend(cv);
  const scene=new THREE.Scene(),cam=new THREE.PerspectiveCamera(30,1,.1,60);
  scene.environment=new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(),.04).texture;
  const key=new THREE.DirectionalLight('#fff',1.3);key.position.set(2,3,4);scene.add(key);
  const holder=new THREE.Group(),rig=new THREE.Group(),left=new THREE.Group(),li=new THREE.Group();
  left.position.z=-PZ;li.position.z=PZ;left.add(li);rig.add(left);holder.add(rig);scene.add(holder);
  const metal=new THREE.MeshPhysicalMaterial({color:FIN.titanium,metalness:.95,roughness:.26,clearcoat:.5,clearcoatRoughness:.3});
  const black=new THREE.MeshStandardMaterial({color:'#040405',roughness:.3});
  const glass=new THREE.MeshPhysicalMaterial({color:'#0b0b0c',roughness:.12,metalness:.2,clearcoat:1});
  const photo=new Image();photo.src=portraitUrl;
  const tex={left:screenTex('pale',photo,'INFINITE'),right:screenTex('lock',photo),};tex.right2=null;
  const rightPale=screenTex('pale',photo,'OJ');
  const mats={};
  [[li,-1,'left',tex.left],[rig,1,'right',tex.right]].forEach(([grp,sd,name,t])=>{
    const b=new THREE.Mesh(slab(radii(sd,.12,.012),W,H,T),metal);b.position.x=sd*OFF;grp.add(b);
    const z=new THREE.Mesh(flat(radii(sd,.095,.004),W-.032,H-.06),black);z.position.set(sd*(GAP+.004+(W-.032)/2),0,T/2+.0006);grp.add(z);
    mats[name]=new THREE.MeshBasicMaterial({map:t.tex,toneMapped:false});
    const s=new THREE.Mesh(flat(radii(sd,.075,.004),SWI,SHI),mats[name]);s.position.set(sd*CXI,0,T/2+.0014);grp.add(s);
  });
  const back=new THREE.Mesh(flat(radii(1,.095,.004),W-.032,H-.06),glass);back.rotation.y=Math.PI;back.position.set(-(GAP+.004+(W-.032)/2),0,-(T/2+.0006));li.add(back);
  const isl=new THREE.Mesh(flat([.07,.07,.07,.07],.5,.5),black);isl.rotation.y=Math.PI;isl.position.set(-1.78,H/2-.42,-(T/2+.003));li.add(isl);
  [[-.1,.1],[.1,-.1]].forEach(([dx,dy])=>{const r=new THREE.Mesh(new THREE.RingGeometry(.07,.095,32),metal);r.rotation.y=Math.PI;r.position.set(-1.78+dx,H/2-.42+dy,-(T/2+.0045));li.add(r)});
  const dot=new THREE.Mesh(new THREE.CircleGeometry(.026,24),black);dot.position.set(OFF+W/2-.2,H/2-.13,T/2+.003);rig.add(dot);
  [[.5,.38],[.0,.24]].forEach(([y,h])=>{const bt=new THREE.Mesh(new THREE.BoxGeometry(.022,h,.04),metal);bt.position.set(W+GAP-.008,y,0);rig.add(bt)});
  const hinge=new THREE.Mesh(new THREE.CylinderGeometry(.04,.04,H*.9,32),metal);rig.add(hinge);
  /* orbit: interactive 3D cards */
  const orbitG=new THREE.Group(),cards=[],bodies=[];scene.add(orbitG);
  items.slice(0,6).forEach((it,i)=>{
    const g=new THREE.Group(),ct=cardTex(it),mat=new THREE.MeshStandardMaterial({color:it.tone,roughness:.35,metalness:.1});
    const b=new THREE.Mesh(slab([.12,.12,.12,.12],CS,CS,.11),mat);b.userData.i=i;g.add(b);bodies.push(b);
    const f=new THREE.Mesh(flat([.1,.1,.1,.1],CS-.02,CS-.02),new THREE.MeshBasicMaterial({map:ct.tex,toneMapped:false}));f.position.z=.0575;g.add(f);
    const f2=f.clone();f2.rotation.y=Math.PI;f2.position.z=-.0575;g.add(f2);
    g.visible=false;orbitG.add(g);cards.push({g,p:POS[i],ph:i*1.7,h:0,spin:{x:0,y:0},vel:{x:0,y:0},ct});
  });
  let orbitOn=false,hover=-1,drag=null,moved=0;
  const ray=new THREE.Raycaster(),ndc=new THREE.Vector2();
  const pickAt=e=>{if(!orbitG.visible)return -1;const r=cv.getBoundingClientRect();ndc.set((e.clientX-r.left)/r.width*2-1,-((e.clientY-r.top)/r.height)*2+1);ray.setFromCamera(ndc,cam);const h=ray.intersectObjects(bodies,false)[0];return h?h.object.userData.i:-1};
  cv.addEventListener('pointermove',e=>{if(drag){const c=cards[drag.i];c.vel.y+=e.movementX*.004;c.vel.x+=e.movementY*.004;moved+=Math.abs(e.movementX)+Math.abs(e.movementY);return}hover=pickAt(e);cv.style.cursor=hover>=0?'grab':'pointer'});
  cv.addEventListener('pointerdown',e=>{const i=pickAt(e);if(i>=0){drag={i};moved=0;cv.setPointerCapture(e.pointerId);cv.style.cursor='grabbing'}});
  cv.addEventListener('pointerup',e=>{if(drag){const i=drag.i;drag=null;cv.style.cursor='grab';if(moved<6)onPick(i);return}api.open()});
  cv.addEventListener('pointerleave',()=>{hover=-1});
  const s={p:0,t:0},m={x:0,y:0},mouse={x:0,y:0};let pt=0,state='hero',last=performance.now(),clipKey='',lastTf='',unf=false,over=0;
  const fit=(w,h)=>{const k=2*Math.tan(THREE.MathUtils.degToRad(15));return Math.max(h/k,w/k/cam.aspect)};
  const zOpen=mb=>mb?fit(2.45,3.1):fit(4.75,2.95);
  function size(){const w=host.clientWidth,h=host.clientHeight;renderer.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix()}
  new ResizeObserver(size).observe(host);size();
  function place(mb){
    holder.updateMatrixWorld(true);cam.updateMatrixWorld(true);const rw=host.clientWidth,rh=host.clientHeight;
    if(mb){const hw=Math.round(rw-12),hh=Math.round(rh-12),tf='translate(6px,6px) scale(1)';if(tf!==lastTf){lastTf=tf;overlay.style.transform=tf}
      const key='m|'+hw+'|'+hh;if(key!==clipKey){clipKey=key;overlay.dataset.mode='single';overlay.style.width=hw+'px';overlay.style.height=hh+'px';overlay.style.clipPath=`path('${rp(0,0,hw,hh,[26,26,26,26])}')`}return}
    const P=(x,y)=>{const v=new THREE.Vector3(x,y,T/2+.0014);rig.localToWorld(v);v.project(cam);return [(v.x*.5+.5)*rw,(1-(v.y*.5+.5))*rh]};
    const xa=-XEDGE,xb=XEDGE,span=xb-xa,a=P(xa,SHI/2),b=P(xb,-SHI/2);
    const d=zOpen(false)-T/2,restPx=span/(2*d*Math.tan(THREE.MathUtils.degToRad(15))*cam.aspect)*rw,Z=1.15;
    const hw=Math.max(780,Math.round(restPx/Z)),hh=Math.round(hw*SHI/span),sc=((b[0]-a[0])/hw).toFixed(4);
    const tf=`translate(${Math.round(a[0])}px,${Math.round(a[1])}px) scale(${sc})`;if(tf!==lastTf){lastTf=tf;overlay.style.transform=tf}
    const key='d|'+hw;if(key!==clipKey){clipKey=key;const R=.075*hw/span;overlay.dataset.mode='dual';overlay.style.width=hw+'px';overlay.style.height=hh+'px';overlay.style.clipPath=`path('${rp(0,0,hw,hh,[R,R,R,R])}')`}
  }
  function frame(now){
    const dt=Math.min(.05,(now-last)/1000);last=now;s.t+=dt;const mb=mobile(),k=1-Math.exp(-dt*3.2);
    s.p+=(pt-s.p)*k;if(Math.abs(pt-s.p)<5e-4)s.p=pt;const p=s.p,ue=ease(.04,.96,p);
    const phi=mb?Math.PI:Math.PI*(1-ue);left.rotation.y=-phi;hinge.position.z=-PZ*phi/Math.PI;
    const b=ease(2.5,1.1,phi);mats.left.color.setScalar(.04+.96*b);
    rig.position.x=mb?-OFF:-OFF*(1-ease(.08,.96,p));
    const zc=mb?fit(2.7,3.5):fit(3.5,4.0),zo=zOpen(mb);cam.position.set(0,0,zc+(zo-zc)*ease(.3,1,p));cam.lookAt(0,0,0);
    m.x+=(mouse.x-m.x)*k;m.y+=(mouse.y-m.y)*k;const calm=1-ease(.6,1,p);
    holder.position.y=Math.sin(s.t*1.2)*.03*calm;
    holder.rotation.set(-m.y*.14*calm,(.45*(1-p)+m.x*.28)*calm,0);
    host.style.setProperty('--sw',(30+34*ue)+'%');
    const f=p>.5;if(f!==unf){unf=f;onProgress(f)}
    const ok=(orbitOn?1:0)*(1-ease(0,.25,p)),sx=mb?1:Math.min(1.15,cam.aspect/1.7),ms=mb?.52:1;orbitG.visible=ok>.01;
    if(orbitG.visible)cards.forEach((c,i)=>{const hv=hover===i||(drag&&drag.i===i);c.h+=((hv?1:0)-c.h)*Math.min(1,dt*9);
      c.g.visible=true;c.g.scale.setScalar(Math.max(.001,ok*ms*(1+.16*c.h)));const pp=mb?POSM[i]:c.p;
      c.g.position.set(pp[0]*sx+m.x*pp[2]*.18,pp[1]+Math.sin(s.t*.9+c.ph)*(mb?.06:.12)+m.y*.08*pp[2],pp[2]+c.h*.5);
      c.spin.x+=c.vel.x;c.spin.y+=c.vel.y;c.vel.x*=.93;c.vel.y*=.93;const dm=drag&&drag.i===i?0:dt*.7;c.spin.x*=1-dm;c.spin.y*=1-dm;
      c.g.rotation.set(Math.cos(s.t*.4+c.ph)*.12+c.spin.x-m.y*.25*c.h,Math.sin(s.t*.5+c.ph)*.3+c.spin.y+m.x*.3*c.h,0)});
    place(mb);const o=ease(.95,.995,p);overlay.style.opacity=o;overlay.style.pointerEvents=o>.9?'auto':'none';
    renderer.render(scene,cam);requestAnimationFrame(frame)
  }
  addEventListener('pointermove',e=>{mouse.x=e.clientX/innerWidth*2-1;mouse.y=e.clientY/innerHeight*2-1});
  const clamp=v=>Math.min(1,Math.max(0,v));
  const push=d=>{if(state==='open'){if(d>=0)return;state='hero';onState(state)}pt=clamp(pt+d);if(pt>=1&&state!=='open'){state='open';over=0;onState(state)}};
  const api={open(){push(1)},close(){pt=0;if(state!=='hero'){state='hero';onState(state)}},isOpen:()=>state==='open',setFinish(n){metal.color.set(FIN[n]||FIN.titanium)},setOrbit(v){orbitOn=!!v}};
  host.addEventListener('wheel',e=>{if(state==='open'){if(e.deltaY<0&&atTop()){over+=-e.deltaY;if(over>60)push(e.deltaY/700)}else over=0}else push(e.deltaY/700)},{passive:true});
  let ty=0;host.addEventListener('touchstart',e=>{ty=e.touches[0].clientY;over=0},{passive:true});
  host.addEventListener('touchmove',e=>{if(drag)return;const y=e.touches[0].clientY,dy=y-ty;ty=y;if(state==='open'){if(dy>0&&atTop()){over+=dy;if(over>50)push(-dy/380)}else over=0}else push(-dy/380)},{passive:true});
  const redraw=()=>{tex.left.draw();tex.right.draw();cards.forEach(c=>c.ct.draw())};
  (document.fonts?document.fonts.load('300px Anton').then(()=>document.fonts.load('700 24px "Manrope Variable"')):Promise.resolve()).finally(redraw);
  photo.onload=redraw;setInterval(()=>{tex.right.draw()},30000);
  requestAnimationFrame(frame);return api;
}
