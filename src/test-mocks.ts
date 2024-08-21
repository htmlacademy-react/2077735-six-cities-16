import { internet, lorem, name } from 'faker';
import { AuthedUser, OfferDetail, Review } from './types';
import { getRandomLocation } from './helpers/get-random-location';
import { AuthorizationStatus, LOCATIONS, RequestStatus } from './const';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from './store/store';
import { createAPI } from './services/api';
import { Action } from 'redux';
import { CurrentCityState } from './store/slices/city';
import { OffersState } from './store/slices/offers';
import { OfferState } from './store/slices/offer';
import { ReviewsState } from './store/slices/reviews';
import { FavoritesState } from './store/slices/favorites';
import { AuthState } from './store/slices/auth';

export type AppThunkDispatch = ThunkDispatch<
  RootState,
  ReturnType<typeof createAPI>,
  Action
>;
export const extractActionsTypes = (actions: Action<string>[]) =>
  actions.map(({ type }) => type);

export const makeFakeUser = (): AuthedUser => ({
  name: name.title(),
  avatarUrl: internet.avatar(),
  isPro: false,
  email: internet.email(),
  token: 'secret',
});

export const makeFakeComment = (): Review => ({
  id: crypto.randomUUID(),
  date: new Date().toISOString(),
  user: {
    name: name.title(),
    avatarUrl: internet.avatar(),
    isPro: false,
  },
  comment: lorem.text(),
  rating: Math.floor(Math.random() * 5) + 1,
});

export const makeFakeOffer = (): OfferDetail => ({
  id: crypto.randomUUID(),
  city: {
    name: getRandomLocation(LOCATIONS).name,
    location: {
      latitude: 52.38333,
      longitude: 4.9,
      zoom: 12,
    },
  },
  title: name.title(),
  type: 'room',
  price: Math.floor(Math.random() * 100) + 1,
  rating: Math.floor(Math.random() * 5) + 1,
  isFavorite: false,
  isPremium: false,
  //   previewImage: internet.url(),
  images: [internet.url()],
  bedrooms: Math.floor(Math.random() * 4) + 1,
  maxAdults: Math.floor(Math.random() * 10) + 1,
  goods: [lorem.word()],
  host: {
    name: name.title(),
    isPro: false,
    avatarUrl: internet.avatar(),
  },
  description: lorem.paragraph(),
  location: {
    latitude: 52.38333,
    longitude: 4.9,
    zoom: 12,
  },
});

type State = {
  city: CurrentCityState;
  offers: OffersState;
  offer: OfferState;
  reviews: ReviewsState;
  favorites: FavoritesState;
  auth: AuthState;
};

export const initialState = {
  city: { currentCity: LOCATIONS[0] },
  offers: { activeOffer: '', offers: [], requestStatus: RequestStatus.Idle },
  offer: { offer: null, nearby: [], requestStatus: RequestStatus.Idle },
  reviews: { reviews: [], requestStatus: RequestStatus.Idle },
  favorites: { favorites: [], requestStatus: RequestStatus.Idle },
  auth: {
    userData: null,
    authorizationStatus: AuthorizationStatus.NotAuth,
    requestStatus: RequestStatus.Idle,
  },
} as State;
