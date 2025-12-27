'use client';

import { useEffect, useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleTheme, setIsDark, setThemeMode } from '@/store/slices/themeSlice';

export default function ThemeToggle() {
  const dispatch = useAppDispatch();
  const { isDark, mode } = useAppSelector((state) => state.theme);
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme-mode');
    
    if (savedTheme === 'dark') {
      dispatch(setThemeMode('dark'));
      dispatch(setIsDark(true));
      document.documentElement.classList.add('dark');
    } else if (savedTheme === 'light') {
      dispatch(setThemeMode('light'));
      dispatch(setIsDark(false));
      document.documentElement.classList.remove('dark');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      dispatch(setThemeMode('system'));
      dispatch(setIsDark(prefersDark));
      if (prefersDark) {
        document.documentElement.classList.add('dark');
      }
    }
  }, [dispatch]);

  // Listen for system theme changes
  useEffect(() => {
    if (mode !== 'system') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      dispatch(setIsDark(e.matches));
      if (e.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [mode, dispatch]);

  const handleToggle = useCallback(() => {
    dispatch(toggleTheme());
    
    // Get the new state after toggle
    const newIsDark = !isDark;
    
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme-mode', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme-mode', 'light');
    }
  }, [dispatch, isDark]);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <button
        className="p-2 rounded-lg bg-card-bg border border-card-border"
        aria-label="Toggle theme"
        disabled
      >
        <div className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      className="p-2 rounded-lg bg-card-bg border border-card-border hover:bg-card-border/50 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        // Sun icon - shown in dark mode (to switch to light)
        <svg
          className="w-5 h-5 text-yellow-500 transition-transform duration-300 hover:rotate-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        // Moon icon - shown in light mode (to switch to dark)
        <svg
          className="w-5 h-5 text-slate-700 transition-transform duration-300 hover:rotate-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </button>
  );
}
