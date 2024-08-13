import { AuthorizationStatus } from '../const';
import { useAppSelector } from '../store/hooks';
import { selectAuthorizationStatus } from '../store/slices/auth';

export function useAuthCheck() {
  const status = useAppSelector(selectAuthorizationStatus);
  return status === AuthorizationStatus.Auth;
}
