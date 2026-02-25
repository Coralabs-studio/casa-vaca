// ==========================================
// LOAD PROPERTIES FROM DATA
// ==========================================
function loadProperties() {
    const container = document.getElementById('propertiesContainer');
    if (!container || !window.propertiesData) return;

    const VISIBLE_COUNT = window.SHOW_ALL_PROPERTIES ? Infinity : 5;
    const properties = window.propertiesData.properties;
    const hiddenCount = Math.max(0, properties.length - VISIBLE_COUNT);

    properties.forEach((property, index) => {
            const propertyCard = document.createElement('div');
            propertyCard.className = 'property-card-horizontal';
            if (index >= VISIBLE_COUNT) {
                propertyCard.classList.add('property-card-hidden');
            }

            propertyCard.innerHTML = `
                <div class="property-image-horizontal">
                    <button class="nav-arrow nav-left">‹</button>
                    <img src="${property.images[0]}" alt="${property.name}">
                    <button class="nav-arrow nav-right">›</button>
                    <div class="image-dots">
                        ${property.images.map((_, i) => `<span class="image-dot${i === 0 ? ' active' : ''}"></span>`).join('')}
                    </div>
                </div>
                <div class="property-info-horizontal">
                    <span class="property-location-small">${property.location}</span>
                    <h3>${property.name}</h3>
                    <div class="property-icons">
                        <span><i class="ph ph-users"></i> ${property.guests} Ospiti</span>
                        <span><i class="ph ph-bed"></i> ${property.bedrooms} Camera${property.bedrooms > 1 ? 'e' : ''}</span>
                        <span><i class="ph ph-shower"></i> ${property.bathrooms} Bagno${property.bathrooms > 1 ? 'i' : ''}</span>
                    </div>
                    <p>${property.description}</p>
                    <div class="property-footer-horizontal">
                        <p class="property-cancellation"><i class="ph ph-check"></i> ${property.cancellationPolicy}</p>
                        <a href="property-detail.html?id=${property.id}" class="btn-book">SCOPRI</a>
                    </div>
                </div>
            `;

            container.appendChild(propertyCard);

            // Image navigation
            const images = property.images;
            if (images.length > 1) {
                let currentIndex = 0;
                const imgEl = propertyCard.querySelector('img');
                const dots = propertyCard.querySelectorAll('.image-dot');

                const updateImage = (index) => {
                    imgEl.style.opacity = '0';
                    setTimeout(() => {
                        imgEl.src = images[index];
                        imgEl.style.opacity = '1';
                    }, 200);
                    dots.forEach((d, i) => d.classList.toggle('active', i === index));
                };

                propertyCard.querySelector('.nav-left').addEventListener('click', (e) => {
                    e.preventDefault();
                    currentIndex = (currentIndex - 1 + images.length) % images.length;
                    updateImage(currentIndex);
                });

                propertyCard.querySelector('.nav-right').addEventListener('click', (e) => {
                    e.preventDefault();
                    currentIndex = (currentIndex + 1) % images.length;
                    updateImage(currentIndex);
                });
            } else {
                propertyCard.querySelectorAll('.nav-arrow').forEach(btn => btn.style.display = 'none');
                propertyCard.querySelector('.image-dots').style.display = 'none';
            }
        });

    // Show-more button → links to dedicated page
    if (hiddenCount > 0) {
        const showMoreWrapper = document.createElement('div');
        showMoreWrapper.className = 'show-more-properties';
        showMoreWrapper.innerHTML = `
            <a href="all-properties.html" class="btn-show-more">
                Esplora le altre ${hiddenCount} proposte &rarr;
            </a>
        `;
        container.appendChild(showMoreWrapper);
    }
}

loadProperties();

// ==========================================
// NAVIGATION MENU TOGGLE
// ==========================================
const hamburger = document.querySelector('.hamburger');
const mobileMenuBtn = document.querySelector('#mobileMenuBtn');
const navMenu = document.querySelector('.nav-menu-center');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a nav link
    document.querySelectorAll('.nav-menu-center a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Mobile menu button (fixed top icons)
if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
}

// ==========================================
// NAVBAR SCROLL EFFECT - HIDE ON TOP, SHOW ON SCROLL
// ==========================================
const navbar = document.querySelector('.navbar');
const heroSection = document.querySelector('.hero');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const heroHeight = heroSection ? heroSection.offsetHeight : 600;

    // Hide navbar when at the top (within hero section)
    if (currentScroll < heroHeight - 100) {
        navbar.classList.add('navbar-hidden');
        navbar.classList.remove('navbar-visible');
    } else {
        // Show navbar when scrolled past hero
        navbar.classList.remove('navbar-hidden');
        navbar.classList.add('navbar-visible');
    }

    lastScroll = currentScroll;
});

// ==========================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// CONTACT FORM HANDLING
// ==========================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Grazie per averci contattato! Ti risponderemo al più presto.');
        contactForm.reset();
    });
}

// ==========================================
// GALLERY LIGHTBOX (SIMPLE) — index page only
// ==========================================
// On property-detail page, the full lightbox is handled by property-detail.js
if (!document.getElementById('propertyLightbox') && !document.querySelector('.gallery-airbnb')) {
const galleryItems = document.querySelectorAll('.gallery-item img');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        // Create lightbox
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="lightbox-close">&times;</span>
                <img src="${item.src}" alt="${item.alt}">
            </div>
        `;
        
        // Add styles
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            cursor: pointer;
        `;
        
        const content = lightbox.querySelector('.lightbox-content');
        content.style.cssText = `
            position: relative;
            max-width: 90%;
            max-height: 90%;
        `;
        
        const img = lightbox.querySelector('img');
        img.style.cssText = `
            max-width: 100%;
            max-height: 90vh;
            border-radius: 10px;
        `;
        
        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.style.cssText = `
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 40px;
            font-weight: bold;
            cursor: pointer;
            transition: color 0.3s;
        `;
        
        closeBtn.addEventListener('mouseenter', () => {
            closeBtn.style.color = '#e8a87c';
        });
        
        closeBtn.addEventListener('mouseleave', () => {
            closeBtn.style.color = 'white';
        });
        
        document.body.appendChild(lightbox);
        
        // Close on click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target === closeBtn) {
                document.body.removeChild(lightbox);
            }
        });
        
        // Close on ESC key
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape' && document.body.contains(lightbox)) {
                document.body.removeChild(lightbox);
                document.removeEventListener('keydown', escHandler);
            }
        });
    });
    
    // Add pointer cursor
    item.style.cursor = 'pointer';
});
} // end: not property-detail page

// ==========================================
// ANIMATE ON SCROLL (SIMPLE)
// ==========================================
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

// Observe elements
const animateElements = document.querySelectorAll('.property-card, .service-card, .gallery-item');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Scroll Reveal for intro cards (staggered)
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.scroll-reveal').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.12}s`;
    revealObserver.observe(el);
});

// ==========================================
// PROPERTY CARD INTERACTIONS
// ==========================================
const propertyCards = document.querySelectorAll('.property-card');

propertyCards.forEach(card => {
    const img = card.querySelector('.property-image img');
    
    // Add loading placeholder if image doesn't exist
    if (img) {
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23e0e0e0" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20" fill="%23999"%3EImmagine non disponibile%3C/text%3E%3C/svg%3E';
        });
    }
});

// ==========================================
// FORM VALIDATION
// ==========================================
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.style.borderColor = '#e74c3c';
        } else {
            input.style.borderColor = '#e0e0e0';
        }
    });

    input.addEventListener('focus', () => {
        input.style.borderColor = '#2c5f7f';
    });
});

// ==========================================
// RESPONSIVE IMAGE LOADING
// ==========================================
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ==========================================
// SCROLL INDICATOR SMOOTH SCROLL
// ==========================================
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function() {
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// ==========================================
// CONSOLE MESSAGE
// ==========================================
console.log('%cCASA VACANZE ALGHERO', 'color: #2c5f7f; font-size: 24px; font-weight: bold;');
console.log('%cSito web creato con passione ❤️', 'color: #e8a87c; font-size: 14px;');

// ==========================================
// WHATSAPP WIDGET
// ==========================================
const whatsappFloat = document.getElementById('whatsappFloat');
const whatsappPopup = document.getElementById('whatsappPopup');
const whatsappClose = document.getElementById('whatsappClose');
const whatsappSend = document.getElementById('whatsappSend');
const whatsappInput = document.getElementById('whatsappInput');

const WHATSAPP_NUMBER = '393517095415'; // Replace with actual number

if (whatsappFloat) {
    whatsappFloat.addEventListener('click', (e) => {
        e.stopPropagation();
        whatsappPopup.classList.toggle('open');
        if (whatsappPopup.classList.contains('open')) {
            whatsappInput.focus();
        }
    });
}

if (whatsappClose) {
    whatsappClose.addEventListener('click', (e) => {
        e.stopPropagation();
        whatsappPopup.classList.remove('open');
    });
}

// Click outside to close
document.addEventListener('click', (e) => {
    if (whatsappPopup && !whatsappPopup.contains(e.target) && !whatsappFloat.contains(e.target)) {
        whatsappPopup.classList.remove('open');
    }
});

// Send message
function sendWhatsAppMessage() {
    const message = whatsappInput.value.trim();
    const defaultMessage = 'Ciao! Sono interessato alle vostre case vacanze ad Alghero.';
    const finalMessage = message || defaultMessage;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(finalMessage)}`;
    window.open(whatsappUrl, '_blank');
    whatsappPopup.classList.remove('open');
    whatsappInput.value = '';
}

if (whatsappSend) {
    whatsappSend.addEventListener('click', sendWhatsAppMessage);
}

if (whatsappInput) {
    whatsappInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendWhatsAppMessage();
        }
    });
}

// ==========================================
// HERO STATS COUNTER ANIMATION
// ==========================================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const startTime = performance.now();

        function updateCount(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);
            counter.textContent = current;
            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                counter.textContent = target;
            }
        }
        requestAnimationFrame(updateCount);
    });
}

// Trigger counters when hero stats come into view
const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    let counterTriggered = false;
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counterTriggered) {
                counterTriggered = true;
                // Delay slightly so entry animations finish first
                setTimeout(animateCounters, 1600);
                statsObserver.disconnect();
            }
        });
    }, { threshold: 0.5 });
    statsObserver.observe(heroStats);
}
