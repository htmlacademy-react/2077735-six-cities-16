import Logo from '../logo/logo';
import UserNav from '../userNav/userNav';

type HeaderProps = {
  isLoginPage?: boolean;
};

export default function Header({
  isLoginPage,
}: HeaderProps) {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          {!isLoginPage && <UserNav />}
        </div>
      </div>
    </header>
  );
}
