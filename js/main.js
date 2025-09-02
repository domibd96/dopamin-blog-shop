// Slideshow Variablen
let slideIndex = 0;
let slides, dotsContainer;
let autoSlideInterval;
let isTransitioning = false;

document.addEventListener('DOMContentLoaded', () => {
    // Elemente erst hier abrufen, um sicherzustellen, dass sie existieren
    slides = document.querySelectorAll('.slide');
    dotsContainer = document.querySelector('.dots-container');

    // Keyboard Navigation
    document.addEventListener('keydown', handleKeyboardNavigation);

    // Touch/Swipe Support für mobile Geräte
    initTouchSupport();

    // Click Navigation für Slides
    initSlideClickNavigation();

    // Slideshow Initialisierung
    initSlideshow();

    // Scroll Animationen
    initScrollAnimations();
    
    // Parallax Effect
    initParallaxEffect();
    
    // Kategorie Navigation mit verbesserter UX
    document.querySelectorAll('.category-card .invisible-click-area').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const categoryMap = {
                'Ernährung': 'ernaehrung.html',
                'Sport': 'sport.html',
                'Gesundheit': 'gesundheit.html',
                'Kultur': 'kultur.html',
                'Kunst und Kreativität': 'kunst.html',
                'Shop': 'shop.html'
            };

            const categoryTitle = this.parentElement.querySelector('h2').textContent.trim();
            const targetPage = categoryMap[categoryTitle] || 'index.html';

            // Smooth transition effect
            const card = this.parentElement;
            card.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                window.location.href = targetPage;
            }, 150);
        });
    });

    // Slide Button Funktionalität
    document.querySelectorAll('.slide-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Button Animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Navigation
            const href = this.getAttribute('onclick');
            if (href) {
                const url = href.match(/window\.location\.href='([^']+)'/);
                if (url) {
                    setTimeout(() => {
                        window.location.href = url[1];
                    }, 200);
                }
            }
        });
    });

    // NAVIGATION BUTTONS mit verbesserter UX
    document.querySelectorAll('.nav-links .invisible-click-area').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Finde den zugehörigen Link
            const link = this.nextElementSibling;
            if (link && link.tagName === 'A') {
                // Button Animation
                link.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    link.style.transform = '';
                }, 150);
                
                // Spezialfall für Blog (Anchor-Link)
                if(link.getAttribute('href').startsWith('#')) {
                    window.location.hash = link.getAttribute('href');
                } else {
                    setTimeout(() => {
                        window.location.href = link.getAttribute('href');
                    }, 200);
                }
            }
        });
    });

    // Pause Auto-Slide when hovering over slideshow
    document.querySelector('.slideshow').addEventListener('mouseenter', () => {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
    });

    document.querySelector('.slideshow').addEventListener('mouseleave', () => {
        startAutoSlide();
    });

    // Smooth scroll for anchor links
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
});

function initSlideshow() {
    createDots();
    showSlide(slideIndex);
    startAutoSlide();
}

function createDots() {
    dotsContainer.innerHTML = ""; // Falls doppelte Dots vorhanden sind, leeren
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('dot');
        dot.setAttribute('aria-label', `Gehe zu Slide ${index + 1}`);
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
}

function goToSlide(index) {
    if (isTransitioning || index === slideIndex) return;
    
    slideIndex = index;
    showSlide(slideIndex);
    resetAutoSlide();
}

function showSlide(index) {
    if (isTransitioning) return;
    
    isTransitioning = true;
    
    // Alle Slides ausblenden
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        slide.style.transform = i === index ? 'scale(1)' : 'scale(1.05)';
    });
    
    // Aktive Slide einblenden
    setTimeout(() => {
        slides[index].classList.add('active');
        
        // Content Animation
        const slideContent = slides[index].querySelector('.slide-content');
        if (slideContent) {
            slideContent.style.animation = 'none';
            slideContent.offsetHeight; // Trigger reflow
            slideContent.style.animation = 'slideInLeft 1s ease-out';
        }
        
        // Dots aktualisieren
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        isTransitioning = false;
    }, 100);
}

function nextSlide() {
    if (isTransitioning) return;
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
    resetAutoSlide();
}

function prevSlide() {
    if (isTransitioning) return;
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    showSlide(slideIndex);
    resetAutoSlide();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
}

function resetAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
}

function handleKeyboardNavigation(e) {
    switch(e.key) {
        case 'ArrowLeft':
            e.preventDefault();
            prevSlide();
            break;
        case 'ArrowRight':
            e.preventDefault();
            nextSlide();
            break;
        case 'Home':
            e.preventDefault();
            goToSlide(0);
            break;
        case 'End':
            e.preventDefault();
            goToSlide(slides.length - 1);
            break;
    }
}

function initTouchSupport() {
    let startX = 0;
    let endX = 0;
    const slideshow = document.querySelector('.slideshow');
    
    slideshow.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    }, { passive: true });
    
    slideshow.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide(); // Swipe left
            } else {
                prevSlide(); // Swipe right
            }
        }
    }
}

function initSlideClickNavigation() {
    // Click auf Slide-Bereiche für Navigation
    slides.forEach((slide, index) => {
        const clickArea = slide.querySelector('.invisible-click-area');
        if (clickArea) {
            clickArea.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Direkte Navigation basierend auf Slide-Index
                const navigationMap = {
                    0: 'sport.html',
                    1: 'gesundheit.html', 
                    2: 'ernaehrung.html',
                    3: 'kultur.html',
                    4: 'kunst.html'
                };
                
                const targetPage = navigationMap[index];
                if (targetPage) {
                    // Smooth transition
                    const slideContent = slide.querySelector('.slide-content');
                    if (slideContent) {
                        slideContent.style.transform = 'translateY(-50%) scale(0.95)';
                    }
                    
                    setTimeout(() => {
                        window.location.href = targetPage;
                    }, 200);
                }
            });
        }
    });
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Kategorie-Karten animieren
    document.querySelectorAll('.category-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

// Performance Optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Parallax Effect Function
function initParallaxEffect() {
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.slide');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `scale(1.05) translateZ(0) translate3d(0, ${yPos}px, 0)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}