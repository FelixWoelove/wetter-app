import { useState, useEffect } from 'react';

// Change to explicit function declaration with default export
export default function useWeather(language) {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiKey = import.meta.env.VITE_API_KEY;
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

  const fetchWeather = async (url) => {
    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          language === "de" ? "Stadt nicht gefunden" : "City not found"
        );
      }
      const data = await response.json();
      setWeather(data);
      setError(null);
    } catch (err) {
      setError(language === "de" ? "Stadt nicht gefunden" : "City not found");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCity = (cityName = city) => {
    if (!cityName) return;
    const url = `${apiUrl}?q=${cityName}&appid=${apiKey}&units=metric&lang=${language}`;
    fetchWeather(url);
  };

  const fetchWeatherByLocation = () => {
    if (!navigator.geolocation) {
      setError(
        language === "de"
          ? "Geolokalisierung wird nicht unterstützt"
          : "Geolocation is not supported"
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const url = `${apiUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=${language}`;
        fetchWeather(url);
      },
      () => {
        setError(
          language === "de"
            ? "Standortzugriff wurde verweigert"
            : "Location access was denied"
        );
      }
    );
  };

  // Refetch weather data when language changes
  useEffect(() => {
    if (weather?.name) {
      fetchWeatherByCity(weather.name);
    }
  }, [language]);

  // Load user's location weather on first render
  useEffect(() => {
    fetchWeatherByLocation();
  }, []);

  return {
    city,
    setCity,
    weather,
    error,
    loading,
    fetchWeatherByCity,
    fetchWeatherByLocation
  };
}
