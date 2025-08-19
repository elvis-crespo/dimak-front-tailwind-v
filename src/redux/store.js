import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userReducer';
import themeReducer from "./themeReducer";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
  },
});