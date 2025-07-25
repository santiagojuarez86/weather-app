import React, { useState } from "react"
import { Search } from "lucide-react"

interface SearchInputProps {
  setLocation: (location: { lat: number; lon: number; city: string }) => void
  fetchWeather: (lat: number, lon: number) => void
}

export function SearchInput({ setLocation, fetchWeather }: SearchInputProps) {
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const [showDropdown, setShowDropdown] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsSearching(true)
    setShowDropdown(false)
    setResults([])
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          query,
        )}&count=5&language=es&format=json`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        },
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.results && data.results.length > 0) {
        setResults(data.results)
        setShowDropdown(true)
        // No seleccionar ninguna ciudad automáticamente
      } else {
        alert("Ciudad no encontrada. Intenta con otro nombre.")
      }
    } catch (error) {
      console.error("Error buscando ciudad:", error)
      alert("Error al buscar la ciudad. Verifica tu conexión e intenta de nuevo.")
    } finally {
      setIsSearching(false)
    }
  }

  const handleSelect = (result: any) => {
    const locationData = {
      lat: result.latitude,
      lon: result.longitude,
      city: result.name + (result.admin1 ? ", " + result.admin1 : "") + (result.country ? ", " + result.country : ""),
    }
    setLocation(locationData)
    fetchWeather(result.latitude, result.longitude)
    setQuery("")
    setShowDropdown(false)
    setResults([])
  }

  return (
    <form onSubmit={handleSearch} className="mb-6 relative">
      <div className="glass-dark rounded-2xl p-4">
        <div className="flex items-center space-x-3">
          <Search className="text-gray-400 w-5 h-5" />
          <input
            id="search-city-input"
            name="search-city"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar ciudad..."
            className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none w-full h-10 px-2 rounded-md"
            disabled={isSearching}
            onFocus={() => { if (results.length > 0) setShowDropdown(true) }}
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={isSearching || !query.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-xl transition-colors"
          >
            {isSearching ? "..." : "Buscar"}
          </button>
        </div>
      </div>
      {showDropdown && results.length > 0 && (
        <ul className="w-full mt-2 bg-slate-800 border border-gray-700 rounded-xl shadow-lg z-50 max-h-60 overflow-auto">
          {results.map((result, idx) => (
            <li
              key={idx}
              className="px-4 py-2 cursor-pointer hover:bg-blue-600 text-white"
              onClick={() => handleSelect(result)}
            >
              {result.name}
              {result.admin1 ? `, ${result.admin1}` : ""}
              {result.country ? `, ${result.country}` : ""}
            </li>
          ))}
        </ul>
      )}
    </form>
  )
}
