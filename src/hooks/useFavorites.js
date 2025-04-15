import { useState, useEffect } from "react";

const STORAGE_KEY = "weatherHub24_favorites";

/**
 * Custom hook to manage the favorites functionality with localStorage persistence
 * @returns {Object} favorites state and functions to manage favorites
 */
const useFavorites = () => {
  // Always declare all hooks at the top level, in the same order
  const [favorites, setFavorites] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem(STORAGE_KEY);
      if (storedFavorites) {
        const parsedFavorites = JSON.parse(storedFavorites);
        if (Array.isArray(parsedFavorites)) {
          setFavorites(parsedFavorites);
          console.log("Loaded favorites from storage:", parsedFavorites.length);
        }
      }
    } catch (error) {
      console.error("Error loading favorites from localStorage:", error);
      // Recover by setting empty array and clearing storage
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    // Don't use early returns in useEffect if possible
    if (isInitialized) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
        console.log("Saved favorites to storage:", favorites.length);
      } catch (error) {
        console.error("Error saving favorites to localStorage:", error);
      }
    }
  }, [favorites, isInitialized]);

  /**
   * Add a city to favorites if it doesn't already exist
   * @param {Object} cityData - The city data to add to favorites
   */
  const addToFavorites = (cityData) => {
    if (!cityData || !cityData.name) {
      console.warn("Cannot add invalid city data to favorites");
      return;
    }

    setFavorites((prev) => {
      // Check if city is already in favorites
      const exists = prev.some((item) => 
        (item.id && cityData.id && item.id === cityData.id) || 
        (item.name === cityData.name && item.country === cityData.country)
      );
      
      if (exists) {
        console.log("City already in favorites:", cityData.name);
        return prev;
      }
      
      const newFavorite = {
        id: cityData.id,
        name: cityData.name,
        country: cityData.country || '',
        temp: cityData.temp,
        weather: cityData.weather
      };
      
      console.log("Adding to favorites:", newFavorite.name);
      return [...prev, newFavorite];
    });
  };

  /**
   * Remove a city from favorites by id or name
   * @param {string|number} idOrName - The city id or name to remove
   */
  const removeFromFavorites = (idOrName) => {
    setFavorites((prev) => {
      const filtered = prev.filter((item) => {
        // If we're dealing with a number (ID), compare directly
        if (typeof idOrName === 'number') {
          return item.id !== idOrName;
        }
        // Otherwise compare by name (string)
        return item.name !== idOrName;
      });
      
      console.log(`Removed ${prev.length - filtered.length} item(s) from favorites`);
      return filtered;
    });
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites
  };
};

export default useFavorites;
