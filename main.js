/* ==========================================================================
   XTECHNOLOGY GROUP QATAR — Site interactions
   ========================================================================== */

import { initLanguage, onLanguageChange, t } from './i18n.js';

const THEME_KEY = 'xtech-theme';
const root = document.documentElement;
const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

document.addEventListener('DOMContentLoaded', () => {
  // Language first: it records the English text before anything else changes the page
  initLanguage();
  initTheme();
  initStarfield();
  initProductSlider();
  initNavigation();
  initMobileMenu();
  initReveal();
  initTestimonials();
  initInquiryModal();
  initEmailCopy();
});

/* Theme: 'system' | 'light' | 'dark', stored per visitor. Dark is the default. */
const DEFAULT_THEME = 'dark';

function getThemePref() {
  try {
    return localStorage.getItem(THEME_KEY) || DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

function applyTheme(pref, animate = false) {
  const dark = pref === 'dark' || (pref === 'system' && systemDark.matches);

  if (animate) {
    root.classList.add('theme-transition');
    window.setTimeout(() => root.classList.remove('theme-transition'), 250);
  }
  root.setAttribute('data-theme', dark ? 'dark' : 'light');
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#0A0A0A' : '#FFFFFF');

  document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
    btn.setAttribute('aria-label', dark ? t('themeToLight') : t('themeToDark'));
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

  onLanguageChange(() => applyTheme(getThemePref()));
}

/* Hero parallax starfield: each layer's stars are box-shadows on a single dot */
const STAR_FIELD_HEIGHT = 2000; // must match the star-drift keyframe distance in style.css

function generateStars(count, width) {
  const stars = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * STAR_FIELD_HEIGHT);
    stars.push(`${x}px ${y}px`);
  }
  return stars.join(', ');
}

function initStarfield() {
  const field = document.getElementById('starfield');
  if (!field) return;

  // Fewer stars on phones; field is as wide as the largest screen we expect to fill
  const compact = window.matchMedia('(max-width: 640px)').matches;
  const width = Math.min(Math.max(window.screen.width, 1440), 2560);
  const counts = compact ? { sm: 300, md: 90, lg: 45 } : { sm: 700, md: 200, lg: 100 };

  Object.entries(counts).forEach(([size, count]) => {
    field.querySelector(`.stars-${size}`).style.setProperty('--stars', generateStars(count, width));
  });

  // Stop animating while the hero is off-screen
  const observer = new IntersectionObserver(([entry]) => {
    field.classList.toggle('is-paused', !entry.isIntersecting);
  });
  observer.observe(field);
}

/* Products slider: cards drift right to left in a seamless loop.
   Duplicate sets fill the screen; one set's width is the loop distance. */
const SLIDE_SPEED = 32; // pixels per second

function initProductSlider() {
  const marquee = document.getElementById('products-marquee');
  const toggle = document.getElementById('marquee-toggle');
  if (!marquee) return;

  const track = marquee.querySelector('.marquee-track');
  const original = track.querySelector('.marquee-set');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const state = { user: false, hover: false, focus: false, offscreen: false };
  const applyPause = () => {
    marquee.classList.toggle('is-paused', state.user || state.hover || state.focus || state.offscreen);
  };

  const clearClones = () => track.querySelectorAll('[data-clone]').forEach((node) => node.remove());

  const build = () => {
    clearClones();

    // Reduced motion: leave it as a static, swipeable row
    if (reduceMotion.matches) {
      marquee.classList.remove('is-running');
      toggle.hidden = true;
      return;
    }

    const setWidth = original.getBoundingClientRect().width;
    if (!setWidth) return;

    const copies = Math.ceil(marquee.clientWidth / setWidth) + 1;
    for (let i = 0; i < copies; i++) {
      const clone = original.cloneNode(true);
      clone.dataset.clone = '';
      clone.setAttribute('aria-hidden', 'true');
      clone.setAttribute('inert', '');
      clone.querySelectorAll('[id]').forEach((el) => el.removeAttribute('id'));
      track.appendChild(clone);
    }

    track.style.setProperty('--marquee-shift', `${setWidth}px`);
    track.style.setProperty('--marquee-duration', `${(setWidth / SLIDE_SPEED).toFixed(2)}s`);
    marquee.classList.add('is-running');
    toggle.hidden = false;
  };

  build();

  // Rebuild when the width changes (not on height-only changes such as mobile toolbars)
  let lastWidth = marquee.clientWidth;
  let resizeTimer;
  new ResizeObserver(() => {
    if (marquee.clientWidth === lastWidth) return;
    lastWidth = marquee.clientWidth;
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(build, 150);
  }).observe(marquee);
  reduceMotion.addEventListener('change', build);

  // Pause on hover / keyboard focus / when scrolled out of view / by the user
  marquee.addEventListener('pointerenter', (e) => {
    if (e.pointerType === 'mouse') { state.hover = true; applyPause(); }
  });
  marquee.addEventListener('pointerleave', () => { state.hover = false; applyPause(); });
  marquee.addEventListener('focusin', () => { state.focus = true; applyPause(); });
  marquee.addEventListener('focusout', () => { state.focus = false; applyPause(); });

  new IntersectionObserver(([entry]) => {
    state.offscreen = !entry.isIntersecting;
    applyPause();
  }).observe(marquee);

  const updateToggleLabel = () => {
    toggle.setAttribute('aria-label', state.user ? t('sliderPlay') : t('sliderPause'));
  };
  updateToggleLabel();

  toggle.addEventListener('click', () => {
    state.user = !state.user;
    toggle.setAttribute('aria-pressed', String(state.user));
    updateToggleLabel();
    applyPause();
  });

  // The copies hold the old language's text, so rebuild them after a switch
  onLanguageChange(() => {
    updateToggleLabel();
    build();
  });
}

/* Sticky nav background + active section highlight */
function initNavigation() {
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const links = [...document.querySelectorAll('.nav-link')];
  // The hero is observed too, so returning to the top clears the highlight
  const sections = [document.getElementById('top'), ...links.map((link) => document.querySelector(link.getAttribute('href')))]
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
    toggle.setAttribute('aria-label', open ? t('menuClose') : t('menuOpen'));
    document.body.style.overflow = open ? 'hidden' : '';
  };

  setOpen(false);
  onLanguageChange(() => toggle.setAttribute('aria-label', menu.hidden ? t('menuOpen') : t('menuClose')));
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

  const updateLabel = () => {
    toggle.textContent = list.classList.contains('is-expanded') ? t('testimonialsLess') : t('testimonialsMore');
  };
  updateLabel();
  onLanguageChange(updateLabel);

  toggle.addEventListener('click', () => {
    const expanded = list.classList.toggle('is-expanded');
    toggle.setAttribute('aria-expanded', String(expanded));
    updateLabel();
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
      feedback.textContent = t('formError');
      invalid[0].focus();
      return;
    }

    const name = form.elements.name.value.trim();
    feedback.classList.remove('is-error');
    feedback.textContent = t('formThanks', name);

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
      toast.textContent = t('copied');
    } catch {
      toast.textContent = btn.dataset.email;
    }
    toast.classList.add('is-visible');
    window.clearTimeout(timer);
    timer = window.setTimeout(() => toast.classList.remove('is-visible'), 2000);
  });
}
