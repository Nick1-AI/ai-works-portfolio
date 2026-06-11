// ── Scroll Reveal (fade-in: opacity 0→1, translateY 24px→0) ──
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


// ── Stats Count-Up Animation (IntersectionObserver) ──
function animateCount(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  const isFloat = String(target).includes('.');
  const duration = 1600;
  const startTime = performance.now();

  function update(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    // ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = target * eased;
    el.textContent = prefix + (isFloat ? current.toFixed(1) : Math.floor(current)) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

const statObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat__number[data-target]').forEach(el => statObserver.observe(el));


// ── Nav Active State on Scroll ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__links a');

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'));
      const link = document.querySelector(`.nav__links a[href="#${entry.target.id}"]`);
      if (link) link.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));


// ── Mobile Hamburger Menu ──
const hamburger = document.querySelector('.nav__hamburger');
const navLinksEl = document.querySelector('.nav__links');

if (hamburger && navLinksEl) {
  hamburger.addEventListener('click', () => {
    const isOpen = navLinksEl.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when a link is clicked
  navLinksEl.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinksEl.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}
