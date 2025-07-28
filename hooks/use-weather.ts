import { useState, useCallback } from "react"

interface WeatherData {
  current: {
    temperature_2m: number
    apparent_temperature: number
    relative_humidity_2m: number
    wind_speed_10m: number
    weather_code: number
    is_day: boolean
    visibility?: number
  }
  daily: {
    temperature_2m_max: number[]
    temperature_2m_min: number[]
    weather_code: number[]
  }
}

export function useWeather() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchWeather = useCallback(async (lat: number, lon: number) => {
    setIsLoading(true)
    setError(null)

    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,relative_humidity_2m,is_day,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=7`

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`)
      }

      const data = await response.json()

      if (!data.current || !data.daily) {
        throw new Error("Datos del clima incompletos")
      }

      setWeatherData(data)
    } catch (err) {
      console.error("Error fetching weather:", err)
      setError(err instanceof Error ? err.message : "Error al obtener datos del clima")
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    weatherData,
    isLoading,
    error,
    fetchWeather,
  }
}
