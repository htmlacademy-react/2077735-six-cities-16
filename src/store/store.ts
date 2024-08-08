import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import currentCityReducer from './slices/current-city-slice';
import offersReducer from './slices/offers-slice';

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;

export const store = configureStore({
  reducer: {
    city: currentCityReducer,
    offers: offersReducer,
  },
});
