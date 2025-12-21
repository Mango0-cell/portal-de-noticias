import { configureStore } from '@reduxjs/toolkit';
import { newsApi } from './services/newsApi';
import themeReducer from './slices/themeSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      theme: themeReducer,
      [newsApi.reducerPath]: newsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(newsApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
