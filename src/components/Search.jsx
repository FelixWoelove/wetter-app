import React from "react";

const Search = ({ city, setCity, language, onSearch, fetchWeatherByLocation }) => {
  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSearch = () => {
    if (city.trim()) {
      onSearch();
      setCity("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const placeholderText = language === "de" ? "Stadt eingeben..." : "Enter city name...";
  const searchButtonText = language === "de" ? "Suchen" : "Search";
  const locationButtonText = language === "de" ? "Aktuellen Standort verwenden" : "Use Current Location";

  return (
    <div className="search-form" role="search">
      <label htmlFor="city-search" className="sr-only">
        {placeholderText}
      </label>
      <input
        id="city-search"
        type="text"
        value={city}
        onChange={handleCityChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholderText}
        aria-label={placeholderText}
      />
      <button 
        onClick={handleSearch}
        aria-label={searchButtonText}
        disabled={!city.trim()}
      >
        {searchButtonText}
      </button>
      <button 
        onClick={fetchWeatherByLocation} 
        className="location-button"
        aria-label={locationButtonText}
      >
        {locationButtonText}
      </button>
    </div>
  );
};

export default Search;