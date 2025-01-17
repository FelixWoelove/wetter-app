import React from 'react';

const Weather = ({ city, temperature, description, icon }) => {
  return (
    <div className="weather-container">
      <h2>{city}</h2>
      <p>Temperature: {temperature}°C</p>
      <p>Description: {description}</p>
      <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt="weather icon" />
    </div>
  );
};

export default Weather;