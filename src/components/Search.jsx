import React from 'react';

const Search = ({ city, setCity, language, onSearch, fetchWeatherByLocation }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  const handleLocationClick = () => {
    fetchWeatherByLocation();
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-input-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder={language === "de" ? "Stadt suchen..." : "Search for a city..."}
          value={city}
          onChange={(e) => setCity(e.target.value)}
          aria-label={language === "de" ? "Stadt eingeben" : "Enter city"}
        />
        <button 
          type="submit" 
          className="search-button"
          aria-label={language === "de" ? "Suchen" : "Search"}
        >
          <i className="fas fa-search"></i>
        </button>
      </div>
      <button 
        type="button" 
        className="location-button"
        onClick={handleLocationClick}
        aria-label={language === "de" ? "Aktuellen Standort verwenden" : "Use current location"}
      >
        <i className="fas fa-location-arrow location-icon"></i>
        <span>{language === "de" ? "Aktueller Standort" : "Current Location"}</span>
      </button>
    </form>
  );
};

export default Search;