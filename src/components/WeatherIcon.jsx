import React from 'react';

const WeatherIcon = ({ iconCode, description }) => {
  // Map OpenWeatherMap icon codes to FontAwesome icons and animation classes
  const getIconConfig = (code) => {
    // First two characters of the code represent the weather condition
    // Last character is 'd' for day or 'n' for night
    const condition = code.substring(0, 2);
    const isDay = code.charAt(2) === 'd';
    
    // Map of conditions to icons and animation classes
    const iconMap = {
      '01': { // clear sky
        icon: isDay ? 'sun' : 'moon',
        animation: isDay ? 'rotating-sun' : 'glowing-moon',
        color: isDay ? '#ffa726' : '#fdd835'
      },
      '02': { // few clouds
        icon: isDay ? 'cloud-sun' : 'cloud-moon',
        animation: 'floating-cloud',
        color: isDay ? '#90a4ae' : '#78909c'
      },
      '03': { // scattered clouds
        icon: 'cloud',
        animation: 'floating-cloud',
        color: '#90a4ae'
      },
      '04': { // broken clouds
        icon: 'clouds',
        animation: 'floating-clouds',
        color: '#78909c'
      },
      '09': { // shower rain
        icon: 'cloud-showers-heavy',
        animation: 'raining',
        color: '#546e7a'
      },
      '10': { // rain
        icon: isDay ? 'cloud-sun-rain' : 'cloud-moon-rain',
        animation: 'raining',
        color: '#546e7a'
      },
      '11': { // thunderstorm
        icon: 'bolt',
        animation: 'lightning',
        color: '#fdd835'
      },
      '13': { // snow
        icon: 'snowflake',
        animation: 'snowing',
        color: '#e0e0e0'
      },
      '50': { // mist
        icon: 'smog',
        animation: 'pulsing-mist',
        color: '#b0bec5'
      }
    };

    return iconMap[condition] || {
      icon: 'cloud',
      animation: 'floating-cloud',
      color: '#90a4ae'
    };
  };

  const iconConfig = getIconConfig(iconCode);

  return (
    <div className="weather-icon-wrapper" aria-label={description}>
      <i 
        className={`fas fa-${iconConfig.icon} weather-animated-icon ${iconConfig.animation}`}
        style={{ color: iconConfig.color }}
      ></i>
    </div>
  );
};

export default WeatherIcon;