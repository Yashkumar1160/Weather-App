
import { useState } from "react"
import axios from "axios"
import SearchBar from "./components/SearchBar"
import WeatherCard from "./components/WeatherCard"
import "./App.css"

function App() {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchWeather = async (city) => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios.get(`http://localhost:5000/weather?city=${encodeURIComponent(city)}`)
      setWeatherData(response.data)
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch weather data")
      setWeatherData(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <div className="container">
        <h1>Weather Dashboard</h1>
        <SearchBar onSearch={fetchWeather} />

        {loading && <div className="loading">Loading weather data...</div>}

        {error && <div className="error">{error}</div>}

        {weatherData && !loading && !error && <WeatherCard data={weatherData} />}
      </div>
    </div>
  )
}

export default App
