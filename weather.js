"use strict";

const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";
const DEFAULT_CITY = {
  name: "Taoyuan",
  displayName: "桃園市",
};

const WEATHER_CODES = {
  0: { label: "晴朗", icon: "☀️" },
  1: { label: "大致晴朗", icon: "🌤️" },
  2: { label: "局部多雲", icon: "⛅" },
  3: { label: "陰天", icon: "☁️" },
  45: { label: "有霧", icon: "🌫️" },
  48: { label: "霧凇", icon: "🌫️" },
  51: { label: "毛毛雨", icon: "🌦️" },
  53: { label: "中等毛毛雨", icon: "🌦️" },
  55: { label: "強烈毛毛雨", icon: "🌧️" },
  56: { label: "凍毛毛雨", icon: "🌧️" },
  57: { label: "強烈凍毛毛雨", icon: "🌧️" },
  61: { label: "小雨", icon: "🌦️" },
  63: { label: "中雨", icon: "🌧️" },
  65: { label: "大雨", icon: "🌧️" },
  66: { label: "凍雨", icon: "🌧️" },
  67: { label: "強烈凍雨", icon: "🌧️" },
  71: { label: "小雪", icon: "🌨️" },
  73: { label: "中雪", icon: "🌨️" },
  75: { label: "大雪", icon: "❄️" },
  77: { label: "雪粒", icon: "🌨️" },
  80: { label: "局部陣雨", icon: "🌦️" },
  81: { label: "陣雨", icon: "🌧️" },
  82: { label: "強陣雨", icon: "🌧️" },
  85: { label: "局部陣雪", icon: "🌨️" },
  86: { label: "強陣雪", icon: "❄️" },
  95: { label: "雷雨", icon: "⛈️" },
  96: { label: "雷雨伴隨冰雹", icon: "⛈️" },
  99: { label: "強雷雨伴隨冰雹", icon: "⛈️" },
};

const elements = {
  form: document.querySelector("#search-form"),
  search: document.querySelector("#city-search"),
  suggestions: document.querySelector("#suggestions"),
  status: document.querySelector("#status"),
  title: document.querySelector("#current-title"),
  date: document.querySelector("#local-date"),
  icon: document.querySelector("#current-icon"),
  temperature: document.querySelector("#temperature"),
  condition: document.querySelector("#condition"),
  feelsLike: document.querySelector("#feels-like"),
  feelsLikeCard: document.querySelector("#feels-like-card"),
  humidity: document.querySelector("#humidity"),
  windSpeed: document.querySelector("#wind-speed"),
  uvIndex: document.querySelector("#uv-index"),
  forecast: document.querySelector("#forecast-grid"),
};

let searchTimer;
let geocodingController;
let activeForecastController;

function setStatus(message, state = "") {
  elements.status.textContent = message;
  elements.status.dataset.state = state;
}

function weatherForCode(code, isDay = true) {
  const weather = WEATHER_CODES[code] || { label: "天氣狀況未知", icon: "🌡️" };
  if (code === 0 && !isDay) return { label: "晴朗", icon: "🌙" };
  if (code === 1 && !isDay) return { label: "大致晴朗", icon: "🌙" };
  if (code === 2 && !isDay) return { label: "局部多雲", icon: "☁️" };
  return weather;
}

function cityLabel(city) {
  if (city.displayName) return city.displayName;
  return [city.name, city.admin1, city.country].filter(Boolean).join("，");
}

function formatNumber(value, digits = 0) {
  return Number.isFinite(value) ? Number(value).toFixed(digits) : "—";
}

function formatCurrentDate(time, timezone) {
  const date = time
    ? new Date(`${time.slice(0, 10)}T12:00:00Z`)
    : new Date();
  return new Intl.DateTimeFormat("zh-TW", {
    timeZone: time ? "UTC" : timezone,
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function renderCurrent(city, current, timezone) {
  const weather = weatherForCode(current.weather_code, current.is_day === 1);
  elements.title.textContent = cityLabel(city);
  elements.date.textContent = formatCurrentDate(current.time, timezone);
  elements.icon.textContent = weather.icon;
  elements.icon.setAttribute("aria-label", weather.label);
  elements.temperature.textContent = formatNumber(current.temperature_2m);
  elements.condition.textContent = weather.label;
  elements.feelsLike.textContent = formatNumber(current.apparent_temperature);
  elements.feelsLikeCard.textContent = formatNumber(current.apparent_temperature);
  elements.humidity.textContent = formatNumber(current.relative_humidity_2m);
  elements.windSpeed.textContent = formatNumber(current.wind_speed_10m, 1);
  elements.uvIndex.textContent = formatNumber(current.uv_index, 1);
}

function renderForecast(daily) {
  const days = daily.time.map((date, index) => {
    const weather = weatherForCode(daily.weather_code[index]);
    const dayLabel = index === 0
      ? "今天"
      : new Intl.DateTimeFormat("zh-TW", {
        timeZone: "UTC",
        weekday: "short",
      }).format(new Date(`${date}T12:00:00Z`));
    const rainChance = daily.precipitation_probability_max?.[index];
    return `
      <article class="forecast-day glass-card">
        <p class="forecast-date">${dayLabel}</p>
        <span class="forecast-icon" role="img" aria-label="${weather.label}">${weather.icon}</span>
        <p class="forecast-condition">${weather.label}</p>
        <div class="forecast-temps">
          <span>${formatNumber(daily.temperature_2m_max[index])}°</span>
          <span>${formatNumber(daily.temperature_2m_min[index])}°</span>
        </div>
        <p class="rain-chance">${Number.isFinite(rainChance) ? `雨機率 ${rainChance}%` : "&nbsp;"}</p>
      </article>`;
  });
  elements.forecast.innerHTML = days.join("");
}

async function loadWeather(city) {
  if (activeForecastController) activeForecastController.abort();
  activeForecastController = new AbortController();
  setStatus(`正在載入${city.displayName || city.name}的天氣資料…`, "loading");

  const params = new URLSearchParams({
    latitude: city.latitude,
    longitude: city.longitude,
    current: [
      "temperature_2m",
      "apparent_temperature",
      "relative_humidity_2m",
      "wind_speed_10m",
      "uv_index",
      "weather_code",
      "is_day",
    ].join(","),
    daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
    forecast_days: "7",
    timezone: city.timezone || "auto",
    wind_speed_unit: "kmh",
  });

  try {
    const response = await fetch(`${FORECAST_URL}?${params}`, {
      signal: activeForecastController.signal,
    });
    if (!response.ok) throw new Error(`Forecast request failed (${response.status})`);
    const forecast = await response.json();
    if (!forecast.current || !forecast.daily) throw new Error("Weather data is incomplete");

    renderCurrent(city, forecast.current, forecast.timezone || city.timezone || "auto");
    renderForecast(forecast.daily);
    setStatus(`已更新：${new Date().toLocaleTimeString("zh-TW", { hour: "2-digit", minute: "2-digit" })}`);
  } catch (error) {
    if (error.name === "AbortError") return;
    console.error("Unable to load weather data:", error);
    setStatus("天氣資料載入失敗，請檢查網路連線後再試。", "error");
  }
}

async function searchCities(query) {
  if (geocodingController) geocodingController.abort();
  geocodingController = new AbortController();
  const params = new URLSearchParams({ name: query, count: "6", language: "zh", format: "json" });
  const response = await fetch(`${GEOCODING_URL}?${params}`, {
    signal: geocodingController.signal,
  });
  if (!response.ok) throw new Error(`Geocoding request failed (${response.status})`);
  const data = await response.json();
  return data.results || [];
}

function closeSuggestions() {
  elements.suggestions.classList.remove("is-open");
  elements.search.setAttribute("aria-expanded", "false");
}

function showSuggestions(cities) {
  elements.suggestions.replaceChildren();
  for (const city of cities) {
    const option = document.createElement("button");
    option.type = "button";
    option.className = "suggestion";
    option.setAttribute("role", "option");
    option.textContent = city.name;
    const detail = document.createElement("small");
    detail.textContent = [city.admin1, city.country].filter(Boolean).join("，");
    option.append(detail);
    option.addEventListener("click", () => {
      elements.search.value = city.name;
      closeSuggestions();
      loadWeather(city);
    });
    elements.suggestions.append(option);
  }
  elements.suggestions.classList.toggle("is-open", cities.length > 0);
  elements.search.setAttribute("aria-expanded", String(cities.length > 0));
}

elements.search.addEventListener("input", () => {
  clearTimeout(searchTimer);
  const query = elements.search.value.trim();
  if (query.length < 2) {
    closeSuggestions();
    return;
  }

  searchTimer = setTimeout(async () => {
    try {
      showSuggestions(await searchCities(query));
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Unable to search for cities:", error);
        closeSuggestions();
      }
    }
  }, 300);
});

elements.form.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearTimeout(searchTimer);
  const query = elements.search.value.trim();
  if (!query) return;

  setStatus("正在搜尋城市…", "loading");
  try {
    const cities = await searchCities(query);
    if (cities.length === 0) {
      setStatus("找不到這個城市，請確認名稱後再試。", "error");
      closeSuggestions();
      return;
    }
    closeSuggestions();
    loadWeather(cities[0]);
  } catch (error) {
    if (error.name === "AbortError") return;
    console.error("Unable to search for city:", error);
    setStatus("城市搜尋失敗，請稍後再試。", "error");
  }
});

document.addEventListener("click", (event) => {
  if (!elements.form.contains(event.target)) closeSuggestions();
});

async function initializeWeather() {
  try {
    const cities = await searchCities(DEFAULT_CITY.name);
    const taoyuan = cities.find((city) => city.country_code === "TW")
      || cities[0];
    if (!taoyuan) throw new Error("Taoyuan was not found by the geocoding service");
    loadWeather({
      ...taoyuan,
      displayName: DEFAULT_CITY.displayName,
      timezone: taoyuan.timezone || "Asia/Taipei",
    });
  } catch (error) {
    console.error("Unable to find Taoyuan:", error);
    setStatus("無法搜尋桃園市，請檢查網路連線後再試。", "error");
  }
}

initializeWeather();
