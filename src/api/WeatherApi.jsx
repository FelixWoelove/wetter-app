import React, { useState, useEffect } from 'react';
import '../styles/Weather.css';

const fetchWeather = async (cityName, apiKey) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};

const WeatherApi = ({ cityName }) => {
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = process.env.API_KEY;

  useEffect(() => {
    const getWeather = async () => {
      try {
        const data = await fetchWeather(cityName, apiKey);
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    if (cityName) {
      getWeather();
    }
  }, [cityName, apiKey]);

  return (
    <div>
      {weatherData ? (
        <div>
          <h1>{weatherData.name}</h1>
          <p>{weatherData.weather[0].description}</p>
          <p>{Math.round(weatherData.main.temp - 273.15)}°C</p>
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default WeatherApi;