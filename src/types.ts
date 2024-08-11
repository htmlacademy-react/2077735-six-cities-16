import { LOCATIONS_NAMES } from './const';

export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type City = {
  name: LocationName;
  location: Location;
};

export type LocationName = (typeof LOCATIONS_NAMES)[number];

export type Host = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  previewImage: string; //нет в деталях
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
};

export type OfferDetail = Omit<Offer, 'previewImage'> & {
  description: string;
  bedrooms: number;
  goods: string[];
  host: Host;
  images: string[];
  maxAdults: number;
};

export type Review = {
  id: string;
  date: string;
  user: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  comment: string;
  rating: number;
};

export type AuthStatus = 'AUTH' | 'NOT_AUTH' | 'UNKNOWN';
export type SortingOption =
  | 'popular'
  | 'price: low to high'
  | 'price: high to low'
  | 'top rated first';
