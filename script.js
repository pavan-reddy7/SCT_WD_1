/* ============================================
   APEX MOTORS — v4
   Cinematic intro, animated spec counters,
   directional slides, white Defender
   ============================================ */

const CARS = [
  { id:'challenger', name:'Dodge Challenger\nSRT Hellcat', watermark:'CHALLENGER', tagline:'American Muscle Redefined', price:'$73,595', image:'images/challenger.png', accent:'#C1121F', accentRGB:'193,18,31', bgColor:'#0a0808', specs:{hp:807,speed:327,accel:'3.4',torque:959} },
  { id:'porsche', name:'Porsche 911\nGT3 RS', watermark:'PORSCHE', tagline:'Track-Bred Precision', price:'$223,800', image:'images/porsche.png', accent:'#6EC6FF', accentRGB:'110,198,255', bgColor:'#080b0e', specs:{hp:518,speed:296,accel:'3.2',torque:465} },
  { id:'ferrari', name:'Ferrari\nLaFerrari', watermark:'FERRARI', tagline:'The Prancing Horse Legacy', price:'$1,420,000', image:'images/ferrari.png', accent:'#FF2800', accentRGB:'255,40,0', bgColor:'#0c0606', specs:{hp:950,speed:350,accel:'2.4',torque:900} },
  { id:'mustang', name:'1969 Mustang\nBoss 429', watermark:'MUSTANG', tagline:"John Wick's Legend", price:'$450,000', image:'images/mustang_boss.png', accent:'#B08D57', accentRGB:'176,141,87', bgColor:'#0b0a08', specs:{hp:375,speed:250,accel:'5.8',torque:610} },
  { id:'aventador', name:'Lamborghini\nAventador', watermark:'LAMBORGHINI', tagline:'Raging Bull Unleashed', price:'$507,000', image:'images/aventador.png', accent:'#FF6A00', accentRGB:'255,106,0', bgColor:'#0c0906', specs:{hp:770,speed:355,accel:'2.8',torque:720} },
  { id:'gwagon', name:'Mercedes\nG-Wagon', watermark:'G-WAGON', tagline:'Luxury Without Limits', price:'$179,000', image:'images/gwagon.png', accent:'#C0C0C0', accentRGB:'192,192,192', bgColor:'#0a0a0c', specs:{hp:577,speed:220,accel:'4.5',torque:850} },
  { id:'shelby', name:'Ford Shelby\nGT500', watermark:'SHELBY', tagline:'Shelby Heritage Lives On', price:'$72,900', image:'images/shelby.png', accent:'#0077FF', accentRGB:'0,119,255', bgColor:'#06080c', specs:{hp:760,speed:290,accel:'3.3',torque:847} },
  { id:'bmw_m5', name:'BMW M5\nCompetition', watermark:'BMW', tagline:'The Ultimate Driving Machine', price:'$112,000', image:'images/bmw_m5.png', accent:'#0096FF', accentRGB:'0,150,255', bgColor:'#06090c', specs:{hp:617,speed:305,accel:'3.3',torque:750} },
  { id:'amg_gt', name:'Mercedes\nAMG GT', watermark:'AMG', tagline:'Handcrafted Excellence', price:'$162,900', image:'images/amg_gt.png', accent:'#00A86B', accentRGB:'0,168,107', bgColor:'#060c09', specs:{hp:577,speed:318,accel:'3.1',torque:700} },
  { id:'defender', name:'Land Rover\nDefender 110', watermark:'DEFENDER', tagline:'Adventure Meets Luxury', price:'$57,200', image:'images/defender.png', accent:'#A8A8A8', accentRGB:'168,168,168', bgColor:'#0a0a0a', specs:{hp:395,speed:191,accel:'5.8',torque:550} }
];

let currentHeroCar = 0;
let currentShowcaseCar = 0;
let countersAnimated = false;
let isTransitioning = false;

document.addEventListener('DOMContentLoaded', () => {
  initLoaderAndCinematic();
  initParticles();
  initNavbar();
  initHero();
  initShowcase();
  initScrollAnimations();
  initPerformanceCounters();
  initFeatureCardGlow();
  initScrollProgress();
  applyTheme(CARS[0]);
  animateHeroSpecs(CARS[0]); // Animate initial specs
});

/* ══════════════════════════════════
   LOADER → CINEMATIC INTRO
   F1 car & bar perfectly synced via
   single rAF loop
   ══════════════════════════════════ */
function initLoaderAndCinematic() {
  const loader = document.getElementById('loader');
  const cinematic = document.getElementById('cinematicOverlay');
  const f1Car = document.querySelector('.loader-f1');
  const barFill = document.querySelector('.loader-line-fill');
  const track = document.querySelector('.loader-car-track');

  const DURATION = 2200; // ms — both car and bar take exactly this long
  const startTime = performance.now();

  // Cubic ease-in-out for smooth acceleration/deceleration
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function animateLoader(now) {
    const elapsed = now - startTime;
    const rawProgress = Math.min(elapsed / DURATION, 1);
    const eased = easeInOutCubic(rawProgress);

    // Move F1 car: from -120px to (trackWidth + 120px)
    const trackWidth = track.offsetWidth;
    const carStart = -120;
    const carEnd = trackWidth + 120;
    const carLeft = carStart + (carEnd - carStart) * eased;
    f1Car.style.left = carLeft + 'px';

    // Fill bar to same progress
    barFill.style.width = (eased * 100) + '%';

    if (rawProgress < 1) {
      requestAnimationFrame(animateLoader);
    } else {
      // Animation complete → transition to cinematic
      setTimeout(() => {
        loader.classList.add('hidden');
        cinematic.classList.add('active');

        setTimeout(() => {
          cinematic.classList.add('fade-out');
          setTimeout(() => {
            cinematic.classList.remove('active');
            cinematic.classList.remove('fade-out');
          }, 1000);
        }, 1800);
      }, 300);
    }
  }

  requestAnimationFrame(animateLoader);
}

/* ══════════════════════════════════
   PARTICLES
   ══════════════════════════════════ */
function initParticles() {
  const c = document.getElementById('particles-canvas');
  const ctx = c.getContext('2d');
  let pts = [];
  function resize() { c.width = window.innerWidth; c.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);
  for (let i = 0; i < 25; i++) {
    pts.push({
      x: Math.random() * c.width, y: Math.random() * c.height,
      s: Math.random() * 1.2 + 0.3,
      sx: (Math.random() - 0.5) * 0.15, sy: (Math.random() - 0.5) * 0.15,
      o: Math.random() * 0.15 + 0.03
    });
  }
  (function animate() {
    ctx.clearRect(0, 0, c.width, c.height);
    const rgb = getComputedStyle(document.documentElement).getPropertyValue('--accent-rgb').trim() || '193,18,31';
    pts.forEach(p => {
      p.x += p.sx; p.y += p.sy;
      if (p.x < 0) p.x = c.width; if (p.x > c.width) p.x = 0;
      if (p.y < 0) p.y = c.height; if (p.y > c.height) p.y = 0;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${rgb}, ${p.o})`; ctx.fill();
    });
    requestAnimationFrame(animate);
  })();
}

/* ══════════════════════════════════
   NAVBAR
   ══════════════════════════════════ */
function initNavbar() {
  const nb = document.getElementById('navbar');
  const hb = document.getElementById('hamburger');
  const mm = document.getElementById('mobileMenu');
  const links = document.querySelectorAll('.nav-links a, .mobile-menu a');

  window.addEventListener('scroll', () => nb.classList.toggle('scrolled', window.scrollY > 50), { passive: true });

  hb.addEventListener('click', () => {
    hb.classList.toggle('active');
    mm.classList.toggle('active');
    document.body.style.overflow = mm.classList.contains('active') ? 'hidden' : '';
  });

  links.forEach(l => l.addEventListener('click', () => {
    hb.classList.remove('active'); mm.classList.remove('active');
    document.body.style.overflow = '';
  }));

  const secs = document.querySelectorAll('section[id]');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        links.forEach(l => l.classList.toggle('active', l.getAttribute('data-section') === id));
      }
    });
  }, { rootMargin: '-40% 0px -60% 0px' });
  secs.forEach(s => obs.observe(s));
}

/* ══════════════════════════════════
   THEME
   ══════════════════════════════════ */
function applyTheme(car) {
  const r = document.documentElement;
  r.style.setProperty('--accent', car.accent);
  r.style.setProperty('--accent-rgb', car.accentRGB);
  document.body.style.backgroundColor = car.bgColor;
  document.querySelector('.hero').style.backgroundColor = car.bgColor;
}

/* ══════════════════════════════════
   ANIMATED SPEC COUNTERS (Hero card)
   Counts from 0 → value when car changes
   ══════════════════════════════════ */
function animateHeroSpecs(car) {
  // HP counter
  animateValue('specHp', 0, car.specs.hp, 1200, false);
  // Speed counter
  animateValue('specSpeed', 0, car.specs.speed, 1200, false);
  // Torque counter
  animateValue('specTorque', 0, car.specs.torque, 1200, false);
  // Accel (decimal) — show with 's' suffix
  animateValue('specAccel', 0, parseFloat(car.specs.accel), 1200, true);
}

function animateValue(elementId, start, end, duration, isDecimal) {
  const el = document.getElementById(elementId);
  if (!el) return;
  const startTime = performance.now();

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = start + (end - start) * eased;

    if (isDecimal) {
      el.textContent = current.toFixed(1) + 's';
    } else {
      el.textContent = Math.floor(current);
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

/* ══════════════════════════════════
   HERO — Directional Slides
   ══════════════════════════════════ */
function initHero() {
  const dots = document.getElementById('heroDots');
  CARS.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = `hero-dot${i === 0 ? ' active' : ''}`;
    d.addEventListener('click', () => {
      if (i !== currentHeroCar) goToHeroCar(i, i > currentHeroCar ? 'next' : 'prev');
    });
    dots.appendChild(d);
  });

  document.getElementById('heroPrev').addEventListener('click', () => {
    goToHeroCar((currentHeroCar - 1 + CARS.length) % CARS.length, 'prev');
  });
  document.getElementById('heroNext').addEventListener('click', () => {
    goToHeroCar((currentHeroCar + 1) % CARS.length, 'next');
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') goToHeroCar((currentHeroCar - 1 + CARS.length) % CARS.length, 'prev');
    if (e.key === 'ArrowRight') goToHeroCar((currentHeroCar + 1) % CARS.length, 'next');
  });

  // Touch swipe
  let tx = 0;
  const w = document.getElementById('heroCarWrapper');
  w.addEventListener('touchstart', e => { tx = e.changedTouches[0].screenX; }, { passive: true });
  w.addEventListener('touchend', e => {
    const d = tx - e.changedTouches[0].screenX;
    if (Math.abs(d) > 50) {
      goToHeroCar(d > 0 ? (currentHeroCar + 1) % CARS.length : (currentHeroCar - 1 + CARS.length) % CARS.length, d > 0 ? 'next' : 'prev');
    }
  }, { passive: true });

  updateCounter();
}

function goToHeroCar(index, direction) {
  if (isTransitioning || index === currentHeroCar) return;
  isTransitioning = true;

  const car = CARS[index];
  const img = document.getElementById('heroCarImg');
  const name = document.getElementById('heroCarName');
  const tagline = document.getElementById('heroTagline');
  const price = document.getElementById('heroCarPrice');
  const watermark = document.getElementById('heroWatermark');

  const outClass = direction === 'next' ? 'slide-out-left' : 'slide-out-right';
  const inClass = direction === 'next' ? 'slide-in-right' : 'slide-in-left';

  // Slide OUT
  img.className = 'hero-car-img ' + outClass;
  name.className = 'hero-car-name ' + outClass;
  tagline.className = 'hero-car-tagline ' + outClass;
  price.className = 'hero-car-price ' + outClass;
  watermark.style.opacity = '0';

  setTimeout(() => {
    // Update content
    img.src = car.image;
    img.alt = car.name.replace('\n', ' ');
    name.innerHTML = car.name.replace('\n', '<br>');
    tagline.textContent = car.tagline;
    price.textContent = car.price;
    watermark.textContent = car.watermark;

    // Apply theme
    applyTheme(car);
    currentHeroCar = index;

    // Animate spec counters 0 → value
    animateHeroSpecs(car);

    // Slide IN
    img.className = 'hero-car-img ' + inClass;
    name.className = 'hero-car-name ' + inClass;
    tagline.className = 'hero-car-tagline ' + inClass;
    price.className = 'hero-car-price ' + inClass;
    watermark.style.opacity = '1';

    setTimeout(() => {
      img.className = 'hero-car-img';
      name.className = 'hero-car-name';
      tagline.className = 'hero-car-tagline';
      price.className = 'hero-car-price';
      isTransitioning = false;
    }, 420);
  }, 360);

  // Update dots + counter
  document.querySelectorAll('.hero-dot').forEach((d, i) => d.classList.toggle('active', i === index));
  currentHeroCar = index;
  updateCounter();
}

function updateCounter() {
  document.getElementById('heroCounter').textContent =
    `${String(currentHeroCar + 1).padStart(2, '0')} / ${String(CARS.length).padStart(2, '0')}`;
}

/* ══════════════════════════════════
   SHOWCASE
   ══════════════════════════════════ */
function initShowcase() {
  const track = document.getElementById('showcaseTrack');
  const dots = document.getElementById('showcaseDots');

  CARS.forEach((car, i) => {
    const card = document.createElement('div');
    card.className = `showcase-card${i === 0 ? ' active' : ''}`;
    card.innerHTML = `
      <img src="${car.image}" alt="${car.name.replace('\n',' ')}" class="showcase-car-img" loading="lazy">
      <div class="showcase-info">
        <h3 class="showcase-car-name">${car.name.replace('\n',' ')}</h3>
        <p class="showcase-car-tagline">${car.tagline}</p>
        <p class="showcase-car-price">${car.price}</p>
        <div class="showcase-specs-grid">
          <div class="showcase-spec"><div class="showcase-spec-val">${car.specs.hp}</div><div class="showcase-spec-lbl">HP</div></div>
          <div class="showcase-spec"><div class="showcase-spec-val">${car.specs.speed}</div><div class="showcase-spec-lbl">km/h</div></div>
          <div class="showcase-spec"><div class="showcase-spec-val">${car.specs.accel}s</div><div class="showcase-spec-lbl">0-100</div></div>
          <div class="showcase-spec"><div class="showcase-spec-val">${car.specs.torque}</div><div class="showcase-spec-lbl">Nm</div></div>
        </div>
      </div>`;
    track.appendChild(card);

    const dot = document.createElement('div');
    dot.className = `showcase-dot${i === 0 ? ' active' : ''}`;
    dot.addEventListener('click', () => goToShowcaseCar(i));
    dots.appendChild(dot);
  });

  document.getElementById('showcasePrev').addEventListener('click', () => goToShowcaseCar((currentShowcaseCar - 1 + CARS.length) % CARS.length));
  document.getElementById('showcaseNext').addEventListener('click', () => goToShowcaseCar((currentShowcaseCar + 1) % CARS.length));

  let tx = 0;
  track.addEventListener('touchstart', e => { tx = e.changedTouches[0].screenX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const d = tx - e.changedTouches[0].screenX;
    if (Math.abs(d) > 50) goToShowcaseCar(d > 0 ? (currentShowcaseCar + 1) % CARS.length : (currentShowcaseCar - 1 + CARS.length) % CARS.length);
  }, { passive: true });
}

function goToShowcaseCar(i) {
  currentShowcaseCar = i;
  document.getElementById('showcaseTrack').style.transform = `translateX(-${i * 100}%)`;
  document.getElementById('showcaseTrack').querySelectorAll('.showcase-card').forEach((c, j) => c.classList.toggle('active', j === i));
  document.querySelectorAll('.showcase-dot').forEach((d, j) => d.classList.toggle('active', j === i));
  applyTheme(CARS[i]);
}

/* ══════════════════════════════════
   SCROLL ANIMATIONS
   ══════════════════════════════════ */
function initScrollAnimations() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger-children');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => e.target.classList.toggle('visible', e.isIntersecting));
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  els.forEach(el => obs.observe(el));
}

/* ══════════════════════════════════
   PERFORMANCE SECTION COUNTERS
   ══════════════════════════════════ */
function initPerformanceCounters() {
  const g = document.getElementById('perfGrid');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !countersAnimated) {
        countersAnimated = true;
        animateCounters();
      } else if (!e.isIntersecting) {
        countersAnimated = false;
        document.querySelectorAll('.counter').forEach(c => c.textContent = '0');
        document.querySelectorAll('.counter-decimal').forEach(c => c.textContent = '0');
      }
    });
  }, { threshold: 0.25 });
  obs.observe(g);
}

function animateCounters() {
  document.querySelectorAll('.counter').forEach(c => {
    const t = parseInt(c.dataset.target), s = performance.now();
    (function u(n) {
      const p = Math.min((n - s) / 1800, 1);
      c.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * t);
      if (p < 1) requestAnimationFrame(u);
    })(s);
  });
  document.querySelectorAll('.counter-decimal').forEach(c => {
    const t = parseFloat(c.dataset.target), s = performance.now();
    (function u(n) {
      const p = Math.min((n - s) / 1800, 1);
      c.textContent = ((1 - Math.pow(1 - p, 3)) * t).toFixed(1);
      if (p < 1) requestAnimationFrame(u);
    })(s);
  });
}

/* ── Feature card glow ── */
function initFeatureCardGlow() {
  document.querySelectorAll('.feature-card').forEach(c => {
    c.addEventListener('mousemove', e => {
      const r = c.getBoundingClientRect();
      c.style.setProperty('--mouse-x', `${((e.clientX - r.left) / r.width) * 100}%`);
      c.style.setProperty('--mouse-y', `${((e.clientY - r.top) / r.height) * 100}%`);
    });
  });
}

/* ── Scroll progress ── */
function initScrollProgress() {
  const b = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    b.style.width = `${(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%`;
  }, { passive: true });
}

/* ── Form ── */
function handleFormSubmit(e) {
  e.preventDefault();
  const b = e.target.querySelector('.form-submit'), o = b.textContent;
  b.textContent = 'Sent ✓'; b.style.background = '#00A86B';
  setTimeout(() => { b.textContent = o; b.style.background = ''; e.target.reset(); }, 3000);
}
