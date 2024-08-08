import { useAppSelector } from '../store/hooks';
import {
  selectOffers,
  selectOffersGroupedByCity,
} from '../store/slices/offers-slice';

export const useLocationsList = () => {
  const offers = useAppSelector(selectOffers);
  const offersByCityList = useAppSelector(selectOffersGroupedByCity);
  const citiesNamesList = Object.keys(offersByCityList);

  const locationsList = citiesNamesList.map((cityName) => {
    const cityByName = offers.find((offer) => offer.city.name === cityName);
    return {
      name: cityName,
      location: cityByName!.city.location,
    };
  });

  return locationsList;
};
