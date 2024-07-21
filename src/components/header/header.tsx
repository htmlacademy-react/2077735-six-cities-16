import Logo from '../logo/logo';
import UserNav from '../userNav/userNav';

type HeaderProps = {
  favoritesCount: number;
  linkClassName: string;
  shouldRenderUser: boolean;
};

export default function Header({
  favoritesCount,
  linkClassName,
  shouldRenderUser,
}: HeaderProps) {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo linkClassName={linkClassName} />
          </div>
          {shouldRenderUser && <UserNav favoritesCount={favoritesCount} />}
        </div>
      </div>
    </header>
  );
}
