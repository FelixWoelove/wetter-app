import React, { useState, useEffect } from 'react';
import '../styles/Weather.css';


const fetchWeather = async (cityName, apiKey) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  console.log(data);
  return data;
};

const WeatherApi = ({ cityName }) => {
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = "5bd3d97b7e5090c4891ea3a60f450ad4";

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

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Weather in {cityName}</h2>
      <p>Temperature: {weatherData.main.temp}°C</p>
      <p>Description: {weatherData.weather[0].description}</p>
      <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} alt="Weather icon" />
    </div>
  );
};

export default WeatherApi;