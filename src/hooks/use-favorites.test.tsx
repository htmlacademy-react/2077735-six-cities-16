import { renderHook } from '@testing-library/react';
import { renderWithStore } from '../utils/mock-component';
import { RequestStatus } from '../const';
import { makeFakeOffer } from '../utils/test-mocks';
import useFavorites from './use-favorites';

describe('Hook: useFavorites', () => {
  it('returns favorites count', () => {
    const mockOffer = makeFakeOffer();
    const { Wrapper: wrapper } = renderWithStore(null, {
      preloadedState: {
        favorites: {
          favorites: [mockOffer, mockOffer],
          requestStatus: RequestStatus.Success,
        },
      },
    });
    const { result } = renderHook(() => useFavorites(), { wrapper });

    expect(result.current.favoritesCount).toBe(2);
  });

  it('returns "isIdle: true" if favorites request status is "Idle"', () => {
    const { Wrapper: wrapper } = renderWithStore(null, {
      preloadedState: {
        favorites: {
          favorites: [],
          requestStatus: RequestStatus.Idle,
        },
      },
    });
    const { result } = renderHook(() => useFavorites(), { wrapper });

    expect(result.current.isIdle).toBe(true);
  });

  it('returns "isLoading: true" if favorites request status is "Loading"', () => {
    const { Wrapper: wrapper } = renderWithStore(null, {
      preloadedState: {
        favorites: {
          favorites: [],
          requestStatus: RequestStatus.Loading,
        },
      },
    });
    const { result } = renderHook(() => useFavorites(), { wrapper });

    expect(result.current.isLoading).toBe(true);
  });

  it('returns "isSuccess: true" if favorites request status is "Loading"', () => {
    const { Wrapper: wrapper } = renderWithStore(null, {
      preloadedState: {
        favorites: {
          favorites: [],
          requestStatus: RequestStatus.Success,
        },
      },
    });
    const { result } = renderHook(() => useFavorites(), { wrapper });

    expect(result.current.isSuccess).toBe(true);
  });

  it('returns favorite offers list', () => {
    const firstFavorite = makeFakeOffer();
    const secondFavorite = makeFakeOffer();
    const favoritesList = [firstFavorite, secondFavorite];

    const { Wrapper: wrapper } = renderWithStore(null, {
      preloadedState: {
        favorites: {
          favorites: favoritesList,
          requestStatus: RequestStatus.Success,
        },
      },
    });
    const { result } = renderHook(() => useFavorites(), { wrapper });

    expect(result.current.favoriteOffers).toStrictEqual(favoritesList);
  });
});
