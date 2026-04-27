/* ════════════════════════════════════════════════════════════
   Cairo Youth Academy — Scripts
   ════════════════════════════════════════════════════════════ */

// ── Sticky Nav ───────────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ── Mobile Menu ──────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ── Enroll form pre-fill from package buttons ────────────────
document.querySelectorAll('.pkg-btn, .btn').forEach(btn => {
  const href = btn.getAttribute('href');
  if (href !== '#enroll') return;
  const text = btn.textContent.trim();
  const match = text.match(/(\d+)-Week/i);
  if (!match) return;
  btn.addEventListener('click', () => {
    const value = match[1] + '-week';
    const select = document.getElementById('package');
    if (select) select.value = value;
  });
});

// ── Form submission ──────────────────────────────────────────
function handleSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('enrollForm');
  const success = document.getElementById('formSuccess');

  // Build WhatsApp message from form data
  const data = new FormData(form);
  const studentName = `${data.get('studentFirst') || ''} ${data.get('studentLast') || ''}`.trim();
  const parentName  = `${data.get('parentFirst') || ''} ${data.get('parentLast') || ''}`.trim();
  const pkg         = data.get('package') ? data.get('package').replace('-', ' ').toUpperCase() : 'Not selected';
  const age         = data.get('studentAge') || 'N/A';
  const num         = data.get('numStudents') || '1';
  const email       = data.get('email') || '';
  const phone       = data.get('phone') || '';
  const quran       = data.get('quranLevel') || 'N/A';
  const arabic      = data.get('arabicLevel') || 'N/A';
  const notes       = data.get('notes') || 'None';
  const dietary     = data.get('dietary') || 'None';

  const msg = encodeURIComponent(
    `*New Application — Cairo Youth Academy*\n\n` +
    `*Student:* ${studentName}, Age ${age}\n` +
    `*Package:* ${pkg}\n` +
    `*Number of Students:* ${num}\n\n` +
    `*Parent/Guardian:* ${parentName}\n` +
    `*Email:* ${email}\n` +
    `*Phone:* ${phone}\n\n` +
    `*Qur'an Level:* ${quran}\n` +
    `*Arabic Level:* ${arabic}\n` +
    `*Dietary:* ${dietary}\n\n` +
    `*Notes:* ${notes}`
  );

  // Open WhatsApp with pre-filled message
  window.open(`https://wa.me/15713265041?text=${msg}`, '_blank');

  // Show success state
  form.style.display = 'none';
  success.style.display = 'block';
  success.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ── Fade-in on scroll ────────────────────────────────────────
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll(
  '.intro-card, .include-item, .package-card, .intro-text, .enroll-left'
).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.intro-card, .include-item, .package-card, .intro-text, .enroll-left')
    .forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 0.08}s`;
    });
});

// Apply visible class via CSS
const style = document.createElement('style');
style.textContent = `.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(style);
