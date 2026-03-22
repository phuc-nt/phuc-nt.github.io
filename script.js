// ===================================
// BACKGROUND PARTICLES
// ===================================
function createParticles() {
  const container = document.getElementById('particles');
  const colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#4ade80'];
  const count = 40;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    const size = Math.random() * 4 + 1;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const duration = Math.random() * 20 + 15;
    const delay = Math.random() * 20;

    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      left: ${left}%;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      box-shadow: 0 0 ${size * 3}px ${color};
    `;
    container.appendChild(particle);
  }
}

// ===================================
// NAVBAR SCROLL
// ===================================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// ===================================
// TYPING ANIMATION
// ===================================
function initTypingAnimation() {
  const texts = [
    'AI Evangelist & Senior BrSE',
    'Building AI-Powered Products',
    'Bridging Japan & Vietnam',
    'Speaker at Tech Conferences',
    'Open Source Contributor'
  ];

  const el = document.getElementById('typingText');
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      el.textContent = currentText.slice(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      el.textContent = currentText.slice(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      typingSpeed = 1800;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  setTimeout(type, 800);
}

// ===================================
// SMOOTH SCROLL
// ===================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ===================================
// SCROLL REVEAL ANIMATIONS
// ===================================
function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    '.about-card, .project-card, .cert-card, .contact-card, ' +
    '.career-card, .achievement-item, .timeline-item, .section-header'
  );

  revealElements.forEach((el, index) => {
    el.classList.add('reveal');
    const delay = (index % 4) * 0.1;
    el.style.transitionDelay = `${delay}s`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => observer.observe(el));
}

// ===================================
// CURSOR GLOW EFFECT ON CARDS
// ===================================
function initCardGlow() {
  const cards = document.querySelectorAll(
    '.project-card, .about-card, .cert-card, .contact-card'
  );

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    });
  });
}

// ===================================
// ACTIVE NAV LINK
// ===================================
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${id}`) {
            link.style.color = '#6366f1';
          }
        });
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(section => observer.observe(section));
}

// ===================================
// ANIMATED COUNTER STATS
// ===================================
function animateCounter(el, target, suffix = '') {
  let current = 0;
  const increment = target / 50;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current) + suffix;
  }, 30);
}

function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        const text = entry.target.textContent;
        const value = parseInt(text);
        const suffix = text.includes('+') ? '+' : '';
        animateCounter(entry.target, value, suffix);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

// ===================================
// AVATAR TILT EFFECT
// ===================================
function initAvatarTilt() {
  const wrapper = document.querySelector('.hero-avatar-wrapper');
  if (!wrapper) return;

  document.addEventListener('mousemove', (e) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const dx = (e.clientX - centerX) / centerX;
    const dy = (e.clientY - centerY) / centerY;

    wrapper.style.transform = `perspective(600px) rotateX(${-dy * 8}deg) rotateY(${dx * 8}deg)`;
  });

  wrapper.addEventListener('mouseleave', () => {
    wrapper.style.transform = 'perspective(600px) rotateX(0) rotateY(0)';
  });
}

// ===================================
// INIT ALL
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  initNavbar();
  initTypingAnimation();
  initSmoothScroll();
  initScrollReveal();
  initCardGlow();
  initActiveNav();
  initCounters();
  initAvatarTilt();

  console.log('%c🚀 Phuc Nguyen Portfolio', 'font-size: 20px; color: #6366f1; font-weight: bold;');
  console.log('%cAI Evangelist & Senior BrSE | phucnt0@gmail.com', 'color: #94a3b8;');
});
