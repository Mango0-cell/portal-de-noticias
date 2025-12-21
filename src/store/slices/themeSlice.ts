import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThemeMode } from '@/types';

interface ThemeState {
  mode: ThemeMode;
  isDark: boolean;
}

const initialState: ThemeState = {
  mode: 'system',
  isDark: false,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
    },
    setIsDark: (state, action: PayloadAction<boolean>) => {
      state.isDark = action.payload;
    },
    toggleTheme: (state) => {
      if (state.mode === 'light') {
        state.mode = 'dark';
        state.isDark = true;
      } else if (state.mode === 'dark') {
        state.mode = 'light';
        state.isDark = false;
      } else {
        // If system, switch to opposite of current
        state.mode = state.isDark ? 'light' : 'dark';
        state.isDark = !state.isDark;
      }
    },
  },
});

export const { setThemeMode, setIsDark, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
