// src/App.js
import React from 'react';
import { AppProvider } from './useContext/AppContext';
import SectionManager from './components/SectionManager';
import ThemeToggle from './components/ThemeToggle';

function App() {
  return (
    <AppProvider>
      <div
        className="
          min-h-screen 
          bg-gray-100 dark:bg-gray-900 
          text-gray-900 dark:text-white 
          p -6 md:p-10 
          transition-colors duration-700 ease-in-out
          flex flex-col items-center

          
        "
      >
        {/* Flex container for heading and toggle */}
        <div className="w-full max-w-6xl flex items-center justify-between mb-8 px-4">
          <h1
            className="
              text-4xl md:text-5xl font-extrabold
              cursor-default select-none
              transition-all duration-500
              hover:text-blue-500 dark:hover:text-blue-400
              hover:scale-105
              hover:drop-shadow-lg dark:hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.7)]
            "
            title="Task Manager Title"
          >
            <span className="text-red-600 dark:text-red-400 transition-colors duration-500">Task</span>{' '}
            <span className="text-blue-600 dark:text-blue-400 transition-colors duration-500">Manager</span>
          </h1>

          <ThemeToggle />
        </div>

        <div
          className="
            w-full max-w-6xl
            bg-white dark:bg-gray-800 
            rounded-lg 
            shadow-lg 
            p-6 md:p-8
            transition-shadow duration-300
            hover:shadow-2xl
          "
          title="Task Sections Container"
        >
          <SectionManager />
        </div>
      </div>
    </AppProvider>
  );
}

export default App;
