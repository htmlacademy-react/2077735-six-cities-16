import { FavoriteStatus, LOCATIONS_NAMES } from './const';
import { CurrentCityState } from './store/slices/city';
import { OffersState } from './store/slices/offers';
import { OfferState } from './store/slices/offer';
import { ReviewsState } from './store/slices/reviews';
import { FavoritesState } from './store/slices/favorites';
import { AuthState } from './store/slices/auth';

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

export type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type AuthData = {
  email: string;
  token: string;
};

export type AuthedUser = User & AuthData;

export type LoginData = {
  email: string;
  password: string;
};

export type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage?: string;
};

export type OfferDetail = Omit<Offer, 'previewImage'> & {
  description: string;
  bedrooms: number;
  goods: string[];
  host: User;
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

export type PostReviewProps = {
  body: {
    comment: string;
    rating: number;
  };
  offerId: string;
};

export type changeFavoriteProps = {
  offerId: string;
  status: FavoriteStatus;
};

export type AuthStatus = 'AUTH' | 'NOT_AUTH' | 'UNKNOWN';
export type SortingOption =
  | 'popular'
  | 'price: low to high'
  | 'price: high to low'
  | 'top rated first';

export type InitialState = {
  city: CurrentCityState;
  offers: OffersState;
  offer: OfferState;
  reviews: ReviewsState;
  favorites: FavoritesState;
  auth: AuthState;
};
