/**
 * SERVIXA HOME - CORE JAVASCRIPT
 * Focus: Performance, SEO, and User Interaction
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. STICKY NAVBAR & SCROLL PROGRESS
    const header = document.querySelector('header');
    const scrollThreshold = 80;

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
            // Header ko thoda chhota aur transparent white karne ke liye logic
            header.style.padding = '10px 0';
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.classList.remove('scrolled');
            header.style.padding = '20px 0';
            header.style.background = '#ffffff';
        }
    });

    // 2. SMOOTH SCROLLING FOR NAVIGATION LINKS (SEO Best Practice)
    // Isse user experience behtar hota hai aur Google ise positive signal manta hai
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 3. LAZY LOADING FOR IMAGES
    // Isse website ki initial loading speed badh jati hai (Lighthouse Score boost)
    const lazyImages = document.querySelectorAll('img');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    // Agar placeholder use kar rahe hain toh yahan src swap hoga
                    imageObserver.unobserve(image);
                }
            });
        });
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // 4. SIMPLE ACCORDION FOR FAQ (SEO Rich Snippets Support)
    const faqItems = document.querySelectorAll('.faq-item h4');
    faqItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
            const p = item.nextElementSibling;
            if (p.style.display === 'block') {
                p.style.display = 'none';
            } else {
                p.style.display = 'block';
            }
        });
    });

    // 5. CALL TO ACTION TRACKER (Optional for Analytics)
    const ctaButtons = document.querySelectorAll('.btn-gold');
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            console.log('User initiated a service request.');
            // Yahan aap Google Analytics ya Facebook Pixel ka code add kar sakte hain
        });
    });

    // 6. MINIMAL REVEAL ANIMATION (Performance over heavy libraries)
    const revealOnScroll = () => {
        const reveals = document.querySelectorAll('.service-card, .about-text, .faq-item');
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].style.opacity = '1';
                reveals[i].style.transform = 'translateY(0)';
            }
        }
    };
    
    // Initial style for revealed elements
    const elementsToAnimate = document.querySelectorAll('.service-card, .about-text, .faq-item');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
    });

    window.addEventListener('scroll', revealOnScroll);

});
