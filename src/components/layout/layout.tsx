import { Outlet, useLocation } from 'react-router-dom';
import Header from '../header/header';
import { getLayoutState } from '../../helpers/get-layout-state';
import Logo from '../logo/logo';

type LayoutProps = {
  favoritesCount: number;
};

export default function Layout({ favoritesCount }: LayoutProps) {
  const { pathname } = useLocation();
  const { rootClassName, linkClassName, shouldRenderFooter, shouldRenderUser } =
    getLayoutState(pathname, favoritesCount);
  return (
    <div className={`page ${rootClassName}`}>
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
