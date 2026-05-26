// Replace the string below with your actual OpenWeatherMap API Key
const apiKey = '4d74813a10396e073da5f4f851eca716'; 
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherBox = document.getElementById('weather-box');
const errorMsg = document.getElementById('error-msg');

async function checkWeather(city) {
    if (!city) return;

    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        
        if (response.status == 404) {
            errorMsg.style.display = "block";
            weatherBox.style.display = "none";
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