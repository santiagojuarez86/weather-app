import { WeatherIcon } from "./WeatherIcon"

interface WeatherForecastProps {
  weatherData: any
}

export function WeatherForecast({ weatherData }: WeatherForecastProps) {
  if (!weatherData?.daily) return null

  const daily = weatherData.daily
  const next5Days = Array.from({ length: 5 }, (_, i) => i + 1)

  return (
    <div className="glass-dark rounded-3xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Pronóstico de 5 días</h3>

      <div className="space-y-3">
        {next5Days.map((dayIndex) => {
          const date = new Date()
          date.setDate(date.getDate() + dayIndex)

          return (
            <div key={dayIndex} className="glass rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <WeatherIcon weatherCode={daily.weather_code[dayIndex]} isDay={true} size="small" />
                  <div>
                    <p className="text-white font-medium">{date.toLocaleDateString("es-ES", { weekday: "short" })}</p>
                    <p className="text-gray-400 text-sm">
                      {date.toLocaleDateString("es-ES", { month: "short", day: "numeric" })}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-white font-semibold">{Math.round(daily.temperature_2m_max[dayIndex])}°</p>
                  <p className="text-gray-400 text-sm">{Math.round(daily.temperature_2m_min[dayIndex])}°</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
