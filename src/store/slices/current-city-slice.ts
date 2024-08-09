import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { City } from '../../types';
import { LOCATIONS } from '../../const';
import { RootState } from '../store';

export interface CurrentCityState {
  currentCity: City;
}

//TODO: can I use locationsList here, or should it be a constant?
const initialState: CurrentCityState = {
  currentCity: LOCATIONS[0],
};

export const currentCitySlice = createSlice({
  name: 'current-city',
  initialState,
  reducers: {
    currentCityChanged: (state, action: PayloadAction<City>) => {
      state.currentCity = action.payload;
    },
  },
});

export const selectCurrentCity = (state: RootState) => state.city.currentCity;

// TODO: do I need this selector?

// export const selectLocationsList = (state: RootState) => {
//   const offersList = state.offers.offers;
//   const offersByCityList = selectOffersGroupedByCity(state);
//   const citiesNamesList = Object.keys(offersByCityList);

//   return citiesNamesList.map((cityName) => {
//     const cityByName = offersList.find((offer) => offer.city.name === cityName);
//     return {
//       name: cityName,
//       location: cityByName!.city.location,
//     };
//   });
// };

export const { currentCityChanged } = currentCitySlice.actions;
export default currentCitySlice.reducer;
