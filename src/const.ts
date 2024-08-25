export const APP_ROUTE = {
  ROOT: '/',
  LOGIN: '/login',
  FAVORITES: '/favorites',
  OFFER: '/offer',
  OFFER_ID: '/offer/:id',
  NOT_FOUND: '*',
} as const;

export const AVATAR_SIZE = {
  OFFER: 74,
  REVIEW: 54,
} as const;

export const LOCATIONS_NAMES = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
] as const;

export const DEFAULT_CITY_NAME = 'Paris';

export const LOCATIONS = [
  {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    },
  },
  {
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 13,
    },
  },
  {
    name: 'Brussels',
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 13,
    },
  },
  {
    name: 'Amsterdam',
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 13,
    },
  },
  {
    name: 'Hamburg',
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 13,
    },
  },
  {
    name: 'Dusseldorf',
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 13,
    },
  },
] as const;

export const MARKER_URL = {
  DEFAULT:
    '/img/pin.svg',
  CURRENT:
    '/img/pin-active.svg',
} as const;

export const MAP_LAYER = {
  BASE_URL:
    'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  ATTRIBUTION:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
} as const;

export const SORTING_OPTION = {
  DEFAULT: 'popular',
  LOW_PRICE_FIRST: 'price: low to high',
  HIGH_PRICE_FIRST: 'price: high to low',
  TOP_RATED_FIRST: 'top rated first',
} as const;

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NotAuth = 'NOT_AUTH',
  Unknown = 'UNKNOWN',
}

export enum APIRoute {
  offers = '/six-cities/offers',
  favorites = '/six-cities/favorite',
  reviews = '/six-cities/comments',
  login = '/six-cities/login',
  logout = '/six-cities/logout',
}

export const RATING = [
  { stars: 5, title: 'perfect' },
  { stars: 4, title: 'good' },
  { stars: 3, title: 'not bad' },
  { stars: 2, title: 'badly' },
  { stars: 1, title: 'terribly' },
] as const;

export enum RequestStatus {
  Idle = 'Idle',
  Loading = 'Loading',
  Success = 'Success',
  Failed = 'Failed',
}

export enum FavoriteStatus {
  Removed,
  Added,
}

export const NEARBY_OFFERS_COUNT = 3;
export const GALLERY_IMAGES_COUNT = 6;
export const REVIEWS_COUNT = 10;
