/* ===================================================================
   VIKASH KUSHWAHA - PREMIUM 3D PORTFOLIO JAVASCRIPT APPLICATION
   =================================================================== */

// ===================================================================
// USER CONFIGURATION (EASY PROFILE & ASSET REPLACEMENT)
// ===================================================================
const USER_CONFIG = {
  /* REPLACE PROFILE IMAGE HERE */
  profileImage: 'assets/profile.png',

  /* REPLACE RESUME FILE HERE */
  resumePath: 'assets/Vikash_Kushwaha_Resume.pdf',

  /* REPLACE SOCIAL URLS HERE */
  linkedinUrl: 'https://www.linkedin.com/in/vikash-kushwaha-a6a873243?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  githubUrl: 'https://github.com/VIKASHKAIML',
  hackerrankUrl: 'https://www.hackerrank.com/profile/vikashkushwaha33'
};

// Project Data Registry
const PROJECTS_DATA = {
  1: {
    title: "Traffic Video Data Analysis",
    year: "2026",
    category: "Data Analytics & Video Insights",
    image: "assets/project/project1_traffic.svg",
    description: "Built a robust Python workflow using Pandas and NumPy to clean, process, and analyze traffic video log data to extract peak-hour congestion patterns and vehicle movement trends. Utilized advanced Excel pivot tables and charts to synthesize findings into actionable reports.",
    highlights: [
      "Processed 10,000+ data rows from traffic video analytics logs.",
      "Identified peak congestion windows with 95%+ classification accuracy.",
      "Engineered automated Pandas workflows reducing manual auditing time by 60%.",
      "Created executive summary dashboards in Excel with dynamic pivot charts."
    ],
    technologies: ["Python", "Pandas", "NumPy", "Excel", "Pivot Tables", "Data Visualization"]
  },
  2: {
    title: "Retail Sales Data Analysis",
    year: "2026",
    category: "Business Intelligence & Retail Insights",
    image: "assets/project/project2_retail.svg",
    description: "Analyzed a comprehensive retail sales dataset using Python (Pandas, NumPy) to compute revenue totals, monthly growth rates, and customer purchasing averages. Built interactive Excel pivot charts to identify top-performing product categories and seasonal surges.",
    highlights: [
      "Calculated monthly sales performance metrics and growth indicators.",
      "Uncovered top 15% revenue-generating product SKUs across multi-region stores.",
      "Cleaned raw transaction data containing missing fields and structural anomalies.",
      "Designed visual sales trend reports to support inventory forecasting."
    ],
    technologies: ["Python", "Pandas", "NumPy", "Excel", "Pivot Charts", "Statistical Analysis"]
  }
};

// Global State
let scene, camera, renderer, particleSystem, abstractMesh, gridHelper;
let mouseX = 0, mouseY = 0;
let targetX = 0, targetY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

// Initialize App when DOM is Ready
document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initCompileSequence();
  initThreeJSBackground();
  initNavigation();
  initCard3DTilt();
  initScrollAnimations();
  initContactForm();
  initCopyEmail();
  initBackToTop();
  initCodeProtection();
  initPhysicsSkills();
});

/* ===================================================================
   0. MULTI-THEME SYSTEM (CYBER DARK, PURE WHITE, MATRIX GREEN, SYNTHWAVE)
   =================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  if (!themeToggleBtn) return;

  const themes = ['dark', 'white', 'matrix', 'synthwave'];
  
  const themeIcons = {
    dark: 'fa-solid fa-moon',
    white: 'fa-solid fa-sun',
    matrix: 'fa-solid fa-terminal',
    synthwave: 'fa-solid fa-fire-flame-curved'
  };

  const themeNames = {
    dark: 'Cyber Dark Mode',
    white: 'Pure White Mode',
    matrix: 'Matrix Hacker Green',
    synthwave: 'Sunset Synthwave Mode'
  };

  const themeFogColors = {
    dark: 0x050508,
    white: 0xf8fafc,
    matrix: 0x030c03,
    synthwave: 0x0d0714
  };

  const savedTheme = localStorage.getItem('vk_portfolio_theme');
  // Backward compatibility with legacy 'light' preference
  let initialTheme = savedTheme === 'light' ? 'white' : savedTheme;
  if (!themes.includes(initialTheme)) {
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    initialTheme = prefersLight ? 'white' : 'dark';
  }

  let currentTheme = initialTheme;
  applyTheme(currentTheme, false);

  themeToggleBtn.addEventListener('click', () => {
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    currentTheme = themes[nextIndex];
    applyTheme(currentTheme, true);
    localStorage.setItem('vk_portfolio_theme', currentTheme);
  });

  function applyTheme(theme, notify = true) {
    document.documentElement.setAttribute('data-theme', theme);

    if (themeIcon) {
      themeIcon.className = themeIcons[theme] || 'fa-solid fa-moon';
    }

    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('title', `Active: ${themeNames[theme]} (Click to cycle themes)`);
    }

    if (typeof scene !== 'undefined' && scene && scene.fog) {
      scene.fog.color.setHex(themeFogColors[theme] || 0x050508);
    }

    if (notify && typeof showToast === 'function') {
      showToast('Theme Mode Switched', `Activated ${themeNames[theme]}`, false);
    }
  }
}

/* ===================================================================
   1. PHASE 1: FUTURISTIC INTRO COMPILE ANIMATION
   =================================================================== */
function initCompileSequence() {
  const loaderOverlay = document.getElementById('loader-overlay');
  const progressBar = document.getElementById('progress-bar');
  const loaderCounter = document.getElementById('loader-counter');
  const loaderStatus = document.getElementById('loader-status');
  const codeStream = document.getElementById('code-stream');
  const readyBanner = document.getElementById('ready-banner');
  const skipBtn = document.getElementById('skip-loader-btn');

  const bootMessages = [
    "Initializing portfolio kernel...",
    "Loading identity: Vikash Kushwaha...",
    "Importing modules: Pandas, NumPy, Three.js...",
    "Compiling projects: Traffic & Retail Analytics...",
    "Rendering experience: Video Analytics Intern...",
    "Preparing 3D WebGL background shaders...",
    "Portfolio compiled successfully."
  ];

  const codeSnippets = [
    "import pandas as pd",
    "import numpy as np",
    "df = pd.read_csv('traffic_logs.csv')",
    "df.groupby('peak_hour').mean()",
    "const scene = new THREE.Scene();",
    "renderer.setPixelRatio(window.devicePixelRatio);",
    "SYSTEM_READY = True"
  ];

  let currentPercent = 0;
  let msgIndex = 0;

  // Type code lines dynamically
  codeSnippets.forEach((snippet, idx) => {
    setTimeout(() => {
      const line = document.createElement('div');
      line.className = 'code-line';
      line.textContent = `> ${snippet}`;
      codeStream.appendChild(line);
      codeStream.scrollTop = codeStream.scrollHeight;
    }, idx * 450);
  });

  // Progress Interval (3-5 seconds duration)
  const compileInterval = setInterval(() => {
    currentPercent += Math.floor(Math.random() * 4) + 1;
    if (currentPercent > 100) currentPercent = 100;

    progressBar.style.width = `${currentPercent}%`;
    loaderCounter.textContent = `${currentPercent}%`;

    // Message rotation based on progress
    const nextMsgIdx = Math.floor((currentPercent / 100) * bootMessages.length);
    if (nextMsgIdx !== msgIndex && nextMsgIdx < bootMessages.length) {
      msgIndex = nextMsgIdx;
      loaderStatus.textContent = bootMessages[msgIndex];
    }

    if (currentPercent >= 100) {
      clearInterval(compileInterval);
      completeCompileSequence();
    }
  }, 40);

  function completeCompileSequence() {
    loaderStatus.textContent = "Portfolio compiled successfully.";
    readyBanner.style.display = 'block';

    // Cinematic GSAP Camera Transition into Hero
    setTimeout(() => {
      if (loaderOverlay && !loaderOverlay.classList.contains('fade-out')) {
        loaderOverlay.classList.add('fade-out');
        document.body.classList.remove('loading-state');
        triggerHeroAnimations();
      }
    }, 1200);
  }

  // Skip Button Action
  skipBtn.addEventListener('click', () => {
    clearInterval(compileInterval);
    loaderOverlay.classList.add('fade-out');
    document.body.classList.remove('loading-state');
    triggerHeroAnimations();
  });
}

function triggerHeroAnimations() {
  if (typeof gsap !== 'undefined') {
    gsap.from('.hero-tag', { opacity: 0, y: -20, duration: 0.8, delay: 0.2 });
    gsap.from('.hero-title', { opacity: 0, y: 30, duration: 1, delay: 0.4 });
    gsap.from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.8, delay: 0.6 });
    gsap.from('.hero-description', { opacity: 0, y: 20, duration: 0.8, delay: 0.8 });
    gsap.from('.hero-ctas', { opacity: 0, y: 20, duration: 0.8, delay: 1.0 });
    gsap.from('.portrait-stage', { opacity: 0, scale: 0.9, duration: 1.2, delay: 0.5 });
  }
}

/* ===================================================================
   2. THREE.JS 3D CANVAS BACKGROUND ENVIRONMENT
   =================================================================== */
function initThreeJSBackground() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  // Scene & Camera
  scene = new THREE.Scene();
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  scene.fog = new THREE.FogExp2(currentTheme === 'light' ? 0xf0f4f9 : 0x050508, 0.0015);

  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
  camera.position.z = 400;

  // WebGL Renderer
  renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // 1. Particle Cloud Grid
  const particleCount = window.innerWidth < 768 ? 600 : 1200;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  const colorCyan = new THREE.Color(0x00f0ff);
  const colorPurple = new THREE.Color(0x7000ff);

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 1600;
    positions[i + 1] = (Math.random() - 0.5) * 1600;
    positions[i + 2] = (Math.random() - 0.5) * 1600;

    const mixedColor = Math.random() > 0.5 ? colorCyan : colorPurple;
    colors[i] = mixedColor.r;
    colors[i + 1] = mixedColor.g;
    colors[i + 2] = mixedColor.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 3,
    vertexColors: true,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending
  });

  particleSystem = new THREE.Points(geometry, material);
  scene.add(particleSystem);

  // 2. Abstract Wireframe Geometric Mesh (Icosahedron Node)
  const icoGeo = new THREE.IcosahedronGeometry(90, 1);
  const icoMat = new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
    wireframe: true,
    transparent: true,
    opacity: 0.12
  });
  abstractMesh = new THREE.Mesh(icoGeo, icoMat);
  abstractMesh.position.set(250, 50, -100);
  scene.add(abstractMesh);

  // 3. Cyber Digital Grid Floor
  gridHelper = new THREE.GridHelper(1600, 40, 0x00f0ff, 0x7000ff);
  gridHelper.position.y = -250;
  gridHelper.material.opacity = 0.15;
  gridHelper.material.transparent = true;
  scene.add(gridHelper);

  // Mouse Parallax Trackers
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - windowHalfX) * 0.05;
    mouseY = (e.clientY - windowHalfY) * 0.05;
  });

  window.addEventListener('resize', onWindowResize);

  // Start Animation Loop
  animateThreeJS();
}

function animateThreeJS() {
  requestAnimationFrame(animateThreeJS);

  // Parallax Smooth Camera Tracking
  targetX += (mouseX - targetX) * 0.05;
  targetY += (-mouseY - targetY) * 0.05;

  camera.position.x = targetX;
  camera.position.y = targetY;
  camera.lookAt(scene.position);

  // Rotations
  if (particleSystem) particleSystem.rotation.y += 0.0005;
  if (abstractMesh) {
    abstractMesh.rotation.x += 0.003;
    abstractMesh.rotation.y += 0.005;
  }

  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

/* ===================================================================
   3. NAVIGATION & MOBILE MENU
   =================================================================== */
function initNavigation() {
  const header = document.getElementById('main-header');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Shrink navbar on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // ScrollSpy Active Link Highlight
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile Hamburger Menu Toggle
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }
}

/* ===================================================================
   4. INTERACTIVE 3D TILT EFFECT FOR CARDS
   =================================================================== */
function initCard3DTilt() {
  const tiltCards = document.querySelectorAll('.skill-card-3d, .project-card-3d, #portrait-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 12;
      const rotateY = (centerX - x) / 12;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}

/* ===================================================================
   5. GSAP SCROLLTRIGGER ANIMATIONS & COUNTERS
   =================================================================== */
function initScrollAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // Section Headers Reveal
  gsap.utils.toArray('.section-header').forEach(header => {
    gsap.from(header, {
      scrollTrigger: {
        trigger: header,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 30,
      duration: 0.8
    });
  });

  // Timeline Items Reveal
  gsap.utils.toArray('.timeline-item, .edu-card').forEach(item => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top 80%'
      },
      opacity: 0,
      x: -40,
      duration: 0.9
    });
  });

  // Project Cards Reveal
  gsap.from('.project-card-3d', {
    scrollTrigger: {
      trigger: '.projects-grid',
      start: 'top 80%'
    },
    opacity: 0,
    y: 40,
    stagger: 0.2,
    duration: 0.9
  });

  // Animated Statistics Count-up Trigger
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');
  statNumbers.forEach(stat => {
    const targetCount = parseInt(stat.getAttribute('data-count'), 10);
    ScrollTrigger.create({
      trigger: stat,
      start: 'top 85%',
      onEnter: () => {
        let currentCount = 0;
        const step = Math.ceil(targetCount / 40);
        const timer = setInterval(() => {
          currentCount += step;
          if (currentCount >= targetCount) {
            currentCount = targetCount;
            clearInterval(timer);
          }
          if (targetCount === 76) stat.textContent = `${currentCount}%`;
          else if (targetCount === 3) stat.textContent = `${currentCount} Months`;
          else stat.textContent = currentCount;
        }, 30);
      }
    });
  });
}

/* ===================================================================
   6. PROJECT MODAL DIALOG
   =================================================================== */
function openProjectModal(id) {
  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');
  const data = PROJECTS_DATA[id];

  if (!modal || !data) return;

  modalBody.innerHTML = `
    <div style="margin-bottom: 1.5rem;">
      <span style="color: var(--cyan-accent); font-family: var(--font-mono); font-size: 0.8rem;">${data.category} // ${data.year}</span>
      <h2 style="font-family: var(--font-heading); font-size: 2rem; font-weight: 800; margin-top: 0.3rem;">${data.title}</h2>
    </div>

    <div style="border-radius: 12px; overflow: hidden; height: 250px; margin-bottom: 1.5rem;">
      <img src="${data.image}" alt="${data.title}" style="width: 100%; height: 100%; object-fit: cover;">
    </div>

    <p style="color: var(--text-muted); line-height: 1.7; margin-bottom: 1.5rem;">${data.description}</p>

    <h4 style="font-family: var(--font-heading); font-size: 1.1rem; color: #fff; margin-bottom: 0.8rem;">Key Project Deliverables</h4>
    <ul style="margin-bottom: 1.8rem; display: flex; flex-direction: column; gap: 0.5rem;">
      ${data.highlights.map(h => `<li style="color: var(--text-muted); font-size: 0.9rem; display: flex; align-items: center; gap: 0.5rem;"><i class="fa-solid fa-check" style="color: var(--cyan-accent);"></i> ${h}</li>`).join('')}
    </ul>

    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem;">
      ${data.technologies.map(t => `<span style="background: rgba(0,240,255,0.1); border: 1px solid var(--cyan-accent); color: var(--cyan-accent); padding: 0.3rem 0.8rem; border-radius: 15px; font-family: var(--font-mono); font-size: 0.75rem;">${t}</span>`).join('')}
    </div>

    <div style="display: flex; gap: 1rem;">
      <a href="${USER_CONFIG.githubUrl}" target="_blank" class="btn btn-primary">
        <i class="fa-brands fa-github"></i> View Source Code
      </a>
      <button class="btn btn-secondary" onclick="closeProjectModal()">Close</button>
    </div>
  `;

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
  }
}

/* ===================================================================
   7. CONTACT FORM HANDLER WITH FORMSPREE/FORMSUBMIT AJAX & TOAST
   =================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const msgInput = document.getElementById('contact-message');
  const submitBtn = document.getElementById('contact-submit-btn');
  const toast = document.getElementById('toast-notification');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let isValid = true;

    // Clear previous errors
    document.querySelectorAll('.form-group').forEach(group => group.classList.remove('has-error'));

    // Validate Name
    if (!nameInput.value.trim()) {
      nameInput.closest('.form-group').classList.add('has-error');
      isValid = false;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      emailInput.closest('.form-group').classList.add('has-error');
      isValid = false;
    }

    // Validate Message
    if (!msgInput.value.trim()) {
      msgInput.closest('.form-group').classList.add('has-error');
      isValid = false;
    }

    if (!isValid) return;

    // UI Loading state
    const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
    const btnIcon = submitBtn ? submitBtn.querySelector('.btn-icon') : null;
    const originalText = btnText ? btnText.textContent : 'SEND MESSAGE';

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.classList.add('btn-loading');
      if (btnText) btnText.textContent = 'SENDING MESSAGE...';
      if (btnIcon) btnIcon.className = 'fa-solid fa-circle-notch fa-spin btn-icon';
    }

    const formData = new FormData(form);
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    try {
      // Send async AJAX request to FormSubmit endpoint
      const response = await fetch('https://formsubmit.co/ajax/vikashkushwaha3045@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formObject)
      });

      const data = await response.json();

      if (response.ok || data.success === 'true' || data.success === true) {
        showToast('Message Sent Successfully!', 'Thank you! Your message was delivered directly to vikashkushwaha3045@gmail.com.');
        form.reset();
      } else {
        throw new Error(data.message || 'Form submission failed');
      }
    } catch (err) {
      console.warn('FormSubmit AJAX error, opening mailto fallback:', err);
      showToast('Redirecting to Mail Client...', 'Sending directly via email to vikashkushwaha3045@gmail.com', true);
      
      // Fallback: Open mailto link directly in user's default email program
      const mailtoUrl = `mailto:vikashkushwaha3045@gmail.com?subject=${encodeURIComponent('Portfolio Contact from ' + nameInput.value.trim())}&body=${encodeURIComponent(msgInput.value.trim() + '\n\nSender Email: ' + emailInput.value.trim())}`;
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 1200);
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('btn-loading');
        if (btnText) btnText.textContent = originalText;
        if (btnIcon) btnIcon.className = 'fa-solid fa-paper-plane btn-icon';
      }
    }
  });
}

// Helper to show custom toast notifications
function showToast(title, message, isError = false) {
  const toast = document.getElementById('toast-notification');
  if (!toast) return;

  const toastTitle = toast.querySelector('.toast-title');
  const toastMsg = toast.querySelector('.toast-msg');
  const toastIcon = toast.querySelector('.toast-icon i');

  if (toastTitle) toastTitle.textContent = title;
  if (toastMsg) toastMsg.textContent = message;

  if (isError) {
    toast.classList.add('error');
    if (toastIcon) toastIcon.className = 'fa-solid fa-triangle-exclamation';
  } else {
    toast.classList.remove('error');
    if (toastIcon) toastIcon.className = 'fa-solid fa-circle-check';
  }

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 5000);
}

/* ===================================================================
   7.1 COPY EMAIL ADDRESS TO CLIPBOARD
   =================================================================== */
function initCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  const tooltip = document.getElementById('copy-tooltip');
  const emailStr = 'vikashkushwaha3045@gmail.com';

  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(emailStr).then(() => {
      if (tooltip) {
        tooltip.classList.add('show');
        setTimeout(() => {
          tooltip.classList.remove('show');
        }, 2000);
      }
    }).catch(err => {
      console.error('Could not copy email: ', err);
    });
  });
}

/* ===================================================================
   8. BACK TO TOP BUTTON
   =================================================================== */
function initBackToTop() {
  const backBtn = document.getElementById('back-to-top');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/* ===================================================================
   9. CODE PROTECTION & INSPECT / CTRL+U RESTRICTIONS
   =================================================================== */
function initCodeProtection() {
  const securityOverlay = document.getElementById('security-overlay');
  const closeBtn = document.getElementById('security-close-btn');
  const ackBtn = document.getElementById('security-ack-btn');
  const matrixTextEl = document.getElementById('security-matrix-text');

  let matrixInterval = null;

  function openSecurityModal(reason = 'Shortcut key command restricted.') {
    if (!securityOverlay) return;
    securityOverlay.classList.add('show');
    securityOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Matrix hex scramble animation
    startMatrixScramble();

    // Print warning banner to console & clear
    try {
      console.clear();
      console.log(
        '%c VK-OS KERNEL SECURITY LAYER %c Inspection & Ctrl+U Restricted ',
        'background:#00f0ff; color:#0a0a14; font-weight:bold; font-size:14px; padding:4px 8px; border-radius:4px;',
        'background:#7000ff; color:#ffffff; font-weight:bold; font-size:14px; padding:4px 8px; border-radius:4px;'
      );
    } catch (e) {}
  }

  function closeSecurityModal() {
    if (!securityOverlay) return;
    securityOverlay.classList.remove('show');
    securityOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (matrixInterval) clearInterval(matrixInterval);
  }

  function startMatrixScramble() {
    if (matrixInterval) clearInterval(matrixInterval);
    const hexChars = '0123456789ABCDEF';
    let iterations = 0;
    matrixInterval = setInterval(() => {
      let scrambled = '';
      for (let i = 0; i < 4; i++) {
        let chunk = '0x';
        for (let c = 0; c < 4; c++) {
          chunk += hexChars[Math.floor(Math.random() * hexChars.length)];
        }
        scrambled += chunk + ' ';
      }
      scrambled += '[PROTECTED_KERNEL_BYTECODE_VK_OS]';
      if (matrixTextEl) matrixTextEl.textContent = scrambled;

      iterations++;
      if (iterations > 40) {
        clearInterval(matrixInterval);
      }
    }, 50);
  }

  // 1. Disable Right Click Context Menu
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    openSecurityModal('Right-click context menu is restricted.');
  });

  // 2. Intercept Inspect & View Source Keyboard Shortcuts
  document.addEventListener('keydown', (e) => {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const ctrlOrCmd = isMac ? e.metaKey : e.ctrlKey;
    const keyCode = e.keyCode || e.which;

    // F12 key
    if (keyCode === 123) {
      e.preventDefault();
      e.stopPropagation();
      openSecurityModal('F12 Developer Tools key restricted.');
      return false;
    }

    // Ctrl+U / Cmd+Opt+U (View Source)
    if (ctrlOrCmd && (e.key === 'u' || e.key === 'U' || keyCode === 85)) {
      e.preventDefault();
      e.stopPropagation();
      openSecurityModal('Ctrl+U View-Source restricted.');
      return false;
    }

    // Ctrl+Shift+I / Cmd+Opt+I (Inspect Element)
    if (ctrlOrCmd && e.shiftKey && (e.key === 'I' || e.key === 'i' || keyCode === 73)) {
      e.preventDefault();
      e.stopPropagation();
      openSecurityModal('Inspect Element shortcut restricted.');
      return false;
    }

    // Ctrl+Shift+J / Cmd+Opt+J (Console)
    if (ctrlOrCmd && e.shiftKey && (e.key === 'J' || e.key === 'j' || keyCode === 74)) {
      e.preventDefault();
      e.stopPropagation();
      openSecurityModal('Console shortcut restricted.');
      return false;
    }

    // Ctrl+Shift+C (Inspect Element selection tool)
    if (ctrlOrCmd && e.shiftKey && (e.key === 'C' || e.key === 'c' || keyCode === 67)) {
      e.preventDefault();
      e.stopPropagation();
      openSecurityModal('Element selector restricted.');
      return false;
    }

    // Ctrl+S / Cmd+S (Save Page)
    if (ctrlOrCmd && (e.key === 's' || e.key === 'S' || keyCode === 83)) {
      e.preventDefault();
      e.stopPropagation();
      openSecurityModal('Save Page command restricted.');
      return false;
    }

    // Escape key closes security modal
    if (e.key === 'Escape' && securityOverlay && securityOverlay.classList.contains('show')) {
      closeSecurityModal();
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeSecurityModal);
  if (ackBtn) ackBtn.addEventListener('click', closeSecurityModal);
  if (securityOverlay) {
    securityOverlay.addEventListener('click', (e) => {
      if (e.target === securityOverlay) {
        closeSecurityModal();
      }
    });
  }
}


/* ===================================================================
   10. COLOR AVALANCHE â€” SKILLS PHYSICS (MATTER.JS + DOM DIVS)
   Each block uses a named CSS color. Cursor auto-repels blocks.
   =================================================================== */
function initPhysicsSkills() {
  const scene       = document.getElementById('ca-scene-container') || document.getElementById('ca-scene');
  const sourceList  = document.getElementById('ca-color-source') || document.getElementById('ca-skills-source');
  const gravBtn     = document.getElementById('ca-btn-gravity');
  const explodeBtn  = document.getElementById('ca-btn-explode');
  const section     = document.getElementById('skills-physics') || document.getElementById('skills') || document.querySelector('.color-avalanche-section');

  if (!scene || !sourceList) return;

  /* ── Read skills from source <ul> ────────────────────────── */
  const SKILLS = Array.from(sourceList.querySelectorAll('li')).map(li => ({
    label: li.textContent.trim(),
    color: li.dataset.color || 'SteelBlue',
  }));

  /* ── Config ────────────────────────────────────────────────── */
  const BLOCK_H     = 36;           // height of each pill/block
  const FONT_SIZE   = 13;           // px
  const H_PAD       = 18;           // horizontal padding inside block
  const SCENE_H     = 500;          // canvas arena height
  const CURSOR_R    = 55;           // radius of invisible cursor repeller
  const RESTITUTION = 0.45;         // restitution for pile stacking
  const FONT_STR    = `bold ${FONT_SIZE}px "Inter", sans-serif`;

  /* ── State ─────────────────────────────────────────────────── */
  let engine, runner, animId;
  let bodies     = [];              // Matter.js body array
  let divEls     = [];              // matching DOM div array
  let cursorBody = null;
  let isZeroGrav = false;
  let curX = -9999, curY = -9999;
  let isDragging = false, dragBody = null, dragDiv = null;
  let prevX = 0, prevY = 0, velX = 0, velY = 0;

  /* ── Measure text width for block sizing ──────────────────── */
  const _measureCtx = document.createElement('canvas').getContext('2d');
  function blockWidth(label) {
    _measureCtx.font = FONT_STR;
    return Math.max(_measureCtx.measureText(label).width + H_PAD * 2, 65);
  }

  /* ── Convert client coords → scene-space coords ─────────── */
  function toSceneXY(clientX, clientY) {
    const r = scene.getBoundingClientRect();
    return { x: clientX - r.left, y: clientY - r.top };
  }

  /* ── Determine readable text color for a CSS color name ─────── */
  function textColorFor(cssColor) {
    const lightColors = [
      'aliceblue','antiquewhite','aqua','aquamarine','azure','beige','bisque',
      'blanchedalmond','burlywood','chartreuse','cornsilk','cyan','floralwhite',
      'gainsboro','ghostwhite','gold','goldenrod','greenyellow','honeydew','ivory',
      'khaki','lavender','lavenderblush','lawngreen','lemonchiffon','lightblue',
      'lightcoral','lightcyan','lightgoldenrodyellow','lightgray','lightgreen',
      'lightpink','lightsalmon','lightseagreen','lightskyblue','lightslategray',
      'lightsteelblue','lightyellow','lime','linen','mintcream','mistyrose',
      'moccasin','navajowhite','oldlace','papayawhip','peachpuff','pink','powderblue',
      'seashell','skyblue','snow','thistle','wheat','white','whitesmoke','yellow'
    ];
    return lightColors.includes(cssColor.toLowerCase()) ? '#000000' : '#ffffff';
  }

  /* ── Build the engine + DOM elements ──────────────────────── */
  function build() {
    if (typeof Matter === 'undefined') return;

    const W = scene.offsetWidth || window.innerWidth;
    scene.style.height   = SCENE_H + 'px';
    scene.style.position = 'relative';
    scene.style.overflow = 'hidden';

    const { Engine, Runner, Bodies, Body, World } = Matter;

    engine = Engine.create({ gravity: { x: 0, y: 1.2 } });
    const world = engine.world;

    /* Walls — Floor, sides, elevated ceiling */
    const W_OPT = { isStatic: true, restitution: 0.4, friction: 0.3 };
    World.add(world, [
      Bodies.rectangle(W / 2,  SCENE_H + 25, W + 400, 50,        W_OPT), // floor
      Bodies.rectangle(W / 2,  -800,         W + 400, 50,        W_OPT), // elevated ceiling (above spawn)
      Bodies.rectangle(-25,    SCENE_H / 2,  50, SCENE_H * 4,    W_OPT), // left wall
      Bodies.rectangle(W + 25, SCENE_H / 2,  50, SCENE_H * 4,    W_OPT), // right wall
    ]);

    /* Invisible cursor repeller */
    cursorBody = Bodies.circle(-9999, -9999, CURSOR_R, {
      isStatic: true,
      restitution: 1.1,
      friction: 0,
      frictionAir: 0,
      label: '__cursor__',
    });
    World.add(world, cursorBody);

    /* Create one DOM div + one Matter body per skill block */
    bodies  = [];
    divEls  = [];
    scene.innerHTML = ''; // clear old divs on rebuild

    SKILLS.forEach((skill, i) => {
      const bw  = blockWidth(skill.label);
      const col = i % 7;
      const x   = (col / 7) * (W - 120) + 60 + (Math.random() - 0.5) * 30;
      // Spawn Y staggered above top of scene so they tumble down cleanly
      const y   = -30 - (i * 22);

      /* Matter body chamfered pill */
      const body = Bodies.rectangle(x, y, bw, BLOCK_H, {
        restitution: RESTITUTION,
        friction:    0.35,
        frictionAir: 0.015,
        chamfer:     { radius: BLOCK_H / 2 },
        label:       skill.label,
        plugin:      { color: skill.color, width: bw },
      });
      Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 3,
        y: Math.random() * 2 + 1,
      });

      World.add(world, body);
      bodies.push(body);

      /* DOM div — styled pill matching screenshot */
      const div = document.createElement('div');
      div.className   = 'ca-block';
      div.textContent = skill.label;
      div.style.cssText = `
        position: absolute;
        width:  ${bw}px;
        height: ${BLOCK_H}px;
        border-radius: ${BLOCK_H / 2}px;
        background: ${skill.color};
        color: ${textColorFor(skill.color)};
        font: bold ${FONT_SIZE}px "Inter", sans-serif;
        line-height: ${BLOCK_H}px;
        text-align: center;
        white-space: nowrap;
        pointer-events: none;
        transform-origin: center center;
        will-change: transform;
        box-shadow: 0 4px 12px rgba(0,0,0,0.4);
        user-select: none;
      `;
      scene.appendChild(div);
      divEls.push(div);
    });


    /* Runner */
    runner = Runner.create();
    Runner.run(runner, engine);

    /* Animation loop — sync DOM divs to physics bodies */
    function frame() {
      animId = requestAnimationFrame(frame);

      /* Move cursor repeller */
      if (!isDragging) {
        Matter.Body.setPosition(cursorBody, { x: curX, y: curY });
      } else {
        Matter.Body.setPosition(cursorBody, { x: -9999, y: -9999 });
      }

      /* Hover detection for cursor styling */
      if (!isDragging && curX > 0) {
        const hovered = Matter.Query.point(bodies, { x: curX, y: curY });
        scene.style.cursor = hovered.length > 0 ? 'grab' : 'crosshair';
      }

      /* Sync each div to its physics body */
      for (let i = 0; i < bodies.length; i++) {
        const b   = bodies[i];
        const div = divEls[i];
        const bw  = b.plugin.width;
        const { x, y } = b.position;
        div.style.transform = `translate(${x - bw / 2}px, ${y - BLOCK_H / 2}px) rotate(${b.angle}rad)`;
      }
    }
    frame();

    /* ── Pointer events ─────────────────────────────────────── */
    scene.addEventListener('mousemove', onMove);
    scene.addEventListener('mouseleave', onLeave);
    scene.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    scene.addEventListener('touchstart', onTouchStart, { passive: false });
    scene.addEventListener('touchmove',  onTouchMove,  { passive: false });
    window.addEventListener('touchend',  onTouchEnd);
  }

  /* ── Event handlers ────────────────────────────────────────── */
  function onMove(e) {
    const p = toSceneXY(e.clientX, e.clientY);
    velX = p.x - prevX;
    velY = p.y - prevY;
    prevX = p.x; prevY = p.y;
    curX  = p.x; curY  = p.y;
    if (isDragging && dragBody) {
      Matter.Body.setPosition(dragBody, p);
      Matter.Body.setVelocity(dragBody, { x: velX, y: velY });
    }
  }

  function onLeave() {
    curX = -9999; curY = -9999;
    if (isDragging && dragBody) {
      Matter.Body.setVelocity(dragBody, { x: velX * 2.5, y: velY * 2.5 });
      if (dragDiv) dragDiv.classList.remove('is-grabbed');
      isDragging = false; dragBody = null; dragDiv = null;
      scene.classList.remove('is-dragging');
    }
  }

  function onDown(e) {
    const p     = toSceneXY(e.clientX, e.clientY);
    const found = Matter.Query.point(bodies, p);
    if (found.length > 0) {
      dragBody = found[0];
      const idx = bodies.indexOf(dragBody);
      if (idx !== -1) dragDiv = divEls[idx];
      if (dragDiv) dragDiv.classList.add('is-grabbed');
      isDragging = true;
      prevX = p.x; prevY = p.y;
      velX = 0; velY = 0;
      scene.classList.add('is-dragging');
    }
  }

  function onUp() {
    if (isDragging && dragBody) {
      Matter.Body.setVelocity(dragBody, { x: velX * 2.5, y: velY * 2.5 });
      if (dragDiv) dragDiv.classList.remove('is-grabbed');
    }
    isDragging = false; dragBody = null; dragDiv = null;
    scene.classList.remove('is-dragging');
  }

  function onTouchStart(e) {
    const t = e.touches[0];
    const p = toSceneXY(t.clientX, t.clientY);
    curX = p.x; curY = p.y;
    prevX = p.x; prevY = p.y;
    velX = 0; velY = 0;
    const found = Matter.Query.point(bodies, p);
    if (found.length > 0) {
      e.preventDefault();
      dragBody = found[0];
      const idx = bodies.indexOf(dragBody);
      if (idx !== -1) dragDiv = divEls[idx];
      if (dragDiv) dragDiv.classList.add('is-grabbed');
      isDragging = true;
      scene.classList.add('is-dragging');
    }
  }

  function onTouchMove(e) {
    const t = e.touches[0];
    const p = toSceneXY(t.clientX, t.clientY);
    velX = p.x - prevX; velY = p.y - prevY;
    prevX = p.x; prevY = p.y;
    curX  = p.x; curY  = p.y;
    if (isDragging && dragBody) {
      e.preventDefault();
      Matter.Body.setPosition(dragBody, p);
      Matter.Body.setVelocity(dragBody, { x: velX, y: velY });
    }
  }

  function onTouchEnd() {
    if (isDragging && dragBody) {
      Matter.Body.setVelocity(dragBody, { x: velX * 2.5, y: velY * 2.5 });
      if (dragDiv) dragDiv.classList.remove('is-grabbed');
    }
    isDragging = false; dragBody = null; dragDiv = null;
    scene.classList.remove('is-dragging');
    curX = -9999; curY = -9999;
  }

  /* ── Buttons ───────────────────────────────────────────────── */
  if (gravBtn) {
    gravBtn.addEventListener('click', () => {
      if (!engine) return;
      isZeroGrav = !isZeroGrav;
      engine.gravity.y = isZeroGrav ? 0 : 1;
      gravBtn.classList.toggle('active', isZeroGrav);
      if (isZeroGrav) {
        bodies.forEach(b => Matter.Body.setVelocity(b, {
          x: (Math.random() - 0.5) * 10,
          y: (Math.random() - 0.5) * 10,
        }));
      }
    });
  }

  if (explodeBtn) {
    explodeBtn.addEventListener('click', () => {
      if (!engine) return;
      const W  = scene.offsetWidth;
      const cx = W / 2, cy = SCENE_H / 2;
      bodies.forEach(b => {
        const dx = b.position.x - cx;
        const dy = b.position.y - cy;
        const d  = Math.sqrt(dx * dx + dy * dy) || 1;
        Matter.Body.applyForce(b, b.position, {
          x: (dx / d) * 0.35,
          y: (dy / d) * 0.35,
        });
      });
    });
  }

  /* Immediate build execution & IntersectionObserver fallback */
  if (section && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !engine) {
        build();
        obs.disconnect();
      }
    }, { threshold: 0 });
    obs.observe(section);
  }
  
  // Guarantee build runs immediately after DOM setup
  setTimeout(() => {
    if (!engine) build();
  }, 100);


  /* â”€â”€ Rebuild on window resize â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (!engine) return;
      cancelAnimationFrame(animId);
      Matter.Runner.stop(runner);
      Matter.World.clear(engine.world);
      Matter.Engine.clear(engine);
      engine = null;
      build();
    }, 300);
  });
}
