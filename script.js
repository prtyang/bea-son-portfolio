
'use strict';

const app = document.getElementById('app');

const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}[c]));

const path = v => '#/' + v.replace(/^\/+/, '');

const icon = (v = '↗') =>
  `<span aria-hidden="true">${v}</span>`;

const heading = (a, b, c, center = false) =>
  `<div class="section-head ${center ? 'center' : ''}">
    <span class="eyebrow">${esc(a)}</span>
    <h2>${esc(b)}</h2>
    ${c ? `<p>${esc(c)}</p>` : ''}
  </div>`;

const tags = arr =>
  `<div class="tag-row">
    ${(arr || []).map(t =>
      `<span class="tag">${esc(t)}</span>`
    ).join('')}
  </div>`;

const placeholder = (label, wide = false) =>
  `<div class="placeholder ${wide ? 'wide' : ''}">
    <div class="placeholder-icon">▧</div>
    <span>${esc(label)}</span>
    <small>Add original image in content.js</small>
  </div>`;


/* =========================================
   SOCIAL MEDIA LINKS AND ICONS
   ========================================= */

   const socialIcons = {
    Facebook: "f",
    Instagram: "◎",
    TikTok: "♪",
    LinkedIn: "in"
  };
  
  const social = () => `
    <div class="social-row">
      ${profile.socials
        .filter(item => item.url)
        .map(item => `
          <a
            href="${esc(item.url)}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="${esc(item.name)}"
            title="${esc(item.name)}"
          >
            <span aria-hidden="true">
              ${esc(socialIcons[item.name] || "↗")}
            </span>
          </a>
        `).join("")}
  
      ${profile.email ? `
        <a
          href="mailto:${esc(profile.email)}"
          aria-label="Email"
          title="Email"
        >
          <span aria-hidden="true">✉</span>
        </a>
      ` : ""}
    </div>
  `;


/* =========================================
   PROJECT CARDS - FIXED LINKS
   ========================================= */

const card = item => {

  // Determine whether this is creative work
  const isCreative = creativeWorks.some(
    work => work.id === item.id
  );

  // Generate the correct project link
  const projectLink = path(
    (isCreative ? 'creative/' : 'projects/') + item.id
  );

  return `
    <article class="project-card">

      <a
        href="${projectLink}"
        class="project-visual"
        aria-label="View ${esc(item.title)}"
      >

        ${item.images?.[0]
          ? `
            <img
              src="${esc(item.images[0])}"
              alt="${esc(item.title)}"
              loading="lazy"
            >
          `
          : placeholder(item.title)
        }

        <span class="project-arrow">↗</span>

      </a>

      <div class="project-body">

        <span class="mini-tag">
          ${esc(item.tag || item.category)}
        </span>

        <h3>${esc(item.title)}</h3>

        <p>${esc(item.summary)}</p>

        ${tags((item.tools || []).slice(0, 4))}

        <a
          class="inline-link"
          href="${projectLink}"
        >
          View Project →
        </a>

      </div>

    </article>
  `;
};


const cards = arr =>
  `<div class="project-grid">${arr.map(card).join('')}</div>`;

const gallery = (images = [], label = 'Project screenshot', placeholders = 1) =>
  `<div class="image-grid">
    ${images.length ?
      images.map((img, i) =>
        `<button class="thumb"
                 type="button"
                 data-gallery="${esc(encodeURIComponent(JSON.stringify(images)))}"
                 data-index="${i}"
                 aria-label="Preview ${esc(label)} ${i + 1}">
          <img src="${esc(img)}"
               alt="${esc(label)} ${i + 1}"
               loading="lazy">
          <span class="thumb-action">＋ Enlarge</span>
        </button>`
      ).join('') :
      Array.from({ length: placeholders }, () =>
        placeholder(label)
      ).join('')}
  </div>`;

const nav = [
  ['#/', 'Home'],
  ['#/about', 'About'],
  ['#/projects', 'UI/UX, Web Development Projects'],
  ['#/creative', 'Creative Works'],
  ['#/contact', 'Contact']
];

// Decorative accents stay behind the page and never receive pointer events.
const ambientBackground = () => `
  <div class="ambient-background" aria-hidden="true">
    <div class="ambient-scene">
    <div class="ambient-orb ambient-orb-one"></div>
    <div class="ambient-orb ambient-orb-two"></div>
    <div class="ambient-orb ambient-orb-three"></div>
    <svg class="ambient-accent ambient-heart" viewBox="0 0 48 48" fill="none">
      <path d="M24 39S6 28 6 16a10 10 0 0 1 18-6 10 10 0 0 1 18 6c0 12-18 23-18 23Z"/>
    </svg>
    <svg class="ambient-accent ambient-sparkle" viewBox="0 0 48 48" fill="none">
      <path d="m24 5 5 14 14 5-14 5-5 14-5-14-14-5 14-5Z"/>
    </svg>
    <svg class="ambient-accent ambient-ring" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="18"/>
    </svg>
    <svg class="ambient-accent ambient-star" viewBox="0 0 48 48" fill="none">
      <path d="m24 6 5 12 13 1-10 9 3 13-11-7-11 7 3-13-10-9 13-1Z"/>
    </svg>
    ${Array.from({ length: 6 }, (_, i) =>
      `<span class="ambient-particle ambient-particle-${i}"></span>`
    ).join('')}
    <div class="ambient-dots"></div>
    </div>
  </div>`;

// Solid section backgrounds need their own decorative layer. Content is never wrapped.
function initSectionAtmosphere() {
  document.querySelectorAll('.section-tinted, .contact-new').forEach(section => {
    section.classList.add('atmosphere-host');
    section.insertAdjacentHTML('afterbegin', `
      <div class="section-atmosphere" aria-hidden="true">
        <div class="section-atmosphere-scene">
          <div class="section-orb section-orb-one"></div>
          <div class="section-orb section-orb-two"></div>
          <div class="section-dots"></div>
          <svg class="section-sparkle" viewBox="0 0 48 48" fill="none">
            <path d="m24 5 5 14 14 5-14 5-5 14-5-14-14-5 14-5Z"/>
          </svg>
          <svg class="section-curve" viewBox="0 0 180 80" fill="none">
            <path d="M-10 62C25 62 15 8 56 12s28 59 64 43 22-47 70-38"/>
          </svg>
        </div>
      </div>`);
  });
}

const shell = (html, active) =>
  `${ambientBackground()}
  <header class="nav-shell">
    <nav class="nav container" aria-label="Main navigation">
      <a class="brand" href="#/">
        Bea Son<span class="brand-dot">.</span>
      </a>

      <div class="nav-links" id="nav-links">
        ${nav.map(([href, label]) =>
          `<a class="${href === active ? 'active' : ''}"
              ${href === active ? 'aria-current="page"' : ''}
              href="${href}">${label}</a>`
        ).join('')}
      </div>

      <a class="btn btn-primary nav-cta" href="#/contact">
        Let's Work Together ↗
      </a>

      <button class="mobile-toggle"
              type="button"
              aria-label="Open menu"
              aria-controls="nav-links"
              aria-expanded="false"
              id="menu-toggle">☰</button>
    </nav>
  </header>

  ${html}

  <footer class="footer">
    <div class="container footer-inner">
      <div>
        <a class="brand" href="#/">
          Bea Son<span class="brand-dot">.</span>
        </a>
        <p>Designing with purpose, creating with passion.</p>
      </div>

      <div class="footer-links">
        <a href="#/projects">Projects</a>
        <a href="#/creative">Creative Works</a>
        <a href="#/contact">Contact</a>
      </div>

      <small>
        © ${new Date().getFullYear()} Bea Son.
        All rights reserved.
      </small>

      <button class="motion-toggle" type="button" id="motion-toggle"
              aria-pressed="false">Pause animations</button>
    </div>
  </footer>

  <div id="lightbox-root"></div>`;

const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const desktopPointer = window.matchMedia('(min-width: 761px) and (hover: hover) and (pointer: fine)');
let ambientPointerFrame = 0;
let ambientPointerX = 0;
let ambientPointerY = 0;
let heroHoverCard = null;
let heroHoverBounds = null;
let heroTiltX = 0;
let heroTiltY = 0;

function resetHeroTilt() {
  heroHoverCard?.style.removeProperty('--tilt-x');
  heroHoverCard?.style.removeProperty('--tilt-y');
  heroHoverCard = null;
  heroHoverBounds = null;
}
let motionPaused = false;
try {
  motionPaused = localStorage.getItem('bea-motion-paused') === 'true';
} catch (_) {
  // Motion controls also work when browser storage is unavailable.
}

function resetAmbientPointer() {
  cancelAnimationFrame(ambientPointerFrame);
  ambientPointerFrame = 0;
  app.style.removeProperty('--ambient-x');
  app.style.removeProperty('--ambient-y');
  resetHeroTilt();
}

// Update once per pointer frame; CSS handles the easing. Touch devices stay still.
window.addEventListener('pointermove', event => {
  if (!desktopPointer.matches || motionPreference.matches || motionPaused ||
      document.hidden || event.pointerType !== 'mouse' || lightbox) return;

  ambientPointerX = (event.clientX / window.innerWidth - .5) * 20;
  ambientPointerY = (event.clientY / window.innerHeight - .5) * 14;
  const card = event.target.closest?.('.floating-expertise') || null;
  if (card !== heroHoverCard) {
    resetHeroTilt();
    heroHoverCard = card;
    // Cache the bounds on entry, rather than reading layout on every frame.
    heroHoverBounds = card?.getBoundingClientRect();
  }
  if (heroHoverBounds) {
    const x = Math.max(-1, Math.min(1, (event.clientX - heroHoverBounds.left) / heroHoverBounds.width * 2 - 1));
    const y = Math.max(-1, Math.min(1, (event.clientY - heroHoverBounds.top) / heroHoverBounds.height * 2 - 1));
    heroTiltX = -y * 4;
    heroTiltY = x * 5;
  }
  if (ambientPointerFrame) return;

  ambientPointerFrame = requestAnimationFrame(() => {
    app.style.setProperty('--ambient-x', `${ambientPointerX.toFixed(2)}px`);
    app.style.setProperty('--ambient-y', `${ambientPointerY.toFixed(2)}px`);
    heroHoverCard?.style.setProperty('--tilt-x', `${heroTiltX.toFixed(2)}deg`);
    heroHoverCard?.style.setProperty('--tilt-y', `${heroTiltY.toFixed(2)}deg`);
    ambientPointerFrame = 0;
  });
}, { passive: true });

window.addEventListener('pointerout', event => {
  if (!event.relatedTarget) resetAmbientPointer();
});
window.addEventListener('blur', resetAmbientPointer);
window.addEventListener('resize', resetAmbientPointer, { passive: true });
window.addEventListener('scroll', resetHeroTilt, { passive: true });
desktopPointer.addEventListener('change', resetAmbientPointer);

function syncMotionPreference() {
  document.documentElement.classList.toggle('motion-paused', motionPaused);
  const button = document.getElementById('motion-toggle');
  if (button) {
    button.disabled = motionPreference.matches;
    button.setAttribute('aria-pressed', String(motionPaused || motionPreference.matches));
    button.textContent = motionPreference.matches ? 'Animations off' :
      motionPaused ? 'Resume animations' : 'Pause animations';
    button.title = motionPreference.matches ? 'Your device is set to reduce motion' : '';
  }
  if (motionPaused || motionPreference.matches) {
    resetAmbientPointer();
    document.querySelectorAll('.scroll-reveal').forEach(element => {
      element.classList.add('is-visible');
    });
    scrollRevealObserver?.disconnect();
  }
}

motionPreference.addEventListener('change', syncMotionPreference);
document.addEventListener('visibilitychange', () => {
  document.documentElement.classList.toggle('motion-idle', document.hidden);
  if (document.hidden) resetAmbientPointer();
});

const steps = [
  ['01', 'Discover', 'Understanding goals, users, and project requirements.'],
  ['02', 'Research', 'Exploring ideas, references, and possible solutions.'],
  ['03', 'Design', 'Creating wireframes, prototypes, and visual layouts.'],
  ['04', 'Develop', 'Turning designs into functional digital experiences.'],
  ['05', 'Refine', 'Testing, improving, and polishing the final result.']
];

// =========================================
// HOME PAGE
// =========================================

function home() {
  return `
    <div class="home-intro">
    <section class="hero container" id="home">

      <div class="hero-copy">
        <span class="eyebrow">
          <span class="tiny-star">✳</span>
          DESIGN • DEVELOP • CREATE
        </span>

        <h1>
          Hi, I'm
          <em>
            Bea Son<span class="hero-heart">♡</span>
          </em>
        </h1>

        <div class="hero-role">
          UI/UX Designer
          <span>·</span>
          Web Developer<br>
          &amp; Social Media Creative
        </div>

        <p>
          I design, build, and create digital experiences
          that are user-friendly, visually appealing,
          and meaningful for brands and businesses.
        </p>

        <div class="hero-actions">
          <a href="#/projects" class="btn btn-primary">
            View My Work ↗
          </a>

          <a href="cv/Son, Bea - CV.pdf"
            class="btn btn-outline"
            download="Bea-Son-CV.pdf"
            >
             Download CV ↓
          </a>
        </div>

        ${social()}

        <span class="handwritten hero-note">
          creating with heart ♡
        </span>
      </div>

      <div class="hero-art">
        <div class="hero-decorations" aria-hidden="true">
          <div class="hero-halo"></div>
          <div class="hero-orbit"><span></span><span></span></div>
          <div class="hero-decoration-scene">
            <svg class="hero-spark hero-spark-one" viewBox="0 0 48 48" fill="none"><path d="M24 3 29 19 45 24 29 29 24 45 19 29 3 24 19 19Z"/></svg>
            <svg class="hero-spark hero-spark-two" viewBox="0 0 48 48" fill="none"><path d="M24 3 29 19 45 24 29 29 24 45 19 29 3 24 19 19Z"/></svg>
            <svg class="hero-spark hero-spark-three" viewBox="0 0 48 48" fill="none"><path d="M24 3 29 19 45 24 29 29 24 45 19 29 3 24 19 19Z"/></svg>
            <svg class="hero-mini-heart hero-mini-heart-one" viewBox="0 0 48 48" fill="none"><path d="M24 40C18 35 5 26 5 16a10 10 0 0 1 19-4 10 10 0 0 1 19 4c0 10-13 19-19 24Z"/></svg>
            <svg class="hero-mini-heart hero-mini-heart-two" viewBox="0 0 48 48" fill="none"><path d="M24 40C18 35 5 26 5 16a10 10 0 0 1 19-4 10 10 0 0 1 19 4c0 10-13 19-19 24Z"/></svg>
            <svg class="hero-curve" viewBox="0 0 120 60" fill="none"><path d="M4 42C30 2 83 10 77 32S40 48 57 24 100 8 116 24"/></svg>
            <i class="hero-glint hero-glint-one"></i><i class="hero-glint hero-glint-two"></i><i class="hero-glint hero-glint-three"></i>
          </div>
        </div>
        <div class="organic-shape">

          <!-- HOME PROFILE PICTURE -->
          <img
            src="images/bea-profile.webp"
            alt="Bea Son Profile Picture"
            class="hero-profile-image"
            width="794" height="794" fetchpriority="high" decoding="async"
          >

        </div>

        <span class="floating-heart" aria-hidden="true">♡</span>
     

        ${[
            ['UI/UX Design', 'From ideas to interfaces', 'design'],
            ['Web Development', 'Designs that work', 'code'],
            ['Social Media Content', 'Visuals that connect', 'media'],
            ['Problem Solving', 'Turning ideas into solutions', 'idea']
          
          ].map(([title, subtitle, type], i) => {
          
            const icons = {
          
              // UI/UX DESIGN - PEN
              design: `
                <path d="M12 19l7-7 3 3-7 7-4 1z"/>
                <path d="M18 13l3 3"/>
                <path d="M2 7h10"/>
                <path d="M2 12h6"/>
              `,
          
              // WEB DEVELOPMENT - CODE
              code: `
                <polyline points="8 17 3 12 8 7"/>
                <polyline points="16 7 21 12 16 17"/>
                <line x1="14" y1="4" x2="10" y2="20"/>
              `,
          
              // SOCIAL MEDIA - MEGAPHONE
              media: `
                <path d="M3 11v2a2 2 0 0 0 2 2h3l3 5h3l-3-6"/>
                <path d="M8 10l12-5v14L8 14z"/>
              `,
          
              // PROBLEM SOLVING - LIGHTBULB
              idea: `
                <path d="M9 18h6"/>
                <path d="M10 22h4"/>
                <path d="M9 14a6 6 0 1 1 6 0c-1 1-1 2-1 3h-4c0-1 0-2-1-3z"/>
              `
            };
          
            return `
              <div class="floating-expertise floating-${i}">
          
                <span class="expertise-icon">
          
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    ${icons[type]}
                  </svg>
          
                </span>
          
                <div>
                  <strong>${title}</strong>
                  <small>${subtitle}</small>
                </div>
          
              </div>
            `;
          
          }).join('')}
          

      </div>
    </section>

    <div class="ribbon">
      <div class="container ribbon-inner">
        <span>Thoughtful interfaces</span>
        <span>✳</span>
        <span>Visual storytelling</span>
        <span>✳</span>
        <span>Creative solutions</span>
        <span>✳</span>
        <span>Made with purpose</span>
      </div>
    </div>
    </div>

    <section class="section container about" id="about">
      <div class="about-layout">
        <div>
          ${heading(
            'ABOUT ME',
            'More Than Just Design',
            'A Creative Mind Who Builds'
          )}

          <p>
            I'm Bea Son, a Bachelor of Science in Information
            Technology student with a passion for UI/UX design,
            web development, and digital creativity.
          </p>

          <p>
            I enjoy turning ideas into meaningful digital
            experiences by combining creative design with
            technical problem-solving.
          </p>

          <p>
            From planning user flows and creating wireframes
            to developing functional websites and designing
            social media content, I love exploring different
            ways to bring ideas to life.
          </p>

          <p>
            My goal is to create visually appealing,
            user-friendly, and purposeful designs while
            continuously improving my skills in technology
            and creativity.
          </p>
        </div>

        <div class="about-aside">
          <span class="handwritten">
            a little about what I do
          </span>

          <h3>
            Design with empathy.<br>
            <em>Build with intention.</em>
          </h3>

          <span class="about-asterisk">✳</span>

          <p>
            Blending creativity, structure,
            and practical technology.
          </p>
        </div>
      </div>

      <div class="skills-block">
        <h3>What I bring to the table</h3>

        <div class="tag-row tags-large">
          ${skills.map(s =>
            `<span class="tag">${esc(s)}</span>`
          ).join('')}
        </div>

        <h3>Tools I use</h3>

        <div class="tool-grid">
          ${tools.map(t =>
            `<div class="tool-tile">
              <span class="tool-symbol">
                ${esc(t.slice(0, 2).toUpperCase())}
              </span>
              ${esc(t)}
            </div>`
          ).join('')}
        </div>
      </div>

      
<!-- =========================================
     ABOUT ME - EXPERTISE CARDS
     ========================================= -->

<div class="expertise-grid">

  ${[
    {
      title: 'UI/UX Design',
      icon: '<path d="M12 19l7-7 3 3-7 7-4 1z"/><path d="M18 13l3 3"/><path d="M2 7h10"/><path d="M2 12h6"/>'
    },
    {
      title: 'Web Development',
      icon: '<polyline points="8 17 3 12 8 7"/><polyline points="16 7 21 12 16 17"/><line x1="14" y1="4" x2="10" y2="20"/>'
    },
    {
      title: 'Graphic Design',
      icon: '<circle cx="12" cy="12" r="9"/><circle cx="7.5" cy="10" r="1"/><circle cx="12" cy="7" r="1"/><circle cx="17" cy="10" r="1"/><path d="M12 21a3 3 0 0 0 3-3 2 2 0 0 0-2-2h-1"/>'
    },
    {
      title: 'Video Editing',
      icon: '<rect x="3" y="5" width="13" height="14" rx="2"/><path d="m16 10 5-3v10l-5-3z"/>'
    },
    {
      title: 'Social Media',
      icon: '<path d="M3 11v2a2 2 0 0 0 2 2h3l3 5h3l-3-6"/><path d="M8 10l12-5v14L8 14z"/>'
    }
  ].map(item => `
    <div class="expertise-card">

      <span class="about-expertise-icon">
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          ${item.icon}
        </svg>
      </span>

      <strong>${item.title}</strong>

    </div>
  `).join('')}

</div>

    </section>

    <section class="section section-tinted">
      <div class="container">
        <div class="section-title-row">
          ${heading(
            'FEATURED WORK',
            'Selected Works',
            'A Collection of Ideas Brought to Life'
          )}

          <a href="#/projects" class="inline-link">
            All projects ↗
          </a>
        </div>

        ${cards(projects)}

      <!-- ======================================
           DIVIDER - CREATIVE WORKS
           ====================================== -->

      <div class="home-creative-divider"></div>

      <!-- ======================================
           CREATIVE WORKS SECTION
           ====================================== -->

      <div class="section-title-row creative-heading">

        ${heading(
          'CREATIVE PORTFOLIO',
          'Creative Works',
          'Social Media Designs, Product Showcases & Visual Content'
        )}

        <a href="#/creative" class="inline-link">
          View All Creative Works ↗
        </a>

      </div>

      

${cards(creativeWorks)}


      </div>
    </section>

    <section class="section container">
      ${heading(
        'HOW I WORK',
        'My Creative Process',
        'From Ideas to Meaningful Experiences',
        true
      )}

      <div class="steps">
        ${steps.map(([n, a, b]) =>
          `<div class="step">
            <span>${n}</span>
            <h3>${a}</h3>
            <p>${b}</p>
          </div>`
        ).join('')}
      </div>
    </section>

    <section class="section section-tinted">
      <div class="container">
        ${heading(
          'SERVICES',
          'What I Can Do',
          'Creative and Digital Services'
        )}

        <div class="services-grid">
          ${services.map((s, i) =>
            `<article class="service-card">
              <span class="service-index">0${i + 1}</span>
              <h3>${esc(s.name)}</h3>
              <p>${esc(s.desc)}</p>

              <ul>
                ${s.items.map(v =>
                  `<li>✓ ${esc(v)}</li>`
                ).join('')}
              </ul>

              <a class="inline-link" href="#/contact">
                Let's talk ↗
              </a>
            </article>`
          ).join('')}
        </div>
      </div>
    </section>

    ${contactSection()}
  `;
}

// =========================================
// CONTACT SECTION
// =========================================


/* =========================================
   CONTACT SECTION - CLIENT INQUIRIES
   ========================================= */

   function contactSection() {

    const email = profile.email || '';
  
    const phone = profile.phone || '';
  
    const emailLink = email
      ? `mailto:${email}?subject=${encodeURIComponent('Portfolio Project Inquiry')}`
      : '';
  
    const phoneLink = phone
      ? `tel:${phone.replace(/[^\d+]/g, '')}`
      : '';
  
    return `
      <section class="section contact-new" id="contact">
  
        <div class="container contact-new-layout">
  
          <!-- LEFT SIDE -->
  
          <div class="contact-new-info">
  
            <span class="eyebrow">
              LET'S CONNECT
            </span>
  
            <h2>
              Have a Project
              <em>in Mind?</em>
            </h2>
  
            <p class="contact-new-description">
              I'm open to freelance opportunities,
              creative collaborations, and exciting
              digital projects. Whether you need
              UI/UX design, web development, or
              creative content, let's bring your
              ideas to life.
            </p>
  
            <div class="contact-availability">
              <span class="availability-dot"></span>
              Open to Freelance & Collaborations
            </div>
  
          </div>
  
          <!-- RIGHT SIDE -->
  
          <div class="contact-new-card">
  
            <h3>Let's Work Together</h3>
  
            <p class="contact-card-intro">
              Have something in mind?
              Feel free to reach out!
            </p>
  
            ${email ? `
              <a
                href="${esc(emailLink)}"
                class="contact-method"
              >
                <span class="contact-method-icon">
                  ✉
                </span>
  
                <span class="contact-method-text">
                  <strong>Email Me</strong>
                  <small>${esc(email)}</small>
                </span>
  
                <span class="contact-method-arrow">↗</span>
              </a>
            ` : ''}
  
            ${phone ? `
              <a
                href="${esc(phoneLink)}"
                class="contact-method"
              >
                <span class="contact-method-icon">
                  ☎
                </span>
  
                <span class="contact-method-text">
                  <strong>Call Me</strong>
                  <small>${esc(phone)}</small>
                </span>
  
                <span class="contact-method-arrow">↗</span>
              </a>
            ` : ''}
  
            ${email ? `
              <a
                href="${esc(emailLink)}"
                class="btn btn-primary contact-main-btn"
              >
                Send Me an Email ↗
              </a>
            ` : ''}
  
            <p class="contact-bottom-note">
              Let's create something meaningful together.
            </p>
  
          </div>
  
        </div>
  
      </section>
    `;
  }
  

// =========================================
// PROJECT FILTERS
// =========================================

function filters(categories) {
  return `
    <div class="filter-row"
         role="group"
         aria-label="Project category filters">
      ${categories.map((c, i) =>
        `<button type="button"
                 class="filter ${i === 0 ? 'selected' : ''}"
                 aria-pressed="${i === 0}"
                 data-filter="${esc(c)}">
          ${esc(c)}
        </button>`
      ).join('')}
    </div>
  `;
}

function listing(type) {
  const info = {
    projects: [
      'THE PORTFOLIO',
      'From Concept to Creation',
      'A Collection of Ideas Brought to Life',
      projects,
      ['All Projects', 'UI/UX Design', 'Web Development',]
    ],
    activities: [
      'DESIGN NOTEBOOK',
      'Designing Experiences, One Screen at a Time',
      'My UI/UX Projects & Design Activities',
      activities,
      ['All Activities', 'Website UI Design', 'Mobile App UI',
       'Wireframes', 'Figma Prototypes', 'User Flows',
       'Dashboard Design', 'Redesign Concepts',
       'Academic Activities']
    ],
    creative: [
      'CREATIVE PORTFOLIO',
      'Creativity Beyond the Screen',
      'Social Media, Graphics & Creative Content',
      creativeWorks,
      ['All Creative Works', 'Social Media Posts',
       'Carousel Designs','Video Editing']
    ]
  }[type];

  return `
    <main class="page container">
      ${heading(...info.slice(0, 3))}
      ${filters(info[4])}

      <div id="filtered-projects">
        ${cards(info[3])}
      </div>
    </main>
  `;
}

// =========================================
// FOREVER CASE STUDY
// =========================================

function foreverPage() {
  return `
    <main class="case-study">
      <div class="container">
        <a class="back-link" href="#/projects">← All projects</a>

        <div class="case-intro">
          <span class="eyebrow">
            FEATURED CASE STUDY • ACADEMIC PROJECT
          </span>
          <h1>FOREVER<span>.</span></h1>
          <p>From a first idea to a thoughtful digital experience.</p>
          ${tags(['UI/UX Design', 'System Analysis', 'Web Development'])}
        </div>

        ${gallery(
          ['images/forever/front.png'],
          'FOREVER Website Preview'
        )}

        <div class="case-overview">
          <div>
            <span class="eyebrow">THE PROJECT</span>
            <h2>Project Overview</h2>
            <p>${esc(forever.overview)}</p>
            <p class="quiet-note">
              Verify the final feature scope, target users,
              objectives, technologies, and project responsibilities
              before publishing.
            </p>
          </div>

          <div class="role-card">
            <h3>My contributions</h3>
            ${tags(forever.role)}
          </div>
        </div>

        ${heading(
          'BEHIND THE SCREENS',
          'The Design & Development Journey',
          'Documentation and screenshots are the foundation of this case study.'
        )}

        <div class="case-sections">
          ${forever.sections.map((s, i) =>
            `<section class="case-section" id="${esc(s.id)}">
              <div class="case-section-title">
                <span class="case-number">${esc(s.num)} / 07</span>
                <span class="eyebrow">${esc(s.subtitle)}</span>
                <h2>${esc(s.title)}</h2>
                <p>${esc(s.description)}</p>
              </div>
          
        ${s.images?.length
          ? gallery(s.images, s.title + ' screenshot')
          : ''}

      ${s.github ? `
       <a
        href="${esc(s.github)}"
        class="btn btn-primary github-button"
        target="_blank"
        rel="noopener noreferrer"
      >
     View Source Code on GitHub ↗
  </a>
  ` : ''}

            </section>`
          ).join('')}
        </div>

        <div class="reflection">
          <span class="eyebrow">LOOKING BACK</span>
          <h2>What I Learned</h2>
           <p>
              The FOREVER capstone project strengthened my
              skills in UI/UX design, wireframing, system
              analysis, and website development. I learned
              how to transform ideas into functional,
              user-friendly interfaces using Figma and
              apply system planning through Data Flow Diagrams.

              This experience also improved my problem-solving,
              teamwork, and understanding of how design
              and technology work together to create
              meaningful digital experiences.
            </p>
        </div>

        <a class="btn btn-primary" href="#/projects">
          Explore More Projects ↗
        </a>
      </div>
    </main>
  `;
}

// =========================================
// INDIVIDUAL PROJECT PAGE
// =========================================

function detail(id) {
  const p = [...projects, ...activities, ...creativeWorks]
    .find(x => x.id === id);

  if (!p) {
    return `
      <main class="page container">
        ${heading('NOT FOUND', 'Project not found')}
        <a class="btn btn-primary" href="#/projects">
          Back to projects
        </a>
      </main>
    `;
  }

  if (id === 'forever') return foreverPage();

  return `
    <main class="page container">
      <a class="back-link" href="#/projects">← Back to projects</a>

      ${heading(p.category, p.title, p.summary)}
      ${tags(p.tools)}

      <div class="detail-gallery">
        ${gallery(p.images, p.title + ' image', 2)}
<!-- =========================================
CLICKABLE CANVA VIDEO LINKS
========================================= -->

${p.videoLinks?.length ? `
<div class="video-portfolio-links">

<h2>Watch My Video Projects</h2>

<div class="video-link-grid">
 ${p.videoLinks.map(video => `
   <div class="video-link-card">

     <h3>${esc(video.title)}</h3>

     <a
       href="${esc(video.url)}"
       target="_blank"
       rel="noopener noreferrer"
       class="btn btn-primary"
     >
       Watch Video ↗
     </a>

   </div>
 `).join('')}
</div>

</div>
` : ''}

      </div>

      <div class="detail-copy">
        <h2>About this project</h2>
        
<p>
  ${esc(p.draft
    ? 'Project details coming soon.'
    : (p.about || p.summary)
  )}
</p>


        ${p.objective ?
          `<p><strong>Design objective:</strong>
          ${esc(p.objective)}</p>` : ''}
      </div>
    </main>
  `;
}


/* =========================================
   SCROLL REVEAL ANIMATION SYSTEM
   ========================================= */

   let scrollRevealObserver = null;

   function initScrollAnimations(root = document, reset = false) {
   
     // Elements that animate while scrolling
     const selectors = [
       '.section-head',
       '.about-layout > *',
       '.skills-block > h3',
       '.tool-grid',
       '.expertise-card',
       '.project-card',
       '.step',
       '.service-card',
       '.case-overview > *',
       '.case-section',
       '.image-grid > .thumb',
       '.organic-shape',
       '.detail-copy',
       '.contact-new-info',
       '.contact-new-card'
     ].join(', ');
   
     if (reset && scrollRevealObserver) {
       scrollRevealObserver.disconnect();
       scrollRevealObserver = null;
     }
   
     const elements = root.querySelectorAll(selectors);
   
     // Respect reduced-motion settings
     if (
       motionPreference.matches || motionPaused ||
       !('IntersectionObserver' in window)
     ) {
       elements.forEach(element => {
         element.classList.add('scroll-reveal', 'is-visible');
       });
       return;
     }
   
     if (!scrollRevealObserver) {
       scrollRevealObserver = new IntersectionObserver(
         (entries, observer) => {
           entries.forEach(entry => {
             if (entry.isIntersecting) {
               entry.target.classList.add('is-visible');
               observer.unobserve(entry.target);
             }
           });
         },
         {
           threshold: 0.08,
           rootMargin: '0px 0px -30px 0px'
         }
       );
     }
   
     elements.forEach(element => {
   
       if (element.classList.contains('scroll-reveal')) {
         return;
       }
   
       element.classList.add('scroll-reveal');
   
       // Stagger cards for a smooth cascading effect
       if (
         element.matches(
           '.project-card, .expertise-card, .step, .service-card, .thumb'
         )
       ) {
         const siblings = [...element.parentElement.children].filter(sibling =>
           sibling.matches('.project-card, .expertise-card, .step, .service-card, .thumb')
         );
         element.style.setProperty(
           '--reveal-delay',
           `${(siblings.indexOf(element) % 3) * 90}ms`
         );
       }
   
       scrollRevealObserver.observe(element);
     });
   }
   
// =========================================
// PAGE ROUTING AND INTERACTIONS
// =========================================

function route() {
  const segments = (location.hash || '#/')
    .replace(/^#\/?/, '')
    .split('/')
    .filter(Boolean);

  const page = segments[0] || 'home';

  let inner;


/* =========================================
   WEBSITE PAGE ROUTING
   ========================================= */

// HOME, ABOUT AND CONTACT
if (
  page === 'home' ||
  page === 'about' ||
  page === 'contact'
) {

  inner = home();

}

// PROJECT AND CREATIVE WORK DETAIL PAGES
else if (
  (page === 'projects' || page === 'creative') &&
  segments[1]
) {

  inner = detail(segments[1]);

}

// PROJECTS LANDING PAGE
else if (page === 'projects') {

  inner = listing('projects');

}

// CREATIVE WORKS LANDING PAGE
else if (page === 'creative') {

  inner = listing('creative');

}

// UNKNOWN URL - RETURN TO HOME
else {

  inner = home();

}

  
app.innerHTML = shell(
  inner,
  '#/' + (page === 'home' ? '' : page)
);

resetAmbientPointer();
initSectionAtmosphere();
syncMotionPreference();
document.getElementById('motion-toggle').addEventListener('click', () => {
  motionPaused = !motionPaused;
  try {
    localStorage.setItem('bea-motion-paused', String(motionPaused));
  } catch (_) {
    // Retain the preference for this visit if persistence is unavailable.
  }
  syncMotionPreference();
});

window.scrollTo(0, 0);

// Activate animations after rendering each page
initScrollAnimations(document, true);

  if (page === 'about' || page === 'contact') {
    requestAnimationFrame(() =>
      document.getElementById(page)?.scrollIntoView()
    );
  }

  const menu = document.getElementById('menu-toggle');

  menu.addEventListener('click', () => {
    const nav = document.getElementById('nav-links');
    const open = nav.classList.toggle('open');

    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.textContent = open ? '✕' : '☰';
  });

  const filterRoot = document.getElementById('filtered-projects');

  if (filterRoot) {
    document.querySelectorAll('[data-filter]').forEach(btn =>
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-filter]').forEach(b => {
          b.classList.toggle('selected', b === btn);
          b.setAttribute('aria-pressed', String(b === btn));
        });

        const list = page === 'projects' ? projects :
          page === 'activities' ? activities : creativeWorks;

        
/* =========================================
   MULTI-CATEGORY PROJECT FILTER
   ========================================= */

const selectedCategory = btn.dataset.filter;

const filtered = selectedCategory.startsWith('All ')
  ? list
  : list.filter(p =>
      p.category === selectedCategory ||
      (p.categories || []).includes(selectedCategory)
    );


        filterRoot.innerHTML = filtered.length ?
          cards(filtered) :
          '<p class="empty-message">No work in this category yet. Add original projects in content.js.</p>';
        initScrollAnimations(filterRoot);
        })
    );
  }

  const form = document.getElementById('contact-form');

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();

      document.getElementById('form-notice').textContent =
        'This form is not connected to an email delivery service yet. Please add a verified contact method.';
    });
  }

  document.querySelectorAll('[data-cv]').forEach(a =>
    a.addEventListener('click', e => {
      e.preventDefault();
    })
  );
}

// =========================================
// IMAGE LIGHTBOX
// =========================================

let lightbox = null;

function closeLightbox() {
  document.getElementById('lightbox-root').innerHTML = '';
  document.body.style.overflow = '';
  lightbox = null;
}

function drawLightbox() {
  if (!lightbox) return;

  const { images, index, zoom } = lightbox;

  document.getElementById('lightbox-root').innerHTML = `
    <div class="lightbox"
         role="dialog"
         aria-modal="true"
         aria-label="Image preview">

      <button class="lb-close"
              data-lb="close"
              aria-label="Close preview">✕</button>

      <div class="lb-stage">
        <img class="${zoom ? 'zoomed' : ''}"
             src="${esc(images[index])}"
             alt="Project screenshot ${index + 1}">

        <div class="lb-controls">
          <button data-lb="prev" aria-label="Previous image">‹</button>
          <span>${index + 1} / ${images.length}</span>
          <button data-lb="zoom"
                  aria-label="${zoom ? 'Zoom out' : 'Zoom in'}">
            ${zoom ? '−' : '＋'}
          </button>
          <button data-lb="next" aria-label="Next image">›</button>
        </div>
      </div>
    </div>
  `;

  document.querySelector('.lightbox').addEventListener('click', e => {
    if (e.target.classList.contains('lightbox')) closeLightbox();
  });
}

document.addEventListener('click', e => {
  const menu = document.getElementById('menu-toggle');
  if (menu?.getAttribute('aria-expanded') === 'true' && !e.target.closest('.nav-shell')) {
    document.getElementById('nav-links').classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Open menu');
    menu.textContent = '☰';
  }
  const thumb = e.target.closest('[data-gallery]');

  if (thumb) {
    try {
      const images = JSON.parse(
        decodeURIComponent(thumb.dataset.gallery)
      );

      lightbox = {
        images,
        index: Number(thumb.dataset.index),
        zoom: false
      };

      document.body.style.overflow = 'hidden';
      drawLightbox();
    } catch (err) {
      console.error(err);
    }

    return;
  }

  const b = e.target.closest('[data-lb]');

  if (b && lightbox) {
    const action = b.dataset.lb;

    if (action === 'close') return closeLightbox();

    if (action === 'zoom') {
      lightbox.zoom = !lightbox.zoom;
    } else {
      lightbox.index = (
        lightbox.index +
        (action === 'next' ? 1 : -1) +
        lightbox.images.length
      ) % lightbox.images.length;

      lightbox.zoom = false;
    }

    drawLightbox();
  }
});

document.addEventListener('keydown', e => {
  const menu = document.getElementById('menu-toggle');
  if (e.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') {
    document.getElementById('nav-links').classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Open menu');
    menu.textContent = '☰';
    menu.focus();
  }
  if (!lightbox) return;

  if (e.key === 'Escape') closeLightbox();

  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
    lightbox.index = (
      lightbox.index +
      (e.key === 'ArrowRight' ? 1 : -1) +
      lightbox.images.length
    ) % lightbox.images.length;

    lightbox.zoom = false;
    drawLightbox();
  }
});

window.addEventListener('hashchange', route);
route();
