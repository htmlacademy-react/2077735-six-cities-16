import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { currentCitySlice } from './slices/city';
import { offersSlice } from './slices/offers';
import { offerSlice } from './slices/offer';
import { reviewsSlice } from './slices/reviews';
import { authSlice } from './slices/auth';
import { favoritesSlice } from './slices/favorites';

import { createAPI } from '../services/api';

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;

export const api = createAPI();

const reducer = combineReducers({
  [currentCitySlice.name]: currentCitySlice.reducer,
  [favoritesSlice.name]: favoritesSlice.reducer,
  [offerSlice.name]: offerSlice.reducer,
  [offersSlice.name]: offersSlice.reducer,
  [reviewsSlice.name]: reviewsSlice.reducer,
  [authSlice.name]: authSlice.reducer,
});

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
  reducer,
});
