import { useMemo } from 'react';
import { useAppSelector } from '../store/hooks';

import type { LocationName } from '../types';
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
    () => Object.groupBy(offers, ({ city: { name } }) => name),
    [offers]
  );
  const currentOffers = offersByCity[cityName] || [];

  return {
    hasOffers: Boolean(currentOffers.length),
    isLoading,
    offers: currentOffers,
  };
}
