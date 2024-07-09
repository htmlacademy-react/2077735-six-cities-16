export const APP_ROUTE = {
  ROOT: '/',
  LOGIN: '/login',
  FAVORITES: '/favorites',
  OFFER: '/offer/:id',
  NOT_FOUND: '*',
} as const;

export const IMG_SIZE = {
  WIDTH: { MAIN: 260, FAVORITES: 150 },
  HEIGHT: { MAIN: 200, FAVORITES: 110 },
} as const;
