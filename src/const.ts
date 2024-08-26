export const AppRoute = {
  Root: '/',
  Login: '/login',
  Favorites: '/favorites',
  Offer: '/offer',
  OfferId: '/offer/:id',
  NotFound: '*',
} as const;

export const AvatarSize = {
  Offer: 74,
  Review: 54,
} as const;

export const FavoriteButtonSize = {
  Offer: { Width: 31, Hight: 33 },
  Card: { Width: 18, Hight: 19 },
} as const;

export const LogoSize = {
  Footer: { Width: 64, Hight: 33 },
  Header: { Width: 81, Hight: 41 },
} as const;

export const CardSize = {
  Favorites: { Width: 150, Hight: 110 },
  Main: { Width: 260, Hight: 200 },
} as const;

export const LocationsNames = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
] as const;

export const Locations = [
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

export const MarkerUrl = {
  Default: '/img/pin.svg',
  Current: '/img/pin-active.svg',
} as const;

export const MapLayer = {
  BaseUrl:
    'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  Attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
} as const;

export const SortingOption = {
  Default: 'popular',
  LowPriceFirst: 'price: low to high',
  HighPriceFirst: 'price: high to low',
  TopRatedFirst: 'top rated first',
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

export const Rating = [
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

export const MaxCount = {
  NearbyOffers: 3,
  GalleryImages: 6,
  Reviews: 10,
};

export const ReviewValidationRule = {
  MaxLength: 50,
  MinLength: 300,
};
