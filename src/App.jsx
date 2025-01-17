import React, { useState } from 'react';
import Search from './components/Search';
import WeatherApi from './api/WeatherApi';
import Weather from './components/Weather';
import Favorites from './components/Favorites';
import './App.css';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('de');
  const [city, setCity] = useState('');
  const [temperature, setTemperature] = useState(null);
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('');
  const [favorites, setFavorites] = useState([]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const changeLanguage = (event) => {
    setLanguage(event.target.value);
  };

  const handleSearch = (cityName) => {
    setCity(cityName);
  };

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
      <header className="app-header">
        <h1>Wetter-App</h1>
        <div className="header-controls">
          <button onClick={toggleDarkMode}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          <select value={language} onChange={changeLanguage}>
            <option value="de">Deutsch</option>
            <option value="en">English</option>
          </select>
        </div>
      </header>
      <main className="app-main">
        <Search onSearch={handleSearch} />
        {city && <WeatherApi cityName={city} />}
        {city && (
          <Weather 
            city={city} 
            temperature={temperature} 
            description={description} 
            icon={icon} 
          />
        )}
        <Favorites favorites={favorites} />
      </main>
      <footer className="app-footer">
        <p>&copy; 2023 Wetter-App</p>
      </footer>
    </div>
  );
};

export default App;