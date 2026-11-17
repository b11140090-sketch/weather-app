const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";
const RAINVIEWER_URL = "https://api.rainviewer.com/public/weather-maps.json";
const DEFAULT_CITY = "Taoyuan";
const RADAR_WINDOW_SECONDS = 2 * 60 * 60;
const RADAR_FRAME_INTERVAL_MS = 600;
const BASE_MAP_URL =
  "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}";
const RADAR_TILE_URL = "https://tilecache.rainviewer.com";
const translations = {
  vi: {
    metaDescription: "Thời tiết hiện tại và dự báo mười ngày, đồng hành cùng bạn mỗi ngày.",
    pageTitle: "Weather — Thời tiết, vừa đúng lúc",
    home: "Trang chủ Weather",
    topbarNote: "Để mỗi ngày bắt đầu với dự báo thời tiết tốt lành",
    liveWeather: "Thời tiết trực tiếp",
    languageLabel: "Ngôn ngữ",
    eyebrow: "Cẩm nang thời tiết mỗi ngày",
    headline: "Thời tiết,",
    headlineAccent: "vừa đúng lúc.",
    introCopy: "Nắng nhẹ hay làn gió mát, hãy sẵn sàng cho ngày mới.",
    searchCity: "Tìm thành phố",
    searchPlaceholder: "Tìm thành phố, ví dụ: Hà Nội, Tokyo",
    searchButton: "Tìm kiếm",
    addLocation: "Thêm",
    locationAdded: "Đã thêm",
    locationAlreadySaved: "Đã lưu",
    saveLocationError: "Không thể lưu địa điểm này trên thiết bị.",
    savedWeatherUnavailable: "Không tải được thời tiết",
    savedWeatherError: "Không thể tải thời tiết cho {city}.",
    searchHint: "Tìm một thành phố để khám phá thời tiết nơi đó.",
    myLocations: "Địa điểm của tôi",
    sidebarHint: "Tìm kiếm thành phố để thêm địa điểm",
    sidebarAriaLabel: "Danh sách địa điểm thời tiết",
    weatherSection: "Thời tiết hiện tại và dự báo",
    yourSky: "Thời tiết tại đây",
    loadingWeather: "Đang tải dữ liệu thời tiết…",
    liveUpdate: "Đang cập nhật",
    updatedAt: "Cập nhật lúc {time}",
    currentWeather: "Thời tiết hiện tại",
    now: "Bây giờ",
    hourlyForecast: "Dự báo theo giờ",
    hourlyRainExpected: "Dự kiến mưa vào khoảng {time}.",
    hourlyNoRainExpected: "Chưa có mưa đáng kể trong vài giờ tới.",
    loading: "Đang tải",
    feelsLike: "Cảm giác như",
    weatherAtGlance: "Thời tiết hôm nay, dễ dàng nắm bắt",
    weatherDetails: "Thông tin thời tiết chi tiết",
    humidity: "Độ ẩm",
    moistureInAir: "Độ ẩm trong không khí",
    windSpeed: "Tốc độ gió",
    lightBreeze: "Gió nhẹ",
    uvIndex: "Chỉ số UV",
    sunProtection: "Lưu ý chống nắng",
    uvLow: "thấp, chỉ cần bảo vệ thông thường",
    uvModerate: "trung bình, nên chống nắng",
    uvHigh: "cao, cần chú ý chống nắng",
    uvVeryHigh: "rất cao, hãy tăng cường bảo vệ",
    uvExtreme: "cực cao, tránh phơi nắng lâu",
    windGentle: "Gió nhẹ",
    windBreezy: "Gió thoảng",
    windStrong: "Gió hơi mạnh",
    windVeryStrong: "Gió mạnh, chú ý hoạt động ngoài trời",
    today: "Hôm nay",
    high: "Cao nhất",
    low: "Thấp nhất",
    weatherClear: "Trời nắng",
    weatherMostlyClear: "Trời quang đãng",
    weatherPartlyCloudy: "Có mây rải rác",
    weatherOvercast: "Trời nhiều mây",
    weatherFog: "Có sương mù",
    weatherDrizzle: "Mưa phùn",
    weatherFreezingRain: "Mưa đóng băng",
    weatherRain: "Có mưa",
    weatherSnow: "Có tuyết",
    weatherShowers: "Mưa rào",
    weatherSnowShowers: "Mưa tuyết",
    weatherThunderstorm: "Có dông",
    weatherVariable: "Thời tiết thay đổi",
    radarLive: "Đang hiển thị mưa trong hai giờ qua · {count} khung hình",
    radarEmpty: "Hiện không có khung hình radar mưa.",
    radarLoading: "Đang tải dữ liệu radar…",
    radarError: "Không thể tải dữ liệu radar. Vui lòng thử lại.",
    radarMapError: "Không thể tải bản đồ. Hãy làm mới trang và thử lại.",
    play: "Phát",
    pause: "Tạm dừng",
    playRadar: "Phát hoạt ảnh radar",
    pauseRadar: "Tạm dừng hoạt ảnh radar",
    radarTimeline: "Dòng thời gian radar",
    liveRadar: "Radar mưa trực tiếp",
    rainRadar: "Radar mưa",
    loadingRadar: "Đang tải dữ liệu radar…",
    radarMapLabel: "Bản đồ radar mưa, có thể kéo và thu phóng",
    comingDays: "Những ngày tới",
    sevenDayForecast: "Dự báo 10 ngày",
    tenDayForecast: "Dự báo 10 ngày",
    forecastCaption: "Chủ động lên kế hoạch với dự báo 10 ngày",
    preparingForecast: "Đang chuẩn bị dự báo tuần…",
    forecastDetailTitle: "Điều kiện thời tiết chi tiết",
    forecastDetailClose: "Đóng chi tiết dự báo",
    forecastRainTotal: "Tổng lượng mưa",
    forecastRainChance: "Khả năng có mưa",
    forecastWind: "Gió mạnh nhất",
    forecastUv: "Chỉ số UV cao nhất",
    forecastFeelsLike: "Cảm giác như",
    forecastHumidity: "Độ ẩm trung bình",
    forecastTemperatureChart: "Nhiệt độ theo giờ",
    forecastRainChart: "Khả năng có mưa theo giờ",
    forecastPreviousDay: "Ngày trước",
    forecastNextDay: "Ngày tiếp theo",
    forecastHourlyChartLabel: "{metric} trong ngày",
    forecastNoHourlyData: "Không có dữ liệu theo giờ cho ngày này.",
    footerNote: "Đưa thời tiết vào nhịp sống, để mỗi chuyến đi thêm an tâm.",
    weatherCredit: "Dữ liệu thời tiết từ Open-Meteo",
    errorPrefix: "Lỗi dịch vụ thời tiết ({status}). Vui lòng thử lại.",
    invalidCity: "Không tìm thấy “{city}”. Hãy kiểm tra chính tả rồi thử lại.",
    emptyCity: "Vui lòng nhập tên thành phố cần tìm.",
    searchingCity: "Đang tìm thành phố…",
    cityNotFound: "Không tìm thấy thành phố",
    citySearchFailed: "Không thể tìm thành phố",
    pageWeatherError: "Không thể tải dữ liệu thời tiết. Vui lòng thử lại.",
    defaultCityError: "Không tìm thấy dữ liệu vị trí. Hãy dùng tìm kiếm để chọn một thành phố.",
    radarServiceError: "Dịch vụ radar cung cấp nguồn bản đồ không hợp lệ.",
  },
  en: {
    metaDescription: "Current conditions and a ten-day forecast to help you plan every day.",
    pageTitle: "Weather — Just the right forecast",
    home: "Weather home",
    topbarNote: "Start every day with a brighter forecast",
    liveWeather: "Live weather",
    languageLabel: "Language",
    eyebrow: "Your daily weather guide",
    headline: "Weather,",
    headlineAccent: "just right.",
    introCopy: "A little sunshine or a gentle breeze—be ready for the day ahead.",
    searchCity: "Search for a city",
    searchPlaceholder: "Search a city, e.g. London, Tokyo",
    searchButton: "Search",
    addLocation: "Add",
    locationAdded: "Added",
    locationAlreadySaved: "Saved",
    saveLocationError: "Could not save this location on your device.",
    savedWeatherUnavailable: "Weather unavailable",
    savedWeatherError: "Could not load weather for {city}.",
    searchHint: "Find a city and discover what the sky is like there.",
    myLocations: "My Locations",
    sidebarHint: "Search for a city to add a location",
    sidebarAriaLabel: "Weather locations",
    weatherSection: "Current weather and forecast",
    yourSky: "Your local weather",
    loadingWeather: "Loading weather data…",
    liveUpdate: "Updating",
    updatedAt: "Updated at {time}",
    currentWeather: "Current weather",
    now: "Now",
    hourlyForecast: "Hourly forecast",
    hourlyRainExpected: "Rain is expected around {time}.",
    hourlyNoRainExpected: "No significant rain is expected in the next few hours.",
    loading: "Loading",
    feelsLike: "Feels like",
    weatherAtGlance: "Today's weather at a glance",
    weatherDetails: "Detailed weather information",
    humidity: "Humidity",
    moistureInAir: "Moisture in the air",
    windSpeed: "Wind speed",
    lightBreeze: "Light breeze",
    uvIndex: "UV index",
    sunProtection: "Sun protection",
    uvLow: "low; routine protection is enough",
    uvModerate: "moderate; sun protection is recommended",
    uvHigh: "high; take sun protection seriously",
    uvVeryHigh: "very high; increase protection",
    uvExtreme: "extreme; avoid prolonged sun exposure",
    windGentle: "Light breeze",
    windBreezy: "Gentle wind",
    windStrong: "Breezy",
    windVeryStrong: "Strong wind; take care outdoors",
    today: "Today",
    high: "High",
    low: "Low",
    weatherClear: "Clear sky",
    weatherMostlyClear: "Mostly clear",
    weatherPartlyCloudy: "Partly cloudy",
    weatherOvercast: "Overcast",
    weatherFog: "Fog",
    weatherDrizzle: "Drizzle",
    weatherFreezingRain: "Freezing rain",
    weatherRain: "Rain",
    weatherSnow: "Snow",
    weatherShowers: "Rain showers",
    weatherSnowShowers: "Snow showers",
    weatherThunderstorm: "Thunderstorm",
    weatherVariable: "Changeable weather",
    radarLive: "Rain radar for the past two hours · {count} frames",
    radarEmpty: "No rain radar frames are currently available.",
    radarLoading: "Loading radar data…",
    radarError: "Could not load radar data. Please try again.",
    radarMapError: "The map could not be loaded. Refresh the page and try again.",
    play: "Play",
    pause: "Pause",
    playRadar: "Play radar animation",
    pauseRadar: "Pause radar animation",
    radarTimeline: "Radar timeline",
    liveRadar: "Live rain radar",
    rainRadar: "Rain radar",
    loadingRadar: "Loading radar data…",
    radarMapLabel: "Rain radar map; drag and zoom to explore",
    comingDays: "The days ahead",
    sevenDayForecast: "10-day forecast",
    tenDayForecast: "10-day forecast",
    forecastCaption: "Plan ahead with a ten-day forecast",
    preparingForecast: "Preparing your weekly forecast…",
    forecastDetailTitle: "Detailed weather conditions",
    forecastDetailClose: "Close forecast details",
    forecastRainTotal: "Total precipitation",
    forecastRainChance: "Chance of rain",
    forecastWind: "Peak wind",
    forecastUv: "Maximum UV index",
    forecastFeelsLike: "Feels like",
    forecastHumidity: "Average humidity",
    forecastTemperatureChart: "Hourly temperature",
    forecastRainChart: "Hourly chance of rain",
    forecastPreviousDay: "Previous day",
    forecastNextDay: "Next day",
    forecastHourlyChartLabel: "{metric} throughout the day",
    forecastNoHourlyData: "No hourly data is available for this day.",
    footerNote: "Make weather part of your day and travel with confidence.",
    weatherCredit: "Weather data provided by Open-Meteo",
    errorPrefix: "Weather service error ({status}). Please try again.",
    invalidCity: "Could not find “{city}”. Check the spelling and try again.",
    emptyCity: "Enter a city name to search.",
    searchingCity: "Searching for city…",
    cityNotFound: "City not found",
    citySearchFailed: "Could not search for city",
    pageWeatherError: "Could not load weather data. Please try again.",
    defaultCityError: "Could not find the default location. Use search to choose a city.",
    radarServiceError: "The radar service returned an invalid map source.",
  },
  zh: {
    metaDescription: "即時天氣與未來十日預報，陪你掌握每一天。",
    pageTitle: "Weather — 天氣，剛剛好",
    home: "Weather 首頁",
    topbarNote: "讓每一天，都有好天氣的預感",
    liveWeather: "即時天氣",
    myLocations: "我的位置",
    sidebarHint: "搜尋城市以新增位置",
    sidebarAriaLabel: "天氣位置清單",
    languageLabel: "語言",
    eyebrow: "你的每日氣象指南",
    headline: "天氣，",
    headlineAccent: "剛剛好。",
    introCopy: "下一場陽光，或一陣微風，都為你準備好了。",
    searchCity: "搜尋城市",
    searchPlaceholder: "搜尋城市，例如：臺北、東京",
    searchButton: "搜尋",
    addLocation: "新增",
    locationAdded: "已新增",
    locationAlreadySaved: "已儲存",
    saveLocationError: "無法在這部裝置上儲存此位置。",
    savedWeatherUnavailable: "無法取得天氣",
    savedWeatherError: "無法載入「{city}」的天氣。",
    searchHint: "試試搜尋一座城市，看看那裡的天空。",
    weatherSection: "目前天氣與未來預報",
    yourSky: "你所在的天空",
    loadingWeather: "正在取得天氣資料…",
    liveUpdate: "即時更新",
    updatedAt: "當地時間 {time} 更新",
    currentWeather: "現在的天氣",
    now: "現在",
    hourlyForecast: "逐時預報",
    hourlyRainExpected: "預計約 {time} 可能降雨。",
    hourlyNoRainExpected: "未來幾小時沒有明顯降雨。",
    loading: "載入中",
    feelsLike: "體感",
    weatherAtGlance: "今日天氣，一目瞭然",
    weatherDetails: "天氣詳細資訊",
    humidity: "相對濕度",
    moistureInAir: "空氣中的水分",
    windSpeed: "風速",
    lightBreeze: "微風狀態",
    uvIndex: "紫外線指數",
    sunProtection: "日光防護提醒",
    uvLow: "低，日常防護即可",
    uvModerate: "中等，建議做好防曬",
    uvHigh: "偏高，請留意防曬",
    uvVeryHigh: "很高，請加強防護",
    uvExtreme: "極高，請避免長時間曝曬",
    windGentle: "微風徐徐",
    windBreezy: "和風輕拂",
    windStrong: "風勢稍強",
    windVeryStrong: "風勢較強，留意戶外活動",
    today: "今天",
    high: "最高",
    low: "最低",
    weatherClear: "晴朗",
    weatherMostlyClear: "大致晴朗",
    weatherPartlyCloudy: "局部多雲",
    weatherOvercast: "陰天",
    weatherFog: "有霧",
    weatherDrizzle: "毛毛雨",
    weatherFreezingRain: "凍雨",
    weatherRain: "下雨",
    weatherSnow: "下雪",
    weatherShowers: "陣雨",
    weatherSnowShowers: "陣雪",
    weatherThunderstorm: "雷雨",
    weatherVariable: "天氣多變",
    radarLive: "顯示過去兩小時降雨 · 共 {count} 個影格",
    radarEmpty: "目前沒有可用的降雨雷達影格。",
    radarLoading: "正在載入雷達資料…",
    radarError: "無法載入雷達資料，請稍後再試。",
    radarMapError: "地圖載入失敗，請重新整理頁面後再試。",
    play: "播放",
    pause: "暫停",
    playRadar: "播放雷達動畫",
    pauseRadar: "暫停雷達動畫",
    radarTimeline: "雷達時間軸",
    liveRadar: "即時雷達回波",
    rainRadar: "雨雲動態",
    loadingRadar: "正在載入雷達資料…",
    radarMapLabel: "雨雲雷達地圖，可拖曳與縮放",
    comingDays: "接下來的日子",
    sevenDayForecast: "未來十日",
    tenDayForecast: "未來十日",
    forecastCaption: "十天的天氣，提前掌握",
    preparingForecast: "正在為你準備一週的天氣…",
    forecastDetailTitle: "詳細天氣狀況",
    forecastDetailClose: "關閉預報詳細資訊",
    forecastRainTotal: "總降雨量",
    forecastRainChance: "降雨機率",
    forecastWind: "最大風速",
    forecastUv: "最高紫外線指數",
    forecastFeelsLike: "體感溫度",
    forecastHumidity: "平均濕度",
    forecastTemperatureChart: "逐時氣溫",
    forecastRainChart: "逐時降雨機率",
    forecastPreviousDay: "前一天",
    forecastNextDay: "下一天",
    forecastHourlyChartLabel: "當日{metric}",
    forecastNoHourlyData: "目前沒有這一天的逐時資料。",
    footerNote: "把天氣收進日常，讓出門從容一點。",
    weatherCredit: "氣象資料由 Open-Meteo 提供",
    errorPrefix: "天氣服務錯誤（{status}），請稍後再試。",
    invalidCity: "找不到「{city}」，請確認拼寫後再試一次。",
    emptyCity: "請輸入想查詢的城市名稱。",
    searchingCity: "正在搜尋城市…",
    cityNotFound: "找不到這座城市",
    citySearchFailed: "無法搜尋城市",
    pageWeatherError: "無法取得天氣資料，請稍後再試。",
    defaultCityError: "找不到預設地點資料，請使用搜尋功能選擇城市。",
    radarServiceError: "雷達服務提供了無效的地圖來源。",
  },
};

const SAVED_LANGUAGE = localStorage.getItem("selected_lang");
let currentLanguage = Object.hasOwn(translations, SAVED_LANGUAGE) ? SAVED_LANGUAGE : "vi";

function t(key, values = {}) {
  const template = translations[currentLanguage][key] ?? translations.en[key] ?? key;
  return template.replace(/\{(\w+)\}/g, (_, name) => String(values[name] ?? ""));
}

function formatNumber(value, options = {}) {
  return new Intl.NumberFormat(
    currentLanguage === "zh" ? "zh-TW" : currentLanguage,
    options,
  ).format(value);
}

function applyTranslations() {
  document.documentElement.lang = currentLanguage === "zh" ? "zh-Hant" : currentLanguage;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    const translated = t(key);
    const attributes = element.dataset.i18nAttr?.split(/\s+/).filter(Boolean) ?? [];
    if (attributes.length) {
      for (const attribute of attributes) element.setAttribute(attribute, translated);
    } else {
      element.textContent = translated;
    }
  });
  elements.languageSelect.value = currentLanguage;
  updateAddLocationButton();
}

function changeLanguage(language) {
  if (!Object.hasOwn(translations, language)) return;
  currentLanguage = language;
  localStorage.setItem("selected_lang", language);
  applyTranslations();
  if (weatherContext) renderWeather(weatherContext.place, weatherContext.data);
  if (radarFrames.length) setRadarFrames(radarFrames);
  if (elements.forecastDetailDialog.open && weatherContext) {
    renderForecastDetail(selectedForecastIndex);
  }
}

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
const LOCALIZED_COUNTRY_NAMES = {
  vi: { TW: "Đài Loan", CN: "Trung Quốc", JP: "Nhật Bản", KR: "Hàn Quốc", US: "Hoa Kỳ", GB: "Vương quốc Anh", HK: "Hồng Kông", MO: "Ma Cao", SG: "Singapore" },
  en: { TW: "Taiwan", CN: "China", JP: "Japan", KR: "South Korea", US: "United States", GB: "United Kingdom", HK: "Hong Kong", MO: "Macau", SG: "Singapore" },
  zh: COUNTRY_NAMES,
};

const elements = {
  languageSelect: document.querySelector("#language-select"),
  searchForm: document.querySelector("#search-form"),
  searchInput: document.querySelector("#city-search"),
  searchAddButton: document.querySelector("#search-add-button"),
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
  sidebarLocations: document.querySelector("#sidebar-locations"),
  sidebarStatus: document.querySelector("#sidebar-status"),
  hourlyList: document.querySelector("#hourly-list"),
  hourlySummary: document.querySelector("#hourly-summary"),
  humidity: document.querySelector("#humidity"),
  windSpeed: document.querySelector("#wind-speed"),
  windNote: document.querySelector("#wind-note"),
  uvIndex: document.querySelector("#uv-index"),
  uvNote: document.querySelector("#uv-note"),
  forecastList: document.querySelector("#forecast-list"),
  forecastDetailDialog: document.querySelector("#forecast-detail-dialog"),
  forecastDetailDate: document.querySelector("#forecast-detail-date"),
  forecastDetailIcon: document.querySelector("#forecast-detail-icon"),
  forecastDetailCondition: document.querySelector("#forecast-detail-condition"),
  forecastDetailTemperatures: document.querySelector("#forecast-detail-temperatures"),
  forecastDetailRainTotal: document.querySelector("#forecast-detail-rain-total"),
  forecastDetailRainChance: document.querySelector("#forecast-detail-rain-chance"),
  forecastDetailWind: document.querySelector("#forecast-detail-wind"),
  forecastDetailUv: document.querySelector("#forecast-detail-uv"),
  forecastDetailFeelsLike: document.querySelector("#forecast-detail-feels-like"),
  forecastDetailHumidity: document.querySelector("#forecast-detail-humidity"),
  forecastTemperatureChart: document.querySelector("#forecast-temperature-chart"),
  forecastRainChart: document.querySelector("#forecast-rain-chart"),
  forecastDetailHourly: document.querySelector("#forecast-detail-hourly"),
  forecastDetailClose: document.querySelector("#forecast-detail-close"),
  forecastDetailPrevious: document.querySelector("#forecast-detail-previous"),
  forecastDetailNext: document.querySelector("#forecast-detail-next"),
  pageMessage: document.querySelector("#page-message"),
  radarMap: document.querySelector("#radar-map"),
  radarStatus: document.querySelector("#radar-status"),
  radarPlay: document.querySelector("#radar-play"),
  radarPlayLabel: document.querySelector("#radar-play-label"),
  radarTimeline: document.querySelector("#radar-timeline"),
  radarTime: document.querySelector("#radar-time"),
  weatherBackground: document.querySelector("#weather-bg"),
};

function getLocale() {
  return currentLanguage === "zh" ? "zh-TW" : currentLanguage === "en" ? "en-US" : "vi-VN";
}
let suggestions = [];
let activeSuggestion = -1;
let addCandidate;
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
let weatherContext;
const SAVED_LOCATIONS_KEY = "saved_weather_locations";
const sidebarPlaces = loadSavedLocations();
let selectedForecastIndex = 0;

function normalizePlace(place) {
  if (
    !place ||
    typeof place.name !== "string" ||
    !place.name.trim() ||
    !Number.isFinite(place.latitude) ||
    place.latitude < -90 ||
    place.latitude > 90 ||
    !Number.isFinite(place.longitude) ||
    place.longitude < -180 ||
    place.longitude > 180
  ) {
    return undefined;
  }

  return {
    name: place.name,
    latitude: place.latitude,
    longitude: place.longitude,
    country_code: typeof place.country_code === "string" ? place.country_code : "",
    country: typeof place.country === "string" ? place.country : "",
    admin1: typeof place.admin1 === "string" ? place.admin1 : "",
    admin2: typeof place.admin2 === "string" ? place.admin2 : "",
    timezone: typeof place.timezone === "string" ? place.timezone : "",
  };
}

function getPlaceKey(place) {
  return `${place.latitude.toFixed(4)},${place.longitude.toFixed(4)}`;
}

function loadSavedLocations() {
  const saved = localStorage.getItem(SAVED_LOCATIONS_KEY);
  if (!saved) return [];

  try {
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) {
      throw new TypeError("Saved weather locations must be an array.");
    }

    const locations = [];
    const seen = new Set();
    for (const candidate of parsed) {
      const place = normalizePlace(candidate);
      if (!place || seen.has(getPlaceKey(place))) continue;
      seen.add(getPlaceKey(place));
      locations.push({ place, current: undefined, error: false, loading: false });
    }
    return locations;
  } catch (error) {
    console.error("Could not read saved weather locations.", error);
    return [];
  }
}

function persistSavedLocations() {
  localStorage.setItem(
    SAVED_LOCATIONS_KEY,
    JSON.stringify(sidebarPlaces.map((item) => item.place)),
  );
}

function findSavedLocation(place) {
  const key = getPlaceKey(place);
  return sidebarPlaces.find((item) => getPlaceKey(item.place) === key);
}

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
  if (code === 0) return { text: t("weatherClear"), icon: "☀️" };
  if (code === 1) return { text: t("weatherMostlyClear"), icon: "🌤️" };
  if (code === 2) return { text: t("weatherPartlyCloudy"), icon: "⛅" };
  if (code === 3) return { text: t("weatherOvercast"), icon: "☁️" };
  if (code === 45 || code === 48) return { text: t("weatherFog"), icon: "🌫️" };
  if (code === 51 || code === 53 || code === 55) return { text: t("weatherDrizzle"), icon: "🌦️" };
  if (code === 56 || code === 57) return { text: t("weatherFreezingRain"), icon: "🌧️" };
  if (code === 61 || code === 63 || code === 65) return { text: t("weatherRain"), icon: "🌧️" };
  if (code === 66 || code === 67) return { text: t("weatherFreezingRain"), icon: "🌧️" };
  if (code === 71 || code === 73 || code === 75 || code === 77) {
    return { text: t("weatherSnow"), icon: "🌨️" };
  }
  if (code === 80 || code === 81 || code === 82) return { text: t("weatherShowers"), icon: "🌦️" };
  if (code === 85 || code === 86) return { text: t("weatherSnowShowers"), icon: "🌨️" };
  if (code === 95 || code === 96 || code === 99) return { text: t("weatherThunderstorm"), icon: "⛈️" };
  return { text: t("weatherVariable"), icon: "🌤️" };
}

function getUvDescription(value) {
  if (value < 3) return t("uvLow");
  if (value < 6) return t("uvModerate");
  if (value < 8) return t("uvHigh");
  if (value < 11) return t("uvVeryHigh");
  return t("uvExtreme");
}

function getWindDescription(speed) {
  if (speed < 6) return t("windGentle");
  if (speed < 20) return t("windBreezy");
  if (speed < 40) return t("windStrong");
  return t("windVeryStrong");
}

function getLocationName(place) {
  if (place.country_code === "TW" && /[區区]$/.test(place.name) && place.admin2) {
    return place.admin2;
  }
  return place.name;
}

function getLocationDetail(place) {
  const region = place.country_code === "TW" ? place.admin2 : place.admin1;
  const country =
    LOCALIZED_COUNTRY_NAMES[currentLanguage][place.country_code] ?? place.country;
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

function updateAddLocationButton(place = addCandidate) {
  const savedLocation = place ? findSavedLocation(place) : undefined;
  const label = savedLocation
    ? t("locationAlreadySaved")
    : t("addLocation");
  elements.searchAddButton.disabled = !place || Boolean(savedLocation);
  elements.searchAddButton.querySelector("[data-i18n]").textContent = label;
  elements.searchAddButton.setAttribute("aria-label", label);
}

async function fetchJson(url, signal, serviceName = "天氣服務") {
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(t("errorPrefix", { status: response.status }));
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
    language: currentLanguage,
    format: "json",
  });
  const data = await fetchJson(url, signal, "城市搜尋服務");
  return data.results ?? [];
}

function renderSuggestions(places) {
  suggestions = places;
  activeSuggestion = -1;
  addCandidate = getPreferredPlace(places);
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
  updateAddLocationButton();
}

function closeSuggestions() {
  suggestions = [];
  activeSuggestion = -1;
  elements.suggestions.hidden = true;
  elements.searchInput.setAttribute("aria-expanded", "false");
  elements.searchInput.removeAttribute("aria-activedescendant");
  updateAddLocationButton();
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
  addCandidate = suggestions[activeSuggestion];
  updateAddLocationButton();
}

function formatPlaceDate(date, timeZone) {
  return new Intl.DateTimeFormat(getLocale(), {
    month: "long",
    day: "numeric",
    weekday: "long",
    timeZone,
  }).format(date);
}

function createForecastChart(hourly, valueKey, maxValue, metric) {
  const namespace = "http://www.w3.org/2000/svg";
  const width = 360;
  const left = 18;
  const right = 350;
  const top = 10;
  const bottom = 82;
  const values = hourly.map((hour) => hour[valueKey]);
  const validValues = values.filter(Number.isFinite);
  if (validValues.length === 0) {
    const empty = document.createElement("p");
    empty.className = "forecast-detail-empty";
    empty.textContent = t("forecastNoHourlyData");
    return empty;
  }

  const minValue = valueKey === "precipitation_probability"
    ? 0
    : Math.min(...validValues) - 2;
  const upperValue = valueKey === "precipitation_probability"
    ? maxValue
    : Math.max(...validValues) + 2;
  const valueRange = Math.max(1, upperValue - minValue);
  const points = values.flatMap((value, index) => {
    if (!Number.isFinite(value)) return [];
    return [{
      x: left + (index / Math.max(1, values.length - 1)) * (right - left),
      y: bottom - ((value - minValue) / valueRange) * (bottom - top),
      value,
    }];
  });
  const svg = document.createElementNS(namespace, "svg");
  svg.classList.add("forecast-chart");
  svg.setAttribute("viewBox", `0 0 ${width} 112`);
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", t("forecastHourlyChartLabel", { metric }));
  for (let row = 0; row < 4; row += 1) {
    const y = top + (row / 3) * (bottom - top);
    const gridline = document.createElementNS(namespace, "line");
    gridline.setAttribute("x1", String(left));
    gridline.setAttribute("x2", String(right));
    gridline.setAttribute("y1", String(y));
    gridline.setAttribute("y2", String(y));
    gridline.classList.add("forecast-chart-gridline");
    svg.append(gridline);
  }
  const line = document.createElementNS(namespace, "polyline");
  line.setAttribute("points", points.map((point) => `${point.x},${point.y}`).join(" "));
  line.classList.add(
    valueKey === "precipitation_probability"
      ? "forecast-chart-line-rain"
      : "forecast-chart-line-temperature",
  );
  svg.append(line);
  for (const hourIndex of [0, 6, 12, 18]) {
    if (hourIndex >= values.length) continue;
    const label = document.createElementNS(namespace, "text");
    label.setAttribute(
      "x",
      String(left + (hourIndex / Math.max(1, values.length - 1)) * (right - left)),
    );
    label.setAttribute("y", "105");
    label.setAttribute("text-anchor", "middle");
    label.classList.add("forecast-chart-label");
    label.textContent = `${String(hourIndex).padStart(2, "0")}:00`;
    svg.append(label);
  }
  const lastLabel = document.createElementNS(namespace, "text");
  lastLabel.setAttribute("x", String(right));
  lastLabel.setAttribute("y", "9");
  lastLabel.setAttribute("text-anchor", "end");
  lastLabel.classList.add("forecast-chart-value");
  lastLabel.textContent =
    `${Math.round(points.at(-1)?.value)}${valueKey === "precipitation_probability" ? "%" : "°"}`;
  svg.append(lastLabel);
  return svg;
}

function renderForecastDetail(index) {
  if (!weatherContext) return;
  const { daily, data } = weatherContext;
  const date = daily.time[index];
  if (!date) return;
  selectedForecastIndex = index;
  const condition = getWeatherDescription(daily.weather_code[index]);
  const dateObject = new Date(`${date}T00:00:00Z`);
  const hourlyData = data.hourly.time.flatMap((time, hourIndex) =>
    time.startsWith(date)
      ? [{
          time,
          temperature_2m: data.hourly.temperature_2m[hourIndex],
          apparent_temperature: data.hourly.apparent_temperature?.[hourIndex],
          weather_code: data.hourly.weather_code[hourIndex],
          precipitation_probability: data.hourly.precipitation_probability?.[hourIndex],
          precipitation: data.hourly.precipitation?.[hourIndex],
          relative_humidity_2m: data.hourly.relative_humidity_2m?.[hourIndex],
          wind_speed_10m: data.hourly.wind_speed_10m?.[hourIndex],
        }]
      : [],
  );
  const afternoonHour = hourlyData
    .filter((hour) => Number.isFinite(hour.apparent_temperature))
    .sort(
      (first, second) =>
        Math.abs(Number(first.time.slice(11, 13)) - 14) -
        Math.abs(Number(second.time.slice(11, 13)) - 14),
    )[0];
  const humidityReadings = hourlyData
    .map((hour) => hour.relative_humidity_2m)
    .filter(Number.isFinite);
  const averageHumidity = humidityReadings.length
    ? humidityReadings.reduce((sum, value) => sum + value, 0) / humidityReadings.length
    : undefined;
  const formatMetric = (value, unit, digits = 0) =>
    Number.isFinite(value)
      ? `${formatNumber(value, { maximumFractionDigits: digits })}${unit}`
      : "—";

  elements.forecastDetailDate.textContent = new Intl.DateTimeFormat(getLocale(), {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(dateObject);
  elements.forecastDetailIcon.textContent = condition.icon;
  elements.forecastDetailCondition.textContent = condition.text;
  elements.forecastDetailTemperatures.textContent =
    `${t("high")} ${formatMetric(daily.temperature_2m_max[index], "°")} · ` +
    `${t("low")} ${formatMetric(daily.temperature_2m_min[index], "°")}`;
  elements.forecastDetailRainTotal.textContent = formatMetric(
    daily.precipitation_sum?.[index],
    " mm",
    1,
  );
  elements.forecastDetailRainChance.textContent = formatMetric(
    daily.precipitation_probability_max?.[index],
    "%",
  );
  elements.forecastDetailWind.textContent = formatMetric(
    daily.wind_speed_10m_max?.[index],
    " km/h",
  );
  elements.forecastDetailUv.textContent = formatMetric(daily.uv_index_max?.[index], "");
  elements.forecastDetailFeelsLike.textContent = formatMetric(
    afternoonHour?.apparent_temperature,
    "°",
  );
  elements.forecastDetailHumidity.textContent = formatMetric(averageHumidity, "%");
  elements.forecastTemperatureChart.replaceChildren(
    createForecastChart(hourlyData, "temperature_2m", 100, t("forecastTemperatureChart")),
  );
  elements.forecastRainChart.replaceChildren(
    createForecastChart(
      hourlyData,
      "precipitation_probability",
      100,
      t("forecastRainChart"),
    ),
  );

  const hourlyFragment = document.createDocumentFragment();
  for (const hourIndex of [0, 6, 12, 18]) {
    const hour = hourlyData.find((item) => Number(item.time.slice(11, 13)) === hourIndex);
    if (!hour) continue;
    const item = document.createElement("div");
    const timeLabel = document.createElement("span");
    const icon = document.createElement("span");
    const temperature = document.createElement("strong");
    item.className = "forecast-detail-hour";
    timeLabel.textContent = `${String(hourIndex).padStart(2, "0")}:00`;
    icon.textContent = getWeatherDescription(hour.weather_code).icon;
    icon.setAttribute("aria-hidden", "true");
    temperature.textContent = formatMetric(hour.temperature_2m, "°");
    item.append(timeLabel, icon, temperature);
    hourlyFragment.append(item);
  }
  elements.forecastDetailHourly.replaceChildren(hourlyFragment);
  elements.forecastDetailPrevious.disabled = index === 0;
  elements.forecastDetailNext.disabled = index === daily.time.length - 1;
}

function renderForecast(daily) {
  const fragment = document.createDocumentFragment();
  const lows = daily.temperature_2m_min.filter(Number.isFinite);
  const highs = daily.temperature_2m_max.filter(Number.isFinite);
  const rangeMin = lows.length ? Math.min(...lows) : 0;
  const rangeMax = highs.length ? Math.max(...highs) : rangeMin + 1;
  const totalRange = Math.max(1, rangeMax - rangeMin);

  for (let index = 0; index < daily.time.length; index += 1) {
    const card = document.createElement("button");
    const day = document.createElement("p");
    const icon = document.createElement("span");
    const temperatures = document.createElement("div");
    const high = document.createElement("span");
    const low = document.createElement("span");
    const range = document.createElement("span");
    const rain = document.createElement("span");
    const condition = getWeatherDescription(daily.weather_code[index]);
    const date = new Date(`${daily.time[index]}T00:00:00Z`);

    card.className = "forecast-card";
    card.type = "button";
    const formattedDay =
      index === 0
        ? t("today")
        : new Intl.DateTimeFormat(getLocale(), {
            weekday: "long",
            timeZone: "UTC",
          }).format(date);
    card.setAttribute(
      "aria-label",
      `${formattedDay}, ${condition.text}, ${t("high")} ${Math.round(daily.temperature_2m_max[index])}°, ${t("low")} ${Math.round(daily.temperature_2m_min[index])}°`,
    );
    day.className = "forecast-day";
    day.textContent = formattedDay;
    icon.className = "forecast-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = condition.icon;
    temperatures.className = "forecast-temperatures";
    high.className = "forecast-high";
    high.textContent = `${Math.round(daily.temperature_2m_max[index])}°`;
    low.className = "forecast-low";
    low.textContent = `${Math.round(daily.temperature_2m_min[index])}°`;
    range.className = "forecast-temperature-range";
    range.setAttribute("aria-hidden", "true");
    const start = ((daily.temperature_2m_min[index] - rangeMin) / totalRange) * 100;
    const end = ((daily.temperature_2m_max[index] - rangeMin) / totalRange) * 100;
    range.style.setProperty("--range-start", `${start}%`);
    range.style.setProperty("--range-end", `${end}%`);
    rain.className = "forecast-rain";
    const rainProbability = daily.precipitation_probability_max?.[index];
    rain.textContent =
      Number.isFinite(rainProbability) && rainProbability > 0
        ? `${Math.round(rainProbability)}%`
        : "";
    temperatures.setAttribute(
      "aria-label",
      `${condition.text}, ${t("high")} ${high.textContent}, ${t("low")} ${low.textContent}`,
    );
    temperatures.append(low, range, high);
    card.append(day, icon, rain, temperatures);
    card.addEventListener("click", () => {
      renderForecastDetail(index);
      if (!elements.forecastDetailDialog.open) elements.forecastDetailDialog.showModal();
    });
    fragment.append(card);
  }

  elements.forecastList.replaceChildren(fragment);
}

function renderHourlyForecast(hourly, currentTime, timeZone) {
  const startIndex = hourly.time.findIndex((time) => time >= currentTime);
  const safeStartIndex = startIndex < 0 ? 0 : startIndex;
  const endIndex = Math.min(safeStartIndex + 24, hourly.time.length);
  const fragment = document.createDocumentFragment();
  const timeFormatter = new Intl.DateTimeFormat(getLocale(), {
    hour: "numeric",
    timeZone,
  });
  let expectedRainTime;

  for (let index = safeStartIndex; index < endIndex; index += 1) {
    const item = document.createElement("article");
    const hour = document.createElement("p");
    const icon = document.createElement("span");
    const temperature = document.createElement("p");
    const rain = document.createElement("p");
    const forecastTime = new Date(`${hourly.time[index]}:00Z`);
    const probability = hourly.precipitation_probability?.[index];
    const condition = getWeatherDescription(hourly.weather_code[index]);

    item.className = "hourly-item";
    hour.className = "hourly-time";
    hour.textContent = index === safeStartIndex ? t("now") : timeFormatter.format(forecastTime);
    icon.className = "hourly-icon";
    icon.setAttribute("aria-label", condition.text);
    icon.textContent = condition.icon;
    temperature.className = "hourly-temperature";
    temperature.textContent = `${Math.round(hourly.temperature_2m[index])}°`;
    rain.className = "hourly-rain";
    rain.textContent = Number.isFinite(probability) && probability > 0
      ? `${Math.round(probability)}%`
      : "";
    if (expectedRainTime === undefined && Number.isFinite(probability) && probability >= 35) {
      expectedRainTime = timeFormatter.format(forecastTime);
    }

    item.append(hour, icon, temperature, rain);
    fragment.append(item);
  }

  elements.hourlyList.replaceChildren(fragment);
  elements.hourlySummary.textContent = expectedRainTime
    ? t("hourlyRainExpected", { time: expectedRainTime })
    : t("hourlyNoRainExpected");
}

function renderSidebarLocations() {
  const fragment = document.createDocumentFragment();
  for (const item of sidebarPlaces) {
    const button = document.createElement("button");
    const heading = document.createElement("span");
    const temperature = document.createElement("span");
    const detail = document.createElement("span");
    const condition = document.createElement("span");

    button.className = "sidebar-location";
    button.type = "button";
    button.setAttribute(
      "aria-current",
      String(Boolean(weatherContext && getPlaceKey(weatherContext.place) === getPlaceKey(item.place))),
    );
    heading.className = "sidebar-location-name";
    heading.textContent = getLocationName(item.place);
    temperature.className = "sidebar-location-temperature";
    temperature.textContent = Number.isFinite(item.current?.temperature_2m)
      ? `${Math.round(item.current.temperature_2m)}°`
      : "--°";
    detail.className = "sidebar-location-detail";
    detail.textContent = getLocationDetail(item.place);
    condition.className = "sidebar-location-condition";
    condition.textContent = item.error
      ? t("savedWeatherUnavailable")
      : item.current
        ? getWeatherDescription(item.current.weather_code).text
        : t("loadingWeather");
    button.append(heading, temperature, detail, condition);
    button.addEventListener("click", () => {
      if (!weatherContext || getPlaceKey(weatherContext.place) !== getPlaceKey(item.place)) {
        void loadWeather(item.place);
      }
    });
    fragment.append(button);
  }
  elements.sidebarLocations.replaceChildren(fragment);
}

function addSavedLocation(place) {
  const normalizedPlace = normalizePlace(place);
  if (!normalizedPlace) {
    throw new TypeError("Cannot save an invalid weather location.");
  }
  const existing = findSavedLocation(normalizedPlace);
  if (existing) return { item: existing, added: false };

  const item = {
    place: normalizedPlace,
    current: undefined,
    error: false,
    loading: false,
  };
  sidebarPlaces.push(item);
  try {
    persistSavedLocations();
  } catch (error) {
    sidebarPlaces.pop();
    throw error;
  }
  renderSidebarLocations();
  return { item, added: true };
}

async function refreshSavedLocationWeather(item) {
  if (item.loading) return;
  item.loading = true;
  item.error = false;
  renderSidebarLocations();

  const url = new URL(FORECAST_URL);
  url.search = new URLSearchParams({
    latitude: String(item.place.latitude),
    longitude: String(item.place.longitude),
    current: "temperature_2m,weather_code",
    temperature_unit: "celsius",
    timezone: "auto",
  });

  try {
    const data = await fetchJson(url);
    if (!data.current || !Number.isFinite(data.current.temperature_2m)) {
      throw new Error(t("savedWeatherUnavailable"));
    }
    item.current = data.current;
  } catch (error) {
    item.error = true;
    console.error(`Could not load saved weather for ${item.place.name}.`, error);
    elements.sidebarStatus.textContent = t("savedWeatherError", {
      city: getLocationName(item.place),
    });
  } finally {
    item.loading = false;
    renderSidebarLocations();
  }
}

function renderWeather(place, data) {
  const current = data.current;
  weatherContext = { place, current, daily: data.daily, data };
  const savedLocation = findSavedLocation(place);
  if (savedLocation) {
    savedLocation.current = current;
    savedLocation.error = false;
  }
  const condition = getWeatherDescription(current.weather_code);
  const timezone =
    data.timezone || place.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;
  const uv = Number(current.uv_index);
  const timezoneOffset = Number(data.utc_offset_seconds) || 0;
  const currentTime = new Date(
    Date.parse(`${current.time}Z`) - timezoneOffset * 1000,
  );
  const clockFormatter = new Intl.DateTimeFormat(getLocale(), {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: timezone,
  });

  elements.locationName.textContent = getLocationName(place);
  elements.locationDetail.textContent = getLocationDetail(place);
  renderSidebarLocations();
  elements.updatedAt.textContent = t("updatedAt", {
    time: clockFormatter.format(currentTime),
  });
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
    : t("sunProtection");
  elements.currentCard.setAttribute("aria-busy", "false");
  setWeatherBackground(current.weather_code, current.is_day);
  renderForecast(data.daily);
  renderHourlyForecast(data.hourly, current.time, timezone);
}

function stopRadarPlayback() {
  window.clearInterval(radarTimer);
  radarTimer = undefined;
  elements.radarPlayLabel.textContent = t("play");
  elements.radarPlay.querySelector("[aria-hidden='true']").textContent = "▶";
  elements.radarPlay.setAttribute("aria-label", t("playRadar"));
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
  elements.radarTime.textContent = new Intl.DateTimeFormat(getLocale(), {
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
    elements.radarStatus.textContent = t("radarEmpty");
    elements.radarTime.textContent = "--:--";
    return;
  }

  renderRadarFrame(frames.length - 1);
  elements.radarStatus.textContent = t("radarLive", { count: frames.length });
}

function initializeRadarMap(place) {
  if (radarMap) {
    radarMap.setView([place.latitude, place.longitude], radarMap.getZoom(), {
      animate: true,
    });
    return true;
  }
  if (!window.L) {
    elements.radarStatus.textContent = t("radarMapError");
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
  elements.radarStatus.textContent = t("radarLoading");
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
      throw new Error(t("radarServiceError"));
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
      error instanceof Error ? error.message : t("radarError");
  }
}

elements.radarPlay.addEventListener("click", () => {
  if (radarFrames.length < 2) return;
  if (radarTimer) {
    stopRadarPlayback();
    return;
  }

  if (radarFrameIndex >= radarFrames.length - 1) renderRadarFrame(0);
  elements.radarPlayLabel.textContent = t("pause");
  elements.radarPlay.querySelector("[aria-hidden='true']").textContent = "Ⅱ";
  elements.radarPlay.setAttribute("aria-label", t("pauseRadar"));
  radarTimer = window.setInterval(() => {
    const nextIndex = (radarFrameIndex + 1) % radarFrames.length;
    renderRadarFrame(nextIndex);
  }, RADAR_FRAME_INTERVAL_MS);
});

elements.radarTimeline.addEventListener("input", () => {
  stopRadarPlayback();
  renderRadarFrame(Number(elements.radarTimeline.value));
});

elements.languageSelect.addEventListener("change", (event) => {
  changeLanguage(event.target.value);
});

elements.forecastDetailClose.addEventListener("click", () => {
  elements.forecastDetailDialog.close();
});
elements.forecastDetailDialog.addEventListener("click", (event) => {
  if (event.target === elements.forecastDetailDialog) {
    elements.forecastDetailDialog.close();
  }
});
elements.forecastDetailPrevious.addEventListener("click", () => {
  if (selectedForecastIndex > 0) renderForecastDetail(selectedForecastIndex - 1);
});
elements.forecastDetailNext.addEventListener("click", () => {
  const lastIndex = (weatherContext?.daily.time.length ?? 0) - 1;
  if (selectedForecastIndex < lastIndex) {
    renderForecastDetail(selectedForecastIndex + 1);
  }
});

async function loadWeather(place) {
  const currentRequestId = ++requestId;
  if (elements.forecastDetailDialog.open) elements.forecastDetailDialog.close();
  weatherController?.abort();
  weatherController = new AbortController();
  weatherContext = undefined;
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
    hourly:
      "temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m,precipitation,precipitation_probability",
    daily:
      "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,uv_index_max",
    temperature_unit: "celsius",
    wind_speed_unit: "kmh",
    timezone: "auto",
    forecast_days: "10",
  });

  try {
    const data = await fetchJson(url, weatherController.signal);
    if (currentRequestId !== requestId) return;
    renderWeather(place, data);
  } catch (error) {
    if (error.name === "AbortError" || currentRequestId !== requestId) return;
    elements.currentCard.setAttribute("aria-busy", "false");
    elements.pageMessage.textContent =
      error instanceof Error ? error.message : t("pageWeatherError");
  }
}

async function selectPlace(place) {
  window.clearTimeout(debounceTimer);
  suggestionController?.abort();
  addCandidate = place;
  closeSuggestions();
  elements.searchInput.value = place.name;
  updateAddLocationButton();
  await loadWeather(place);
}

async function submitSearch(query) {
  const name = query.trim();
  if (!name) {
    elements.pageMessage.textContent = t("emptyCity");
    return;
  }

  suggestionController?.abort();
  elements.pageMessage.textContent = "";
  closeSuggestions();
  elements.locationDetail.textContent = t("searchingCity");

  const controller = new AbortController();
  suggestionController = controller;
  try {
    const places = await searchPlaces(name, controller.signal);
    if (suggestionController !== controller) return;
    const place = getPreferredPlace(places);
    if (!place) {
      elements.locationDetail.textContent = t("cityNotFound");
      elements.pageMessage.textContent = t("invalidCity", { city: name });
      return;
    }
    await selectPlace(place);
  } catch (error) {
    if (error.name === "AbortError") return;
    elements.locationDetail.textContent = t("citySearchFailed");
    elements.pageMessage.textContent =
      error instanceof Error ? error.message : t("citySearchFailed");
  }
}

async function saveSuggestedLocation() {
  const place = addCandidate;
  if (!place) return;

  try {
    const result = addSavedLocation(place);
    updateAddLocationButton(place);
    elements.sidebarStatus.textContent = result.added
      ? t("locationAdded")
      : t("locationAlreadySaved");
    if (result.added) await refreshSavedLocationWeather(result.item);
  } catch (error) {
    console.error("Could not save weather location.", error);
    elements.sidebarStatus.textContent = t("saveLocationError");
  }
}

createWeatherBackground();

elements.searchAddButton.addEventListener("click", () => {
  void saveSuggestedLocation();
});

elements.searchInput.addEventListener("input", () => {
  window.clearTimeout(debounceTimer);
  suggestionController?.abort();
  addCandidate = undefined;
  updateAddLocationButton();
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
          error instanceof Error ? error.message : t("citySearchFailed");
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

window.addEventListener("pagehide", () => {
  weatherController?.abort();
  radarController?.abort();
});

async function initialize() {
  elements.searchInput.value = "桃園";
  try {
    const places = await searchPlaces(DEFAULT_CITY);
    const taoyuan = getPreferredPlace(places);
    if (!taoyuan || taoyuan.country_code !== "TW") {
      throw new Error(t("defaultCityError"));
    }
    try {
      addSavedLocation(taoyuan);
    } catch (error) {
      console.error("Could not save the default weather location.", error);
      elements.sidebarStatus.textContent = t("saveLocationError");
    }
    renderSidebarLocations();
    await loadWeather(taoyuan);
    for (const item of sidebarPlaces) {
      if (!item.current) void refreshSavedLocationWeather(item);
    }
  } catch (error) {
    if (error.name === "AbortError") return;
    elements.currentCard.setAttribute("aria-busy", "false");
    elements.locationDetail.textContent = t("pageWeatherError");
    elements.pageMessage.textContent =
      error instanceof Error ? error.message : t("pageWeatherError");
  }
}

applyTranslations();
renderSidebarLocations();
initialize();
