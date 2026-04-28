/* ================================================================
   content.js — YOUR PROFILE DATA
   ── Edit the PROFILE object below to customise your page.
   ── Do not edit index.html or styles.css for content changes.
   ================================================================ */

'use strict';

/* ================================================================
   ✏️  EDIT THIS OBJECT
   ================================================================ */
const PROFILE = {

  /* ── Identity ─────────────────────────────────────────────── */
  name:   'Your Name',
  role:   'Full-Stack Developer · Designer · Open-Source Contributor',
  bio:    'I craft thoughtful, accessible, and pixel-perfect experiences ' +
          'on the web. Passionate about design systems, developer tooling, ' +
          'and building products that feel genuinely human.',

  /* ── Social links ────────────────────────────────────────── */
  /* icon: any Material Symbols Rounded name                    */
  socials: [
    { label: 'GitHub',   href: 'https://github.com/yourusername',        icon: 'code'         },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/yourprofile',    icon: 'work'         },
    { label: 'Twitter',  href: 'https://twitter.com/yourhandle',         icon: 'alternate_email' },
  ],

  /* ── About paragraphs ────────────────────────────────────── */
  about: [
    'Hi! I\'m a developer with a deep love for clean architecture and ' +
    'beautiful interfaces. I specialise in building full-stack web ' +
    'applications with modern frameworks.',

    'When I\'m not coding you\'ll find me exploring design systems, ' +
    'contributing to open-source projects, or experimenting with ' +
    'emerging web technologies.',

    'I believe great software is the intersection of engineering ' +
    'precision and thoughtful design.',
  ],

  /* ── Skills / Technologies ───────────────────────────────── */
  skills: [
    'HTML', 'CSS', 'JavaScript', 'TypeScript',
    'React', 'Next.js', 'Node.js', 'Express',
    'Python', 'Git', 'Figma', 'Material Design',
  ],

  /* ── Projects ────────────────────────────────────────────── */
  /* icon: any Material Symbols Rounded name (used as card banner) */
  projects: [
    {
      name:    'Project Alpha',
      desc:    'A full-stack web application built with React and Node.js ' +
               'that helps teams manage their workflow more effectively.',
      icon:    'rocket_launch',
      tags:    ['React', 'Node.js', 'MongoDB'],
      github:  'https://github.com/yourusername/project-alpha',
      live:    'https://project-alpha.example.com',
    },
    {
      name:    'Design System',
      desc:    'A comprehensive component library following Material Design 3 ' +
               'principles, fully typed with TypeScript.',
      icon:    'palette',
      tags:    ['TypeScript', 'Storybook', 'CSS'],
      github:  'https://github.com/yourusername/design-system',
      live:    '',
    },
    {
      name:    'CLI Toolkit',
      desc:    'A developer CLI that automates repetitive project setup tasks, ' +
               'saving hours of configuration work.',
      icon:    'terminal',
      tags:    ['Python', 'Click', 'Shell'],
      github:  'https://github.com/yourusername/cli-toolkit',
      live:    '',
    },
    {
      name:    'Open Weather Dashboard',
      desc:    'Real-time weather dashboard with beautiful data visualisations ' +
               'and location-aware forecasting.',
      icon:    'partly_cloudy_day',
      tags:    ['Next.js', 'D3.js', 'API'],
      github:  'https://github.com/yourusername/weather-dash',
      live:    'https://weather.example.com',
    },
    {
      name:    'Markdown Blog Engine',
      desc:    'A blazing-fast static blog engine that compiles Markdown ' +
               'to accessible, SEO-optimised HTML pages.',
      icon:    'article',
      tags:    ['Node.js', 'Markdown', 'SSG'],
      github:  'https://github.com/yourusername/md-blog',
      live:    '',
    },
    {
      name:    'Auth Microservice',
      desc:    'A stateless JWT-based authentication microservice with ' +
               'role-based access control and refresh token rotation.',
      icon:    'lock',
      tags:    ['Node.js', 'JWT', 'PostgreSQL'],
      github:  'https://github.com/yourusername/auth-service',
      live:    '',
    },
  ],

  /* ── Contact cards ────────────────────────────────────────── */
  contact: [
    {
      label: 'Email',
      value: 'you@example.com',
      icon:  'mark_email_read',
      href:  'mailto:you@example.com',
    },
    {
      label: 'GitHub',
      value: '@yourusername',
      icon:  'code',
      href:  'https://github.com/yourusername',
    },
    {
      label: 'LinkedIn',
      value: 'in/yourprofile',
      icon:  'work',
      href:  'https://linkedin.com/in/yourprofile',
    },
    {
      label: 'Twitter / X',
      value: '@yourhandle',
      icon:  'alternate_email',
      href:  'https://twitter.com/yourhandle',
    },
  ],

  /* ── Footer ──────────────────────────────────────────────── */
  footerLinks: [
    { label: 'GitHub', href: 'https://github.com/yourusername' },
    { label: 'Source', href: 'https://github.com/yourusername/yourusername.github.io' },
  ],

};
/* ── End of editable data ──────────────────────────────────── */


/* ================================================================
   DOM INJECTION  — no edits needed below
   ================================================================ */

/** Creates an md-assist-chip */
function makeChip(label) {
  const chip = document.createElement('md-assist-chip');
  chip.setAttribute('label', label);
  chip.setAttribute('role', 'listitem');
  return chip;
}

/* ── Hero ─────────────────────────────────────────────────────── */
function renderHero() {
  // Update <title> and heading
  document.title = `${PROFILE.name}`;
  document.querySelector('meta[name="description"]')
    ?.setAttribute('content', `${PROFILE.name} — ${PROFILE.role}`);

  const heading = document.getElementById('hero-heading');
  if (heading) heading.textContent = PROFILE.name;

  const appBarTitle = document.querySelector('.app-bar-title');
  if (appBarTitle) appBarTitle.textContent = PROFILE.name;

  const avatarImg = document.getElementById('hero-avatar-img');
  if (avatarImg) avatarImg.alt = `Profile photo of ${PROFILE.name}`;

  const roleEl = document.getElementById('hero-role');
  if (roleEl) roleEl.textContent = PROFILE.role;

  const bioEl = document.getElementById('hero-bio');
  if (bioEl) bioEl.textContent = PROFILE.bio;

  // Socials
  const socialsEl = document.getElementById('hero-socials');
  if (socialsEl) {
    PROFILE.socials.forEach(s => {
      const a = document.createElement('a');
      a.className = 'social-btn';
      a.href      = s.href;
      a.target    = '_blank';
      a.rel       = 'noopener noreferrer';
      a.setAttribute('aria-label', s.label);

      const icon = document.createElement('span');
      icon.className = 'material-symbols-rounded';
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = s.icon;

      const label = document.createElement('span');
      label.textContent = s.label;

      const ripple = document.createElement('md-ripple');

      a.append(icon, label, ripple);
      socialsEl.appendChild(a);
    });
  }
}

/* ── Projects ─────────────────────────────────────────────────── */
function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  PROFILE.projects.forEach(project => {
    const article = document.createElement('article');
    article.className = 'project-card';
    article.setAttribute('role', 'listitem');

    // Media banner
    const media = document.createElement('div');
    media.className = 'card-media';
    const bannerIcon = document.createElement('span');
    bannerIcon.className = 'material-symbols-rounded';
    bannerIcon.setAttribute('aria-hidden', 'true');
    bannerIcon.textContent = project.icon;
    media.appendChild(bannerIcon);

    // Content
    const content = document.createElement('div');
    content.className = 'card-content';

    const title = document.createElement('h3');
    title.className = 'card-title md-typescale-title-medium';
    title.textContent = project.name;

    const desc = document.createElement('p');
    desc.className = 'card-desc md-typescale-body-medium';
    desc.textContent = project.desc;

    const chips = document.createElement('div');
    chips.className = 'card-chips';
    project.tags.forEach(tag => {
      const chip = document.createElement('md-assist-chip');
      chip.setAttribute('label', tag);
      chips.appendChild(chip);
    });

    content.append(title, desc, chips);

    // Actions
    const actions = document.createElement('div');
    actions.className = 'card-actions';

    if (project.github) {
      const ghBtn = document.createElement('md-text-button');
      ghBtn.setAttribute('href', project.github);
      ghBtn.setAttribute('target', '_blank');
      ghBtn.setAttribute('rel', 'noopener noreferrer');
      const ghIcon = document.createElement('md-icon');
      ghIcon.setAttribute('slot', 'icon');
      ghIcon.textContent = 'code';
      ghBtn.append(ghIcon, 'GitHub');
      actions.appendChild(ghBtn);
    }

    if (project.live) {
      const liveBtn = document.createElement('md-filled-tonal-button');
      liveBtn.setAttribute('href', project.live);
      liveBtn.setAttribute('target', '_blank');
      liveBtn.setAttribute('rel', 'noopener noreferrer');
      const liveIcon = document.createElement('md-icon');
      liveIcon.setAttribute('slot', 'icon');
      liveIcon.textContent = 'open_in_new';
      liveBtn.append(liveIcon, 'Live');
      actions.appendChild(liveBtn);
    }

    article.append(media, content, actions);
    grid.appendChild(article);
  });
}

/* ── About ────────────────────────────────────────────────────── */
function renderAbout() {
  const textEl = document.getElementById('about-text');
  if (textEl) {
    PROFILE.about.forEach(para => {
      const p = document.createElement('p');
      p.className = 'md-typescale-body-large';
      p.textContent = para;
      textEl.appendChild(p);
    });
  }

  const skillsEl = document.getElementById('skills-chips');
  if (skillsEl) {
    PROFILE.skills.forEach(skill => {
      const chip = makeChip(skill);
      chip.setAttribute('role', 'listitem');
      skillsEl.appendChild(chip);
    });
  }
}

/* ── Contact ──────────────────────────────────────────────────── */
function renderContact() {
  const grid = document.getElementById('contact-grid');
  if (!grid) return;

  PROFILE.contact.forEach(item => {
    const a = document.createElement('a');
    a.className = 'contact-card';
    a.href      = item.href;
    a.target    = '_blank';
    a.rel       = 'noopener noreferrer';
    a.setAttribute('aria-label', `${item.label}: ${item.value}`);

    const iconWrap = document.createElement('div');
    iconWrap.className = 'contact-card-icon';
    const icon = document.createElement('span');
    icon.className = 'material-symbols-rounded';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = item.icon;
    iconWrap.appendChild(icon);

    const labelEl = document.createElement('span');
    labelEl.className = 'contact-card-label md-typescale-label-medium';
    labelEl.textContent = item.label;

    const valueEl = document.createElement('span');
    valueEl.className = 'contact-card-value md-typescale-body-medium';
    valueEl.textContent = item.value;

    const ripple = document.createElement('md-ripple');

    a.append(iconWrap, labelEl, valueEl, ripple);
    grid.appendChild(a);
  });
}

/* ── Footer ───────────────────────────────────────────────────── */
function renderFooter() {
  const copy = document.getElementById('footer-copy');
  if (copy) {
    copy.textContent =
      `© ${new Date().getFullYear()} ${PROFILE.name} · Built with Material Design 3`;
  }

  const links = document.getElementById('footer-links');
  if (links) {
    PROFILE.footerLinks.forEach(link => {
      const a = document.createElement('a');
      a.className = 'footer-link md-typescale-label-small';
      a.href      = link.href;
      a.target    = '_blank';
      a.rel       = 'noopener noreferrer';
      a.textContent = link.label;

      const ripple = document.createElement('md-ripple');
      a.appendChild(ripple);
      links.appendChild(a);
    });
  }
}

/* ── Run all renderers ────────────────────────────────────────── */
function init() {
  renderHero();
  renderProjects();
  renderAbout();
  renderContact();
  renderFooter();

  // Tell main.js content is in the DOM so it can observe for reveal
  window.dispatchEvent(new Event('content-loaded'));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
