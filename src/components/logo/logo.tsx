import { Link } from 'react-router-dom';
import { APP_ROUTE } from '../../const';

type LogoProps = {
  linkClassName: string;
  isFooter?: boolean;
};

export default function Logo({ linkClassName, isFooter }: LogoProps) {
  const imgWidth = isFooter ? 64 : 81;
  const imgHeight = isFooter ? 33 : 41;
  return linkClassName ? (
    <div>
      <img
        className="header__logo"
        src="img/logo.svg"
        alt="6 cities logo"
        width={imgWidth}
        height={imgHeight}
      />
    </div>
  ) : (
    <Link to={APP_ROUTE.ROOT} className={`header__logo-link${linkClassName}`}>
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
