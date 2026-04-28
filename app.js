// =============================================
//  Weather Dashboard — app.js
//  Replace YOUR_API_KEY below with your key
//  from https://openweathermap.org/api (free)
// =============================================

const API_KEY = 'YOUR_API_KEY';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const weatherIcons = {
  Clear: '☀️',
  Clouds: '☁️',
  Rain: '🌧️',
  Drizzle: '🌦️',
  Thunderstorm: '⛈️',
  Snow: '❄️',
  Mist: '🌫️',
  Fog: '🌫️',
  Haze: '🌫️',
  Smoke: '🌫️',
  Dust: '🌫️',
  Sand: '🌫️',
  Ash: '🌫️',
  Squall: '💨',
  Tornado: '🌪️',
};

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function getIcon(condition) {
  return weatherIcons[condition] || '🌡️';
}

function formatDate(date) {
  return `${DAYS[date.getDay()]}, ${MONTHS[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`;
}

function getMostFrequent(arr) {
  return arr.sort((a, b) =>
    arr.filter(v => v === b).length - arr.filter(v => v === a).length
  )[0];
}

async function fetchWeather() {
  const city = document.getElementById('cityInput').value.trim();
  if (!city) return;

  setLoading(true);
  clearError();
  hideWeather();

  try {
    const [currentRes, forecastRes] = await Promise.all([
      fetch(`${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=imperial`),
      fetch(`${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=imperial`),
    ]);

    if (!currentRes.ok) {
      if (currentRes.status === 404) throw new Error('City not found. Please check the spelling and try again.');
      if (currentRes.status === 401) throw new Error('Invalid API key. Please check your API key in app.js.');
      throw new Error('Something went wrong. Please try again.');
    }

    const current = await currentRes.json();
    const forecast = await forecastRes.json();

    renderCurrent(current);
    renderForecast(forecast);

    setLoading(false);
    showWeather();
  } catch (error) {
    setLoading(false);
    showError(error.message);
  }
}

function renderCurrent(data) {
  const now = new Date();
  document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
  document.getElementById('currentDate').textContent = formatDate(now);
  document.getElementById('currentTemp').textContent = `${Math.round(data.main.temp)}°F`;
  document.getElementById('currentDesc').textContent =
    data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
  document.getElementById('currentIcon').textContent = getIcon(data.weather[0].main);
  document.getElementById('humidity').textContent = `${data.main.humidity}%`;
  document.getElementById('windSpeed').textContent = `${Math.round(data.wind.speed)} mph`;
  document.getElementById('feelsLike').textContent = `${Math.round(data.main.feels_like)}°F`;
  document.getElementById('visibility').textContent = `${Math.round(data.visibility / 1609.34)} mi`;
}

function renderForecast(data) {
  const dailyMap = {};

  data.list.forEach(item => {
    const date = new Date(item.dt * 1000);
    const key = date.toDateString();
    if (!dailyMap[key]) {
      dailyMap[key] = { date, temps: [], conditions: [] };
    }
    dailyMap[key].temps.push(item.main.temp);
    dailyMap[key].conditions.push(item.weather[0].main);
  });

  const forecastGrid = document.getElementById('forecastGrid');
  forecastGrid.innerHTML = '';

  Object.values(dailyMap).slice(0, 5).forEach(day => {
    const high = Math.round(Math.max(...day.temps));
    const low = Math.round(Math.min(...day.temps));
    const condition = getMostFrequent(day.conditions);

    const card = document.createElement('div');
    card.className = 'forecast-card';
    card.innerHTML = `
      <div class="fc-day">${DAYS[day.date.getDay()]}</div>
      <div class="fc-icon">${getIcon(condition)}</div>
      <div class="fc-high">${high}°</div>
      <div class="fc-low">${low}°</div>
    `;
    forecastGrid.appendChild(card);
  });
}

// UI helpers
function setLoading(isLoading) {
  document.getElementById('loadingMsg').style.display = isLoading ? 'block' : 'none';
}

function showError(msg) {
  const el = document.getElementById('errorMsg');
  el.textContent = msg;
  el.style.display = 'block';
}

function clearError() {
  document.getElementById('errorMsg').style.display = 'none';
}

function showWeather() {
  document.getElementById('weatherContent').style.display = 'block';
}

function hideWeather() {
  document.getElementById('weatherContent').style.display = 'none';
}

// Allow pressing Enter to search
document.getElementById('cityInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') fetchWeather();
});
