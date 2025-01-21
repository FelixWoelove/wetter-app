import React, { useEffect, useState } from "react";
import "../styles/Icons.css";
import "../styles/Weather.css";

const Weather = ({ city, language }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const apiKey = "5bd3d97b7e5090c4891ea3a60f450ad4";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

  useEffect(() => {
    const fetchWeather = async () => {
      if (!city) return;
      try {
        const response = await fetch(
          `${apiUrl}?q=${city}&appid=${apiKey}&units=metric&lang=${language}`
        );
        if (!response.ok) {
          throw new Error("City not found");
        }
        const data = await response.json();
        setWeather(data);
        setError(null);
      } catch (err) {
        setError(language === "de" ? "Stadt nicht gefunden" : "City not found");
        setWeather(null);
      }
    };

    fetchWeather();
  }, [city, language]);

  return (
    <div className="weather-container">
      {error && <p>{error}</p>}
      {weather ? (
        <>
          <h2>{weather.name}</h2>
          <p>
            {language === "de" ? "Temperatur" : "Temperature"}:{" "}
            {weather.main.temp}°C
          </p>
          <p>
            {language === "de" ? "Beschreibung" : "Description"}:{" "}
            {weather.weather[0].description}
          </p>
          {/* <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt="weather icon"
          /> */}
          <div className="iconContainer">
            <div className="partly_cloudy">
              <div className="partly_cloudy__sun"></div> <div className="partly_cloudy__cloud"></div>
            </div>
          </div>
        </>
      ) : (
        !error && (
          <p>
            {language === "de"
              ? "Bitte eine Stadt auswählen."
              : "Please select a city."}
          </p>
        )
      )}
    </div>
  );
};

export default Weather;





