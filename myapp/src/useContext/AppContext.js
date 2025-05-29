import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [sections, setSections] = useState([]);

  // Dark mode state: default to system preference or false
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Optional: Sync dark mode class on <html> or <body> for Tailwind
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const addSection = (title) => {
    setSections([...sections, { id: Date.now(), title, tasks: [] }]);
  };

  const addTask = (sectionId, taskText) => {
    setSections(prev =>
      prev.map(section =>
        section.id === sectionId
          ? { ...section, tasks: [...section.tasks, { id: Date.now(), text: taskText }] }
          : section
      )
    );
  };

  const removeTask = (sectionId, taskId) => {
    setSections(prev =>
      prev.map(section =>
        section.id === sectionId
          ? { ...section, tasks: section.tasks.filter(task => task.id !== taskId) }
          : section
      )
    );
  };

  const toggleTask = (sectionId, taskId) => {
    setSections(prevSections =>
      prevSections.map(section => {
        if (section.id !== sectionId) return section;

        const updatedTasks = section.tasks.map(task =>
          task.id === taskId ? { ...task, done: !task.done } : task
        );

        return {
          ...section,
          tasks: updatedTasks,
        };
      })
    );
  };

  const removeSection = (sectionId) => {
    setSections(prev => prev.filter(section => section.id !== sectionId));
  };

  return (
    <AppContext.Provider
      value={{
        sections,
        addSection,
        addTask,
        removeTask,
        toggleTask,
        removeSection,
        darkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
