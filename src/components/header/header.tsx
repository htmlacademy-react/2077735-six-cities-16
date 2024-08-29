import { memo } from 'react';
import Logo from '../logo/logo';
import UserNav from '../user-nav/user-nav';

type HeaderProps = {
  isLoginPage?: boolean;
};

function Header_({ isLoginPage }: HeaderProps) {
  return (
    <header className="header" data-testid="header">
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

const Header = memo(Header_);
export default Header;
