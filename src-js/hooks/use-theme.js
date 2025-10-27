import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useTheme() {
  const [theme, setTheme] = useState('light');
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  
  // Initialize theme from localStorage or system preference
  useEffect(() => {
    if (isLandingPage) {
      // Always use light theme on landing page
      document.documentElement.classList.remove('dark');
      return;
    }
    
    const savedTheme = localStorage.getItem('theme') || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, [isLandingPage]);
  
  // Toggle between light and dark theme (disabled for landing page)
  const toggleTheme = () => {
    if (isLandingPage) return;
    
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };
  
  // Return theme state (always 'light' on landing page)
  return { 
    theme: isLandingPage ? 'light' : theme, 
    toggleTheme,
    isDarkModeDisabled: isLandingPage
  };
}
