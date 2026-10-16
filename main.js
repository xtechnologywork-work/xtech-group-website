import { initLightRays } from './light-rays.js';

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

  // 5.1 OUR PRODUCTS BY XTECH INTERACTION
  initProductsInteractivity(soundSystem);

  // 6. INQUIRY MODAL & FORM TRANSMISSION
  initInquiryModal(soundSystem);

  // 7. DIRECT EMAIL COPY
  initEmailCopy(soundSystem);

  // 8. TERMINAL STREAM LOGGER
  initTerminalLogger();


  // 10. HEADLINE TYPING ANIMATION (DELIBERATE PACE // 2.5S LOOP)
  initHeadlineTyping(soundSystem);

  // 11. WEBGL ATMOSPHERIC LIGHT RAYS BACKGROUND (OGL ENGINE)
  initHeroLightRays(soundSystem);
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
 * Industries Radial Network Interactivity
 */
function initIndustriesInteractivity(soundSystem) {
  const nodes = document.querySelectorAll('.radial-node');
  const cards = document.querySelectorAll('.industry-card');
  const centerHub = document.getElementById('center-hub');

  nodes.forEach((node) => {
    node.addEventListener('mouseenter', () => {
      if (soundSystem && typeof soundSystem.hover === 'function') {
        soundSystem.hover();
      }
      const label = node.querySelector('.node-pill')?.textContent;
      if (label) {
        logTerminalEvent(`INTELLIGENCE NODE ACTIVE: [${label.trim()}]`);
      }
    });

    node.addEventListener('click', () => {
      if (soundSystem && typeof soundSystem.click === 'function') {
        soundSystem.click();
      }
      nodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');
    });
  });

  cards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      if (soundSystem && typeof soundSystem.hover === 'function') {
        soundSystem.hover();
      }
    });

    card.addEventListener('click', () => {
      if (soundSystem && typeof soundSystem.click === 'function') {
        soundSystem.click();
      }
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const title = card.querySelector('.card-title')?.textContent;
      if (title) {
        logTerminalEvent(`CAPABILITY SELECTED: [${title.trim().toUpperCase()}]`);
      }
    });
  });

  if (centerHub) {
    centerHub.addEventListener('mouseenter', () => {
      if (soundSystem && typeof soundSystem.hover === 'function') {
        soundSystem.hover();
      }
      logTerminalEvent('XTECH NEURAL CORE: NOMINAL 100% OPERATIONAL');
    });
  }
}

/**
 * Our Products by Xtech Interactivity
 */
function initProductsInteractivity(soundSystem) {
  const cards = document.querySelectorAll('.product-card');
  cards.forEach(card => {
    const prodName = card.querySelector('.product-name')?.textContent || 'PRODUCT';
    card.addEventListener('mouseenter', () => {
      if (soundSystem && typeof soundSystem.hover === 'function') {
        soundSystem.hover();
      }
      logTerminalEvent(`PRODUCT VENTURE INSPECTED: [${prodName.trim()}]`);
    });

    const actionBtn = card.querySelector('.product-action-btn');
    if (actionBtn) {
      actionBtn.addEventListener('click', () => {
        if (soundSystem && typeof soundSystem.click === 'function') {
          soundSystem.click();
        }
      });
    }
  });
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
 * WebGL Atmospheric Light Rays Background Engine (OGL Accelerated)
 * Cinematic lighting responding to mouse movement and ambient organic flow.
 */
function initHeroLightRays(soundSystem) {
  const container = document.getElementById('hero-light-rays');
  const heroSection = document.getElementById('hero');
  const hintEl = document.getElementById('rays-hint');
  if (!container || !heroSection) return;

  const colorSpectrums = [
    { name: 'SOVEREIGN CYAN', hex: '#00F0FF' },
    { name: 'ROYAL XTECH BLUE', hex: '#1182FF' },
    { name: 'QUANTUM EMERALD', hex: '#00FFCC' },
    { name: 'NEURAL INDIGO', hex: '#6366F1' },
    { name: 'SKY PLATINUM', hex: '#38BDF8' },
    { name: 'SOLAR LIGHT', hex: '#FFFFFF' }
  ];

  let currentSpectrumIdx = 0;

  // Initialize LightRays with the user-specified prompt parameters
  const rays = initLightRays(container, {
    raysOrigin: 'top-center',
    raysColor: colorSpectrums[0].hex,
    raysSpeed: 1.5,
    lightSpread: 1.2,
    rayLength: 1.8,
    followMouse: true,
    mouseInfluence: 0.28,
    noiseAmount: 0.03,
    distortion: 0.08,
    fadeDistance: 1.2,
    saturation: 1.0,
    pulsating: false
  });

  if (!rays) return;

  // Click on hero or hint pill to shift atmospheric color spectrum
  function shiftSpectrum(e) {
    if (e && e.target && (e.target.closest('a') || e.target.closest('button') || e.target.closest('.hero-emblem-badge'))) return;

    currentSpectrumIdx = (currentSpectrumIdx + 1) % colorSpectrums.length;
    const nextSpectrum = colorSpectrums[currentSpectrumIdx];

    rays.setColor(nextSpectrum.hex);

    if (soundSystem && typeof soundSystem.click === 'function') {
      soundSystem.click();
    }

    logTerminalEvent(`ATMOSPHERIC LIGHT SHIFT: [${nextSpectrum.name}]`);

    if (hintEl) {
      hintEl.style.transform = 'scale(0.95)';
      const label = hintEl.querySelector('.hint-label');
      if (label) label.textContent = `${nextSpectrum.name} ACTIVE`;
      setTimeout(() => {
        if (hintEl) hintEl.style.transform = '';
      }, 150);
    }
  }

  heroSection.addEventListener('click', shiftSpectrum);
}



