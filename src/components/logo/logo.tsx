import cn from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { APP_ROUTE, LOGO_SIZE } from '../../const';

type LogoProps = {
  isFooter?: boolean;
};

export default function Logo({ isFooter }: LogoProps) {
  const imgWidth = isFooter ? LOGO_SIZE.FOOTER.WIDTH : LOGO_SIZE.HEADER.WIDTH;
  const imgHeight = isFooter ? LOGO_SIZE.FOOTER.HIGHT : LOGO_SIZE.HEADER.HIGHT;

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
