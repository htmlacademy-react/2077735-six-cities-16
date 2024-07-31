import { Navigate } from 'react-router-dom';
import { APP_ROUTE } from '../../const';

import type { AuthStatus } from '../../types';
import { ReactNode } from 'react';

type AccessRouteProps = {
  children: ReactNode;
  status: AuthStatus;
};

const createAccessRoute = (statusToCheck: AuthStatus, fallbackPath: string) =>
  function AccessRoute({ children, status }: AccessRouteProps) {
    switch (status) {
      case statusToCheck:
        return children;
      case 'UNKNOWN':
        return 'Loading...';
      default:
        return <Navigate to={fallbackPath} />;
    }
  };

const PrivateRoute = createAccessRoute('AUTH', APP_ROUTE.LOGIN);
const PublicRoute = createAccessRoute('NOT_AUTH', APP_ROUTE.ROOT);

export { PrivateRoute, PublicRoute };
