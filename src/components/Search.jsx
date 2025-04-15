import React from 'react';

const Search = ({ city, setCity, language, onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
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
    </form>
  );
};

export default Search;