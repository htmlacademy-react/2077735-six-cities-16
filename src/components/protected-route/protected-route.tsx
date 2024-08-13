import { Location, Navigate, useLocation } from 'react-router-dom';
import { APP_ROUTE, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../store/hooks';
import { ReactNode } from 'react';
import { selectAuthorizationStatus, selectCurrentUser } from '../../store/slices/auth';
import Spinner from '../spinner/spinner';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: ReactNode;
}

type FromState = {
  from?: Location;
}

export default function ProtectedRoute({onlyUnAuth, children}: ProtectedRouteProps) {
  const location: Location<FromState> = useLocation() as Location<FromState>;

  const user = useAppSelector(selectCurrentUser);
  const authStatus = useAppSelector(selectAuthorizationStatus);

  if (authStatus === AuthorizationStatus.Unknown) {
    return <Spinner />;
  }

  if (user && onlyUnAuth) {
    const from = location.state?.from || { pathname: APP_ROUTE.ROOT };
    return <Navigate to={from} />;
  }

  if (!user && !onlyUnAuth) {
    return <Navigate to={APP_ROUTE.ROOT} state={{ from: location }}/>;
  }

  return children;
}
