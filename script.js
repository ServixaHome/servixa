// ========================================
// SERVIXA HOME - Main JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- NAVBAR SCROLL ----
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  // ---- HAMBURGER MENU ----
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // ---- ACTIVE NAV LINK ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ---- SCROLL ANIMATIONS ----
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

  // ---- COUNTER ANIMATION ----
  const counters = document.querySelectorAll('.counter');
  if (counters.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
  }

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.round(current) + suffix;
      if (current >= target) clearInterval(timer);
    }, 16);
  }

  // ---- BOOKING FORM ----
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = bookingForm.querySelector('button[type="submit"]');
      const alert = document.getElementById('formAlert');

      btn.textContent = 'Booking...';
      btn.disabled = true;

      // Simulate WhatsApp redirect with form data
      const name = document.getElementById('name')?.value || '';
      const phone = document.getElementById('phone')?.value || '';
      const service = document.getElementById('service')?.value || '';
      const date = document.getElementById('date')?.value || '';
      const address = document.getElementById('address')?.value || '';

      const message = `Hello Servixa Home! 🙏\n\nNew Booking Request:\n👤 Name: ${name}\n📞 Phone: ${phone}\n🔧 Service: ${service}\n📅 Date: ${date}\n📍 Address: ${address}\n\nPlease confirm my appointment.`;

      setTimeout(() => {
        const encoded = encodeURIComponent(message);
        window.open(`https://wa.me/919876543210?text=${encoded}`, '_blank');

        btn.textContent = 'Book Service';
        btn.disabled = false;

        if (alert) {
          alert.className = 'alert success';
          alert.textContent = '✅ Redirecting to WhatsApp! Our team will confirm shortly.';
          setTimeout(() => alert.className = 'alert', 5000);
        }

        bookingForm.reset();
      }, 800);
    });
  }

  // ---- SMOOTH SCROLL ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- FAQ ACCORDION ----
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    }
  });

  // ---- MINI LIGHTBOX for service images ----
  document.querySelectorAll('[data-lightbox]').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      const overlay = document.createElement('div');
      overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.92);z-index:9999;display:flex;align-items:center;justify-content:center;cursor:zoom-out;animation:fadeIn 0.2s ease';
      const clone = img.cloneNode();
      clone.style.cssText = 'max-width:90vw;max-height:90vh;border-radius:12px;box-shadow:0 40px 80px rgba(0,0,0,0.6)';
      overlay.appendChild(clone);
      overlay.addEventListener('click', () => overlay.remove());
      document.body.appendChild(overlay);
    });
  });

});
