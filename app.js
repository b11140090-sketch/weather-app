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
  assistantSection: document.querySelector(".assistant-section"),
  clothingAdvice: document.querySelector("#clothing-advice"),
  sunAdvice: document.querySelector("#sun-advice"),
  rainAdvice: document.querySelector("#rain-advice"),
  assistantSpeak: document.querySelector("#assistant-speak"),
  assistantSpeakLabel: document.querySelector("#assistant-speak-label"),
  assistantSpeakStatus: document.querySelector("#assistant-speak-status"),
  assistantPersonaTabs: document.querySelector("#assistant-persona-tabs"),
  assistantMicrophone: document.querySelector("#assistant-microphone"),
  assistantVoiceState: document.querySelector("#assistant-voice-state"),
  assistantVoiceAnswer: document.querySelector("#assistant-voice-answer"),
  assistantVoiceMessage: document.querySelector("#assistant-voice-message"),
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
  routeForm: document.querySelector("#route-form"),
  routeOrigin: document.querySelector("#route-origin"),
  routeDestination: document.querySelector("#route-destination"),
  routeSubmit: document.querySelector("#route-submit"),
  routeStatus: document.querySelector("#route-status"),
  routeResults: document.querySelector("#route-results"),
};

const weekdayFormatter = new Intl.DateTimeFormat("zh-TW", {
  weekday: "short",
  timeZone: "UTC",
});
let suggestions = [];
let activeSuggestion = -1;
let suggestionController;
let weatherController;
let routeController;
let routeRequestId = 0;
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
let weatherBulletin;
let weatherAdvice;
let speechGeneration = 0;
let weatherContext;
let assistantPersona = "health";
let speechRecognition;
let isListening = false;
let receivedVoiceResult = false;

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

function getLifestyleAdvice(temperature, uvIndex, rainProbability) {
  const clothing = getClothingAdvice(temperature);
  const sun = getSunAdvice(uvIndex);
  const rain = getRainAdvice(rainProbability);

  return {
    clothing: clothing.text,
    sun: sun.text,
    rain: rain.text,
    spoken: [clothing.spoken, sun.spoken, rain.spoken].join(" "),
  };
}

function getClothingAdvice(temperature) {
  if (temperature < 10) {
    return {
      text: "氣溫偏低，建議穿著保暖外套，留意早晚溫差。",
      spoken: "Trời lạnh, bạn nên mặc áo khoác ấm và chú ý chênh lệch nhiệt độ sáng tối.",
    };
  }
  if (temperature < 18) {
    return {
      text: "天氣微涼，帶件薄外套或採洋蔥式穿搭更舒適。",
      spoken: "Trời hơi se lạnh, hãy mang theo áo khoác mỏng hoặc mặc nhiều lớp.",
    };
  }
  if (temperature < 25) {
    return {
      text: "氣溫舒適，穿著輕便即可，怕冷可加件薄外套。",
      spoken: "Thời tiết dễ chịu, bạn có thể mặc đồ nhẹ; nếu sợ lạnh, hãy mang áo khoác mỏng.",
    };
  }
  return {
    text: "氣溫偏暖，選擇透氣輕薄的衣物，記得補充水分。",
    spoken: "Trời ấm, hãy chọn quần áo mỏng nhẹ, thoáng mát và nhớ uống đủ nước.",
  };
}

function getSunAdvice(uvIndex) {
  if (uvIndex < 3) {
    return {
      text: `紫外線指數 ${uvIndex.toFixed(1)}，目前偏低，長時間戶外活動仍建議做好防曬。`,
      spoken: `Chỉ số tia cực tím là ${uvIndex.toFixed(1)}, hiện ở mức thấp. Nếu ở ngoài trời lâu, bạn vẫn nên chống nắng.`,
    };
  }
  if (uvIndex < 6) {
    return {
      text: `紫外線指數 ${uvIndex.toFixed(1)}，外出可擦防曬乳並適時補擦。`,
      spoken: `Chỉ số tia cực tím là ${uvIndex.toFixed(1)}. Hãy thoa kem chống nắng và thoa lại khi cần.`,
    };
  }
  if (uvIndex < 8) {
    return {
      text: `紫外線指數 ${uvIndex.toFixed(1)}，建議擦防曬、戴帽子並尋找陰涼處。`,
      spoken: `Chỉ số tia cực tím là ${uvIndex.toFixed(1)}, khá cao. Hãy dùng kem chống nắng, đội mũ và tìm bóng râm.`,
    };
  }
  return {
    text: `紫外線指數 ${uvIndex.toFixed(1)}，紫外線很強，請加強防曬並避免久曬。`,
    spoken: `Chỉ số tia cực tím là ${uvIndex.toFixed(1)}, rất cao. Hãy bảo vệ da kỹ và tránh ở ngoài nắng lâu.`,
  };
}

function getRainAdvice(rainProbability) {
  if (rainProbability >= 60) {
    return {
      text: `今日降雨機率 ${rainProbability}%，建議帶傘，戶外行程記得準備備案。`,
      spoken: `Khả năng mưa hôm nay là ${rainProbability} phần trăm. Bạn nên mang ô và chuẩn bị phương án dự phòng cho hoạt động ngoài trời.`,
    };
  }
  if (rainProbability >= 30) {
    return {
      text: `今日降雨機率 ${rainProbability}%，外出帶把摺疊傘較安心。`,
      spoken: `Khả năng mưa hôm nay là ${rainProbability} phần trăm. Mang theo ô gấp sẽ yên tâm hơn.`,
    };
  }
  return {
    text: `今日降雨機率 ${rainProbability}%，適合安排戶外活動，仍可留意天氣變化。`,
    spoken: `Khả năng mưa hôm nay là ${rainProbability} phần trăm. Thời tiết phù hợp cho hoạt động ngoài trời, nhưng bạn vẫn nên theo dõi diễn biến thời tiết.`,
  };
}

function renderLifestyleAdvice(place, current, rainProbability) {
  const temperature = current.temperature_2m;
  const uvIndex = current.uv_index;
  const validRainProbability = rainProbability;
  const hasTemperature = Number.isFinite(temperature);
  const hasUvIndex = Number.isFinite(uvIndex);
  const hasRainProbability = Number.isFinite(validRainProbability);
  const clothingAdvice = hasTemperature ? getClothingAdvice(temperature) : undefined;
  const sunAdvice = hasUvIndex ? getSunAdvice(uvIndex) : undefined;
  const rainAdvice = hasRainProbability ? getRainAdvice(validRainProbability) : undefined;

  elements.clothingAdvice.textContent =
    clothingAdvice?.text ?? "目前無法取得氣溫資料，暫時無法提供穿搭建議。";
  elements.sunAdvice.textContent =
    sunAdvice?.text ?? "目前無法取得紫外線指數，外出時建議做好防曬。";
  elements.rainAdvice.textContent =
    rainAdvice?.text ?? "目前無法取得降雨機率，出門前請查看最新天氣。";

  const apparentTemperature = current.apparent_temperature;
  const hasApparentTemperature = Number.isFinite(apparentTemperature);
  weatherAdvice =
    hasTemperature && hasUvIndex && hasRainProbability
      ? getLifestyleAdvice(temperature, uvIndex, validRainProbability)
      : undefined;

  if (!weatherAdvice || !hasApparentTemperature) {
    elements.assistantSpeak.disabled = true;
    elements.assistantSpeakStatus.textContent = "部分天氣資料暫缺，暫時無法產生完整語音播報。";
    return;
  }

  const temperatureText = Math.round(temperature);
  const uvText = uvIndex.toFixed(1);
  const conditionText = getVietnameseWeatherDescription(current.weather_code);
  weatherBulletin =
    `Thời tiết tại ${getVietnamesePlaceName(place)} hiện tại ${temperatureText} độ C, ${conditionText}. ` +
    `Cảm giác như ${Math.round(apparentTemperature)} độ C. ` +
    `Chỉ số tia cực tím là ${uvText}. Khả năng mưa hôm nay là ${Math.round(validRainProbability)} phần trăm. ` +
    weatherAdvice.spoken;
  if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
    elements.assistantSpeak.disabled = true;
    elements.assistantSpeakStatus.textContent = "此瀏覽器不支援 Web Speech API，無法使用語音播報。";
    return;
  }
  elements.assistantSpeak.disabled = false;
  elements.assistantSpeakStatus.textContent =
    "Nhấn nút loa để nghe bản tin thời tiết và lời khuyên bằng tiếng Việt.";
}

function getVietnameseWeatherDescription(code) {
  if (code === 0) return "trời nắng";
  if (code === 1) return "trời quang đãng";
  if (code === 2) return "trời có mây từng đám";
  if (code === 3) return "trời nhiều mây";
  if (code === 45 || code === 48) return "có sương mù";
  if (code >= 51 && code <= 57) return "có mưa phùn";
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return "có mưa";
  if (code >= 71 && code <= 77) return "có tuyết";
  if (code === 85 || code === 86) return "có mưa tuyết";
  if (code >= 95 && code <= 99) return "có dông";
  return "thời tiết thay đổi";
}

function normalizeVoiceText(text) {
  return text
    .toLocaleLowerCase("vi-VN")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/đ/g, "d");
}

function analyzeAssistantIntent(text, persona) {
  const query = normalizeVoiceText(text);
  if (persona === "health") {
    if (/\b(uv|tia cuc tim|nang|da|chong nang)\b/.test(query)) return "health-sun";
    if (/\b(lanh|ret|ao|mac|cam|cum|sot|nhiet do|chenh lech)\b/.test(query)) {
      return "health-temperature";
    }
  } else if (persona === "fnb") {
    if (/\b(mua|delivery|giao hang|quang cao|bat|che|ngoai troi)\b/.test(query)) {
      return "fnb-rain";
    }
    if (/\b(nhiet do|nong|lanh|do uong|nguyen lieu|nhap hang)\b/.test(query)) {
      return "fnb-temperature";
    }
  } else if (persona === "logistics") {
    if (/\b(tam nhin|suong mu|nhin xa|visibility)\b/.test(query)) {
      return "logistics-visibility";
    }
    if (/\b(gio|cong trinh|duong|giao hang|toc do|di chuyen|an toan)\b/.test(query)) {
      return "logistics-wind";
    }
  }
  return "weather-summary";
}

function getAssistantWeatherValues() {
  if (!weatherContext) return undefined;
  const { current, daily } = weatherContext;
  const toOptionalNumber = (value) => {
    if (value === null || value === undefined) return undefined;
    const number = Number(value);
    return Number.isFinite(number) ? number : undefined;
  };
  const currentTemperature = toOptionalNumber(current.temperature_2m);
  const uvIndex = toOptionalNumber(current.uv_index);
  const windSpeed = toOptionalNumber(current.wind_speed_10m);
  const visibility = toOptionalNumber(current.visibility);
  const rainProbability = toOptionalNumber(daily.precipitation_probability_max?.[0]);
  const high = toOptionalNumber(daily.temperature_2m_max?.[0]);
  const low = toOptionalNumber(daily.temperature_2m_min?.[0]);
  return {
    currentTemperature,
    uvIndex,
    windSpeed,
    visibility,
    rainProbability,
    temperatureRange: high !== undefined && low !== undefined ? high - low : undefined,
    high,
    low,
  };
}

function getAssistantAnswer(text) {
  const values = getAssistantWeatherValues();
  if (!values) {
    return "Hiện chưa có dữ liệu thời tiết. Vui lòng đợi bản tin thời tiết tải xong rồi hỏi lại nhé.";
  }

  const intent = analyzeAssistantIntent(text, assistantPersona);
  const temperature = values.currentTemperature;
  const uv = values.uvIndex;
  const rain = values.rainProbability;
  const wind = values.windSpeed;
  const range = values.temperatureRange;

  if (assistantPersona === "health") {
    if (intent === "health-sun") {
      if (uv === undefined) return "Hiện chưa có dữ liệu tia cực tím. Bạn nên dùng kem chống nắng và che chắn khi ở ngoài trời lâu.";
      if (uv >= 6) {
        return `Chỉ số UV hiện là ${uv.toFixed(1)}, mức cao. Hãy dùng kem chống nắng phổ rộng, đội mũ, đeo kính và tìm bóng râm; nếu da nhạy cảm hoặc đang điều trị da, hãy làm theo hướng dẫn của bác sĩ.`;
      }
      return `Chỉ số UV hiện là ${uv.toFixed(1)}. Dù mức UV chưa cao, hãy bảo vệ da khi ở ngoài trời lâu và thoa lại kem chống nắng theo hướng dẫn.`;
    }
    if (intent === "health-temperature") {
      const temperatureAdvice =
        temperature === undefined
          ? "Chưa có dữ liệu nhiệt độ hiện tại."
          : temperature < 18
            ? `Hiện ${Math.round(temperature)} độ C, nên mặc nhiều lớp và mang theo áo khoác.`
            : temperature >= 27
              ? `Hiện ${Math.round(temperature)} độ C, nên chọn quần áo thoáng mát và uống đủ nước.`
              : `Hiện ${Math.round(temperature)} độ C, hãy chọn trang phục phù hợp và dễ điều chỉnh.`;
      const rangeAdvice =
        range === undefined
          ? ""
          : range >= 8
            ? ` Biên độ nhiệt ngày khoảng ${Math.round(range)} độ, nên chuẩn bị thêm một lớp áo cho buổi sáng và tối.`
            : ` Biên độ nhiệt ngày khoảng ${Math.round(range)} độ.`;
      return `${temperatureAdvice}${rangeAdvice} Thời tiết không thể dùng để chẩn đoán cảm cúm; nếu có triệu chứng nặng hoặc kéo dài, hãy hỏi nhân viên y tế.`;
    }
    return `Trợ lý sức khỏe: ${temperature === undefined ? "chưa có dữ liệu nhiệt độ" : `hiện ${Math.round(temperature)} độ C`}, ${uv === undefined ? "chưa có dữ liệu UV" : `UV ${uv.toFixed(1)}`}${range === undefined ? "" : `, biên độ nhiệt ngày ${Math.round(range)} độ`}. Hãy điều chỉnh trang phục, chống nắng phù hợp; đây không phải chẩn đoán y khoa.`;
  }

  if (assistantPersona === "fnb") {
    if (intent === "fnb-rain") {
      if (rain === undefined) {
        return "Hiện chưa có dữ liệu xác suất mưa. Hãy kiểm tra dự báo mới nhất trước khi quyết định chạy quảng cáo giao hàng hoặc chuẩn bị mái che.";
      }
      if (rain >= 60) {
        return `Xác suất mưa hôm nay khoảng ${Math.round(rain)} phần trăm. Nên ưu tiên quảng bá delivery và chuẩn bị mái che, bạt chống mưa cho khách ngồi ngoài trời; nhớ bảo vệ bao bì và nguyên liệu.`;
      }
      if (rain >= 30) {
        return `Xác suất mưa hôm nay khoảng ${Math.round(rain)} phần trăm. Có thể chạy ưu đãi delivery ở mức vừa phải và chuẩn bị sẵn mái che hoặc bạt dự phòng.`;
      }
      return `Xác suất mưa hôm nay khoảng ${Math.round(rain)} phần trăm. Có thể ưu tiên phục vụ tại chỗ, nhưng vẫn nên kiểm tra dự báo trước khi sắp xếp khu vực ngoài trời.`;
    }
    if (intent === "fnb-temperature") {
      if (temperature === undefined) return "Hiện chưa có dữ liệu nhiệt độ để đề xuất nhập nguyên liệu.";
      if (temperature >= 28) {
        return `Nhiệt độ hiện khoảng ${Math.round(temperature)} độ C. Có thể ưu tiên nguyên liệu cho đồ uống lạnh, nước và đá; nhập theo lượng bán thực tế để hạn chế hao hụt.`;
      }
      if (temperature < 18) {
        return `Nhiệt độ hiện khoảng ${Math.round(temperature)} độ C. Có thể cân nhắc bổ sung nguyên liệu cho đồ uống nóng; hãy đối chiếu lượng nhập với nhu cầu và tồn kho.`;
      }
      return `Nhiệt độ hiện khoảng ${Math.round(temperature)} độ C, khá ôn hòa. Nên giữ danh mục đồ uống cân bằng và nhập nguyên liệu theo lịch sử bán hàng.`;
    }
    return `Trợ lý F&B: ${temperature === undefined ? "chưa có dữ liệu nhiệt độ" : `nhiệt độ ${Math.round(temperature)} độ C`}, ${rain === undefined ? "chưa có dữ liệu mưa" : `xác suất mưa ${Math.round(rain)} phần trăm`}. Điều chỉnh nguyên liệu theo tồn kho và chọn phương án delivery hoặc mái che theo nhu cầu thực tế.`;
  }

  if (assistantPersona === "logistics") {
    if (intent === "logistics-visibility") {
      if (values.visibility === undefined) return "Hiện chưa có dữ liệu tầm nhìn từ dự báo. Hãy theo dõi cảnh báo địa phương trước khi khởi hành.";
      const visibilityKm = values.visibility / 1000;
      if (visibilityKm < 1) {
        return `Tầm nhìn hiện khoảng ${visibilityKm.toFixed(1)} km, hạn chế. Giảm tốc độ phù hợp quy định, tăng khoảng cách an toàn, bật đèn cần thiết và cân nhắc hoãn hành trình hoặc công việc ngoài trời nếu không an toàn.`;
      }
      if (visibilityKm < 5) {
        return `Tầm nhìn hiện khoảng ${visibilityKm.toFixed(1)} km. Cần quan sát kỹ, giữ khoảng cách an toàn và tuân thủ hướng dẫn giao thông, an toàn công trường.`;
      }
      return `Tầm nhìn hiện khoảng ${visibilityKm.toFixed(1)} km. Dù điều kiện đang khá rõ, vẫn cần tuân thủ giới hạn tốc độ và quy trình an toàn tại công trường.`;
    }
    if (wind === undefined) return "Hiện chưa có dữ liệu tốc độ gió. Hãy kiểm tra cảnh báo thời tiết và quy định an toàn tại địa phương.";
    if (wind >= 40) {
      return `Gió hiện khoảng ${Math.round(wind)} km/h, có thể ảnh hưởng phương tiện và công việc ngoài trời. Cần giảm tốc độ phù hợp điều kiện, cố định hàng hóa; tạm dừng công việc trên cao nếu vượt ngưỡng an toàn tại công trường.`;
    }
    return `Gió hiện khoảng ${Math.round(wind)} km/h. Duy trì tốc độ an toàn, cố định hàng hóa và theo dõi cảnh báo địa phương trước khi làm việc ngoài trời.`;
  }

  return `Thời tiết hiện ${temperature === undefined ? "chưa có dữ liệu nhiệt độ" : `${Math.round(temperature)} độ C`}, ${wind === undefined ? "chưa có dữ liệu gió" : `gió ${Math.round(wind)} km/h`}${rain === undefined ? "" : `, xác suất mưa ${Math.round(rain)} phần trăm`}. Bạn muốn hỏi sâu hơn về sức khỏe, kinh doanh F&B hay giao vận?`;
}

function setVoiceState(listening) {
  isListening = listening;
  elements.assistantVoiceState.textContent = listening ? "Đang nghe" : "Sẵn sàng";
  elements.assistantMicrophone.setAttribute("aria-pressed", String(listening));
  elements.assistantMicrophone.classList.toggle("is-listening", listening);
  elements.assistantSection.classList.toggle("is-listening", listening);
}

function stopVoiceRecognition() {
  if (!isListening || !speechRecognition) return;
  try {
    speechRecognition.stop();
  } catch (error) {
    setVoiceState(false);
    elements.assistantVoiceMessage.textContent =
      error instanceof Error ? `Không thể dừng ghi âm: ${error.message}` : "Không thể dừng ghi âm.";
  }
}

function speakAssistantAnswer(answer) {
  if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
    elements.assistantVoiceMessage.textContent =
      `${answer} Trình duyệt này không hỗ trợ phát giọng nói.`;
    return;
  }

  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
    resetSpeechStatus("Bản tin thời tiết đã dừng để phát câu trả lời.");
  }
  const utterance = new SpeechSynthesisUtterance(answer);
  const currentSpeechGeneration = ++speechGeneration;
  utterance.lang = "vi-VN";
  utterance.rate = 0.96;
  const vietnameseVoice = window.speechSynthesis
    .getVoices()
    .find((voice) => voice.lang.toLowerCase().startsWith("vi"));
  if (vietnameseVoice) utterance.voice = vietnameseVoice;
  utterance.onend = () => {
    if (currentSpeechGeneration === speechGeneration) {
      elements.assistantVoiceMessage.textContent = "Đã đọc xong câu trả lời.";
    }
  };
  utterance.onerror = (event) => {
    if (currentSpeechGeneration === speechGeneration) {
      elements.assistantVoiceMessage.textContent =
        `Không thể phát câu trả lời: ${event.error}. Bạn vẫn có thể đọc nội dung trên màn hình.`;
    }
  };
  window.speechSynthesis.speak(utterance);
}

function handleVoiceQuestion(transcript) {
  receivedVoiceResult = true;
  stopVoiceRecognition();
  const answer = getAssistantAnswer(transcript);
  elements.assistantVoiceAnswer.textContent = `Bạn hỏi: ${transcript}\n${answer}`;
  speakAssistantAnswer(answer);
}

function configureVoiceAssistant() {
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Recognition) {
    elements.assistantMicrophone.disabled = true;
    elements.assistantVoiceMessage.textContent =
      "Trình duyệt chưa hỗ trợ nhận dạng giọng nói. Hãy dùng trình duyệt hỗ trợ Web Speech API.";
    return;
  }

  speechRecognition = new Recognition();
  speechRecognition.lang = "vi-VN";
  speechRecognition.continuous = false;
  speechRecognition.interimResults = false;
  speechRecognition.maxAlternatives = 1;
  speechRecognition.onstart = () => {
    receivedVoiceResult = false;
    setVoiceState(true);
    elements.assistantVoiceMessage.textContent = "Đang nghe, hãy đặt câu hỏi bằng tiếng Việt.";
  };
  speechRecognition.onresult = (event) => {
    const transcript = event.results?.[0]?.[0]?.transcript?.trim();
    if (!transcript) {
      elements.assistantVoiceMessage.textContent = "Chưa nhận được câu hỏi. Hãy thử nói lại.";
      return;
    }
    handleVoiceQuestion(transcript);
  };
  speechRecognition.onerror = (event) => {
    const messages = {
      "not-allowed": "Bạn chưa cấp quyền sử dụng micro. Hãy cho phép truy cập micro rồi thử lại.",
      "no-speech": "Chưa phát hiện giọng nói. Hãy thử lại trong môi trường yên tĩnh hơn.",
      "audio-capture": "Không tìm thấy micro. Hãy kiểm tra thiết bị ghi âm.",
      network: "Không thể kết nối dịch vụ nhận dạng giọng nói. Hãy thử lại sau.",
    };
    elements.assistantVoiceMessage.textContent =
      messages[event.error] ?? `Nhận dạng giọng nói gặp lỗi: ${event.error}.`;
  };
  speechRecognition.onend = () => {
    setVoiceState(false);
    if (!receivedVoiceResult && !elements.assistantVoiceMessage.textContent) {
      elements.assistantVoiceMessage.textContent = "Đã dừng nghe. Nhấn micro để thử lại.";
    }
  };
}

function toggleVoiceRecognition() {
  if (!speechRecognition) {
    elements.assistantVoiceMessage.textContent =
      "Nhận dạng giọng nói hiện không khả dụng trong trình duyệt này.";
    return;
  }
  if (isListening) {
    stopVoiceRecognition();
    return;
  }
  if (!weatherContext) {
    elements.assistantVoiceMessage.textContent =
      "Đang tải dữ liệu thời tiết. Hãy thử lại sau khi bản tin được cập nhật.";
    return;
  }
  receivedVoiceResult = false;
  elements.assistantVoiceMessage.textContent = "";
  if (window.speechSynthesis?.speaking) {
    window.speechSynthesis.cancel();
    resetSpeechStatus("Đã dừng bản tin để nghe câu hỏi.");
  }
  try {
    speechRecognition.start();
  } catch (error) {
    elements.assistantVoiceMessage.textContent =
      error instanceof Error
        ? `Không thể bật micro: ${error.message}`
        : "Không thể bật micro. Hãy thử lại.";
  }
}

function selectAssistantPersona(persona) {
  assistantPersona = persona;
  for (const tab of elements.assistantPersonaTabs.querySelectorAll('[role="tab"]')) {
    const isSelected = tab.dataset.persona === persona;
    tab.setAttribute("aria-selected", String(isSelected));
    tab.tabIndex = isSelected ? 0 : -1;
  }
  const names = {
    health: "Sức khỏe",
    fnb: "Kinh doanh F&B",
    logistics: "Giao vận",
  };
  const selectedTab = elements.assistantPersonaTabs.querySelector(
    `[data-persona="${persona}"]`,
  );
  elements.assistantVoiceAnswer.setAttribute("aria-labelledby", selectedTab.id);
  elements.assistantVoiceMessage.textContent =
    `Đã chuyển sang chế độ tư vấn ${names[persona]}.`;
}

function resetSpeechStatus(message = "天氣資料載入後，即可聆聽越南語天氣播報。") {
  speechGeneration += 1;
  elements.assistantSpeak.setAttribute("aria-pressed", "false");
  elements.assistantSpeakLabel.textContent = "越南語播報";
  elements.assistantSpeakStatus.textContent = message;
}

function toggleWeatherSpeech() {
  if (!("speechSynthesis" in window) || !weatherBulletin) {
    elements.assistantSpeakStatus.textContent =
      "此瀏覽器不支援語音播報，請改用支援 Web Speech API 的瀏覽器。";
    return;
  }

  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
    resetSpeechStatus("已停止語音播報。");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(weatherBulletin);
  const currentSpeechGeneration = ++speechGeneration;
  utterance.lang = "vi-VN";
  utterance.rate = 0.94;
  const vietnameseVoice = window.speechSynthesis
    .getVoices()
    .find((voice) => voice.lang.toLowerCase().startsWith("vi"));
  if (vietnameseVoice) utterance.voice = vietnameseVoice;

  utterance.onstart = () => {
    if (currentSpeechGeneration !== speechGeneration) return;
    elements.assistantSpeak.setAttribute("aria-pressed", "true");
    elements.assistantSpeakLabel.textContent = "停止播報";
    elements.assistantSpeakStatus.textContent = "正在以越南語朗讀天氣與生活建議…";
  };
  utterance.onend = () => {
    if (currentSpeechGeneration === speechGeneration) {
      resetSpeechStatus("語音播報已完成。");
    }
  };
  utterance.onerror = (event) => {
    if (currentSpeechGeneration === speechGeneration) {
      resetSpeechStatus(`語音播報失敗：${event.error}。請檢查瀏覽器的語音設定後重試。`);
    }
  };

  elements.assistantSpeakStatus.textContent = "正在準備越南語語音…";
  window.speechSynthesis.speak(utterance);
}

function getLocationName(place) {
  if (place.country_code === "TW" && /[區区]$/.test(place.name) && place.admin2) {
    return place.admin2;
  }
  return place.name;
}

function getVietnamesePlaceName(place) {
  const placeName = getLocationName(place);
  const translated = VIETNAMESE_PLACE_NAMES.get(place.admin2) ?? VIETNAMESE_PLACE_NAMES.get(placeName);
  if (translated) return translated;
  return /[\u3400-\u9fff]/u.test(placeName) ? "thành phố bạn đang xem" : placeName;
}

const VIETNAMESE_PLACE_NAMES = new Map([
  ["桃園市", "Đào Viên"],
  ["臺北市", "Đài Bắc"],
  ["台北市", "Đài Bắc"],
  ["新北市", "Tân Bắc"],
  ["臺中市", "Đài Trung"],
  ["台中市", "Đài Trung"],
  ["臺南市", "Đài Nam"],
  ["台南市", "Đài Nam"],
  ["高雄市", "Cao Hùng"],
  ["香港", "Hồng Kông"],
  ["澳門", "Ma Cao"],
  ["北京市", "Bắc Kinh"],
  ["上海市", "Thượng Hải"],
  ["東京", "Tokyo"],
  ["大阪市", "Osaka"],
  ["首爾", "Seoul"],
  ["新加坡", "Singapore"],
]);

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
  const data = await fetchJson(url, signal, "城市搜尋服務");
  return data.results ?? [];
}

async function geocodeRoutePlace(query, signal) {
  const url = new URL(GEOCODING_URL);
  url.search = new URLSearchParams({
    name: query.trim(),
    count: "10",
    language: "vi",
    format: "json",
  });
  const data = await fetchJson(url, signal, "路線地點搜尋服務");
  const places = data.results ?? [];
  if (places.length === 0) {
    throw new Error(`Không tìm thấy địa điểm “${query.trim()}”. Vui lòng kiểm tra tên và thử lại.`);
  }
  const normalizedQuery = query.trim().toLocaleLowerCase();
  return (
    places.find((place) => place.name?.trim().toLocaleLowerCase() === normalizedQuery) ??
    places[0]
  );
}

function getRouteDistanceKm(start, end) {
  const radians = (degrees) => (degrees * Math.PI) / 180;
  const latitudeDifference = radians(end.latitude - start.latitude);
  const longitudeDifference = radians(end.longitude - start.longitude);
  const startLatitude = radians(start.latitude);
  const endLatitude = radians(end.latitude);
  const haversine =
    Math.sin(latitudeDifference / 2) ** 2 +
    Math.cos(startLatitude) *
      Math.cos(endLatitude) *
      Math.sin(longitudeDifference / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
}

function getRouteCoordinates(start, end, fraction) {
  const radians = (degrees) => (degrees * Math.PI) / 180;
  const toDegrees = (value) => (value * 180) / Math.PI;
  const startLatitude = radians(start.latitude);
  const startLongitude = radians(start.longitude);
  const endLatitude = radians(end.latitude);
  const endLongitude = radians(end.longitude);
  const angularDistance = getRouteDistanceKm(start, end) / 6371;

  if (angularDistance < 1e-8) {
    return {
      latitude: start.latitude,
      longitude: start.longitude,
    };
  }

  const startWeight =
    Math.sin((1 - fraction) * angularDistance) / Math.sin(angularDistance);
  const endWeight = Math.sin(fraction * angularDistance) / Math.sin(angularDistance);
  const x =
    startWeight * Math.cos(startLatitude) * Math.cos(startLongitude) +
    endWeight * Math.cos(endLatitude) * Math.cos(endLongitude);
  const y =
    startWeight * Math.cos(startLatitude) * Math.sin(startLongitude) +
    endWeight * Math.cos(endLatitude) * Math.sin(endLongitude);
  const z =
    startWeight * Math.sin(startLatitude) + endWeight * Math.sin(endLatitude);

  return {
    latitude: toDegrees(Math.atan2(z, Math.sqrt(x ** 2 + y ** 2))),
    longitude: toDegrees(Math.atan2(y, x)),
  };
}

function createRouteWaypoints(origin, destination) {
  const distanceKm = getRouteDistanceKm(origin, destination);
  if (!Number.isFinite(distanceKm)) {
    throw new Error("Không thể xác định khoảng cách giữa hai địa điểm.");
  }

  const stopCount = distanceKm >= 700 ? 3 : 2;
  const waypoints = [{ name: origin.name, kind: "origin", ...origin }];
  for (let index = 1; index <= stopCount; index += 1) {
    waypoints.push({
      name: `Điểm dừng ${index}`,
      kind: "stop",
      ...getRouteCoordinates(origin, destination, index / (stopCount + 1)),
    });
  }
  waypoints.push({ name: destination.name, kind: "destination", ...destination });
  return { distanceKm, waypoints };
}

async function fetchRouteWeather(waypoint, signal) {
  const url = new URL(FORECAST_URL);
  url.search = new URLSearchParams({
    latitude: String(waypoint.latitude),
    longitude: String(waypoint.longitude),
    current: "temperature_2m,weather_code,wind_speed_10m",
    hourly: "temperature_2m,weather_code,wind_speed_10m,precipitation_probability",
    forecast_days: "1",
    timezone: "auto",
  });
  const data = await fetchJson(url, signal, "路線天氣服務");
  if (
    !data.current?.time ||
    !data.hourly?.time?.length ||
    !data.hourly.temperature_2m?.length ||
    !data.hourly.weather_code?.length ||
    !data.hourly.wind_speed_10m?.length
  ) {
    throw new Error(`Không nhận được dự báo hợp lệ tại ${waypoint.name}.`);
  }
  const forecastIndex = getRouteForecastIndex(data);
  if (
    !Number.isFinite(Number(data.hourly.temperature_2m[forecastIndex])) ||
    !Number.isFinite(Number(data.hourly.weather_code[forecastIndex])) ||
    !Number.isFinite(Number(data.hourly.wind_speed_10m[forecastIndex]))
  ) {
    throw new Error(`Dự báo tại ${waypoint.name} hiện không có đủ dữ liệu.`);
  }
  return data;
}

function getRouteForecastIndex(data) {
  const index = data.hourly.time.findIndex((time) => time >= data.current.time);
  return index < 0 ? data.hourly.time.length - 1 : index;
}

function getRouteWeatherWarnings(data) {
  const forecastIndex = getRouteForecastIndex(data);
  const weatherCode = Number(data.hourly.weather_code[forecastIndex]);
  const windSpeed = Number(data.hourly.wind_speed_10m[forecastIndex]);
  const precipitationProbabilities = data.hourly.precipitation_probability?.slice(
    forecastIndex,
    forecastIndex + 3,
  ) ?? [];
  const availableProbabilities = precipitationProbabilities.filter(
    (value) => value !== null && Number.isFinite(Number(value)),
  );
  const precipitationProbability = availableProbabilities.length
    ? availableProbabilities.reduce(
        (highest, value) => Math.max(highest, Number(value) || 0),
        0,
      )
    : null;
  const warnings = [];

  if ([56, 57, 65, 66, 67, 75, 82, 86, 95, 96, 99].includes(weatherCode)) {
    warnings.push("Mưa lớn, mưa đóng băng, tuyết dày hoặc dông nguy hiểm");
  } else if (weatherCode >= 51 && weatherCode <= 67) {
    warnings.push("Có mưa, đường có thể trơn trượt");
  } else if (weatherCode >= 71 && weatherCode <= 86) {
    warnings.push("Có tuyết hoặc mưa tuyết");
  }
  if (precipitationProbability !== null && precipitationProbability >= 60) {
    warnings.push(`Khả năng mưa ${precipitationProbability}% trong vài giờ tới`);
  }
  if (windSpeed >= 50) {
    warnings.push(`Gió mạnh ${Math.round(windSpeed)} km/h`);
  }

  return { warnings, precipitationProbability };
}

function renderRouteWeather(waypoints, forecasts, distanceKm) {
  const fragment = document.createDocumentFragment();
  const summary = document.createElement("p");
  const timeline = document.createElement("ol");

  summary.className = "route-summary";
  summary.textContent =
    `Quãng đường đường chim bay khoảng ${Math.round(distanceKm)} km · ` +
    `${waypoints.length - 2} điểm dừng`;
  timeline.className = "route-timeline";

  waypoints.forEach((waypoint, index) => {
    const data = forecasts[index];
    const forecastIndex = getRouteForecastIndex(data);
    const temperatureValue = data.hourly.temperature_2m[forecastIndex];
    const weatherCode = Number(data.hourly.weather_code[forecastIndex]);
    const condition = getWeatherDescription(weatherCode);
    const { warnings, precipitationProbability } = getRouteWeatherWarnings(data);
    const item = document.createElement("li");
    const card = document.createElement("article");
    const heading = document.createElement("div");
    const title = document.createElement("h3");
    const badge = document.createElement("span");
    const weather = document.createElement("div");
    const icon = document.createElement("span");
    const details = document.createElement("div");
    const temperature = document.createElement("p");
    const forecastTime = document.createElement("p");
    const description = document.createElement("p");
    const precipitation = document.createElement("p");

    item.className = "route-stop";
    card.className = `route-card${warnings.length ? " has-warning" : ""}`;
    heading.className = "route-card-heading";
    title.className = "route-stop-name";
    title.textContent = waypoint.name;
    badge.className = "route-stop-type";
    badge.textContent =
      waypoint.kind === "origin"
        ? "Xuất phát"
        : waypoint.kind === "destination"
          ? "Điểm đến"
          : "Trạm dừng";
    weather.className = "route-weather";
    icon.className = "route-weather-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = condition.icon;
    details.className = "route-weather-details";
    temperature.className = "route-temperature";
    temperature.textContent = `${Math.round(temperatureValue)}°C`;
    forecastTime.className = "route-forecast-time";
    forecastTime.textContent = `Dự báo lúc ${data.hourly.time[forecastIndex].slice(-5)}`;
    description.className = "route-condition";
    description.textContent = getVietnameseWeatherDescription(weatherCode);
    precipitation.className = "route-precipitation";
    precipitation.textContent =
      precipitationProbability === null
        ? "Chưa có dữ liệu khả năng mưa"
        : precipitationProbability > 0
          ? `Khả năng mưa: ${precipitationProbability}%`
          : "Khả năng mưa thấp";

    details.append(temperature, forecastTime, description, precipitation);
    weather.append(icon, details);
    heading.append(title, badge);
    card.append(heading, weather);
    if (warnings.length > 0) {
      const warning = document.createElement("p");
      warning.className = "route-warning";
      warning.textContent = `⚠ Cảnh báo: ${warnings.join(" · ")}`;
      card.append(warning);
    }
    item.append(card);
    timeline.append(item);
  });

  fragment.append(summary, timeline);
  elements.routeResults.replaceChildren(fragment);
  elements.routeResults.hidden = false;
}

async function checkRouteWeather(originQuery, destinationQuery) {
  const currentRequestId = ++routeRequestId;
  routeController?.abort();
  routeController = new AbortController();
  const { signal } = routeController;
  elements.routeSubmit.disabled = true;
  elements.routeSubmit.setAttribute("aria-busy", "true");
  elements.routeResults.setAttribute("aria-busy", "true");
  elements.routeStatus.textContent = "Đang tìm địa điểm và tải dự báo thời tiết…";
  elements.routeResults.replaceChildren();
  elements.routeResults.hidden = true;

  try {
    const [origin, destination] = await Promise.all([
      geocodeRoutePlace(originQuery, signal),
      geocodeRoutePlace(destinationQuery, signal),
    ]);
    const { distanceKm, waypoints } = createRouteWaypoints(origin, destination);
    const forecasts = await Promise.all(
      waypoints.map((waypoint) => fetchRouteWeather(waypoint, signal)),
    );
    if (currentRequestId !== routeRequestId) return;
    renderRouteWeather(waypoints, forecasts, distanceKm);
    elements.routeStatus.textContent = "Đã cập nhật dự báo thời tiết trên tuyến đường.";
  } catch (error) {
    if (error.name === "AbortError" || currentRequestId !== routeRequestId) return;
    elements.routeStatus.textContent =
      error instanceof Error ? error.message : "Không thể tải thời tiết lộ trình. Vui lòng thử lại.";
  } finally {
    if (currentRequestId === routeRequestId) {
      elements.routeSubmit.disabled = false;
      elements.routeSubmit.removeAttribute("aria-busy");
      elements.routeResults.setAttribute("aria-busy", "false");
    }
  }
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
  weatherContext = { place, current, daily: data.daily };
  elements.assistantMicrophone.disabled = !speechRecognition;
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
  if (window.speechSynthesis?.speaking) window.speechSynthesis.cancel();
  resetSpeechStatus("天氣資料已更新，點選喇叭可聆聽越南語播報。");
  renderLifestyleAdvice(
    place,
    current,
    data.daily.precipitation_probability_max?.[0],
  );
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

elements.assistantSpeak.addEventListener("click", toggleWeatherSpeech);
elements.assistantMicrophone.addEventListener("click", toggleVoiceRecognition);

elements.assistantPersonaTabs.addEventListener("click", (event) => {
  const tab = event.target.closest('[role="tab"]');
  if (!tab || !elements.assistantPersonaTabs.contains(tab)) return;
  selectAssistantPersona(tab.dataset.persona);
});

elements.assistantPersonaTabs.addEventListener("keydown", (event) => {
  const tabs = [...elements.assistantPersonaTabs.querySelectorAll('[role="tab"]')];
  const currentIndex = tabs.indexOf(event.target);
  if (currentIndex < 0) return;
  let nextIndex;
  if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % tabs.length;
  else if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
  else return;
  event.preventDefault();
  tabs[nextIndex].focus();
  selectAssistantPersona(tabs[nextIndex].dataset.persona);
});

elements.routeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const origin = elements.routeOrigin.value.trim();
  const destination = elements.routeDestination.value.trim();
  if (!origin || !destination) {
    elements.routeStatus.textContent = "Vui lòng nhập điểm khởi hành và điểm đến.";
    return;
  }
  if (origin.toLocaleLowerCase() === destination.toLocaleLowerCase()) {
    elements.routeStatus.textContent = "Điểm khởi hành và điểm đến phải khác nhau.";
    return;
  }
  void checkRouteWeather(origin, destination);
});

async function loadWeather(place) {
  const currentRequestId = ++requestId;
  weatherController?.abort();
  weatherController = new AbortController();
  stopVoiceRecognition();
  weatherContext = undefined;
  elements.assistantMicrophone.disabled = true;
  if (window.speechSynthesis?.speaking) window.speechSynthesis.cancel();
  elements.assistantSpeak.disabled = true;
  resetSpeechStatus("正在更新天氣資料與生活建議…");
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
      "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m,uv_index,visibility",
    daily:
      "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
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
    elements.assistantVoiceMessage.textContent =
      "無法載入最新天氣資料，語音顧問暫時無法提供天氣建議。";
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
configureVoiceAssistant();

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
