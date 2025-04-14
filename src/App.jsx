import React, { useState, useEffect } from "react";
import Search from "./components/Search";
import Weather from "./components/Weather";
import Favorites from "./components/Favorites";
import "./App.css";

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Check preferred color scheme or saved preference
    return localStorage.getItem("darkMode") === "true" || 
      window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [language, setLanguage] = useState(() => 
    localStorage.getItem("language") || "en"
  );
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("favorites");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const apiKey = import.meta.env.VITE_API_KEY;
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

  useEffect(() => {
    // Save preferences to localStorage
    localStorage.setItem("darkMode", darkMode);
    localStorage.setItem("language", language);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [darkMode, language, favorites]);

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

  const fetchWeatherByCity = (cityName = city) => {
    if (!cityName) return;
    const url = `${apiUrl}?q=${cityName}&appid=${apiKey}&units=metric&lang=${language}`;
    fetchWeather(url);
  };

  const fetchWeatherByLocation = () => {
    if (!navigator.geolocation) {
      setError(
        language === "de"
          ? "Geolokalisierung wird nicht unterstützt"
          : "Geolocation is not supported"
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
            ? "Standortzugriff wurde verweigert"
            : "Location access was denied"
        );
      }
    );
  };

  const addToFavorites = (cityName) => {
    if (!cityName || favorites.includes(cityName)) return;
    setFavorites([...favorites, cityName]);
  };

  const removeFromFavorites = (index) => {
    const updated = [...favorites];
    updated.splice(index, 1);
    setFavorites(updated);
  };

  useEffect(() => {
    // Fetch weather on language change for current displayed weather
    if (weather?.name) {
      fetchWeatherByCity(weather.name);
    }
  }, [language]);

  useEffect(() => {
    // Initial weather fetch on load
    fetchWeatherByLocation();
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const changeLanguage = (event) => {
    setLanguage(event.target.value);
  };

  const darkModeText = darkMode
    ? language === "de" ? "Heller Modus" : "Light Mode"
    : language === "de" ? "Dunkler Modus" : "Dark Mode";

  return (
    <div className={`app-container ${darkMode ? "dark-mode" : ""}`}>
      <header className="app-header">
        <h1>WeatherHub24</h1>
        <Search
          city={city}
          setCity={setCity}
          language={language}
          onSearch={() => fetchWeatherByCity()}
          fetchWeatherByLocation={fetchWeatherByLocation}
        />
        <div className="header-controls">
          <button 
            id="toggle-dark-mode" 
            onClick={toggleDarkMode}
            aria-pressed={darkMode}
          >
            {darkModeText}
          </button>
          <select
            id="language-select"
            value={language}
            onChange={changeLanguage}
            aria-label={language === "de" ? "Sprache wählen" : "Select language"}
          >
            <option value="de">Deutsch</option>
            <option value="en">English</option>
          </select>
        </div>
      </header>
      
      <main className="app-main">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {weather && !error && (
              <Weather
                language={language}
                weather={weather}
                loading={loading}
                error={error}
                onAddToFavorites={() => addToFavorites(weather.name)}
              />
            )}
            
            {error && (
              <div className="weather-error" role="alert">
                <p>{error}</p>
              </div>
            )}
            
            {loading && (
              <div className="weather-loading">
                <p>{language === "de" ? "Lädt..." : "Loading..."}</p>
              </div>
            )}
            
            {!weather && !error && !loading && (
              <div className="weather-container">
                <p className="text-center text-gray-500">
                  {language === "de" 
                    ? "Suchen Sie nach einer Stadt oder verwenden Sie Ihren Standort, um das Wetter anzuzeigen."
                    : "Search for a city or use your location to display weather information."
                  }
                </p>
              </div>
            )}
          </div>
          
          <div>
            <Favorites 
              favorites={favorites} 
              language={language}
              onFavoriteClick={fetchWeatherByCity}
              onFavoriteRemove={removeFromFavorites}
            />
          </div>
        </div>
      </main>
      
      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} WeatherHub24</p>
      </footer>
    </div>
  );
};

export default App;