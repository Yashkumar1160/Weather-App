import "./WeatherCard.css"

const WeatherCard = ({ data }) => {
  const { name, country, temp, feels_like, humidity, wind_speed, description, icon } = data

  return (
    <div className="weather-card">
      <div className="weather-header">
        <h2>
          {name}, {country}
        </h2>
        <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt={description} className="weather-icon" />
      </div>

      <div className="weather-temp">
        <h1>{Math.round(temp)}°C</h1>
        <p className="weather-description">{description}</p>
      </div>

      <div className="weather-details">
        <div className="detail">
          <span className="label">Feels like:</span>
          <span className="value">{Math.round(feels_like)}°C</span>
        </div>
        <div className="detail">
          <span className="label">Humidity:</span>
          <span className="value">{humidity}%</span>
        </div>
        <div className="detail">
          <span className="label">Wind:</span>
          <span className="value">{wind_speed} m/s</span>
        </div>
      </div>
    </div>
  )
}

export default WeatherCard
