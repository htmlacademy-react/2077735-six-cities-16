import Logo from '../logo/logo';
import { useLocation, Link } from 'react-router-dom';
import { APP_ROUTE } from '../../const';

type HeaderProps = {
  favoritesCount: number;
};

export default function Header({ favoritesCount }: HeaderProps) {
  const location = useLocation();
  const isGrey = location.pathname === APP_ROUTE.ROOT;
  const headerColor = isGrey
    ? { backgroundColor: '#f5f5f5' }
    : { backgroundColor: '#fff' };

  return (
    <header style={headerColor} className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link
                  className="header__nav-link header__nav-link--profile"
                  to={APP_ROUTE.FAVORITES}
                >
                  <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                  <span className="header__user-name user__name">
                    Oliver.conner@gmail.com
                  </span>
                  <span className="header__favorite-count">
                    {favoritesCount}
                  </span>
                </Link>
              </li>
              <li className="header__nav-item">
                <a className="header__nav-link" href="#">
                  <span className="header__signout">Sign out</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
