const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";
const RAINVIEWER_URL = "https://api.rainviewer.com/public/weather-maps.json";
const DEFAULT_CITY = "Taoyuan";
const RADAR_WINDOW_SECONDS = 2 * 60 * 60;
const RADAR_FRAME_INTERVAL_MS = 600;
const BASE_MAP_URL =
  "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}";
const RADAR_TILE_URL = "https://tilecache.rainviewer.com";
const CITY_ALIASES = new Map([
  ["桃園", "Taoyuan"],
  ["桃園市", "Taoyuan"],
  ["桃園區", "Taoyuan"],
  ["台北", "Taipei"],
  ["臺北", "Taipei"],
  ["台北市", "Taipei"],
  ["臺北市", "Taipei"],
  ["新北", "New Taipei"],
  ["新北市", "New Taipei"],
  ["台中", "Taichung"],
  ["臺中", "Taichung"],
  ["台中市", "Taichung"],
  ["臺中市", "Taichung"],
  ["台南", "Tainan"],
  ["臺南", "Tainan"],
  ["台南市", "Tainan"],
  ["臺南市", "Tainan"],
  ["高雄", "Kaohsiung"],
  ["高雄市", "Kaohsiung"],
  ["香港", "Hong Kong"],
  ["澳門", "Macau"],
  ["北京", "Beijing"],
  ["上海", "Shanghai"],
  ["廣州", "Guangzhou"],
  ["深圳", "Shenzhen"],
  ["東京", "Tokyo"],
  ["大阪", "Osaka"],
  ["首爾", "Seoul"],
  ["新加坡", "Singapore"],
]);
const COUNTRY_NAMES = {
  TW: "台灣",
  CN: "中國",
  JP: "日本",
  KR: "南韓",
  US: "美國",
  GB: "英國",
  HK: "香港",
  MO: "澳門",
  SG: "新加坡",
};

const elements = {
  searchForm: document.querySelector("#search-form"),
  searchInput: document.querySelector("#city-search"),
  suggestions: document.querySelector("#suggestions"),
  locationName: document.querySelector("#location-name"),
  locationDetail: document.querySelector("#location-detail"),
  updatedAt: document.querySelector("#updated-at"),
  currentCard: document.querySelector(".current-card"),
  currentDate: document.querySelector("#current-date"),
  currentIcon: document.querySelector("#current-icon"),
  currentTemperature: document.querySelector("#current-temperature"),
  currentCondition: document.querySelector("#current-condition"),
  feelsLike: document.querySelector("#feels-like"),
  humidity: document.querySelector("#humidity"),
  windSpeed: document.querySelector("#wind-speed"),
  windNote: document.querySelector("#wind-note"),
  uvIndex: document.querySelector("#uv-index"),
  uvNote: document.querySelector("#uv-note"),
  forecastList: document.querySelector("#forecast-list"),
  pageMessage: document.querySelector("#page-message"),
  radarMap: document.querySelector("#radar-map"),
  radarStatus: document.querySelector("#radar-status"),
  radarPlay: document.querySelector("#radar-play"),
  radarPlayLabel: document.querySelector("#radar-play-label"),
  radarTimeline: document.querySelector("#radar-timeline"),
  radarTime: document.querySelector("#radar-time"),
  weatherBackground: document.querySelector("#weather-bg"),
};

const weekdayFormatter = new Intl.DateTimeFormat("zh-TW", {
  weekday: "short",
  timeZone: "UTC",
});
let suggestions = [];
let activeSuggestion = -1;
let suggestionController;
let weatherController;
let debounceTimer;
let requestId = 0;
let radarMap;
let radarLayer;
let radarFrames = [];
let radarFrameIndex = 0;
let radarTimer;
let radarController;
let radarRequestId = 0;
let radarTimeZone = "UTC";
let radarTileHost = RADAR_TILE_URL;
let weatherBackground;

const WEATHER_BACKGROUND_VERTEX_SHADER = `
  attribute float aSize;
  attribute float aOpacity;
  uniform float uPixelRatio;
  varying float vOpacity;

  void main() {
    vOpacity = aOpacity;
    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * viewPosition;
    gl_PointSize = clamp(aSize * uPixelRatio, 1.0, 260.0);
  }
`;

const WEATHER_BACKGROUND_FRAGMENT_SHADER = `
  uniform float uMode;
  uniform vec3 uColor;
  varying float vOpacity;

  void main() {
    vec2 point = gl_PointCoord - 0.5;
    float alpha;

    if (uMode < 0.5) {
      alpha = 1.0 - smoothstep(0.04, 0.5, length(point));
    } else if (uMode < 1.5) {
      float streak = 1.0 - smoothstep(0.025, 0.13, abs(point.x + point.y * 0.12));
      float ends = smoothstep(-0.5, -0.36, point.y) * (1.0 - smoothstep(0.32, 0.5, point.y));
      alpha = streak * ends;
    } else {
      alpha = 1.0 - smoothstep(0.12, 0.5, length(point));
    }

    if (alpha < 0.015) discard;
    gl_FragColor = vec4(uColor, alpha * vOpacity);
  }
`;

function createRadialTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext("2d");
  if (!context) return undefined;

  const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, "rgba(255,255,255,0.72)");
  gradient.addColorStop(0.2, "rgba(238,235,255,0.3)");
  gradient.addColorStop(1, "rgba(224,231,255,0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(canvas);
}

function createCloudTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 144;
  const context = canvas.getContext("2d");
  if (!context) return undefined;

  context.filter = "blur(13px)";
  const puffs = [
    [65, 78, 42, 25],
    [101, 57, 48, 34],
    [148, 72, 49, 31],
    [192, 84, 37, 22],
  ];
  for (const [x, y, radiusX, radiusY] of puffs) {
    const gradient = context.createRadialGradient(x, y, 4, x, y, radiusX);
    gradient.addColorStop(0, "rgba(201,211,239,0.17)");
    gradient.addColorStop(1, "rgba(153,170,208,0)");
    context.fillStyle = gradient;
    context.beginPath();
    context.ellipse(x, y, radiusX, radiusY, 0, 0, Math.PI * 2);
    context.fill();
  }
  context.filter = "none";
  return new THREE.CanvasTexture(canvas);
}

function createWeatherBackground() {
  const canvas = elements.weatherBackground;
  if (!canvas) return;
  if (!window.THREE) {
    console.error("Three.js did not load; weather background effects are disabled.");
    canvas.hidden = true;
    return;
  }

  try {
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 2;
    const particles = new THREE.Points(
      new THREE.BufferGeometry(),
      new THREE.ShaderMaterial({
        transparent: true,
        depthTest: false,
        depthWrite: false,
        uniforms: {
          uPixelRatio: { value: renderer.getPixelRatio() },
          uMode: { value: 2 },
          uColor: { value: new THREE.Color("#aebcdb") },
        },
        vertexShader: WEATHER_BACKGROUND_VERTEX_SHADER,
        fragmentShader: WEATHER_BACKGROUND_FRAGMENT_SHADER,
      }),
    );
    particles.frustumCulled = false;
    scene.add(particles);

    const spriteTexture = createRadialTexture();
    const cloudTexture = createCloudTexture();
    const sprites = [];
    if (spriteTexture && cloudTexture) {
      for (let index = 0; index < 5; index += 1) {
        const material = new THREE.SpriteMaterial({
          map: index < 2 ? spriteTexture : cloudTexture,
          color: index < 2 ? "#e5d7b6" : "#b5c3de",
          transparent: true,
          opacity: 0,
          depthTest: false,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });
        const sprite = new THREE.Sprite(material);
        sprite.position.z = -0.2;
        sprite.scale.set(250, 140, 1);
        scene.add(sprite);
        sprites.push(sprite);
      }
    } else {
      console.error("Could not create weather background textures.");
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const clock = new THREE.Clock();
    let mode;
    let animationFrame;
    let previousFrameTime = 0;
    let width = 1;
    let height = 1;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      renderer.setSize(width, height, false);
      camera.left = -width / 2;
      camera.right = width / 2;
      camera.top = height / 2;
      camera.bottom = -height / 2;
      camera.updateProjectionMatrix();
      particles.material.uniforms.uPixelRatio.value = renderer.getPixelRatio();
      if (particles.geometry.attributes.position) {
        const positions = particles.geometry.attributes.position.array;
        for (let index = 0; index < positions.length; index += 3) {
          positions[index] = THREE.MathUtils.clamp(positions[index], -width / 2, width / 2);
          positions[index + 1] = THREE.MathUtils.clamp(
            positions[index + 1],
            -height / 2,
            height / 2,
          );
        }
        particles.geometry.attributes.position.needsUpdate = true;
      }
      render(clock.getElapsedTime());
    }

    function setMode(nextMode) {
      if (mode === nextMode) return;
      mode = nextMode;
      canvas.dataset.weatherMode = mode;
      const isRain = mode === "rain";
      const isSun = mode === "sun";
      const isCloud = mode === "clouds";
      const count = isRain
        ? Math.min(210, Math.round((width * height) / 4200))
        : isSun
          ? Math.min(120, Math.round((width * height) / 7000))
          : Math.min(36, Math.round((width * height) / 28000));
      const positions = new Float32Array(count * 3);
      const sizes = new Float32Array(count);
      const opacities = new Float32Array(count);
      const velocities = new Float32Array(count * 2);

      for (let index = 0; index < count; index += 1) {
        const offset = index * 3;
        positions[offset] = (Math.random() - 0.5) * width;
        positions[offset + 1] = (Math.random() - 0.5) * height;
        positions[offset + 2] = 0;
        sizes[index] = isRain
          ? 14 + Math.random() * 22
          : isSun
            ? 1.3 + Math.random() * 3
            : 90 + Math.random() * 150;
        opacities[index] = isRain
          ? 0.2 + Math.random() * 0.42
          : isSun
            ? 0.25 + Math.random() * 0.65
            : 0.09 + Math.random() * 0.1;
        velocities[index * 2] = isRain
          ? -18 - Math.random() * 32
          : isCloud
            ? 3 + Math.random() * 8
            : (Math.random() - 0.5) * 2;
        velocities[index * 2 + 1] = isRain
          ? -190 - Math.random() * 260
          : isSun
            ? 2 + Math.random() * 8
            : (Math.random() - 0.5) * 3;
      }

      particles.geometry.dispose();
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
      geometry.setAttribute("aOpacity", new THREE.BufferAttribute(opacities, 1));
      particles.geometry = geometry;
      particles.material.uniforms.uMode.value = isSun ? 0 : isRain ? 1 : 2;
      particles.material.uniforms.uColor.value.set(
        isSun ? "#ffe5b1" : isRain ? "#b9d4f5" : "#aebcdb",
      );

      sprites.forEach((sprite, index) => {
        const isFlare = isSun && index < 2;
        const isMist = isCloud && index >= 2;
        sprite.visible = isFlare || isMist;
        sprite.material.opacity = isFlare ? 0.12 + index * 0.025 : isMist ? 0.5 : 0;
        sprite.material.color.set(isFlare ? "#f2d5a5" : "#a9b8d5");
        sprite.scale.set(
          isFlare ? width * (0.66 + index * 0.14) : width * 0.67,
          isFlare ? height * (0.55 + index * 0.1) : height * 0.37,
          1,
        );
        sprite.position.x = isFlare
          ? width * (0.35 - index * 0.06)
          : (index - 3) * width * 0.19;
        sprite.position.y = isFlare
          ? height * (0.31 - index * 0.11)
          : (index % 2 === 0 ? 1 : -1) * height * 0.22;
      });

      particles.userData.velocities = velocities;
      render(clock.getElapsedTime());
    }

    function render(time) {
      const velocities = particles.userData.velocities;
      const positions = particles.geometry.attributes.position;
      if (velocities && positions) {
        const delta = Math.min(clock.getDelta(), 0.05);
        const halfWidth = width / 2;
        const halfHeight = height / 2;
        for (let index = 0; index < positions.count; index += 1) {
          const offset = index * 3;
          positions.array[offset] += velocities[index * 2] * delta;
          positions.array[offset + 1] += velocities[index * 2 + 1] * delta;
          if (mode === "rain") {
            if (positions.array[offset + 1] < -halfHeight - 24) {
              positions.array[offset + 1] = halfHeight + Math.random() * 40;
              positions.array[offset] = (Math.random() - 0.5) * width;
            }
            if (positions.array[offset] < -halfWidth - 24) {
              positions.array[offset] = halfWidth + 12;
            }
          } else {
            if (positions.array[offset] > halfWidth + 150) {
              positions.array[offset] = -halfWidth - 150;
            } else if (positions.array[offset] < -halfWidth - 150) {
              positions.array[offset] = halfWidth + 150;
            }
            if (positions.array[offset + 1] > halfHeight + 150) {
              positions.array[offset + 1] = -halfHeight - 150;
            } else if (positions.array[offset + 1] < -halfHeight - 150) {
              positions.array[offset + 1] = halfHeight + 150;
            }
          }
        }
        positions.needsUpdate = true;
      }

      pointer.x += (pointer.targetX - pointer.x) * 0.025;
      pointer.y += (pointer.targetY - pointer.y) * 0.025;
      scene.position.set(pointer.x, pointer.y, 0);
      if (mode === "sun") {
        sprites.slice(0, 2).forEach((sprite, index) => {
          sprite.material.opacity = 0.1 + (Math.sin(time * 0.35 + index) + 1) * 0.035;
        });
      } else if (mode === "clouds") {
        sprites.slice(2).forEach((sprite, index) => {
          sprite.position.x += Math.sin(time * 0.08 + index) * 0.08;
        });
      }
      renderer.render(scene, camera);
    }

    function animate(timestamp) {
      if (document.hidden || reducedMotion.matches) {
        animationFrame = undefined;
        return;
      }
      if (timestamp - previousFrameTime >= 1000 / 30) {
        previousFrameTime = timestamp;
        render(clock.getElapsedTime());
      }
      animationFrame = window.requestAnimationFrame(animate);
    }

    function startAnimation() {
      if (document.hidden || reducedMotion.matches || animationFrame !== undefined) return;
      animationFrame = window.requestAnimationFrame(animate);
    }

    function handleVisibilityChange() {
      if (document.hidden) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = undefined;
      } else {
        startAnimation();
      }
    }

    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener(
      "pointermove",
      (event) => {
        pointer.targetX = ((event.clientX / width) * 2 - 1) * 7;
        pointer.targetY = (1 - (event.clientY / height) * 2) * 7;
      },
      { passive: true },
    );
    reducedMotion.addEventListener("change", handleVisibilityChange);
    resize();
    setMode("clouds");
    startAnimation();
    weatherBackground = { setMode };
  } catch (error) {
    console.error("Could not initialize the weather background effect.", error);
    canvas.hidden = true;
  }
}

function setWeatherBackground(weatherCode, isDay) {
  if (!weatherBackground) return;
  const isRain =
    (weatherCode >= 51 && weatherCode <= 67) ||
    (weatherCode >= 80 && weatherCode <= 82) ||
    (weatherCode >= 95 && weatherCode <= 99);
  const isClear = weatherCode >= 0 && weatherCode <= 2 && isDay === 1;
  weatherBackground.setMode(isRain ? "rain" : isClear ? "sun" : "clouds");
}

function getWeatherDescription(code) {
  if (code === 0) return { text: "晴朗", icon: "☀️" };
  if (code === 1) return { text: "大致晴朗", icon: "🌤️" };
  if (code === 2) return { text: "局部多雲", icon: "⛅" };
  if (code === 3) return { text: "陰天", icon: "☁️" };
  if (code === 45 || code === 48) return { text: "有霧", icon: "🌫️" };
  if (code === 51 || code === 53 || code === 55) return { text: "毛毛雨", icon: "🌦️" };
  if (code === 56 || code === 57) return { text: "凍雨", icon: "🌧️" };
  if (code === 61 || code === 63 || code === 65) return { text: "下雨", icon: "🌧️" };
  if (code === 66 || code === 67) return { text: "凍雨", icon: "🌧️" };
  if (code === 71 || code === 73 || code === 75 || code === 77) {
    return { text: "下雪", icon: "🌨️" };
  }
  if (code === 80 || code === 81 || code === 82) return { text: "陣雨", icon: "🌦️" };
  if (code === 85 || code === 86) return { text: "陣雪", icon: "🌨️" };
  if (code === 95 || code === 96 || code === 99) return { text: "雷雨", icon: "⛈️" };
  return { text: "天氣多變", icon: "🌤️" };
}

function getUvDescription(value) {
  if (value < 3) return "低，日常防護即可";
  if (value < 6) return "中等，建議做好防曬";
  if (value < 8) return "偏高，請留意防曬";
  if (value < 11) return "很高，請加強防護";
  return "極高，請避免長時間曝曬";
}

function getWindDescription(speed) {
  if (speed < 6) return "微風徐徐";
  if (speed < 20) return "和風輕拂";
  if (speed < 40) return "風勢稍強";
  return "風勢較強，留意戶外活動";
}

function getLocationName(place) {
  if (place.country_code === "TW" && /[區区]$/.test(place.name) && place.admin2) {
    return place.admin2;
  }
  return place.name;
}

function getLocationDetail(place) {
  const region = place.country_code === "TW" ? place.admin2 : place.admin1;
  const country = COUNTRY_NAMES[place.country_code] ?? place.country;
  return [region, country]
    .filter((part, index, list) => part && list.indexOf(part) === index)
    .join("・");
}

function getPreferredPlace(places) {
  return (
    places.find(
      (place) =>
        place.country_code === "TW" &&
        /taoyuan/i.test(`${place.name} ${place.admin1 ?? ""}`),
    ) ??
    places.find((place) => place.country_code === "TW") ??
    places[0]
  );
}

async function fetchJson(url, signal, serviceName = "天氣服務") {
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`${serviceName}回應錯誤（${response.status}）。請稍後再試。`);
  }
  return response.json();
}

async function searchPlaces(query, signal) {
  const normalizedQuery = query.trim().replace(/\s+/g, "");
  const searchName = CITY_ALIASES.get(normalizedQuery) ?? query.trim();
  const url = new URL(GEOCODING_URL);
  url.search = new URLSearchParams({
    name: searchName,
    count: "7",
    language: "zh",
    format: "json",
  });
  const data = await fetchJson(url, signal);
  return data.results ?? [];
}

function renderSuggestions(places) {
  suggestions = places;
  activeSuggestion = -1;
  elements.suggestions.replaceChildren();

  for (const [index, place] of places.entries()) {
    const item = document.createElement("li");
    const button = document.createElement("button");
    const name = document.createElement("span");
    const detail = document.createElement("span");
    button.className = "suggestion";
    button.type = "button";
    button.role = "option";
    button.id = `suggestion-${index}`;
    button.setAttribute("aria-selected", "false");
    name.className = "suggestion-name";
    name.textContent = place.name;
    detail.className = "suggestion-detail";
    detail.textContent = getLocationDetail(place);
    button.append(name, detail);
    button.addEventListener("click", () => selectPlace(place));
    item.append(button);
    elements.suggestions.append(item);
  }

  elements.suggestions.hidden = places.length === 0;
  elements.searchInput.setAttribute("aria-expanded", String(places.length > 0));
  elements.searchInput.removeAttribute("aria-activedescendant");
}

function closeSuggestions() {
  suggestions = [];
  activeSuggestion = -1;
  elements.suggestions.hidden = true;
  elements.searchInput.setAttribute("aria-expanded", "false");
  elements.searchInput.removeAttribute("aria-activedescendant");
}

function setActiveSuggestion(index) {
  if (suggestions.length === 0) return;
  activeSuggestion = (index + suggestions.length) % suggestions.length;
  const options = elements.suggestions.querySelectorAll('[role="option"]');
  options.forEach((option, optionIndex) => {
    option.setAttribute("aria-selected", String(optionIndex === activeSuggestion));
  });
  const activeOption = options[activeSuggestion];
  elements.searchInput.setAttribute("aria-activedescendant", activeOption.id);
  activeOption.scrollIntoView({ block: "nearest" });
}

function formatPlaceDate(date, timeZone) {
  return new Intl.DateTimeFormat("zh-TW", {
    month: "long",
    day: "numeric",
    weekday: "long",
    timeZone,
  }).format(date);
}

function renderForecast(daily) {
  const fragment = document.createDocumentFragment();

  for (let index = 0; index < daily.time.length; index += 1) {
    const card = document.createElement("article");
    const day = document.createElement("p");
    const icon = document.createElement("span");
    const temperatures = document.createElement("div");
    const high = document.createElement("span");
    const low = document.createElement("span");
    const condition = getWeatherDescription(daily.weather_code[index]);
    const date = new Date(`${daily.time[index]}T00:00:00Z`);

    card.className = "forecast-card";
    day.className = "forecast-day";
    day.textContent = index === 0 ? "今天" : weekdayFormatter.format(date);
    icon.className = "forecast-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = condition.icon;
    temperatures.className = "forecast-temperatures";
    high.className = "forecast-high";
    high.textContent = `${Math.round(daily.temperature_2m_max[index])}°`;
    low.className = "forecast-low";
    low.textContent = `${Math.round(daily.temperature_2m_min[index])}°`;
    temperatures.setAttribute(
      "aria-label",
      `${condition.text}，最高 ${high.textContent}，最低 ${low.textContent}`,
    );
    temperatures.append(high, low);
    card.append(day, icon, temperatures);
    fragment.append(card);
  }

  elements.forecastList.replaceChildren(fragment);
}

function renderWeather(place, data) {
  const current = data.current;
  const condition = getWeatherDescription(current.weather_code);
  const timezone =
    data.timezone || place.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;
  const uv = Number(current.uv_index);
  const timezoneOffset = Number(data.utc_offset_seconds) || 0;
  const currentTime = new Date(
    Date.parse(`${current.time}Z`) - timezoneOffset * 1000,
  );
  const clockFormatter = new Intl.DateTimeFormat("zh-TW", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: timezone,
  });

  elements.locationName.textContent = getLocationName(place);
  elements.locationDetail.textContent = getLocationDetail(place);
  elements.updatedAt.textContent = `當地時間 ${clockFormatter.format(
    currentTime,
  )} 更新`;
  elements.currentDate.textContent = formatPlaceDate(currentTime, timezone);
  elements.currentIcon.textContent = condition.icon;
  elements.currentIcon.setAttribute("aria-label", condition.text);
  elements.currentTemperature.firstChild.textContent = Math.round(current.temperature_2m);
  elements.currentCondition.textContent = condition.text;
  elements.feelsLike.textContent = Math.round(current.apparent_temperature);
  elements.humidity.firstChild.textContent = Math.round(current.relative_humidity_2m);
  elements.windSpeed.firstChild.textContent = Math.round(current.wind_speed_10m);
  elements.windNote.textContent = getWindDescription(current.wind_speed_10m);
  elements.uvIndex.textContent = Number.isFinite(uv) ? uv.toFixed(1) : "--";
  elements.uvNote.textContent = Number.isFinite(uv)
    ? getUvDescription(uv)
    : "日光防護提醒";
  elements.currentCard.setAttribute("aria-busy", "false");
  setWeatherBackground(current.weather_code, current.is_day);
  renderForecast(data.daily);
}

function stopRadarPlayback() {
  window.clearInterval(radarTimer);
  radarTimer = undefined;
  elements.radarPlayLabel.textContent = "播放";
  elements.radarPlay.querySelector("[aria-hidden='true']").textContent = "▶";
  elements.radarPlay.setAttribute("aria-label", "播放雷達動畫");
}

function renderRadarFrame(index) {
  const frame = radarFrames[index];
  if (!frame || !radarMap) return;

  radarFrameIndex = index;
  if (radarLayer) radarMap.removeLayer(radarLayer);
  radarLayer = L.tileLayer(
    `${radarTileHost}${frame.path}/256/{z}/{x}/{y}/2/1_1.png`,
    {
      opacity: 0.72,
      tileSize: 256,
      zIndex: 10,
      maxNativeZoom: 7,
      attribution:
        '<a href="https://www.rainviewer.com/" target="_blank" rel="noopener noreferrer">RainViewer</a>',
    },
  ).addTo(radarMap);
  elements.radarTimeline.value = String(index);
  elements.radarTime.textContent = new Intl.DateTimeFormat("zh-TW", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: radarTimeZone,
  }).format(new Date(frame.time * 1000));
}

function setRadarFrames(frames) {
  stopRadarPlayback();
  radarFrames = frames;
  elements.radarTimeline.max = String(Math.max(0, frames.length - 1));
  elements.radarTimeline.disabled = frames.length === 0;
  elements.radarPlay.disabled = frames.length < 2;

  if (frames.length === 0) {
    elements.radarStatus.textContent = "目前沒有可用的降雨雷達影格。";
    elements.radarTime.textContent = "--:--";
    return;
  }

  renderRadarFrame(frames.length - 1);
  elements.radarStatus.textContent = `顯示過去兩小時的降雨動態，共 ${frames.length} 個影格`;
}

function initializeRadarMap(place) {
  if (radarMap) {
    radarMap.setView([place.latitude, place.longitude], radarMap.getZoom(), {
      animate: true,
    });
    return true;
  }
  if (!window.L) {
    elements.radarStatus.textContent = "地圖元件載入失敗，請重新整理頁面再試一次。";
    return false;
  }

  radarMap = L.map(elements.radarMap, {
    center: [place.latitude, place.longitude],
    zoom: 7,
    minZoom: 2,
    maxZoom: 12,
    scrollWheelZoom: false,
  });
  L.tileLayer(BASE_MAP_URL, {
    maxZoom: 16,
    attribution:
      "Tiles &copy; Esri, HERE, Garmin, &copy; OpenStreetMap contributors, and the GIS user community",
  }).addTo(radarMap);
  radarMap.attributionControl.setPrefix("");
  return true;
}

async function updateRadar(place) {
  const currentRadarRequestId = ++radarRequestId;
  radarController?.abort();
  radarController = new AbortController();
  radarTimeZone = place.timezone || "UTC";
  stopRadarPlayback();
  elements.radarStatus.textContent = "正在載入雷達資料…";
  elements.radarPlay.disabled = true;
  elements.radarTimeline.disabled = true;

  if (!initializeRadarMap(place)) return;
  window.requestAnimationFrame(() => radarMap?.invalidateSize());

  try {
    const data = await fetchJson(
      RAINVIEWER_URL,
      radarController.signal,
      "雷達服務",
    );
    if (currentRadarRequestId !== radarRequestId) return;
    const tileHost = new URL(data.host);
    if (tileHost.protocol !== "https:") {
      throw new Error("雷達服務提供了無效的地圖來源。");
    }
    radarTileHost = tileHost.origin;
    const pastFrames = data.radar?.past ?? [];
    const latestTime = pastFrames.at(-1)?.time ?? data.generated;
    const cutoff = latestTime - RADAR_WINDOW_SECONDS;
    const recentFrames = pastFrames.filter((frame) => frame.time >= cutoff);
    if (recentFrames.length > 0) {
      setRadarFrames(recentFrames);
    } else {
      if (radarLayer) {
        radarMap.removeLayer(radarLayer);
        radarLayer = undefined;
      }
      setRadarFrames([]);
    }
  } catch (error) {
    if (error.name === "AbortError" || currentRadarRequestId !== radarRequestId) return;
    stopRadarPlayback();
    radarFrames = [];
    if (radarLayer) {
      radarMap?.removeLayer(radarLayer);
      radarLayer = undefined;
    }
    elements.radarPlay.disabled = true;
    elements.radarTimeline.disabled = true;
    elements.radarStatus.textContent =
      error instanceof Error ? error.message : "雷達資料載入失敗，請稍後再試。";
  }
}

elements.radarPlay.addEventListener("click", () => {
  if (radarFrames.length < 2) return;
  if (radarTimer) {
    stopRadarPlayback();
    return;
  }

  if (radarFrameIndex >= radarFrames.length - 1) renderRadarFrame(0);
  elements.radarPlayLabel.textContent = "暫停";
  elements.radarPlay.querySelector("[aria-hidden='true']").textContent = "Ⅱ";
  elements.radarPlay.setAttribute("aria-label", "暫停雷達動畫");
  radarTimer = window.setInterval(() => {
    const nextIndex = (radarFrameIndex + 1) % radarFrames.length;
    renderRadarFrame(nextIndex);
  }, RADAR_FRAME_INTERVAL_MS);
});

elements.radarTimeline.addEventListener("input", () => {
  stopRadarPlayback();
  renderRadarFrame(Number(elements.radarTimeline.value));
});

async function loadWeather(place) {
  const currentRequestId = ++requestId;
  weatherController?.abort();
  weatherController = new AbortController();
  elements.pageMessage.textContent = "";
  elements.locationName.textContent = getLocationName(place);
  elements.locationDetail.textContent = getLocationDetail(place);
  elements.currentCard.setAttribute("aria-busy", "true");
  void updateRadar(place);

  const url = new URL(FORECAST_URL);
  url.search = new URLSearchParams({
    latitude: String(place.latitude),
    longitude: String(place.longitude),
    current:
      "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m,uv_index",
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
    temperature_unit: "celsius",
    wind_speed_unit: "kmh",
    timezone: "auto",
    forecast_days: "7",
  });

  try {
    const data = await fetchJson(url, weatherController.signal);
    if (currentRequestId !== requestId) return;
    renderWeather(place, data);
  } catch (error) {
    if (error.name === "AbortError" || currentRequestId !== requestId) return;
    elements.currentCard.setAttribute("aria-busy", "false");
    elements.pageMessage.textContent =
      error instanceof Error ? error.message : "無法取得天氣資料，請稍後再試。";
  }
}

async function selectPlace(place) {
  window.clearTimeout(debounceTimer);
  suggestionController?.abort();
  closeSuggestions();
  elements.searchInput.value = place.name;
  await loadWeather(place);
}

async function submitSearch(query) {
  const name = query.trim();
  if (!name) {
    elements.pageMessage.textContent = "請輸入想查詢的城市名稱。";
    return;
  }

  suggestionController?.abort();
  elements.pageMessage.textContent = "";
  closeSuggestions();
  elements.locationDetail.textContent = "正在搜尋城市…";

  const controller = new AbortController();
  suggestionController = controller;
  try {
    const places = await searchPlaces(name, controller.signal);
    if (suggestionController !== controller) return;
    const place = getPreferredPlace(places);
    if (!place) {
      elements.locationDetail.textContent = "找不到這座城市";
      elements.pageMessage.textContent = `找不到「${name}」，請確認拼寫後再試一次。`;
      return;
    }
    await selectPlace(place);
  } catch (error) {
    if (error.name === "AbortError") return;
    elements.locationDetail.textContent = "無法搜尋城市";
    elements.pageMessage.textContent =
      error instanceof Error ? error.message : "城市搜尋失敗，請稍後再試。";
  }
}

createWeatherBackground();

elements.searchInput.addEventListener("input", () => {
  window.clearTimeout(debounceTimer);
  suggestionController?.abort();
  const query = elements.searchInput.value.trim();

  if (query.length < 2) {
    closeSuggestions();
    return;
  }

  debounceTimer = window.setTimeout(async () => {
    const controller = new AbortController();
    suggestionController = controller;
    try {
      const places = await searchPlaces(query, controller.signal);
      if (suggestionController !== controller || elements.searchInput.value.trim() !== query) {
        return;
      }
      renderSuggestions(places);
    } catch (error) {
      if (error.name !== "AbortError") {
        closeSuggestions();
        elements.pageMessage.textContent =
          error instanceof Error ? error.message : "城市建議載入失敗，請稍後再試。";
      }
    }
  }, 250);
});

elements.searchInput.addEventListener("keydown", (event) => {
  if (event.key === "ArrowDown" && suggestions.length > 0) {
    event.preventDefault();
    setActiveSuggestion(activeSuggestion + 1);
  } else if (event.key === "ArrowUp" && suggestions.length > 0) {
    event.preventDefault();
    setActiveSuggestion(activeSuggestion - 1);
  } else if (event.key === "Escape") {
    closeSuggestions();
  } else if (event.key === "Enter" && activeSuggestion >= 0) {
    event.preventDefault();
    selectPlace(suggestions[activeSuggestion]);
  }
});

elements.searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const place = suggestions[activeSuggestion];
  if (place) {
    selectPlace(place);
    return;
  }
  submitSearch(elements.searchInput.value);
});

document.addEventListener("click", (event) => {
  if (!elements.searchForm.contains(event.target)) closeSuggestions();
});

async function initialize() {
  elements.searchInput.value = "桃園";
  try {
    const places = await searchPlaces(DEFAULT_CITY);
    const taoyuan = getPreferredPlace(places);
    if (!taoyuan || taoyuan.country_code !== "TW") {
      throw new Error("找不到桃園的位置資料，請使用搜尋功能選擇城市。");
    }
    await loadWeather(taoyuan);
  } catch (error) {
    if (error.name === "AbortError") return;
    elements.currentCard.setAttribute("aria-busy", "false");
    elements.locationDetail.textContent = "無法載入桃園天氣";
    elements.pageMessage.textContent =
      error instanceof Error ? error.message : "無法取得桃園天氣，請稍後再試。";
  }
}

initialize();
