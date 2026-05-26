// Replace the string below with your actual OpenWeatherMap API Key
const apiKey = '4d74813a10396e073da5f4f851eca716'; 
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherBox = document.getElementById('weather-box');
const errorMsg = document.getElementById('error-msg');
const mapWrapper = document.getElementById('map-wrapper');

let map;
let marker;

function openInGoogleMaps(lat, lon) {
    const mapsUrl = `https://www.google.com/maps?q=${lat},${lon}`;
    window.open(mapsUrl, '_blank');
}

function updateMap(lat, lon, label) {
    if (!map) {
        map = L.map('map');
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        map.on('click', (event) => {
            openInGoogleMaps(event.latlng.lat, event.latlng.lng);
        });
    }

    map.setView([lat, lon], 12);

    if (!marker) {
        marker = L.marker([lat, lon]).addTo(map);
    } else {
        marker.setLatLng([lat, lon]);
    }

    marker.off('click');
    marker.on('click', () => {
        openInGoogleMaps(lat, lon);
    });

    marker.bindPopup(label).openPopup();
    mapWrapper.style.display = 'block';

    // The map needs a resize tick after becoming visible.
    setTimeout(() => map.invalidateSize(), 0);
}

async function checkWeather(city) {
    if (!city) return;

    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        
        if (response.status == 404) {
            errorMsg.style.display = "block";
            weatherBox.style.display = "none";
            mapWrapper.style.display = "none";
        } else {
            var data = await response.json();

            // Updating HTML elements with API data
            document.getElementById('city').innerHTML = data.name;
            document.getElementById('temp').innerHTML = Math.round(data.main.temp) + "°C";
            document.getElementById('description').innerHTML = data.weather[0].description;
            document.getElementById('humidity').innerHTML = data.main.humidity + "%";
            document.getElementById('wind').innerHTML = data.wind.speed + " km/h";

            weatherBox.style.display = "block";
            errorMsg.style.display = "none";

            const lat = data.coord?.lat;
            const lon = data.coord?.lon;
            if (typeof lat === 'number' && typeof lon === 'number') {
                updateMap(lat, lon, data.name);
            } else {
                mapWrapper.style.display = "none";
            }
        }
    } catch (error) {
        console.error("Error fetching data: ", error);
        alert("Something went wrong. Please check your internet connection.");
    }
}

// Event listener for the click action
searchBtn.addEventListener('click', () => {
    checkWeather(cityInput.value);
});

// Allow pressing "Enter" key to trigger search
cityInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        checkWeather(cityInput.value);
    }
});