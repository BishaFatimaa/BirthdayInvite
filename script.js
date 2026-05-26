/* =============================================
   PARTY INVITE — SCRIPT.JS
   Animations, RSVP logic, particles, interactivity
   ============================================= */

// ========================
// STATE
// ========================
let envelopeOpened = false;
let guestCount = 1;
let attendingStatus = null;
let rsvpList = JSON.parse(localStorage.getItem('rsvpList') || '[]');

// ========================
// PARTICLE SYSTEM
// ========================
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.r = Math.random() * 1.5 + 0.3;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = -Math.random() * 0.4 - 0.1;
    this.opacity = Math.random() * 0.6 + 0.1;
    const colors = ['#c0392b', '#8b5e3c', '#c49a6c', '#c9a84c', '#e8d5b5'];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.opacity -= 0.0008;
    if (this.opacity <= 0 || this.y < -10) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.opacity;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

for (let i = 0; i < 120; i++) particles.push(new Particle());

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ========================
// AMBIENT FLOATING ICONS
// ========================
const ambientEmojis = ['🎓', '🎂', '✨', '🥂', '🎊', '🎉', '❤️', '🌹', '⭐'];
const ambientContainer = document.getElementById('ambientIcons');

function spawnAmbientIcon() {
  const el = document.createElement('div');
  el.className = 'ambient-icon';
  el.textContent = ambientEmojis[Math.floor(Math.random() * ambientEmojis.length)];
  el.style.left = Math.random() * 100 + 'vw';
  el.style.bottom = '-60px';
  el.style.fontSize = (1 + Math.random() * 1.2) + 'rem';
  el.style.animationDuration = (6 + Math.random() * 6) + 's';
  el.style.animationDelay = '0s';
  ambientContainer.appendChild(el);
  setTimeout(() => el.remove(), 12000);
}

setInterval(spawnAmbientIcon, 1800);

// ========================
// ENVELOPE OPEN
// ========================
function openEnvelope() {
  if (envelopeOpened) return;
  envelopeOpened = true;

  const wrapper = document.getElementById('envelopeWrapper');
  wrapper.classList.add('opened');
  wrapper.style.cursor = 'default';

  // Letter starts rising at 0.4s, takes 0.9s — visible at ~1.3s
  // Hold for 0.7s so user reads "You're Invited", then fade out at 2s
  setTimeout(() => {
    document.getElementById('envelopeSection').classList.add('gone');
  }, 2000);

  setTimeout(() => {
    const main = document.getElementById('inviteMain');
    main.classList.add('visible');
    triggerOpenBurst();
    createCountdown();
  }, 2400);
}

function triggerOpenBurst() {
  const emojis = ['🎉', '🎊', '✨', '🎓', '🎂', '🥂'];
  for (let i = 0; i < 18; i++) {
    setTimeout(() => {
      spawnFloatingEmoji(
        emojis[Math.floor(Math.random() * emojis.length)],
        20 + Math.random() * 60,
        70 + Math.random() * 20
      );
    }, i * 80);
  }
}

// ========================
// BURST PARTICLES (colored dots)
// ========================
function spawnBurst(x, y, count = 24) {
  const overlay = document.getElementById('burstOverlay');
  const colors = ['#c0392b', '#e74c3c', '#8b5e3c', '#c49a6c', '#c9a84c', '#e8d5b5', '#8b1a1a'];

  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'burst-particle';
    const angle = (i / count) * 360;
    const dist = 80 + Math.random() * 120;
    const rad = angle * Math.PI / 180;
    const tx = Math.cos(rad) * dist + 'px';
    const ty = Math.sin(rad) * dist + 'px';
    const size = 4 + Math.random() * 8;
    el.style.cssText = `
      left: ${x}px; top: ${y}px;
      width: ${size}px; height: ${size}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      --tx: ${tx}; --ty: ${ty};
      animation-duration: ${0.8 + Math.random() * 0.6}s;
      animation-delay: ${Math.random() * 0.1}s;
    `;
    overlay.appendChild(el);
    setTimeout(() => el.remove(), 1500);
  }
}

// ========================
// FLOATING EMOJI
// ========================
function spawnFloatingEmoji(emoji, xPercent, yPercent, sizeRem = 2.5) {
  const el = document.createElement('div');
  el.className = 'floating-emoji';
  el.textContent = emoji;
  el.style.fontSize = sizeRem + 'rem';
  el.style.left = xPercent + 'vw';
  el.style.top = yPercent + 'vh';
  el.style.animationDuration = (1.8 + Math.random() * 1.5) + 's';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3000);
}

// ========================
// ANIMATION TRIGGERS
// ========================

// Graduation cap shower
function triggerCapAnimation() {
  const caps = ['🎓', '📜', '🎉'];
  for (let i = 0; i < 15; i++) {
    setTimeout(() => {
      spawnFloatingEmoji(
        caps[Math.floor(Math.random() * caps.length)],
        5 + Math.random() * 90,
        80 + Math.random() * 15,
        1.5 + Math.random() * 2
      );
    }, i * 100);
  }
  spawnBurst(window.innerWidth / 2, window.innerHeight * 0.5);
}

// Birthday cake sparkle
function triggerCakeAnimation() {
  const party = ['🎂', '🕯️', '🎈', '🎁'];
  for (let i = 0; i < 12; i++) {
    setTimeout(() => {
      spawnFloatingEmoji(
        party[Math.floor(Math.random() * party.length)],
        10 + Math.random() * 80,
        75 + Math.random() * 20,
        1.8 + Math.random() * 1.5
      );
    }, i * 120);
  }
  // Burst at bottom center
  spawnBurst(window.innerWidth / 2, window.innerHeight * 0.8, 30);
}

// Star sparkle
function triggerStarAnimation() {
  const stars = ['✨', '⭐', '🌟', '💫'];
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      spawnFloatingEmoji(
        stars[Math.floor(Math.random() * stars.length)],
        Math.random() * 100,
        40 + Math.random() * 50,
        1 + Math.random() * 2
      );
    }, i * 80);
  }
}

// Fireworks
function triggerFireworks() {
  const points = [
    [25, 60], [50, 40], [75, 60], [35, 75], [65, 75]
  ];
  points.forEach(([xP, yP], i) => {
    setTimeout(() => {
      const x = window.innerWidth * xP / 100;
      const y = window.innerHeight * yP / 100;
      spawnBurst(x, y, 32);
      spawnFloatingEmoji('🎆', xP, yP);
    }, i * 200);
  });
}

// Confetti pop
function triggerConfetti() {
  const confetti = ['🎊', '🎉', '🎈', '🥳', '🎀'];
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      spawnFloatingEmoji(
        confetti[Math.floor(Math.random() * confetti.length)],
        5 + Math.random() * 90,
        85,
        1.5 + Math.random() * 2
      );
    }, i * 60);
  }
  spawnBurst(window.innerWidth * 0.3, window.innerHeight * 0.7, 20);
  spawnBurst(window.innerWidth * 0.7, window.innerHeight * 0.7, 20);
}

// Music notes
function triggerMusicNote() {
  const notes = ['🎵', '🎶', '🎸', '🎹', '🎺', '🎷'];
  for (let i = 0; i < 15; i++) {
    setTimeout(() => {
      spawnFloatingEmoji(
        notes[Math.floor(Math.random() * notes.length)],
        5 + Math.random() * 90,
        80 + Math.random() * 15,
        1.5 + Math.random() * 1.8
      );
    }, i * 100);
  }
}

// Detail card pulse
function pulseDetail(el) {
  el.classList.remove('pulsing');
  void el.offsetWidth; // reflow
  el.classList.add('pulsing');
  spawnBurst(
    el.getBoundingClientRect().left + el.offsetWidth / 2,
    el.getBoundingClientRect().top + el.offsetHeight / 2,
    12
  );
}

// ========================
// RSVP LOGIC
// ========================

function selectAttending(status) {
  attendingStatus = status;

  const yesBtn = document.getElementById('yesBtn');
  const noBtn  = document.getElementById('noBtn');
  const form   = document.getElementById('rsvpForm');
  const guestGroup = document.getElementById('guestCountGroup');

  yesBtn.classList.remove('selected-yes', 'selected-no');
  noBtn.classList.remove('selected-yes', 'selected-no');

  if (status === 'yes') {
    yesBtn.classList.add('selected-yes');
    guestGroup.style.display = 'block';
    triggerConfetti();
  } else {
    noBtn.classList.add('selected-no');
    guestGroup.style.display = 'none';
    guestCount = 0;
  }

  form.classList.add('active');
  form.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function changeGuest(delta) {
  guestCount = Math.max(1, Math.min(10, guestCount + delta));
  document.getElementById('guestNum').textContent = guestCount;
}

function submitRSVP() {
  const name    = document.getElementById('rsvpName').value.trim();
  const contact = document.getElementById('rsvpContact').value.trim();
  const message = document.getElementById('rsvpMessage').value.trim();
  const btnText = document.getElementById('submitBtnText');

  if (!name) { shakeInput(document.getElementById('rsvpName')); return; }
  if (!attendingStatus) { alert("Please select whether you're attending!"); return; }

  btnText.textContent = 'Sending... ✦';

  // Submit silently to Google Forms via hidden iframe (no redirect, no Google blue)
  const FORM_ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLSeknOXx34lrwbNjJtOWjDF79lo-LrQPNi8plAOVEDiXApl9xw/formResponse';

  let iframe = document.getElementById('gform-hidden-iframe');
  if (!iframe) {
    iframe = document.createElement('iframe');
    iframe.id   = 'gform-hidden-iframe';
    iframe.name = 'gform-hidden-iframe';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
  }

  const hiddenForm = document.createElement('form');
  hiddenForm.method = 'POST';
  hiddenForm.action = FORM_ACTION;
  hiddenForm.target = 'gform-hidden-iframe';
  hiddenForm.style.display = 'none';

  const fields = {
    'entry.864570240':  name,
    'entry.1924838062': contact,
    'entry.195214263':  message,
    'entry.1385304707': attendingStatus === 'yes' ? String(guestCount) : '0',
    'entry.1283384436': attendingStatus === 'yes' ? 'Yes' : 'No',
  };

  Object.entries(fields).forEach(([key, val]) => {
    const input = document.createElement('input');
    input.type  = 'hidden';
    input.name  = key;
    input.value = val;
    hiddenForm.appendChild(input);
  });

  document.body.appendChild(hiddenForm);
  hiddenForm.submit();
  document.body.removeChild(hiddenForm);

  setTimeout(() => {
    document.getElementById('rsvpFormWrap').style.display = 'none';
    const success = document.getElementById('rsvpSuccess');
    success.style.display = 'block';
    const title = document.getElementById('successTitle');
    const msg   = document.getElementById('successMsg');
    if (attendingStatus === 'yes') {
      title.textContent = 'See you there, ' + name + '! 🎉';
      msg.textContent   = "You're on the list! We can't wait to celebrate with you.";
      triggerFireworks();
      setTimeout(triggerConfetti, 600);
    } else {
      title.textContent = "We'll miss you, " + name + ' 😢';
      msg.textContent   = "Thanks for letting us know. You'll be missed!";
    }
    btnText.textContent = 'Send RSVP ✦';
  }, 800);
}

function resetRSVP() {
  attendingStatus = null;
  guestCount = 1;
  document.getElementById('rsvpFormWrap').style.display = 'block';
  document.getElementById('rsvpSuccess').style.display = 'none';
  document.getElementById('rsvpName').value = '';
  document.getElementById('rsvpContact').value = '';
  document.getElementById('rsvpMessage').value = '';
  document.getElementById('guestNum').textContent = '1';
  document.getElementById('rsvpForm').classList.remove('active');
  document.getElementById('yesBtn').classList.remove('selected-yes', 'selected-no');
  document.getElementById('noBtn').classList.remove('selected-yes', 'selected-no');
  document.getElementById('guestCountGroup').style.display = 'none';
}

function shakeInput(el) {
  el.style.animation = 'none';
  el.style.borderColor = '#e74c3c';
  el.style.boxShadow = '0 0 15px rgba(231,76,60,0.5)';
  el.style.animation = 'shake 0.4s ease';
  setTimeout(() => {
    el.style.animation = '';
    el.style.borderColor = '';
    el.style.boxShadow = '';
  }, 600);
}

// Add shake keyframe dynamically
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%  { transform: translateX(-8px); }
    40%  { transform: translateX(8px); }
    60%  { transform: translateX(-5px); }
    80%  { transform: translateX(5px); }
  }
`;
document.head.appendChild(shakeStyle);

// ========================
// SCROLL-REVEAL
// ========================
const revealEls = document.querySelectorAll('.details-card, .about-content, .icons-section, .rsvp-card');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  observer.observe(el);
});

// ========================
// COUNTDOWN BANNER (shows once envelope is opened)
// ========================
function createCountdown() {
  const partyDate = new Date('2026-05-27T17:30:00');

  function getTimeLeft() {
    const now  = new Date();
    const diff = partyDate - now;
    if (diff <= 0) return null;
    const days    = Math.floor(diff / 86400000);
    const hours   = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return { days, hours, minutes, seconds };
  }

  const banner = document.createElement('div');
  banner.id = 'countdownBanner';
  banner.style.cssText = `
    position: sticky;
    top: 0;
    z-index: 50;
    background: linear-gradient(90deg, #0d0905, #1a0c06, #0d0905);
    border-bottom: 1px solid rgba(192,57,43,0.4);
    padding: 0.7rem 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;
    font-family: 'Bebas Neue', sans-serif;
    letter-spacing: 0.2em;
    font-size: 1rem;
  `;

  function renderCountdown() {
    const t = getTimeLeft();
    if (!t) {
      banner.innerHTML = `<span style="color:#c0392b">🎉 The Party Is NOW! 🎉</span>`;
      return;
    }
    banner.innerHTML = `
      <span style="color:#8b5e3c;font-size:0.65rem;letter-spacing:0.3em;">PARTY STARTS IN</span>
      ${renderUnit(t.days, 'DAYS')}
      <span style="color:rgba(192,57,43,0.4)">:</span>
      ${renderUnit(t.hours, 'HRS')}
      <span style="color:rgba(192,57,43,0.4)">:</span>
      ${renderUnit(t.minutes, 'MIN')}
      <span style="color:rgba(192,57,43,0.4)">:</span>
      ${renderUnit(t.seconds, 'SEC')}
    `;
  }

  function renderUnit(val, label) {
    return `
      <span style="display:flex;flex-direction:column;align-items:center;gap:0.1rem;">
        <span style="color:#e8d5b5;font-size:1.4rem;">${String(val).padStart(2,'0')}</span>
        <span style="color:#6b3a2a;font-size:0.5rem;letter-spacing:0.25em;">${label}</span>
      </span>
    `;
  }

  renderCountdown();
  setInterval(renderCountdown, 1000);

  document.getElementById('inviteMain').prepend(banner);
}

// (countdown is now called inside openEnvelope directly)

// ========================
// CURSOR SPARKLE TRAIL
// ========================
let lastSparkle = 0;
document.addEventListener('mousemove', (e) => {
  const now = Date.now();
  if (now - lastSparkle < 60) return;
  lastSparkle = now;

  const el = document.createElement('div');
  el.style.cssText = `
    position: fixed;
    left: ${e.clientX}px;
    top: ${e.clientY}px;
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #c0392b;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    animation: sparkleOut 0.7s ease forwards;
  `;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 700);
});

const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
  @keyframes sparkleOut {
    0%   { opacity: 0.8; transform: translate(-50%, -50%) scale(1); }
    100% { opacity: 0;   transform: translate(-50%, -50%) scale(0.2) translateY(-15px); }
  }
`;
document.head.appendChild(sparkleStyle);
