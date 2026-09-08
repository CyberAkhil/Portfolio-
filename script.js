const nav = document.getElementById('nav');
const prog = document.getElementById('prog');
const burger = document.getElementById('bg');
const mob = document.getElementById('mob');

window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const max = h.scrollHeight - h.clientHeight;
  prog.style.width = (max ? (h.scrollTop / max) * 100 : 0) + '%';
  nav.classList.toggle('stuck', window.scrollY > 40);

  let cur = '';
  document.querySelectorAll('section[id]').forEach((s) => {
    if (window.scrollY >= s.offsetTop - 180) cur = s.id;
  });
  document.querySelectorAll('.n-links a[data-s]').forEach((a) => {
    a.classList.toggle('active', a.dataset.s === cur);
  });
});

const setMob = (open) => {
  mob.classList.toggle('on', open);
  burger.classList.toggle('on', open);
  document.body.style.overflow = open ? 'hidden' : '';
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  mob.setAttribute('aria-hidden', String(!open));
};

const closeMob = () => setMob(false);

burger.addEventListener('click', () => setMob(!mob.classList.contains('on')));
document.querySelectorAll('.mm').forEach((a) => a.addEventListener('click', closeMob));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mob.classList.contains('on')) closeMob();
});
window.addEventListener('resize', () => {
  if (window.innerWidth > 1024 && mob.classList.contains('on')) closeMob();
});

document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const el = document.getElementById(a.getAttribute('href').slice(1));
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth' });
    closeMob();
  });
});

// Scroll Reveals
const obs = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('vis');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.r, .tli').forEach((el) => obs.observe(el));

// Stats Count-Up Animation
const animateCount = (el) => {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || '';
  if (isNaN(target)) return;

  const duration = 900;
  const startTime = performance.now();

  const update = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const currentCount = Math.floor(easeProgress * target);

    el.textContent = currentCount + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target + suffix;
    }
  };

  requestAnimationFrame(update);
};

const statsObs = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.stat-n[data-count]').forEach(animateCount);
      statsObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

const statsGrid = document.querySelector('.stats-grid');
if (statsGrid) statsObs.observe(statsGrid);

// Terminal Typewriter Effect
let termTyped = false;
const initTerminalTypewriter = () => {
  const codeEl = document.getElementById('term-code');
  if (!codeEl || termTyped) return;

  const htmlContent = codeEl.innerHTML;
  const termEl = codeEl.closest('.term');
  if (!termEl) return;

  const termObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting && !termTyped) {
        termTyped = true;
        typeTerminal(codeEl, htmlContent);
        termObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });

  termObs.observe(termEl);
};

const typeTerminal = (container, fullHtml) => {
  const cursor = document.createElement('span');
  cursor.className = 'term-cursor';

  container.innerHTML = '';
  container.appendChild(cursor);

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = fullHtml;

  const nodes = Array.from(tempDiv.childNodes);
  let nodeIdx = 0;

  const typeNextNode = () => {
    if (nodeIdx >= nodes.length) return;
    const node = nodes[nodeIdx++];
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;
      let charIdx = 0;
      const typeChar = () => {
        if (charIdx < text.length) {
          cursor.before(document.createTextNode(text.charAt(charIdx++)));
          setTimeout(typeChar, 12);
        } else {
          typeNextNode();
        }
      };
      typeChar();
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const clone = node.cloneNode(false);
      cursor.before(clone);
      const text = node.textContent;
      let charIdx = 0;
      const typeChar = () => {
        if (charIdx < text.length) {
          clone.textContent += text.charAt(charIdx++);
          setTimeout(typeChar, 12);
        } else {
          typeNextNode();
        }
      };
      typeChar();
    }
  };

  typeNextNode();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTerminalTypewriter);
} else {
  initTerminalTypewriter();
}

// ── Dark Mode Toggle ────────────────────────────────────────────────
const html = document.documentElement;
const themeBtn = document.getElementById('theme-btn');

// Apply saved or system preference immediately (no flash)
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  html.setAttribute('data-theme', savedTheme);
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  html.setAttribute('data-theme', 'dark');
} else {
  html.setAttribute('data-theme', 'light');
}

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
}
