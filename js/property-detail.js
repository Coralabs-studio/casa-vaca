// Property Detail Page JavaScript

// Current property data
let currentProperty = null;

// Gallery images array (will be populated from JSON)
let galleryImages = [];

// Load property data based on URL parameter
function loadPropertyData() {
    // Get property ID from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const propertyId = urlParams.get('id');
    
    if (!propertyId) {
        console.error('No property ID specified in URL');
        return;
    }

    // Use inline data (no fetch needed)
    const data = window.propertiesData;
    if (!data) {
        console.error('Properties data not loaded');
        return;
    }

    currentProperty = data.properties.find(p => p.id === propertyId);

    if (!currentProperty) {
        console.error('Property not found:', propertyId);
        return;
    }

    // Update page with property data
    updatePageContent();
}

// Update page content with property data
function updatePageContent() {
    if (!currentProperty) return;
    
    // Update title and meta
    document.title = `${currentProperty.name} - Casa Vacanze Alghero`;
    
    // Update property header
    const titleElement = document.querySelector('.property-header h1');
    if (titleElement) titleElement.textContent = currentProperty.name;
    
    // Update location
    const locationElement = document.querySelector('.property-location span');
    if (locationElement) locationElement.textContent = currentProperty.location;
    
    // Update check-in / check-out times
    const checkinTimeEl = document.getElementById('checkinTime');
    const checkoutTimeEl = document.getElementById('checkoutTime');
    if (checkinTimeEl && currentProperty.checkin) checkinTimeEl.textContent = currentProperty.checkin;
    if (checkoutTimeEl && currentProperty.checkout) checkoutTimeEl.textContent = currentProperty.checkout;

    // Update quick info cards
    updateQuickInfo();
    
    // Update description
    const descriptionText = document.querySelector('.description-text');
    if (descriptionText && currentProperty.description) {
        descriptionText.innerHTML = currentProperty.description.split('\n').map(p => `<p>${p.trim()}</p>`).join('') || `<p>${currentProperty.description}</p>`;
    }
    
    // Update amenities
    updateAmenities();
    
    // Update gallery
    updateGallery();
    
    // Update WhatsApp links
    updateWhatsAppLinks();
}

// Amenity icon mapping
const amenityIconMap = {
    'wi-fi': 'ph-wifi-high',
    'wifi': 'ph-wifi-high',
    'aria condizionata': 'ph-snowflake',
    'climatizzazione': 'ph-snowflake',
    'tv': 'ph-television',
    'cucina': 'ph-cooking-pot',
    'cucina attrezzata': 'ph-fork-knife',
    'cucina completa': 'ph-fork-knife',
    'angolo cottura': 'ph-fork-knife',
    'balcone': 'ph-door-open',
    'self check-in': 'ph-key',
    'lavatrice': 'ph-t-shirt',
    'vista mare': 'ph-waves',
    'parcheggio': 'ph-car',
    'ascensore': 'ph-elevator',
    'asciugamani': 'ph-towel',
    'asse da stiro': 'ph-iron',
    'ferro da stiro': 'ph-iron',
    'biancheria': 'ph-bed',
    'bidet': 'ph-toilet',
    'doccia': 'ph-shower',
    'phon': 'ph-hair-dryer',
    'frigorifero': 'ph-fridge',
    'divano letto': 'ph-couch',
    'non fumatori': 'ph-cigarette-slash',
    'letto matrimoniale': 'ph-bed',
    'shampoo': 'ph-drop',
    'centro': 'ph-map-pin',
    'in città': 'ph-buildings',
    'giardino': 'ph-tree',
    'terrazzo': 'ph-sun',
    'ristrutturato': 'ph-paint-roller',
    'accessori bagno': 'ph-bathtub',
    'accessori cucina': 'ph-fork-knife'
};

function getAmenityIcon(amenityName) {
    const name = amenityName.toLowerCase();
    for (const [key, icon] of Object.entries(amenityIconMap)) {
        if (name.includes(key)) return icon;
    }
    return 'ph-check-circle'; // default icon
}

// Update amenities section
function updateAmenities() {
    const grid = document.getElementById('amenitiesGrid');
    const showAllBtn = document.getElementById('showAllAmenities');
    if (!grid || !currentProperty.amenities) return;
    
    const amenities = currentProperty.amenities;
    const INITIAL_SHOW = 8;
    
    grid.innerHTML = amenities.map((amenity, index) => `
        <div class="amenity-item ${index >= INITIAL_SHOW ? 'hidden-amenity' : ''}">
            <span class="amenity-icon"><i class="ph ${getAmenityIcon(amenity)}"></i></span>
            <span>${amenity}</span>
        </div>
    `).join('');
    
    // Show "Mostra tutte" button if there are more than INITIAL_SHOW
    if (amenities.length > INITIAL_SHOW && showAllBtn) {
        showAllBtn.style.display = 'flex';
        showAllBtn.querySelector('span').textContent = `Mostra tutte le ${amenities.length} dotazioni`;
        
        showAllBtn.addEventListener('click', () => {
            grid.classList.toggle('show-all');
            const isOpen = grid.classList.contains('show-all');
            showAllBtn.querySelector('span').textContent = isOpen 
                ? 'Mostra meno' 
                : `Mostra tutte le ${amenities.length} dotazioni`;
            showAllBtn.querySelector('i').className = isOpen 
                ? 'ph ph-minus' 
                : 'ph ph-dots-three';
        });
    }
}

// Update quick info cards
function updateQuickInfo() {
    const quickInfo = document.querySelector('.quick-info');
    if (quickInfo) {
        quickInfo.innerHTML = `
            <div class="info-card">
                <div class="info-card-icon">
                    <i class="ph ph-users"></i>
                </div>
                <div class="info-card-text">
                    <span class="info-card-value">${currentProperty.guests}</span>
                    <span class="info-card-label">${currentProperty.guests === 1 ? 'Ospite' : 'Ospiti'}</span>
                </div>
            </div>
            <div class="info-card">
                <div class="info-card-icon">
                    <i class="ph ph-bed"></i>
                </div>
                <div class="info-card-text">
                    <span class="info-card-value">${currentProperty.bedrooms}</span>
                    <span class="info-card-label">${currentProperty.bedrooms === 1 ? 'Camera' : 'Camere'}</span>
                </div>
            </div>
            <div class="info-card">
                <div class="info-card-icon">
                    <i class="ph ph-bathtub"></i>
                </div>
                <div class="info-card-text">
                    <span class="info-card-value">${currentProperty.bathrooms}</span>
                    <span class="info-card-label">${currentProperty.bathrooms === 1 ? 'Bagno' : 'Bagni'}</span>
                </div>
            </div>
        `;
    }
}

// Update gallery with property images
function updateGallery() {
    if (!currentProperty.images || currentProperty.images.length === 0) return;
    
    galleryImages = currentProperty.images;
    
    // Update Airbnb-style gallery
    const galleryMain = document.querySelector('.gallery-main img');
    if (galleryMain && galleryImages[0]) {
        galleryMain.src = galleryImages[0];
    }
    
    // Update grid images (4 images)
    const PLACEHOLDER = 'images/placeholder-allestimento.jpg';
    const galleryItems = document.querySelectorAll('.gallery-grid .gallery-item img');
    galleryItems.forEach((img, index) => {
        const imageIndex = index + 1; // Start from second image
        img.src = galleryImages[imageIndex] || PLACEHOLDER;
        img.onerror = function() { this.onerror = null; this.src = PLACEHOLDER; };
    });

    // Ensure main image also has fallback
    if (galleryMain) {
        galleryMain.onerror = function() { this.onerror = null; this.src = PLACEHOLDER; };
    }
    
    // Add click handler to main gallery image
    const mainImg = document.querySelector('.gallery-main');
    if (mainImg) {
        mainImg.onclick = () => openLightbox(0);
    }
    
    // Add click handlers to grid images
    document.querySelectorAll('.gallery-grid .gallery-item').forEach((item, index) => {
        item.onclick = () => openLightbox(index + 1);
    });
    
    // Update full gallery grid (if exists)
    const fullGallery = document.querySelector('.full-gallery-grid');
    if (fullGallery) {
        fullGallery.innerHTML = galleryImages.map((img, index) => 
            `<img src="${img}" alt="Foto ${index + 1}" onclick="openLightbox(${index})" onerror="this.onerror=null;this.src='images/placeholder-allestimento.jpg'">`
        ).join('');
    }
}

// Update WhatsApp links with property name
function updateWhatsAppLinks() {
    const userName = document.getElementById('userName')?.value.trim() || '';
    const userMessage = document.getElementById('userMessage')?.value.trim() || '';
    const propertyName = currentProperty.name;
    
    // Get full dates from recap if available
    const dateRecapText = document.getElementById('dateRecap')?.textContent;
    
    // Build guest text from picker
    const guestSummaryEl = document.getElementById('guestSummary');
    const guestsText = guestSummaryEl ? guestSummaryEl.textContent : '1 ospite';
    
    let message = 'Ciao';
    if (userName) {
        message += `, sono ${userName}`;
    }
    message += `! Chiedo informazioni per ${propertyName}`;
    
    if (dateRecapText) {
        message += `, ${dateRecapText.toLowerCase()}`;
    }
    
    message += `, siamo ${guestsText}.`;
    
    if (userMessage) {
        message += `\n\n${userMessage}`;
    }
    
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
        const baseUrl = link.href.split('?')[0];
        link.href = `${baseUrl}?text=${encodeURIComponent(message)}`;
    });
}

// ── LIGHTBOX ──────────────────────────────────────────────
let lbIndex = 0;
let lbEl = null;

function openLightbox(index) {
    lbIndex = index;

    if (!lbEl) {
        lbEl = document.createElement('div');
        lbEl.id = 'propertyLightbox';
        lbEl.innerHTML = `
            <button class="lb-close" aria-label="Chiudi">&times;</button>
            <button class="lb-prev" aria-label="Precedente">&#8249;</button>
            <div class="lb-img-wrap">
                <img class="lb-img" src="" alt="">
            </div>
            <button class="lb-next" aria-label="Successiva">&#8250;</button>
            <div class="lb-counter"></div>
        `;
        lbEl.style.cssText = `
            position:fixed;top:0;left:0;width:100%;height:100%;
            background:rgba(0,0,0,0.93);display:flex;align-items:center;
            justify-content:center;z-index:10000;
        `;

        const style = document.createElement('style');
        style.textContent = `
            #propertyLightbox .lb-img-wrap { display:flex; align-items:center; justify-content:center; max-width:88vw; max-height:88vh; }
            #propertyLightbox .lb-img { max-width:88vw; max-height:88vh; object-fit:contain; border-radius:6px; display:block; }
            #propertyLightbox .lb-close {
                position:fixed;top:18px;right:24px;background:none;border:none;
                color:#fff;font-size:42px;cursor:pointer;z-index:10001;line-height:1;
                opacity:.8;transition:opacity .2s;
            }
            #propertyLightbox .lb-close:hover { opacity:1; }
            #propertyLightbox .lb-prev,
            #propertyLightbox .lb-next {
                position:fixed;top:50%;transform:translateY(-50%);
                background:rgba(255,255,255,0.12);border:none;color:#fff;
                font-size:52px;line-height:1;width:60px;height:80px;cursor:pointer;
                display:flex;align-items:center;justify-content:center;
                border-radius:4px;z-index:10001;transition:background .2s;
            }
            #propertyLightbox .lb-prev { left:12px; }
            #propertyLightbox .lb-next { right:12px; }
            #propertyLightbox .lb-prev:hover,
            #propertyLightbox .lb-next:hover { background:rgba(255,255,255,0.25); }
            #propertyLightbox .lb-counter {
                position:fixed;bottom:22px;left:50%;transform:translateX(-50%);
                color:rgba(255,255,255,.7);font-size:0.85rem;letter-spacing:.08em;
                z-index:10001;
            }
        `;
        document.head.appendChild(style);

        // Close on background click
        lbEl.addEventListener('click', e => {
            if (e.target === lbEl) closeLightbox();
        });
        lbEl.querySelector('.lb-close').addEventListener('click', closeLightbox);
        lbEl.querySelector('.lb-prev').addEventListener('click', e => { e.stopPropagation(); lbNav(-1); });
        lbEl.querySelector('.lb-next').addEventListener('click', e => { e.stopPropagation(); lbNav(1); });

        // Keyboard
        document._lbKeyHandler = e => {
            if (!document.body.contains(lbEl)) return;
            if (e.key === 'ArrowLeft')  lbNav(-1);
            if (e.key === 'ArrowRight') lbNav(1);
            if (e.key === 'Escape')     closeLightbox();
        };
        document.addEventListener('keydown', document._lbKeyHandler);

        // Touch/swipe
        let touchStartX = 0;
        lbEl.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
        lbEl.addEventListener('touchend', e => {
            const dx = e.changedTouches[0].clientX - touchStartX;
            if (Math.abs(dx) > 50) lbNav(dx < 0 ? 1 : -1);
        });
    }

    lbRender();
    if (!document.body.contains(lbEl)) document.body.appendChild(lbEl);
}

function lbRender() {
    const img = lbEl.querySelector('.lb-img');
    const counter = lbEl.querySelector('.lb-counter');
    const total = galleryImages.length;
    // normalise index
    lbIndex = ((lbIndex % total) + total) % total;
    img.src = galleryImages[lbIndex];
    img.alt = `Foto ${lbIndex + 1}`;
    counter.textContent = `${lbIndex + 1} / ${total}`;
    // hide arrows when only 1 image
    lbEl.querySelector('.lb-prev').style.display = total <= 1 ? 'none' : '';
    lbEl.querySelector('.lb-next').style.display = total <= 1 ? 'none' : '';
}

function lbNav(dir) {
    lbIndex += dir;
    lbRender();
}

function closeLightbox() {
    if (lbEl && document.body.contains(lbEl)) document.body.removeChild(lbEl);
}
// ── END LIGHTBOX ──────────────────────────────────────────

// Initialize map with Leaflet
function initMap() {
    // Check if map element exists
    const mapElement = document.getElementById('map');
    if (!mapElement) return;
    
    // Coordinates for Alghero, Sardinia (example - replace with actual property location)
    const lat = 40.5561;
    const lng = 8.3147;
    
    // Create map
    const map = L.map('map').setView([lat, lng], 15);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Add marker
    L.marker([lat, lng]).addTo(map)
        .bindPopup('<b>Villa al Mare</b><br>Alghero, Sardegna')
        .openPopup();
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Load property data first
    loadPropertyData();
    
    // Initialize map
    initMap();
    
    // Initialize Flatpickr - Airbnb style range picker
    const today = new Date();
    const dateRangeBox = document.getElementById('dateRangeBox');
    const checkinDisplay = document.getElementById('checkinDisplay');
    const checkoutDisplay = document.getElementById('checkoutDisplay');
    const checkinCell = document.getElementById('checkinCell');
    const checkoutCell = document.getElementById('checkoutCell');
    
    const dateRecap = document.getElementById('dateRecap');
    const nightsBadge = document.getElementById('nightsBadge');
    const dateRangeBottom = document.getElementById('dateRangeBottom');

    let checkinDate = null;
    let checkoutDate = null;
    let editingField = 'checkin'; // 'checkin' or 'checkout'

    if (dateRangeBox) {
        // Update display and recap
        function updateDateDisplay() {
            if (checkinDate) {
                checkinDisplay.textContent = formatDateShort(checkinDate);
                checkinDisplay.classList.add('filled');
                checkinCell.classList.add('has-date');
            } else {
                checkinDisplay.textContent = 'Aggiungi data';
                checkinDisplay.classList.remove('filled');
                checkinCell.classList.remove('has-date');
            }

            if (checkoutDate) {
                checkoutDisplay.textContent = formatDateShort(checkoutDate);
                checkoutDisplay.classList.add('filled');
                checkoutCell.classList.add('has-date');
            } else {
                checkoutDisplay.textContent = 'Aggiungi data';
                checkoutDisplay.classList.remove('filled');
                checkoutCell.classList.remove('has-date');
            }

            if (checkinDate && checkoutDate) {
                const nights = Math.round((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24));
                dateRecap.textContent = `Dal ${formatDateSlash(checkinDate)} al ${formatDateSlash(checkoutDate)}`;
                nightsBadge.textContent = `\u263E ${nights} ${nights === 1 ? 'notte' : 'notti'}`;
                dateRangeBottom.classList.add('visible');
            } else if (checkinDate) {
                dateRecap.textContent = `Dal ${formatDateSlash(checkinDate)} al ...`;
                nightsBadge.textContent = '';
                dateRangeBottom.classList.add('visible');
            } else {
                dateRecap.textContent = '';
                nightsBadge.textContent = '';
                dateRangeBottom.classList.remove('visible');
            }

            updateWhatsAppLinks();
        }

        const rangePicker = flatpickr("#dateRange", {
            locale: "it",
            mode: "range",
            dateFormat: "d/m/Y",
            minDate: today,
            showMonths: 1,
            animate: true,
            position: "below center",
            onChange: function(selectedDates) {
                if (editingField === 'checkin') {
                    if (selectedDates.length >= 1) {
                        checkinDate = selectedDates[0];
                        
                        if (checkoutDate && checkoutDate > checkinDate) {
                            // Keep old checkout, restore full range
                            if (selectedDates.length === 1) {
                                setTimeout(function() {
                                    rangePicker.setDate([checkinDate, checkoutDate], false);
                                }, 10);
                            }
                        } else {
                            checkoutDate = null;
                        }
                        
                        if (selectedDates.length === 2) {
                            checkoutDate = selectedDates[1];
                        }
                    }
                    if (selectedDates.length === 0) {
                        checkinDate = null;
                        checkoutDate = null;
                    }
                } else {
                    // Editing checkout
                    if (selectedDates.length === 2) {
                        // Keep our checkin, take the second date as checkout
                        checkoutDate = selectedDates[1];
                    } else if (selectedDates.length === 1 && checkinDate) {
                        const clicked = selectedDates[0];
                        if (clicked > checkinDate) {
                            checkoutDate = clicked;
                            setTimeout(function() {
                                rangePicker.setDate([checkinDate, checkoutDate], false);
                            }, 10);
                        }
                    }
                    if (selectedDates.length === 0) {
                        checkinDate = null;
                        checkoutDate = null;
                    }
                }
                
                updateDateDisplay();
            },
            onClose: function() {
                checkinCell.classList.remove('active');
                checkoutCell.classList.remove('active');
                dateRangeBox.classList.remove('open');
            },
            onOpen: function() {
                dateRangeBox.classList.add('open');
                if (editingField === 'checkin') {
                    checkinCell.classList.add('active');
                    checkoutCell.classList.remove('active');
                } else {
                    checkoutCell.classList.add('active');
                    checkinCell.classList.remove('active');
                }
            }
        });

        // Click on CHECK-IN cell
        checkinCell.addEventListener('click', function(e) {
            e.stopPropagation();
            editingField = 'checkin';
            rangePicker.clear(false);
            rangePicker.open();
        });

        // Click on CHECK-OUT cell
        checkoutCell.addEventListener('click', function(e) {
            e.stopPropagation();
            editingField = 'checkout';
            if (checkinDate) {
                rangePicker.setDate([checkinDate], false);
            }
            rangePicker.open();
        });

        // Click on recap area
        dateRangeBottom.addEventListener('click', function(e) {
            e.stopPropagation();
            editingField = 'checkin';
            rangePicker.clear(false);
            rangePicker.open();
        });
    }
    
    // ========================
    // Guest Picker Airbnb Style
    // ========================
    const guestPickerBox = document.getElementById('guestPickerBox');
    const guestDropdown = document.getElementById('guestDropdown');
    const guestSummary = document.getElementById('guestSummary');
    const guestArrow = document.getElementById('guestArrow');

    const guestCounts = {
        adults: 1,
        children: 0,
        infants: 0,
        pets: 0
    };

    const guestLimits = {
        adults: { min: 1, max: 8 },
        children: { min: 0, max: 5 },
        infants: { min: 0, max: 4 },
        pets: { min: 0, max: 1 }
    };

    function updateGuestSummary() {
        const totalGuests = guestCounts.adults + guestCounts.children;
        let summary = `${totalGuests} ${totalGuests === 1 ? 'ospite' : 'ospiti'}`;
        
        if (guestCounts.infants > 0) {
            summary += `, ${guestCounts.infants} ${guestCounts.infants === 1 ? 'neonato' : 'neonati'}`;
        }
        if (guestCounts.pets > 0) {
            summary += `, ${guestCounts.pets} ${guestCounts.pets === 1 ? 'animale' : 'animali'}`;
        }
        
        if (guestSummary) guestSummary.textContent = summary;
        updateGuestRecap();
        updateWhatsAppLinks();
    }

    function updateGuestRecap() {
        const recapText = document.getElementById('guestRecapText');
        if (!recapText) return;

        let parts = [];
        if (guestCounts.adults > 0) {
            parts.push(`${guestCounts.adults} ${guestCounts.adults === 1 ? 'adulto' : 'adulti'}`);
        }
        if (guestCounts.children > 0) {
            parts.push(`${guestCounts.children} ${guestCounts.children === 1 ? 'bambino' : 'bambini'}`);
        }
        if (guestCounts.infants > 0) {
            parts.push(`${guestCounts.infants} ${guestCounts.infants === 1 ? 'neonato' : 'neonati'}`);
        }
        if (guestCounts.pets > 0) {
            parts.push(`${guestCounts.pets} ${guestCounts.pets === 1 ? 'animale domestico' : 'animali domestici'}`);
        }

        recapText.textContent = `Siete in ${parts.join(', ')}`;
    }

    function updateGuestButtons() {
        // Get max capacity from property (defaults to 8 if not set)
        const maxCapacity = currentProperty?.guests || 8;
        const currentTotal = guestCounts.adults + guestCounts.children;
        
        Object.keys(guestCounts).forEach(type => {
            const minusBtn = document.querySelector(`.guest-btn[data-type="${type}"][data-action="minus"]`);
            const plusBtn = document.querySelector(`.guest-btn[data-type="${type}"][data-action="plus"]`);
            const countEl = document.getElementById(`${type}Count`);
            
            if (countEl) countEl.textContent = guestCounts[type];
            if (minusBtn) minusBtn.disabled = guestCounts[type] <= guestLimits[type].min;
            
            // Disable plus button if at individual max OR if total capacity reached (for adults/children)
            let disablePlus = guestCounts[type] >= guestLimits[type].max;
            if ((type === 'adults' || type === 'children') && currentTotal >= maxCapacity) {
                disablePlus = true;
            }
            if (plusBtn) plusBtn.disabled = disablePlus;
        });
    }

    // Toggle dropdown
    if (guestPickerBox) {
        guestPickerBox.addEventListener('click', function(e) {
            e.stopPropagation();
            const isOpen = guestDropdown.classList.contains('open');
            if (isOpen) {
                guestDropdown.classList.remove('open');
                guestPickerBox.classList.remove('open');
            } else {
                guestDropdown.classList.add('open');
                guestPickerBox.classList.add('open');
                // Scroll so dropdown is fully visible
                setTimeout(function() {
                    const dropdownRect = guestDropdown.getBoundingClientRect();
                    const viewportHeight = window.innerHeight;
                    if (dropdownRect.bottom > viewportHeight - 20) {
                        window.scrollBy({
                            top: dropdownRect.bottom - viewportHeight + 30,
                            behavior: 'smooth'
                        });
                    }
                }, 50);
            }
        });
    }

    // Handle +/- buttons
    document.querySelectorAll('.guest-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const type = this.dataset.type;
            const action = this.dataset.action;
            const maxCapacity = currentProperty?.guests || 8;
            const currentTotal = guestCounts.adults + guestCounts.children;
            
            if (action === 'plus') {
                // Check individual limit
                if (guestCounts[type] >= guestLimits[type].max) return;
                
                // Check total capacity for adults/children
                if ((type === 'adults' || type === 'children') && currentTotal >= maxCapacity) return;
                
                guestCounts[type]++;
            } else if (action === 'minus' && guestCounts[type] > guestLimits[type].min) {
                guestCounts[type]--;
            }
            
            updateGuestButtons();
            updateGuestSummary();
        });
    });

    // Close dropdown on outside click
    document.addEventListener('click', function(e) {
        if (guestDropdown && !guestDropdown.contains(e.target) && !guestPickerBox.contains(e.target)) {
            guestDropdown.classList.remove('open');
            guestPickerBox.classList.remove('open');
        }
    });

    // Update WhatsApp message when user changes name or message
    const userNameInput = document.getElementById('userName');
    const userMessageInput = document.getElementById('userMessage');
    
    if (userNameInput) {
        userNameInput.addEventListener('input', updateWhatsAppLinks);
    }
    if (userMessageInput) {
        userMessageInput.addEventListener('input', updateWhatsAppLinks);
    }
    
    function formatDateShort(date) {
        const day = date.getDate();
        const months = ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic'];
        return `${day} ${months[date.getMonth()]}`;
    }

    function formatDateSlash(date) {
        const dd = date.getDate().toString().padStart(2, '0');
        const mm = (date.getMonth() + 1).toString().padStart(2, '0');
        return `${dd}/${mm}/${date.getFullYear()}`;
    }
});
