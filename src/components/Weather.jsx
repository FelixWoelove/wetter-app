import React from 'react';

const Weather = ({ weather, language, onAddToFavorites }) => {
  if (!weather) return null;

  const {
    name,
    main: { temp, feels_like, humidity, pressure },
    wind: { speed },
    weather: [{ description, icon }],
    sys: { country }
  } = weather;

  // Format temperature values
  const formatTemp = (temperature) => 
    `${Math.round(temperature)}°C`;

  // Get time with timezone offset
  const currentTime = new Date().toLocaleTimeString(
    language === 'de' ? 'de-DE' : 'en-US',
    { hour: '2-digit', minute: '2-digit' }
  );

  // Translations
  const translations = {
    feelsLike: language === 'de' ? 'Gefühlt wie' : 'Feels like',
    humidity: language === 'de' ? 'Luftfeuchtigkeit' : 'Humidity',
    pressure: language === 'de' ? 'Luftdruck' : 'Pressure',
    wind: language === 'de' ? 'Wind' : 'Wind',
    addToFavorites: language === 'de' ? 'Zu Favoriten hinzufügen' : 'Add to Favorites',
    updatedAt: language === 'de' ? 'Aktualisiert um' : 'Updated at',
  };

  return (
    <div className="weather-container">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            {name}, {country}
            <img
              src={`https://flagsapi.com/${country}/flat/24.png`}
              alt={`${country} flag`}
              className="inline ml-2"
            />
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {translations.updatedAt} {currentTime}
          </p>
        </div>
        <button
          onClick={onAddToFavorites}
          className="mt-2 md:mt-0 px-3 py-1 bg-yellow-600 hover:bg-yellow-500 text-white"
          aria-label={translations.addToFavorites}
        >
          ★ {translations.addToFavorites}
        </button>
      </div>

      <div className="weather-details">
        <div className="flex items-center">
          <img
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt={description}
            className="w-24 h-24"
          />
          <div>
            <p className="text-4xl font-bold">{formatTemp(temp)}</p>
            <p className="capitalize text-gray-700 dark:text-gray-300">{description}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4 md:mt-0">
          <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">{translations.feelsLike}</p>
            <p className="font-semibold">{formatTemp(feels_like)}</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">{translations.humidity}</p>
            <p className="font-semibold">{humidity}%</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">{translations.pressure}</p>
            <p className="font-semibold">{pressure} hPa</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">{translations.wind}</p>
            <p className="font-semibold">{speed} m/s</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;