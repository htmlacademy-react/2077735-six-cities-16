import useAuthCheck from './use-auth-check';
import { renderHook } from '@testing-library/react';
import { renderWithStore } from '../utils/mock-component';
import { AuthorizationStatus, RequestStatus } from '../const';
import { makeFakeUser } from '../utils/test-mocks';

describe('Hook: useAuthCheck', () => {
  it('returns "false" if the user is not logged in', () => {
    const { Wrapper: wrapper } = renderWithStore(null, {
      preloadedState: {
        auth: {
          userData: null,
          authorizationStatus: AuthorizationStatus.NotAuth,
          requestStatus: RequestStatus.Success,
        },
      },
    });

    const { result } = renderHook(() => useAuthCheck(), { wrapper });

    expect(result.current).toBe(false);
  });

  it('returns "true" if the user is logged in', () => {
    const { Wrapper: wrapper } = renderWithStore(null, {
      preloadedState: {
        auth: {
          userData: makeFakeUser(),
          authorizationStatus: AuthorizationStatus.Auth,
          requestStatus: RequestStatus.Success,
        },
      },
    });

    const { result } = renderHook(() => useAuthCheck(), { wrapper });

    expect(result.current).toBe(true);
  });
});
