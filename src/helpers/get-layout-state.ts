import { APP_ROUTE } from '../const';

export const getLayoutState = (pathname: string, favoritesCount: number) => {
  let rootClassName = '';
  let shouldRenderUser = true;
  let shouldRenderFooter = false;

  if (pathname === APP_ROUTE.ROOT) {
    rootClassName = ' page--gray page--main';
  } else if (pathname === APP_ROUTE.LOGIN) {
    rootClassName = ' page--gray page--login';
    shouldRenderUser = false;
  } else if (pathname === APP_ROUTE.FAVORITES) {
    rootClassName = ' page--favorites';
    shouldRenderFooter = true;
    if (!favoritesCount) {
      rootClassName = ' page--favorites-empty';
    }
  }
  return { rootClassName, shouldRenderFooter, shouldRenderUser };
};
