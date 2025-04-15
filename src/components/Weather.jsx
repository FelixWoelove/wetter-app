import React, { useEffect, useState } from "react";
import "../styles/Weather.css";
import "../styles/Icons.css"; // Import the Icons CSS file

// This function maps weather conditions to the appropriate icon class
const getWeatherIconClass = (weatherCode) => {
  // Convert to string to ensure we can work with it
  const code = String(weatherCode);
  
  // Clear sky
  if (code === "800") return "sunny";
  
  // Clouds
  if (code.startsWith("80")) return "partly_cloudy"; // 801-804 are various cloud conditions
  
  // Rain, drizzle
  if (code.startsWith("5") || code.startsWith("3")) return "rainy";
  
  // Thunderstorm
  if (code.startsWith("2")) return "thundery";
  
  // Snow, mist, fog, etc.
  return "cloudy";
};

// Helper to format time from Unix timestamp
const formatTime = (timestamp, language) => {
  if (!timestamp) return '';
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString(language === 'de' ? 'de-DE' : 'en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: language !== 'de'
  });
};

// Helper to get wind direction text
const getWindDirection = (degrees, language) => {
  // Direction abbreviations in English and German
  const directions = language === 'de' 
    ? ['N', 'NO', 'O', 'SO', 'S', 'SW', 'W', 'NW'] 
    : ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
};

const Weather = ({ weather, loading, error, language, onAddFavorite, className }) => {
  // Add an animated class state
  const [isAnimated, setIsAnimated] = useState(false);
  
  // Enable animations after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  
  if (loading) {
    return (
      <div className={`weather-container ${className || ""}`}>
        <div className="weather-loading">
          <div className="loading-spinner"></div>
          <p>{language === "de" ? "Wetter wird geladen..." : "Loading weather..."}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`weather-container ${className || ""}`}>
        <div className="weather-error">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className={`weather-container ${className || ""}`}>
        <div className="weather-placeholder">
          <div className="iconContainer animated-placeholder">
            <div className="partly_cloudy">
              <div className="partly_cloudy__sun"></div>
              <div className="partly_cloudy__cloud"></div>
            </div>
          </div>
          <p>
            {language === "de"
              ? "Suche nach einer Stadt, um das aktuelle Wetter zu sehen."
              : "Search for a city to see current weather conditions."}
          </p>
        </div>
      </div>
    );
  }

  // Get the correct icon class based on weather condition code
  const iconClass = getWeatherIconClass(weather.weather[0].id);

  return (
    <div className={`weather-container ${className || ""}`}>
      {/* Main Weather Card */}
      <div className={`current-weather ${isAnimated ? 'animate-active' : ''}`}>
        <h2 className="city-name">
          {weather.name}, {weather.sys.country}
        </h2>
        
        <div className="weather-icon">
          <div className={`icon-wrapper weather-icon-size ${isAnimated ? 'icon-animated' : ''}`}>
            {iconClass === "sunny" && (
              <div className="sunny rotating-element"></div>
            )}
            {iconClass === "partly_cloudy" && (
              <div className="partly_cloudy floating-element">
                <div className="partly_cloudy__sun"></div>
                <div className="partly_cloudy__cloud"></div>
              </div>
            )}
            {iconClass === "cloudy" && (
              <div className="cloudy floating-element"></div>
            )}
            {iconClass === "rainy" && (
              <div className="rainy rain-animation">
                <div className="rainy__cloud"></div>
                <div className="rainy__rain"></div>
              </div>
            )}
            {iconClass === "thundery" && (
              <div className="thundery thunder-animation">
                <div className="thundery__cloud"></div>
                <div className="thundery__rain"></div>
              </div>
            )}
          </div>
        </div>
        
        <p className="temperature">
          {Math.round(weather.main.temp)}°C
        </p>
        <p className="weather-condition">
          {weather.weather[0].description}
        </p>
        <p>
          {language === "de" ? "Gefühlt wie" : "Feels like"}: {Math.round(weather.main.feels_like)}°C
        </p>
        <button onClick={onAddFavorite} className="favorite-btn">
          {language === "de" ? "Zu Favoriten hinzufügen" : "Add to Favorites"}
        </button>
      </div>

      {/* Weather Details Card */}
      <div className="weather-details-card card">
        <h3>{language === "de" ? "Wetterdetails" : "Weather Details"}</h3>
        <div className="details-grid">
          <div className="detail-item">
            <span className="detail-label">{language === "de" ? "Luftfeuchtigkeit" : "Humidity"}</span>
            <span className="detail-value">{weather.main.humidity}%</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">{language === "de" ? "Wind" : "Wind"}</span>
            <span className="detail-value">
              {Math.round(weather.wind.speed * (language === "de" ? 3.6 : 2.237))} 
              {language === "de" ? " km/h" : " mph"}
              {weather.wind.deg && ` ${getWindDirection(weather.wind.deg, language)}`}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">{language === "de" ? "Luftdruck" : "Pressure"}</span>
            <span className="detail-value">{weather.main.pressure} hPa</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">{language === "de" ? "Sichtweite" : "Visibility"}</span>
            <span className="detail-value">{Math.round(weather.visibility / 1000)} km</span>
          </div>
        </div>
      </div>

      {/* Sun Card (Sunrise/Sunset) */}
      <div className="sun-card card">
        <h3>{language === "de" ? "Sonnenaufgang & Sonnenuntergang" : "Sunrise & Sunset"}</h3>
        <div className="sun-times">
          <div className="sun-item">
            <i className="fas fa-sun animated-sun"></i>
            <span>{language === "de" ? "Sonnenaufgang" : "Sunrise"}</span>
            <span className="sun-time">{formatTime(weather.sys.sunrise, language)}</span>
          </div>
          <div className="sun-item">
            <i className="fas fa-moon animated-moon"></i>
            <span>{language === "de" ? "Sonnenuntergang" : "Sunset"}</span>
            <span className="sun-time">{formatTime(weather.sys.sunset, language)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;