import { SORTING_OPTION } from '../const';

import type { Offer, SortingOption } from '../types';

export function getSortedOffers(offers: Offer[], sortOption: SortingOption) {
  const sortingRules = {
    [SORTING_OPTION.DEFAULT]: () => 1,
    [SORTING_OPTION.LOW_PRICE_FIRST]: (offerA: Offer, offerB: Offer) =>
      offerA.price - offerB.price,
    [SORTING_OPTION.HIGH_PRICE_FIRST]: (offerA: Offer, offerB: Offer) =>
      offerB.price - offerA.price,
    [SORTING_OPTION.TOP_RATED_FIRST]: (offerA: Offer, offerB: Offer) =>
      offerB.rating - offerA.rating,
  };

  return offers.sort(sortingRules[sortOption]);
}
