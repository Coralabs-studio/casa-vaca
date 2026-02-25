// Initialize the map when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure Leaflet CSS is loaded
    setTimeout(initializeMap, 100);
});

function initializeMap() {
    const mapElement = document.getElementById('properties-map');
    if (!mapElement) return;

    // Initialize map centered on Alghero
    const map = L.map('properties-map').setView([40.5579, 8.3206], 14);

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);

    // Force map to recalculate size after tiles load
    setTimeout(() => {
        map.invalidateSize();
    }, 200);

    // Custom icon for property markers
    const propertyIcon = L.divIcon({
        className: 'custom-marker',
        html: '<div style="background: linear-gradient(135deg, #8B6F47, #A0826D); width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 15px rgba(0,0,0,0.3); border: 3px solid white;"><i class="ph-fill ph-house-simple" style="color: white; font-size: 18px;"></i></div>',
        iconSize: [35, 35],
        iconAnchor: [17, 17],
        popupAnchor: [0, -20]
    });

    // Example properties - YOU WILL PROVIDE THE ACTUAL COORDINATES
    const properties = [
        {
            name: 'Casa del Centro',
            lat: 40.5579,
            lng: 8.3206,
            description: 'Centro storico, 2 camere, 4 ospiti',
            link: 'property-detail.html?id=1'
        },
        {
            name: 'Appartamento Marina',
            lat: 40.5560,
            lng: 8.3180,
            description: 'Vista mare, 3 camere, 6 ospiti',
            link: 'property-detail.html?id=2'
        },
        {
            name: 'Residence Corallo',
            lat: 40.5595,
            lng: 8.3225,
            description: 'Vicino spiagge, 1 camera, 2 ospiti',
            link: 'property-detail.html?id=3'
        },
        {
            name: 'Suite Catalana',
            lat: 40.5585,
            lng: 8.3190,
            description: 'Centro storico, 2 camere, 5 ospiti',
            link: 'property-detail.html?id=4'
        },
        {
            name: 'Villa Sardegna',
            lat: 40.5570,
            lng: 8.3215,
            description: 'Zona tranquilla, 4 camere, 8 ospiti',
            link: 'property-detail.html?id=5'
        }
    ];

    // Add markers for each property
    properties.forEach(property => {
        const marker = L.marker([property.lat, property.lng], { icon: propertyIcon }).addTo(map);
        
        marker.bindPopup(`
            <div class="map-popup">
                <h3>${property.name}</h3>
                <p>${property.description}</p>
                <a href="${property.link}">Vedi dettagli</a>
            </div>
        `);
    });
}
