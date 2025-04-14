import React from 'react';
import '../styles/Icons.css';

const WeatherIcon = ({ condition, size = "large" }) => {
  // Map OpenWeatherMap conditions to our icon classes
  const getIconClass = () => {
    // Convert condition to lowercase for easier matching
    const weatherCondition = condition?.toLowerCase() || '';
    
    if (weatherCondition.includes('thunderstorm') || weatherCondition.includes('thunder')) {
      return 'thundery';
    } else if (weatherCondition.includes('rain') || weatherCondition.includes('drizzle')) {
      return 'rainy';
    } else if (weatherCondition.includes('snow') || weatherCondition.includes('sleet') || 
               weatherCondition.includes('hail')) {
      return 'rainy'; // Use rainy for snow (could be extended with a snow animation)
    } else if (weatherCondition.includes('mist') || weatherCondition.includes('fog') || 
               weatherCondition.includes('haze') || weatherCondition.includes('dust') || 
               weatherCondition.includes('smoke')) {
      return 'cloudy';
    } else if (weatherCondition.includes('clear')) {
      return 'sunny';
    } else if (weatherCondition.includes('cloud') || weatherCondition.includes('overcast')) {
      if (weatherCondition.includes('few') || weatherCondition.includes('scattered')) {
        return 'partly_cloudy';
      } else {
        return 'cloudy';
      }
    }
    
    // Default icon if no match
    return 'partly_cloudy';
  };

  const iconClass = getIconClass();
  const sizeClass = size === 'small' ? 'forecast-icon-size' : 'weather-icon-size';
  
  // Use the proper container class based on size
  const containerClass = size === 'small' ? 'small-icon-container' : 'icon-container';

  // Render the animated icon based on the weather condition
  const renderIcon = () => {
    switch(iconClass) {
      case 'sunny':
        return <div className={`sunny ${sizeClass}`}></div>;
      case 'cloudy':
        return <div className={`cloudy ${sizeClass}`}></div>;
      case 'partly_cloudy':
        return (
          <div className={`partly_cloudy ${sizeClass}`}>
            <div className="partly_cloudy__sun"></div>
            <div className="partly_cloudy__cloud"></div>
          </div>
        );
      case 'rainy':
        return (
          <div className={`rainy ${sizeClass}`}>
            <div className="rainy__cloud"></div>
            <div className="rainy__rain"></div>
          </div>
        );
      case 'thundery':
        return (
          <div className={`thundery ${sizeClass}`}>
            <div className="thundery__cloud"></div>
            <div className="thundery__rain"></div>
          </div>
        );
      default:
        return (
          <div className={`partly_cloudy ${sizeClass}`}>
            <div className="partly_cloudy__sun"></div>
            <div className="partly_cloudy__cloud"></div>
          </div>
        );
    }
  };

  return (
    <div className={`icon-wrapper ${containerClass}`}>
      {renderIcon()}
    </div>
  );
};

export default WeatherIcon;