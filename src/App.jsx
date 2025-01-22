import React, { useState, useEffect } from "react";
import Search from "./components/Search";
import Weather from "./components/Weather";
import "./App.css";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("de");
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiKey = import.meta.env.VITE_API_KEY;
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
          ? "Geolocation nicht unterstützt"
          : "Geolocation not supported"
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
            ? "Standortzugriff verweigert"
            : "Location access denied"
        );
      }
    );
  };

  useEffect(() => {
    fetchWeatherByLocation(); // Fetch weather on page load
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const changeLanguage = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <div className={`app-container ${darkMode ? "dark-mode" : ""}`}>
      <header className="app-header">
        <h1>WeatherHub</h1>
        <Search
          city={city}
          setCity={setCity}
          language={language}
          onSearch={fetchWeatherByCity}
          fetchWeatherByLocation={fetchWeatherByLocation}
        />
        <div className="header-controls">
          <button id="toggle-dark-mode" onClick={toggleDarkMode}>
            {darkMode
              ? language === "de"
                ? "Heller Modus"
                : "Light Mode"
              : language === "de"
              ? "Dunkler Modus"
              : "Dark Mode"}
          </button>
          <select
            id="language-select"
            value={language}
            onChange={changeLanguage}
          >
            <option value="de">Deutsch</option>
            <option value="en">English</option>
          </select>
        </div>
      </header>
      <main className="app-main">
        <Weather
          city={city}
          language={language}
          weather={weather}
          loading={loading}
          error={error}
          fetchWeatherByCity={fetchWeatherByCity}
          fetchWeatherByLocation={fetchWeatherByLocation}
        />
      </main>
      <footer className="app-footer">
        <p>&copy; 2025 WeatherHub</p>
      </footer>
    </div>
  );
};

export default App;