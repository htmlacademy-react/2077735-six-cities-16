import { renderHook } from '@testing-library/react';
import { renderWithStore } from '../utils/mock-component';
import { RequestStatus } from '../const';
import { extractActionsTypes, makeFakeOffer } from '../utils/test-mocks';
import { fetchFavorites } from '../store/slices/favorites';
import useFavoritesCount from './use-favorites-count';

describe('Hook: useFavoritesCount', () => {
  it('dispatches "fetchFavorites" action if request status is "Idle"', () => {
    const { Wrapper: wrapper, mockStore } = renderWithStore(null, {
      preloadedState: {
        favorites: {
          favorites: [],
          requestStatus: RequestStatus.Idle,
        },
      },
    });
    renderHook(() => useFavoritesCount(), { wrapper });

    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([fetchFavorites.pending.type]);
  });

  it('does not dispatch "fetchFavorites" action if request status is not "Idle"', () => {
    const { Wrapper: wrapper, mockStore } = renderWithStore(null, {
      preloadedState: {
        favorites: {
          favorites: [],
          requestStatus: RequestStatus.Success,
        },
      },
    });
    renderHook(() => useFavoritesCount(), { wrapper });

    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).not.toEqual([fetchFavorites.pending.type]);
  });

  it('returns favorites count', () => {
    const firstFavorite = makeFakeOffer();
    const secondFavorite = makeFakeOffer();
    const { Wrapper: wrapper } = renderWithStore(null, {
      preloadedState: {
        favorites: {
          favorites: [firstFavorite, secondFavorite],
          requestStatus: RequestStatus.Success,
        },
      },
    });
    const { result } = renderHook(() => useFavoritesCount(), { wrapper });

    expect(result.current).toBe(2);
  });
});
