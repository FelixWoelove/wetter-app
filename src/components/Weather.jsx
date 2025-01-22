import React, { useEffect, useState } from "react";
import "../styles/Icons.css";
import "../styles/Weather.css";
import skylineImage from "../assets/skyline.png";

const Weather = ({ city, language }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const apiKey = "5bd3d97b7e5090c4891ea3a60f450ad4";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

  const fetchWeather = async (url) => {
    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          language === "de" ? "Stadt nicht gefunden" : "City not found"
        );
      }
      const data = await response.json();
      setWeather(data);
      setError(null);
    } catch (err) {
      setError(language === "de" ? "Stadt nicht gefunden" : "City not found");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCity = () => {
    if (!city) return;
    const url = `${apiUrl}?q=${city}&appid=${apiKey}&units=metric&lang=${language}`;
    fetchWeather(url);
  };
  const fetchWeatherByLocation = () => {
    if (!navigator.geolocation) {
      setError(
        language === "de"
          ? "Geolocation wird nicht unterstützt."
          : "Geolocation is not supported."
      );
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const url = `${apiUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=${language}`;
        fetchWeather(url);
      },
      () => {
        setError(
          language === "de"
            ? "Standort nicht verfügbar."
            : "Location not available."
        );
      }
    );
  };

  useEffect(() => {
    fetchWeatherByLocation();
  }, []);

  const wetter = weather?.weather?.[0];

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
