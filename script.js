/* ── PRELOADER ───────────────────────────────── */
const ldFill = document.getElementById('ldfill');
const ldPct  = document.getElementById('ldpct');
const loader = document.getElementById('loader');
let p = 0;
const ldInt = setInterval(()=>{
  p += Math.random() * 15 + 3;
  if(p>100) p=100;
  ldFill.style.width = p+'%';
  ldPct.textContent = String(Math.floor(p)).padStart(3,'0')+'%';
  if(p>=100){
    clearInterval(ldInt);
    setTimeout(()=>{
      loader.classList.add('out');
      // reveal hero text
      document.querySelectorAll('#heroname .row span').forEach(s=>{
        s.style.transform='translateY(0)';
      });
      document.getElementById('hmeta').style.opacity='1';
      document.getElementById('hmeta').style.transform='none';
      document.getElementById('shint').classList.add('show');
    }, 500);
  }
},55);

/* ── CURSOR ──────────────────────────────────── */
const c1=document.getElementById('c1'), c2=document.getElementById('c2');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY});
(function loop(){
  c1.style.left=mx+'px'; c1.style.top=my+'px';
  rx+=(mx-rx)*0.1; ry+=(my-ry)*0.1;
  c2.style.left=rx+'px'; c2.style.top=ry+'px';
  requestAnimationFrame(loop);
})();

/* ── PROGRESS BAR ────────────────────────────── */
window.addEventListener('scroll',()=>{
  const h=document.documentElement;
  document.getElementById('prog').style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%';
  document.getElementById('nav').classList.toggle('stuck',scrollY>60);
  // active nav
  let cur='';
  document.querySelectorAll('section[id]').forEach(s=>{
    if(scrollY>=s.offsetTop-200) cur=s.id;
  });
  document.querySelectorAll('.n-links a[data-s]').forEach(a=>{
    a.classList.toggle('active',a.dataset.s===cur);
  });
});

/* ── HERO CANVAS ─────────────────────────────── */
const cv=document.getElementById('bg-canvas');
const ctx=cv.getContext('2d');
const resize=()=>{cv.width=window.innerWidth;cv.height=window.innerHeight};
resize();
window.addEventListener('resize',resize);
// Particles
const N=90;
const pts=Array.from({length:N},()=>({
  x:Math.random()*innerWidth, y:Math.random()*innerHeight,
  vx:(Math.random()-.5)*.4, vy:(Math.random()-.5)*.4,
  r:Math.random()*1.5+.4,
  life:Math.random()
}));
function drawBg(){
  ctx.clearRect(0,0,cv.width,cv.height);
  // gradient mesh
  const g=ctx.createRadialGradient(cv.width*.5,cv.height*.5,0,cv.width*.5,cv.height*.5,cv.width*.7);
  g.addColorStop(0,'rgba(255,28,28,0.025)');
  g.addColorStop(.5,'rgba(109,40,217,0.04)');
  g.addColorStop(1,'transparent');
  ctx.fillStyle=g; ctx.fillRect(0,0,cv.width,cv.height);
  // connect lines
  ctx.lineWidth=.4;
  for(let i=0;i<pts.length;i++){
    const a=pts[i];
    for(let j=i+1;j<pts.length;j++){
      const b=pts[j];
      const d=Math.hypot(a.x-b.x,a.y-b.y);
      if(d<140){
        ctx.strokeStyle=`rgba(255,28,28,${(1-d/140)*.15})`;
        ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
      }
    }
    // dot
    ctx.beginPath();
    ctx.arc(a.x,a.y,a.r,0,Math.PI*2);
    ctx.fillStyle=`rgba(255,28,28,${.2+a.life*.4})`;
    ctx.fill();
    // move
    a.x+=a.vx; a.y+=a.vy;
    a.life+=.005; if(a.life>1) a.life=0;
    if(a.x<0||a.x>cv.width) a.vx*=-1;
    if(a.y<0||a.y>cv.height) a.vy*=-1;
  }
  requestAnimationFrame(drawBg);
}
drawBg();

/* ── MARQUEE ─────────────────────────────────── */
const marqueeRows=[
  {
    id:'mtrack1',
    items:['Python','FastAPI','React','Node.js','Azure','LangChain','ChromaDB']
  },
  {
    id:'mtrack2',
    items:['LangGraph','CrewAI','Gemini AI','Telegram API','Twilio','OpenClaw','Java']
  },
  {
    id:'mtrack3',
    items:['DSA','Linux','Git','OpenRouter','Fine-Tuning','Agentic AI']
  }
];
marqueeRows.forEach(row=>{
  const trk=document.getElementById(row.id);
  [...row.items,...row.items].forEach(t=>{
    const d=document.createElement('div');
    d.className='marquee-item';
    d.innerHTML=`<span class="marquee-dot"></span>${t}`;
    trk.appendChild(d);
  });
});

/* ── SMOOTH SCROLL ───────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const id=a.getAttribute('href').slice(1);
    const el=document.getElementById(id);
    if(!el) return;
    e.preventDefault();
    el.scrollIntoView({behavior:'smooth'});
    document.getElementById('mob').classList.remove('on');
    document.getElementById('bg').classList.remove('on');
  });
});

/* ── MOBILE MENU ─────────────────────────────── */
document.getElementById('bg').addEventListener('click',()=>{
  document.getElementById('bg').classList.toggle('on');
  document.getElementById('mob').classList.toggle('on');
});
document.querySelectorAll('.mm').forEach(a=>{
  a.addEventListener('click',()=>{
    document.getElementById('bg').classList.remove('on');
    document.getElementById('mob').classList.remove('on');
  });
});

/* ── SCROLL REVEAL ───────────────────────────── */
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('vis');
      obs.unobserve(e.target);
    }
  });
},{threshold:.12});
document.querySelectorAll('.r,.tli').forEach(el=>obs.observe(el));

/* ── DRAG SCROLL FOR PROJECTS ────────────────── */
const pto=document.getElementById('pto');
const pt=document.getElementById('pt');
let isDragging=false,startX=0,scrollLeft=0;
pto.addEventListener('mousedown',e=>{
  isDragging=true; pto.style.cursor='grabbing';
  startX=e.pageX-pto.offsetLeft;
  scrollLeft=pto.scrollLeft;
});
pto.addEventListener('mousemove',e=>{
  if(!isDragging) return;
  e.preventDefault();
  const x=e.pageX-pto.offsetLeft;
  pto.scrollLeft=scrollLeft-(x-startX)*1.2;
});
pto.addEventListener('mouseup',()=>{isDragging=false;pto.style.cursor='grab'});
pto.addEventListener('mouseleave',()=>{isDragging=false;pto.style.cursor='grab'});
// Enable scroll on the container
pto.style.overflowX='auto';
pto.style.cursor='grab';
// Hide scrollbar
pto.style.cssText+=';scrollbar-width:none;-ms-overflow-style:none';
const style=document.createElement('style');
style.textContent='#pto::-webkit-scrollbar{display:none}';
document.head.appendChild(style);
