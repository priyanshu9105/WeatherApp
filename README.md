# WeatherApp

A small, client-side weather app with a playful, comic-style frontend.

Features
- Search weather by city name (press Enter or click Search).
- Displays temperature, weather description, humidity, wind speed.
- Extra details: feels-like temperature, pressure, visibility, sunrise/sunset, coordinates.
- Integrated map (Leaflet + OpenStreetMap) showing the exact location returned by the API.
  - Click the map or the marker to open the exact point in Google Maps.
- Comic-style UI with a light/dark theme toggle (top-right of the card).

Files
- `index.html` — main page and structure.
- `style.css` — comic-style CSS and theme variables.
- `app.js` — logic for fetching weather, updating UI, map interactions.

Prerequisites
- A modern browser with network access.
- OpenWeatherMap API key (get a free key at https://openweathermap.org/).

Setup
1. Place your OpenWeatherMap API key in `app.js` by replacing the value of the `apiKey` constant near the top of the file:

```js
// Replace the string below with your actual OpenWeatherMap API Key
const apiKey = 'YOUR_API_KEY_HERE';
```

2. Serve the `WeatherApp` folder with a local static server (recommended) or open `index.html` directly.

Quick local server (Python 3):

```bash
cd "WeatherApp"
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

Usage
- Type a city name and press Enter or click Search.
- The weather card will populate and the map will center on the location.
- Use the theme toggle (top-right) to switch between light and dark modes; the choice is saved in your browser.

Notes & Troubleshooting
- If weather data does not appear, verify your API key and check the browser console for fetch errors.
- The app uses remote CDN links for Leaflet and Google Maps is opened in a new tab when clicking the map.

License
This project is provided as-is for demo purposes.
