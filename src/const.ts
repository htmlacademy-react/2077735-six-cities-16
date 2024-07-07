export type Place = {
  id: string;
  title: string;
  price: number;
  type: string;
  isPremium: boolean;
  isFavorite: boolean;
};

export const AppRoute = {
  Root: '/',
  Login: '/login',
  Favorites: '/favorites',
  Offer: '/offer/:id',
  NotFound: '*',
} as const;
