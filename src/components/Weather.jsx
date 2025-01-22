import React from "react";
import "../styles/Icons.css";
import "../styles/Weather.css";
import skylineImage from "../assets/skyline.png";

const Weather = ({
  city,
  language,
  weather,
  loading,
  error,
  fetchWeatherByLocation,
}) => {
  const wetter = weather?.weather?.[0];

  return (
    <div className="weather-container">
      {loading && <p>{language === "de" ? "Lädt..." : "Loading..."}</p>}
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
            {wetter?.description}
          </p>
          <div className="iconContainer">
            {wetter.icon === "01d" || wetter.icon === "01n" ? (
              <div className="sunny"></div>
            ) : null}
            {wetter.icon === "02d" || wetter.icon === "02n" ? (
              <div class="partly_cloudy">
                <div class="partly_cloudy__sun"></div>
                <div class="partly_cloudy__cloud"></div>
              </div>
            ) : null}
            {wetter.icon === "03d" || wetter.icon === "03n" ? (
              <div className="cloudy"></div>
            ) : null}
            {wetter.icon === "04d" || wetter.icon === "04n" ? (
              <div className="cloudy"></div>
            ) : null}
            {wetter.icon === "09d" || wetter.icon === "09n" ? (
              <div className="rainy">
                <div class="rainy__cloud"></div>
                <div class="rainy__rain"></div>
              </div>
            ) : null}
            {wetter.icon === "10d" || wetter.icon === "10n" ? (
              <div className="rainy">
                <div class="rainy__cloud"></div>
                <div class="rainy__rain"></div>
              </div>
            ) : null}
            {wetter.icon === "11d" || wetter.icon === "11n" ? (
              <div class="thundery">
                <div class="thundery__cloud"></div>
                <div class="thundery__rain"></div>
              </div>
            ) : null}

            {wetter.icon === "13d" || wetter.icon === "13n" ? (
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                alt="weather icon"
              />
            ) : null}
            {wetter.icon === "50d" || wetter.icon === "50n" ? (
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                alt="weather icon"
              />
            ) : null}
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
     
      <div className="skyline">
        <img src={skylineImage} alt="Skyline" />
      </div>
    </div>
  );
};

export default Weather;