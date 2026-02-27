/* NexLock — Interactive Scripts */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initSmoothScroll();
  initScrollReveal();
  initContactForm();
  initHeaderShadow();
});

/* Theme Toggle */
function initTheme() {
  const html = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');

  // Restore saved theme
  const savedTheme = localStorage.getItem('nexlock-theme') || 'light';
  html.setAttribute('data-theme', savedTheme);

  toggle?.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('nexlock-theme', next);
  });
}

/* Mobile Menu */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function openMenu() {
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Close menu');
    mobileMenu.classList.add('is-open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open menu');
    mobileMenu.classList.remove('is-open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  hamburger?.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('is-open');
    if (isOpen) closeMenu();
    else openMenu();
  });

  mobileLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
}

/* Smooth Scroll */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* Scroll Reveal (IntersectionObserver) */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach((el) => {
    const delay = el.getAttribute('data-delay');
    if (delay) el.style.setProperty('--reveal-delay', `${delay}ms`);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          // Only animate once for a cleaner feel
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -80px 0px',
    }
  );

  revealElements.forEach((el) => observer.observe(el));
}

/* Header shadow on scroll */
function initHeaderShadow() {
  const header = document.querySelector('.header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 8) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* Contact Form */
function initContactForm() {
  const form = document.querySelector('.contact-form');
  const demoMessage = document.querySelector('.demo-message');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = form.querySelector('#name');
    const messageInput = form.querySelector('#message');
    const nameError = nameInput.closest('.form-group').querySelector('.error-message');
    const messageError = messageInput.closest('.form-group').querySelector('.error-message');

    // Reset previous state
    nameInput.classList.remove('error');
    messageInput.classList.remove('error');
    nameError.textContent = '';
    messageError.textContent = '';
    demoMessage.hidden = true;

    let isValid = true;

    if (!nameInput.value.trim()) {
      nameInput.classList.add('error');
      nameError.textContent = 'Please enter your name.';
      isValid = false;
    }

    if (!messageInput.value.trim()) {
      messageInput.classList.add('error');
      messageError.textContent = 'Please enter a message.';
      isValid = false;
    }

    if (!isValid) return;

    // Demo: show message instead of sending
    demoMessage.hidden = false;
    demoMessage.scrollIntoView({ behavior: 'smooth' });
    form.reset();
  });
}
