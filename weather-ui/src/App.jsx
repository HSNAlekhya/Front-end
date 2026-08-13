import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeatherIcon = (code) => {
    if (code === 0) return "☀️";
    if (code === 1 || code === 2) return "🌤️";
    if (code === 3) return "☁️";
    if (code >= 45 && code <= 48) return "🌫️";
    if (code >= 51 && code <= 67) return "🌧️";
    if (code >= 71 && code <= 77) return "❄️";
    if (code >= 80 && code <= 82) return "🌦️";
    if (code >= 95) return "⛈️";

    return "🌤️";
  };

  const getWeatherCondition = (code) => {
    if (code === 0) return "Clear Sky";
    if (code === 1) return "Mainly Clear";
    if (code === 2) return "Partly Cloudy";
    if (code === 3) return "Overcast";

    if (code === 45 || code === 48) {
      return "Foggy";
    }

    if (code >= 51 && code <= 55) {
      return "Drizzle";
    }

    if (code >= 56 && code <= 57) {
      return "Freezing Drizzle";
    }

    if (code >= 61 && code <= 65) {
      return "Rainy";
    }

    if (code >= 66 && code <= 67) {
      return "Freezing Rain";
    }

    if (code >= 71 && code <= 75) {
      return "Snowy";
    }

    if (code === 77) {
      return "Snow Grains";
    }

    if (code >= 80 && code <= 82) {
      return "Rain Showers";
    }

    if (code >= 95) {
      return "Thunderstorm";
    }

    return "Unknown";
  };

  const searchWeather = async (e) => {
    e.preventDefault();

    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Step 1: Find city coordinates
      const locationResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          city
        )}&count=1&language=en&format=json`
      );

      if (!locationResponse.ok) {
        throw new Error("Unable to find city.");
      }

      const locationData = await locationResponse.json();

      if (!locationData.results || locationData.results.length === 0) {
        throw new Error("City not found.");
      }

      const cityData = locationData.results[0];

      // Step 2: Get weather using coordinates
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${cityData.latitude}&longitude=${cityData.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=auto`
      );

      if (!weatherResponse.ok) {
        throw new Error("Unable to get weather data.");
      }

      const weatherData = await weatherResponse.json();

      setLocation(cityData);
      setWeather(weatherData.current);

      setCity("");
    } catch (error) {
      setError(error.message);
      setWeather(null);
      setLocation(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-app">
      <div className="weather-container">

        {/* Header */}

        <header className="header">
          <h1>Weather App</h1>
          <p>Search for live weather anywhere in the world</p>
        </header>

        {/* Search */}

        <form className="search-box" onSubmit={searchWeather}>

          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>

        </form>

        {/* Error */}

        {error && (
          <p className="error">
            {error}
          </p>
        )}

        {/* Weather Card */}

        {weather && location && (
          <div className="weather-card">

            <div className="location">
              <h2>
                {location.name}
              </h2>

              <p>
                {location.admin1
                  ? `${location.admin1}, `
                  : ""}
                {location.country}
              </p>
            </div>

            <div className="weather-main">

              <div className="weather-icon">
                {getWeatherIcon(weather.weather_code)}
              </div>

              <div>

                <div className="temperature">
                  {Math.round(weather.temperature_2m)}°C
                </div>

                <p className="condition">
                  {getWeatherCondition(weather.weather_code)}
                </p>

              </div>

            </div>

            {/* Weather Details */}

            <div className="weather-details">

              <div className="detail-card">

                <span className="detail-icon">
                  🌡️
                </span>

                <div>
                  <p>Feels Like</p>

                  <h3>
                    {Math.round(
                      weather.apparent_temperature
                    )}°C
                  </h3>
                </div>

              </div>

              <div className="detail-card">

                <span className="detail-icon">
                  💧
                </span>

                <div>
                  <p>Humidity</p>

                  <h3>
                    {weather.relative_humidity_2m}%
                  </h3>
                </div>

              </div>

              <div className="detail-card">

                <span className="detail-icon">
                  💨
                </span>

                <div>
                  <p>Wind Speed</p>

                  <h3>
                    {weather.wind_speed_10m} km/h
                  </h3>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* Initial Message */}

        {!weather && !loading && !error && (
          <div className="welcome-card">

            <div className="welcome-icon">
              🌍
            </div>

            <h2>
              Search for a city
            </h2>

            <p>
              Enter any city name above to see
              its current weather.
            </p>

          </div>
        )}

      </div>
    </div>
  );
}

export default App;