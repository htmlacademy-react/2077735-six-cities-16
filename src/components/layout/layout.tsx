import { Outlet, useLocation } from 'react-router-dom';
import Header from '../header/header';
import { getLayoutState } from '../../helpers/get-layout-state';
import Logo from '../logo/logo';
import { useAppDispatch } from '../../store/hooks';
import { fetchFavorites } from '../../store/slices/favorites';
import { getToken } from '../../services/token';
import { useEffect } from 'react';
import UseFavorites from '../../hooks/use-favorites';

export default function Layout() {
  const { pathname } = useLocation();
  const { favoritesCount, isIdle } = UseFavorites();
  const token = getToken();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isIdle && token) {
      dispatch(fetchFavorites());
    }
  }, [dispatch, token]);

  const { rootClassName, linkClassName, shouldRenderFooter, shouldRenderUser } =
    getLayoutState(pathname, favoritesCount);

  return (
    <div className={`page${rootClassName}`}>
      <Header
        favoritesCount={favoritesCount}
        linkClassName={linkClassName}
        shouldRenderUser={shouldRenderUser}
      />
      <Outlet />
      {shouldRenderFooter && (
        <footer className="footer container">
          <Logo isFooter={shouldRenderFooter} linkClassName={linkClassName} />
        </footer>
      )}
    </div>
  );
}
