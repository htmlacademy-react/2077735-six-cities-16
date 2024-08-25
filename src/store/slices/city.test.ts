import { initialState } from '../../utils/test-mocks';
import { LOCATIONS } from '../../const';
import {
  currentCityChanged,
  currentCitySlice,
  selectCurrentCity,
} from './city';

describe('City Slice', () => {
  describe('City Selectors', () => {
    const state = { city: { currentCity: LOCATIONS[3] } };

    it('returns current city from the state', () => {
      const { currentCity } = state.city;
      const result = selectCurrentCity(state);

      expect(result).toEqual(currentCity);
    });
  });

  describe('City Reducers', () => {
    it('sets "currentCity" to the new city with "currentCityChanged"', () => {
      const expectedState = {
        currentCity: LOCATIONS[3],
      };
      const result = currentCitySlice.reducer(
        initialState.city,
        currentCityChanged(LOCATIONS[3])
      );

      expect(result).toEqual(expectedState);
    });
  });
});
