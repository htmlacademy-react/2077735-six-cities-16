import cn from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { AppRoute, LogoSize } from '../../const';

type LogoProps = {
  isFooter?: boolean;
};

export default function Logo({ isFooter }: LogoProps) {
  const imgWidth = isFooter ? LogoSize.Footer.Width : LogoSize.Header.Width;
  const imgHeight = isFooter ? LogoSize.Footer.Hight : LogoSize.Header.Hight;

  const { pathname } = useLocation();
  const isMainPage = pathname === AppRoute.Root;
  return (
    <Link
      to={AppRoute.Root}
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
