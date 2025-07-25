import { WeatherIcon } from "./WeatherIcon"
import { Wind, Droplets, Thermometer, Eye } from "lucide-react"

interface CurrentWeatherProps {
  weatherData: any
  location: { lat: number; lon: number; city: string }
}

export function CurrentWeather({ weatherData, location }: CurrentWeatherProps) {
  if (!weatherData?.current) return null

  const current = weatherData.current
  const daily = weatherData.daily

  return (
    <div className="glass-dark rounded-3xl p-6 mb-4">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-white mb-1">{location.city}</h2>
        <p className="text-gray-400 text-sm">
          {new Date().toLocaleDateString("es-ES", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <div className="flex items-center justify-center mb-6">
        <div className="text-center">
          <WeatherIcon weatherCode={current.weather_code} isDay={current.is_day} size="large" />
          <div className="text-5xl font-light text-white mt-2">{Math.round(current.temperature_2m)}°</div>
          <p className="text-gray-300 mt-1">Sensación térmica {Math.round(current.apparent_temperature)}°</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="glass rounded-2xl p-4 text-center">
          <Wind className="w-6 h-6 text-blue-400 mx-auto mb-2" />
          <p className="text-gray-400 text-sm">Viento</p>
          <p className="text-white font-semibold">{current.wind_speed_10m} km/h</p>
        </div>

        <div className="glass rounded-2xl p-4 text-center">
          <Droplets className="w-6 h-6 text-blue-400 mx-auto mb-2" />
          <p className="text-gray-400 text-sm">Humedad</p>
          <p className="text-white font-semibold">{current.relative_humidity_2m}%</p>
        </div>

        <div className="glass rounded-2xl p-4 text-center">
          <Thermometer className="w-6 h-6 text-red-400 mx-auto mb-2" />
          <p className="text-gray-400 text-sm">Máx/Mín</p>
          <p className="text-white font-semibold">
            {Math.round(daily.temperature_2m_max[0])}° / {Math.round(daily.temperature_2m_min[0])}°
          </p>
        </div>

        <div className="glass rounded-2xl p-4 text-center">
          <Eye className="w-6 h-6 text-purple-400 mx-auto mb-2" />
          <p className="text-gray-400 text-sm">Visibilidad</p>
          <p className="text-white font-semibold">Buena</p>
        </div>
      </div>
    </div>
  )
}
