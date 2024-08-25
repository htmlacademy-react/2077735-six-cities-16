import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { City } from '../../types';
import { LOCATIONS } from '../../const';
import { RootState } from '../store';

export interface CurrentCityState {
  currentCity: City;
}

const initialState: CurrentCityState = {
  currentCity: LOCATIONS[0],
};

export const currentCitySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    currentCityChanged: (state, action: PayloadAction<City>) => {
      state.currentCity = action.payload;
    },
  },
});

export const selectCurrentCity = (state: Pick<RootState, 'city'>) => state.city.currentCity;
export const { currentCityChanged } = currentCitySlice.actions;
