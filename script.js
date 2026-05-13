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

// ── Form submission — Netlify Forms + WhatsApp ───────────────
function handleSubmit(e) {
  e.preventDefault();

  const form    = document.getElementById('enrollForm');
  const success = document.getElementById('formSuccess');
  const submitBtn = form.querySelector('button[type="submit"]');

  // Disable button while submitting
  submitBtn.disabled = true;
  submitBtn.textContent = 'Submitting…';

  const data = new FormData(form);
  const payload = {
    "form-name":  "enrollment",
    studentFirst: data.get("studentFirst") || "",
    studentLast:  data.get("studentLast")  || "",
    studentAge:   data.get("studentAge")   || "",
    gender:       data.get("gender")       || "",
    numStudents:  data.get("numStudents")  || "",
    package:      data.get("package")      || "",
    quranLevel:   data.get("quranLevel")   || "",
    arabicLevel:  data.get("arabicLevel")  || "",
    parentFirst:  data.get("parentFirst")  || "",
    parentLast:   data.get("parentLast")   || "",
    email:        data.get("email")        || "",
    phone:        data.get("phone")        || "",
    city:         data.get("city")         || "",
    dietary:      data.get("dietary")      || "",
    medical:      data.get("medical")      || "",
    notes:        data.get("notes")        || "",
    consent:      data.get("consent") ? "Accepted" : "Not Accepted"
  };

  console.log("Submitting Payload:", payload); // Remove after verified

  // ── 1. POST to Netlify Forms ──────────────────────────────
  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(payload).toString()
  })
  .then(() => {
    // ── 2. Show success state ────────────────────────────────
    form.style.display = 'none';
    success.style.display = 'block';
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // ── 3. Also ping WhatsApp with a summary ─────────────────
    const msg = encodeURIComponent(
      `*New Application — Shabaabunaa Academy*\n\n` +
      `*Student:* ${payload.studentFirst} ${payload.studentLast}, Age ${payload.studentAge}, ${payload.gender}\n` +
      `*Package:* ${payload.package.replace('-', ' ').toUpperCase()}\n` +
      `*# of Students:* ${payload.numStudents}\n\n` +
      `*Parent:* ${payload.parentFirst} ${payload.parentLast}\n` +
      `*Email:* ${payload.email}\n` +
      `*Phone:* ${payload.phone}\n` +
      `*City:* ${payload.city}\n\n` +
      `*Qur'an Level:* ${payload.quranLevel}\n` +
      `*Arabic Level:* ${payload.arabicLevel}\n` +
      `*Dietary:* ${payload.dietary}\n` +
      `*Medical:* ${payload.medical}\n\n` +
      `*Notes:* ${payload.notes}\n` +
      `*Consent:* ${payload.consent}`
    );

    // Short delay so success state renders first
    setTimeout(() => {
      window.open(`https://wa.me/15713265041?text=${msg}`, '_blank');
    }, 800);
  })
  .catch(() => {
    // Re-enable button and show error
    submitBtn.disabled = false;
    submitBtn.innerHTML = 'Submit Application <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18"><path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"/></svg>';
    alert('Something went wrong. Please try again or message us directly on WhatsApp: +1 (571) 326-5041');
  });
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
