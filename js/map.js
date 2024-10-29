function initMap() {
    // Initialize the map with a global view
    const map = L.map('map').setView([0, 0], 2); // Centered on (0, 0) with zoom level 2 for a global view

    // Add Mapbox tile layer with a stylish theme
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        id: 'mapbox/streets-v11', // You can use 'streets-v11', 'outdoors-v11', 'light-v10', etc.
        accessToken: 'pk.eyJ1IjoibWF0aGFuaXlhcHBhbiIsImEiOiJjbTE1YnFuMGQwN2VnMnFzOGptNGZwdGp2In0.MYR3iofxPqoz0P4zDJ81bA'
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
        },
        { 
            lat: 28.7041, 
            lng: 77.1025, 
            name: ' DETAILING WOLVES - New Delhi',
            address: '789 Test Lane, New Delhi , India',
            phone: '+91 456 789 0123'
        },
        { 
            lat: 19.0760, 
            lng: 72.8777, 
            name: 'DETAILING WOLVES - Mumbai',
            address: '789 Test Lane, Mumbai, India',
            phone: '+91 456 789 0123'
        },
        { 
            lat: 22.5726, 
            lng: 88.3639, 
            name: 'DETAILING WOLVES - Kolkata',
            address: '789 Test Lane, Kolkata, India',
            phone: '+91 456 789 0123'
        },
    ];

    // Define the custom icon
    const shopIcon = L.icon({
        iconUrl: './21.png', // Replace with your custom shop icon URL
        iconSize: [52, 32], // Size of the icon
        iconAnchor: [16, 32], // Anchor point of the icon (centered at the bottom)
        popupAnchor: [0, -32] // Position of the popup relative to the icon
    });

    // Initialize an array to hold the marker positions
    const markerPositions = [];

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
        
        // Add marker positions to the array
        markerPositions.push([location.lat, location.lng]);

        // Add a bounce animation effect when the marker is added
        marker.on('add', function() {
            this._icon.classList.add('bounce');
        });

        markers[location.name] = marker;
    });

    // Optionally fit the map bounds to include all markers
    if (markerPositions.length > 0) {
        const bounds = L.latLngBounds(markerPositions);
        map.fitBounds(bounds, {
            padding: [20, 20], // Add padding around the bounds
            maxZoom: 4 // Set a maximum zoom level to ensure the map does not zoom in too much
        });
    }

    // Handle click events on the shop list
    document.querySelectorAll('.shop-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const lat = parseFloat(this.getAttribute('data-lat'));
            const lng = parseFloat(this.getAttribute('data-lng'));
            
            // Smoothly animate the view transition
            map.flyTo([lat, lng], 15, {
                duration: 1 // Duration of the animation in seconds
            });

            const name = this.textContent;
            if (markers[name]) {
                markers[name].openPopup();
            }
        });
    });
}


document.addEventListener('DOMContentLoaded', initMap);
