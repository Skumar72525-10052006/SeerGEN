/* ========================================
   SeerGen Technologies - Enhanced JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', function () {
    initCursorGlow();
    initNavbar();
    initMobileMenu();
    initScrollAnimations();
    initSmoothScroll();
    initContactForm();
    initParallaxEffects();
    initCounterAnimation();
    initTiltEffect();
});

/* ========================================
   Cursor Glow Effect
   ======================================== */

function initCursorGlow() {
    // Only on desktop
    if (window.innerWidth < 768) return;

    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;
        glow.style.left = glowX + 'px';
        glow.style.top = glowY + 'px';
        requestAnimationFrame(animate);
    }
    animate();

    // Hide when leaving window
    document.addEventListener('mouseleave', () => glow.style.opacity = '0');
    document.addEventListener('mouseenter', () => glow.style.opacity = '1');
}

/* ========================================
   Navbar Scroll Effect
   ======================================== */

function initNavbar() {
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/* ========================================
   Mobile Menu Toggle
   ======================================== */

function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');

            const spans = mobileMenuBtn.querySelectorAll('span');
            if (mobileMenuBtn.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function () {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
}

/* ========================================
   Scroll Animations with Stagger
   ======================================== */

function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay based on element order
                const delay = entry.target.style.animationDelay || `${index * 0.1}s`;
                entry.target.style.transitionDelay = delay;
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));
}

/* ========================================
   Smooth Scroll
   ======================================== */

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ========================================
   Contact Form
   ======================================== */

function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            if (!data.name || !data.email || !data.type) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;

            setTimeout(() => {
                showNotification('Thank you! We\'ll get back to you soon.', 'success');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

/* ========================================
   Notification System
   ======================================== */

function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) existingNotification.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
            <span class="notification-message">${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">×</button>
    `;

    const colors = {
        success: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
        error: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
        info: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)'
    };

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        padding: 16px 24px;
        background: ${colors[type]};
        color: white;
        border-radius: 16px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.3), 0 0 30px ${type === 'success' ? 'rgba(16,185,129,0.3)' : type === 'error' ? 'rgba(239,68,68,0.3)' : 'rgba(37,99,235,0.3)'};
        animation: slideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        max-width: 400px;
        backdrop-filter: blur(10px);
    `;

    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(120%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(120%); opacity: 0; }
            }
            .notification-content { display: flex; align-items: center; gap: 12px; }
            .notification-icon { font-size: 20px; font-weight: bold; }
            .notification-message { font-size: 14px; font-weight: 500; }
            .notification-close { 
                background: rgba(255,255,255,0.2); 
                border: none; 
                color: white; 
                font-size: 18px; 
                cursor: pointer;
                width: 28px;
                height: 28px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s;
            }
            .notification-close:hover { background: rgba(255,255,255,0.3); transform: scale(1.1); }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOut 0.3s ease-out forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

/* ========================================
   Parallax Effects
   ======================================== */

function initParallaxEffects() {
    const hero = document.querySelector('.hero');
    const floatingElements = document.querySelector('.floating-elements');

    if (hero && floatingElements) {
        window.addEventListener('scroll', function () {
            const scrolled = window.pageYOffset;
            const heroHeight = hero.offsetHeight;

            if (scrolled < heroHeight) {
                floatingElements.style.transform = `translateY(${scrolled * 0.4}px)`;
            }
        });
    }

    // Mouse move parallax for particles
    if (hero) {
        hero.addEventListener('mousemove', function (e) {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            const xPos = (clientX / innerWidth - 0.5) * 30;
            const yPos = (clientY / innerHeight - 0.5) * 30;

            const particles = document.querySelectorAll('.particle');
            particles.forEach((particle, index) => {
                const speed = (index + 1) * 0.8;
                particle.style.transform = `translate(${xPos * speed}px, ${yPos * speed}px)`;
            });

            // Move orbs slightly
            const dnaHelix = document.querySelector('.dna-helix');
            const pulseRing = document.querySelector('.pulse-ring');
            if (dnaHelix) dnaHelix.style.transform = `translate(${xPos * 0.3}px, ${yPos * 0.3}px)`;
            if (pulseRing) pulseRing.style.transform = `translate(${-xPos * 0.2}px, ${-yPos * 0.2}px)`;
        });
    }
}

/* ========================================
   Animated Counter
   ======================================== */

function initCounterAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number, .stat-value, .problem-stat, .tech-value');

    const observerOptions = {
        root: null,
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateValue(entry.target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(el => observer.observe(el));
}

function animateValue(element) {
    const text = element.textContent;
    const matches = text.match(/[\d,]+/);

    if (!matches) return;

    const numericPart = matches[0].replace(/,/g, '');
    const target = parseInt(numericPart);

    if (isNaN(target)) return;

    const prefix = text.substring(0, text.indexOf(matches[0]));
    const suffix = text.substring(text.indexOf(matches[0]) + matches[0].length);

    const duration = 2000;
    const start = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(target * easeOutQuart);

        element.textContent = prefix + current.toLocaleString('en-IN') + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = text; // Restore original
        }
    }

    requestAnimationFrame(update);
}

/* ========================================
   3D Tilt Effect on Cards
   ======================================== */

function initTiltEffect() {
    if (window.innerWidth < 768) return;

    const cards = document.querySelectorAll('.problem-card, .tech-card, .step-card, .team-card, .impact-stat-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', function (e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', function () {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

/* ========================================
   Accessibility
   ======================================== */

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        const navLinks = document.getElementById('navLinks');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');

        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
});

// Respect reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--transition-fast', '0ms');
    document.documentElement.style.setProperty('--transition-base', '0ms');
    document.documentElement.style.setProperty('--transition-slow', '0ms');
}

/* ========================================
   Console Easter Egg
   ======================================== */

console.log('%c🧬 SeerGen Technologies', 'font-size: 28px; font-weight: bold; background: linear-gradient(135deg, #00d4ff, #7c3aed); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
console.log('%cBuilding AI-Powered Healthcare for Everyone 🚀', 'font-size: 14px; color: #00d4ff;');
console.log('%c💼 Join us: careers@seergen.tech', 'font-size: 12px; color: #94a3b8;');
