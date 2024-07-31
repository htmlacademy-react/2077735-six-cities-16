import { Offer } from '../types';

export function filterOffersByCity(offers: Offer[], cityName: string) {
  return offers.filter((offer) => offer.city.name === cityName);
}
