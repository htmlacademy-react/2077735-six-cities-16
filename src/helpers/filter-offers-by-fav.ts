import { Offer } from '../types';

export function filterOffersByFav(offersArray: Offer[]) {
  return offersArray.filter((offer) => offer.isFavorite);
}
