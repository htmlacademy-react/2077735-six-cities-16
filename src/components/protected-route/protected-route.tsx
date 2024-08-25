import { Location, Navigate, useLocation } from 'react-router-dom';
import { APP_ROUTE } from '../../const';
import { useAppSelector } from '../../store/hooks';
import { ReactNode } from 'react';
import { selectCurrentUser } from '../../store/slices/auth';

type ProtectedRouteProps = {
  publicRoute?: boolean;
  children: ReactNode;
};

type FromState = {
  from?: Location;
};

export default function ProtectedRoute({
  publicRoute,
  children,
}: ProtectedRouteProps) {
  const location: Location<FromState> = useLocation() as Location<FromState>;

  const user = useAppSelector(selectCurrentUser);

  if (user && publicRoute) {
    const from = location.state?.from || { pathname: APP_ROUTE.ROOT };
    return <Navigate to={from} />;
  }

  if (!user && !publicRoute) {
    return <Navigate to={APP_ROUTE.LOGIN} state={{ from: location }} />;
  }

  return children;
}
