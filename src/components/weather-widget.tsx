

import { CloudSun, Cloud, CloudRain, Sun, Wind, Droplets } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

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

export function WeatherWidget() {
  const { language } = useLanguage()
  const isEn = language === "en"
  const today = weatherData[0]
  const forecast = weatherData.slice(1)

  return (
    <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
      <h3 className="mb-4 font-serif text-lg font-semibold text-emerald-800">
        {isEn ? "Weather Forecast" : "আবহাওয়ার পূর্বাভাস"}
      </h3>

      {/* Current Weather */}
      <div className="mb-6 flex items-center justify-between rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-700 p-6 text-white shadow-lg">
        <div>
          <p className="text-sm text-white/80">{isEn ? "Rangpur District" : "রংপুর জেলা"}</p>
          <p className="font-serif text-4xl font-bold">{today.temp}°C</p>
          <p className="mt-1 text-white/90">{isEn ? today.condition : today.conditionBn}</p>
        </div>
        <div className="text-right">
          <today.icon className="mb-2 h-16 w-16 text-white/90" />
          <div className="flex items-center gap-1 text-sm text-white/80">
            <Droplets className="h-4 w-4" />
            <span>{today.humidity}%</span>
          </div>
        </div>
      </div>

      {/* 6-day Forecast */}
      <div className="grid grid-cols-6 gap-2">
        {forecast.map((day, index) => (
          <div key={index} className="rounded-lg bg-emerald-50 p-2 text-center">
            <p className="text-xs font-medium text-gray-500">{isEn ? day.day : day.dayBn}</p>
            <day.icon className="mx-auto my-2 h-6 w-6 text-emerald-600" />
            <p className="font-semibold text-emerald-800">{day.temp}°</p>
          </div>
        ))}
      </div>

      {/* Weather Alert */}
      <div className="mt-4 flex items-start gap-3 rounded-lg border-l-4 border-amber-500 bg-amber-50 p-3">
        <Wind className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
        <div>
          <p className="text-sm font-medium text-emerald-800">{isEn ? "Weather Alert" : "আবহাওয়া সতর্কতা"}</p>
          <p className="text-xs text-gray-600">
            {isEn
              ? "Rain expected Thursday-Friday. Consider harvesting dry crops before Wednesday."
              : "বৃহস্পতি-শুক্রবার বৃষ্টি প্রত্যাশিত। বুধবারের আগে শুকনো ফসল কাটার কথা বিবেচনা করুন।"}
          </p>
        </div>
      </div>
    </div>
  )
}
