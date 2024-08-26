import { SortingOption } from '../const';

import type { Offer, TSortingOption } from '../types';

export function getSortedOffers(offers: Offer[], sortOption: TSortingOption) {
  const sortingRules = {
    [SortingOption.Default]: () => 1,
    [SortingOption.LowPriceFirst]: (offerA: Offer, offerB: Offer) =>
      offerA.price - offerB.price,
    [SortingOption.HighPriceFirst]: (offerA: Offer, offerB: Offer) =>
      offerB.price - offerA.price,
    [SortingOption.TopRatedFirst]: (offerA: Offer, offerB: Offer) =>
      offerB.rating - offerA.rating,
  };

  return offers.toSorted(sortingRules[sortOption]);
}
