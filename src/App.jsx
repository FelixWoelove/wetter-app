import React, { useEffect, useState } from "react";
import Navbar from "./components/Layout/Navbar";
import Sidebar from "./components/Layout/Sidebar";
import Weather from "./components/Weather";
// Import from the hooks index file
import { useWeather, useFavorites, useSettings } from "./hooks";
import "./App.css";
import "./styles/Icons.css"; // Import the Icons CSS file

const App = () => {
  const { darkMode, language, toggleDarkMode, changeLanguage } = useSettings();
  const { city, setCity, weather, error, loading, fetchWeatherByCity, fetchWeatherByLocation } = useWeather(language);
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const [sidebarAnimated, setSidebarAnimated] = React.useState(false);

  const apiKey = import.meta.env.VITE_API_KEY;

  // Ensure weather data is correctly added to favorites
  const handleAddToFavorites = () => {
    if (weather && weather.name) {
      // Make sure all required data is present
      const favoriteData = {
        id: weather.id,
        name: weather.name,
        country: weather.sys?.country || '',
        temp: weather.main?.temp,
        weather: weather.weather?.[0] || { id: 800, main: "Clear", description: "clear sky" }
      };
      
      addToFavorites(favoriteData);
    }
  };

  // Delay sidebar animation to prevent stretching
  useEffect(() => {
    const timer = setTimeout(() => {
      setSidebarAnimated(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`dashboard ${darkMode ? "dark-mode" : "light-mode"}`}>
      {/* Sidebar Component with controlled animation */}
      <div className={`sidebar ${sidebarAnimated ? 'fade-in-left' : ''}`}>
        <Sidebar 
          favorites={favorites} 
          language={language} 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode} 
          fetchWeatherByCity={fetchWeatherByCity} 
          removeFromFavorites={removeFromFavorites}
          apiKey={apiKey}
        />
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Navbar Component with slide-in animation */}
        <Navbar 
          city={city} 
          setCity={setCity} 
          language={language} 
          changeLanguage={changeLanguage} 
          fetchWeatherByCity={fetchWeatherByCity} 
          fetchWeatherByLocation={fetchWeatherByLocation}
          className="slide-in-top" 
        />

        {/* Dashboard Content */}
        <div className="dashboard-content fade-in">
          <Weather 
            weather={weather} 
            loading={loading} 
            error={error} 
            language={language}
            onAddFavorite={handleAddToFavorites}
            className="bounce-in"
          />
        </div>

        {/* Dashboard Footer */}
        <footer className="dashboard-footer fade-in">
          <p>© {new Date().getFullYear()} WeatherHub24. {language === "de" ? "Alle Rechte vorbehalten." : "All rights reserved."}</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
