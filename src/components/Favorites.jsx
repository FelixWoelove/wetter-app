// components/Favorites.jsx
import React, { useState, useEffect } from 'react';
import WeatherIcon from './WeatherIcon';

const Favorites = ({ favorites, language, onFavoriteClick, onFavoriteRemove, apiKey }) => {
  const [favoritesData, setFavoritesData] = useState({});
  const [loading, setLoading] = useState({});
  const [errors, setErrors] = useState({});
  
  const title = language === "de" ? "Favoriten" : "Favorites";
  const emptyMessage = language === "de" ? "Keine Favoriten gespeichert" : "No favorites saved";
  const errorMessage = language === "de" ? "Fehler beim Laden" : "Failed to load";
  
  // Safely fetch weather data for favorites
  useEffect(() => {
    // Clear old data when favorites change
    setFavoritesData({});
    setLoading({});
    setErrors({});
    
    if (!favorites || favorites.length === 0) return;
    
    // Create a safe function to fetch data that won't cause unhandled promise rejections
    const fetchCityData = async (city) => {
      if (!city || !apiKey) return;
      
      try {
        setLoading(prev => ({ ...prev, [city]: true }));
        
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=${language}`
        );
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Only update state if component is still mounted and the city is still in favorites
        setFavoritesData(prev => ({
          ...prev,
          [city]: {
            temp: Math.round(data.main.temp),
            condition: data.weather[0].description
          }
        }));
        
      } catch (error) {
        console.error(`Error fetching data for ${city}:`, error);
        setErrors(prev => ({
          ...prev,
          [city]: true
        }));
      } finally {
        setLoading(prev => ({ ...prev, [city]: false }));
      }
    };
    
    // Fetch data for each favorite city
    favorites.forEach(city => {
      fetchCityData(city);
    });
    
  }, [favorites, language, apiKey]);
  
  // Render the component with proper error handling
  return (
    <div className="favorites">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      
      {favorites && favorites.length > 0 ? (
        <div className="favorites-list">
          {favorites.map((city, index) => (
            <div 
              key={`${city}-${index}`}
              className="favorite-item bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 rounded-lg mb-3 p-3 transition-all hover:shadow-md"
            >
              <div className="flex items-center justify-between" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <button 
                  onClick={() => onFavoriteClick(city)}
                  className="text-left font-medium text-blue-700 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-200 flex-grow"
                  aria-label={language === "de" ? `Wetter für ${city} anzeigen` : `Show weather for ${city}`}
                >
                  {city}
                </button>
                
                <div className="flex items-center" style={{ display: 'flex', alignItems: 'center' }}>
                  {loading[city] ? (
                    <span className="text-xs text-gray-500 mr-2">
                      {language === "de" ? "Lädt..." : "Loading..."}
                    </span>
                  ) : errors[city] ? (
                    <span className="text-xs text-red-500 mr-2">{errorMessage}</span>
                  ) : favoritesData[city] ? (
                    <div className="flex items-center" style={{ display: 'flex', alignItems: 'center' }}>
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 mr-2">
                        {favoritesData[city].temp}°C
                      </span>
                      <div className="forecast-icon">
                        <WeatherIcon condition={favoritesData[city].condition} size="small" />
                      </div>
                    </div>
                  ) : null}
                  
                  <button 
                    onClick={() => onFavoriteRemove(index)}
                    className="ml-3 text-red-500 hover:text-red-700 dark:hover:text-red-300 p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
                    aria-label={language === "de" ? `${city} aus Favoriten entfernen` : `Remove ${city} from favorites`}
                    style={{ minWidth: '24px', minHeight: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-500 dark:text-gray-400 italic mt-2 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
          {emptyMessage}
        </div>
      )}
    </div>
  );
};

export default Favorites;

