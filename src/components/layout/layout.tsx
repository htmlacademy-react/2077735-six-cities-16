import cn from 'classnames';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../header/header';
import Logo from '../logo/logo';
import UseFavorites from '../../hooks/use-favorites';
import { APP_ROUTE } from '../../const';

export default function Layout() {
  const { pathname } = useLocation();
  const { favoritesCount } = UseFavorites();

  const isMain = pathname === APP_ROUTE.ROOT;
  const isLogin = pathname === APP_ROUTE.LOGIN;
  const isFavorites = pathname === APP_ROUTE.FAVORITES;
  const isEmptyFavorites = pathname === APP_ROUTE.FAVORITES && !favoritesCount;

  return (
    <div
      className={cn(
        'page',
        isMain && 'page--gray page--main',
        isLogin && 'page--gray page--login',
        isFavorites && 'page--favorites',
        isEmptyFavorites && 'page--favorites-empty'
      )}
    >
      <Header isLoginPage={isLogin} />
      <Outlet />
      {isFavorites && (
        <footer className="footer container">
          <Logo isFooter={isFavorites} />
        </footer>
      )}
    </div>
  );
}
