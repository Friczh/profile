/* ================================================================
   main.js — Theme toggle · Navigation drawer · Scroll behaviors
   ================================================================ */

'use strict';

/* ── DOM refs ─────────────────────────────────────────────────── */
const html          = document.documentElement;
const menuBtn       = document.getElementById('menu-btn');
const drawerCloseBtn= document.getElementById('drawer-close-btn');
const navDrawer     = document.getElementById('nav-drawer');
const navScrim      = document.getElementById('nav-scrim');
const themeBtn      = document.getElementById('theme-btn');
const themeIcon     = document.getElementById('theme-icon');
const topAppBar     = document.getElementById('top-app-bar');
const pageWrapper   = document.getElementById('page-wrapper');
const pageLoader    = document.getElementById('page-loader');
const fabBtn        = document.getElementById('back-to-top-fab');

/* ── State ────────────────────────────────────────────────────── */
let drawerOpen   = false;
let currentTheme = localStorage.getItem('theme') || 'light';

/* ================================================================
   THEME
   ================================================================ */
function applyTheme(theme, animate = false) {
  if (animate) {
    themeIcon.classList.add('spinning');
    setTimeout(() => {
      html.setAttribute('data-theme', theme);
      themeIcon.textContent = theme === 'light' ? 'light_mode' : 'dark_mode';
      themeIcon.classList.remove('spinning');
    }, 200);
  } else {
    html.setAttribute('data-theme', theme);
    themeIcon.textContent = theme === 'light' ? 'light_mode' : 'dark_mode';
  }
  localStorage.setItem('theme', theme);
  currentTheme = theme;
}

function toggleTheme() {
  applyTheme(currentTheme === 'light' ? 'dark' : 'light', true);
}

/* ================================================================
   NAVIGATION DRAWER
   ================================================================ */
function openDrawer() {
  drawerOpen = true;
  navDrawer.classList.add('open');
  navDrawer.setAttribute('aria-hidden', 'false');
  menuBtn.setAttribute('aria-expanded', 'true');

  // Mobile: show scrim
  navScrim.classList.add('visible');

  // Desktop: push page content
  pageWrapper.classList.add('drawer-open');

  // Trap first focusable in drawer
  const first = navDrawer.querySelector('button, [href]');
  if (first) setTimeout(() => first.focus(), 50);
}

function closeDrawer() {
  drawerOpen = false;
  navDrawer.classList.remove('open');
  navDrawer.setAttribute('aria-hidden', 'true');
  menuBtn.setAttribute('aria-expanded', 'false');
  navScrim.classList.remove('visible');
  pageWrapper.classList.remove('drawer-open');
  menuBtn.focus();
}

function toggleDrawer() {
  drawerOpen ? closeDrawer() : openDrawer();
}

/* ── Navigate to a section and close drawer ─────────────────────── */
function navigateTo(sectionId) {
  const target = document.getElementById(sectionId);
  if (!target) return;

  closeDrawer();

  // Small delay so drawer close animation finishes cleanly
  setTimeout(() => {
    const offset = parseInt(
      getComputedStyle(document.documentElement)
        .getPropertyValue('--appbar-height') || '64', 10
    );
    const top = target.getBoundingClientRect().top + window.scrollY - offset - 8;
    window.scrollTo({ top, behavior: 'smooth' });
  }, 150);

  // Highlight active nav item
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.target === sectionId);
  });
}

/* Expose globally so inline handlers in content.js can call it */
window.navigateTo = navigateTo;

/* ================================================================
   SCROLL BEHAVIORS
   ── Top bar elevation
   ── Back-to-top FAB
   ── Scroll-reveal
   ================================================================ */

/* IntersectionObserver for scroll-reveal */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

function observeRevealTargets() {
  document.querySelectorAll(
    '.section-inner, .hero-inner, .project-card, .contact-card'
  ).forEach(el => revealObserver.observe(el));
}

/* Scroll listener */
function onScroll() {
  const scrollY = window.scrollY;

  // Top bar elevation
  topAppBar.classList.toggle('scrolled', scrollY > 8);

  // FAB visibility
  const showFab = scrollY > 400;
  if (showFab) {
    fabBtn.style.display = 'flex';
    requestAnimationFrame(() => fabBtn.classList.add('visible'));
  } else {
    fabBtn.classList.remove('visible');
    setTimeout(() => {
      if (!fabBtn.classList.contains('visible')) fabBtn.style.display = 'none';
    }, 200);
  }
}

/* ================================================================
   EVENT LISTENERS
   ================================================================ */
menuBtn.addEventListener('click', toggleDrawer);

if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);

// Scrim click closes drawer
navScrim.addEventListener('click', closeDrawer);

// Theme toggle
themeBtn.addEventListener('click', toggleTheme);

// Nav items in drawer
navDrawer.querySelectorAll('.nav-item[data-target]').forEach(btn => {
  btn.addEventListener('click', () => navigateTo(btn.dataset.target));
});

// Top bar "Projects" tab
document.getElementById('appbar-projects-tab')
  ?.addEventListener('click', () => navigateTo('projects'));

// Hero CTAs wired via data-target
document.querySelectorAll('[data-target]').forEach(el => {
  if (el.tagName === 'MD-FILLED-BUTTON' || el.tagName === 'MD-OUTLINED-BUTTON') {
    el.addEventListener('click', () => navigateTo(el.dataset.target));
  }
});

// Back to top FAB
fabBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Keyboard: Escape closes drawer
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && drawerOpen) closeDrawer();
});

// Scroll events
window.addEventListener('scroll', onScroll, { passive: true });

/* ================================================================
   INIT
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Apply saved theme (no animation on load)
  applyTheme(currentTheme, false);

  // Hide page loader
  setTimeout(() => {
    pageLoader?.classList.add('hidden');
  }, 600);

  // Kick off scroll reveal after content.js populates DOM
  setTimeout(observeRevealTargets, 100);

  // Initial scroll check
  onScroll();
});

// Re-observe after content.js finishes injecting cards
window.addEventListener('content-loaded', observeRevealTargets);
