import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudDrizzle, Cloudy, Moon, CloudMoon } from "lucide-react"

interface WeatherIconProps {
  weatherCode: number
  isDay: boolean
  size?: "small" | "medium" | "large"
}

export function WeatherIcon({ weatherCode, isDay, size = "medium" }: WeatherIconProps) {
  const sizeClasses = {
    small: "w-8 h-8",
    medium: "w-12 h-12",
    large: "w-16 h-16",
  }

  const getWeatherIcon = () => {
    // Códigos de clima de Open Meteo
    switch (weatherCode) {
      case 0: // Cielo despejado
        return isDay ? (
          <Sun className={`${sizeClasses[size]} text-yellow-400`} />
        ) : (
          <Moon className={`${sizeClasses[size]} text-blue-200`} />
        )

      case 1: // Principalmente despejado
      case 2: // Parcialmente nublado
        return isDay ? (
          <Sun className={`${sizeClasses[size]} text-yellow-400`} />
        ) : (
          <CloudMoon className={`${sizeClasses[size]} text-blue-200`} />
        )

      case 3: // Nublado
        return <Cloudy className={`${sizeClasses[size]} text-gray-400`} />

      case 45: // Niebla
      case 48: // Niebla con escarcha
        return <Cloud className={`${sizeClasses[size]} text-gray-500`} />

      case 51: // Llovizna ligera
      case 53: // Llovizna moderada
      case 55: // Llovizna densa
        return <CloudDrizzle className={`${sizeClasses[size]} text-blue-400`} />

      case 61: // Lluvia ligera
      case 63: // Lluvia moderada
      case 65: // Lluvia fuerte
      case 80: // Chubascos ligeros
      case 81: // Chubascos moderados
      case 82: // Chubascos fuertes
        return <CloudRain className={`${sizeClasses[size]} text-blue-500`} />

      case 71: // Nieve ligera
      case 73: // Nieve moderada
      case 75: // Nieve fuerte
      case 85: // Chubascos de nieve ligeros
      case 86: // Chubascos de nieve fuertes
        return <CloudSnow className={`${sizeClasses[size]} text-blue-200`} />

      case 95: // Tormenta
      case 96: // Tormenta con granizo ligero
      case 99: // Tormenta con granizo fuerte
        return <CloudLightning className={`${sizeClasses[size]} text-purple-400`} />

      default:
        return <Cloud className={`${sizeClasses[size]} text-gray-400`} />
    }
  }

  return <div className="flex justify-center">{getWeatherIcon()}</div>
}
