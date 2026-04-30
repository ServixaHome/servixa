// ===== SERVIXA HOME - MAIN JAVASCRIPT =====

// Page Loader
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('page-loader');
    if (loader) { loader.classList.add('hide'); setTimeout(() => loader.remove(), 400); }
  }, 1000);
});

// Mobile Nav Toggle
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelector('.nav-links');
const menuSpans = document.querySelectorAll('.nav-menu span');

if (navMenu) {
  navMenu.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const isOpen = navLinks.classList.contains('open');
    if (menuSpans.length === 3) {
      if (isOpen) {
        menuSpans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        menuSpans[1].style.opacity = '0';
        menuSpans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        menuSpans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    }
  });

  // Close nav when link clicked
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuSpans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });
}

// Back to Top
const backTop = document.querySelector('.back-top');
if (backTop) {
  window.addEventListener('scroll', () => {
    backTop.classList.toggle('show', window.scrollY > 300);
  });
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// Scroll Animations
const fadeEls = document.querySelectorAll('.fade-in');
if (fadeEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  fadeEls.forEach(el => observer.observe(el));
}

// FAQ Toggle
document.querySelectorAll('.faq-question').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.parentElement;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// Active Nav Link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// Booking Form Handler
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
  bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '⏳ Booking...';
    btn.disabled = true;

    // Collect form data
    const data = new FormData(this);
    const name = data.get('name') || '';
    const phone = data.get('phone') || '';
    const service = data.get('service') || '';
    const date = data.get('date') || '';
    const time = data.get('time') || '';
    const address = data.get('address') || '';
    const notes = data.get('notes') || '';

    // Build WhatsApp message
    const msg = `🔧 *New Booking - Servixa Home*\n\n👤 *Name:* ${name}\n📞 *Phone:* ${phone}\n🛠️ *Service:* ${service}\n📅 *Date:* ${date}\n⏰ *Time:* ${time}\n📍 *Address:* ${address}\n📝 *Notes:* ${notes || 'None'}`;
    
    setTimeout(() => {
      // Open WhatsApp
      window.open(`https://wa.me/918779694303?text=${encodeURIComponent(msg)}`, '_blank');

      // Show success
      const successDiv = document.getElementById('bookingSuccess');
      if (successDiv) {
        successDiv.style.display = 'flex';
        bookingForm.style.display = 'none';
      }
      
      btn.innerHTML = '✅ Booking Sent!';
      btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        btn.style.background = '';
        bookingForm.reset();
      }, 3000);
    }, 1500);
  });
}

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const data = new FormData(this);
    const name = data.get('name') || '';
    const phone = data.get('phone') || '';
    const msg = data.get('message') || '';
    const waMsg = `Hi Servixa Home!\n\n👤 *Name:* ${name}\n📞 *Phone:* ${phone}\n💬 *Message:* ${msg}`;
    window.open(`https://wa.me/918779694303?text=${encodeURIComponent(waMsg)}`, '_blank');
  });
}

// Counter Animation
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1500;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current) + (el.dataset.suffix || '');
  }, 16);
}

const counterEls = document.querySelectorAll('[data-target]');
if (counterEls.length) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  });
  counterEls.forEach(el => counterObserver.observe(el));
}

// Set minimum booking date to today
const dateInput = document.getElementById('date');
if (dateInput) {
  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);
}

// Smooth reveal on page load
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  setTimeout(() => { document.body.style.opacity = '1'; }, 100);
});
