/**
 * Brightli Website - Dynamic Interactions
 * Includes: Scroll reveals, rotating text, testimonial carousel, mobile menu
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Initialize all components
    initMobileMenu();
    initScrollReveal();
    initRotatingText();
    initTestimonialCarousel();
    initSmoothScroll();
    initNavbarScroll();
});

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    if (!menuBtn || !navLinks) return;
    
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
            menuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

/**
 * Scroll Reveal Animation
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    if (!revealElements.length) return;
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    revealElements.forEach(el => observer.observe(el));
}

/**
 * Rotating Hero Text
 */
function initRotatingText() {
    const rotatingElement = document.getElementById('rotatingText');
    if (!rotatingElement) return;
    
    const phrases = [
        'Grow wiser.',
        'Reflect deeper.',
        'Learn faster.',
        'Adapt smarter.'
    ];
    
    let currentIndex = 0;
    
    function rotateText() {
        // Fade out
        rotatingElement.style.opacity = '0';
        rotatingElement.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % phrases.length;
            rotatingElement.textContent = phrases[currentIndex];
            
            // Fade in
            rotatingElement.style.opacity = '1';
            rotatingElement.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Add transition styles
    rotatingElement.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    
    // Start rotation after initial delay
    setTimeout(() => {
        setInterval(rotateText, 3000);
    }, 3000);
}

/**
 * Testimonial Carousel
 */
function initTestimonialCarousel() {
    const track = document.getElementById('testimonialsTrack');
    const dotsContainer = document.getElementById('carouselDots');
    
    if (!track || !dotsContainer) return;
    
    const cards = track.querySelectorAll('.testimonial-card');
    const dots = dotsContainer.querySelectorAll('.dot');
    let currentSlide = 0;
    let autoplayInterval;
    let touchStartX = 0;
    let touchEndX = 0;
    
    function goToSlide(index) {
        currentSlide = index;
        track.style.transform = `translateX(-${index * 100}%)`;
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    
    function nextSlide() {
        const next = (currentSlide + 1) % cards.length;
        goToSlide(next);
    }
    
    function prevSlide() {
        const prev = (currentSlide - 1 + cards.length) % cards.length;
        goToSlide(prev);
    }
    
    // Dot click handlers
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetAutoplay();
        });
    });
    
    // Touch/swipe support
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
            resetAutoplay();
        }
    }
    
    // Autoplay
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000);
    }
    
    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }
    
    // Pause on hover
    track.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });
    
    track.addEventListener('mouseleave', () => {
        startAutoplay();
    });
    
    startAutoplay();
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#coming-soon') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Navbar Background on Scroll
 */
function initNavbarScroll() {
    const navbar = document.querySelector('.nav-container');
    if (!navbar) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add shadow when scrolled
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.12)';
        } else {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
        }
        
        lastScroll = currentScroll;
    }, { passive: true });
}

/**
 * Stats Counter Animation (optional enhancement)
 */
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    stats.forEach(stat => observer.observe(stat));
}

function animateCounter(element) {
    const text = element.textContent;
    const match = text.match(/(\d+)/);
    
    if (!match) return;
    
    const target = parseInt(match[1]);
    const suffix = text.replace(match[1], '');
    const duration = 1500;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(target * easeOutQuart);
        
        element.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = text;
        }
    }
    
    requestAnimationFrame(update);
}

/**
 * Parallax Effect for Hero Orbs (subtle)
 */
function initParallax() {
    const orbs = document.querySelectorAll('.hero-orb');
    
    if (!orbs.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        orbs.forEach((orb, index) => {
            const speed = 0.1 + (index * 0.05);
            orb.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }, { passive: true });
}

// Initialize optional enhancements
document.addEventListener('DOMContentLoaded', () => {
    // Uncomment to enable additional features
    // initStatsCounter();
    // initParallax();
});
