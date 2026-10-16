/* ==========================================================================
   KINETIC ORANGE // CLIENT-SIDE JAVASCRIPT LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. LIVE TIME & TELEMETRY
  initLiveClock();
  initFPSCounter();

  // 2. AUDIO SYNTHESIZER (WEB AUDIO API)
  const soundSystem = initSoundSystem();


  // 4. NAVIGATION SCROLLSPY & SMOOTH SCROLL
  initNavigation();

  // 5. INDUSTRIES RADIAL NETWORK INTERACTION
  initIndustriesInteractivity(soundSystem);

  // 6. INQUIRY MODAL & FORM TRANSMISSION
  initInquiryModal(soundSystem);

  // 7. DIRECT EMAIL COPY
  initEmailCopy(soundSystem);

  // 8. TERMINAL STREAM LOGGER
  initTerminalLogger();


  // 10. HEADLINE TYPING ANIMATION (DELIBERATE PACE // 2.5S LOOP)
  initHeadlineTyping(soundSystem);

  // 11. 3D INTERACTIVE NEON TUBES CURSOR BACKGROUND (THREEJS-COMPONENTS)
  initTubesBackground(soundSystem);
});

/**
 * Live UTC / Local clock display in Space Mono
 */
function initLiveClock() {
  const clockEl = document.getElementById('live-clock');
  if (!clockEl) return;

  function updateClock() {
    try {
      const now = new Date();
      const dohaTime = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Qatar',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).format(now);
      clockEl.textContent = `DOHA (HQ): ${dohaTime} AST (UTC+3)`;
    } catch {
      const now = new Date();
      const hours = String(now.getUTCHours() + 3).padStart(2, '0');
      const minutes = String(now.getUTCMinutes()).padStart(2, '0');
      const seconds = String(now.getUTCSeconds()).padStart(2, '0');
      clockEl.textContent = `DOHA (HQ): ${hours}:${minutes}:${seconds} AST (UTC+3)`;
    }
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/**
 * FPS Counter Simulation
 */
function initFPSCounter() {
  const fpsEl = document.getElementById('live-fps');
  if (!fpsEl) return;

  let lastTime = performance.now();
  let frameCount = 0;

  function loop(now) {
    frameCount++;
    if (now - lastTime >= 1000) {
      const fps = Math.round((frameCount * 1000) / (now - lastTime));
      fpsEl.textContent = `${fps} FPS [ACTIVE]`;
      frameCount = 0;
      lastTime = now;
    }
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
}

/**
 * Lightweight Brutalist Audio Synthesizer (Web Audio API)
 */
function initSoundSystem() {
  let audioCtx = null;
  let isMuted = true;

  const soundBtn = document.getElementById('sound-btn');
  const soundLabel = document.getElementById('sound-label');
  const telAudio = document.getElementById('tel-audio-status');

  function ensureAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playTone(freq = 440, type = 'square', duration = 0.05, gainValue = 0.04) {
    if (isMuted || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gainNode.gain.setValueAtTime(gainValue, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch {
      // Audio context might be restricted before interaction
    }
  }

  function toggleSound() {
    ensureAudioContext();
    isMuted = !isMuted;
    if (soundBtn) {
      soundBtn.classList.toggle('active', !isMuted);
    }
    if (soundLabel) {
      soundLabel.textContent = isMuted ? 'AUDIO: OFF' : 'AUDIO: ON';
    }
    if (telAudio) {
      telAudio.textContent = isMuted ? 'MUTED // CLICK TO ARM' : 'ARMED // 44.1KHZ PCM';
    }

    if (!isMuted) {
      playTone(880, 'sine', 0.1, 0.08);
      setTimeout(() => playTone(1320, 'square', 0.08, 0.05), 100);
      logTerminalEvent('AUDIO SUBSYSTEM ARMED: WEBAUDIO SYNTHESIZER ONLINE');
    } else {
      logTerminalEvent('AUDIO SUBSYSTEM MUTED');
    }
  }

  if (soundBtn) {
    soundBtn.addEventListener('click', toggleSound);
  }

  return {
    click: () => playTone(600, 'triangle', 0.04, 0.03),
    hover: () => playTone(320, 'sine', 0.03, 0.02),
    reveal: () => playTone(750, 'sawtooth', 0.08, 0.04),
    success: () => {
      playTone(520, 'sine', 0.1, 0.05);
      setTimeout(() => playTone(1040, 'sine', 0.15, 0.05), 80);
    }
  };
}


/**
 * Navigation ScrollSpy & smooth scroll links
 */
function initNavigation() {
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-pill-link');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 200;

    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { passive: true });
}


/**
 * Industries Radial Network Interactivity (Ultra Pro Max HUD Controller)
 */
function initIndustriesInteractivity(soundSystem) {
  const container = document.querySelector('.industries-right');
  const nodes = document.querySelectorAll('.radial-node');
  const cards = document.querySelectorAll('.industry-card');
  const centerHub = document.getElementById('center-hub');
  const hud = document.getElementById('industry-hud-intel');
  const hudCode = document.getElementById('hud-sector-code');
  const hudTitle = document.getElementById('hud-title');
  const hudBody = document.getElementById('hud-body');
  const hudMetric = document.getElementById('hud-metric');

  // Sector Intelligence Metadata Map
  const sectorData = {
    realestate: {
      code: 'SECTOR: PROP-TECH // ARCHITECTURAL AI',
      title: 'Real Estate & Spatial Digital Twins',
      body: 'Autonomous 3D spatial valuation, photorealistic digital twin rendering, and 24/7 AI-driven investor lead qualification and deal matching.',
      metric: 'IMPACT METRIC: +340% DEAL VELOCITY // 99.8% PRECISION',
      beam: 'realestate',
      color: '#10B981'
    },
    restaurants: {
      code: 'SECTOR: HOSPITALITY & F&B // KITCHEN AI',
      title: 'Predictive Kitchen & Guest Intelligence',
      body: 'Dynamic inventory forecasting, AI-powered reservation orchestration, automated prep scheduling, and zero-leakage kitchen telemetry.',
      metric: 'IMPACT METRIC: -28% FOOD WASTE // +18% TABLE TURNOVER',
      beam: 'restaurants',
      color: '#F97316'
    },
    logistics: {
      code: 'SECTOR: SUPPLY CHAIN & FREIGHT // GLOBAL EDGE',
      title: 'Autonomous Freight & Route Optimization',
      body: 'Multi-modal real-time dispatch, cold-chain sensor analytics, automated customs compliance, and sub-second fleet routing algorithms.',
      metric: 'IMPACT METRIC: 99.98% ON-TIME DISPATCH // -22% FUEL COST',
      beam: 'logistics',
      color: '#3B82F6'
    },
    retail: {
      code: 'SECTOR: RETAIL & OMNI-COMMERCE // STORE MATRIX',
      title: 'Hyper-Personalized Recommendation AI',
      body: 'Computer-vision frictionless checkout, automated RFID replenishment, live customer intent heatmaps, and unified omnichannel sync.',
      metric: 'IMPACT METRIC: +42% BASKET SIZE // 4.1X RETENTION',
      beam: 'retail',
      color: '#EC4899'
    },
    finance: {
      code: 'SECTOR: FINANCE & SOVEREIGN WEALTH // FINTECH',
      title: 'Zero-Trust Sub-Millisecond Risk Ledger',
      body: 'High-frequency algorithmic fraud mitigation, continuous portfolio stress testing, sovereign regulatory bots, and instant clearing.',
      metric: 'IMPACT METRIC: <0.5MS RISK SETTLEMENT // 99.999% INTEGRITY',
      beam: 'finance',
      color: '#8B5CF6'
    },
    ecommerce: {
      code: 'SECTOR: E-COMMERCE & MARKETPLACES // CONVERSION',
      title: 'Dynamic Pricing & Checkout Multi-Agents',
      body: 'Real-time algorithmic pricing engines, neural search re-ranking, autonomous cart abandonment recovery, and instant cross-border routing.',
      metric: 'IMPACT METRIC: 3.8X CHECKOUT CONVERSION // 0.12S LATENCY',
      beam: 'ecommerce',
      color: '#00F0FF'
    }
  };

  const beams = document.querySelectorAll('.beam-active');
  const conduits = document.querySelectorAll('.conduit-glow');
  const photons = document.querySelectorAll('.photon');

  let activeSectorKey = 'realestate';
  let isUserInteracting = false;
  let cycleTimer = null;
  let idleTimer = null;

  function activateSector(key, isUser = true) {
    const data = sectorData[key];
    if (!data) return;

    activeSectorKey = key;

    // Apply focus spotlight
    if (container) {
      container.classList.add('has-focus');
    }

    // Update Nodes
    nodes.forEach((n) => {
      const match = n.getAttribute('data-node') === key;
      n.classList.toggle('active', match);
    });

    // Update Beams & Conduits
    beams.forEach((b) => {
      const match = b.getAttribute('data-beam') === key;
      b.classList.toggle('active-beam', match);
    });

    conduits.forEach((c) => {
      const match = c.id === `glow-path-${key}`;
      c.classList.toggle('active-conduit', match);
    });

    photons.forEach((p) => {
      const match = p.classList.contains(`photon-${key}`);
      p.classList.toggle('active-photon', match);
    });

    // Update HUD Content smoothly
    if (hud) {
      hud.style.borderColor = data.color;
      hud.style.boxShadow = `0 16px 40px rgba(0, 0, 0, 0.9), 0 0 30px ${data.color}33`;
    }
    if (hudCode) hudCode.textContent = data.code;
    if (hudTitle) hudTitle.textContent = data.title;
    if (hudBody) hudBody.textContent = data.body;
    if (hudMetric) {
      hudMetric.textContent = data.metric;
      hudMetric.style.color = data.color;
    }

    if (isUser) {
      logTerminalEvent(`SECTOR ACTIVE: [${data.title.toUpperCase()}]`);
    }
  }

  // Node event listeners
  nodes.forEach((node) => {
    const key = node.getAttribute('data-node');

    node.addEventListener('mouseenter', () => {
      isUserInteracting = true;
      stopAutoCycle();
      if (soundSystem && typeof soundSystem.hover === 'function') {
        soundSystem.hover();
      }
      activateSector(key, true);
    });

    node.addEventListener('click', () => {
      isUserInteracting = true;
      stopAutoCycle();
      if (soundSystem && typeof soundSystem.click === 'function') {
        soundSystem.click();
      }
      activateSector(key, true);
    });
  });

  // Reset focus when leaving the network
  if (container) {
    container.addEventListener('mouseleave', () => {
      isUserInteracting = false;
      // Start idle delay before resuming subtle auto cycle
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        if (!isUserInteracting) {
          startAutoCycle();
        }
      }, 4000);
    });
  }

  // Left Feature Cards Interactive Sync
  cards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      if (soundSystem && typeof soundSystem.hover === 'function') {
        soundSystem.hover();
      }

      if (card.id === 'card-integration') {
        // Universal integration -> light up all nodes simultaneously
        if (container) container.classList.remove('has-focus');
        nodes.forEach(n => n.classList.add('active'));
        beams.forEach(b => b.classList.add('active-beam'));
        conduits.forEach(c => c.classList.add('active-conduit'));
        photons.forEach(p => p.classList.add('active-photon'));
        if (hudTitle) hudTitle.textContent = 'Universal Integration Active';
        if (hudBody) hudBody.textContent = 'All 6 enterprise neural sectors synchronizing through the XTECH Central Core at 0.38ms synapse latency.';
      } else if (card.id === 'card-workflows') {
        // Automated Workflows -> sequential wave
        triggerSequentialWave();
      }
    });

    card.addEventListener('mouseleave', () => {
      nodes.forEach(n => n.classList.remove('active'));
      beams.forEach(b => b.classList.remove('active-beam'));
      conduits.forEach(c => c.classList.remove('active-conduit'));
      photons.forEach(p => p.classList.remove('active-photon'));
      activateSector(activeSectorKey, false);
    });

    card.addEventListener('click', () => {
      if (soundSystem && typeof soundSystem.click === 'function') {
        soundSystem.click();
      }
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });

  function triggerSequentialWave() {
    const keys = Object.keys(sectorData);
    keys.forEach((key, index) => {
      setTimeout(() => {
        activateSector(key, false);
      }, index * 220);
    });
  }

  // Auto-Cycle Demo Mode (Smoothly cycles when user is idle)
  const sectorKeys = Object.keys(sectorData);
  let cycleIndex = 0;

  function startAutoCycle() {
    stopAutoCycle();
    cycleTimer = setInterval(() => {
      if (isUserInteracting) return;
      cycleIndex = (cycleIndex + 1) % sectorKeys.length;
      activateSector(sectorKeys[cycleIndex], false);
    }, 4500);
  }

  function stopAutoCycle() {
    if (cycleTimer) {
      clearInterval(cycleTimer);
      cycleTimer = null;
    }
  }

  // Center Hub Interaction
  if (centerHub) {
    centerHub.addEventListener('mouseenter', () => {
      if (soundSystem && typeof soundSystem.hover === 'function') {
        soundSystem.hover();
      }
      logTerminalEvent('QUANTUM NEURAL CORE: 100% OPERATIONAL // ALL 6 CONDUITS SYNCHRONIZED');
      triggerSequentialWave();
    });

    centerHub.addEventListener('click', () => {
      if (soundSystem && typeof soundSystem.click === 'function') {
        soundSystem.click();
      }
      triggerSequentialWave();
    });
  }

  // Initial activation
  activateSector('realestate', false);
  startAutoCycle();
}

/**
 * Inquiry Modal Controller
 */
function openModal() {
  const modal = document.getElementById('inquiry-modal');
  if (modal) {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const nameInput = document.getElementById('form-name');
    if (nameInput) setTimeout(() => nameInput.focus(), 100);
    logTerminalEvent('MODAL OPENED: XTECH UPLINK INITIALIZED');
  }
}

function closeModal() {
  const modal = document.getElementById('inquiry-modal');
  if (modal) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    logTerminalEvent('MODAL CLOSED: STANDBY');
  }
}

function initInquiryModal(soundSystem) {
  const openBtn = document.getElementById('open-inquiry-btn');
  const closeBtn = document.getElementById('modal-close');
  const modal = document.getElementById('inquiry-modal');
  const form = document.getElementById('transmission-form');
  const feedback = document.getElementById('form-feedback');

  if (openBtn) {
    openBtn.addEventListener('click', () => {
      soundSystem.click();
      openModal();
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      soundSystem.click();
      closeModal();
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeModal();
    }
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      soundSystem.success();

      const name = document.getElementById('form-name')?.value || 'ENTERPRISE';
      const email = document.getElementById('form-email')?.value || '';
      const service = document.getElementById('form-service')?.value || '';

      if (feedback) {
        feedback.innerHTML = `[SUCCESS] XTECH MISSION PACKET DISPATCHED FOR ${name.toUpperCase()} (${email}). SLA DISPATCH WITHIN 4 HOURS.`;
        feedback.style.color = '#000000';
      }

      logTerminalEvent(`PACKET TRANSMITTED: ${name} // ${service} // OK 200`);

      setTimeout(() => {
        form.reset();
        if (feedback) feedback.innerHTML = '';
        closeModal();
      }, 2500);
    });
  }
}

/**
 * Click to Copy Direct Email
 */
function initEmailCopy(soundSystem) {
  const copyBtn = document.getElementById('copy-email-btn');
  const hint = document.getElementById('copy-hint');

  if (copyBtn && hint) {
    copyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      soundSystem.click();
      const email = copyBtn.textContent.trim();
      navigator.clipboard.writeText(email).then(() => {
        hint.textContent = '[COPIED TO CLIPBOARD ✓]';
        hint.style.fontWeight = 'bold';
        logTerminalEvent(`DIRECT UPLINK COPIED: ${email}`);
        setTimeout(() => {
          hint.textContent = '[CLICK TO COPY]';
        }, 3000);
      }).catch(() => {
        window.location.href = `mailto:${email}`;
      });
    });
  }
}

/**
 * Interactive Terminal Event Logger
 */
function logTerminalEvent(msg) {
  const term = document.getElementById('term-logs');
  if (!term) return;

  const row = document.createElement('div');
  const timestamp = new Date().toISOString().substring(11, 19);
  row.textContent = `> [${timestamp}] ${msg}`;
  term.appendChild(row);
  term.scrollTop = term.scrollHeight;
}

function initTerminalLogger() {
  logTerminalEvent('XTECHNOLOGY GROUP QATAR KINETIC CORE v2.8.0 LOADED 100% // DOHA GATEWAY ACTIVE');
}

/**
 * Headline Typing Animation (Deliberate Pace + 2.5s Infinite Loop)
 */
function initHeadlineTyping(soundSystem) {
  const line1El = document.getElementById('typing-line-1');
  const groupEl = document.getElementById('typing-group');
  const qatarEl = document.getElementById('typing-qatar');
  const headlineEl = document.getElementById('hero-title');
  if (!line1El || !groupEl || !qatarEl || !headlineEl) return;

  const text1 = 'XTECHNOLOGY';
  const textGroup = 'GROUP ';
  const textQatar = 'QATAR';

  // Activate typing mode in CSS
  headlineEl.classList.add('typing-active');

  // Wrap Line 1 characters
  line1El.innerHTML = '';
  const line1Chars = text1.split('').map(ch => {
    const span = document.createElement('span');
    span.className = 'type-char';
    span.textContent = ch;
    line1El.appendChild(span);
    return span;
  });

  // Blinking terminal cursor
  const cursor = document.createElement('span');
  cursor.className = 'type-cursor';
  cursor.setAttribute('aria-hidden', 'true');
  line1El.appendChild(cursor);

  // Wrap Line 2 group characters
  groupEl.innerHTML = '';
  const groupChars = textGroup.split('').map(ch => {
    const span = document.createElement('span');
    span.className = 'type-char';
    span.innerHTML = ch === ' ' ? '&nbsp;' : ch;
    groupEl.appendChild(span);
    return span;
  });

  // Wrap Line 2 Qatar characters
  qatarEl.innerHTML = '';
  const qatarChars = textQatar.split('').map(ch => {
    const span = document.createElement('span');
    span.className = 'type-char';
    span.textContent = ch;
    qatarEl.appendChild(span);
    return span;
  });

  const sequence = [
    ...line1Chars.map(span => ({ span, container: line1El })),
    ...groupChars.map(span => ({ span, container: groupEl })),
    ...qatarChars.map(span => ({ span, container: qatarEl }))
  ];

  let currentIdx = 0;
  const typeSpeed = 85;       // Slower deliberate typing pace
  const holdDuration = 2500;  // Pause 2.5 seconds (between 2s and 3s)
  const backspaceSpeed = 30;  // Crisp backspace speed
  const pauseBeforeType = 400;// Pause before re-typing

  let isTypingVisible = true;
  const heroSec = document.getElementById('hero');
  if (heroSec && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        isTypingVisible = entry.isIntersecting;
      }
    }, { threshold: 0 });
    observer.observe(heroSec);
  }

  function typeForward() {
    if (!isTypingVisible) {
      setTimeout(typeForward, 400);
      return;
    }

    if (currentIdx < sequence.length) {
      const item = sequence[currentIdx];
      item.span.classList.add('revealed');
      item.span.insertAdjacentElement('afterend', cursor);

      if (soundSystem && typeof soundSystem.click === 'function' && currentIdx % 2 === 0) {
        soundSystem.click();
      }

      currentIdx++;
      setTimeout(typeForward, typeSpeed);
    } else {
      // Hold full headline for 2.5s before looping
      setTimeout(eraseBackward, holdDuration);
    }
  }

  function eraseBackward() {
    if (!isTypingVisible) {
      setTimeout(eraseBackward, 400);
      return;
    }

    if (currentIdx > 0) {
      currentIdx--;
      const item = sequence[currentIdx];
      item.span.classList.remove('revealed');

      if (currentIdx > 0) {
        sequence[currentIdx - 1].span.insertAdjacentElement('afterend', cursor);
      } else {
        line1El.prepend(cursor);
      }

      setTimeout(eraseBackward, backspaceSpeed);
    } else {
      // Erase complete, brief pause then type again
      setTimeout(typeForward, pauseBeforeType);
    }
  }

  // Smooth entrance: start typing after 150ms
  setTimeout(typeForward, 150);
}

/**
 * 3D Interactive Neon Tubes Background (Kevin Levron concept)
 * Hyper-optimized 120 FPS performance pipeline
 */
async function initTubesBackground(soundSystem) {
  const canvas = document.getElementById('hero-tubes-canvas');
  const heroSection = document.getElementById('hero');
  const hintEl = document.getElementById('tubes-hint');
  if (!canvas || !heroSection) return;

  // 1. Off-screen Visibility Observer: Zero GPU/CPU waste when scrolled away
  let isHeroVisible = true;
  const heroObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      isHeroVisible = entry.isIntersecting;
    }
  }, {
    rootMargin: '100px 0px',
    threshold: 0
  });
  heroObserver.observe(heroSection);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      isHeroVisible = false;
    } else {
      const rect = heroSection.getBoundingClientRect();
      isHeroVisible = rect.bottom > 0 && rect.top < window.innerHeight;
    }
  });

  // Helper for random hex colors
  const randomColors = (count) => {
    return new Array(count)
      .fill(0)
      .map(() => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));
  };

  // High-performance curated futuristic tech palettes
  const palettes = [
    {
      tubes: ["#1182FF", "#00F0FF", "#6958D5"],
      lights: ["#1182FF", "#00F0FF", "#3B82F6", "#FFFFFF"]
    },
    {
      tubes: ["#F967FB", "#53BC28", "#6958D5"],
      lights: ["#83F36E", "#FE8A2E", "#FF008A", "#60AED5"]
    },
    {
      tubes: ["#00F0FF", "#1182FF", "#FFFFFF"],
      lights: ["#00F0FF", "#1182FF", "#E2E8F0", "#38BDF8"]
    },
    {
      tubes: ["#A855F7", "#3B82F6", "#06B6D4"],
      lights: ["#EC4899", "#8B5CF6", "#3B82F6", "#10B981"]
    },
    {
      tubes: ["#FF3366", "#33CCFF", "#FFFF33"],
      lights: ["#FF0055", "#00E5FF", "#FFE600", "#FFFFFF"]
    }
  ];

  let currentPaletteIdx = 0;
  let tubesApp = null;

  try {
    const importModule = (url) => (new Function('u', 'return import(u)'))(url);

    let module;
    try {
      module = await importModule('https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js');
    } catch (e1) {
      try {
        module = await importModule('/vendor/tubes1.min.js');
      } catch (e2) {
        console.warn('Unable to load TubesCursor module:', e1, e2);
        return;
      }
    }

    const TubesCursor = module.default;
    if (typeof TubesCursor !== 'function') return;

    // Initialize TubesCursor
    tubesApp = TubesCursor(canvas, {
      tubes: {
        colors: palettes[0].tubes,
        lights: {
          intensity: 180,
          colors: palettes[0].lights
        }
      },
      sleepRadiusX: 280,
      sleepRadiusY: 140,
      sleepTimeScale1: 0.75,
      sleepTimeScale2: 1.15
    });

    // 2. Hardware acceleration & strict DPR capping (eliminates GPU fill-rate choke)
    if (tubesApp && tubesApp.three && tubesApp.three.renderer) {
      const renderer = tubesApp.three.renderer;
      const optimalDPR = Math.min(window.devicePixelRatio || 1, 1.15);
      renderer.setPixelRatio(optimalDPR);
      renderer.powerPreference = 'high-performance';
      if (renderer.shadowMap) renderer.shadowMap.enabled = false;

      // 3. Absolute render culling when off-screen
      const originalRender = renderer.render.bind(renderer);
      renderer.render = function(scene, camera) {
        if (!isHeroVisible) return; // 0 draw calls when scrolled past hero
        return originalRender(scene, camera);
      };
    }

    // 4. Autonomous smooth orbit with 60 FPS delta-clamping
    if (tubesApp && tubesApp.three && tubesApp.tubes) {
      let lastFrameTime = 0;
      const minInterval = 1000 / 60; // 16.6ms frame limit (prevents burning cycles on 120Hz/144Hz)

      tubesApp.three.onBeforeRender = function(e) {
        if (!isHeroVisible) return;

        const now = performance.now();
        if (now - lastFrameTime < minInterval - 1) return;
        lastFrameTime = now;

        const r = tubesApp.three;
        const s = tubesApp.options || {};
        const i = tubesApp.tubes;
        if (!i || !i.target) return;

        const t = (r.size && r.size.wWidth && r.size.width) ? (r.size.wWidth / r.size.width) : 0.01;
        const radX = (s.sleepRadiusX || 280) * t;
        const radY = (s.sleepRadiusY || 140) * t;
        const timeScale1 = s.sleepTimeScale1 || 0.75;
        const timeScale2 = s.sleepTimeScale2 || 1.15;

        // Smooth ambient 3D orbit
        i.target.x = radX * Math.cos(e.elapsed * timeScale1);
        i.target.y = radY * Math.sin(e.elapsed * timeScale2);
        i.update(e);
      };
    }

    // Debounced resize handler to maintain capped pixel ratio
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (tubesApp && tubesApp.three && tubesApp.three.renderer) {
          tubesApp.three.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.15));
        }
      }, 150);
    }, { passive: true });

    // Color shifting on hero click interaction
    function shiftColors(e) {
      if (!tubesApp || !tubesApp.tubes) return;
      if (e && e.target && (e.target.closest('a') || e.target.closest('button'))) return;

      currentPaletteIdx = (currentPaletteIdx + 1) % (palettes.length + 3);

      let newTubeColors, newLightsColors;
      if (currentPaletteIdx < palettes.length) {
        newTubeColors = palettes[currentPaletteIdx].tubes;
        newLightsColors = palettes[currentPaletteIdx].lights;
      } else {
        newTubeColors = randomColors(3);
        newLightsColors = randomColors(4);
      }

      if (typeof tubesApp.tubes.setColors === 'function') {
        tubesApp.tubes.setColors(newTubeColors);
      }
      if (typeof tubesApp.tubes.setLightsColors === 'function') {
        tubesApp.tubes.setLightsColors(newLightsColors);
      }

      if (soundSystem && typeof soundSystem.click === 'function') {
        soundSystem.click();
      }

      if (hintEl) {
        hintEl.style.transform = 'scale(0.95)';
        setTimeout(() => {
          if (hintEl) hintEl.style.transform = '';
        }, 150);
      }
    }

    heroSection.addEventListener('click', shiftColors);

  } catch (error) {
    console.warn("Tubes interactive background initialization notice:", error);
  }
}



