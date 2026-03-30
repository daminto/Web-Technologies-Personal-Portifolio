/* =========================================
   script.js — Macdonald Tanatswa Pazuwa Portfolio
   Description: Navigation, typed text, form validation
   ========================================= */

/* ===== 1. TYPED.JS ANIMATED TEXT ===== */
const typed = new Typed('.multiple-text', {
  strings: [
    'Web - Developer',
    'Information Security Enthusiast',
    'Graphics Designer',
  ],
  typeSpeed: 70,
  backSpeed: 50,
  backDelay: 1800,
  loop: true,
});

/* ===== 2. MOBILE NAVIGATION TOGGLE ===== */
const menuBtn   = document.getElementById('menu-icon');
const navbar    = document.querySelector('.navbar');
const navLinks  = document.querySelectorAll('.navbar a');

function closeNav() {
  navbar.classList.remove('active');
  menuBtn.setAttribute('aria-expanded', 'false');
  menuBtn.querySelector('i').className = 'bx bx-menu';
}

function openNav() {
  navbar.classList.add('active');
  menuBtn.setAttribute('aria-expanded', 'true');
  menuBtn.querySelector('i').className = 'bx bx-x';
}

menuBtn.addEventListener('click', () => {
  const isOpen = navbar.classList.contains('active');
  isOpen ? closeNav() : openNav();
});

// Close nav when a link is clicked
navLinks.forEach(link => link.addEventListener('click', closeNav));

// Close nav when clicking outside
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target) && !menuBtn.contains(e.target)) {
    closeNav();
  }
});

/* ===== 3. HEADER SCROLL SHADOW ===== */
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  highlightNavLink();
});

/* ===== 4. ACTIVE NAV LINK ON SCROLL ===== */
const sections = document.querySelectorAll('section');

function highlightNavLink() {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.navbar a[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(a => a.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

/* ===== 5. SET FOOTER YEAR AUTOMATICALLY ===== */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ===== 6. CONTACT FORM VALIDATION ===== */
const form        = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // hold submission until we validate
    let valid = true;

    // Helper: show / clear error
    const setError = (id, msg) => {
      const el = document.getElementById(id);
      if (el) el.textContent = msg;
    };

    // --- Name (required) ---
    const name = form.fullName.value.trim();
    if (name.length < 2) {
      setError('nameError', 'Please enter your full name (at least 2 characters).');
      valid = false;
    } else {
      setError('nameError', '');
    }

    // --- Email (required) ---
    const email = form.email.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('emailError', 'Please enter a valid email address.');
      valid = false;
    } else {
      setError('emailError', '');
    }

    // --- Phone (required) ---
    const phone = form.phone.value.trim();
    if (!phone) {
      setError('phoneError', 'Please enter your phone number.');
      valid = false;
    } else if (!/^[\+]?[0-9\s\-]{7,15}$/.test(phone)) {
      setError('phoneError', 'Please enter a valid phone number.');
      valid = false;
    } else {
      setError('phoneError', '');
    }

    // --- Subject (required) ---
    const subject = form.subject.value.trim();
    if (subject.length < 3) {
      setError('subjectError', 'Please enter a subject (at least 3 characters).');
      valid = false;
    } else {
      setError('subjectError', '');
    }

    // --- Message (required) ---
    const message = form.message.value.trim();
    if (message.length < 10) {
      setError('messageError', 'Please write a message (at least 10 characters).');
      valid = false;
    } else {
      setError('messageError', '');
    }

    // All fields valid — submit the form for real (sends to email via FormSubmit)
    if (valid) {
      form.submit();
    }
  });
}
