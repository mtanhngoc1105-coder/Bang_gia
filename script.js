
/*==========================================
    INITIALIZE AOS
==========================================*/

AOS.init({
    duration: 1000,
    once: false,
    offset: 100
});

/*==========================================
    ELEMENTS
==========================================*/

const openBtn = document.getElementById("openBtn");
const cover = document.getElementById("cover");
const mainContent = document.getElementById("mainContent");
const guestInput = document.getElementById("guestName");
const welcomeGuest = document.getElementById("welcomeGuest");
const showGuest = document.getElementById("showGuest");
const musicToggle = document.getElementById("musicToggle");
const topBtn = document.getElementById("topBtn");
const bgMusic = document.getElementById("bgMusic");

/*==========================================
    MUSIC CONTROLS HELPERS
==========================================*/

function playMusic() {
    if (bgMusic) {
        bgMusic.play().then(() => {
            musicToggle.classList.add("playing");
            musicToggle.classList.remove("muted");
        }).catch(err => {
            console.log("Autoplay blocked or failed:", err);
        });
    }
}

function pauseMusic() {
    if (bgMusic) {
        bgMusic.pause();
    }
    musicToggle.classList.remove("playing");
    musicToggle.classList.add("muted");
}

/*==========================================
    OPEN INVITATION & CONFETTI
==========================================*/

openBtn.addEventListener("click", () => {
    let guest = guestInput.value.trim();
    if (guest == "") {
        guest = "Quý khách";
    }

    welcomeGuest.innerHTML = "Trân trọng kính mời <b>" + guest + "</b>";
    showGuest.innerHTML = guest;
    
    // Confetti effect
    triggerConfetti();
    
    cover.style.display = "none";
    mainContent.style.display = "block";
    
    // Play music
    playMusic();
    
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

/*==========================================
    CONFETTI EFFECT
==========================================*/

function triggerConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
    
    setTimeout(() => {
        confetti({
            particleCount: 50,
            spread: 100,
            origin: { y: 0.5 }
        });
    }, 200);
}

/*==========================================
    MUSIC TOGGLE
==========================================*/

musicToggle.addEventListener("click", (e) => {
    e.preventDefault();
    if (bgMusic.paused) {
        playMusic();
    } else {
        pauseMusic();
    }
});

/*==========================================
    FLOWER EFFECT (Falling Petals)
==========================================*/

const canvas = document.getElementById("flowerCanvas");

if (canvas) {
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

class Petal {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.size = Math.random() * 3 + 2;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 2 + 1;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = Math.random() * 0.1 - 0.05;
        this.opacity = Math.random() * 0.5 + 0.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;

        if (this.y > canvas.height) {
            this.y = -10;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        // Draw cherry blossom
        ctx.fillStyle = "#FFB6C1";
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add petal details
        ctx.fillStyle = "#FF69B4";
        for (let i = 0; i < 5; i++) {
            const angle = (i / 5) * Math.PI * 2;
            const petalX = Math.cos(angle) * this.size * 0.6;
            const petalY = Math.sin(angle) * this.size * 0.6;
            ctx.beginPath();
            ctx.arc(petalX, petalY, this.size * 0.4, 0, Math.PI * 2);
            ctx.fill();
        }
        
        ctx.restore();
    }
}

const petals = [];
for (let i = 0; i < 30; i++) {
    petals.push(new Petal());
}

function animatePetals() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let petal of petals) {
        petal.update();
        petal.draw();
    }
    
    requestAnimationFrame(animatePetals);
}

animatePetals();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
}

/*==========================================
    COUNTDOWN
==========================================*/

const targetDate = new Date("June 20, 2026 08:30:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = String(days).padStart(2, "0");
    document.getElementById("hours").innerHTML = String(hours).padStart(2, "0");
    document.getElementById("minutes").innerHTML = String(minutes).padStart(2, "0");
    document.getElementById("seconds").innerHTML = String(seconds).padStart(2, "0");

    if (distance <= 0) {
        clearInterval(countdownTimer);
        document.getElementById("days").innerHTML = "00";
        document.getElementById("hours").innerHTML = "00";
        document.getElementById("minutes").innerHTML = "00";
        document.getElementById("seconds").innerHTML = "00";
    }
}

updateCountdown();
const countdownTimer = setInterval(updateCountdown, 1000);

/*==========================================
    IMAGE SLIDER
==========================================*/

let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const slidesWrapper = document.querySelector(".slides-wrapper");
const sliderDots = document.querySelector(".slider-dots");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

// Create dots
slides.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(index));
    sliderDots.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

function updateSlider() {
    const offset = -currentSlide * 100;
    slidesWrapper.style.transform = `translateX(${offset}%)`;
    
    dots.forEach(dot => dot.classList.remove("active"));
    dots[currentSlide].classList.add("active");
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlider();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

prevBtn.addEventListener("click", prevSlide);
nextBtn.addEventListener("click", nextSlide);

// Auto-slide every 5 seconds
setInterval(nextSlide, 5000);

/*==========================================
    LIGHTBOX
==========================================*/

const galleryImages = document.querySelectorAll(".gallery-grid img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeLightbox = document.getElementById("closeLightbox");

galleryImages.forEach((img) => {
    img.addEventListener("click", () => {
        lightbox.style.display = "flex";
        lightboxImg.src = img.src;
    });
});

closeLightbox.addEventListener("click", () => {
    lightbox.style.display = "none";
});

lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = "none";
    }
});

/*==========================================
    RSVP FORM
==========================================*/

const rsvpForm = document.getElementById("rsvpForm");
const rsvpMessage = document.getElementById("rsvpMessage");

rsvpForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const name = document.getElementById("rsName").value;
    const email = document.getElementById("rsEmail").value;
    const phone = document.getElementById("rsPhone").value;
    const attend = document.getElementById("rsAttend").value;
    const message = document.getElementById("rsMessage").value;
    
    // Here you can send data to a server
    // For now, just show success message
    rsvpMessage.textContent = `Cảm ơn ${name}! Chúng tôi đã nhận được xác nhận của bạn.`;
    rsvpMessage.style.display = "block";
    
    // Reset form
    rsvpForm.reset();
    
    // Hide message after 5 seconds
    setTimeout(() => {
        rsvpMessage.style.display = "none";
    }, 5000);
});

/*==========================================
    SCROLL TO TOP
==========================================*/

window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
});

topBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

/*==========================================
    SMOOTH SCROLL
==========================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});


/*==========================================
    SCROLL ANIMATION (Handled by AOS library)
==========================================*/

// AOS library already handles scroll animations
// Comment out manual observer to avoid conflicts

/*
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, {
    threshold: 0.15
});

document.querySelectorAll("section").forEach(section => {
    section.style.opacity = "0";
    section.style.transform = "translateY(60px)";
    section.style.transition = "all 1s ease";
    observer.observe(section);
});
*/


/*==========================================
    URL GUEST NAME
==========================================*/

const params = new URLSearchParams(window.location.search);

const guestFromURL = params.get("name");

if (guestFromURL) {

    guestInput.value = decodeURIComponent(guestFromURL);

}


/*==========================================
    AUTO FOCUS INPUT
==========================================*/

window.onload = () => {

    guestInput.focus();

};
