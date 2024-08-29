import Header from '../header/header';
import { ReactNode } from 'react';

type LayoutProps = {
  pageClassName: string;
  isLoginPage?: boolean;
  children: ReactNode;
};

export default function Layout({
  children,
  pageClassName,
  isLoginPage,
}: LayoutProps) {
  return (
    <div className={pageClassName} data-testid="layout">
      <Header isLoginPage={isLoginPage} />
      {children}
    </div>
  );
}
