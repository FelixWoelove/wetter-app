import React from 'react';
import Search from '../Search';

const Navbar = ({ 
  city, 
  setCity, 
  language, 
  changeLanguage, 
  fetchWeatherByCity, 
  fetchWeatherByLocation 
}) => {
  return (
    <nav className="top-navbar">
      <div className="nav-left">
        <h2 className="nav-title">
          {language === "de" ? "Wetter Dashboard" : "Weather Dashboard"}
        </h2>
        <p className="nav-date">
          {new Date().toLocaleDateString(
            language === "de" ? "de-DE" : "en-US", 
            { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
          )}
        </p>
      </div>
      
      <div className="nav-center">
        <div className="search-location-container">
          <Search
            city={city}
            setCity={setCity}
            language={language}
            onSearch={() => fetchWeatherByCity()}
          />
          <button 
            type="button" 
            className="location-button"
            onClick={fetchWeatherByLocation}
            aria-label={language === "de" ? "Aktuellen Standort verwenden" : "Use current location"}
          >
            <i className="fas fa-location-arrow location-icon"></i>
            <span>{language === "de" ? "Standort" : "Location"}</span>
          </button>
        </div>
      </div>
      
      <div className="nav-controls">
        <select
          className="language-select"
          value={language}
          onChange={changeLanguage}
          aria-label={language === "de" ? "Sprache wählen" : "Select language"}
        >
          <option value="de">Deutsch</option>
          <option value="en">English</option>
        </select>
        <div className="user-profile">
          <i className="fas fa-user-circle mr-2"></i>
          <span className="user-greeting">
            {language === "de" ? "Willkommen" : "Welcome"}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
