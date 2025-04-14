// components/Favorites.jsx
import React from 'react';

const Favorites = ({ favorites, language, onFavoriteClick, onFavoriteRemove }) => {
  const title = language === "de" ? "Favoriten" : "Favorites";
  const emptyMessage = language === "de" ? "Keine Favoriten gespeichert" : "No favorites saved";
  
  return (
    <div className="favorites">
      <h2>{title}</h2>
      {favorites.length > 0 ? (
        <ul className="mt-3 space-y-2">
          {favorites.map((city, index) => (
            <li 
              key={`${city}-${index}`}
              className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded"
            >
              <button 
                onClick={() => onFavoriteClick(city)}
                className="text-left text-blue-600 dark:text-blue-400 bg-transparent hover:underline p-0"
                aria-label={language === "de" ? `Wetter für ${city} anzeigen` : `Show weather for ${city}`}
              >
                {city}
              </button>
              <button 
                onClick={() => onFavoriteRemove(index)}
                className="text-red-500 bg-transparent hover:text-red-700 dark:hover:text-red-300 p-1"
                aria-label={language === "de" ? `${city} aus Favoriten entfernen` : `Remove ${city} from favorites`}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 italic mt-2">{emptyMessage}</p>
      )}
    </div>
  );
};

export default Favorites;