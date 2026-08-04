/* ============================================================
AQUA THERM — script.js
Interações: nav, partículas, reveal, contadores, tilt 3D + Chart.js
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initProgressBar();
  initParticles();
  initReveal();
  initCounters();
  initTilt();
});

/* ---------- NAV ---------- */
function initNav() {
  const nav = document.getElementById('nav');
  const burger = document.getElementById('burger');
  const links = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    links.classList.toggle('open');
    const expanded = burger.classList.contains('open');
    burger.setAttribute('aria-expanded', expanded);
    burger.setAttribute('aria-label', expanded ? 'Fechar menu' : 'Abrir menu');
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      burger.classList.remove('open');
      links.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });

  const sections = document.querySelectorAll('section[id]');
  const navLinks = links.querySelectorAll('a');
  const spy = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => spy.observe(s));
}

/* ---------- Barra de progresso ---------- */
function initProgressBar() {
  const bar = document.getElementById('progressBar');
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (window.scrollY / total) * 100 + '%';
  }, { passive: true });
}

/* ---------- Partículas: bolhas de água ---------- */
function initParticles() {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let w, h, particles;
  const COLORS = ['56,189,248', '59,130,246', '251,191,36'];

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function build() {
    const count = Math.min(70, Math.floor(w / 22));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2.2 + 0.6,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -(Math.random() * 0.4 + 0.08),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.5 + 0.15,
      phase: Math.random() * Math.PI * 2
    }));
  }

  function tick(t) {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      p.x += p.vx + Math.sin(t / 2400 + p.phase) * 0.18;
      p.y += p.vy;
      if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;

      const glow = p.alpha * (0.65 + 0.35 * Math.sin(t / 900 + p.phase));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${glow})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = `rgba(${p.color},0.8)`;
      ctx.fill();
      ctx.shadowBlur = 0;
    });
    requestAnimationFrame(tick);
  }

  resize();
  build();
  window.addEventListener('resize', () => { resize(); build(); });
  requestAnimationFrame(tick);
}

/* ---------- Reveal ---------- */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = (i % 4) * 90 + 'ms';
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
}

/* ---------- Contadores ---------- */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      animateCount(entry.target);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.6 });
  counters.forEach(c => io.observe(c));

  function animateCount(el) {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const duration = 2000;
    const start = performance.now();

    function frame(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const value = target * eased;
      el.textContent = value.toLocaleString('pt-BR', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      });
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
}

/* ---------- Tilt 3D ---------- */
function initTilt() {
  const cards = document.querySelectorAll('.tilt');
  const MAX = 9;
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform =
        `perspective(800px) rotateY(${px * MAX}deg) rotateX(${-py * MAX}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateY(0) rotateX(0) translateY(0)';
    });
  });
}

/* ============================================================
GRÁFICOS — Chart.js
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof Chart === 'undefined') return;

  const CYAN = '#38bdf8';
  const BLUE = '#3b82f6';
  const SUN  = '#fbbf24';
  const MUTED = '#94a3b8';
  const GRID = 'rgba(56, 189, 248, 0.08)';

  Chart.defaults.font.family = "'Sora', sans-serif";
  Chart.defaults.color = MUTED;

  const tooltipStyle = {
    backgroundColor: 'rgba(5, 13, 26, 0.95)',
    borderColor: 'rgba(56, 189, 248, 0.3)',
    borderWidth: 1,
    titleColor: CYAN,
    bodyColor: '#e0f2fe',
    padding: 12,
    cornerRadius: 10,
    displayColors: false
  };

  const lazyChart = (id, buildFn) => {
    const el = document.getElementById(id);
    if (!el) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          buildFn(el);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.3 });
    io.observe(el);
  };

  /* ---------- 1. Linha: temperatura ao longo do dia ---------- */
  lazyChart('chartTemp', el => {
    new Chart(el, {
      type: 'line',
      data: {
        labels: ['6h', '8h', '10h', '12h', '14h', '16h', '18h', '20h'],
        datasets: [
          {
            label: 'Com AquaTherm',
            data: [28, 29, 31, 33, 34, 34, 33, 32],
            borderColor: CYAN,
            backgroundColor: 'rgba(56,189,248,0.1)',
            fill: true,
            tension: 0.4,
            borderWidth: 3,
            pointBackgroundColor: '#050d1a',
            pointBorderColor: CYAN,
            pointBorderWidth: 2,
            pointRadius: 5
          },
          {
            label: 'Sem aquecimento',
            data: [24, 25, 26, 27, 28, 28, 27, 26],
            borderColor: MUTED,
            borderDash: [6, 6],
            fill: false,
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 4
          }
        ]
      },
      options: {
        responsive:
