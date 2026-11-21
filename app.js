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

translations.en.feelsSimilar = "About the same as the air temperature";
translations.en.visibilityReduced = "Reduced visibility";

const CORE_TRANSLATION_KEYS = [
  "languageLabel", "home", "myLocations", "searchCity", "searchPlaceholder",
  "searchButton", "addLocation", "locationAdded", "locationAlreadySaved",
  "high", "low", "hourlyForecast", "tenDayForecast", "rainRadar", "loadingRadar",
  "play", "uvIndex", "sunProtection", "sunriseSunset", "sunrise", "sunset",
  "windSpeed", "humidity", "visibility", "precipitation", "feelsLike", "pressure",
  "today", "loading", "weatherClear", "weatherMostlyClear", "weatherPartlyCloudy",
  "weatherOvercast", "weatherFog", "weatherDrizzle", "weatherFreezingRain",
  "weatherRain", "weatherSnow", "weatherShowers", "weatherSnowShowers",
  "weatherThunderstorm", "weatherVariable", "dewPointLabel", "visibilityClear",
  "rain24Hours", "feelsWarmer", "feelsColder", "pressureLow", "pressureHigh",
  "compassNorth", "compassEast", "compassSouth", "compassWest",
];

const LANGUAGE_ROWS = [
  ["vi","🇻🇳","Tiếng Việt","vi","vi-VN",["Ngôn ngữ","Weather","Địa điểm của tôi","Tìm thành phố","Tìm thành phố…","Tìm","Thêm","Đã thêm","Đã lưu","Cao","Thấp","DỰ BÁO THEO GIỜ","DỰ BÁO 10 NGÀY","RADAR MƯA","Đang tải radar…","Phát","CHỈ SỐ UV","Chống nắng","MẶT TRỜI MỌC · LẶN","Mọc","Lặn","GIÓ","ĐỘ ẨM","TẦM NHÌN","LƯỢNG MƯA","CẢM NHẬN","ÁP SUẤT","Hôm nay","Đang tải","Trời quang","Ít mây","Mây rải rác","Nhiều mây","Sương mù","Mưa phùn","Mưa đóng băng","Mưa","Tuyết","Mưa rào","Mưa tuyết","Dông","Thời tiết thay đổi","Điểm sương","Trời quang","Trong 24 giờ tới","Ấm hơn","Lạnh hơn","Thấp","Cao","B","Đ","N","T"]],
  ["en","🇬🇧","English","en","en-US",["Language","Weather","My Locations","Search city","Search a city…","Search","Add","Added","Saved","High","Low","HOURLY FORECAST","10-DAY FORECAST","RAIN RADAR","Loading radar…","Play","UV INDEX","Sun protection","SUNRISE · SUNSET","Sunrise","Sunset","WIND","HUMIDITY","VISIBILITY","PRECIPITATION","FEELS LIKE","PRESSURE","Today","Loading","Clear","Mostly clear","Partly cloudy","Cloudy","Fog","Drizzle","Freezing rain","Rain","Snow","Showers","Snow showers","Thunderstorm","Variable conditions","Dew point","Clear","Next 24 hours","Warmer","Cooler","Low","High","N","E","S","W"]],
  ["zh-TW","🇹🇼","繁體中文","zh-TW","zh-TW",["語言","Weather","我的位置","搜尋城市","搜尋城市…","搜尋","新增","已新增","已儲存","最高","最低","逐時預報","未來十日","降雨雷達","正在載入雷達…","播放","紫外線指數","防曬提醒","日出 · 日落","日出","日落","風","濕度","能見度","降水量","體感","氣壓","今天","載入中","晴朗","大致晴朗","局部多雲","陰天","有霧","毛毛雨","凍雨","下雨","下雪","陣雨","陣雪","雷雨","天氣多變","露點","能見度良好","未來 24 小時","較暖","較涼","低","高","北","東","南","西"]],
  ["ja","🇯🇵","日本語","ja","ja-JP",["言語","Weather","マイロケーション","都市を検索","都市を検索…","検索","追加","追加済み","保存済み","最高","最低","1時間ごとの予報","10日間予報","雨雲レーダー","レーダーを読み込み中…","再生","紫外線指数","日焼け対策","日の出 · 日の入り","日の出","日の入り","風","湿度","視程","降水量","体感温度","気圧","今日","読み込み中","晴れ","おおむね晴れ","晴れ時々曇り","曇り","霧","霧雨","着氷性の雨","雨","雪","にわか雨","にわか雪","雷雨","変わりやすい天気","露点","良好","今後24時間","暖かく感じる","涼しく感じる","低","高","北","東","南","西"]],
  ["ko","🇰🇷","한국어","ko","ko-KR",["언어","Weather","나의 위치","도시 검색","도시 검색…","검색","추가","추가됨","저장됨","최고","최저","시간별 예보","10일 예보","강수 레이더","레이더 불러오는 중…","재생","자외선 지수","자외선 차단","일출 · 일몰","일출","일몰","바람","습도","가시거리","강수량","체감 온도","기압","오늘","불러오는 중","맑음","대체로 맑음","구름 조금","흐림","안개","이슬비","어는 비","비","눈","소나기","눈 소나기","뇌우","변덕스러운 날씨","이슬점","맑음","향후 24시간","더 따뜻하게","더 서늘하게","낮음","높음","북","동","남","서"]],
  ["zh-CN","🇨🇳","简体中文","zh-CN","zh-CN",["语言","Weather","我的位置","搜索城市","搜索城市…","搜索","添加","已添加","已保存","最高","最低","逐小时预报","未来十天","降雨雷达","正在加载雷达…","播放","紫外线指数","防晒提醒","日出 · 日落","日出","日落","风","湿度","能见度","降水量","体感","气压","今天","加载中","晴朗","大致晴朗","局部多云","阴天","有雾","毛毛雨","冻雨","下雨","下雪","阵雨","阵雪","雷雨","天气多变","露点","能见度良好","未来24小时","较暖","较凉","低","高","北","东","南","西"]],
  ["es","🇪🇸","Español","es","es-ES",["Idioma","Weather","Mis ubicaciones","Buscar ciudad","Buscar ciudad…","Buscar","Añadir","Añadido","Guardado","Máxima","Mínima","PRONÓSTICO POR HORA","PRONÓSTICO DE 10 DÍAS","RADAR DE LLUVIA","Cargando radar…","Reproducir","ÍNDICE UV","Protección solar","AMANECER · ATARDECER","Amanecer","Atardecer","VIENTO","HUMEDAD","VISIBILIDAD","PRECIPITACIÓN","SENSACIÓN TÉRMICA","PRESIÓN","Hoy","Cargando","Despejado","Mayormente despejado","Parcialmente nublado","Nublado","Niebla","Llovizna","Lluvia engelante","Lluvia","Nieve","Chubascos","Chubascos de nieve","Tormenta","Tiempo variable","Punto de rocío","Despejado","Próximas 24 horas","Más cálido","Más fresco","Baja","Alta","N","E","S","O"]],
  ["fr","🇫🇷","Français","fr","fr-FR",["Langue","Weather","Mes lieux","Rechercher une ville","Rechercher…","Rechercher","Ajouter","Ajouté","Enregistré","Max.","Min.","PRÉVISIONS HORAIRES","PRÉVISIONS SUR 10 JOURS","RADAR DE PLUIE","Chargement du radar…","Lire","INDICE UV","Protection solaire","LEVER · COUCHER DU SOLEIL","Lever","Coucher","VENT","HUMIDITÉ","VISIBILITÉ","PRÉCIPITATIONS","RESSENTI","PRESSION","Aujourd’hui","Chargement","Dégagé","Majoritairement dégagé","Partiellement nuageux","Nuageux","Brouillard","Bruine","Pluie verglaçante","Pluie","Neige","Averses","Averses de neige","Orage","Temps variable","Point de rosée","Dégagé","Prochaines 24 h","Plus chaud","Plus frais","Basse","Élevée","N","E","S","O"]],
  ["de","🇩🇪","Deutsch","de","de-DE",["Sprache","Weather","Meine Orte","Stadt suchen","Stadt suchen…","Suchen","Hinzufügen","Hinzugefügt","Gespeichert","Höchst","Tiefst","STÜNDLICHE VORHERSAGE","10-TAGE-VORHERSAGE","REGENRADAR","Radar wird geladen…","Abspielen","UV-INDEX","Sonnenschutz","SONNENAUFGANG · -UNTERGANG","Aufgang","Untergang","WIND","LUFTFEUCHTIGKEIT","SICHTWEITE","NIEDERSCHLAG","GEFÜHLT","LUFTDRUCK","Heute","Wird geladen","Klar","Überwiegend klar","Teilweise bewölkt","Bewölkt","Nebel","Nieselregen","Gefrierender Regen","Regen","Schnee","Schauer","Schneeschauer","Gewitter","Wechselhaft","Taupunkt","Klar","Nächste 24 Stunden","Wärmer","Kühler","Niedrig","Hoch","N","O","S","W"]],
  ["pt","🇵🇹","Português","pt","pt-PT",["Idioma","Weather","Meus locais","Buscar cidade","Buscar cidade…","Buscar","Adicionar","Adicionado","Salvo","Máxima","Mínima","PREVISÃO POR HORA","PREVISÃO DE 10 DIAS","RADAR DE CHUVA","Carregando radar…","Reproduzir","ÍNDICE UV","Proteção solar","NASCER · PÔR DO SOL","Nascer","Pôr do sol","VENTO","HUMIDADE","VISIBILIDADE","PRECIPITAÇÃO","SENSAÇÃO TÉRMICA","PRESSÃO","Hoje","Carregando","Céu limpo","Maioritariamente limpo","Parcialmente nublado","Nublado","Nevoeiro","Chuvisco","Chuva congelante","Chuva","Neve","Aguaceiros","Aguaceiros de neve","Trovoada","Tempo variável","Ponto de orvalho","Boa","Próximas 24 horas","Mais quente","Mais fresco","Baixa","Alta","N","E","S","O"]],
  ["ru","🇷🇺","Русский","ru","ru-RU",["Язык","Weather","Мои места","Поиск города","Поиск города…","Поиск","Добавить","Добавлено","Сохранено","Макс.","Мин.","ПОЧАСОВОЙ ПРОГНОЗ","ПРОГНОЗ НА 10 ДНЕЙ","РАДАР ДОЖДЯ","Загрузка радара…","Пуск","УФ-ИНДЕКС","Защита от солнца","ВОСХОД · ЗАКАТ","Восход","Закат","ВЕТЕР","ВЛАЖНОСТЬ","ВИДИМОСТЬ","ОСАДКИ","ОЩУЩАЕТСЯ","ДАВЛЕНИЕ","Сегодня","Загрузка","Ясно","Преимущественно ясно","Переменная облачность","Облачно","Туман","Морось","Ледяной дождь","Дождь","Снег","Ливень","Снегопад","Гроза","Переменчивая погода","Точка росы","Ясно","В ближайшие 24 часа","Теплее","Прохладнее","Низкое","Высокое","С","В","Ю","З"]],
  ["it","🇮🇹","Italiano","it","it-IT",["Lingua","Weather","Le mie posizioni","Cerca città","Cerca città…","Cerca","Aggiungi","Aggiunto","Salvato","Massima","Minima","PREVISIONI ORARIE","PREVISIONI 10 GIORNI","RADAR PIOGGIA","Caricamento radar…","Riproduci","INDICE UV","Protezione solare","ALBA · TRAMONTO","Alba","Tramonto","VENTO","UMIDITÀ","VISIBILITÀ","PRECIPITAZIONI","PERCEPITA","PRESSIONE","Oggi","Caricamento","Sereno","Prevalentemente sereno","Parzialmente nuvoloso","Nuvoloso","Nebbia","Pioviggine","Pioggia gelata","Pioggia","Neve","Rovesci","Rovesci di neve","Temporale","Variabile","Punto di rugiada","Sereno","Prossime 24 ore","Più caldo","Più fresco","Bassa","Alta","N","E","S","O"]],
  ["ar","🇸🇦","العربية","ar","ar",["اللغة","Weather","مواقعي","ابحث عن مدينة","ابحث عن مدينة…","بحث","إضافة","تمت الإضافة","محفوظ","العظمى","الصغرى","توقعات كل ساعة","توقعات 10 أيام","رادار المطر","جارٍ تحميل الرادار…","تشغيل","مؤشر الأشعة فوق البنفسجية","الوقاية من الشمس","الشروق · الغروب","الشروق","الغروب","الرياح","الرطوبة","الرؤية","الهطول","المحسوسة","الضغط","اليوم","جارٍ التحميل","صافٍ","غائم جزئيًا","غائم جزئيًا","غائم","ضباب","رذاذ","مطر متجمد","مطر","ثلج","زخات","زخات ثلجية","عاصفة رعدية","طقس متغير","نقطة الندى","صافية","خلال 24 ساعة","أدفأ","أبرد","منخفض","مرتفع","ش","ق","ج","غ"]],
  ["hi","🇮🇳","हिन्दी","hi","hi-IN",["भाषा","Weather","मेरे स्थान","शहर खोजें","शहर खोजें…","खोजें","जोड़ें","जोड़ा गया","सहेजा गया","अधिकतम","न्यूनतम","घंटेवार पूर्वानुमान","10-दिन का पूर्वानुमान","वर्षा रडार","रडार लोड हो रहा है…","चलाएँ","UV सूचकांक","धूप से सुरक्षा","सूर्योदय · सूर्यास्त","सूर्योदय","सूर्यास्त","हवा","आर्द्रता","दृश्यता","वर्षा","अनुभूत तापमान","दबाव","आज","लोड हो रहा है","साफ़","अधिकतर साफ़","आंशिक बादल","बादल","कोहरा","बूंदाबांदी","जमने वाली वर्षा","बारिश","बर्फ़","बौछार","बर्फ़ीली बौछार","आंधी","बदलता मौसम","ओसांक","साफ़","अगले 24 घंटे","गर्म","ठंडा","कम","अधिक","उत्तर","पूर्व","दक्षिण","पश्चिम"]],
  ["th","🇹🇭","ไทย","th","th-TH",["ภาษา","Weather","สถานที่ของฉัน","ค้นหาเมือง","ค้นหาเมือง…","ค้นหา","เพิ่ม","เพิ่มแล้ว","บันทึกแล้ว","สูงสุด","ต่ำสุด","พยากรณ์รายชั่วโมง","พยากรณ์ 10 วัน","เรดาร์ฝน","กำลังโหลดเรดาร์…","เล่น","ดัชนี UV","ป้องกันแสงแดด","พระอาทิตย์ขึ้น · ตก","ขึ้น","ตก","ลม","ความชื้น","ทัศนวิสัย","ปริมาณฝน","รู้สึกเหมือน","ความกดอากาศ","วันนี้","กำลังโหลด","ท้องฟ้าแจ่มใส","แจ่มใสเป็นส่วนใหญ่","มีเมฆบางส่วน","มีเมฆมาก","หมอก","ฝนปรอย","ฝนเยือกแข็ง","ฝน","หิมะ","ฝนซู่","หิมะตกเป็นช่วง","พายุฝนฟ้าคะนอง","อากาศแปรปรวน","จุดน้ำค้าง","แจ่มใส","24 ชั่วโมงข้างหน้า","อุ่นกว่า","เย็นกว่า","ต่ำ","สูง","เหนือ","ตะวันออก","ใต้","ตะวันตก"]],
  ["id","🇮🇩","Bahasa Indonesia","id","id-ID",["Bahasa","Weather","Lokasi Saya","Cari kota","Cari kota…","Cari","Tambah","Ditambahkan","Tersimpan","Tertinggi","Terendah","PRAKIRAAN PER JAM","PRAKIRAAN 10 HARI","RADAR HUJAN","Memuat radar…","Putar","INDEKS UV","Perlindungan matahari","MATAHARI TERBIT · TERBENAM","Terbit","Terbenam","ANGIN","KELEMBAPAN","JARAK PANDANG","CURAH HUJAN","TERASA SEPERTI","TEKANAN","Hari ini","Memuat","Cerah","Sebagian besar cerah","Berawan sebagian","Berawan","Kabut","Gerimis","Hujan beku","Hujan","Salju","Hujan deras","Hujan salju","Badai petir","Cuaca berubah","Titik embun","Cerah","24 jam ke depan","Lebih hangat","Lebih sejuk","Rendah","Tinggi","U","T","S","B"]],
  ["ms","🇲🇾","Bahasa Melayu","ms","ms-MY",["Bahasa","Weather","Lokasi Saya","Cari bandar","Cari bandar…","Cari","Tambah","Ditambah","Disimpan","Tinggi","Rendah","RAMALAN SETIAP JAM","RAMALAN 10 HARI","RADAR HUJAN","Memuatkan radar…","Main","INDEKS UV","Perlindungan matahari","MATAHARI TERBIT · TERBENAM","Terbit","Terbenam","ANGIN","KELEMBAPAN","JARAK PANDANG","KERPASAN","TERASA SEPERTI","TEKANAN","Hari ini","Memuatkan","Cerah","Kebanyakannya cerah","Separa mendung","Mendung","Kabus","Gerimis","Hujan beku","Hujan","Salji","Hujan renyai","Salji renyai","Ribut petir","Cuaca berubah","Takat embun","Cerah","24 jam akan datang","Lebih panas","Lebih sejuk","Rendah","Tinggi","U","T","S","B"]],
  ["tr","🇹🇷","Türkçe","tr","tr-TR",["Dil","Weather","Konumlarım","Şehir ara","Şehir ara…","Ara","Ekle","Eklendi","Kaydedildi","En yüksek","En düşük","SAATLİK TAHMİN","10 GÜNLÜK TAHMİN","YAĞIŞ RADARI","Radar yükleniyor…","Oynat","UV İNDEKSİ","Güneşten korunma","GÜN DOĞUMU · BATIMI","Doğuş","Batış","RÜZGÂR","NEM","GÖRÜŞ MESAFESİ","YAĞIŞ","HİSSEDİLEN","BASINÇ","Bugün","Yükleniyor","Açık","Çoğunlukla açık","Parçalı bulutlu","Bulutlu","Sis","Çisenti","Dondurucu yağmur","Yağmur","Kar","Sağanak","Kar sağanağı","Gök gürültülü fırtına","Değişken","Çiy noktası","Açık","Önümüzdeki 24 saat","Daha sıcak","Daha serin","Düşük","Yüksek","K","D","G","B"]],
  ["nl","🇳🇱","Nederlands","nl","nl-NL",["Taal","Weather","Mijn locaties","Zoek een stad","Zoek een stad…","Zoeken","Voeg toe","Toegevoegd","Opgeslagen","Hoog","Laag","WEERSVERWACHTING PER UUR","10-DAAGSE VERWACHTING","REGENRADAR","Radar laden…","Afspelen","UV-INDEX","Zonbescherming","ZONSOPKOMST · -ONDERGANG","Opkomst","Ondergang","WIND","VOCHTIGHEID","ZICHT","NEERSLAG","GEVOELD","LUCHTDRUK","Vandaag","Laden","Helder","Overwegend helder","Half bewolkt","Bewolkt","Mist","Motregen","IJzel","Regen","Sneeuw","Buien","Sneeuwbuien","Onweer","Wisselvallig","Dauwpunt","Helder","Komende 24 uur","Warmer","Koeler","Laag","Hoog","N","O","Z","W"]],
  ["pl","🇵🇱","Polski","pl","pl-PL",["Język","Weather","Moje lokalizacje","Szukaj miasta","Szukaj miasta…","Szukaj","Dodaj","Dodano","Zapisano","Maks.","Min.","PROGNOZA GODZINOWA","PROGNOZA NA 10 DNI","RADAR OPADÓW","Ładowanie radaru…","Odtwórz","INDEKS UV","Ochrona przed słońcem","WSCHÓD · ZACHÓD SŁOŃCA","Wschód","Zachód","WIATR","WILGOTNOŚĆ","WIDOCZNOŚĆ","OPADY","ODCZUWALNA","CIŚNIENIE","Dzisiaj","Ładowanie","Bezchmurnie","Przeważnie bezchmurnie","Częściowe zachmurzenie","Pochmurno","Mgła","Mżawka","Marznący deszcz","Deszcz","Śnieg","Przelotne opady","Przelotny śnieg","Burza","Zmienna pogoda","Punkt rosy","Dobra","Najbliższe 24 godziny","Cieplej","Chłodniej","Niskie","Wysokie","N","E","S","W"]],
  ["sv","🇸🇪","Svenska","sv","sv-SE",["Språk","Weather","Mina platser","Sök stad","Sök stad…","Sök","Lägg till","Tillagd","Sparad","Högst","Lägst","TIMPROGNOS","10-DAGARS PROGNOS","REGNRADAR","Laddar radar…","Spela","UV-INDEX","Solskydd","SOLUPPGÅNG · NEDGÅNG","Uppgång","Nedgång","VIND","LUFTFUKTIGHET","SIKT","NEDERBÖRD","KÄNNS SOM","LUFTTRYCK","Idag","Laddar","Klart","Mestadels klart","Delvis molnigt","Molnigt","Dimma","Duggregn","Underkylt regn","Regn","Snö","Skurar","Snöbyar","Åska","Växlande väder","Daggpunkt","Klart","Nästa 24 timmar","Varmare","Svalare","Lågt","Högt","N","Ö","S","V"]],
  ["no","🇳🇴","Norsk","no","nb-NO",["Språk","Weather","Mine steder","Søk etter by","Søk etter by…","Søk","Legg til","Lagt til","Lagret","Høyest","Lavest","TIMEVARSEL","10-DAGERS VARSEL","REGNRADAR","Laster radar…","Spill av","UV-INDEKS","Solbeskyttelse","SOLoppgang · NEDGANG","Oppgang","Nedgang","VIND","LUFTFUKTIGHET","SIKT","NEDBØR","FØLES SOM","LUFTTRYKK","I dag","Laster","Klart","For det meste klart","Delvis skyet","Skyet","Tåke","Yr","Underkjølt regn","Regn","Snø","Regnbyger","Snøbyger","Tordenvær","Skiftende vær","Duggpunkt","Klart","Neste 24 timer","Varmere","Kjøligere","Lavt","Høyt","N","Ø","S","V"]],
  ["da","🇩🇰","Dansk","da","da-DK",["Sprog","Weather","Mine lokaliteter","Søg by","Søg by…","Søg","Tilføj","Tilføjet","Gemt","Højeste","Laveste","TIMEPROGNOSE","10-DAGES PROGNOSE","REGNRADAR","Indlæser radar…","Afspil","UV-INDEKS","Solbeskyttelse","SOL OP · NED","Op","Ned","VIND","LUFTFUGTIGHED","SIGTBARHED","NEDBØR","FØLES SOM","TRYK","I dag","Indlæser","Klart","Mest klart","Delvist skyet","Overskyet","Tåge","Støvregn","Isslag","Regn","Sne","Byger","Snebyger","Tordenvejr","Omskifteligt vejr","Dugpunkt","Klart","Næste 24 timer","Varmere","Køligere","Lavt","Højt","N","Ø","S","V"]],
  ["fi","🇫🇮","Suomi","fi","fi-FI",["Kieli","Weather","Omat sijainnit","Hae kaupunkia","Hae kaupunkia…","Hae","Lisää","Lisätty","Tallennettu","Ylin","Alin","TUNTIENNUSTE","10 PÄIVÄN ENNUSTE","SADETUTKA","Ladataan tutkaa…","Toista","UV-INDEKSI","Aurinkosuoja","AURINGONNOUSU · LASKU","Nousu","Lasku","TUULI","KOSTEUS","NÄKYVYYS","SADE","TUNTUU KUIN","ILMANPAINE","Tänään","Ladataan","Selkeää","Enimmäkseen selkeää","Puolipilvistä","Pilvistä","Sumua","Tihkusadetta","Jäätävää sadetta","Sadetta","Lunta","Kuuroja","Lumikuuroja","Ukkosta","Vaihtelevat olosuhteet","Kastepiste","Selkeä","Seuraavat 24 tuntia","Lämpimämpi","Viileämpi","Matala","Korkea","P","I","E","L"]],
  ["el","🇬🇷","Ελληνικά","el","el-GR",["Γλώσσα","Weather","Οι τοποθεσίες μου","Αναζήτηση πόλης","Αναζήτηση πόλης…","Αναζήτηση","Προσθήκη","Προστέθηκε","Αποθηκεύτηκε","Μέγιστη","Ελάχιστη","ΩΡΙΑΙΑ ΠΡΟΓΝΩΣΗ","ΠΡΟΓΝΩΣΗ 10 ΗΜΕΡΩΝ","ΡΑΝΤΑΡ ΒΡΟΧΗΣ","Φόρτωση ραντάρ…","Αναπαραγωγή","ΔΕΙΚΤΗΣ UV","Αντηλιακή προστασία","ΑΝΑΤΟΛΗ · ΔΥΣΗ","Ανατολή","Δύση","ΑΝΕΜΟΣ","ΥΓΡΑΣΙΑ","ΟΡΑΤΟΤΗΤΑ","ΥΕΤΟΣ","ΑΙΣΘΗΣΗ","ΠΙΕΣΗ","Σήμερα","Φόρτωση","Αίθριος","Κυρίως αίθριος","Μερική συννεφιά","Συννεφιά","Ομίχλη","Ψιχάλα","Παγωμένη βροχή","Βροχή","Χιόνι","Μπόρες","Χιονοπτώσεις","Καταιγίδα","Μεταβλητός καιρός","Σημείο δρόσου","Καθαρός","Επόμενες 24 ώρες","Θερμότερα","Δροσερότερα","Χαμηλή","Υψηλή","Β","Α","Ν","Δ"]],
  ["cs","🇨🇿","Čeština","cs","cs-CZ",["Jazyk","Weather","Moje místa","Hledat město","Hledat město…","Hledat","Přidat","Přidáno","Uloženo","Nejvyšší","Nejnižší","HODINOVÁ PŘEDPOVĚĎ","PŘEDPOVĚĎ NA 10 DNŮ","SRÁŽKOVÝ RADAR","Načítání radaru…","Přehrát","UV INDEX","Ochrana před sluncem","VÝCHOD · ZÁPAD SLUNCE","Východ","Západ","VÍTR","VLHKOST","VIDITELNOST","SRÁŽKY","POCITOVÁ TEPLOTA","TLAK","Dnes","Načítání","Jasno","Převážně jasno","Částečně oblačno","Zataženo","Mlha","Mrholení","Mrznoucí déšť","Déšť","Sníh","Přeháňky","Sněhové přeháňky","Bouřka","Proměnlivé počasí","Rosný bod","Jasno","Příštích 24 hodin","Tepleji","Chladněji","Nízký","Vysoký","S","V","J","Z"]],
  ["hu","🇭🇺","Magyar","hu","hu-HU",["Nyelv","Weather","Helyeim","Város keresése","Város keresése…","Keresés","Hozzáadás","Hozzáadva","Mentve","Maximum","Minimum","ÓRÁNKÉNTI ELŐREJELZÉS","10 NAPOS ELŐREJELZÉS","ESŐRADAR","Radar betöltése…","Lejátszás","UV-INDEX","Napvédelem","NAPKELTE · NAPNYUGTA","Napkelte","Napnyugta","SZÉL","PÁRATARTALOM","LÁTÁSTÁVOLSÁG","CSAPADÉK","HŐÉRZET","LÉGNYOMÁS","Ma","Betöltés","Derült","Többnyire derült","Részben felhős","Felhős","Köd","Szitálás","Ónos eső","Eső","Hó","Zápor","Hózápor","Zivatar","Változékony idő","Harmatpont","Derült","Következő 24 óra","Melegebb","Hűvösebb","Alacsony","Magas","É","K","D","NY"]],
  ["ro","🇷🇴","Română","ro","ro-RO",["Limbă","Weather","Locațiile mele","Caută oraș","Caută oraș…","Caută","Adaugă","Adăugat","Salvat","Maximă","Minimă","PROGNOZĂ ORARĂ","PROGNOZĂ PE 10 ZILE","RADAR DE PLOAIE","Se încarcă radarul…","Redare","INDICE UV","Protecție solară","RĂSĂRIT · APUS","Răsărit","Apus","VÂNT","UMIDITATE","VIZIBILITATE","PRECIPITAȚII","RESIMȚITĂ","PRESIUNE","Astăzi","Se încarcă","Senin","Mai mult senin","Parțial noros","Noros","Ceață","Burniță","Ploaie înghețată","Ploaie","Ninsoare","Averse","Averse de ninsoare","Furtună","Vreme schimbătoare","Punct de rouă","Senin","Următoarele 24 de ore","Mai cald","Mai răcoare","Scăzută","Ridicată","N","E","S","V"]],
  ["uk","🇺🇦","Українська","uk","uk-UA",["Мова","Weather","Мої місця","Пошук міста","Пошук міста…","Пошук","Додати","Додано","Збережено","Макс.","Мін.","ПОГОДИННИЙ ПРОГНОЗ","ПРОГНОЗ НА 10 ДНІВ","РАДАР ДОЩУ","Завантаження радара…","Відтворити","УФ-ІНДЕКС","Захист від сонця","СХІД · ЗАХІД СОНЦЯ","Схід","Захід","ВІТЕР","ВОЛОГІСТЬ","ВИДИМІСТЬ","ОПАДИ","ВІДЧУВАЄТЬСЯ","ТИСК","Сьогодні","Завантаження","Ясно","Переважно ясно","Мінлива хмарність","Хмарно","Туман","Мряка","Крижаний дощ","Дощ","Сніг","Зливи","Снігопади","Гроза","Мінлива погода","Точка роси","Ясно","Наступні 24 години","Тепліше","Прохолодніше","Низький","Високий","Пн","Сх","Пд","Зх"]],
  ["he","🇮🇱","עברית","he","he-IL",["שפה","Weather","המיקומים שלי","חיפוש עיר","חיפוש עיר…","חיפוש","הוספה","נוסף","נשמר","גבוהה","נמוכה","תחזית לפי שעה","תחזית ל-10 ימים","מכ״ם גשם","מכ״ם נטען…","הפעלה","מדד UV","הגנה מהשמש","זריחה · שקיעה","זריחה","שקיעה","רוח","לחות","ראות","משקעים","מרגיש כמו","לחץ אוויר","היום","בטעינה","בהיר","בהיר ברובו","מעונן חלקית","מעונן","ערפל","טפטוף","גשם קופא","גשם","שלג","ממטרים","ממטרי שלג","סופת רעמים","מזג אוויר משתנה","נקודת טל","בהיר","ב-24 השעות הקרובות","חם יותר","קריר יותר","נמוך","גבוה","צפון","מזרח","דרום","מערב"]],
];

const LANGUAGES = LANGUAGE_ROWS.map(([code, flag, name, apiLanguage, locale, values]) => ({
  code, flag, name, apiLanguage, locale,
  translations: Object.fromEntries(CORE_TRANSLATION_KEYS.map((key, index) => [key, values[index]])),
}));
const WIND_LABELS = {
  vi: ["Lặng gió", "Gió nhẹ", "Gió vừa", "Gió mạnh"],
  en: ["Calm", "Light breeze", "Breezy", "Strong wind"],
  "zh-TW": ["微風無風", "微風", "有風", "強風"],
  ja: ["穏やか", "そよ風", "風あり", "強風"],
  ko: ["고요함", "산들바람", "바람이 붐", "강풍"],
  "zh-CN": ["微风无风", "微风", "有风", "强风"],
  es: ["Calma", "Brisa suave", "Ventoso", "Viento fuerte"],
  fr: ["Calme", "Brise légère", "Vent modéré", "Vent fort"],
  de: ["Windstill", "Leichte Brise", "Windig", "Starker Wind"],
  pt: ["Calmo", "Brisa leve", "Ventoso", "Vento forte"],
  ru: ["Штиль", "Лёгкий ветер", "Ветрено", "Сильный ветер"],
  it: ["Calma", "Brezza leggera", "Ventoso", "Vento forte"],
  ar: ["هدوء","نسيم خفيف","رياح معتدلة","رياح قوية"],
  hi: ["शांत","हल्की हवा","हवादार","तेज़ हवा"],
  th: ["ลมสงบ","ลมอ่อน","มีลม","ลมแรง"],
  id: ["Tenang","Angin sepoi","Berangin","Angin kencang"],
  ms: ["Tenang","Bayu lembut","Berangin","Angin kencang"],
  tr: ["Sakin","Hafif esinti","Rüzgârlı","Kuvvetli rüzgâr"],
  nl: ["Windstil","Licht briesje","Winderig","Harde wind"],
  pl: ["Cisza","Lekka bryza","Wietrznie","Silny wiatr"],
  sv: ["Vindstilla","Lätt bris","Blåsigt","Hård vind"],
  no: ["Stille","Svak bris","Vindfullt","Sterk vind"],
  da: ["Stille","Let brise","Blæsende","Kraftig vind"],
  fi: ["Tyyntä","Heikko tuuli","Tuulista","Kova tuuli"],
  el: ["Άπνοια","Ελαφριά αύρα","Αέρας","Ισχυρός άνεμος"],
  cs: ["Bezvětří","Slabý vánek","Větrno","Silný vítr"],
  hu: ["Szélcsend","Enyhe szellő","Szeles","Erős szél"],
  ro: ["Calm","Briză ușoară","Vântos","Vânt puternic"],
  uk: ["Штиль","Легкий вітер","Вітряно","Сильний вітер"],
  he: ["רגיעה","רוח קלה","רוח","רוח חזקה"],
};
const CLOSE_LABELS = {
  vi: "Đóng", en: "Close", "zh-TW": "關閉", ja: "閉じる", ko: "닫기",
  "zh-CN": "关闭", es: "Cerrar", fr: "Fermer", de: "Schließen", pt: "Fechar",
  ru: "Закрыть", it: "Chiudi", ar: "إغلاق", hi: "बंद करें", th: "ปิด",
  id: "Tutup", ms: "Tutup", tr: "Kapat", nl: "Sluiten", pl: "Zamknij",
  sv: "Stäng", no: "Lukk", da: "Luk", fi: "Sulje", el: "Κλείσιμο",
  cs: "Zavřít", hu: "Bezárás", ro: "Închide", uk: "Закрити", he: "סגור",
};
const FALLBACK_LANGUAGE = "en";
const languageByCode = new Map(LANGUAGES.map((language) => [language.code, language]));
const TRANSLATION_ALIASES = {
  metaDescription: "home",
  pageTitle: "home",
  sidebarAriaLabel: "myLocations",
  weatherSection: "home",
  loadingWeather: "loading",
  liveUpdate: "loading",
  updatedAt: "{time}",
  hourlyRainExpected: "rain24Hours",
  hourlyNoRainExpected: "weatherClear",
  forecastDetailTitle: "tenDayForecast",
  forecastDetailClose: "close",
  forecastRainTotal: "precipitation",
  forecastRainChance: "rain24Hours",
  forecastWind: "windSpeed",
  forecastUv: "uvIndex",
  forecastFeelsLike: "feelsLike",
  forecastHumidity: "humidity",
  forecastTemperatureChart: "hourlyForecast",
  forecastRainChart: "precipitation",
  forecastPreviousDay: "‹",
  forecastNextDay: "›",
  forecastCaption: "tenDayForecast",
  footerNote: "home",
  radarMapLabel: "rainRadar",
  radarTimeline: "hourlyForecast",
  radarLoading: "loadingRadar",
  playRadar: "play",
  pauseRadar: "play",
  uvLow: "sunProtection",
  uvModerate: "sunProtection",
  uvHigh: "sunProtection",
  uvVeryHigh: "sunProtection",
  uvExtreme: "sunProtection",
  windGentle: "windSpeed",
  windBreezy: "windSpeed",
  windStrong: "windSpeed",
  windVeryStrong: "windSpeed",
  now: "today",
  forecastNoHourlyData: "loading",
  forecastHourlyChartLabel: "hourlyForecast",
  searchingCity: "loading",
};
for (const language of LANGUAGES) {
  translations[language.code] = {
    ...(language.code === "vi" ? translations.vi : {}),
    ...(language.code === "en" ? translations.en : {}),
    ...(language.code === "zh-TW" ? translations.zh : {}),
    ...language.translations,
  };
  translations[language.code].close = CLOSE_LABELS[language.code];
  translations[language.code].forecastDetailClose = CLOSE_LABELS[language.code];
}
translations["zh-TW"] = { ...translations.zh, ...languageByCode.get("zh-TW").translations };
translations["zh-CN"] = { ...translations["zh-CN"], ...languageByCode.get("zh-CN").translations };

const DETAIL_TRANSLATIONS = {
  vi: ["Nhiệt độ", "Tóm tắt hàng ngày", "So sánh hàng ngày", "Trong ngày, {metric} dao động từ {min} đến {max}, trung bình {average}.", "Trung bình cao hơn {difference} so với ngày trước.", "Trung bình thấp hơn {difference} so với ngày trước.", "Mức trung bình gần như không đổi so với ngày trước.", "Chưa có dữ liệu ngày trước để so sánh. {metric} được ghi nhận theo từng giờ.", "Điểm sương", "Gió giật", "Mặt trời mọc {sunrise}, lặn {sunset}.", "Thời lượng ban ngày khoảng {hours} giờ.", "Chọn ngày dự báo"],
  en: ["Temperature", "Daily summary", "Daily comparison", "Today, {metric} ranged from {min} to {max}, averaging {average}.", "The daily average is {difference} higher than the previous day.", "The daily average is {difference} lower than the previous day.", "The daily average is nearly unchanged from the previous day.", "No previous-day reading is available. {metric} is measured throughout the day.", "Dew point", "Wind gust", "Sunrise at {sunrise}; sunset at {sunset}.", "Daylight lasts about {hours} hours.", "Choose forecast day"],
  "zh-TW": ["氣溫", "每日摘要", "每日比較", "今天{metric}介於{min}至{max}，平均為{average}。", "每日平均比前一天高{difference}。", "每日平均比前一天低{difference}。", "每日平均與前一天相近。", "沒有前一天的資料可供比較；{metric}為全天逐時觀測值。", "露點", "陣風", "日出時間為{sunrise}，日落時間為{sunset}。", "白晝約{hours}小時。", "選擇預報日期"],
  ja: ["気温", "1日の概要", "前日との比較", "今日の{metric}は{min}から{max}の範囲で、平均は{average}です。", "日平均は前日より{difference}高くなっています。", "日平均は前日より{difference}低くなっています。", "日平均は前日とほぼ同じです。", "前日の比較データはありません。{metric}は1日を通して毎時観測されます。", "露点", "突風", "日の出は{sunrise}、日の入りは{sunset}です。", "日照時間は約{hours}時間です。", "予報日を選択"],
  ko: ["기온", "일일 요약", "전날 비교", "오늘 {metric}은(는) {min}에서 {max} 사이이며 평균은 {average}입니다.", "일평균이 전날보다 {difference} 높습니다.", "일평균이 전날보다 {difference} 낮습니다.", "일평균은 전날과 거의 같습니다.", "전날 비교 데이터가 없습니다. {metric}은(는) 하루 동안 매시간 측정됩니다.", "이슬점", "돌풍", "일출은 {sunrise}, 일몰은 {sunset}입니다.", "낮 길이는 약 {hours}시간입니다.", "예보 날짜 선택"],
  "zh-CN": ["气温", "每日摘要", "每日比较", "今天{metric}在{min}至{max}之间，平均为{average}。", "日平均比前一天高{difference}。", "日平均比前一天低{difference}。", "日平均与前一天基本持平。", "没有前一天的数据可供比较；{metric}为全天逐小时观测值。", "露点", "阵风", "日出时间为{sunrise}，日落时间为{sunset}。", "白昼约{hours}小时。", "选择预报日期"],
  es: ["Temperatura", "Resumen diario", "Comparación diaria", "Hoy, {metric} osciló entre {min} y {max}, con una media de {average}.", "La media diaria es {difference} más alta que ayer.", "La media diaria es {difference} más baja que ayer.", "La media diaria apenas cambia respecto a ayer.", "No hay datos del día anterior para comparar. {metric} se mide cada hora.", "Punto de rocío", "Ráfaga de viento", "Amanecer a las {sunrise}; atardecer a las {sunset}.", "El día dura unas {hours} horas.", "Elegir día del pronóstico"],
  fr: ["Température", "Résumé quotidien", "Comparaison quotidienne", "Aujourd’hui, {metric} a varié de {min} à {max}, avec une moyenne de {average}.", "La moyenne du jour est supérieure de {difference} à celle d’hier.", "La moyenne du jour est inférieure de {difference} à celle d’hier.", "La moyenne du jour est presque identique à celle d’hier.", "Aucune donnée de la veille n’est disponible. {metric} est mesuré chaque heure.", "Point de rosée", "Rafale", "Lever du soleil à {sunrise} ; coucher à {sunset}.", "La durée du jour est d’environ {hours} heures.", "Choisir un jour"],
  de: ["Temperatur", "Tagesübersicht", "Tagesvergleich", "Heute lag {metric} zwischen {min} und {max}; der Durchschnitt beträgt {average}.", "Der Tagesdurchschnitt liegt {difference} über dem Vortag.", "Der Tagesdurchschnitt liegt {difference} unter dem Vortag.", "Der Tagesdurchschnitt ist nahezu unverändert.", "Für den Vergleich liegen keine Vortagsdaten vor. {metric} wird stündlich gemessen.", "Taupunkt", "Windböe", "Sonnenaufgang um {sunrise}, Sonnenuntergang um {sunset}.", "Der Tag dauert etwa {hours} Stunden.", "Vorhersagetag auswählen"],
  pt: ["Temperatura", "Resumo diário", "Comparação diária", "Hoje, {metric} variou entre {min} e {max}, com média de {average}.", "A média diária está {difference} acima da do dia anterior.", "A média diária está {difference} abaixo da do dia anterior.", "A média diária está praticamente igual à do dia anterior.", "Não há dados do dia anterior para comparar. {metric} é medido a cada hora.", "Ponto de orvalho", "Rajada de vento", "Nascer do sol às {sunrise}; pôr do sol às {sunset}.", "O dia dura cerca de {hours} horas.", "Escolher dia da previsão"],
  ru: ["Температура", "Сводка за день", "Сравнение с предыдущим днём", "Сегодня {metric} меняется от {min} до {max}, среднее значение — {average}.", "Среднее за день на {difference} выше, чем накануне.", "Среднее за день на {difference} ниже, чем накануне.", "Среднее за день почти не изменилось.", "Нет данных за предыдущий день для сравнения. {metric} измеряется каждый час.", "Точка росы", "Порыв ветра", "Восход в {sunrise}, закат в {sunset}.", "Световой день длится около {hours} ч.", "Выбрать день прогноза"],
  it: ["Temperatura", "Riepilogo giornaliero", "Confronto giornaliero", "Oggi {metric} varia da {min} a {max}, con una media di {average}.", "La media giornaliera è {difference} più alta rispetto al giorno precedente.", "La media giornaliera è {difference} più bassa rispetto al giorno precedente.", "La media giornaliera è quasi invariata rispetto al giorno precedente.", "Non ci sono dati del giorno precedente da confrontare. {metric} viene misurato ogni ora.", "Punto di rugiada", "Raffica di vento", "Alba alle {sunrise}; tramonto alle {sunset}.", "La durata del giorno è di circa {hours} ore.", "Scegli il giorno"],
  ar: ["درجة الحرارة", "ملخص يومي", "مقارنة يومية", "تراوحت {metric} اليوم بين {min} و{max}، بمتوسط {average}.", "المتوسط اليومي أعلى من اليوم السابق بمقدار {difference}.", "المتوسط اليومي أقل من اليوم السابق بمقدار {difference}.", "المتوسط اليومي مماثل تقريبًا لليوم السابق.", "لا تتوفر بيانات اليوم السابق للمقارنة. تُقاس {metric} كل ساعة.", "نقطة الندى", "هبة رياح", "الشروق {sunrise} والغروب {sunset}.", "يستمر النهار نحو {hours} ساعة.", "اختر يوم التوقعات"],
  hi: ["तापमान", "दैनिक सारांश", "दैनिक तुलना", "आज {metric} {min} से {max} के बीच रहा; औसत {average} है।", "दैनिक औसत पिछले दिन से {difference} अधिक है।", "दैनिक औसत पिछले दिन से {difference} कम है।", "दैनिक औसत पिछले दिन के लगभग समान है।", "तुलना के लिए पिछले दिन का डेटा उपलब्ध नहीं है। {metric} हर घंटे मापा जाता है।", "ओसांक", "हवा का झोंका", "सूर्योदय {sunrise} पर और सूर्यास्त {sunset} पर।", "दिन लगभग {hours} घंटे का है।", "पूर्वानुमान का दिन चुनें"],
  th: ["อุณหภูมิ", "สรุปรายวัน", "เปรียบเทียบรายวัน", "วันนี้{metric}อยู่ระหว่าง {min} ถึง {max} โดยเฉลี่ย {average}", "ค่าเฉลี่ยรายวันสูงกว่าวันก่อน {difference}", "ค่าเฉลี่ยรายวันต่ำกว่าวันก่อน {difference}", "ค่าเฉลี่ยรายวันใกล้เคียงกับวันก่อน", "ไม่มีข้อมูลวันก่อนสำหรับเปรียบเทียบ โดยวัด{metric}ทุกชั่วโมง", "จุดน้ำค้าง", "ลมกระโชก", "พระอาทิตย์ขึ้นเวลา {sunrise} และตกเวลา {sunset}", "ช่วงกลางวันยาวประมาณ {hours} ชั่วโมง", "เลือกวันพยากรณ์"],
  id: ["Suhu", "Ringkasan harian", "Perbandingan harian", "Hari ini, {metric} berkisar antara {min} hingga {max}, dengan rata-rata {average}.", "Rata-rata harian {difference} lebih tinggi daripada hari sebelumnya.", "Rata-rata harian {difference} lebih rendah daripada hari sebelumnya.", "Rata-rata harian hampir sama dengan hari sebelumnya.", "Data hari sebelumnya tidak tersedia untuk dibandingkan. {metric} diukur setiap jam.", "Titik embun", "Hembusan angin", "Matahari terbit pukul {sunrise}; terbenam pukul {sunset}.", "Panjang siang sekitar {hours} jam.", "Pilih hari prakiraan"],
  ms: ["Suhu", "Ringkasan harian", "Perbandingan harian", "Hari ini, {metric} antara {min} hingga {max}, dengan purata {average}.", "Purata harian {difference} lebih tinggi berbanding hari sebelumnya.", "Purata harian {difference} lebih rendah berbanding hari sebelumnya.", "Purata harian hampir sama dengan hari sebelumnya.", "Data hari sebelumnya tiada untuk perbandingan. {metric} diukur setiap jam.", "Takat embun", "Tiupan angin", "Matahari terbit pada {sunrise}; terbenam pada {sunset}.", "Waktu siang kira-kira {hours} jam.", "Pilih hari ramalan"],
  tr: ["Sıcaklık", "Günlük özet", "Günlük karşılaştırma", "Bugün {metric} {min} ile {max} arasında, ortalama {average} oldu.", "Günlük ortalama önceki günden {difference} daha yüksek.", "Günlük ortalama önceki günden {difference} daha düşük.", "Günlük ortalama önceki günle hemen hemen aynı.", "Karşılaştırma için önceki gün verisi yok. {metric} gün boyunca saatlik ölçülür.", "Çiy noktası", "Rüzgâr hamlesi", "Gün doğumu {sunrise}, gün batımı {sunset}.", "Gündüz yaklaşık {hours} saat sürer.", "Tahmin günü seç"],
  nl: ["Temperatuur", "Dagoverzicht", "Dagvergelijking", "Vandaag lag {metric} tussen {min} en {max}, met een gemiddelde van {average}.", "Het daggemiddelde is {difference} hoger dan de vorige dag.", "Het daggemiddelde is {difference} lager dan de vorige dag.", "Het daggemiddelde is vrijwel gelijk aan de vorige dag.", "Er zijn geen gegevens van de vorige dag om te vergelijken. {metric} wordt elk uur gemeten.", "Dauwpunt", "Windstoot", "Zonsopkomst om {sunrise}; zonsondergang om {sunset}.", "De dag duurt ongeveer {hours} uur.", "Kies een dag"],
  pl: ["Temperatura", "Podsumowanie dnia", "Porównanie dnia", "Dziś {metric} wynosiła od {min} do {max}, a średnia to {average}.", "Średnia dobowa jest o {difference} wyższa niż poprzedniego dnia.", "Średnia dobowa jest o {difference} niższa niż poprzedniego dnia.", "Średnia dobowa jest niemal taka sama jak poprzedniego dnia.", "Brak danych z poprzedniego dnia do porównania. {metric} jest mierzona co godzinę.", "Punkt rosy", "Poryw wiatru", "Wschód słońca o {sunrise}, zachód o {sunset}.", "Dzień trwa około {hours} godz.", "Wybierz dzień prognozy"],
  sv: ["Temperatur", "Dagens sammanfattning", "Jämförelse per dag", "I dag varierade {metric} mellan {min} och {max}, med ett medelvärde på {average}.", "Dagens medelvärde är {difference} högre än föregående dag.", "Dagens medelvärde är {difference} lägre än föregående dag.", "Dagens medelvärde är nästan oförändrat.", "Data från föregående dag saknas. {metric} mäts varje timme.", "Daggpunkt", "Vindby", "Soluppgång {sunrise}; solnedgång {sunset}.", "Dagen är cirka {hours} timmar lång.", "Välj prognosdag"],
  no: ["Temperatur", "Dagsoppsummering", "Daglig sammenligning", "I dag varierte {metric} fra {min} til {max}, med et gjennomsnitt på {average}.", "Dagsgjennomsnittet er {difference} høyere enn dagen før.", "Dagsgjennomsnittet er {difference} lavere enn dagen før.", "Dagsgjennomsnittet er nesten uendret fra dagen før.", "Ingen data fra dagen før er tilgjengelig. {metric} måles hver time.", "Duggpunkt", "Vindkast", "Soloppgang kl. {sunrise}; solnedgang kl. {sunset}.", "Dagen varer omtrent {hours} timer.", "Velg prognosedag"],
  da: ["Temperatur", "Dagsoversigt", "Daglig sammenligning", "I dag lå {metric} mellem {min} og {max}, med et gennemsnit på {average}.", "Dagens gennemsnit er {difference} højere end dagen før.", "Dagens gennemsnit er {difference} lavere end dagen før.", "Dagens gennemsnit er næsten uændret fra dagen før.", "Der mangler data fra dagen før til sammenligning. {metric} måles hver time.", "Dugpunkt", "Vindstød", "Solopgang kl. {sunrise}; solnedgang kl. {sunset}.", "Dagen varer cirka {hours} timer.", "Vælg prognosedag"],
  fi: ["Lämpötila", "Päivän yhteenveto", "Päivävertailu", "Tänään {metric} vaihteli välillä {min}–{max}, keskiarvon ollessa {average}.", "Päivän keskiarvo on {difference} korkeampi kuin edellisenä päivänä.", "Päivän keskiarvo on {difference} matalampi kuin edellisenä päivänä.", "Päivän keskiarvo on lähes sama kuin edellisenä päivänä.", "Edellisen päivän vertailutietoja ei ole. {metric} mitataan tunneittain.", "Kastepiste", "Tuulenpuuska", "Auringonnousu {sunrise}; auringonlasku {sunset}.", "Päivän pituus on noin {hours} tuntia.", "Valitse ennustepäivä"],
  el: ["Θερμοκρασία", "Ημερήσια σύνοψη", "Ημερήσια σύγκριση", "Σήμερα η {metric} κυμάνθηκε από {min} έως {max}, με μέσο όρο {average}.", "Ο ημερήσιος μέσος όρος είναι {difference} υψηλότερος από την προηγούμενη ημέρα.", "Ο ημερήσιος μέσος όρος είναι {difference} χαμηλότερος από την προηγούμενη ημέρα.", "Ο ημερήσιος μέσος όρος είναι σχεδόν αμετάβλητος.", "Δεν υπάρχουν δεδομένα προηγούμενης ημέρας για σύγκριση. Η {metric} μετριέται κάθε ώρα.", "Σημείο δρόσου", "Ριπή ανέμου", "Ανατολή στις {sunrise}· δύση στις {sunset}.", "Η ημέρα διαρκεί περίπου {hours} ώρες.", "Επιλογή ημέρας πρόγνωσης"],
  cs: ["Teplota", "Denní shrnutí", "Denní srovnání", "Dnes se {metric} pohybovala mezi {min} a {max}, průměr činil {average}.", "Denní průměr je o {difference} vyšší než předchozí den.", "Denní průměr je o {difference} nižší než předchozí den.", "Denní průměr je téměř stejný jako předchozí den.", "Údaje z předchozího dne nejsou k dispozici. {metric} se měří každou hodinu.", "Rosný bod", "Poryv větru", "Východ slunce v {sunrise}, západ v {sunset}.", "Den trvá přibližně {hours} hodin.", "Vybrat den předpovědi"],
  hu: ["Hőmérséklet", "Napi összefoglaló", "Napi összehasonlítás", "Ma a(z) {metric} {min} és {max} között alakult, az átlag {average}.", "A napi átlag {difference} értékkel magasabb az előző napinál.", "A napi átlag {difference} értékkel alacsonyabb az előző napinál.", "A napi átlag szinte változatlan az előző naphoz képest.", "Az összehasonlításhoz nincs előző napi adat. A(z) {metric} óránkénti mérés.", "Harmatpont", "Széllökés", "Napkelte: {sunrise}; napnyugta: {sunset}.", "A nappal körülbelül {hours} órás.", "Előrejelzési nap kiválasztása"],
  ro: ["Temperatură", "Rezumat zilnic", "Comparație zilnică", "Astăzi, {metric} a variat între {min} și {max}, cu media {average}.", "Media zilei este cu {difference} mai mare decât în ziua precedentă.", "Media zilei este cu {difference} mai mică decât în ziua precedentă.", "Media zilei este aproape neschimbată față de ziua precedentă.", "Nu există date din ziua precedentă pentru comparație. {metric} se măsoară orar.", "Punct de rouă", "Rafală de vânt", "Răsărit la {sunrise}; apus la {sunset}.", "Ziua durează aproximativ {hours} ore.", "Alege ziua prognozei"],
  uk: ["Температура", "Підсумок за день", "Порівняння за день", "Сьогодні {metric} змінюється від {min} до {max}, середнє значення — {average}.", "Середнє за день на {difference} вище, ніж попереднього дня.", "Середнє за день на {difference} нижче, ніж попереднього дня.", "Середнє за день майже не змінилося.", "Немає даних за попередній день для порівняння. {metric} вимірюється щогодини.", "Точка роси", "Порив вітру", "Схід сонця о {sunrise}, захід о {sunset}.", "Світловий день триває близько {hours} год.", "Виберіть день прогнозу"],
  he: ["טמפרטורה", "סיכום יומי", "השוואה יומית", "היום {metric} נעה בין {min} ל-{max}, והממוצע הוא {average}.", "הממוצע היומי גבוה ב-{difference} מהיום הקודם.", "הממוצע היומי נמוך ב-{difference} מהיום הקודם.", "הממוצע היומי כמעט לא השתנה לעומת היום הקודם.", "אין נתונים מהיום הקודם להשוואה. {metric} נמדדת מדי שעה.", "נקודת טל", "משב רוח", "זריחה ב-{sunrise}; שקיעה ב-{sunset}.", "אורך היום הוא כ-{hours} שעות.", "בחירת יום תחזית"],
};
const DETAIL_TRANSLATION_KEYS = [
  "detailTemperature", "dailySummary", "dailyComparison", "detailSummaryRange",
  "detailCompareHigher", "detailCompareLower", "detailCompareSame", "detailCompareFirst",
  "detailDewPoint", "detailWindGust", "detailSunSummary", "detailSunComparison",
  "chooseForecastDay",
];
for (const language of LANGUAGES) {
  const values = DETAIL_TRANSLATIONS[language.code];
  if (values) Object.assign(
    translations[language.code],
    Object.fromEntries(DETAIL_TRANSLATION_KEYS.map((key, index) => [key, values[index]])),
  );
}
const NOW_LABELS = {
  vi: "Bây giờ", en: "Now", "zh-TW": "現在", ja: "現在", ko: "현재",
  "zh-CN": "现在", es: "Ahora", fr: "Maintenant", de: "Jetzt", pt: "Agora",
  ru: "Сейчас", it: "Adesso", ar: "الآن", hi: "अभी", th: "ตอนนี้",
  id: "Sekarang", ms: "Sekarang", tr: "Şimdi", nl: "Nu", pl: "Teraz",
  sv: "Nu", no: "Nå", da: "Nu", fi: "Nyt", el: "Τώρα",
  cs: "Nyní", hu: "Most", ro: "Acum", uk: "Зараз", he: "עכשיו",
};
for (const [language, label] of Object.entries(NOW_LABELS)) {
  translations[language].now = label;
}

const SAVED_LANGUAGE = localStorage.getItem("selected_lang");
let currentLanguage = languageByCode.has(SAVED_LANGUAGE)
  ? SAVED_LANGUAGE
  : SAVED_LANGUAGE === "zh"
    ? "zh-TW"
    : "vi";

function t(key, values = {}) {
  const alias = TRANSLATION_ALIASES[key];
  const template =
    translations[currentLanguage]?.[key] ??
    (alias ? translations[currentLanguage]?.[alias] ?? alias : undefined) ??
    translations[FALLBACK_LANGUAGE]?.[key] ??
    key;
  return template.replace(/\{(\w+)\}/g, (_, name) => String(values[name] ?? ""));
}

function formatNumber(value, options = {}) {
  return new Intl.NumberFormat(
    languageByCode.get(currentLanguage)?.locale ?? "en-US",
    options,
  ).format(value);
}

function applyTranslations() {
  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = ["ar", "he"].includes(currentLanguage) ? "rtl" : "ltr";
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
  const language = languageByCode.get(currentLanguage);
  elements.languageCurrent.textContent = `${language.flag} ${language.name}`;
  elements.languageOptions.querySelectorAll(".language-option").forEach((option) => {
    option.setAttribute("aria-selected", String(option.dataset.language === currentLanguage));
  });
  elements.languageFilter.placeholder = t("searchCity");
  elements.sidebarToggle.setAttribute("aria-label", t("myLocations"));
  elements.topbarSidebarToggle.setAttribute("aria-label", t("myLocations"));
  updateAddLocationButton();
}

function changeLanguage(language) {
  if (!languageByCode.has(language)) return;
  currentLanguage = language;
  localStorage.setItem("selected_lang", language);
  applyTranslations();
  elements.languageMenu.hidden = true;
  elements.languageTrigger.setAttribute("aria-expanded", "false");
  if (weatherContext) renderWeather(weatherContext.place, weatherContext.data);
  if (radarFrames.length) setRadarFrames(radarFrames);
  if (elements.forecastDetailDialog.open && weatherContext) {
    renderForecastDetail(selectedForecastIndex, selectedDetailMetric);
  }
}

function renderLanguageOptions(filter = "") {
  const query = filter.trim().toLocaleLowerCase();
  const fragment = document.createDocumentFragment();
  for (const language of LANGUAGES) {
    if (query && !`${language.name} ${language.code}`.toLocaleLowerCase().includes(query)) {
      continue;
    }
    const option = document.createElement("button");
    option.type = "button";
    option.className = "language-option";
    option.dataset.language = language.code;
    option.setAttribute("role", "option");
    option.setAttribute("aria-selected", String(language.code === currentLanguage));
    option.textContent = `${language.flag} ${language.name} · ${language.code}`;
    option.addEventListener("click", () => changeLanguage(language.code));
    fragment.append(option);
  }
  elements.languageOptions.replaceChildren(fragment);
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
  "zh-TW": COUNTRY_NAMES,
  "zh-CN": { TW: "中国台湾", CN: "中国", JP: "日本", KR: "韩国", US: "美国", GB: "英国", HK: "中国香港", MO: "中国澳门", SG: "新加坡" },
};

const elements = {
  languageTrigger: document.querySelector("#language-trigger"),
  languageCurrent: document.querySelector("#language-current"),
  languageMenu: document.querySelector("#language-menu"),
  languageFilter: document.querySelector("#language-filter"),
  languageOptions: document.querySelector("#language-options"),
  languagePicker: document.querySelector("#language-picker"),
  sidebarToggle: document.querySelector("#sidebar-toggle"),
  topbarSidebarToggle: document.querySelector("#topbar-sidebar-toggle"),
  appShell: document.querySelector("#app-shell"),
  searchForm: document.querySelector("#search-form"),
  searchInput: document.querySelector("#city-search"),
  searchAddButton: document.querySelector("#search-add-button"),
  suggestions: document.querySelector("#suggestions"),
  locationName: document.querySelector("#location-name"),
  locationDetail: document.querySelector("#location-detail"),
  updatedAt: document.querySelector("#updated-at"),
  currentCard: document.querySelector(".hero-weather"),
  currentIcon: document.querySelector("#current-icon"),
  currentTemperature: document.querySelector("#current-temperature"),
  currentCondition: document.querySelector("#current-condition"),
  feelsLike: document.querySelector("#feels-like"),
  feelsNote: document.querySelector("#feels-note"),
  heroHigh: document.querySelector("#hero-high"),
  heroLow: document.querySelector("#hero-low"),
  heroSkyIcon: document.querySelector("#hero-sky-icon"),
  sidebarLocations: document.querySelector("#sidebar-locations"),
  sidebarStatus: document.querySelector("#sidebar-status"),
  hourlyList: document.querySelector("#hourly-list"),
  hourlySummary: document.querySelector("#hourly-summary"),
  humidity: document.querySelector("#humidity"),
  windSpeed: document.querySelector("#wind-speed-number"),
  windNote: document.querySelector("#wind-note"),
  uvIndex: document.querySelector("#uv-index"),
  uvNote: document.querySelector("#uv-note"),
  uvMarker: document.querySelector("#uv-marker"),
  dewPointNote: document.querySelector("#dew-point-note"),
  visibility: document.querySelector("#visibility"),
  visibilityNote: document.querySelector("#visibility-note"),
  precipitation: document.querySelector("#precipitation"),
  precipitationNote: document.querySelector("#precipitation-note"),
  sunriseTime: document.querySelector("#sunrise-time"),
  sunsetTime: document.querySelector("#sunset-time"),
  sunArcDot: document.querySelector("#sun-arc-dot"),
  sunArcProgress: document.querySelector("#sun-arc-progress"),
  compassNeedle: document.querySelector("#compass-needle"),
  compassNorth: document.querySelector("#compass-north"),
  compassEast: document.querySelector("#compass-east"),
  compassSouth: document.querySelector("#compass-south"),
  compassWest: document.querySelector("#compass-west"),
  pressure: document.querySelector("#pressure"),
  pressureGaugeValue: document.querySelector("#pressure-gauge-value"),
  pressureNeedle: document.querySelector("#pressure-needle"),
  radarTemperature: document.querySelector("#radar-temperature"),
  radarPlaceName: document.querySelector("#radar-place-name"),
  forecastList: document.querySelector("#forecast-list"),
  forecastDetailDialog: document.querySelector("#forecast-detail-dialog"),
  forecastDetailTitle: document.querySelector("#forecast-detail-title"),
  forecastDetailDate: document.querySelector("#forecast-detail-date"),
  forecastDetailIcon: document.querySelector("#forecast-detail-icon"),
  forecastDetailDays: document.querySelector("#forecast-detail-days"),
  forecastDetailValue: document.querySelector("#forecast-detail-value"),
  forecastDetailSecondary: document.querySelector("#forecast-detail-secondary"),
  forecastDetailChart: document.querySelector("#forecast-detail-chart"),
  forecastDetailSummary: document.querySelector("#forecast-detail-summary"),
  forecastDetailComparison: document.querySelector("#forecast-detail-comparison"),
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
  return languageByCode.get(currentLanguage)?.locale ?? "en-US";
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
let selectedDetailMetric = "temperature";

function normalizePlace(place) {
  const latitude = parseCoordinate(place?.latitude);
  const longitude = parseCoordinate(place?.longitude);
  if (
    !place ||
    typeof place.name !== "string" ||
    !place.name.trim() ||
    !Number.isFinite(latitude) ||
    latitude < -90 ||
    latitude > 90 ||
    !Number.isFinite(longitude) ||
    longitude < -180 ||
    longitude > 180
  ) {
    return undefined;
  }

  return {
    name: place.name,
    latitude,
    longitude,
    country_code: typeof place.country_code === "string" ? place.country_code : "",
    country: typeof place.country === "string" ? place.country : "",
    admin1: typeof place.admin1 === "string" ? place.admin1 : "",
    admin2: typeof place.admin2 === "string" ? place.admin2 : "",
    timezone: typeof place.timezone === "string" ? place.timezone : "",
    search_name: typeof place.search_name === "string" ? place.search_name : place.name,
  };
}

function parseCoordinate(value) {
  if (typeof value === "number") return value;
  if (typeof value === "string" && value.trim()) return Number(value);
  return Number.NaN;
}

function getPlaceKey(place) {
  return `${place.latitude.toFixed(4)},${place.longitude.toFixed(4)}`;
}

function loadSavedLocations() {
  let saved;
  try {
    saved = localStorage.getItem(SAVED_LOCATIONS_KEY);
  } catch (error) {
    console.error("Could not read saved weather locations from local storage.", error);
    return [];
  }
  if (!saved) return [];

  try {
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) {
      throw new TypeError("Saved weather locations must be an array.");
    }

    const locations = [];
    const seen = new Set();
    let needsMigration = false;
    for (const candidate of parsed) {
      const place = normalizePlace(candidate);
      if (!place) {
        needsMigration = true;
        continue;
      }
      if (seen.has(getPlaceKey(place))) {
        needsMigration = true;
        continue;
      }
      seen.add(getPlaceKey(place));
      locations.push({ place, current: undefined, error: false, loading: false });
    }
    if (needsMigration) {
      try {
        localStorage.setItem(
          SAVED_LOCATIONS_KEY,
          JSON.stringify(locations.map((item) => item.place)),
        );
      } catch (error) {
        console.error("Could not migrate saved weather locations.", error);
      }
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

    let activeWindSpeed = 0;
    function setMode(nextMode, windSpeed = 0) {
      if (mode === nextMode && activeWindSpeed === windSpeed) return;
      mode = nextMode;
      activeWindSpeed = Number.isFinite(windSpeed) ? windSpeed : 0;
      canvas.dataset.weatherMode = mode;
      const isRain = mode.startsWith("rain-") || mode === "storm";
      const isSnow = mode === "snow";
      const isFog = mode.startsWith("fog");
      const isSun = mode === "clear-day";
      const isNight = mode.includes("night");
      const isCloud = mode.includes("cloud") || isFog;
      const rainDensity = mode === "storm" || mode === "rain-heavy"
        ? 1
        : mode === "rain"
          ? 0.7
          : 0.38;
      const count = isRain
        ? Math.min(280, Math.round((width * height) / 4200 * rainDensity))
        : isSnow
          ? Math.min(150, Math.round((width * height) / 8000))
          : isSun
            ? Math.min(120, Math.round((width * height) / 7000))
            : isNight
            ? Math.min(240, Math.round((width * height) / 4500))
              : Math.min(isFog ? 52 : 42, Math.round((width * height) / (isFog ? 18000 : 24000)));
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
          ? 14 + Math.random() * (mode === "storm" || mode === "rain-heavy" ? 30 : 22)
          : isSnow
            ? 2 + Math.random() * 6
            : isFog
              ? 90 + Math.random() * 160
              : isCloud
                ? 70 + Math.random() * 130
                : isSun
            ? 1.3 + Math.random() * 3
                : 1.5 + Math.random() * (isNight ? 3.5 : 3);
        opacities[index] = isRain
          ? 0.24 + Math.random() * (mode === "storm" || mode === "rain-heavy" ? 0.56 : 0.38)
          : isSnow
            ? 0.3 + Math.random() * 0.6
            : isFog
              ? 0.04 + Math.random() * 0.07
              : isCloud
                ? 0.06 + Math.random() * 0.08
                : isSun
            ? 0.25 + Math.random() * 0.65
                  : 0.4 + Math.random() * 0.6;
        velocities[index * 2] = isRain
          ? -(12 + activeWindSpeed * 1.2 + Math.random() * 26)
          : isSnow
            ? (Math.random() - 0.5) * 18
            : isCloud
              ? 3 + Math.random() * (isFog ? 11 : 8)
              : (Math.random() - 0.5) * (isNight ? 0.15 : 2);
        velocities[index * 2 + 1] = isRain
          ? -(150 + rainDensity * 140 + Math.random() * (mode === "storm" ? 320 : 220))
          : isSnow
            ? -(12 + Math.random() * 28)
            : isFog
              ? (Math.random() - 0.5) * 2
              : isSun
            ? 2 + Math.random() * 8
                  : (Math.random() - 0.5) * (isNight ? 0.12 : 3);
      }

      particles.geometry.dispose();
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
      geometry.setAttribute("aOpacity", new THREE.BufferAttribute(opacities, 1));
      particles.geometry = geometry;
      particles.material.uniforms.uMode.value = isSun || isNight ? 0 : isRain ? 1 : 2;
      particles.material.uniforms.uColor.value.set(
        isSun
          ? "#ffe5b1"
          : isNight
            ? "#dce9ff"
            : isSnow
              ? "#eaf7ff"
              : isFog
                ? "#d7e1eb"
                : isRain
                  ? "#b9d4f5"
                  : "#aebcdb",
      );

      sprites.forEach((sprite, index) => {
        const isFlare = isSun && index < 2;
        const isMist = (isCloud || isRain) && index >= 2;
        sprite.visible = isFlare || isMist;
        sprite.material.opacity = isFlare
          ? 0.12 + index * 0.025
          : isFog
            ? 0.34
            : isMist
              ? isRain ? 0.23 : 0.36
              : 0;
        sprite.material.color.set(
          isFlare ? "#f2d5a5" : isFog ? "#d7e1eb" : "#a9b8d5",
        );
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
      particles.userData.baseOpacities = opacities;
      if (mode === "storm") {
        document.body.style.setProperty("--storm-flash-delay", `${-Math.random() * 8}s`);
      } else if (mode === "clear-night") {
        document.body.style.setProperty("--meteor-delay", `${-Math.random() * 12}s`);
      }
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
          if (mode.startsWith("rain-") || mode === "storm") {
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
      if (mode === "clear-day") {
        sprites.slice(0, 2).forEach((sprite, index) => {
          sprite.material.opacity = 0.1 + (Math.sin(time * 0.35 + index) + 1) * 0.035;
        });
      } else if (mode?.includes("cloud") || mode?.startsWith("fog")) {
        sprites.slice(2).forEach((sprite, index) => {
          sprite.position.x += Math.sin(time * 0.08 + index) * 0.08;
        });
      }
      if (mode?.includes("night")) {
        const opacity = particles.geometry.attributes.aOpacity;
        const baseOpacities = particles.userData.baseOpacities;
        if (opacity && baseOpacities) {
          for (let index = 0; index < opacity.count; index += 1) {
            opacity.array[index] = baseOpacities[index] *
              (0.52 + (Math.sin(time * 1.7 + index * 13.17) + 1) * 0.24);
          }
          opacity.needsUpdate = true;
        }
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

function setWeatherBackground(weatherCode, isDay, windSpeed = 0) {
  const night = isDay !== 1;
  let mode;
  if (weatherCode >= 95 && weatherCode <= 99) {
    mode = "storm";
  } else if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) {
    mode = "snow";
  } else if (weatherCode === 45 || weatherCode === 48) {
    mode = night ? "fog-night" : "fog-day";
  } else if (weatherCode >= 51 && weatherCode <= 67 || weatherCode >= 80 && weatherCode <= 82) {
    mode = [51, 56, 61, 66, 80].includes(weatherCode)
      ? "rain-light"
      : [55, 57, 65, 67, 81].includes(weatherCode)
        ? "rain"
        : "rain-heavy";
  } else if (weatherCode === 2 || weatherCode === 3) {
    mode = night ? "clouds-night" : "clouds-day";
  } else if (weatherCode === 0 || weatherCode === 1) {
    mode = night ? "clear-night" : "clear-day";
  } else {
    mode = night ? "clouds-night" : "clouds-day";
  }
  document.body.dataset.weather = mode;
  if (weatherBackground) weatherBackground.setMode(mode, windSpeed);
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
  return t("sunProtection");
}

function getWindDescription(speed) {
  const descriptions = WIND_LABELS[currentLanguage] ?? WIND_LABELS.en;
  return descriptions[speed < 1 ? 0 : speed < 12 ? 1 : speed < 30 ? 2 : 3];
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
    LOCALIZED_COUNTRY_NAMES[currentLanguage]?.[place.country_code] ??
    LOCALIZED_COUNTRY_NAMES[languageByCode.get(currentLanguage)?.apiLanguage]?.[place.country_code] ??
    place.country;
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
    const body = await response.text();
    let detail = body.trim();
    if (detail) {
      try {
        const parsed = JSON.parse(detail);
        detail =
          (typeof parsed.reason === "string" && parsed.reason) ||
          (typeof parsed.message === "string" && parsed.message) ||
          (typeof parsed.error === "string" && parsed.error) ||
          detail;
      } catch {
        // Keep the response body as-is when the service did not return JSON.
      }
    }
    const statusText = response.statusText ? ` ${response.statusText}` : "";
    throw new Error(
      `${serviceName}: HTTP ${response.status}${statusText}${detail ? ` — ${detail}` : ""}`,
    );
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
    language: (languageByCode.get(currentLanguage)?.apiLanguage ?? "en")
      .split("-")[0]
      .toLowerCase(),
    format: "json",
  });
  const data = await fetchJson(url, signal, "城市搜尋服務");
  return (data.results ?? []).map((place) => ({ ...place, search_name: searchName }));
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

const DETAIL_METRICS = {
  temperature: { title: "detailTemperature", icon: "🌡️", field: "temperature_2m", unit: "°", color: "#FBBF24" },
  feels: { title: "feelsLike", icon: "🌡️", field: "apparent_temperature", unit: "°", color: "#FBBF24" },
  uv: { title: "uvIndex", icon: "☼", field: "uv_index", unit: "", color: "uv" },
  wind: { title: "windSpeed", icon: "➤", field: "wind_speed_10m", unit: " km/h", color: "#38BDF8" },
  humidity: { title: "humidity", icon: "◉", field: "relative_humidity_2m", unit: "%", color: "#38BDF8" },
  visibility: { title: "visibility", icon: "◌", field: "visibility", unit: " km", color: "#38BDF8" },
  precipitation: { title: "precipitation", icon: "💧", field: "precipitation", unit: " mm", color: "#38BDF8" },
  pressure: { title: "pressure", icon: "◉", field: "surface_pressure", unit: " hPa", color: "#A78BFA" },
  sun: { title: "sunriseSunset", icon: "☀", field: "sun_position", unit: "%", color: "#FBBF24" },
};

function getDetailMetricValue(metricKey, hour, sunrise, sunset) {
  const field = DETAIL_METRICS[metricKey].field;
  if (metricKey === "visibility") return Number.isFinite(hour.visibility) ? hour.visibility / 1000 : undefined;
  if (metricKey !== "sun") return Number.isFinite(hour[field]) ? hour[field] : undefined;
  if (!sunrise || !sunset) return undefined;
  const minutes = Number(hour.time.slice(11, 13)) * 60 + Number(hour.time.slice(14, 16));
  const sunriseMinutes = Number(sunrise.slice(11, 13)) * 60 + Number(sunrise.slice(14, 16));
  const sunsetMinutes = Number(sunset.slice(11, 13)) * 60 + Number(sunset.slice(14, 16));
  if (minutes < sunriseMinutes || minutes > sunsetMinutes || sunsetMinutes <= sunriseMinutes) return 0;
  return Math.sin(Math.PI * (minutes - sunriseMinutes) / (sunsetMinutes - sunriseMinutes)) * 100;
}

function formatDetailValue(value, metric, digits = 0) {
  if (!Number.isFinite(value)) return "—";
  return `${formatNumber(value, { maximumFractionDigits: digits, minimumFractionDigits: digits })}${metric.unit}`;
}

function createDetailChart(hourly, metricKey, sunrise, sunset, currentTime, timeZone) {
  const namespace = "http://www.w3.org/2000/svg";
  const metric = DETAIL_METRICS[metricKey];
  const width = 520;
  const left = 42;
  const right = 470;
  const top = 56;
  const bottom = 199;
  const values = hourly.map((hour) => getDetailMetricValue(metricKey, hour, sunrise, sunset));
  const validValues = values.filter(Number.isFinite);
  if (!validValues.length) {
    const empty = document.createElement("p");
    empty.className = "forecast-detail-empty";
    empty.textContent = t("forecastNoHourlyData");
    return empty;
  }
  const minValue = Math.min(...validValues);
  const maxValue = Math.max(...validValues);
  const padding = Math.max((maxValue - minValue) * 0.14, metricKey === "precipitation" ? 0.25 : 1);
  const lower = metricKey === "uv" || metricKey === "precipitation" || metricKey === "sun"
    ? 0
    : minValue - padding;
  const upper = maxValue + padding || 1;
  const range = Math.max(1, upper - lower);
  const pointFor = (value, index) => ({
    x: left + (index / Math.max(1, values.length - 1)) * (right - left),
    y: bottom - ((value - lower) / range) * (bottom - top),
    value,
  });
  const points = values.flatMap((value, index) =>
    Number.isFinite(value) ? [pointFor(value, index)] : [],
  );
  const svg = document.createElementNS(namespace, "svg");
  svg.classList.add("detail-chart");
  svg.setAttribute("viewBox", `0 0 ${width} 255`);
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", t("forecastHourlyChartLabel", { metric: t(metric.title) }));
  const defs = document.createElementNS(namespace, "defs");
  const gradient = document.createElementNS(namespace, "linearGradient");
  gradient.id = "detail-chart-gradient";
  gradient.setAttribute("x1", "0");
  gradient.setAttribute("x2", "0");
  gradient.setAttribute("y1", "0");
  gradient.setAttribute("y2", "1");
  const stops = metric.color === "uv"
    ? [[0, "#A78BFA"], [0.35, "#F472B6"], [0.68, "#FBBF24"], [1, "#38BDF8"]]
    : [[0, metric.color], [1, metric.color]];
  for (const [offset, color] of stops) {
    const stop = document.createElementNS(namespace, "stop");
    stop.setAttribute("offset", `${offset * 100}%`);
    stop.setAttribute("stop-color", color);
    stop.setAttribute("stop-opacity", offset === 0 ? "0.45" : "0.04");
    gradient.append(stop);
  }
  defs.append(gradient);
  svg.append(defs);

  for (let row = 0; row <= 4; row += 1) {
    const y = top + (row / 4) * (bottom - top);
    const grid = document.createElementNS(namespace, "line");
    grid.setAttribute("x1", String(left));
    grid.setAttribute("x2", String(right));
    grid.setAttribute("y1", String(y));
    grid.setAttribute("y2", String(y));
    grid.classList.add("detail-chart-grid");
    svg.append(grid);
    const label = document.createElementNS(namespace, "text");
    label.setAttribute("x", "480");
    label.setAttribute("y", String(y + 4));
    label.classList.add("detail-chart-axis-label");
    const axisValue = upper - (row / 4) * (upper - lower);
    label.textContent = formatNumber(Math.abs(axisValue) < 0.5 ? 0 : axisValue, {
      maximumFractionDigits: 0,
    });
    svg.append(label);
  }
  for (const hourIndex of [0, 6, 12, 18, 23]) {
    const x = left + (hourIndex / Math.max(1, values.length - 1)) * (right - left);
    const grid = document.createElementNS(namespace, "line");
    grid.setAttribute("x1", String(x));
    grid.setAttribute("x2", String(x));
    grid.setAttribute("y1", String(top));
    grid.setAttribute("y2", String(bottom));
    grid.classList.add("detail-chart-grid", "detail-chart-grid-vertical");
    svg.append(grid);
    if (hourIndex === 23) continue;
    const label = document.createElementNS(namespace, "text");
    label.setAttribute("x", String(x));
    label.setAttribute("y", "239");
    label.setAttribute("text-anchor", hourIndex === 0 ? "start" : "middle");
    label.classList.add("detail-chart-time");
    const date = new Date(Date.UTC(2026, 0, 1, hourIndex));
    label.textContent = new Intl.DateTimeFormat(getLocale(), {
      hour: "numeric",
      timeZone: "UTC",
    }).format(date);
    svg.append(label);
  }

  const pathData = points.reduce((path, point, index) => {
    if (index === 0) return `M ${point.x} ${point.y}`;
    const previous = points[index - 1];
    const middle = (previous.x + point.x) / 2;
    return `${path} C ${middle} ${previous.y}, ${middle} ${point.y}, ${point.x} ${point.y}`;
  }, "");
  const area = document.createElementNS(namespace, "path");
  area.setAttribute(
    "d",
    `${pathData} L ${points.at(-1).x} ${bottom} L ${points[0].x} ${bottom} Z`,
  );
  area.setAttribute("fill", "url(#detail-chart-gradient)");
  svg.append(area);
  const line = document.createElementNS(namespace, "path");
  line.setAttribute("d", pathData);
  line.setAttribute("class", "detail-chart-line");
  line.style.stroke = metric.color === "uv" ? "url(#detail-chart-spectrum)" : metric.color;
  if (metric.color === "uv") {
    const spectrum = document.createElementNS(namespace, "linearGradient");
    spectrum.id = "detail-chart-spectrum";
    for (const [offset, color] of [[0, "#38BDF8"], [0.34, "#FBBF24"], [0.67, "#F472B6"], [1, "#A78BFA"]]) {
      const stop = document.createElementNS(namespace, "stop");
      stop.setAttribute("offset", `${offset * 100}%`);
      stop.setAttribute("stop-color", color);
      spectrum.append(stop);
    }
    defs.append(spectrum);
  }
  svg.append(line);

  for (let hourIndex = 0; hourIndex < hourly.length; hourIndex += 2) {
    const x = left + (hourIndex / Math.max(1, values.length - 1)) * (right - left);
    const icon = document.createElementNS(namespace, metricKey === "uv" ? "circle" : "text");
    if (metricKey === "uv") {
      icon.setAttribute("cx", String(x));
      icon.setAttribute("cy", "30");
      icon.setAttribute("r", "3.5");
      icon.setAttribute("fill", metric.color);
    } else {
      icon.setAttribute("x", String(x));
      icon.setAttribute("y", "34");
      icon.setAttribute("text-anchor", "middle");
      icon.classList.add("detail-chart-icon");
      if (metricKey === "wind") {
        icon.textContent = "➤";
        const direction = hourly[hourIndex].wind_direction_10m;
        if (Number.isFinite(direction)) {
          icon.setAttribute("transform", `rotate(${direction - 90} ${x} 30)`);
        }
      } else {
        icon.textContent = metricKey === "precipitation" ? "●" : getWeatherDescription(hourly[hourIndex].weather_code).icon;
      }
    }
    svg.append(icon);
  }

  const nowIndex = currentTime
    ? hourly.findIndex((hour) => hour.time.slice(0, 13) === currentTime.slice(0, 13))
    : -1;
  if (nowIndex >= 0 && Number.isFinite(values[nowIndex])) {
    const point = pointFor(values[nowIndex], nowIndex);
    const marker = document.createElementNS(namespace, "circle");
    marker.setAttribute("cx", String(point.x));
    marker.setAttribute("cy", String(point.y));
    marker.setAttribute("r", "5");
    marker.classList.add("detail-chart-current");
    svg.append(marker);
  }
  return svg;
}

function renderDetailDayStrip(daily) {
  const fragment = document.createDocumentFragment();
  for (let index = 0; index < daily.time.length; index += 1) {
    const button = document.createElement("button");
    const weekday = document.createElement("span");
    const day = document.createElement("span");
    const date = new Date(`${daily.time[index]}T12:00:00Z`);
    button.type = "button";
    button.className = "detail-day";
    button.setAttribute("aria-pressed", String(index === selectedForecastIndex));
    button.setAttribute("aria-label", new Intl.DateTimeFormat(getLocale(), {
      weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
    }).format(date));
    weekday.textContent = new Intl.DateTimeFormat(getLocale(), {
      weekday: "short", timeZone: "UTC",
    }).format(date);
    day.textContent = formatNumber(date.getUTCDate());
    weekday.className = "detail-day-weekday";
    day.className = "detail-day-number";
    button.append(weekday, day);
    button.addEventListener("click", () => renderForecastDetail(index));
    fragment.append(button);
  }
  elements.forecastDetailDays.replaceChildren(fragment);
  elements.forecastDetailDays.setAttribute("aria-label", t("chooseForecastDay"));
  elements.forecastDetailDays.querySelector('[aria-pressed="true"]')?.scrollIntoView({
    block: "nearest",
    inline: "center",
  });
}

function renderForecastDetail(index, metricKey = selectedDetailMetric) {
  if (!weatherContext || !DETAIL_METRICS[metricKey]) return;
  const { daily, data, current, place } = weatherContext;
  const date = daily.time[index];
  if (!date) return;
  selectedForecastIndex = index;
  selectedDetailMetric = metricKey;
  const metric = DETAIL_METRICS[metricKey];
  const timeZone = data.timezone || place.timezone || "UTC";
  const hourly = data.hourly.time.flatMap((time, hourIndex) =>
    time.startsWith(date)
      ? [{
          time,
          temperature_2m: data.hourly.temperature_2m?.[hourIndex],
          apparent_temperature: data.hourly.apparent_temperature?.[hourIndex],
          relative_humidity_2m: data.hourly.relative_humidity_2m?.[hourIndex],
          dew_point_2m: data.hourly.dew_point_2m?.[hourIndex],
          precipitation: data.hourly.precipitation?.[hourIndex],
          precipitation_probability: data.hourly.precipitation_probability?.[hourIndex],
          surface_pressure: data.hourly.surface_pressure?.[hourIndex],
          visibility: data.hourly.visibility?.[hourIndex],
          wind_speed_10m: data.hourly.wind_speed_10m?.[hourIndex],
          wind_direction_10m: data.hourly.wind_direction_10m?.[hourIndex],
          wind_gusts_10m: data.hourly.wind_gusts_10m?.[hourIndex],
          uv_index: data.hourly.uv_index?.[hourIndex],
          weather_code: data.hourly.weather_code?.[hourIndex],
        }]
      : [],
  );
  const sunrise = daily.sunrise?.[index];
  const sunset = daily.sunset?.[index];
  const values = hourly.map((hour) => getDetailMetricValue(metricKey, hour, sunrise, sunset))
    .filter(Number.isFinite);
  if (!values.length) return;
  const average = values.reduce((sum, value) => sum + value, 0) / values.length;
  const minimum = Math.min(...values);
  const maximum = Math.max(...values);
  const digits = metricKey === "precipitation" || metricKey === "visibility" ? 1 : 0;
  const format = (value) => formatDetailValue(value, metric, digits);
  const dateObject = new Date(`${date}T12:00:00Z`);
  const clockFormatter = new Intl.DateTimeFormat(getLocale(), {
    hour: "numeric", minute: "2-digit", timeZone: "UTC",
  });
  const formatClock = (time) => {
    if (!time) return "—";
    const [hour, minute] = time.slice(11, 16).split(":").map(Number);
    return clockFormatter.format(new Date(Date.UTC(2026, 0, 1, hour, minute)));
  };
  const currentValue = index === 0
    ? getDetailMetricValue(metricKey, {
        ...current,
        time: current.time,
        visibility: current.visibility,
      }, sunrise, sunset)
    : undefined;
  const mainValue = metricKey === "sun"
    ? `${formatClock(sunrise)} · ${formatClock(sunset)}`
    : format(Number.isFinite(currentValue) ? currentValue : average);
  let secondary = t("detailSummaryRange", {
    metric: t(metric.title),
    min: format(minimum),
    max: format(maximum),
    average: format(average),
  });
  if (metricKey === "humidity") {
    const dewValues = hourly.map((hour) => hour.dew_point_2m).filter(Number.isFinite);
    if (dewValues.length) {
      const dewPoint = dewValues.reduce((sum, value) => sum + value, 0) / dewValues.length;
      secondary = `${t("detailDewPoint")}: ${formatDetailValue(dewPoint, { unit: "°" })}`;
    }
  } else if (metricKey === "wind") {
    const gust = Math.max(...hourly.map((hour) => hour.wind_gusts_10m).filter(Number.isFinite));
    if (Number.isFinite(gust)) {
      secondary = `${t("detailWindGust")}: ${formatDetailValue(gust, { unit: " km/h" })} · ${t("detailSummaryRange", {
        metric: t(metric.title), min: format(minimum), max: format(maximum), average: format(average),
      })}`;
    }
  } else if (metricKey === "sun") {
    secondary = t("detailSunSummary", {
      sunrise: formatClock(sunrise),
      sunset: formatClock(sunset),
    });
  }

  elements.forecastDetailTitle.textContent = t(metric.title);
  elements.forecastDetailIcon.textContent = metric.icon;
  elements.forecastDetailDate.textContent = new Intl.DateTimeFormat(getLocale(), {
    weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
  }).format(dateObject);
  elements.forecastDetailValue.textContent = mainValue;
  elements.forecastDetailSecondary.textContent = secondary;
  elements.forecastDetailSummary.textContent = metricKey === "sun"
    ? t("detailSunSummary", { sunrise: formatClock(sunrise), sunset: formatClock(sunset) })
    : t("detailSummaryRange", {
        metric: t(metric.title), min: format(minimum), max: format(maximum), average: format(average),
      });

  if (index > 0) {
    const previousDate = daily.time[index - 1];
    const previousValues = data.hourly.time.flatMap((time, hourIndex) => {
      if (!time.startsWith(previousDate)) return [];
      const previousHour = {
        time,
        ...Object.fromEntries(Object.keys(data.hourly).filter((key) => key !== "time")
          .map((key) => [key, data.hourly[key]?.[hourIndex]])),
      };
      return [getDetailMetricValue(
        metricKey,
        previousHour,
        daily.sunrise?.[index - 1],
        daily.sunset?.[index - 1],
      )].filter(Number.isFinite);
    });
    const previousAverage = previousValues.length
      ? previousValues.reduce((sum, value) => sum + value, 0) / previousValues.length
      : average;
    const difference = average - previousAverage;
    const text = Math.abs(difference) < (metricKey === "precipitation" ? 0.1 : 0.5)
      ? t("detailCompareSame")
      : t(difference > 0 ? "detailCompareHigher" : "detailCompareLower", {
          difference: formatDetailValue(Math.abs(difference), metric, digits),
        });
    elements.forecastDetailComparison.textContent = metricKey === "sun"
      ? t("detailSunComparison", {
          hours: formatNumber((sunset && sunrise)
            ? (Number(sunset.slice(11, 13)) * 60 + Number(sunset.slice(14, 16)) -
              Number(sunrise.slice(11, 13)) * 60 - Number(sunrise.slice(14, 16))) / 60
            : 0, { maximumFractionDigits: 1 }),
        })
      : text;
  } else {
    elements.forecastDetailComparison.textContent = t("detailCompareFirst", {
      metric: t(metric.title),
    });
  }
  elements.forecastDetailChart.replaceChildren(
    createDetailChart(hourly, metricKey, sunrise, sunset, current.time, timeZone),
  );
  renderDetailDayStrip(daily);
  elements.forecastDetailPrevious.disabled = index === 0;
  elements.forecastDetailNext.disabled = index === daily.time.length - 1;
}

function openForecastDetail(index, metricKey = "temperature") {
  if (!weatherContext) return;
  renderForecastDetail(index, metricKey);
  if (!elements.forecastDetailDialog.open) elements.forecastDetailDialog.showModal();
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
    const day = document.createElement("span");
    const icon = document.createElement("span");
    const low = document.createElement("span");
    const track = document.createElement("span");
    const range = document.createElement("span");
    const currentMarker = document.createElement("span");
    const high = document.createElement("span");
    const rain = document.createElement("span");
    const condition = getWeatherDescription(daily.weather_code[index]);
    const date = new Date(`${daily.time[index]}T00:00:00Z`);

    card.className = "forecast-row";
    card.type = "button";
    const formattedDay =
      index === 0
        ? t("today")
        : new Intl.DateTimeFormat(currentLanguage, { weekday: "short", timeZone: "UTC" }).format(date);
    card.setAttribute(
      "aria-label",
      `${formattedDay}, ${condition.text}, ${t("high")} ${Math.round(daily.temperature_2m_max[index])}°, ${t("low")} ${Math.round(daily.temperature_2m_min[index])}°`,
    );
    day.className = "forecast-day";
    day.textContent = formattedDay;
    icon.className = "forecast-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = condition.icon;
    track.className = "temperature-track";
    range.className = "temperature-range";
    currentMarker.className = "temperature-current-dot";
    high.className = "forecast-high";
    high.textContent = `${Math.round(daily.temperature_2m_max[index])}°`;
    low.className = "forecast-low";
    low.textContent = `${Math.round(daily.temperature_2m_min[index])}°`;
    const start = ((daily.temperature_2m_min[index] - rangeMin) / totalRange) * 100;
    const end = ((daily.temperature_2m_max[index] - rangeMin) / totalRange) * 100;
    range.style.left = `${start}%`;
    range.style.width = `${Math.max(4, end - start)}%`;
    currentMarker.hidden = index !== 0 || !Number.isFinite(weatherContext?.current?.temperature_2m);
    if (!currentMarker.hidden) {
      currentMarker.style.left = `${Math.max(
        0,
        Math.min(100, ((weatherContext.current.temperature_2m - rangeMin) / totalRange) * 100),
      )}%`;
    }
    rain.className = "forecast-rain";
    const rainProbability = daily.precipitation_probability_max?.[index];
    rain.textContent =
      Number.isFinite(rainProbability) && rainProbability > 0
        ? `${Math.round(rainProbability)}%`
        : "";
    track.setAttribute("aria-hidden", "true");
    track.append(range, currentMarker);
    card.append(day, icon, rain, low, track, high);
    card.addEventListener("click", () => {
      openForecastDetail(index, "temperature");
    });
    fragment.append(card);
  }

  elements.forecastList.replaceChildren(fragment);
}

function renderHourlyForecast(hourly, currentTime, utcOffsetSeconds, daily) {
  const offsetMilliseconds = (Number(utcOffsetSeconds) || 0) * 1000;
  const toTimestamp = (localTime) => Date.parse(`${localTime}:00Z`) - offsetMilliseconds;
  const currentTimestamp = toTimestamp(currentTime.slice(0, 13));
  const startIndex = hourly.time.findIndex(
    (time) => toTimestamp(time) === currentTimestamp,
  );
  const safeStartIndex = startIndex < 0
    ? hourly.time.findIndex((time) => time.slice(0, 13) >= currentTime.slice(0, 13))
    : startIndex;
  if (safeStartIndex < 0) {
    elements.hourlyList.replaceChildren();
    elements.hourlySummary.textContent = t("forecastNoHourlyData");
    return;
  }
  const endIndex = Math.min(safeStartIndex + 24, hourly.time.length);
  const fragment = document.createDocumentFragment();
  const timeFormatter = new Intl.DateTimeFormat(getLocale(), {
    hour: "numeric",
    timeZone: "UTC",
  });
  const solarTimeFormatter = new Intl.DateTimeFormat(getLocale(), {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
  });
  let expectedRainTime;
  const timeline = [];

  for (let index = safeStartIndex; index < endIndex; index += 1) {
    timeline.push({ time: hourly.time[index], index, type: "hour" });
  }
  const visibleStart = hourly.time[safeStartIndex];
  const visibleEnd = hourly.time[endIndex - 1];
  for (const [dayIndex, date] of (daily?.time ?? []).entries()) {
    for (const [type, field] of [["sunrise", "sunrise"], ["sunset", "sunset"]]) {
      const eventTime = daily[field]?.[dayIndex];
      if (
        eventTime &&
        eventTime >= currentTime.slice(0, 16) &&
        eventTime >= visibleStart &&
        eventTime <= `${visibleEnd.slice(0, 13)}:59`
      ) {
        timeline.push({ time: eventTime.slice(0, 16), type });
      }
    }
  }
  timeline.sort((first, second) => first.time.localeCompare(second.time));

  for (const entry of timeline) {
    if (entry.type !== "hour") {
      const event = document.createElement("article");
      const icon = document.createElement("span");
      const label = document.createElement("p");
      const time = document.createElement("p");
      const localTime = new Date(`${entry.time}:00Z`);
      event.className = `hourly-event hourly-event-${entry.type}`;
      icon.className = "hourly-event-icon";
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = entry.type === "sunrise" ? "🌅" : "🌇";
      label.className = "hourly-event-label";
      label.textContent = t(entry.type);
      time.className = "hourly-event-time";
      time.textContent = solarTimeFormatter.format(localTime);
      event.setAttribute(
        "aria-label",
        `${label.textContent} ${time.textContent}`,
      );
      event.append(icon, label, time);
      fragment.append(event);
      continue;
    }
    const item = document.createElement("article");
    const hour = document.createElement("p");
    const icon = document.createElement("span");
    const temperature = document.createElement("p");
    const rain = document.createElement("p");
    const forecastTime = new Date(`${hourly.time[entry.index]}:00Z`);
    const probability = hourly.precipitation_probability?.[entry.index];
    const condition = getWeatherDescription(hourly.weather_code[entry.index]);
    const localDate = hourly.time[entry.index].slice(0, 10);
    const solarDayIndex = daily?.time?.indexOf(localDate) ?? -1;
    if (
      Number(hourly.weather_code[entry.index]) <= 1 &&
      solarDayIndex >= 0 &&
      (hourly.time[entry.index] < daily.sunrise?.[solarDayIndex] ||
        hourly.time[entry.index] >= daily.sunset?.[solarDayIndex])
    ) {
      condition.icon = "🌙";
    }

    item.className = "hourly-item";
    hour.className = "hourly-time";
    hour.textContent = entry.index === safeStartIndex ? t("now") : timeFormatter.format(forecastTime);
    icon.className = "hourly-icon";
    icon.setAttribute("aria-label", condition.text);
    icon.textContent = condition.icon;
    temperature.className = "hourly-temperature";
    temperature.textContent = `${Math.round(hourly.temperature_2m[entry.index])}°`;
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
  elements.radarPlaceName.textContent = getLocationName(place);
  elements.radarTemperature.textContent = `${Math.round(current.temperature_2m)}°`;
  renderSidebarLocations();
  elements.updatedAt.textContent = t("updatedAt", {
    time: clockFormatter.format(currentTime),
  });
  elements.currentIcon.textContent = condition.icon;
  elements.currentIcon.setAttribute("aria-label", condition.text);
  elements.currentTemperature.textContent = Math.round(current.temperature_2m);
  elements.currentCondition.textContent = condition.text;
  elements.heroSkyIcon.textContent = condition.icon;
  elements.heroHigh.textContent = `${Math.round(data.daily.temperature_2m_max[0])}°`;
  elements.heroLow.textContent = `${Math.round(data.daily.temperature_2m_min[0])}°`;
  elements.feelsLike.firstChild.textContent = Math.round(current.apparent_temperature);
  const apparentDifference = current.apparent_temperature - current.temperature_2m;
  elements.feelsNote.textContent =
    Math.abs(apparentDifference) < 1
      ? t("feelsLike")
      : apparentDifference > 0
        ? t("feelsWarmer")
        : t("feelsColder");
  elements.humidity.firstChild.textContent = Math.round(current.relative_humidity_2m);
  elements.dewPointNote.textContent = `${t("dewPointLabel")} ${Math.round(current.dew_point_2m)}°`;
  elements.visibility.firstChild.textContent = (current.visibility / 1000).toFixed(1);
  elements.visibilityNote.textContent = current.visibility >= 10000
    ? t("visibilityClear")
    : t("visibility");
  elements.windSpeed.textContent = Math.round(current.wind_speed_10m);
  elements.windNote.textContent = getWindDescription(current.wind_speed_10m);
  elements.compassNeedle.style.transform =
    `translate(-50%, -70%) rotate(${current.wind_direction_10m - 90}deg)`;
  elements.compassNorth.textContent = t("compassNorth");
  elements.compassEast.textContent = t("compassEast");
  elements.compassSouth.textContent = t("compassSouth");
  elements.compassWest.textContent = t("compassWest");
  elements.uvIndex.textContent = Number.isFinite(uv) ? uv.toFixed(1) : "--";
  elements.uvNote.textContent = Number.isFinite(uv)
    ? getUvDescription(uv)
    : t("sunProtection");
  elements.uvMarker.style.left = `${Math.max(0, Math.min(100, (uv / 11) * 100))}%`;
  elements.precipitation.firstChild.textContent = Number(current.precipitation ?? 0).toFixed(1);
  const next24Hours = data.hourly.precipitation
    .slice(0, 24)
    .reduce((total, amount) => total + (Number.isFinite(amount) ? amount : 0), 0);
  elements.precipitationNote.textContent = `${t("rain24Hours")} ${next24Hours.toFixed(1)} mm`;
  elements.pressure.firstChild.textContent = Math.round(current.surface_pressure);
  const pressureProgress = Math.max(0, Math.min(1, (current.surface_pressure - 960) / 80));
  elements.pressureGaugeValue.style.strokeDashoffset = String(151 * (1 - pressureProgress));
  elements.pressureNeedle.style.transform = `rotate(${-90 + pressureProgress * 180}deg)`;
  const sunrise = data.daily.sunrise?.[0];
  const sunset = data.daily.sunset?.[0];
  elements.sunriseTime.textContent = sunrise?.slice(11, 16) ?? "--:--";
  elements.sunsetTime.textContent = sunset?.slice(11, 16) ?? "--:--";
  const minutesNow = Number(current.time.slice(11, 13)) * 60 + Number(current.time.slice(14, 16));
  const minutesSunrise = sunrise ? Number(sunrise.slice(11, 13)) * 60 + Number(sunrise.slice(14, 16)) : 360;
  const minutesSunset = sunset ? Number(sunset.slice(11, 13)) * 60 + Number(sunset.slice(14, 16)) : 1080;
  const sunProgress = Math.max(0, Math.min(1, (minutesNow - minutesSunrise) / (minutesSunset - minutesSunrise)));
  const sunX = 12 + sunProgress * 276;
  const sunY = 82 - 70 * 4 * sunProgress * (1 - sunProgress);
  elements.sunArcDot.setAttribute("cx", String(sunX));
  elements.sunArcDot.setAttribute("cy", String(sunY));
  elements.sunArcProgress.style.strokeDashoffset = String(500 * (1 - sunProgress));
  elements.currentCard.setAttribute("aria-busy", "false");
  setWeatherBackground(current.weather_code, current.is_day, current.wind_speed_10m);
  renderForecast(data.daily);
  renderHourlyForecast(
    data.hourly,
    current.time,
    data.utc_offset_seconds,
    data.daily,
  );
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

elements.languageTrigger.addEventListener("click", () => {
  const open = elements.languageMenu.hidden;
  elements.languageMenu.hidden = !open;
  elements.languageTrigger.setAttribute("aria-expanded", String(open));
  if (open) {
    renderLanguageOptions();
    elements.languageFilter.focus();
  }
});
elements.languageFilter.addEventListener("input", () => {
  renderLanguageOptions(elements.languageFilter.value);
});
elements.languageFilter.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    elements.languageMenu.hidden = true;
    elements.languageTrigger.setAttribute("aria-expanded", "false");
    elements.languageTrigger.focus();
  }
});

for (const toggle of [elements.sidebarToggle, elements.topbarSidebarToggle]) {
  toggle.addEventListener("click", () => {
    const collapsed = elements.appShell.classList.toggle("sidebar-collapsed");
    for (const button of [elements.sidebarToggle, elements.topbarSidebarToggle]) {
      button.setAttribute("aria-expanded", String(!collapsed));
    }
    localStorage.setItem("weather_sidebar_collapsed", String(collapsed));
    window.setTimeout(() => radarMap?.invalidateSize(), 240);
  });
}

elements.forecastDetailClose.addEventListener("click", () => {
  elements.forecastDetailDialog.close();
});
elements.forecastDetailDialog.addEventListener("click", (event) => {
  if (event.target === elements.forecastDetailDialog) {
    elements.forecastDetailDialog.close();
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && elements.forecastDetailDialog.open) {
    event.preventDefault();
    elements.forecastDetailDialog.close();
  }
});
elements.forecastDetailPrevious.addEventListener("click", () => {
  if (selectedForecastIndex > 0) {
    renderForecastDetail(selectedForecastIndex - 1, selectedDetailMetric);
  }
});
elements.forecastDetailNext.addEventListener("click", () => {
  const lastIndex = (weatherContext?.daily.time.length ?? 0) - 1;
  if (selectedForecastIndex < lastIndex) {
    renderForecastDetail(selectedForecastIndex + 1, selectedDetailMetric);
  }
});
for (const card of document.querySelectorAll("[data-detail-metric]")) {
  const open = () => openForecastDetail(0, card.dataset.detailMetric);
  card.addEventListener("click", open);
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      open();
    }
  });
}

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
      "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m",
    hourly:
      "temperature_2m,apparent_temperature,relative_humidity_2m,dew_point_2m,precipitation,precipitation_probability,surface_pressure,visibility,wind_speed_10m,wind_direction_10m,wind_gusts_10m,uv_index,weather_code",
    daily:
      "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,uv_index_max,sunrise,sunset",
    temperature_unit: "celsius",
    wind_speed_unit: "kmh",
    timezone: "auto",
    forecast_days: "10",
  });

  try {
    const data = await fetchJson(url, weatherController.signal);
    if (currentRequestId !== requestId) return;
    const currentHour = data.hourly?.time?.findIndex(
      (time) => time.slice(0, 13) === data.current?.time?.slice(0, 13),
    ) ?? -1;
    if (currentHour < 0) {
      throw new Error("Open-Meteo hourly data does not include the current hour.");
    }
    const hourlyCurrentFields = [
      "visibility",
      "dew_point_2m",
      "uv_index",
      "precipitation_probability",
      "wind_gusts_10m",
    ];
    const current = { ...data.current };
    for (const field of hourlyCurrentFields) {
      current[field] = data.hourly[field]?.[currentHour];
    }
    renderWeather(place, { ...data, current });
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
  if (!elements.languagePicker.contains(event.target)) {
    elements.languageMenu.hidden = true;
    elements.languageTrigger.setAttribute("aria-expanded", "false");
  }
});

window.addEventListener("pagehide", () => {
  weatherController?.abort();
  radarController?.abort();
});

async function initialize() {
  elements.searchInput.value = "桃園";
  try {
    let initialPlace = sidebarPlaces[0]?.place;
    if (!initialPlace) {
      const places = await searchPlaces(DEFAULT_CITY);
      initialPlace = getPreferredPlace(places);
      if (!initialPlace || initialPlace.country_code !== "TW") {
        throw new Error(t("defaultCityError"));
      }
      try {
        addSavedLocation(initialPlace);
      } catch (error) {
        console.error("Could not save the default weather location.", error);
        elements.sidebarStatus.textContent = t("saveLocationError");
      }
    }
    renderSidebarLocations();
    await loadWeather(initialPlace);
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

renderLanguageOptions();
const sidebarCollapsed = localStorage.getItem("weather_sidebar_collapsed") === "true";
elements.appShell.classList.toggle("sidebar-collapsed", sidebarCollapsed);
for (const button of [elements.sidebarToggle, elements.topbarSidebarToggle]) {
  button.setAttribute("aria-expanded", String(!sidebarCollapsed));
}
applyTranslations();
renderSidebarLocations();
initialize();
