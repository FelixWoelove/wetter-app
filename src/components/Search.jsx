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
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSearch();
    }
  }

  return (
    <div className="search-form">
      <input
        type="text"
        value={city}
        onChange={handleCityChange}
        onKeyDown={handleKeyDown}
        placeholder={language === "de" ? "Stadt suchen..." : "Search city..."}
      />
      <button onClick={handleSearch}>
        {language === "de" ? "Suchen" : "Search"}
      </button>
      <button onClick={fetchWeatherByLocation} className="location-button">
        {language === "de" ? "Standort verwenden" : "Use Location"}
      </button>
    </div>
  );
};

export default Search;