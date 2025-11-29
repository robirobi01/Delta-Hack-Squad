
import { useState, useEffect } from "react"
import { CloudSun, Cloud, CloudRain, Sun, Wind, Droplets } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { fetchLiveWeather, WeatherDataItem } from "@/services/weatherApiService"

// Static fallback data for compatibility
export const weatherData = [
  {
    day: "Today",
    dayBn: "আজ",
    temp: 28,
    condition: "Partly Cloudy",
    conditionBn: "আংশিক মেঘলা",
    icon: CloudSun,
    humidity: 75,
  },
  { day: "Tue", dayBn: "মঙ্গল", temp: 30, condition: "Sunny", conditionBn: "রোদ্রজ্জ্বল", icon: Sun, humidity: 65 },
  { day: "Wed", dayBn: "বুধ", temp: 27, condition: "Cloudy", conditionBn: "মেঘলা", icon: Cloud, humidity: 80 },
  { day: "Thu", dayBn: "বৃহ", temp: 25, condition: "Rain", conditionBn: "বৃষ্টি", icon: CloudRain, humidity: 90 },
  { day: "Fri", dayBn: "শুক্র", temp: 26, condition: "Rain", conditionBn: "বৃষ্টি", icon: CloudRain, humidity: 85 },
  {
    day: "Sat",
    dayBn: "শনি",
    temp: 29,
    condition: "Partly Cloudy",
    conditionBn: "আংশিক মেঘলা",
    icon: CloudSun,
    humidity: 70,
  },
  { day: "Sun", dayBn: "রবি", temp: 31, condition: "Sunny", conditionBn: "রোদ্রজ্জ্বল", icon: Sun, humidity: 60 },
]

interface WeatherWidgetProps {
  location?: string;
}

export function WeatherWidget({ location = "Rangpur" }: WeatherWidgetProps) {
  const { language } = useLanguage()
  const isEn = language === "en"

  const [liveWeatherData, setLiveWeatherData] = useState<WeatherDataItem[]>(weatherData)
  const [locationName, setLocationName] = useState(location)

  useEffect(() => {
    const loadWeather = async () => {
      if (!location) return;

      try {
        const data = await fetchLiveWeather(location)
        setLiveWeatherData(data)
        setLocationName(location)
      } catch (error) {
        console.error('Failed to load weather:', error)
      }
    }

    loadWeather()
  }, [location])

  const today = liveWeatherData[0]
  const forecast = liveWeatherData.slice(1)

  // Dynamic Theme Helper
  const getWeatherTheme = (condition: string) => {
    const lower = condition.toLowerCase()
    if (lower.includes('rain')) return { bg: "from-blue-500 to-slate-600", iconClass: "animate-bounce" }
    if (lower.includes('sun') || lower.includes('clear')) return { bg: "from-amber-400 to-orange-500", iconClass: "animate-spin-slow" }
    if (lower.includes('cloud')) return { bg: "from-slate-400 to-gray-500", iconClass: "animate-pulse" }
    return { bg: "from-emerald-600 to-emerald-700", iconClass: "" }
  }

  const theme = getWeatherTheme(today.condition)

  return (
    <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
      <h3 className="mb-4 font-serif text-lg font-semibold text-emerald-800">
        {isEn ? "Weather Forecast" : "আবহাওয়ার পূর্বাভাস"}
      </h3>

      {/* Current Weather - Animated */}
      <div className={`mb-6 flex flex-col sm:flex-row items-center justify-between rounded-xl bg-gradient-to-br ${theme.bg} p-6 text-white shadow-lg transition-all duration-500`}>
        <div className="text-center sm:text-left">
          <p className="text-sm text-white/90 font-medium tracking-wide">
            {isEn ? `${locationName} District` : `${locationName} জেলা`}
          </p>
          <p className="font-serif text-5xl font-bold mt-2">{today.temp}°C</p>
          <p className="mt-1 text-lg font-medium text-white/95">{isEn ? today.condition : today.conditionBn}</p>
        </div>
        <div className="text-right mt-4 sm:mt-0 flex flex-col items-center sm:items-end">
          <today.icon className={`mb-2 h-20 w-20 text-white drop-shadow-lg ${theme.iconClass}`} />
          <div className="flex items-center gap-2 text-sm text-white/90 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
            <Droplets className="h-4 w-4" />
            <span>{today.humidity}% {isEn ? "Humidity" : "আর্দ্রতা"}</span>
          </div>
        </div>
      </div>

      {/* 6-day Forecast */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {forecast.map((day, index) => {
          const dayTheme = getWeatherTheme(day.condition)
          return (
            <div key={index} className={`flex flex-col items-center rounded-xl p-3 text-center border border-white/20 shadow-sm transition-all hover:scale-105 hover:shadow-md group bg-gradient-to-br ${dayTheme.bg}`}>
              <p className="text-xs font-medium text-white/90 mb-2">{isEn ? day.day : day.dayBn}</p>
              <day.icon className={`h-8 w-8 text-white mb-2 transition-transform group-hover:scale-110 drop-shadow-md ${dayTheme.iconClass}`} />
              <p className="font-bold text-white text-lg">{day.temp}°</p>
            </div>
          )
        })}
      </div>

      {/* Weather Alert */}
      <div className="mt-6 flex items-start gap-3 rounded-xl border-l-4 border-amber-500 bg-amber-50 p-4 shadow-sm">
        <Wind className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 animate-pulse" />
        <div>
          <p className="text-sm font-bold text-emerald-900">{isEn ? "Weather Alert" : "আবহাওয়া সতর্কতা"}</p>
          <p className="text-xs text-gray-700 mt-1 leading-relaxed">
            {isEn
              ? "Rain expected Thursday-Friday. Consider harvesting dry crops before Wednesday."
              : "বৃহস্পতি-শুক্রবার বৃষ্টি প্রত্যাশিত। বুধবারের আগে শুকনো ফসল কাটার কথা বিবেচনা করুন।"}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </div>
  )
}
