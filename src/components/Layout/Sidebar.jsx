import React from "react";
import "../../styles/Icons.css"; // Import the Icons CSS file

// Helper function to determine the weather icon class
const getWeatherIconClass = (weatherCondition) => {
  if (!weatherCondition || !weatherCondition.id) return "cloudy";
  
  const id = String(weatherCondition.id);
  
  // Clear sky
  if (id === "800") return "sunny";
  
  // Clouds
  if (id.startsWith("80")) return "partly_cloudy";
  
  // Rain, drizzle
  if (id.startsWith("5") || id.startsWith("3")) return "rainy";
  
  // Thunderstorm
  if (id.startsWith("2")) return "thundery";
  
  // Snow, mist, fog, etc.
  return "cloudy";
};

const Sidebar = ({ favorites = [], language, darkMode, toggleDarkMode, fetchWeatherByCity, removeFromFavorites }) => {
  const handleFavoriteClick = (cityName) => {
    if (cityName) {
      console.log("Fetching weather for favorite:", cityName);
      fetchWeatherByCity(cityName);
    }
  };

  // Ensure favorites is always an array
  const safetyFavorites = Array.isArray(favorites) ? favorites : [];

  return (
    <>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <div className="logo-icon">
          <i className="fas fa-cloud-sun"></i>
        </div>
        <h1>WeatherHub24</h1>
      </div>

      {/* Sidebar Content */}
      <div className="sidebar-content">
        <div className="sidebar-section">
          <h3>{language === "de" ? "Favoriten" : "Favorites"}</h3>
          {safetyFavorites.length > 0 ? (
            <div className="favorites-list">
              {safetyFavorites.map((favorite) => (
                <div
                  key={favorite.id || favorite.name} 
                  className="favorite-item"
                  onClick={() => handleFavoriteClick(favorite.name)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div>
                        <p><strong>{favorite.name}</strong> {favorite.country && `(${favorite.country})`}</p>
                        <p>{Math.round(favorite.temp)}°C</p>
                      </div>
                      {/* Fixed icon container with proper dimensions */}
                      <div className="forecast-icon">
                        <div className="icon-wrapper small-icon-container">
                          {getWeatherIconClass(favorite.weather) === "sunny" && (
                            <div className="sunny"></div>
                          )}
                          {getWeatherIconClass(favorite.weather) === "partly_cloudy" && (
                            <div className="partly_cloudy">
                              <div className="partly_cloudy__sun"></div>
                              <div className="partly_cloudy__cloud"></div>
                            </div>
                          )}
                          {getWeatherIconClass(favorite.weather) === "cloudy" && (
                            <div className="cloudy"></div>
                          )}
                          {getWeatherIconClass(favorite.weather) === "rainy" && (
                            <div className="rainy">
                              <div className="rainy__cloud"></div>
                              <div className="rainy__rain"></div>
                            </div>
                          )}
                          {getWeatherIconClass(favorite.weather) === "thundery" && (
                            <div className="thundery">
                              <div className="thundery__cloud"></div>
                              <div className="thundery__rain"></div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <button 
                      className="delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromFavorites(favorite.id || favorite.name);
                      }}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>{language === "de" ? "Keine Favoriten gespeichert." : "No favorites saved."}</p>
          )}
        </div>
      </div>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        <button className="btn-theme" onClick={toggleDarkMode}>
          {darkMode ? (
            <>
              <i className="fas fa-sun"></i>
              {language === "de" ? "Light Mode" : "Light Mode"}
            </>
          ) : (
            <>
              <i className="fas fa-moon"></i>
              {language === "de" ? "Dark Mode" : "Dark Mode"}
            </>
          )}
        </button>
      </div>
    </>
  );
};

export default Sidebar;


