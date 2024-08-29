import { useMemo } from 'react';
import { useAppSelector } from '../store/hooks';

import type { LocationName, Offer } from '../types';
import {
  selectOffers,
  selectOffersRequestStatus,
} from '../store/slices/offers';
import { RequestStatus } from '../const';

export default function useCityOffers(cityName: LocationName) {
  const requestStatus = useAppSelector(selectOffersRequestStatus);
  const isLoading = requestStatus === RequestStatus.Loading;

  const offers = useAppSelector(selectOffers);

  const offersByCity = useMemo(
    () =>
      offers.reduce((result: { [key: string]: Offer[] }, offer) => {
        if (!result[offer.city.name]) {
          result[offer.city.name] = [offer];
        } else {
          result[offer.city.name].push(offer);
        }

        return result;
      }, {}),
    [offers]
  );

  const currentOffers = offersByCity[cityName] || [];

  return {
    hasOffers: Boolean(currentOffers.length),
    isLoading,
    offers: currentOffers,
  };
}
