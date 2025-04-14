import React from "react";
import "../styles/Weather.css";
import WeatherIcon from "./WeatherIcon.jsx";

const Weather = ({ weather, language, onAddToFavorites }) => {
  if (!weather) return null;

  const { name, main, weather: weatherData } = weather;
  const weatherCondition = weatherData[0].description;

  const addFavoriteText = language === "de" ? "Zu Favoriten hinzufügen" : "Add to favorites";
  const temperatureLabel = language === "de" ? "Temperatur" : "Temperature";
  const feelsLikeLabel = language === "de" ? "Gefühlt wie" : "Feels like";
  const humidityLabel = language === "de" ? "Luftfeuchtigkeit" : "Humidity";
  
  return (
    <div className="weather-container">
      <div className="current-weather">
        <h2 className="city-name">{name}</h2>
        <div className="weather-icon">
          <WeatherIcon condition={weatherCondition} />
        </div>
        <p className="weather-condition">{weatherCondition}</p>
        <p className="temperature">
          {temperatureLabel}: {Math.round(main.temp)}°C
        </p>
        <p>
          {feelsLikeLabel}: {Math.round(main.feels_like)}°C
        </p>
        <p>
          {humidityLabel}: {main.humidity}%
        </p>
        <button onClick={onAddToFavorites} className="favorite-btn">
          {addFavoriteText}
        </button>
      </div>
    </div>
  );
};

export default Weather;