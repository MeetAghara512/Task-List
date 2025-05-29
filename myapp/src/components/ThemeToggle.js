// src/components/ThemeToggle.js
import React from 'react';
import { useAppContext } from '../useContext/AppContext';

const ThemeToggle = () => {
  const { darkMode, toggleDarkMode } = useAppContext();

  return (
    <button
      onClick={toggleDarkMode}
      className="
        bg-gray-200 dark:bg-gray-700 
        text-gray-800 dark:text-gray-200 
        px-4 py-2 rounded-lg 
        shadow 
        hover:bg-gray-300 dark:hover:bg-gray-600 
        transition-all duration-300 
        transform hover:scale-105 
        focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
        text-sm md:text-base
        select-none cursor-pointer
      "
      aria-label="Toggle Dark Mode"
      type="button"
    >
      {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
    </button>
  );
};

export default ThemeToggle;
