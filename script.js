import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import '@fontsource/anton';import '@fontsource-variable/manrope';import '@fontsource/dm-mono/400.css';import '@fontsource/dm-mono/500.css';
import {createPhone} from './phone3d.js';
import portraitUrl from './portrait.jpeg';

const projects = [
  {title:'Kinda',kind:'SOCIAL FOCUS · FULL STACK',category:'apps',summary:'A softer place to set your goals, find your focus, and grow alongside people who are trying too. Create tasks, keep focus with timers, share progress, chat, and invite friends.',stack:['React','Convex','Better Auth','Cloudflare'],url:'https://github.com/infinitypersonified/Kinda',image:'photo-1498050108023-c5249f4df085',tone:'#ecc2ab',slug:'kinda',live:'https://kinda-two.vercel.app/'},
  {title:'Trend',kind:'SOCIAL PRODUCT · FULL STACK',category:'apps',summary:'A social platform for sharing and voting on claims, with threaded comments, personalized feeds, leaderboards, and notifications.',stack:['Express','SQLite','Node.js','Web Push'],url:'https://github.com/infinitypersonified/TREND',image:'photo-1552664730-d307ca884978',tone:'#d7d7cf',slug:'trend'},
  {title:'Foodee',kind:'MARKETPLACE · FULL STACK',category:'apps',summary:'A foundation for a Nigeria-wide food marketplace, connecting customers, restaurants, and administrators through a Firebase-backed product.',stack:['Firebase','Firestore','Cloud Functions','AI'],url:'https://github.com/infinitypersonified/Foodee',image:'photo-1504674900247-0877df9cc836',tone:'#efd7ae',slug:'foodee'},
  {title:'Safeguard',kind:'HEALTH · CROSS-PLATFORM',category:'apps',summary:'An emergency response app concept for Federal University Otuoke, using mobile and web location capabilities to support SOS alerts.',stack:['Flutter','Firebase','Riverpod','Geolocation'],url:'',image:'photo-1576091160399-112ba8d25d1d',tone:'#c9d9d3',slug:'safeguard'},
  {title:'COMPOUND',kind:'LEARNING · INTERACTIVE WEB',category:'web',summary:'An independent money school. Learn the basics, test the maths, make your next move clearer, with learning modules, a naira compound-growth calculator, and a financial-safety quiz.',stack:['React','Vite','SVG','Responsive UI'],url:'https://github.com/infinitypersonified/COMPOUND',image:'photo-1611974789855-9c2a0a7236a3',tone:'#ece9dd',slug:'compound',live:'https://compound-umber.vercel.app/'},
  {title:'ÀṢỌ House',kind:'FASHION · CREATIVE DEVELOPMENT',category:'creative',summary:'Contemporary African fashion, cut from memory and made for tomorrow. Cinematic motion, editorial layouts, product details, and a front-end demo bag.',stack:['React 19','Vite','Motion','Responsive UI'],url:'https://github.com/infinitypersonified/ASO',image:'photo-1539109136881-3be0616acf4b',tone:'#e6d6bd',slug:'aso-house',live:'https://aso-house.vercel.app/'},
  {title:'Benny Com Interiors',kind:'CLIENT WEBSITE · FRONT END',category:'web',summary:'Interior and exterior design, home decor, renovations and electrical services in Ughelli, Delta State. A responsive studio site with work, services, about, and contact sections plus direct WhatsApp contact.',stack:['HTML','CSS','JavaScript','Responsive UI'],url:'https://github.com/infinitypersonified/Benny-Interiors',image:'photo-1600210492486-724fe5c67fb0',tone:'#e4dccb',slug:'benny-interiors',live:'https://benny-interiors.vercel.app/',shot:'https://benny-interiors.vercel.app/assets/benny%20hero.jpeg'},
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
function cardMarkup(project){return `<button class="project-card" data-project="${project.title}" style="--tone:${project.tone}"><span class="project-thumb"><b class="thumb-art">${project.title}</b><em>${project.stack.slice(0,2).join(' · ')}</em>${project.shot||'/projects/'+project.slug+'.jpg'?`<img class="thumb-img" src="${project.shot||'/projects/'+project.slug+'.jpg'}" alt="" loading="lazy" onerror="this.remove()">`:''}</span><span class="card-meta">${project.kind}</span><strong>${project.title}<i>↗</i></strong></button>`}
function renderHome(){
  currentPage='home';setNav('home');
  appContent.innerHTML=`<section class="home-layout"><div class="home-copy"><span class="home-eyebrow">FULL STACK DEVELOPER · NIGERIA</span><h1>Ojakorotu<br>Prosper<br><em>Oghenefegor</em></h1><p>I build useful digital products with character and purpose — from polished interfaces to the systems that make them work.</p><div class="home-actions"><button class="pill-link" data-go="work">See my work <span>↗</span></button><a class="pill-link secondary" href="mailto:ojakorotuprosper54@gmail.com">Say hello</a></div><span class="home-index">PRODUCT THINKING · FRONT END · BACK END</span></div><div class="home-photo"><img src="${portraitUrl}" alt="Ojakorotu Prosper Oghenefegor"><span class="photo-label">OJAKOROTU PROSPER OGHENEFEGOR</span></div></section>`;
  wirePageActions();scrollAppTop();
}
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
  appContent.innerHTML=`<article class="project-detail"><div class="detail-image" style="--tone:${project.tone}"><b class="thumb-art">${project.title}</b>${project.shot||'/projects/'+project.slug+'.jpg'?`<img class="thumb-img" src="${project.shot||'/projects/'+project.slug+'.jpg'}" alt="" loading="lazy" onerror="this.remove()">`:''}<span class="photo-label">${project.kind}</span></div><div class="detail-copy"><button class="back-work" data-back-work>← ALL PROJECTS</button><span class="page-eyebrow">${project.kind}</span><h1>${project.title}</h1><p>${project.summary}</p><div class="detail-tags">${project.stack.map(tag=>`<span>${tag}</span>`).join('')}</div>${project.live?`<a class="pill-link" href="${project.live}" target="_blank" rel="noreferrer">Visit live site <span>↗</span></a>`:''}${project.url?`<a class="pill-link secondary" href="${project.url}" target="_blank" rel="noreferrer">View on GitHub <span>↗</span></a>`:''}</div></article>`;
  appContent.querySelector('[data-back-work]').addEventListener('click',renderWork);scrollAppTop();
}
function renderArchive(){
  currentPage='archive';setNav('archive');
  appContent.innerHTML=`<section class="text-page"><span class="page-eyebrow">A GROWING COLLECTION</span><h1>Archive</h1><p>Selected work across social products, marketplaces, financial learning, fashion, architecture, interiors, and security.</p><div class="archive-list">${projects.map((project,index)=>`<button class="archive-row" data-project="${project.title}"><span class="archive-index">${String(index+1).padStart(2,'0')}</span><strong>${project.title}</strong><span>${project.kind}</span><i>↗</i></button>`).join('')}</div></section>`;
  appContent.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>renderProjectDetail(button.dataset.project)));scrollAppTop();
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
const phone=createPhone({host:document.querySelector('#stage3d'),overlay:document.querySelector('#screen-overlay'),items:projects.slice(0,6).map(p=>({title:p.title,tone:p.tone,sub:p.stack.slice(0,2).join(' · ')})),atTop:()=>lenis.scroll<=2,onProgress:f=>showcase.classList.toggle('unfolded',f),onPick:i=>{phone.open();renderProjectDetail(projects[i].title)},onState:state=>{const o=state==='open';showcase.classList.toggle('portfolio-open',o);appScreen.setAttribute('aria-hidden',String(!o));deviceHint.textContent=o?'PORTFOLIO OPEN · SELECT A PAGE TO EXPLORE':'SCROLL OR TAP TO UNFOLD YOUR PORTFOLIO';stageAction.textContent=o?'SELECT A PAGE TO EXPLORE':'SCROLL TO UNFOLD';if(o){renderPage('home')}}});
deviceHint.textContent='SCROLL OR TAP TO UNFOLD YOUR PORTFOLIO';stageAction.textContent='SCROLL TO UNFOLD';
function closeDevice(){phone.close()}
function setTheme(theme){showcase.dataset.theme=theme;document.body.dataset.theme=theme;document.documentElement.style.colorScheme=theme;const dark=theme==='dark';const c=document.querySelector('#theme-toggle');c.innerHTML=`<span aria-hidden="true">${dark?'☀':'☾'}</span><b>${dark?'DARK':'LIGHT'}</b>`;c.setAttribute('aria-label',`Switch to ${dark?'light':'dark'} mode`);document.querySelector('meta[name="theme-color"]').content=dark?'#171815':'#f1f0ed'}
setTheme(localStorage.getItem('infinite-oj-theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'));
document.querySelector('#theme-toggle').addEventListener('click',()=>{const t=showcase.dataset.theme==='dark'?'light':'dark';localStorage.setItem('infinite-oj-theme',t);setTheme(t)});
const tick=()=>{document.querySelector('#app-time').textContent=new Intl.DateTimeFormat('en-NG',{hour:'numeric',minute:'2-digit'}).format(new Date())};tick();setInterval(tick,15000);
document.querySelector('#relock-button').addEventListener('click',closeDevice);
document.querySelectorAll('.screen-nav button').forEach(b=>b.addEventListener('click',()=>renderPage(b.dataset.page)));
document.querySelectorAll('.backdrop-picker button[data-backdrop]').forEach(b=>b.addEventListener('click',()=>{showcase.dataset.backdrop=b.dataset.backdrop;phone.setOrbit(b.dataset.backdrop==='orbit');document.querySelectorAll('.backdrop-picker button').forEach(i=>i.classList.toggle('active',i===b))}));
document.querySelectorAll('.finish-picker button[data-finish]').forEach(b=>b.addEventListener('click',()=>{phone.setFinish(b.dataset.finish);document.querySelectorAll('.finish-picker button').forEach(i=>i.classList.toggle('active',i===b))}));
document.querySelector('.brand').addEventListener('click',e=>{e.preventDefault();closeDevice()});
