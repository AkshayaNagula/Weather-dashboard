# Weather Dashboard 🌤️

A clean, responsive weather dashboard built with HTML, CSS, and JavaScript. Search any city in the world to get real-time weather conditions and a 5-day forecast powered by the OpenWeatherMap API.

## Features

- Current temperature, weather description, and icon
- Humidity, wind speed, feels-like temperature, and visibility
- 5-day forecast with daily high/low temperatures
- Responsive design — works on desktop and mobile
- Error handling for invalid cities or API issues

## Screenshots

> Add a screenshot here after you run the project!

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/weather-dashboard.git
cd weather-dashboard
```

### 2. Get a free API key

1. Go to [openweathermap.org](https://openweathermap.org/api) and create a free account
2. Navigate to **API Keys** in your dashboard
3. Copy your API key

### 3. Add your API key

Open `app.js` and replace `YOUR_API_KEY` on line 9:

```js
const API_KEY = 'YOUR_API_KEY'; // Replace this
```

### 4. Run the project

Just open `index.html` in your browser — no build tools or installs needed!

## Tech Stack

- HTML5
- CSS3 (Flexbox, CSS Grid, responsive design)
- Vanilla JavaScript (Fetch API, async/await, DOM manipulation)
- [OpenWeatherMap API](https://openweathermap.org/api)

## Project Structure

```
weather-dashboard/
├── index.html    # App structure and layout
├── style.css     # Styles and responsive design
├── app.js        # API calls and DOM logic
└── README.md     # Project documentation
```

## Future Improvements

- Toggle between °F and °C
- Save recent searches with localStorage
- Temperature chart using Chart.js
- Hourly forecast view
- Geolocation support (auto-detect your city)

## License

MIT
