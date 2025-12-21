'use client';

import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleTheme, setThemeMode, setIsDark } from '@/store/slices/themeSlice';
import { ThemeMode } from '@/types';

export function useTheme() {
  const dispatch = useAppDispatch();
  const { mode, isDark } = useAppSelector((state) => state.theme);

  const toggle = useCallback(() => {
    dispatch(toggleTheme());
    
    const newIsDark = !isDark;
    if (typeof window !== 'undefined') {
      if (newIsDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme-mode', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme-mode', 'light');
      }
    }
  }, [dispatch, isDark]);

  const setMode = useCallback((newMode: ThemeMode) => {
    dispatch(setThemeMode(newMode));
    
    if (typeof window !== 'undefined') {
      if (newMode === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        dispatch(setIsDark(prefersDark));
        localStorage.removeItem('theme-mode');
        if (prefersDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } else {
        const isDarkMode = newMode === 'dark';
        dispatch(setIsDark(isDarkMode));
        localStorage.setItem('theme-mode', newMode);
        if (isDarkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    }
  }, [dispatch]);

  return {
    mode,
    isDark,
    toggle,
    setMode,
  };
}

export default useTheme;
