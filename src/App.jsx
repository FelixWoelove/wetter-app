import React, { useState } from "react";
import Search from "./components/Search";
import Weather from "./components/Weather";
import "./App.css";


const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("de");
  const [city, setCity] = useState("");

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
          <select id="language-select" value={language} onChange={changeLanguage}>
            <option value="de">Deutsch</option>
            <option value="en">English</option>
          </select>
        </div>
      </header>
      <main className="app-main">
        <Search city={city} setCity={setCity} language={language} />
        <Weather city={city} language={language} />
      </main>
      <footer className="app-footer">
        <p>&copy; 2025 WeatherHub</p>
      </footer>
    </div>
  );
};

export default App;




