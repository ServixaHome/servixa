/* =====================================================
   SERVIXA HOME v2 — Main JavaScript
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- NAVBAR SCROLL ---- */
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 24);
  }, { passive: true });

  /* ---- BURGER MENU ---- */
  const burger = document.querySelector('.burger');
  const navMenu = document.querySelector('.nav-menu');
  burger?.addEventListener('click', () => {
    burger.classList.toggle('open');
    navMenu.classList.toggle('open');
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
  });
  navMenu?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      burger?.classList.remove('open');
      navMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ---- ACTIVE NAV LINK ---- */
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  /* ---- SCROLL REVEAL ---- */
  const ro = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('up'), i * 70);
        ro.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => ro.observe(el));

  /* ---- COUNTER ANIMATION ---- */
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animCount(e.target);
        counterObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.ctr').forEach(el => counterObs.observe(el));

  function animCount(el) {
    const target = +el.dataset.to || 0;
    const suffix = el.dataset.suf || '';
    const dur = 1600;
    let start = null;
    const step = ts => {
      if (!start) start = ts;
      const prog = Math.min((ts - start) / dur, 1);
      const ease = 1 - Math.pow(1 - prog, 3);
      el.textContent = Math.round(ease * target) + suffix;
      if (prog < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* ---- BOOKING FORM ---- */
  const bForm = document.getElementById('bookForm');
  bForm?.addEventListener('submit', e => {
    e.preventDefault();
    const btn = bForm.querySelector('.submit-btn');
    const al = document.getElementById('formAlert');

    const name     = document.getElementById('fname')?.value || '';
    const phone    = document.getElementById('fphone')?.value || '';
    const service  = document.getElementById('fservice')?.value || '';
    const brand    = document.getElementById('fbrand')?.value || '';
    const date     = document.getElementById('fdate')?.value || '';
    const address  = document.getElementById('faddress')?.value || '';
    const problem  = document.getElementById('fproblem')?.value || '';

    btn.textContent = '⏳ Sending...';
    btn.disabled = true;

    const msg = `🙏 *Servixa Home Booking Request*\n\n👤 *Name:* ${name}\n📞 *Phone:* ${phone}\n🔧 *Service:* ${service}\n🏷️ *Brand:* ${brand}\n📅 *Date:* ${date}\n📍 *Address:* ${address}\n💬 *Problem:* ${problem || 'Not specified'}\n\n_Kindly confirm my appointment. Thank you!_`;

    setTimeout(() => {
      const url = 'https://wa.me/918779694303?text=' + encodeURIComponent(msg);
      window.open(url, '_blank');

      if (al) { al.className = 'alert ok'; al.textContent = '✅ WhatsApp खुल गया! हमारी टीम जल्द confirm करेगी।'; setTimeout(() => al.className = 'alert', 6000); }
      btn.textContent = '📅 Book Service';
      btn.disabled = false;
      bForm.reset();
    }, 700);
  });

  /* ---- CONTACT FORM ---- */
  const cForm = document.getElementById('contactForm');
  cForm?.addEventListener('submit', e => {
    e.preventDefault();
    const name = cForm.querySelector('[name="cname"]')?.value || '';
    const phone = cForm.querySelector('[name="cphone"]')?.value || '';
    const msg_  = cForm.querySelector('[name="cmsg"]')?.value || '';
    const txt = `🙏 *Servixa Home Enquiry*\n\n👤 Name: ${name}\n📞 Phone: ${phone}\n💬 Message: ${msg_}`;
    window.open('https://wa.me/918779694303?text=' + encodeURIComponent(txt), '_blank');
    cForm.reset();
  });

  /* ---- FAQ ACCORDION ---- */
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ---- REVIEW FILTER ---- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      document.querySelectorAll('.r-card[data-cat]').forEach(card => {
        card.style.display = (cat === 'all' || card.dataset.cat === cat) ? '' : 'none';
      });
    });
  });

  /* ---- DATE MIN ---- */
  const dateI = document.getElementById('fdate');
  if (dateI) dateI.min = new Date().toISOString().split('T')[0];

  /* ---- SMOOTH SCROLL ---- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  /* ---- TYPING EFFECT for hero subheading (optional) ---- */
  const typer = document.getElementById('typer');
  if (typer) {
    const words = ['AC Repair', 'Washing Machine', 'Carpenter Work', 'All Home Services'];
    let wi = 0, ci = 0, del = false;
    function type() {
      const w = words[wi];
      typer.textContent = del ? w.slice(0, ci--) : w.slice(0, ci++);
      if (!del && ci > w.length)     { del = true; setTimeout(type, 1400); return; }
      if ( del && ci < 0)            { del = false; wi = (wi + 1) % words.length; }
      setTimeout(type, del ? 55 : 90);
    }
    type();
  }

});
