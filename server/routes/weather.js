const express = require("express")
const axios = require("axios")
const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const { city } = req.query

    if (!city) {
      return res.status(400).json({ message: "City parameter is required" })
    }

    const API_KEY = process.env.OPENWEATHER_API_KEY

    if (!API_KEY) {
      return res.status(500).json({ message: "API key not configured" })
    }

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
    )

    const weatherData = {
      name: response.data.name,
      country: response.data.sys.country,
      temp: response.data.main.temp,
      feels_like: response.data.main.feels_like,
      humidity: response.data.main.humidity,
      wind_speed: response.data.wind.speed,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
    }

    res.json(weatherData)
  } catch (error) {
    console.error("Error fetching weather data:", error.message)

    if (error.response && error.response.status === 404) {
      return res.status(404).json({ message: "City not found" })
    }

    res.status(500).json({ message: "Failed to fetch weather data" })
  }
})

module.exports = router
