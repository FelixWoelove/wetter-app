import { useState, useEffect } from 'react';

// Change to explicit function declaration with default export
export default function useSettings() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true" || 
      window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const [language, setLanguage] = useState(() => 
    localStorage.getItem("language") || "en"
  );

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    localStorage.setItem("language", language);
  }, [darkMode, language]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const changeLanguage = (event) => {
    setLanguage(event.target.value);
  };

  return {
    darkMode,
    language,
    toggleDarkMode,
    changeLanguage
  };
}
