import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./slices/moviesSlice";
import { RootState } from './types';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type AppState = RootState;
