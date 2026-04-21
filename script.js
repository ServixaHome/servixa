// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener("scroll", function () {
    let header = document.querySelector("header");
    header.classList.toggle("scrolled", window.scrollY > 50);
});


// ===== SMOOTH SCROLL =====
document.querySelectorAll("a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href"))
        .scrollIntoView({
            behavior: "smooth"
        });
    });
});


// ===== SCROLL REVEAL ANIMATION =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.2
});

document.querySelectorAll(".card, .section, .hero-text").forEach(el => {
    observer.observe(el);
});


// ===== BUTTON CLICK EFFECT =====
document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", () => {
        btn.style.transform = "scale(0.95)";
        setTimeout(() => {
            btn.style.transform = "scale(1)";
        }, 150);
    });
});


// ===== FORM SUCCESS MESSAGE =====
const form = document.querySelector("form");

if(form){
form.addEventListener("submit", function () {

    setTimeout(() => {
        alert("✅ Booking Submitted! We will contact you soon.");
    }, 500);

});
}


// ===== LAZY IMAGE EFFECT =====
const images = document.querySelectorAll("img");

images.forEach(img => {
    img.style.opacity = "0";
});

window.addEventListener("load", () => {
    images.forEach(img => {
        img.style.transition = "1s";
        img.style.opacity = "1";
    });
});


// ===== WHATSAPP AUTO MESSAGE =====
const whatsappBtn = document.querySelector(".whatsapp");

if (whatsappBtn) {
    whatsappBtn.addEventListener("click", () => {
        let message = encodeURIComponent(
            "Hello Servixa Home, mujhe service chahiye (AC / Washing Machine / Carpenter)"
        );
        window.open(`https://wa.me/918779694303?text=${message}`, "_blank");
    });
}