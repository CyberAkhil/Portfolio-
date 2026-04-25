/* ═══════════════════════════════════════
   NIKHIL GUMASTA — script.js
   Creative Mints inspired interactions
   ═══════════════════════════════════════ */

'use strict';

/* ── DATA ─────────────────────────────── */
const SKILLS = [
  {
    icon:'🌐', name:'Web Development', desc:'Crafting responsive, modern interfaces.',
    tags:['HTML5','CSS3','JavaScript','React'], tclass:'cyan',
    bars:[{n:'HTML/CSS',v:85},{n:'JavaScript',v:72}],
    size:'wide2'
  },
  {
    icon:'🐍', name:'Programming', desc:'Algorithms, problem solving, clean code.',
    tags:['Python','C/C++','Java','Bash'], tclass:'purple',
    bars:[{n:'Python',v:75},{n:'C/C++',v:60}],
    size:''
  },
  {
    icon:'🔐', name:'Cybersecurity', desc:'Ethical hacking, CTF, network security.',
    tags:['Linux','Kali','CTF','Networking'], tclass:'pink',
    bars:[{n:'Linux',v:70},{n:'Networking',v:60}],
    size:''
  },
  {
    icon:'🛠️', name:'Dev Tools', desc:'Professional workflows & version control.',
    tags:['Git','GitHub','VS Code','Terminal'], tclass:'cyan',
    bars:[{n:'Git/GitHub',v:80}],
    size:''
  },
  {
    icon:'🗄️', name:'Backend & DB', desc:'Server-side logic and database design.',
    tags:['Node.js','MySQL','MongoDB','REST'], tclass:'purple',
    bars:[{n:'Node.js',v:58},{n:'SQL',v:62}],
    size:''
  },
  {
    icon:'🤝', name:'Open Source', desc:'Contributing to global dev community.',
    tags:['PRs','Docs','JSON','CI/CD'], tclass:'cyan',
    bars:[{n:'Contributions',v:70}],
    size:''
  },
];

const H_PROJECTS = [
  {
    num:'01', name:'Portfolio Website',
    desc:'Dark hacker-themed portfolio. Matrix rain, custom cursor, waterfall animations, terminal UI.',
    tags:['HTML','CSS','JS'],
    link:'https://cyberakhil.github.io',
    linkText:'View Live ↗',
    bg:'linear-gradient(135deg,#0d0621,#1f0b42,#0a1540)',
    glowColor:'rgba(139,92,246,.6)',
    emoji:'🌐'
  },
  {
    num:'02', name:'is-a.dev Contribution',
    desc:'Open-source PR to register nikhilg.is-a.dev. Passed CI tests in 23s. Successfully merged.',
    tags:['JSON','Git','CI/CD'],
    link:'https://github.com/is-a-dev/register/pull/36887',
    linkText:'View PR ↗',
    bg:'linear-gradient(135deg,#001522,#003952,#005266)',
    glowColor:'rgba(0,232,200,.6)',
    emoji:'⚡'
  },
  {
    num:'03', name:'CTF Challenges',
    desc:'Solving Capture The Flag challenges. Web exploitation, crypto, forensics, reverse engineering.',
    tags:['Python','Linux','Security'],
    link:'https://github.com/CyberAkhil',
    linkText:'GitHub ↗',
    bg:'linear-gradient(135deg,#1a0000,#3a0a14,#600020)',
    glowColor:'rgba(236,72,153,.6)',
    emoji:'🔐'
  },
  {
    num:'04', name:'CS/IT Study Notes',
    desc:'Organized notes repo covering DSA, OS, DBMS, Networks. Open for fellow students.',
    tags:['Markdown','GitHub','Docs'],
    link:'https://github.com/CyberAkhil',
    linkText:'GitHub ↗',
    bg:'linear-gradient(135deg,#091800,#1d3800,#2e5500)',
    glowColor:'rgba(245,158,11,.5)',
    emoji:'📚'
  },
];

const GRID_PROJECTS = [
  {
    num:'PROJECT_01', name:'Portfolio Website',
    desc:'Dark hacker-themed site with matrix rain & waterfall effects.',
    link:'https://cyberakhil.github.io', linkText:'View Live ↗'
  },
  {
    num:'PROJECT_02', name:'is-a.dev PR #36887',
    desc:'Open-source domain registration. CI passed, merged.',
    link:'https://github.com/is-a-dev/register/pull/36887', linkText:'View PR ↗'
  },
  {
    num:'PROJECT_03', name:'CTF Solutions',
    desc:'Writeups & exploit scripts for CTF challenges.',
    link:'https://github.com/CyberAkhil', linkText:'GitHub ↗'
  },
  {
    num:'PROJECT_04', name:'Study Notes Repo',
    desc:'CS/IT notes and programs for students.',
    link:'https://github.com/CyberAkhil', linkText:'GitHub ↗'
  },
  {
    num:'PROJECT_05', name:'More Coming…',
    desc:'New projects in web & security coming soon. Watch the repo.',
    link:'https://github.com/CyberAkhil', linkText:'Follow ↗'
  },
];

const ACHIEVEMENTS = [
  {
    icon:'🌐', badge:'OPEN SOURCE',
    title:'nikhilg.is-a.dev — Registered',
    desc:'PR to is-a-dev/register — CI tests passed in 23s, merged into the official registry.'
  },
  {
    icon:'🎓', badge:'EDUCATION',
    title:'CS/IT Student — Active Learner',
    desc:'Strong foundations in DSA, OS, DBMS, Networks, Web Technologies.'
  },
  {
    icon:'🐙', badge:'GITHUB',
    title:'Active Open-Source Contributor',
    desc:'Public repos, community PRs, and building useful tools for fellow devs.'
  },
  {
    icon:'⚡', badge:'DEVOPS',
    title:'GitHub Pages Deployment',
    desc:'Self-hosted portfolio on GitHub Pages — zero cost, custom domain linked.'
  },
  {
    icon:'🔐', badge:'SECURITY',
    title:'Ethical Hacking Journey',
    desc:'CTF challenges, Linux, networking, Kali tools. Growing in cybersecurity daily.'
  },
  {
    icon:'🚀', badge:'MINDSET',
    title:'Builder Mindset',
    desc:'Shipping projects, learning in public, contributing to the community. Always building.'
  },
];

/* ── PRELOADER ─────────────────────────── */
(function initPreloader() {
  const el   = document.getElementById('preloader');
  const pct  = document.getElementById('prePct');
  const arc  = document.querySelector('.pre-arc');
  const circ = 2 * Math.PI * 42;

  let n = 0;
  const step = () => {
    n = Math.min(n + Math.random() * 4 + 1, 100);
    pct.textContent = Math.floor(n);
    arc.style.strokeDashoffset = circ - (circ * n / 100);
    if (n < 100) { requestAnimationFrame(step); }
    else {
      setTimeout(() => {
        el.classList.add('out');
        document.body.style.overflow = '';
        initAll();
      }, 400);
    }
  };
  document.body.style.overflow = 'hidden';
  setTimeout(step, 300);
})();

/* ── CURSOR ──────────────────────────── */
function initCursor() {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  let mx=0,my=0,rx=0,ry=0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx+'px'; dot.style.top = my+'px';
  });

  (function loop() {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    ring.style.left = rx+'px'; ring.style.top = ry+'px';
    requestAnimationFrame(loop);
  })();

  document.addEventListener('mousedown', () => document.body.classList.add('cur-click'));
  document.addEventListener('mouseup',   () => document.body.classList.remove('cur-click'));

  const addHover = sel => document.querySelectorAll(sel).forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cur-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cur-hover'));
  });
  addHover('a, button, .hcard, .pg-card, .ach-card, .bento-card, .contact-btn, .float-card');
}

/* ── PROGRESS BAR ────────────────────── */
function initProgressBar() {
  const bar = document.getElementById('progress-bar');
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = (scrollY / total * 100) + '%';
  });
}

/* ── NAV ─────────────────────────────── */
function initNav() {
  const nav     = document.getElementById('nav');
  const burger  = document.getElementById('burger');
  const overlay = document.getElementById('mobOverlay');
  const navAs   = document.querySelectorAll('.nav-a');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', scrollY > 40);
    // Active section
    const secs = document.querySelectorAll('section[id]');
    let current = '';
    secs.forEach(s => { if (scrollY >= s.offsetTop - 120) current = s.id; });
    navAs.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#'+current));
  });

  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    overlay.classList.toggle('open');
    document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
  });

  overlay.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      burger.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Smooth anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) {
        e.preventDefault();
        t.scrollIntoView({ behavior:'smooth', block:'start' });
      }
    });
  });
}

/* ── TYPED TEXT ──────────────────────── */
function initTyped() {
  const el = document.getElementById('roleTyped');
  if (!el) return;
  const phrases = ['CS/IT Student.','Web Developer.','Security Enthusiast.','Open Source Contributor.','CyberAkhil.'];
  let pi=0, ci=0, del=false;

  const tick = () => {
    const p = phrases[pi];
    if (!del) { el.textContent = p.slice(0,++ci); if (ci===p.length){del=true;setTimeout(tick,1600);return} }
    else       { el.textContent = p.slice(0,--ci); if (ci===0){del=false;pi=(pi+1)%phrases.length} }
    setTimeout(tick, del ? 35 : 70);
  };
  tick();
}

/* ── COUNTER ─────────────────────────── */
function animateCount(el) {
  const target = parseInt(el.dataset.count);
  let n = 0;
  const step = () => {
    n = Math.min(n + Math.ceil(target/40), target);
    el.textContent = n;
    if (n < target) requestAnimationFrame(step);
  };
  step();
}

/* ── SCROLL REVEAL ───────────────────── */
function initReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        const delay = (e.target.dataset.delay || i * 80);
        setTimeout(() => {
          e.target.classList.add('vis');
          // Counters
          e.target.querySelectorAll('.s-num[data-count]').forEach(animateCount);
        }, delay);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal, .reveal-left').forEach(el => io.observe(el));
}

/* ── SKILLS BENTO ────────────────────── */
function initSkills() {
  const grid = document.getElementById('bentoGrid');
  if (!grid) return;

  SKILLS.forEach((sk, i) => {
    const card = document.createElement('div');
    card.className = 'bento-card' + (sk.size ? ' '+sk.size : '');
    card.innerHTML = `
      <div class="bk-icon">${sk.icon}</div>
      <div class="bk-name">${sk.name}</div>
      <p class="bk-desc">${sk.desc}</p>
      <div class="bk-tags">${sk.tags.map(t=>`<span class="btag ${sk.tclass}">${t}</span>`).join('')}</div>
      <div class="sk-bars">
        ${sk.bars.map(b=>`
          <div class="sk-br">
            <div class="sk-bm"><span>${b.n}</span><span>${b.v}%</span></div>
            <div class="sk-bg"><div class="sk-bf" data-w="${b.v}" style="width:0%"></div></div>
          </div>
        `).join('')}
      </div>
    `;
    grid.appendChild(card);

    // 3D tilt
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - .5;
      const y = (e.clientY - r.top)  / r.height - .5;
      card.style.transform = `translateY(-6px) rotateX(${-y*6}deg) rotateY(${x*6}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });

    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(() => {
            card.classList.add('fell');
            setTimeout(() => {
              card.querySelectorAll('.sk-bf').forEach(b => b.style.width = b.dataset.w + '%');
            }, 300);
          }, i * 90);
          io.disconnect();
        }
      });
    }, { threshold:.1 });
    io.observe(card);
  });
}

/* ── HORIZONTAL SCROLL (drag) ─────────── */
function initHScroll() {
  const wrap  = document.getElementById('hscrollWrap');
  const track = document.getElementById('hscrollTrack');
  if (!wrap || !track) return;

  // Build cards
  H_PROJECTS.forEach(p => {
    const c = document.createElement('div');
    c.className = 'hcard';
    c.innerHTML = `
      <div class="hcard-banner" style="background:${p.bg}">
        <div class="hcard-glow" style="background:${p.glowColor}"></div>
        <span style="font-size:3rem;position:relative;z-index:1">${p.emoji}</span>
      </div>
      <div class="hcard-body">
        <div class="hcard-num">PROJECT_${p.num}</div>
        <div class="hcard-name">${p.name}</div>
        <p class="hcard-desc">${p.desc}</p>
        <div class="hcard-tags">${p.tags.map(t=>`<span class="htag">${t}</span>`).join('')}</div>
        <a href="${p.link}" target="_blank" class="hcard-link">${p.linkText}</a>
      </div>
    `;
    track.appendChild(c);
  });

  // Drag scroll
  let isDown=false, startX=0, scrollLeft=0;
  wrap.addEventListener('mousedown', e => {
    isDown=true; wrap.classList.add('dragging');
    startX = e.pageX - wrap.offsetLeft;
    scrollLeft = wrap.scrollLeft;
  });
  document.addEventListener('mouseup', () => { isDown=false; wrap.classList.remove('dragging'); });
  wrap.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - wrap.offsetLeft;
    wrap.scrollLeft = scrollLeft - (x - startX) * 1.2;
  });

  // Touch
  let tStart=0, tScroll=0;
  wrap.addEventListener('touchstart', e => { tStart=e.touches[0].pageX; tScroll=wrap.scrollLeft; },{passive:true});
  wrap.addEventListener('touchmove',  e => {
    const dx = tStart - e.touches[0].pageX;
    wrap.scrollLeft = tScroll + dx;
  },{passive:true});
}

/* ── PROJECTS GRID ───────────────────── */
function initProjGrid() {
  const grid = document.getElementById('projGrid');
  if (!grid) return;
  GRID_PROJECTS.forEach((p, i) => {
    const c = document.createElement('div');
    c.className = 'pg-card';
    c.innerHTML = `
      <div class="pg-num">${p.num}</div>
      <div class="pg-name">${p.name}</div>
      <p class="pg-desc">${p.desc}</p>
      <a href="${p.link}" target="_blank" class="pg-link">${p.linkText}</a>
    `;
    grid.appendChild(c);
    const io = new IntersectionObserver(ents => {
      ents.forEach(e => {
        if (e.isIntersecting) { setTimeout(()=>c.classList.add('vis'), i*100); io.disconnect(); }
      });
    },{threshold:.1});
    io.observe(c);
  });
}

/* ── ACHIEVEMENTS ────────────────────── */
function initAch() {
  const grid = document.getElementById('achGrid');
  if (!grid) return;
  ACHIEVEMENTS.forEach((a, i) => {
    const c = document.createElement('div');
    c.className = 'ach-card';
    c.innerHTML = `
      <div class="ach-icon">${a.icon}</div>
      <div class="ach-body">
        <div class="ach-badge">${a.badge}</div>
        <div class="ach-title">${a.title}</div>
        <p class="ach-desc">${a.desc}</p>
      </div>
    `;
    grid.appendChild(c);
    const io = new IntersectionObserver(ents => {
      ents.forEach(e => {
        if (e.isIntersecting) { setTimeout(()=>c.classList.add('vis'), i*110); io.disconnect(); }
      });
    },{threshold:.1});
    io.observe(c);
  });
}

/* ── PARALLAX BLOBS ──────────────────── */
function initParallax() {
  const b1 = document.querySelector('.blob-1');
  const b2 = document.querySelector('.blob-2');
  const b3 = document.querySelector('.blob-3');
  window.addEventListener('scroll', () => {
    const y = scrollY;
    if(b1) b1.style.transform = `translateY(${y * .12}px)`;
    if(b2) b2.style.transform = `translateY(${-y * .08}px)`;
    if(b3) b3.style.transform = `translateY(${y * .06}px)`;
  });

  // Mouse parallax on hero
  document.addEventListener('mousemove', e => {
    const x = (e.clientX / innerWidth  - .5) * 20;
    const y = (e.clientY / innerHeight - .5) * 20;
    const hr = document.querySelector('.hero-right');
    if (hr) hr.style.transform = `translate(${x*.4}px,${y*.4}px)`;
  });
}

/* ── MAGNETIC BUTTONS ────────────────── */
function initMagnetic() {
  document.querySelectorAll('.btn-primary, .btn-outline, .nav-cta, .contact-btn').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width/2)  * 0.25;
      const y = (e.clientY - r.top  - r.height/2) * 0.25;
      el.style.transform = `translate(${x}px,${y}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
      el.style.transition = 'transform .5s cubic-bezier(0.34,1.56,0.64,1)';
      setTimeout(() => el.style.transition = '', 500);
    });
  });
}

/* ── HERO CARD TILT ──────────────────── */
function initCardTilt() {
  document.querySelectorAll('.float-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - .5;
      const y = (e.clientY - r.top)  / r.height - .5;
      card.style.transform = `perspective(600px) rotateX(${-y*12}deg) rotateY(${x*12}deg) scale(1.04)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

/* ── CONTACT SECTION REVEAL ──────────── */
function initContactReveal() {
  const sec = document.getElementById('contact');
  if (!sec) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        sec.querySelectorAll('.reveal').forEach((el, i) => {
          setTimeout(() => el.classList.add('vis'), i * 100);
        });
        io.disconnect();
      }
    });
  }, { threshold: .15 });
  io.observe(sec);
}

/* ── KONAMI EASTER EGG ───────────────── */
function initKonami() {
  const seq = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let idx = 0;
  document.addEventListener('keydown', e => {
    idx = e.key === seq[idx] ? idx+1 : 0;
    if (idx === seq.length) {
      idx = 0;
      toast('🎮 Konami Code! Nikhil Mode: UNLOCKED 🔓');
      document.querySelectorAll('.blob').forEach(b => {
        b.style.opacity = '.6';
        setTimeout(() => b.style.opacity = '', 2000);
      });
    }
  });
}

function toast(msg) {
  const el = document.createElement('div');
  el.textContent = msg;
  Object.assign(el.style, {
    position:'fixed', bottom:'32px', left:'50%',
    transform:'translateX(-50%) translateY(20px)',
    background:'rgba(4,7,15,.95)',
    border:'1px solid rgba(0,232,200,.3)',
    color:'#00e8c8', fontFamily:'DM Mono,monospace',
    fontSize:'.65rem', letterSpacing:'2px',
    padding:'12px 28px', borderRadius:'4px',
    zIndex:'9999', opacity:'0',
    backdropFilter:'blur(12px)',
    boxShadow:'0 0 30px rgba(0,232,200,.15)',
    transition:'all .4s cubic-bezier(0.16,1,0.3,1)'
  });
  document.body.appendChild(el);
  requestAnimationFrame(() => {
    el.style.opacity = '1';
    el.style.transform = 'translateX(-50%) translateY(0)';
  });
  setTimeout(() => {
    el.style.opacity = '0';
    el.style.transform = 'translateX(-50%) translateY(10px)';
    setTimeout(() => el.remove(), 400);
  }, 3000);
}

/* ── INIT ALL ─────────────────────────── */
function initAll() {
  initCursor();
  initProgressBar();
  initNav();
  initTyped();
  initReveal();
  initSkills();
  initHScroll();
  initProjGrid();
  initAch();
  initParallax();
  initMagnetic();
  initCardTilt();
  initContactReveal();
  initKonami();
}

/* SVG gradient for preloader (injected) */
document.head.insertAdjacentHTML('beforeend', `
  <svg width="0" height="0" style="position:absolute">
    <defs>
      <linearGradient id="preGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stop-color="#8b5cf6"/>
        <stop offset="50%"  stop-color="#00e8c8"/>
        <stop offset="100%" stop-color="#ec4899"/>
      </linearGradient>
    </defs>
  </svg>
`);
  
