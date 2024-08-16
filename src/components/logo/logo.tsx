import cn from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { APP_ROUTE } from '../../const';

type LogoProps = {
  isFooter?: boolean;
};

export default function Logo({ isFooter }: LogoProps) {
  //TODO: убрать в константы
  const imgWidth = isFooter ? 64 : 81;
  const imgHeight = isFooter ? 33 : 41;

  const { pathname } = useLocation();
  const isMainPage = pathname === APP_ROUTE.ROOT;
  return (
    <Link
      to={APP_ROUTE.ROOT}
      className={cn(
        'header__logo-link',
        isMainPage && 'header__logo-link--active'
      )}
    >
      <img
        className="header__logo"
        src="img/logo.svg"
        alt="6 cities logo"
        width={imgWidth}
        height={imgHeight}
      />
    </Link>
  );
}
