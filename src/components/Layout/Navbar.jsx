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
        <div className="search-container">
          <Search
            city={city}
            setCity={setCity}
            language={language}
            onSearch={() => fetchWeatherByCity()}
            fetchWeatherByLocation={fetchWeatherByLocation}
          />
        </div>
      </div>
      
      <div className="nav-center">
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
