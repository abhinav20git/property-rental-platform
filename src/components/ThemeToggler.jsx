"use client"
// src/components/ThemeToggler.tsx

import { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggler = () => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Set initial theme
    document.documentElement.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
    setTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-4 right-4 p-3 rounded-full bg-gray-800 dark:bg-gray-200 text-white dark:text-black shadow-lg"
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? <FaSun size={24} /> : <FaMoon size={24} />}
    </button>
  );
};

export default ThemeToggler;
