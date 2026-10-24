import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import '@fontsource/anton';import '@fontsource-variable/manrope';import '@fontsource/dm-mono/400.css';import '@fontsource/dm-mono/500.css';
import {createPhone} from './phone3d.js';
import portraitUrl from './portrait.jpeg';

const projects = [
  {title:'Kinda',kind:'SOCIAL FOCUS · FULL STACK',category:'apps',summary:'A softer place to set your goals, find your focus, and grow alongside people who are trying too. Create tasks, keep focus with timers, share progress, chat, and invite friends.',stack:['React','Convex','Better Auth','Cloudflare'],url:'https://github.com/infinitypersonified/Kinda',image:'photo-1498050108023-c5249f4df085',tone:'#ecc2ab',slug:'kinda',shots:true,themed:true,live:'https://kinda-two.vercel.app/'},
  {title:'Trend',kind:'SOCIAL PRODUCT · FULL STACK',category:'apps',summary:'A social platform for sharing and voting on claims, with threaded comments, personalized feeds, leaderboards, and notifications.',stack:['Express','SQLite','Node.js','Web Push'],url:'https://github.com/infinitypersonified/TREND',image:'photo-1552664730-d307ca884978',tone:'#d7d7cf',slug:'trend'},
  {title:'Foodee',kind:'MARKETPLACE · FULL STACK',category:'apps',summary:'A foundation for a Nigeria-wide food marketplace, connecting customers, restaurants, and administrators through a Firebase-backed product.',stack:['Firebase','Firestore','Cloud Functions','AI'],url:'https://github.com/infinitypersonified/Foodee',image:'photo-1504674900247-0877df9cc836',tone:'#efd7ae',slug:'foodee'},
  {title:'Safeguard',kind:'HEALTH · CROSS-PLATFORM',category:'apps',summary:'An emergency response app concept for Federal University Otuoke, using mobile and web location capabilities to support SOS alerts.',stack:['Flutter','Firebase','Riverpod','Geolocation'],url:'',image:'photo-1576091160399-112ba8d25d1d',tone:'#c9d9d3',slug:'safeguard'},
  {title:'COMPOUND',kind:'LEARNING · INTERACTIVE WEB',category:'web',summary:'An independent money school. Learn the basics, test the maths, make your next move clearer, with learning modules, a naira compound-growth calculator, and a financial-safety quiz.',stack:['React','Vite','SVG','Responsive UI'],url:'https://github.com/infinitypersonified/COMPOUND',image:'photo-1611974789855-9c2a0a7236a3',tone:'#ece9dd',slug:'compound',shots:true,live:'https://compound-umber.vercel.app/'},
  {title:'ÀṢỌ House',kind:'FASHION · CREATIVE DEVELOPMENT',category:'creative',summary:'Contemporary African fashion, cut from memory and made for tomorrow. Cinematic motion, editorial layouts, product details, and a front-end demo bag.',stack:['React 19','Vite','Motion','Responsive UI'],url:'https://github.com/infinitypersonified/ASO',image:'photo-1539109136881-3be0616acf4b',tone:'#e6d6bd',slug:'aso-house',shots:true,live:'https://aso-house.vercel.app/'},
  {title:'Benny Com Interiors',kind:'CLIENT WEBSITE · FRONT END',category:'web',summary:'Interior and exterior design, home decor, renovations and electrical services in Ughelli, Delta State. A responsive studio site with work, services, about, and contact sections plus direct WhatsApp contact.',stack:['HTML','CSS','JavaScript','Responsive UI'],url:'https://github.com/infinitypersonified/Benny-Interiors',image:'photo-1600210492486-724fe5c67fb0',tone:'#e4dccb',slug:'benny-interiors',shots:true,themed:true,live:'https://benny-interiors.vercel.app/'},
  {title:'FORM / SPACE',kind:'ARCHITECTURE · CREATIVE DEVELOPMENT',category:'creative',summary:'Architecture shaped by light, material, and the lives inside it, with spatial imagery, editorial typography, cinematic reveals, and project detail overlays.',stack:['React','Vite','Motion','Responsive UI'],url:'https://github.com/infinitypersonified/FORM-SPACE',image:'photo-1600607687939-ce8a6c25118c',tone:'#cfd0c4',slug:'form-space',live:'https://form-space.vercel.app/'},
  {title:'Phishing Email Detection',kind:'SECURITY · PROJECT',category:'security',summary:'An automated phishing email detection project. Detailed features and technology notes will be added after reviewing the project README.',stack:['Security','Detection'],url:'https://github.com/infinitypersonified/automated-phishing-email-detected',image:'photo-1550751827-4bd374c3f58b',tone:'#c5ccd6',slug:'phishing'}
];
const showcase=document.querySelector('#showcase');
const device=document.querySelector('#device');
const lockScreen=document.querySelector('#lock-screen');
const appScreen=document.querySelector('#app-screen');
const appContent=document.querySelector('#app-content');
const appScroll=document.querySelector('#app-scroll');
const deviceHint=document.querySelector('#device-hint');
const stageAction=document.querySelector('#stage-action');
let currentPage='home';
let activeFilter='all';

const lenis=new Lenis({wrapper:appScroll,content:appContent,autoRaf:true,anchors:true,respectReducedMotion:true});

function scrollAppTop(){lenis.scrollTo(0,{immediate:true});requestAnimationFrame(()=>lenis.resize())}
function setNav(page){document.querySelectorAll('.screen-nav button').forEach(button=>button.classList.toggle('selected',button.dataset.page===page))}
function imageUrl(project,width=900){return `https://images.unsplash.com/${project.image}?auto=format&fit=crop&w=${width}&q=82`}
function cardMarkup(project){return `<button class="project-card" data-project="${project.title}" style="--tone:${project.tone}"><span class="project-thumb"><b class="thumb-art">${project.title}</b><em>${project.stack.slice(0,2).join(' · ')}</em>${shotMarkup(project)}</span><span class="card-meta">${project.kind}</span><strong>${project.title}<i>↗</i></strong></button>`}
function renderHome(){
  currentPage='home';setNav('home');
  appContent.innerHTML=`<section class="home-layout"><div class="home-copy"><span class="home-eyebrow">FULL STACK DEVELOPER · NIGERIA</span><h1>Ojakorotu<br>Prosper<br><em>Oghenefegor</em></h1><p>I build useful digital products with character and purpose — from polished interfaces to the systems that make them work.</p><div class="home-actions"><button class="pill-link" data-go="work">See my work <span>↗</span></button><a class="pill-link secondary" href="mailto:ojakorotuprosper54@gmail.com">Say hello</a></div><span class="home-index">PRODUCT THINKING · FRONT END · BACK END</span></div><div class="home-photo"><img src="${portraitUrl}" alt="Ojakorotu Prosper Oghenefegor"><span class="photo-label">OJAKOROTU PROSPER OGHENEFEGOR</span></div></section>`;
  wirePageActions();scrollAppTop();
}
const shotUrl=(p,d,t)=>`/projects/${p.slug}-${d}${p.themed?'-'+t:''}.webp`;
function shotMarkup(p){if(!p.shots)return '';const mk=t=>`<picture class="shot shot-${t}"><source media="(max-width:760px)" srcset="${shotUrl(p,'phone',t)}"><img class="thumb-img" src="${shotUrl(p,'laptop',t)}" alt="${p.title} screenshot" loading="lazy" onerror="this.remove()"></picture>`;return p.themed?mk('light')+mk('dark'):mk('any')}
function renderWork(){
  currentPage='work';setNav('work');
  const categories=[['all','All'],['apps','Apps'],['web','Web'],['creative','Creative'],['security','Security']];
  const visible=projects.filter(project=>activeFilter==='all'||project.category===activeFilter);
  appContent.innerHTML=`<section class="work-page"><div class="page-heading"><div><span class="page-eyebrow">SELECTED PROJECTS · 2023—26</span><h1>Work</h1></div><p>Products, platforms, and digital experiences built from the first idea through to the working interface.</p></div><div class="filters" role="tablist" aria-label="Filter projects">${categories.map(([key,label])=>`<button class="${activeFilter===key?'active':''}" data-filter="${key}" role="tab" aria-selected="${activeFilter===key}">${label}</button>`).join('')}</div><div class="work-grid">${visible.map(cardMarkup).join('')}</div></section>`;
  appContent.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{activeFilter=button.dataset.filter;renderWork()}));
  appContent.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>renderProjectDetail(button.dataset.project)));
  scrollAppTop();
}
function renderProjectDetail(title){
  const project=projects.find(item=>item.title===title);if(!project)return;
  currentPage='work';setNav('work');
  appContent.innerHTML=`<article class="project-detail"><div class="detail-image" style="--tone:${project.tone}"><b class="thumb-art">${project.title}</b>${shotMarkup(project)}<span class="photo-label">${project.kind}</span></div><div class="detail-copy"><button class="back-work" data-back-work>← ALL PROJECTS</button><span class="page-eyebrow">${project.kind}</span><h1>${project.title}</h1><p>${project.summary}</p><div class="detail-tags">${project.stack.map(tag=>`<span>${tag}</span>`).join('')}</div>${project.live?`<a class="pill-link" href="${project.live}" target="_blank" rel="noreferrer">Visit live site <span>↗</span></a>`:''}${project.url?`<a class="pill-link secondary" href="${project.url}" target="_blank" rel="noreferrer">View on GitHub <span>↗</span></a>`:''}</div></article>`;
  appContent.querySelector('[data-back-work]').addEventListener('click',renderWork);scrollAppTop();
}
const archiveExtra=[
{title:'Ghost Protocol',group:'Security',tone:'#cdd3d8',note:'A self-destructing, end-to-end encrypted messaging app.',tags:['Cryptography','Messaging']},
{title:'File Integrity Monitor',group:'Security',tone:'#d4d9cf',note:'My final-year project: a File Integrity Monitoring System.',tags:['Security','Final-year project']},
{title:'CyberGuard',group:'Security',tone:'#cfd6e0',note:'A machine-learning cyber risk assessment tool for small businesses.',tags:['Machine learning','Security']},
{title:'Agro Link',group:'Apps',tone:'#d9e0c6',note:'A farmers-to-consumers agri-marketplace.',tags:['Marketplace']},
{title:'Inventory System',group:'Web',tone:'#e2d8c4',note:'An inventory management system with demand forecasting, built in PHP and MySQL.',tags:['PHP','MySQL']}];
const groupOf=p=>({Kinda:'Apps',Trend:'Apps',Foodee:'Apps',Safeguard:'Apps','Phishing Email Detection':'Security'}[p.title]||'Web');
function archiveAll(){return projects.map(p=>({title:p.title,tone:p.tone,group:groupOf(p),live:!!p.live,real:true,note:p.summary,tags:p.stack})).concat(archiveExtra.map(x=>({...x,live:false,real:false})))}
function renderArchive(){
  currentPage='archive';setNav('archive');
  const all=archiveAll();
  const groups=['Apps','Web','Security'],live=all.filter(a=>a.live);
  const icon=a=>`<button class="hs-icon" data-app="${a.title}"><span class="hs-ico" style="--tone:${a.tone}"><b>${a.title.trim()[0]}</b>${a.live?'<i class="hs-dot"></i>':''}</span><em>${a.title}</em></button>`;
  const folder=g=>`<button class="hs-icon" data-folder="${g}"><span class="hs-fbox">${all.filter(a=>a.group===g).slice(0,4).map(a=>`<s style="--tone:${a.tone}">${a.title.trim()[0]}</s>`).join('')}</span><em>${g}</em></button>`;
  appContent.innerHTML=`<section class="hs-page"><span class="page-eyebrow">THE ARCHIVE</span><h1>Everything<br><em>I've built.</em></h1><div class="hs-widgets"><div class="hs-widget"><b>${all.length}</b><span>projects</span></div><div class="hs-widget hot"><b>${live.length}</b><span>live now</span></div><div class="hs-widget"><b>${groups.length}</b><span>folders</span></div></div><div class="hs-grid">${groups.map(folder).join('')}${live.map(icon).join('')}</div><div class="hs-sheet" hidden></div></section>`;
  const sheet=appContent.querySelector('.hs-sheet'),close=()=>{sheet.hidden=true;sheet.innerHTML=''};
  const openApp=title=>{const a=all.find(x=>x.title===title);if(!a)return;if(a.real){renderProjectDetail(a.title);return}
    sheet.innerHTML=`<div class="hs-card"><button class="hs-x" data-x>×</button><span class="hs-ico big" style="--tone:${a.tone}"><b>${a.title[0]}</b></span><h2>${a.title}</h2><p>${a.note}</p><div class="detail-tags">${a.tags.map(t=>`<span>${t}</span>`).join('')}</div></div>`;sheet.hidden=false;sheet.querySelector('[data-x]').onclick=close};
  const wire=root=>root.querySelectorAll('[data-app]').forEach(b=>b.addEventListener('click',()=>openApp(b.dataset.app)));
  wire(appContent);
  appContent.querySelectorAll('[data-folder]').forEach(b=>b.addEventListener('click',()=>{const g=b.dataset.folder;sheet.innerHTML=`<div class="hs-card"><button class="hs-x" data-x>×</button><h2>${g}</h2><div class="hs-grid in">${all.filter(a=>a.group===g).map(icon).join('')}</div></div>`;sheet.hidden=false;sheet.querySelector('[data-x]').onclick=close;wire(sheet)}));
  sheet.addEventListener('click',e=>{if(e.target===sheet)close()});scrollAppTop();
}
function renderAbout(){
  currentPage='about';setNav('about');
  appContent.innerHTML=`<section class="about-layout"><div class="about-copy"><span class="page-eyebrow">A LITTLE ABOUT THE BUILDER</span><h1>Curious by nature.<br><em>Full stack by craft.</em></h1><p>I am Ojakorotu Prosper Oghenefegor, a full stack developer interested in making useful products feel clear and thoughtful. I work across interface, interaction, and the systems underneath.</p><div class="detail-tags"><span>Product thinking</span><span>Front end</span><span>Back end</span><span>Nigeria</span></div></div><div class="about-photo"><img src="${portraitUrl}" alt="Ojakorotu Prosper Oghenefegor"></div></section>`;scrollAppTop();
}
function renderContact(){
  currentPage='contact';setNav('contact');
  appContent.innerHTML=`<section class="contact-layout"><div><span class="page-eyebrow">OPEN TO GOOD IDEAS</span><h1>Let's build<br><em>something good.</em></h1><p>Have a product or collaboration in mind? Reach out directly or find me around the web.</p></div><div class="contact-links"><a href="mailto:ojakorotuprosper54@gmail.com">Email <span>ojakorotuprosper54@gmail.com ↗</span></a><a href="https://wa.me/2349123802455" target="_blank" rel="noreferrer">WhatsApp <span>09123802455 ↗</span></a><a href="https://www.instagram.com/infinite_oj/" target="_blank" rel="noreferrer">Instagram <span>@infinite_oj ↗</span></a><a href="https://github.com/infinitypersonified" target="_blank" rel="noreferrer">GitHub <span>infinitypersonified ↗</span></a></div></section>`;scrollAppTop();
}
function wirePageActions(){appContent.querySelectorAll('[data-go="work"]').forEach(button=>button.addEventListener('click',renderWork))}
function renderPage(page){if(page==='home')renderHome();else if(page==='work')renderWork();else if(page==='archive')renderArchive();else if(page==='about')renderAbout();else if(page==='contact')renderContact()}
const IOS=innerWidth<760||innerWidth/innerHeight<.9;
const phone=IOS?{open(){},close(){},setFinish(){},setOrbit(){},isOpen:()=>false}:createPhone({host:document.querySelector('#stage3d'),overlay:document.querySelector('#screen-overlay'),items:projects.slice(0,6).map(p=>({title:p.title,tone:p.tone,sub:p.stack.slice(0,2).join(' · ')})),atTop:()=>lenis.scroll<=2,onProgress:f=>showcase.classList.toggle('unfolded',f),onPick:i=>{phone.open();renderProjectDetail(projects[i].title)},onState:state=>{const o=state==='open';showcase.classList.toggle('portfolio-open',o);appScreen.setAttribute('aria-hidden',String(!o));deviceHint.textContent=o?'PORTFOLIO OPEN · SELECT A PAGE TO EXPLORE':'SCROLL OR TAP TO UNFOLD YOUR PORTFOLIO';stageAction.textContent=o?'SELECT A PAGE TO EXPLORE':'SCROLL TO UNFOLD';if(o){renderPage('home')}}});
deviceHint.textContent='SCROLL OR TAP TO UNFOLD YOUR PORTFOLIO';stageAction.textContent='SCROLL TO UNFOLD';
function closeDevice(){phone.close()}
function setTheme(theme){showcase.dataset.theme=theme;document.body.dataset.theme=theme;document.documentElement.style.colorScheme=theme;const dark=theme==='dark';const c=document.querySelector('#theme-toggle');c.innerHTML=`<span aria-hidden="true">${dark?'☀':'☾'}</span><b>${dark?'DARK':'LIGHT'}</b>`;c.setAttribute('aria-label',`Switch to ${dark?'light':'dark'} mode`);document.querySelector('meta[name="theme-color"]').content=dark?'#171815':'#f1f0ed'}
setTheme(localStorage.getItem('infinite-oj-theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'));
document.querySelector('#theme-toggle').addEventListener('click',()=>{const t=showcase.dataset.theme==='dark'?'light':'dark';localStorage.setItem('infinite-oj-theme',t);setTheme(t)});
const tick=()=>{document.querySelector('#app-time').textContent=new Intl.DateTimeFormat('en-NG',{hour:'numeric',minute:'2-digit'}).format(new Date())};tick();setInterval(tick,15000);
document.querySelector('#relock-button').addEventListener('click',closeDevice);
const NAVICO={home:'<path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',work:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',archive:'<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',about:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',contact:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>'};
document.querySelectorAll('.screen-nav button').forEach(b=>{const l=b.textContent.trim();b.innerHTML=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${NAVICO[b.dataset.page]||''}</svg><span>${l}</span>`;b.addEventListener('click',()=>renderPage(b.dataset.page))});
document.querySelectorAll('.backdrop-picker button[data-backdrop]').forEach(b=>b.addEventListener('click',()=>{showcase.dataset.backdrop=b.dataset.backdrop;phone.setOrbit(b.dataset.backdrop==='orbit');document.querySelectorAll('.backdrop-picker button').forEach(i=>i.classList.toggle('active',i===b))}));
document.querySelectorAll('.finish-picker button[data-finish]').forEach(b=>b.addEventListener('click',()=>{phone.setFinish(b.dataset.finish);document.querySelectorAll('.finish-picker button').forEach(i=>i.classList.toggle('active',i===b))}));
document.querySelector('.brand').addEventListener('click',e=>{e.preventDefault();closeDevice()});

if(IOS){document.body.classList.add('ios-mode');initIOS()}
matchMedia('(max-width:759px)').addEventListener('change',()=>location.reload());
function initIOS(){
  const live=projects.filter(p=>p.live),all=archiveAll(),groups=['Apps','Web','Security'];
  const ico=p=>`<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
  const icon=a=>`<button class="ios-icon" data-app="${a.title}"><span class="ios-ico" style="--tone:${a.tone}"><b>${a.title.trim()[0]}</b>${a.title==='Kinda'?'<i class="ios-badge">1</i>':''}</span><em>${a.title}</em></button>`;
  const folder=g=>`<button class="ios-icon" data-folder="${g}"><span class="ios-fbox">${all.filter(a=>a.group===g).slice(0,4).map(a=>`<s style="--tone:${a.tone}"></s>`).join('')}</span><em>${g}</em></button>`;
  const dock=[['work','#171816'],['archive','#d96c3b'],['about','#2f6f5e'],['contact','#3d5a98']].map(([k,c])=>`<button class="ios-dock-app" data-open="${k}" aria-label="${k}" style="background:${c}">${ico(NAVICO[k])}</button>`).join('');
  const ios=document.createElement('div');ios.id='ios';ios.dataset.state='lock';
  ios.innerHTML=`<div class="ios-island"></div>
<section class="ios-lock"><img src="${portraitUrl}" alt="Ojakorotu Prosper"><div class="ios-shade"></div><div class="ios-lstat"><span>INFINITE OJ</span><span>5G 87%</span></div>
<div class="ios-date"></div><div class="ios-clock"></div><div class="ios-role">Full stack developer · Nigeria</div>
<button class="ios-notif" data-n="Kinda"><span style="background:#ecc2ab">K</span><div><b>Kinda is live</b><em>SOCIAL TASK APP · NOW</em></div></button>
<button class="ios-notif" data-n="archive"><span style="background:#cdd3d8">G</span><div><b>Ghost Protocol</b><em>E2E ENCRYPTED · 2H AGO</em></div></button>
<div class="ios-lbtn l">${ico('<path d="M8 3h8v4l-2 3v11h-4V10L8 7z"/>')}</div><div class="ios-lbtn r">${ico('<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>')}</div>
<button class="ios-hint">SWIPE UP TO UNLOCK</button></section>
<section class="ios-home"><div class="ios-hstat"><span class="ios-time"></span><span class="ios-hr"></span></div>
<div class="ios-widgets"><button class="ios-widget hot" data-app="Kinda"><small>NOW BUILDING</small><div><strong>Kinda</strong><span>Social task app</span></div></button><button class="ios-widget" data-open="archive"><small>PORTFOLIO</small><div><strong>${all.length}</strong><span>projects · ${live.length} live</span></div></button></div>
<div class="ios-grid">${live.map(icon).join('')}${groups.map(folder).join('')}</div>
<div class="ios-dots"><i></i><i></i></div><div class="ios-dock">${dock}</div>
<div class="ios-fsheet" hidden></div></section>
<div class="ios-app"></div><button class="ios-bar" aria-label="Home"></button>`;
  showcase.append(ios);
  const app=ios.querySelector('.ios-app'),lock=ios.querySelector('.ios-lock'),home=ios.querySelector('.ios-home'),fs=ios.querySelector('.ios-fsheet');
  app.append(document.querySelector('#screen-overlay'));ios.querySelector('.ios-hr').append(document.querySelector('#theme-toggle'));
  const tick2=()=>{const d=new Date();ios.querySelector('.ios-clock').textContent=d.toLocaleTimeString('en-NG',{hour:'2-digit',minute:'2-digit',hour12:false});ios.querySelector('.ios-date').textContent=d.toLocaleDateString('en-NG',{weekday:'long',month:'long',day:'numeric'}).toUpperCase();ios.querySelector('.ios-time').textContent=d.toLocaleTimeString('en-NG',{hour:'numeric',minute:'2-digit'})};tick2();setInterval(tick2,15000);
  const set=s=>{ios.dataset.state=s;lock.style.transform='';fs.hidden=true};
  const openApp=(fn,el)=>{const r=(el||ios).getBoundingClientRect();app.style.transformOrigin=`${r.left+r.width/2}px ${r.top+r.height/2}px`;fn();set('app')};
  const pages={work:renderWork,archive:renderArchive,about:renderAbout,contact:renderContact};
  const openByTitle=(t,el)=>{const a=all.find(x=>x.title===t);if(a&&a.real)openApp(()=>renderProjectDetail(t),el);else if(a)note(a)};
  const note=a=>{fs.innerHTML=`<div class="ios-fcard"><button class="ios-fx" data-x>×</button><span class="ios-ico big" style="--tone:${a.tone}"><b>${a.title[0]}</b></span><h2>${a.title}</h2><p>${a.note}</p><div class="detail-tags">${a.tags.map(t=>`<span>${t}</span>`).join('')}</div></div>`;fs.hidden=false;fs.querySelector('[data-x]').onclick=()=>fs.hidden=true};
  const wire=root=>{root.querySelectorAll('[data-app]').forEach(b=>b.addEventListener('click',()=>openByTitle(b.dataset.app,b)));root.querySelectorAll('[data-open]').forEach(b=>b.addEventListener('click',()=>openApp(pages[b.dataset.open],b)))};
  wire(home);
  home.querySelectorAll('[data-folder]').forEach(b=>b.addEventListener('click',()=>{const g=b.dataset.folder;fs.innerHTML=`<div class="ios-fcard"><button class="ios-fx" data-x>×</button><h2>${g}</h2><div class="ios-grid in">${all.filter(a=>a.group===g).map(icon).join('')}</div></div>`;fs.hidden=false;fs.querySelector('[data-x]').onclick=()=>fs.hidden=true;fs.querySelectorAll('[data-app]').forEach(x=>x.addEventListener('click',()=>{const a=all.find(y=>y.title===x.dataset.app);if(a.real){fs.hidden=true;openApp(()=>renderProjectDetail(a.title),x)}else note(a)}))}));
  fs.addEventListener('click',e=>{if(e.target===fs)fs.hidden=true});
  ios.querySelectorAll('.ios-notif').forEach(b=>b.addEventListener('click',()=>{const n=b.dataset.n;if(n==='Kinda')openApp(()=>renderProjectDetail('Kinda'),b);else openApp(renderArchive,b)}));
  ios.querySelector('.ios-hint').addEventListener('click',()=>set('home'));
  ios.querySelector('.ios-bar').addEventListener('click',()=>{if(ios.dataset.state==='app')set('home');else if(ios.dataset.state==='home')set('lock')});
  let y0=null,dy=0;lock.addEventListener('touchstart',e=>{y0=e.touches[0].clientY;dy=0},{passive:true});
  lock.addEventListener('touchmove',e=>{if(y0===null)return;dy=y0-e.touches[0].clientY;if(dy>0){lock.style.transition='none';lock.style.transform=`translateY(${-dy}px)`}},{passive:true});
  lock.addEventListener('touchend',()=>{lock.style.transition='';if(dy>110)set('home');else lock.style.transform='';y0=null});
  lock.addEventListener('wheel',e=>{if(e.deltaY>30)set('home')},{passive:true});
  let h0=null,hd=0;home.addEventListener('touchstart',e=>{h0=e.touches[0].clientY<140?e.touches[0].clientY:null;hd=0},{passive:true});
  home.addEventListener('touchmove',e=>{if(h0!==null)hd=e.touches[0].clientY-h0},{passive:true});
  home.addEventListener('touchend',()=>{if(h0!==null&&hd>90)set('lock');h0=null});
}
