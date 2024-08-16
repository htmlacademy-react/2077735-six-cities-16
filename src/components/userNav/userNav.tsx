import { Link } from 'react-router-dom';
import { APP_ROUTE } from '../../const';
import { useAuthCheck } from '../../hooks/use-auth-check';
import { logout, selectCurrentUser } from '../../store/slices/auth';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

type UserNavProps = {
  favoritesCount: number;
};

export default function UserNav({ favoritesCount }: UserNavProps) {
  const isLoggedIn = useAuthCheck();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);

  const handleLogoutClick = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(logout());
  };

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {isLoggedIn && (
          <li className="header__nav-item user">
            <Link
              className="header__nav-link header__nav-link--profile"
              to={APP_ROUTE.FAVORITES}
            >
              <div className="header__avatar-wrapper user__avatar-wrapper"></div>
              <span className="header__user-name user__name">
                {user?.email}
              </span>
              <span className="header__favorite-count">{favoritesCount}</span>
            </Link>
          </li>
        )}
        <li className="header__nav-item">
          {isLoggedIn ? (
            <Link
              className="header__nav-link header__nav-link--profile"
              to="#"
              onClick={handleLogoutClick}
            >
              <span className="header__signout">Sign out</span>
            </Link>
          ) : (
            <Link
              className="header__nav-link header__nav-link--profile"
              to={APP_ROUTE.LOGIN}
            >
              <div className="header__avatar-wrapper user__avatar-wrapper"></div>
              <span className="header__login">Sign in</span>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
