import React from "react";

const Search = ({ city, setCity, language }) => {
  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSearch = () => {
    if (city.trim()) {
      alert(
        language === "de"
          ? `Suche nach Wetterdaten für ${city}...`
          : `Searching for weather data in ${city}...`
      );
    }
  };

  return (
    <div className="search-form">
      <input
        type="text"
        value={city}
        onChange={handleCityChange}
        placeholder={language === "de" ? "Stadt suchen..." : "Search city..."}
      />
      <button onClick={handleSearch}>
        {language === "de" ? "Suchen" : "Search"}
      </button>
    </div>
  );
};

export default Search;