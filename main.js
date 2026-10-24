/* ==========================================================================
   XTECHNOLOGY GROUP QATAR — Site interactions
   ========================================================================== */

const THEME_KEY = 'xtech-theme';
const root = document.documentElement;
const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initMobileMenu();
  initReveal();
  initTestimonials();
  initInquiryModal();
  initEmailCopy();
});

/* Theme: 'system' | 'light' | 'dark', stored per visitor */
function getThemePref() {
  try {
    return localStorage.getItem(THEME_KEY) || 'system';
  } catch {
    return 'system';
  }
}

function applyTheme(pref, animate = false) {
  const dark = pref === 'dark' || (pref === 'system' && systemDark.matches);

  if (animate) {
    root.classList.add('theme-transition');
    window.setTimeout(() => root.classList.remove('theme-transition'), 250);
  }
  root.setAttribute('data-theme', dark ? 'dark' : 'light');

  document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
    btn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
  });
  document.querySelectorAll('[data-theme-choice]').forEach((btn) => {
    btn.setAttribute('aria-checked', String(btn.dataset.themeChoice === pref));
  });
}

function setThemePref(pref) {
  try {
    localStorage.setItem(THEME_KEY, pref);
  } catch {
    /* storage unavailable: theme still applies for this visit */
  }
  applyTheme(pref, true);
}

function initTheme() {
  applyTheme(getThemePref());

  document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      setThemePref(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
  });

  document.querySelectorAll('[data-theme-choice]').forEach((btn) => {
    btn.addEventListener('click', () => setThemePref(btn.dataset.themeChoice));
  });

  systemDark.addEventListener('change', () => {
    if (getThemePref() === 'system') applyTheme('system', true);
  });
}

/* Sticky nav background + active section highlight */
function initNavigation() {
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const links = [...document.querySelectorAll('.nav-link')];
  const sections = links
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => {
          link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  sections.forEach((section) => observer.observe(section));
}

function initMobileMenu() {
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');

  const setOpen = (open) => {
    nav.classList.toggle('is-open', open);
    menu.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.style.overflow = open ? 'hidden' : '';
  };

  toggle.addEventListener('click', () => setOpen(menu.hidden));
  menu.querySelectorAll('a, button').forEach((el) => el.addEventListener('click', () => setOpen(false)));
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) setOpen(false);
  });
  window.matchMedia('(min-width: 1025px)').addEventListener('change', (e) => {
    if (e.matches) setOpen(false);
  });
}

/* Fade sections in once as they enter the viewport */
function initReveal() {
  const items = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -8% 0px' }
  );
  items.forEach((item) => observer.observe(item));
}

function initTestimonials() {
  const list = document.getElementById('testimonial-list');
  const toggle = document.getElementById('testimonials-toggle');

  toggle.addEventListener('click', () => {
    const expanded = list.classList.toggle('is-expanded');
    toggle.setAttribute('aria-expanded', String(expanded));
    toggle.textContent = expanded ? 'Show fewer testimonials' : 'Show all testimonials';
    if (!expanded) list.scrollIntoView({ block: 'start' });
  });
}

/* Inquiry dialog (native <dialog> handles focus trap + Escape) */
function initInquiryModal() {
  const modal = document.getElementById('inquiry-modal');
  const form = document.getElementById('inquiry-form');
  const feedback = document.getElementById('form-feedback');

  document.querySelectorAll('[data-open-inquiry]').forEach((btn) => {
    btn.addEventListener('click', () => modal.showModal());
  });
  modal.querySelectorAll('[data-close-inquiry]').forEach((btn) => {
    btn.addEventListener('click', () => modal.close());
  });
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.close();
  });

  form.addEventListener('input', (e) => {
    e.target.closest('.field')?.classList.remove('is-invalid');
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const invalid = [...form.querySelectorAll('[required]')].filter((field) => !field.checkValidity());
    invalid.forEach((field) => field.closest('.field').classList.add('is-invalid'));
    if (invalid.length) {
      feedback.classList.add('is-error');
      feedback.textContent = 'Please complete the highlighted fields.';
      invalid[0].focus();
      return;
    }

    const name = form.elements.name.value.trim();
    feedback.classList.remove('is-error');
    feedback.textContent = `Thank you, ${name}. Our team will reply within 4 hours.`;

    window.setTimeout(() => {
      form.reset();
      feedback.textContent = '';
      modal.close();
    }, 2500);
  });
}

function initEmailCopy() {
  const btn = document.getElementById('copy-email');
  const toast = document.getElementById('toast');
  let timer;

  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.email);
      toast.textContent = 'Email copied to clipboard';
    } catch {
      toast.textContent = btn.dataset.email;
    }
    toast.classList.add('is-visible');
    window.clearTimeout(timer);
    timer = window.setTimeout(() => toast.classList.remove('is-visible'), 2000);
  });
}
