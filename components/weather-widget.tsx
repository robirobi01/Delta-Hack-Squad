import { CloudSun, Cloud, CloudRain, Sun, Wind, Droplets } from "lucide-react"

const weatherData = [
  { day: "Today", temp: 28, condition: "Partly Cloudy", icon: CloudSun, humidity: 75 },
  { day: "Tue", temp: 30, condition: "Sunny", icon: Sun, humidity: 65 },
  { day: "Wed", temp: 27, condition: "Cloudy", icon: Cloud, humidity: 80 },
  { day: "Thu", temp: 25, condition: "Rain", icon: CloudRain, humidity: 90 },
  { day: "Fri", temp: 26, condition: "Rain", icon: CloudRain, humidity: 85 },
  { day: "Sat", temp: 29, condition: "Partly Cloudy", icon: CloudSun, humidity: 70 },
  { day: "Sun", temp: 31, condition: "Sunny", icon: Sun, humidity: 60 },
]

export function WeatherWidget() {
  const today = weatherData[0]
  const forecast = weatherData.slice(1)

  return (
    <div className="rounded-2xl border border-[#2D5016]/10 bg-white p-6">
      <h3 className="mb-4 font-serif text-lg font-semibold text-[#2D5016]">Weather Forecast</h3>

      {/* Current Weather */}
      <div className="mb-6 flex items-center justify-between rounded-xl bg-gradient-to-br from-[#2D5016] to-[#4A7C23] p-6 text-white">
        <div>
          <p className="text-sm text-white/80">Rangpur District</p>
          <p className="font-serif text-4xl font-bold">{today.temp}°C</p>
          <p className="mt-1 text-white/90">{today.condition}</p>
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
          <div key={index} className="rounded-lg bg-[#FAF8F5] p-2 text-center">
            <p className="text-xs font-medium text-[#8B7355]">{day.day}</p>
            <day.icon className="mx-auto my-2 h-6 w-6 text-[#2D5016]" />
            <p className="font-semibold text-[#2D5016]">{day.temp}°</p>
          </div>
        ))}
      </div>

      {/* Weather Alert */}
      <div className="mt-4 flex items-start gap-3 rounded-lg border-l-4 border-[#E8A838] bg-[#E8A838]/10 p-3">
        <Wind className="mt-0.5 h-5 w-5 shrink-0 text-[#E8A838]" />
        <div>
          <p className="text-sm font-medium text-[#2D5016]">Weather Alert</p>
          <p className="text-xs text-[#8B7355]">
            Rain expected Thursday-Friday. Consider harvesting dry crops before Wednesday.
          </p>
        </div>
      </div>
    </div>
  )
}
