import { useState, useEffect } from "react"
import { SearchInput } from "./components/SearchInput"
import { CurrentWeather } from "./components/CurrentWeather"
import { WeatherForecast } from "./components/WeatherForecast"
import { LoadingSpinner } from "./components/LoadingSpinner"
import { ErrorMessage } from "./components/ErrorMessage"
import { useWeather } from "./hooks/useWeather"

function App() {
  const [location, setLocation] = useState<{ lat: number; lon: number; city: string } | null>(null)
  const [isLoadingLocation, setIsLoadingLocation] = useState(true)
  const { weatherData, isLoading, error, fetchWeather } = useWeather()

  // Automatically detect location on load
  useEffect(() => {
    const detectLocation = async () => {
      try {
        // Try browser geolocation
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords

              // Use coordinates directly without reverse geocoding for now
              const locationData = {
                lat: latitude,
                lon: longitude,
                city: "Tu ubicación",
              }
              setLocation(locationData)
              fetchWeather(latitude, longitude)
              setIsLoadingLocation(false)
            },
            async () => {
              const defaultLocation = { lat: -31.6333, lon: -60.7000, city: "Santa Fe" }
              setLocation(defaultLocation)
              fetchWeather(defaultLocation.lat, defaultLocation.lon)
              setIsLoadingLocation(false)
            },
            {
              timeout: 10000,
              enableHighAccuracy: false,
              maximumAge: 300000,
            },
          )
        } else {
          const defaultLocation = { lat: -31.6333, lon: -60.7000, city: "Santa Fe" }
          setLocation(defaultLocation)
          fetchWeather(defaultLocation.lat, defaultLocation.lon)
          setIsLoadingLocation(false)
        }
      } catch (error) {
        const defaultLocation = { lat: -31.6333, lon: -60.7000, city: "Santa Fe" }
        setLocation(defaultLocation)
        fetchWeather(defaultLocation.lat, defaultLocation.lon)
        setIsLoadingLocation(false)
      }
    }
    detectLocation()
  }, [fetchWeather])

  if (isLoadingLocation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] opacity-10"></div>
        <div className="relative z-10">
          <LoadingSpinner />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] opacity-10"></div>
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-6 max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">Clima App</h1>
            <p className="text-gray-300">Pronóstico del tiempo</p>
          </div>

          <SearchInput setLocation={setLocation} fetchWeather={fetchWeather} />

          {isLoading && <LoadingSpinner />}

          {error && (
            <ErrorMessage
              message={error}
              onRetry={() => {
                if (location) {
                  fetchWeather(location.lat, location.lon)
                }
              }}
            />
          )}

          {location && weatherData && (
            <div className="space-y-4">
              <CurrentWeather weatherData={weatherData} location={location} />
              <WeatherForecast weatherData={weatherData} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
