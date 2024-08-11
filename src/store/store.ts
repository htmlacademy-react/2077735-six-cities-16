import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import currentCityReducer from './slices/current-city';
import offersReducer from './slices/offers';
import offerReducer from './slices/offer';
import authReducer from './slices/auth';

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

export const store = configureStore({
  reducer: {
    city: currentCityReducer,
    offers: offersReducer,
    offer: offerReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
