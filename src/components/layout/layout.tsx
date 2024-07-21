import { Outlet } from 'react-router-dom';
import Header from '../header/header';

type LayoutProps = {
  favoritesCount: number;
};

export default function Layout({ favoritesCount }: LayoutProps) {
  return (
    <>
      <Header favoritesCount={favoritesCount} />
      <Outlet />
    </>
  );
}
