const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";
const RAINVIEWER_URL = "https://api.rainviewer.com/public/weather-maps.json";
const DEFAULT_CITY = "Taoyuan";
const RADAR_WINDOW_SECONDS = 2 * 60 * 60;
const RADAR_FRAME_INTERVAL_MS = 600;
const BASE_MAP_URL =
  "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}";
const RADAR_TILE_URL = "https://tilecache.rainviewer.com";
const SPEECH_LANGUAGES = { vi: "vi-VN", en: "en-US", zh: "zh-CN" };
const translations = {
  vi: {
    metaDescription: "Thời tiết hiện tại, lời khuyên hữu ích và dự báo bảy ngày, đồng hành cùng bạn mỗi ngày.",
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
    searchHint: "Tìm một thành phố để khám phá thời tiết nơi đó.",
    weatherSection: "Thời tiết hiện tại và dự báo",
    yourSky: "Thời tiết tại đây",
    loadingWeather: "Đang tải dữ liệu thời tiết…",
    liveUpdate: "Đang cập nhật",
    updatedAt: "Cập nhật lúc {time}",
    currentWeather: "Thời tiết hiện tại",
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
    assistantKicker: "Lời khuyên dành riêng cho bạn",
    assistantTitle: "Trợ lý thời tiết AI",
    readWeatherAdvice: "Đọc dự báo thời tiết và lời khuyên",
    speakWeather: "Đọc lời khuyên",
    choosePersona: "Chọn chuyên gia tư vấn",
    personaSwitcher: "Chế độ trợ lý AI",
    personaHealth: "Sức khỏe",
    personaFnb: "Kinh doanh F&B",
    personaLogistics: "Giao vận",
    clothingLabel: "Gợi ý trang phục",
    analyzingTemperature: "Đang phân tích nhiệt độ…",
    sunAdviceLabel: "Lời khuyên chống nắng",
    analyzingUv: "Đang phân tích chỉ số UV…",
    outingAdviceLabel: "Gợi ý hoạt động",
    analyzingRain: "Đang phân tích khả năng mưa…",
    weatherSpeechReady: "Dữ liệu thời tiết đã sẵn sàng. Nhấn nút để nghe bản tin.",
    statusLabel: "Trạng thái:",
    ready: "Sẵn sàng",
    listening: "Đang nghe",
    askAssistant: "Hỏi Trợ lý AI",
    voiceStart: "Đang nghe, hãy đặt câu hỏi bằng tiếng Việt.",
    voiceGreeting: "Chọn chuyên gia rồi nhấn “Hỏi Trợ lý AI” để bắt đầu.",
    voiceNoResult: "Chưa nhận được câu hỏi. Hãy thử nói lại.",
    voiceStopped: "Đã dừng nghe. Nhấn micro để thử lại.",
    voiceNoSupport: "Trình duyệt chưa hỗ trợ nhận dạng giọng nói. Hãy dùng trình duyệt hỗ trợ Web Speech API.",
    voiceNoPermission: "Bạn chưa cấp quyền sử dụng micro. Hãy cho phép truy cập micro rồi thử lại.",
    voiceNoSpeech: "Chưa phát hiện giọng nói. Hãy thử lại trong môi trường yên tĩnh hơn.",
    voiceNoDevice: "Không tìm thấy micro. Hãy kiểm tra thiết bị ghi âm.",
    voiceNetwork: "Không thể kết nối dịch vụ nhận dạng giọng nói. Hãy thử lại sau.",
    voiceUnavailable: "Nhận dạng giọng nói hiện không khả dụng trong trình duyệt này.",
    weatherNotReady: "Đang tải dữ liệu thời tiết. Hãy thử lại sau khi bản tin được cập nhật.",
    voiceSpeakDone: "Đã đọc xong câu trả lời.",
    voiceSpeakUnsupported: "Trình duyệt này không hỗ trợ phát giọng nói.",
    voiceSpeakError: "Không thể phát câu trả lời: {error}. Bạn vẫn có thể đọc nội dung trên màn hình.",
    voiceMicError: "Không thể bật micro: {error}",
    voiceStopError: "Không thể dừng ghi âm: {error}",
    voiceGenericError: "Nhận dạng giọng nói gặp lỗi: {error}.",
    answerTranscript: "Bạn hỏi: {question}\n{answer}",
    noWeatherData: "Hiện chưa có dữ liệu thời tiết. Vui lòng đợi bản tin thời tiết tải xong rồi hỏi lại nhé.",
    healthModeChanged: "Đã chuyển sang chế độ tư vấn Sức khỏe.",
    fnbModeChanged: "Đã chuyển sang chế độ tư vấn Kinh doanh F&B.",
    logisticsModeChanged: "Đã chuyển sang chế độ tư vấn Giao vận.",
    speakPreparing: "Đang chuẩn bị phát bản tin…",
    speakStarting: "Đang đọc bản tin thời tiết và lời khuyên…",
    speakFinished: "Đã đọc xong bản tin thời tiết.",
    speakStopped: "Đã dừng phát bản tin.",
    weatherUpdatedSpeech: "Thời tiết đã cập nhật. Nhấn nút để nghe bản tin.",
    partialWeatherData: "Thiếu một số dữ liệu thời tiết nên chưa thể tạo bản tin đầy đủ.",
    speechUnsupported: "Trình duyệt không hỗ trợ Web Speech API.",
    uvLow: "thấp, chỉ cần bảo vệ thông thường",
    uvModerate: "trung bình, nên chống nắng",
    uvHigh: "cao, cần chú ý chống nắng",
    uvVeryHigh: "rất cao, hãy tăng cường bảo vệ",
    uvExtreme: "cực cao, tránh phơi nắng lâu",
    windGentle: "Gió nhẹ",
    windBreezy: "Gió thoảng",
    windStrong: "Gió hơi mạnh",
    windVeryStrong: "Gió mạnh, chú ý hoạt động ngoài trời",
    clothingCold: "Trời lạnh, nên mặc áo khoác ấm và chú ý chênh lệch nhiệt độ sáng tối.",
    clothingCool: "Trời hơi se lạnh, hãy mang theo áo khoác mỏng hoặc mặc nhiều lớp.",
    clothingMild: "Thời tiết dễ chịu, bạn có thể mặc đồ nhẹ; nếu sợ lạnh, hãy mang áo khoác mỏng.",
    clothingWarm: "Trời ấm, hãy chọn quần áo mỏng nhẹ, thoáng mát và nhớ uống đủ nước.",
    sunLow: "UV {uv}, hiện ở mức thấp. Nếu ở ngoài trời lâu, bạn vẫn nên chống nắng.",
    sunModerate: "UV {uv}. Hãy thoa kem chống nắng và thoa lại khi cần.",
    sunHigh: "UV {uv}, khá cao. Hãy dùng kem chống nắng, đội mũ và tìm bóng râm.",
    sunExtreme: "UV {uv}, rất cao. Hãy bảo vệ da kỹ và tránh ở ngoài nắng lâu.",
    rainHigh: "Khả năng mưa hôm nay {rain}%. Bạn nên mang ô và chuẩn bị phương án dự phòng cho hoạt động ngoài trời.",
    rainModerate: "Khả năng mưa hôm nay {rain}%. Mang theo ô gấp sẽ yên tâm hơn.",
    rainLow: "Khả năng mưa hôm nay {rain}%. Thời tiết phù hợp cho hoạt động ngoài trời, nhưng vẫn nên theo dõi dự báo.",
    adviceUnavailableTemp: "Hiện chưa có dữ liệu nhiệt độ để gợi ý trang phục.",
    adviceUnavailableUv: "Chưa có dữ liệu UV; hãy chống nắng khi ra ngoài.",
    adviceUnavailableRain: "Chưa có dữ liệu mưa; hãy kiểm tra dự báo trước khi ra ngoài.",
    today: "Hôm nay",
    high: "Cao nhất",
    low: "Thấp nhất",
    weatherSummary: "Thời tiết tại {place}: {condition}, {temperature}°C.",
    weatherSpeechLine: "Cảm giác như {feels}°C. UV {uv}. Khả năng mưa hôm nay {rain}%.",
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
    routeKicker: "Lên kế hoạch chuyến đi",
    routeTitle: "Dự báo thời tiết hành trình",
    routeDescription: "Dự báo theo giờ tại điểm xuất phát, các chặng dừng và điểm đến; chưa tính thời gian di chuyển.",
    routeOrigin: "Điểm khởi hành",
    routeOriginPlaceholder: "Ví dụ: Hà Nội",
    routeDestination: "Điểm đến",
    routeDestinationPlaceholder: "Ví dụ: Đà Nẵng",
    routeCheck: "Kiểm tra thời tiết lộ trình",
    routeFinding: "Đang tìm địa điểm và tải dự báo thời tiết…",
    routeSuccess: "Đã cập nhật dự báo thời tiết trên tuyến đường.",
    routeSamePlace: "Điểm khởi hành và điểm đến phải khác nhau.",
    routeEmpty: "Vui lòng nhập điểm khởi hành và điểm đến.",
    routeNotFound: "Không tìm thấy địa điểm “{place}”. Vui lòng kiểm tra tên và thử lại.",
    routeDistance: "Quãng đường đường chim bay khoảng {distance} km · {count} điểm dừng",
    routeOriginBadge: "Xuất phát",
    routeStopBadge: "Trạm dừng",
    routeDestinationBadge: "Điểm đến",
    routeStopName: "Điểm dừng {number}",
    routeForecastAt: "Dự báo lúc {time}",
    routeRainChance: "Khả năng mưa: {probability}%",
    routeRainLow: "Khả năng mưa thấp",
    routeRainUnavailable: "Chưa có dữ liệu khả năng mưa",
    routeWarnSevere: "Mưa lớn, mưa đóng băng, tuyết dày hoặc dông nguy hiểm",
    routeWarnRain: "Có mưa, đường có thể trơn trượt",
    routeWarnSnow: "Có tuyết hoặc mưa tuyết",
    routeWarnProbability: "Khả năng mưa {probability}% trong vài giờ tới",
    routeWarnWind: "Gió mạnh {speed} km/h",
    routeWarningLabel: "Cảnh báo: {warnings}",
    routeInvalid: "Không thể xác định khoảng cách giữa hai địa điểm.",
    routeWeatherInvalid: "Không nhận được dự báo hợp lệ tại {place}.",
    routeWeatherIncomplete: "Dự báo tại {place} hiện không có đủ dữ liệu.",
    routeError: "Không thể tải thời tiết lộ trình. Vui lòng thử lại.",
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
    sevenDayForecast: "Dự báo 7 ngày",
    forecastCaption: "Chủ động lên kế hoạch với dự báo 7 ngày",
    preparingForecast: "Đang chuẩn bị dự báo tuần…",
    footerNote: "Đưa thời tiết vào nhịp sống, để mỗi chuyến đi thêm an tâm.",
    weatherCredit: "Dữ liệu thời tiết từ Open-Meteo",
    uvAnswerUnavailable: "Hiện chưa có dữ liệu tia cực tím. Hãy dùng kem chống nắng và che chắn khi ở ngoài trời lâu.",
    uvAnswerHigh: "UV hiện {uv}, mức cao. Hãy dùng kem chống nắng phổ rộng, đội mũ, đeo kính và tìm bóng râm; nếu da nhạy cảm, hãy làm theo hướng dẫn của bác sĩ.",
    uvAnswerLow: "UV hiện {uv}. Hãy bảo vệ da khi ở ngoài trời lâu và thoa lại kem chống nắng theo hướng dẫn.",
    temperatureAnswerCold: "Hiện {temperature}°C, nên mặc nhiều lớp và mang theo áo khoác.",
    temperatureAnswerHot: "Hiện {temperature}°C, nên chọn quần áo thoáng mát và uống đủ nước.",
    temperatureAnswerMild: "Hiện {temperature}°C, hãy chọn trang phục phù hợp và dễ điều chỉnh.",
    temperatureRangeHigh: "Biên độ nhiệt ngày khoảng {range}°, nên chuẩn bị thêm áo cho buổi sáng và tối.",
    temperatureRangeLow: "Biên độ nhiệt ngày khoảng {range}°.",
    healthDisclaimer: "Thời tiết không thể dùng để chẩn đoán cảm cúm; nếu có triệu chứng nặng hoặc kéo dài, hãy hỏi nhân viên y tế.",
    fnbRainHigh: "Mưa có xác suất {rain}%. Ưu tiên quảng bá giao hàng và chuẩn bị mái che cho khách ngoài trời; nhớ bảo vệ bao bì và nguyên liệu.",
    fnbRainMedium: "Mưa có xác suất {rain}%. Cân nhắc ưu đãi giao hàng và chuẩn bị mái che dự phòng.",
    fnbRainLow: "Mưa có xác suất {rain}%. Có thể ưu tiên phục vụ tại chỗ, nhưng hãy kiểm tra dự báo trước khi sắp xếp khu vực ngoài trời.",
    fnbRainUnavailable: "Chưa có dữ liệu xác suất mưa. Hãy kiểm tra dự báo trước khi quyết định quảng bá giao hàng hoặc chuẩn bị mái che.",
    fnbHot: "Nhiệt độ khoảng {temperature}°C. Có thể ưu tiên đồ uống lạnh, nước và đá; nhập theo lượng bán thực tế để hạn chế hao hụt.",
    fnbCold: "Nhiệt độ khoảng {temperature}°C. Có thể cân nhắc bổ sung nguyên liệu cho đồ uống nóng; hãy đối chiếu nhu cầu và tồn kho.",
    fnbMild: "Nhiệt độ khoảng {temperature}°C, khá ôn hòa. Nên giữ danh mục cân bằng và nhập nguyên liệu theo lịch sử bán hàng.",
    logisticsVisibilityUnavailable: "Chưa có dữ liệu tầm nhìn từ dự báo. Hãy theo dõi cảnh báo địa phương trước khi khởi hành.",
    logisticsVisibilityLow: "Tầm nhìn khoảng {visibility} km, hạn chế. Giảm tốc độ phù hợp quy định, tăng khoảng cách an toàn và cân nhắc hoãn nếu không an toàn.",
    logisticsVisibilityMedium: "Tầm nhìn khoảng {visibility} km. Cần quan sát kỹ, giữ khoảng cách an toàn và tuân thủ hướng dẫn giao thông, an toàn công trường.",
    logisticsVisibilityGood: "Tầm nhìn khoảng {visibility} km. Vẫn cần tuân thủ giới hạn tốc độ và quy trình an toàn tại công trường.",
    logisticsWindUnavailable: "Chưa có dữ liệu tốc độ gió. Hãy kiểm tra cảnh báo thời tiết và quy định an toàn tại địa phương.",
    logisticsWindHigh: "Gió khoảng {wind} km/h, có thể ảnh hưởng phương tiện và công việc ngoài trời. Cố định hàng hóa; tạm dừng công việc trên cao nếu vượt ngưỡng an toàn.",
    logisticsWindLow: "Gió khoảng {wind} km/h. Duy trì tốc độ an toàn, cố định hàng hóa và theo dõi cảnh báo địa phương.",
    assistantHealthSummary: "Trợ lý sức khỏe: {temperature}, {uv}{range}. Hãy điều chỉnh trang phục và chống nắng phù hợp; đây không phải chẩn đoán y khoa.",
    assistantFnbSummary: "Trợ lý F&B: {temperature}, {rain}. Điều chỉnh nguyên liệu theo tồn kho và chọn phương án giao hàng hoặc mái che theo nhu cầu.",
    assistantLogisticsSummary: "Trợ lý giao vận: {temperature}, {wind}. Tuân thủ giới hạn tốc độ và quy trình an toàn.",
    answerGeneral: "Thời tiết hiện {temperature}, {wind}{rain}. Bạn muốn hỏi sâu hơn về sức khỏe, kinh doanh F&B hay giao vận?",
    noTemperatureData: "chưa có dữ liệu nhiệt độ",
    noUvData: "chưa có dữ liệu UV",
    noRainData: "chưa có dữ liệu mưa",
    noWindData: "chưa có dữ liệu gió",
    visibilityNotAvailable: "chưa có dữ liệu tầm nhìn",
    temperatureValue: "hiện {temperature}°C",
    uvValue: "UV {uv}",
    rangeValue: ", biên độ nhiệt ngày {range}°",
    rainValue: "xác suất mưa {rain}%",
    windValue: "gió {wind} km/h",
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
    metaDescription: "Current weather, useful advice, and a seven-day forecast to help you plan every day.",
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
    searchHint: "Find a city and discover what the sky is like there.",
    weatherSection: "Current weather and forecast",
    yourSky: "Your local weather",
    loadingWeather: "Loading weather data…",
    liveUpdate: "Updating",
    updatedAt: "Updated at {time}",
    currentWeather: "Current weather",
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
    assistantKicker: "Advice tailored for you",
    assistantTitle: "AI Weather Assistant",
    readWeatherAdvice: "Read the weather and advice aloud",
    speakWeather: "Read advice",
    choosePersona: "Choose an expert",
    personaSwitcher: "AI assistant mode",
    personaHealth: "Health",
    personaFnb: "Food & Beverage",
    personaLogistics: "Logistics",
    clothingLabel: "Clothing",
    analyzingTemperature: "Analyzing temperature…",
    sunAdviceLabel: "Sun protection",
    analyzingUv: "Analyzing UV index…",
    outingAdviceLabel: "Activity ideas",
    analyzingRain: "Analyzing rain probability…",
    weatherSpeechReady: "Weather data is ready. Press the button to hear the briefing.",
    statusLabel: "Status:",
    ready: "Ready",
    listening: "Listening",
    askAssistant: "Ask AI Assistant",
    voiceStart: "Listening. Ask your question in English.",
    voiceGreeting: "Choose an expert, then press “Ask AI Assistant” to get started.",
    voiceNoResult: "I didn't catch that. Please try speaking again.",
    voiceStopped: "Stopped listening. Press the microphone to try again.",
    voiceNoSupport: "Speech recognition is not supported in this browser. Use a browser with Web Speech API support.",
    voiceNoPermission: "Microphone permission was denied. Allow microphone access and try again.",
    voiceNoSpeech: "No speech detected. Please try again in a quieter environment.",
    voiceNoDevice: "No microphone found. Check your audio input device.",
    voiceNetwork: "Unable to connect to speech recognition. Please try again later.",
    voiceUnavailable: "Speech recognition is unavailable in this browser.",
    weatherNotReady: "Weather data is loading. Try again after the briefing has updated.",
    voiceSpeakDone: "Finished reading the answer.",
    voiceSpeakUnsupported: "This browser does not support speech playback.",
    voiceSpeakError: "Could not play the answer: {error}. You can still read it on screen.",
    voiceMicError: "Could not start the microphone: {error}",
    voiceStopError: "Could not stop recording: {error}",
    voiceGenericError: "Speech recognition error: {error}.",
    answerTranscript: "You asked: {question}\n{answer}",
    noWeatherData: "Weather data is not available yet. Please wait for it to load, then ask again.",
    healthModeChanged: "Switched to Health advisor.",
    fnbModeChanged: "Switched to Food & Beverage advisor.",
    logisticsModeChanged: "Switched to Logistics advisor.",
    speakPreparing: "Preparing the briefing…",
    speakStarting: "Reading the weather briefing and advice…",
    speakFinished: "Finished reading the weather briefing.",
    speakStopped: "Weather briefing stopped.",
    weatherUpdatedSpeech: "Weather updated. Press the button to hear the briefing.",
    partialWeatherData: "Some weather data is unavailable, so a complete briefing cannot be created.",
    speechUnsupported: "This browser does not support the Web Speech API.",
    uvLow: "low; routine protection is enough",
    uvModerate: "moderate; sun protection is recommended",
    uvHigh: "high; take sun protection seriously",
    uvVeryHigh: "very high; increase protection",
    uvExtreme: "extreme; avoid prolonged sun exposure",
    windGentle: "Light breeze",
    windBreezy: "Gentle wind",
    windStrong: "Breezy",
    windVeryStrong: "Strong wind; take care outdoors",
    clothingCold: "It's cold. Wear a warm coat and watch for temperature changes between morning and evening.",
    clothingCool: "It's cool. Bring a light jacket or dress in layers.",
    clothingMild: "Comfortable weather. Wear light clothes and bring a jacket if you feel chilly.",
    clothingWarm: "It's warm. Choose light, breathable clothes and stay hydrated.",
    sunLow: "UV index {uv}, currently low. Use sun protection if you spend a long time outdoors.",
    sunModerate: "UV index {uv}. Apply sunscreen and reapply as needed.",
    sunHigh: "UV index {uv}, fairly high. Use sunscreen, wear a hat, and seek shade.",
    sunExtreme: "UV index {uv}, very high. Protect your skin and avoid prolonged sun exposure.",
    rainHigh: "Today's chance of rain is {rain}%. Bring an umbrella and have a backup plan for outdoor activities.",
    rainModerate: "Today's chance of rain is {rain}%. Bringing a compact umbrella is a good idea.",
    rainLow: "Today's chance of rain is {rain}%. Outdoor activities look suitable, but keep an eye on the forecast.",
    adviceUnavailableTemp: "Temperature data is unavailable for clothing advice.",
    adviceUnavailableUv: "UV data is unavailable; protect yourself when outdoors.",
    adviceUnavailableRain: "Rain data is unavailable; check the forecast before heading out.",
    today: "Today",
    high: "High",
    low: "Low",
    weatherSummary: "Weather in {place}: {condition}, {temperature}°C.",
    weatherSpeechLine: "Feels like {feels}°C. UV index {uv}. Today's chance of rain is {rain}%.",
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
    routeKicker: "Plan your trip",
    routeTitle: "Route weather forecast",
    routeDescription: "Hourly forecasts for your origin, stops, and destination; travel time is not included.",
    routeOrigin: "Starting point",
    routeOriginPlaceholder: "For example: London",
    routeDestination: "Destination",
    routeDestinationPlaceholder: "For example: Paris",
    routeCheck: "Check route weather",
    routeFinding: "Finding places and loading forecasts…",
    routeSuccess: "Route weather forecast updated.",
    routeSamePlace: "The starting point and destination must be different.",
    routeEmpty: "Enter both a starting point and a destination.",
    routeNotFound: "Could not find “{place}”. Check the name and try again.",
    routeDistance: "About {distance} km in a straight line · {count} stops",
    routeOriginBadge: "Start",
    routeStopBadge: "Stop",
    routeDestinationBadge: "Destination",
    routeStopName: "Stop {number}",
    routeForecastAt: "Forecast at {time}",
    routeRainChance: "Chance of rain: {probability}%",
    routeRainLow: "Low chance of rain",
    routeRainUnavailable: "Rain probability unavailable",
    routeWarnSevere: "Heavy rain, freezing rain, heavy snow, or dangerous thunderstorms",
    routeWarnRain: "Rain expected; roads may be slippery",
    routeWarnSnow: "Snow or sleet expected",
    routeWarnProbability: "{probability}% chance of rain in the next few hours",
    routeWarnWind: "Strong winds at {speed} km/h",
    routeWarningLabel: "Warning: {warnings}",
    routeInvalid: "Could not calculate the distance between these places.",
    routeWeatherInvalid: "No valid forecast was returned for {place}.",
    routeWeatherIncomplete: "The forecast for {place} is incomplete.",
    routeError: "Could not load route weather. Please try again.",
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
    sevenDayForecast: "7-day forecast",
    forecastCaption: "Plan ahead with a seven-day forecast",
    preparingForecast: "Preparing your weekly forecast…",
    footerNote: "Make weather part of your day and travel with confidence.",
    weatherCredit: "Weather data provided by Open-Meteo",
    uvAnswerUnavailable: "UV data is unavailable. Use sunscreen and protective clothing during extended outdoor exposure.",
    uvAnswerHigh: "UV index is {uv}, which is high. Use broad-spectrum sunscreen, a hat and sunglasses, and seek shade. Follow your clinician's advice for sensitive skin.",
    uvAnswerLow: "UV index is {uv}. Protect your skin during long periods outdoors and reapply sunscreen as directed.",
    temperatureAnswerCold: "It is {temperature}°C. Wear layers and bring a warm jacket.",
    temperatureAnswerHot: "It is {temperature}°C. Choose breathable clothing and drink enough water.",
    temperatureAnswerMild: "It is {temperature}°C. Choose comfortable clothing you can adjust.",
    temperatureRangeHigh: "The daily temperature range is about {range}°. Bring an extra layer for mornings and evenings.",
    temperatureRangeLow: "The daily temperature range is about {range}°.",
    healthDisclaimer: "Weather cannot diagnose flu. Contact a healthcare professional if symptoms are severe or persistent.",
    fnbRainHigh: "There is a {rain}% chance of rain. Promote delivery and prepare covers for outdoor seating; protect packaging and ingredients.",
    fnbRainMedium: "There is a {rain}% chance of rain. Consider a delivery promotion and keep a backup canopy ready.",
    fnbRainLow: "There is a {rain}% chance of rain. On-site service may work well, but check the forecast before arranging outdoor seating.",
    fnbRainUnavailable: "Rain probability is unavailable. Check the latest forecast before promoting delivery or preparing covers.",
    fnbHot: "It is about {temperature}°C. Consider prioritizing cold drinks, water, and ice; order based on actual sales to reduce waste.",
    fnbCold: "It is about {temperature}°C. Consider stocking ingredients for hot drinks based on demand and current inventory.",
    fnbMild: "It is about {temperature}°C, fairly mild. Keep the menu balanced and order ingredients based on sales history.",
    logisticsVisibilityUnavailable: "Visibility data is unavailable. Check local alerts before departure.",
    logisticsVisibilityLow: "Visibility is about {visibility} km and limited. Reduce speed as conditions require, increase following distance, and delay travel if unsafe.",
    logisticsVisibilityMedium: "Visibility is about {visibility} km. Stay alert, keep a safe distance, and follow traffic and site-safety guidance.",
    logisticsVisibilityGood: "Visibility is about {visibility} km. Continue to follow speed limits and site-safety procedures.",
    logisticsWindUnavailable: "Wind data is unavailable. Check local weather alerts and safety rules.",
    logisticsWindHigh: "Winds are about {wind} km/h and may affect vehicles or outdoor work. Secure loads and pause elevated work if site limits are exceeded.",
    logisticsWindLow: "Winds are about {wind} km/h. Maintain a safe speed, secure loads, and monitor local alerts.",
    assistantHealthSummary: "Health advisor: {temperature}, {uv}{range}. Adjust clothing and sun protection as needed; this is not a medical diagnosis.",
    assistantFnbSummary: "Food & Beverage advisor: {temperature}, {rain}. Adjust stock to inventory and choose delivery or covers based on demand.",
    assistantLogisticsSummary: "Logistics advisor: {temperature}, {wind}. Follow speed limits and safety procedures.",
    answerGeneral: "Current weather: {temperature}, {wind}{rain}. Would you like more advice about health, food service, or logistics?",
    noTemperatureData: "temperature data unavailable",
    noUvData: "UV data unavailable",
    noRainData: "rain data unavailable",
    noWindData: "wind data unavailable",
    visibilityNotAvailable: "visibility data unavailable",
    temperatureValue: "currently {temperature}°C",
    uvValue: "UV {uv}",
    rangeValue: ", daily range {range}°",
    rainValue: "{rain}% chance of rain",
    windValue: "wind at {wind} km/h",
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
    metaDescription: "即時天氣、生活建議與未來七日預報，陪你掌握每一天。",
    pageTitle: "Weather — 天氣，剛剛好",
    home: "Weather 首頁",
    topbarNote: "讓每一天，都有好天氣的預感",
    liveWeather: "即時天氣",
    languageLabel: "語言",
    eyebrow: "你的每日氣象指南",
    headline: "天氣，",
    headlineAccent: "剛剛好。",
    introCopy: "下一場陽光，或一陣微風，都為你準備好了。",
    searchCity: "搜尋城市",
    searchPlaceholder: "搜尋城市，例如：臺北、東京",
    searchButton: "搜尋",
    searchHint: "試試搜尋一座城市，看看那裡的天空。",
    weatherSection: "目前天氣與未來預報",
    yourSky: "你所在的天空",
    loadingWeather: "正在取得天氣資料…",
    liveUpdate: "即時更新",
    updatedAt: "當地時間 {time} 更新",
    currentWeather: "現在的天氣",
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
    assistantKicker: "為你量身整理",
    assistantTitle: "AI 生活助手",
    readWeatherAdvice: "以中文朗讀天氣與生活建議",
    speakWeather: "中文播報",
    choosePersona: "選擇顧問角色",
    personaSwitcher: "AI 助理模式",
    personaHealth: "健康",
    personaFnb: "餐飲業",
    personaLogistics: "運輸物流",
    clothingLabel: "穿搭建議",
    analyzingTemperature: "正在分析目前氣溫…",
    sunAdviceLabel: "防曬提醒",
    analyzingUv: "正在分析紫外線指數…",
    outingAdviceLabel: "行程提案",
    analyzingRain: "正在分析降雨機率…",
    weatherSpeechReady: "天氣資料載入後，即可聆聽中文天氣播報。",
    statusLabel: "狀態：",
    ready: "準備就緒",
    listening: "正在聆聽",
    askAssistant: "詢問 AI 助理",
    voiceStart: "正在聆聽，請用中文提出問題。",
    voiceGreeting: "選擇顧問後，按下「詢問 AI 助理」即可開始。",
    voiceNoResult: "沒有收到問題，請再說一次。",
    voiceStopped: "已停止聆聽，按下麥克風即可重試。",
    voiceNoSupport: "此瀏覽器不支援語音辨識，請使用支援 Web Speech API 的瀏覽器。",
    voiceNoPermission: "尚未取得麥克風權限，請允許存取後再試一次。",
    voiceNoSpeech: "沒有偵測到語音，請在較安靜的環境中重試。",
    voiceNoDevice: "找不到麥克風，請檢查錄音裝置。",
    voiceNetwork: "無法連線至語音辨識服務，請稍後再試。",
    voiceUnavailable: "此瀏覽器目前無法使用語音辨識。",
    weatherNotReady: "正在載入天氣資料，請在天氣資訊更新後再試。",
    voiceSpeakDone: "回答已朗讀完畢。",
    voiceSpeakUnsupported: "此瀏覽器不支援語音播放。",
    voiceSpeakError: "無法播放回答：{error}。你仍可閱讀畫面上的文字。",
    voiceMicError: "無法啟動麥克風：{error}",
    voiceStopError: "無法停止錄音：{error}",
    voiceGenericError: "語音辨識發生錯誤：{error}。",
    answerTranscript: "你的問題：{question}\n{answer}",
    noWeatherData: "目前沒有天氣資料，請稍候資料載入後再詢問。",
    healthModeChanged: "已切換至健康顧問模式。",
    fnbModeChanged: "已切換至餐飲業顧問模式。",
    logisticsModeChanged: "已切換至運輸物流顧問模式。",
    speakPreparing: "正在準備語音播報…",
    speakStarting: "正在朗讀天氣與生活建議…",
    speakFinished: "天氣播報已完成。",
    speakStopped: "已停止天氣播報。",
    weatherUpdatedSpeech: "天氣資料已更新，點選按鈕即可聆聽播報。",
    partialWeatherData: "部分天氣資料暫缺，暫時無法產生完整播報。",
    speechUnsupported: "此瀏覽器不支援 Web Speech API。",
    uvLow: "低，日常防護即可",
    uvModerate: "中等，建議做好防曬",
    uvHigh: "偏高，請留意防曬",
    uvVeryHigh: "很高，請加強防護",
    uvExtreme: "極高，請避免長時間曝曬",
    windGentle: "微風徐徐",
    windBreezy: "和風輕拂",
    windStrong: "風勢稍強",
    windVeryStrong: "風勢較強，留意戶外活動",
    clothingCold: "氣溫偏低，建議穿著保暖外套，留意早晚溫差。",
    clothingCool: "天氣微涼，帶件薄外套或採洋蔥式穿搭更舒適。",
    clothingMild: "氣溫舒適，穿著輕便即可，怕冷可加件薄外套。",
    clothingWarm: "氣溫偏暖，選擇透氣輕薄的衣物，記得補充水分。",
    sunLow: "紫外線指數 {uv}，目前偏低，長時間戶外活動仍建議做好防曬。",
    sunModerate: "紫外線指數 {uv}，外出可擦防曬乳並適時補擦。",
    sunHigh: "紫外線指數 {uv}，建議擦防曬、戴帽子並尋找陰涼處。",
    sunExtreme: "紫外線指數 {uv}，紫外線很強，請加強防曬並避免久曬。",
    rainHigh: "今日降雨機率 {rain}%，建議帶傘，戶外行程記得準備備案。",
    rainModerate: "今日降雨機率 {rain}%，外出帶把摺疊傘較安心。",
    rainLow: "今日降雨機率 {rain}%，適合安排戶外活動，仍可留意天氣變化。",
    adviceUnavailableTemp: "目前無法取得氣溫資料，暫時無法提供穿搭建議。",
    adviceUnavailableUv: "目前無法取得紫外線指數，外出時建議做好防曬。",
    adviceUnavailableRain: "目前無法取得降雨機率，出門前請查看最新天氣。",
    today: "今天",
    high: "最高",
    low: "最低",
    weatherSummary: "{place}目前{condition}，氣溫 {temperature}°C。",
    weatherSpeechLine: "體感 {feels}°C。紫外線指數 {uv}。今日降雨機率 {rain}%。",
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
    routeKicker: "規劃旅程",
    routeTitle: "旅遊路線天氣規劃",
    routeDescription: "提供出發地、沿途停靠點與目的地的逐時預報；未計入交通時間。",
    routeOrigin: "出發地",
    routeOriginPlaceholder: "例如：臺北",
    routeDestination: "目的地",
    routeDestinationPlaceholder: "例如：高雄",
    routeCheck: "查詢路線天氣",
    routeFinding: "正在搜尋地點並載入天氣預報…",
    routeSuccess: "路線天氣預報已更新。",
    routeSamePlace: "出發地與目的地必須不同。",
    routeEmpty: "請輸入出發地與目的地。",
    routeNotFound: "找不到「{place}」，請確認名稱後再試一次。",
    routeDistance: "直線距離約 {distance} 公里 · {count} 個停靠點",
    routeOriginBadge: "出發",
    routeStopBadge: "停靠點",
    routeDestinationBadge: "目的地",
    routeStopName: "停靠點 {number}",
    routeForecastAt: "{time} 預報",
    routeRainChance: "降雨機率：{probability}%",
    routeRainLow: "降雨機率低",
    routeRainUnavailable: "暫無降雨機率資料",
    routeWarnSevere: "大雨、凍雨、大雪或強烈雷雨",
    routeWarnRain: "可能降雨，路面濕滑",
    routeWarnSnow: "可能降雪或雨夾雪",
    routeWarnProbability: "未來幾小時降雨機率 {probability}%",
    routeWarnWind: "強風，風速 {speed} 公里/小時",
    routeWarningLabel: "注意：{warnings}",
    routeInvalid: "無法計算兩個地點之間的距離。",
    routeWeatherInvalid: "無法取得 {place} 的有效天氣預報。",
    routeWeatherIncomplete: "{place} 的天氣預報資料不完整。",
    routeError: "無法載入路線天氣，請稍後再試。",
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
    sevenDayForecast: "未來七日",
    forecastCaption: "七天的天氣，提前掌握",
    preparingForecast: "正在為你準備一週的天氣…",
    footerNote: "把天氣收進日常，讓出門從容一點。",
    weatherCredit: "氣象資料由 Open-Meteo 提供",
    uvAnswerUnavailable: "目前無法取得紫外線資料。長時間戶外活動請做好防曬與遮蔽。",
    uvAnswerHigh: "紫外線指數 {uv}，偏高。請使用廣效防曬乳、戴帽與太陽眼鏡並尋找陰涼處；敏感肌膚請遵循醫療專業人員建議。",
    uvAnswerLow: "紫外線指數 {uv}。長時間戶外活動仍請做好防曬，並依照產品說明補擦。",
    temperatureAnswerCold: "目前 {temperature}°C，建議採多層穿搭並帶上外套。",
    temperatureAnswerHot: "目前 {temperature}°C，建議穿著透氣衣物並補充水分。",
    temperatureAnswerMild: "目前 {temperature}°C，請選擇舒適且方便調整的服裝。",
    temperatureRangeHigh: "今日溫差約 {range}°，早晚建議多帶一件外套。",
    temperatureRangeLow: "今日溫差約 {range}°。",
    healthDisclaimer: "天氣資訊不能用於診斷感冒；若症狀嚴重或持續，請諮詢醫療專業人員。",
    fnbRainHigh: "今日降雨機率 {rain}%。建議加強外送宣傳並為戶外座位準備遮雨棚，同時保護包材與食材。",
    fnbRainMedium: "今日降雨機率 {rain}%。可考慮推出外送優惠並準備備用遮雨棚。",
    fnbRainLow: "今日降雨機率 {rain}%。可優先安排內用，但安排戶外座位前仍請查看最新預報。",
    fnbRainUnavailable: "目前無降雨機率資料。決定外送宣傳或遮雨安排前，請先查看最新預報。",
    fnbHot: "目前約 {temperature}°C，可優先準備冷飲、飲用水與冰塊，並依實際銷量進貨以減少耗損。",
    fnbCold: "目前約 {temperature}°C，可考慮增加熱飲食材，並依需求與庫存調整進貨。",
    fnbMild: "目前約 {temperature}°C，氣候舒適。建議維持飲品選擇平衡，並參考銷售紀錄備貨。",
    logisticsVisibilityUnavailable: "目前沒有能見度預報資料。出發前請留意當地警示。",
    logisticsVisibilityLow: "能見度約 {visibility} 公里，視線受限。請依路況減速、保持安全距離，若不安全應延後行程。",
    logisticsVisibilityMedium: "能見度約 {visibility} 公里。請提高警覺、保持安全距離並遵守交通與工地安全指引。",
    logisticsVisibilityGood: "能見度約 {visibility} 公里。仍請遵守速限與工地安全規範。",
    logisticsWindUnavailable: "目前沒有風速資料。請查看當地天氣警示與安全規定。",
    logisticsWindHigh: "風速約 {wind} 公里/小時，可能影響交通與戶外作業。請固定貨物，若超過工地安全標準應暫停高處作業。",
    logisticsWindLow: "風速約 {wind} 公里/小時。請安全行駛、固定貨物並留意當地警示。",
    assistantHealthSummary: "健康顧問：{temperature}，{uv}{range}。請適度調整穿著與防曬；以上並非醫療診斷。",
    assistantFnbSummary: "餐飲顧問：{temperature}，{rain}。請依庫存調整備料，並依需求安排外送或遮雨措施。",
    assistantLogisticsSummary: "物流顧問：{temperature}，{wind}。請遵守速限與安全作業規範。",
    answerGeneral: "目前天氣：{temperature}，{wind}{rain}。你想進一步了解健康、餐飲或物流建議嗎？",
    noTemperatureData: "目前沒有氣溫資料",
    noUvData: "目前沒有紫外線資料",
    noRainData: "目前沒有降雨資料",
    noWindData: "目前沒有風速資料",
    visibilityNotAvailable: "目前沒有能見度資料",
    temperatureValue: "目前 {temperature}°C",
    uvValue: "紫外線指數 {uv}",
    rangeValue: "，今日溫差 {range}°",
    rainValue: "降雨機率 {rain}%",
    windValue: "風速 {wind} 公里/小時",
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

function getSpeechLanguage() {
  return SPEECH_LANGUAGES[currentLanguage];
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
}

function changeLanguage(language) {
  if (!Object.hasOwn(translations, language)) return;
  if (window.speechSynthesis?.speaking) window.speechSynthesis.cancel();
  currentLanguage = language;
  localStorage.setItem("selected_lang", language);
  applyTranslations();
  setVoiceState(isListening);
  if (speechRecognition) speechRecognition.lang = getSpeechLanguage();
  if (weatherContext) renderWeather(weatherContext.place, weatherContext.data);
  if (routeView) {
    renderRouteWeather(routeView.waypoints, routeView.forecasts, routeView.distanceKm);
    elements.routeStatus.textContent = t("routeSuccess");
  }
  if (radarFrames.length) setRadarFrames(radarFrames);
  elements.assistantVoiceMessage.textContent = "";
  if (lastVoiceQuestion) {
    elements.assistantVoiceAnswer.textContent = t("answerTranscript", {
      question: lastVoiceQuestion,
      answer: getAssistantAnswer(lastVoiceQuestion),
    });
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

function getLocale() {
  return currentLanguage === "zh" ? "zh-TW" : currentLanguage === "en" ? "en-US" : "vi-VN";
}
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
let routeView;
let assistantPersona = "health";
let speechRecognition;
let isListening = false;
let receivedVoiceResult = false;
let lastVoiceQuestion = "";

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
    const text = t("clothingCold");
    return { text, spoken: text };
  }
  if (temperature < 18) {
    const text = t("clothingCool");
    return { text, spoken: text };
  }
  if (temperature < 25) {
    const text = t("clothingMild");
    return { text, spoken: text };
  }
  const text = t("clothingWarm");
  return { text, spoken: text };
}

function getSunAdvice(uvIndex) {
  const key = uvIndex < 3 ? "sunLow" : uvIndex < 6 ? "sunModerate" : uvIndex < 8 ? "sunHigh" : "sunExtreme";
  const text = t(key, { uv: uvIndex.toFixed(1) });
  return { text, spoken: text };
}

function getRainAdvice(rainProbability) {
  const key = rainProbability >= 60 ? "rainHigh" : rainProbability >= 30 ? "rainModerate" : "rainLow";
  const text = t(key, { rain: Math.round(rainProbability) });
  return { text, spoken: text };
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
    clothingAdvice?.text ?? t("adviceUnavailableTemp");
  elements.sunAdvice.textContent =
    sunAdvice?.text ?? t("adviceUnavailableUv");
  elements.rainAdvice.textContent =
    rainAdvice?.text ?? t("adviceUnavailableRain");

  const apparentTemperature = current.apparent_temperature;
  const hasApparentTemperature = Number.isFinite(apparentTemperature);
  weatherAdvice =
    hasTemperature && hasUvIndex && hasRainProbability
      ? getLifestyleAdvice(temperature, uvIndex, validRainProbability)
      : undefined;

  if (!weatherAdvice || !hasApparentTemperature) {
    elements.assistantSpeak.disabled = true;
    elements.assistantSpeakStatus.textContent = t("partialWeatherData");
    return;
  }

  const conditionText = getWeatherDescription(current.weather_code).text;
  weatherBulletin = `${t("weatherSummary", {
    place: getVietnamesePlaceName(place),
    condition: conditionText,
    temperature: Math.round(temperature),
  })} ${t("weatherSpeechLine", {
    feels: Math.round(apparentTemperature),
    uv: uvIndex.toFixed(1),
    rain: Math.round(validRainProbability),
  })} ${weatherAdvice.spoken}`;
  if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
    elements.assistantSpeak.disabled = true;
    elements.assistantSpeakStatus.textContent = t("speechUnsupported");
    return;
  }
  elements.assistantSpeak.disabled = false;
  elements.assistantSpeakStatus.textContent = t("weatherSpeechReady");
}

function getVietnameseWeatherDescription(code) {
  return getWeatherDescription(code).text;
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
  const isMatch = (patterns) => patterns.some((pattern) => pattern.test(query));
  if (persona === "health") {
    if (isMatch([/\b(uv|tia cuc tim|nang|da|chong nang)\b/, /\b(sun|skin|sunscreen)\b/, /紫外線|防曬|皮膚|陽光/])) {
      return "health-sun";
    }
    if (isMatch([/\b(lanh|ret|ao|mac|cam|cum|sot|nhiet do|chenh lech)\b/, /\b(cold|flu|temperature|clothes|fever)\b/, /感冒|溫度|穿衣|溫差|發燒/])) {
      return "health-temperature";
    }
  } else if (persona === "fnb") {
    if (isMatch([/\b(mua|delivery|giao hang|quang cao|bat|che|ngoai troi)\b/, /\b(rain|delivery|advert|canopy|outdoor)\b/, /下雨|外送|外賣|廣告|遮雨|戶外/])) {
      return "fnb-rain";
    }
    if (isMatch([/\b(nhiet do|nong|lanh|do uong|nguyen lieu|nhap hang)\b/, /\b(temperature|hot|cold|drink|ingredient|stock)\b/, /溫度|飲料|飲品|食材|進貨|備貨/])) {
      return "fnb-temperature";
    }
  } else if (persona === "logistics") {
    if (isMatch([/\b(tam nhin|suong mu|nhin xa|visibility)\b/, /\b(fog|visibility|see)\b/, /能見度|能见度|霧|大霧/])) {
      return "logistics-visibility";
    }
    if (isMatch([/\b(gio|cong trinh|duong|giao hang|toc do|di chuyen|an toan)\b/, /\b(wind|road|construction|delivery|speed|safe)\b/, /風速|大風|道路|工地|運輸|安全/])) {
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
  if (!values) return t("noWeatherData");

  const intent = analyzeAssistantIntent(text, assistantPersona);
  const temperature = values.currentTemperature;
  const uv = values.uvIndex;
  const rain = values.rainProbability;
  const wind = values.windSpeed;
  const range = values.temperatureRange;

  if (assistantPersona === "health") {
    if (intent === "health-sun") {
      if (uv === undefined) return t("uvAnswerUnavailable");
      return t(uv >= 6 ? "uvAnswerHigh" : "uvAnswerLow", { uv: uv.toFixed(1) });
    }
    if (intent === "health-temperature") {
      const temperatureAdvice =
        temperature === undefined
          ? t("noTemperatureData")
          : temperature < 18
            ? t("temperatureAnswerCold", { temperature: Math.round(temperature) })
            : temperature >= 27
              ? t("temperatureAnswerHot", { temperature: Math.round(temperature) })
              : t("temperatureAnswerMild", { temperature: Math.round(temperature) });
      const rangeAdvice =
        range === undefined
          ? ""
          : range >= 8
            ? ` ${t("temperatureRangeHigh", { range: Math.round(range) })}`
            : ` ${t("temperatureRangeLow", { range: Math.round(range) })}`;
      return `${temperatureAdvice} ${rangeAdvice} ${t("healthDisclaimer")}`.trim();
    }
    return t("assistantHealthSummary", {
      temperature: temperature === undefined
        ? t("noTemperatureData")
        : t("temperatureValue", { temperature: Math.round(temperature) }),
      uv: uv === undefined ? t("noUvData") : t("uvValue", { uv: uv.toFixed(1) }),
      range: range === undefined ? "" : t("rangeValue", { range: Math.round(range) }),
    });
  }

  if (assistantPersona === "fnb") {
    if (intent === "fnb-rain") {
      if (rain === undefined) return t("fnbRainUnavailable");
      const key = rain >= 60 ? "fnbRainHigh" : rain >= 30 ? "fnbRainMedium" : "fnbRainLow";
      return t(key, { rain: Math.round(rain) });
    }
    if (intent === "fnb-temperature") {
      if (temperature === undefined) return t("adviceUnavailableTemp");
      const key = temperature >= 28 ? "fnbHot" : temperature < 18 ? "fnbCold" : "fnbMild";
      return t(key, { temperature: Math.round(temperature) });
    }
    return t("assistantFnbSummary", {
      temperature: temperature === undefined
        ? t("noTemperatureData")
        : t("temperatureValue", { temperature: Math.round(temperature) }),
      rain: rain === undefined ? t("noRainData") : t("rainValue", { rain: Math.round(rain) }),
    });
  }

  if (assistantPersona === "logistics") {
    if (intent === "logistics-visibility") {
      if (values.visibility === undefined) return t("logisticsVisibilityUnavailable");
      const visibilityKm = values.visibility / 1000;
      const key = visibilityKm < 1
        ? "logisticsVisibilityLow"
        : visibilityKm < 5
          ? "logisticsVisibilityMedium"
          : "logisticsVisibilityGood";
      return t(key, { visibility: visibilityKm.toFixed(1) });
    }
    if (wind === undefined) return t("logisticsWindUnavailable");
    return t(wind >= 40 ? "logisticsWindHigh" : "logisticsWindLow", {
      wind: Math.round(wind),
    });
  }

  return t("answerGeneral", {
    temperature: temperature === undefined
      ? t("noTemperatureData")
      : t("temperatureValue", { temperature: Math.round(temperature) }),
    wind: wind === undefined ? t("noWindData") : t("windValue", { wind: Math.round(wind) }),
    rain: rain === undefined ? "" : `, ${t("rainValue", { rain: Math.round(rain) })}`,
  });
}

function setVoiceState(listening) {
  isListening = listening;
  elements.assistantVoiceState.textContent = listening ? t("listening") : t("ready");
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
      t("voiceStopError", {
        error: error instanceof Error ? error.message : "unknown",
      });
  }
}

function speakAssistantAnswer(answer) {
  if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
    elements.assistantVoiceMessage.textContent =
      `${answer} ${t("voiceSpeakUnsupported")}`;
    return;
  }

  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
    resetSpeechStatus(t("speakStopped"));
  }
  const utterance = new SpeechSynthesisUtterance(answer);
  const currentSpeechGeneration = ++speechGeneration;
  utterance.lang = getSpeechLanguage();
  utterance.rate = 0.96;
  const vietnameseVoice = window.speechSynthesis
    .getVoices()
    .find((voice) => voice.lang.toLowerCase().startsWith(currentLanguage));
  if (vietnameseVoice) utterance.voice = vietnameseVoice;
  utterance.onend = () => {
    if (currentSpeechGeneration === speechGeneration) {
      elements.assistantVoiceMessage.textContent = t("voiceSpeakDone");
    }
  };
  utterance.onerror = (event) => {
    if (currentSpeechGeneration === speechGeneration) {
      elements.assistantVoiceMessage.textContent = t("voiceSpeakError", { error: event.error });
    }
  };
  window.speechSynthesis.speak(utterance);
}

function handleVoiceQuestion(transcript) {
  receivedVoiceResult = true;
  stopVoiceRecognition();
  lastVoiceQuestion = transcript;
  const answer = getAssistantAnswer(transcript);
  elements.assistantVoiceAnswer.textContent = t("answerTranscript", {
    question: transcript,
    answer,
  });
  speakAssistantAnswer(answer);
}

function configureVoiceAssistant() {
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Recognition) {
    elements.assistantMicrophone.disabled = true;
    elements.assistantVoiceMessage.textContent = t("voiceNoSupport");
    return;
  }

  speechRecognition = new Recognition();
  speechRecognition.lang = getSpeechLanguage();
  speechRecognition.continuous = false;
  speechRecognition.interimResults = false;
  speechRecognition.maxAlternatives = 1;
  speechRecognition.onstart = () => {
    receivedVoiceResult = false;
    setVoiceState(true);
    elements.assistantVoiceMessage.textContent = t("voiceStart");
  };
  speechRecognition.onresult = (event) => {
    const transcript = event.results?.[0]?.[0]?.transcript?.trim();
    if (!transcript) {
      elements.assistantVoiceMessage.textContent = t("voiceNoResult");
      return;
    }
    handleVoiceQuestion(transcript);
  };
  speechRecognition.onerror = (event) => {
    const messages = {
      "not-allowed": "voiceNoPermission",
      "no-speech": "voiceNoSpeech",
      "audio-capture": "voiceNoDevice",
      network: "voiceNetwork",
    };
    elements.assistantVoiceMessage.textContent =
      messages[event.error]
        ? t(messages[event.error])
        : t("voiceGenericError", { error: event.error });
  };
  speechRecognition.onend = () => {
    setVoiceState(false);
    if (!receivedVoiceResult && !elements.assistantVoiceMessage.textContent) {
      elements.assistantVoiceMessage.textContent = t("voiceStopped");
    }
  };
}

function toggleVoiceRecognition() {
  if (!speechRecognition) {
    elements.assistantVoiceMessage.textContent = t("voiceUnavailable");
    return;
  }
  if (isListening) {
    stopVoiceRecognition();
    return;
  }
  if (!weatherContext) {
    elements.assistantVoiceMessage.textContent = t("weatherNotReady");
    return;
  }
  receivedVoiceResult = false;
  elements.assistantVoiceMessage.textContent = "";
  if (window.speechSynthesis?.speaking) {
    window.speechSynthesis.cancel();
    resetSpeechStatus(t("speakStopped"));
  }
  try {
    speechRecognition.start();
  } catch (error) {
    elements.assistantVoiceMessage.textContent =
      t("voiceMicError", {
        error: error instanceof Error ? error.message : "unknown",
      });
  }
}

function selectAssistantPersona(persona) {
  assistantPersona = persona;
  for (const tab of elements.assistantPersonaTabs.querySelectorAll('[role="tab"]')) {
    const isSelected = tab.dataset.persona === persona;
    tab.setAttribute("aria-selected", String(isSelected));
    tab.tabIndex = isSelected ? 0 : -1;
  }
  const messages = {
    health: "healthModeChanged",
    fnb: "fnbModeChanged",
    logistics: "logisticsModeChanged",
  };
  const selectedTab = elements.assistantPersonaTabs.querySelector(
    `[data-persona="${persona}"]`,
  );
  elements.assistantVoiceAnswer.setAttribute("aria-labelledby", selectedTab.id);
  elements.assistantVoiceMessage.textContent = t(messages[persona]);
}

function resetSpeechStatus(message = t("weatherSpeechReady")) {
  speechGeneration += 1;
  elements.assistantSpeak.setAttribute("aria-pressed", "false");
  elements.assistantSpeakLabel.textContent = t("speakWeather");
  elements.assistantSpeakStatus.textContent = message;
}

function toggleWeatherSpeech() {
  if (!("speechSynthesis" in window) || !weatherBulletin) {
    elements.assistantSpeakStatus.textContent = t("speechUnsupported");
    return;
  }

  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
    resetSpeechStatus(t("speakStopped"));
    return;
  }

  const utterance = new SpeechSynthesisUtterance(weatherBulletin);
  const currentSpeechGeneration = ++speechGeneration;
  utterance.lang = getSpeechLanguage();
  utterance.rate = 0.94;
  const vietnameseVoice = window.speechSynthesis
    .getVoices()
    .find((voice) => voice.lang.toLowerCase().startsWith(currentLanguage));
  if (vietnameseVoice) utterance.voice = vietnameseVoice;

  utterance.onstart = () => {
    if (currentSpeechGeneration !== speechGeneration) return;
    elements.assistantSpeak.setAttribute("aria-pressed", "true");
    elements.assistantSpeakLabel.textContent = t("pause");
    elements.assistantSpeakStatus.textContent = t("speakStarting");
  };
  utterance.onend = () => {
    if (currentSpeechGeneration === speechGeneration) {
      resetSpeechStatus(t("speakFinished"));
    }
  };
  utterance.onerror = (event) => {
    if (currentSpeechGeneration === speechGeneration) {
      resetSpeechStatus(t("voiceSpeakError", { error: event.error }));
    }
  };

  elements.assistantSpeakStatus.textContent = t("speakPreparing");
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
  if (currentLanguage !== "vi") return placeName;
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

async function geocodeRoutePlace(query, signal) {
  const url = new URL(GEOCODING_URL);
  url.search = new URLSearchParams({
    name: query.trim(),
    count: "10",
    language: currentLanguage,
    format: "json",
  });
  const data = await fetchJson(url, signal, "路線地點搜尋服務");
  const places = data.results ?? [];
  if (places.length === 0) {
    throw new Error(t("routeNotFound", { place: query.trim() }));
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
    throw new Error(t("routeInvalid"));
  }

  const stopCount = distanceKm >= 700 ? 3 : 2;
  const waypoints = [{ name: origin.name, kind: "origin", ...origin }];
  for (let index = 1; index <= stopCount; index += 1) {
    waypoints.push({
      name: t("routeStopName", { number: index }),
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
    throw new Error(t("routeWeatherInvalid", { place: waypoint.name }));
  }
  const forecastIndex = getRouteForecastIndex(data);
  if (
    !Number.isFinite(Number(data.hourly.temperature_2m[forecastIndex])) ||
    !Number.isFinite(Number(data.hourly.weather_code[forecastIndex])) ||
    !Number.isFinite(Number(data.hourly.wind_speed_10m[forecastIndex]))
  ) {
    throw new Error(t("routeWeatherIncomplete", { place: waypoint.name }));
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
    warnings.push(t("routeWarnSevere"));
  } else if (weatherCode >= 51 && weatherCode <= 67) {
    warnings.push(t("routeWarnRain"));
  } else if (weatherCode >= 71 && weatherCode <= 86) {
    warnings.push(t("routeWarnSnow"));
  }
  if (precipitationProbability !== null && precipitationProbability >= 60) {
    warnings.push(t("routeWarnProbability", { probability: precipitationProbability }));
  }
  if (windSpeed >= 50) {
    warnings.push(t("routeWarnWind", { speed: Math.round(windSpeed) }));
  }

  return { warnings, precipitationProbability };
}

function renderRouteWeather(waypoints, forecasts, distanceKm) {
  routeView = { waypoints, forecasts, distanceKm };
  const fragment = document.createDocumentFragment();
  const summary = document.createElement("p");
  const timeline = document.createElement("ol");

  summary.className = "route-summary";
  summary.textContent = t("routeDistance", {
    distance: formatNumber(Math.round(distanceKm)),
    count: waypoints.length - 2,
  });
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
    title.textContent =
      waypoint.kind === "stop"
        ? t("routeStopName", { number: index })
        : waypoint.name;
    badge.className = "route-stop-type";
    badge.textContent =
      waypoint.kind === "origin"
        ? t("routeOriginBadge")
        : waypoint.kind === "destination"
          ? t("routeDestinationBadge")
          : t("routeStopBadge");
    weather.className = "route-weather";
    icon.className = "route-weather-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = condition.icon;
    details.className = "route-weather-details";
    temperature.className = "route-temperature";
    temperature.textContent = `${Math.round(temperatureValue)}°C`;
    forecastTime.className = "route-forecast-time";
    forecastTime.textContent = t("routeForecastAt", {
      time: data.hourly.time[forecastIndex].slice(-5),
    });
    description.className = "route-condition";
    description.textContent = getVietnameseWeatherDescription(weatherCode);
    precipitation.className = "route-precipitation";
    precipitation.textContent =
      precipitationProbability === null
        ? t("routeRainUnavailable")
        : precipitationProbability > 0
          ? t("routeRainChance", { probability: precipitationProbability })
          : t("routeRainLow");

    details.append(temperature, forecastTime, description, precipitation);
    weather.append(icon, details);
    heading.append(title, badge);
    card.append(heading, weather);
    if (warnings.length > 0) {
      const warning = document.createElement("p");
      warning.className = "route-warning";
      warning.textContent = `⚠ ${t("routeWarningLabel", {
        warnings: warnings.join(" · "),
      })}`;
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
  elements.routeStatus.textContent = t("routeFinding");
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
    elements.routeStatus.textContent = t("routeSuccess");
  } catch (error) {
    if (error.name === "AbortError" || currentRequestId !== routeRequestId) return;
    elements.routeStatus.textContent =
      error instanceof Error ? error.message : t("routeError");
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
  return new Intl.DateTimeFormat(getLocale(), {
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
    day.textContent =
      index === 0
        ? t("today")
        : new Intl.DateTimeFormat(getLocale(), {
            weekday: "short",
            timeZone: "UTC",
          }).format(date);
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
      `${condition.text}, ${t("high")} ${high.textContent}, ${t("low")} ${low.textContent}`,
    );
    temperatures.append(high, low);
    card.append(day, icon, temperatures);
    fragment.append(card);
  }

  elements.forecastList.replaceChildren(fragment);
}

function renderWeather(place, data) {
  const current = data.current;
  weatherContext = { place, current, daily: data.daily, data };
  elements.assistantMicrophone.disabled = !speechRecognition;
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
  if (window.speechSynthesis?.speaking) window.speechSynthesis.cancel();
  resetSpeechStatus(t("weatherUpdatedSpeech"));
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

elements.assistantSpeak.addEventListener("click", toggleWeatherSpeech);
elements.assistantMicrophone.addEventListener("click", toggleVoiceRecognition);
elements.languageSelect.addEventListener("change", (event) => {
  changeLanguage(event.target.value);
});

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
    elements.routeStatus.textContent = t("routeEmpty");
    return;
  }
  if (origin.toLocaleLowerCase() === destination.toLocaleLowerCase()) {
    elements.routeStatus.textContent = t("routeSamePlace");
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
  resetSpeechStatus(t("loadingWeather"));
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
      error instanceof Error ? error.message : t("pageWeatherError");
    elements.assistantVoiceMessage.textContent = t("pageWeatherError");
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

async function initialize() {
  elements.searchInput.value = "桃園";
  try {
    const places = await searchPlaces(DEFAULT_CITY);
    const taoyuan = getPreferredPlace(places);
    if (!taoyuan || taoyuan.country_code !== "TW") {
      throw new Error(t("defaultCityError"));
    }
    await loadWeather(taoyuan);
  } catch (error) {
    if (error.name === "AbortError") return;
    elements.currentCard.setAttribute("aria-busy", "false");
    elements.locationDetail.textContent = t("pageWeatherError");
    elements.pageMessage.textContent =
      error instanceof Error ? error.message : t("pageWeatherError");
  }
}

applyTranslations();
initialize();
