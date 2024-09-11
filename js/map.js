function initMap() {
    const map = L.map('map').setView([13.0827, 80.2707], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Define shop locations with detailed information
    const locations = [
        { 
            lat: 11.0168, 
            lng: 76.9558, 
            name: 'DETAILING WOLVES - Coimbatore',
            address: '123 Example Street, Coimbatore, Tamil Nadu',
            phone: '+91 123 456 7890'
        },
        { 
            lat: 13.0827, 
            lng: 80.2707, 
            name: 'DETAILING WOLVES - Chennai',
            address: '456 Sample Road, Chennai, Tamil Nadu',
            phone: '+91 987 654 3210'
        },
        { 
            lat: 8.7294, 
            lng: 77.9194, 
            name: 'DETAILING WOLVES - Kanyakumari',
            address: '789 Test Lane, Kanyakumari, Tamil Nadu',
            phone: '+91 456 789 0123'
        }
    ];

    // Define the custom icon
    const shopIcon = L.icon({
        iconUrl: 'https://icons8.com/icon/10288/king', // Replace with your custom shop icon URL
        iconSize: [32, 32], // Size of the icon
        iconAnchor: [16, 32], // Anchor point of the icon (centered at the bottom)
        popupAnchor: [0, -32] // Position of the popup relative to the icon
    });

    // Add markers to the map with detailed popups
    const markers = {};
    locations.forEach(location => {
        const popupContent = `
            <strong>${location.name}</strong><br>
            Address: ${location.address}<br>
            Phone: ${location.phone}
        `;

        const marker = L.marker([location.lat, location.lng], { icon: shopIcon })
            .addTo(map)
            .bindPopup(popupContent);

        markers[location.name] = marker;
    });

    // Handle click events on the shop list
    document.querySelectorAll('.shop-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const lat = parseFloat(this.getAttribute('data-lat'));
            const lng = parseFloat(this.getAttribute('data-lng'));
            map.setView([lat, lng], 15);

            const name = this.textContent;
            if (markers[name]) {
                markers[name].openPopup();
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', initMap);
