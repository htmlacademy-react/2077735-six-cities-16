import { createAPI } from '../../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import { RootState } from '../store';
import {
  AppThunkDispatch,
  extractActionsTypes,
  initialState,
  makeFakeOffer,
} from '../../utils/test-mocks';
import { APIRoute, FavoriteStatus, RequestStatus } from '../../const';
import { changeFavoriteProps } from '../../types';
import {
  changeFavorite,
  favoritesSlice,
  fetchFavorites,
  selectFavorites,
  selectFavoritesStatus,
} from './favorites';

describe('Favorites Slice', () => {
  describe('Favorites Thunks', () => {
    const axios = createAPI();
    const mockAxiosAdapter = new MockAdapter(axios);
    const middleware = [thunk.withExtraArgument(axios)];
    const mockStoreCreator = configureMockStore<
      RootState,
      Action<string>,
      AppThunkDispatch
    >(middleware);
    let store: ReturnType<typeof mockStoreCreator>;

    beforeEach(() => {
      store = mockStoreCreator({
        auth: {},
      });
    });

    describe('fetchFavorites', () => {
      it('dispatches "fetchFavorites.pending" and "fetchFavorites.fulfilled" with "fetchFavorites" thunk', async () => {
        mockAxiosAdapter.onGet(APIRoute.favorites).reply(200);

        await store.dispatch(fetchFavorites());
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([
          fetchFavorites.pending.type,
          fetchFavorites.fulfilled.type,
        ]);
      });

      it('dispatches "fetchFavorites.pending" and "fetchFavorites.rejected" when server response is 401', async () => {
        mockAxiosAdapter.onGet(APIRoute.favorites).reply(401);

        await store.dispatch(fetchFavorites());
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([
          fetchFavorites.pending.type,
          fetchFavorites.rejected.type,
        ]);
      });
    });

    describe('changeFavorite', () => {
      it('dispatches "changeFavorite.pending", "changeFavorite.fulfilled" when server response is 201', async () => {
        const changeFavoritePayload: changeFavoriteProps = {
          offerId: 'testId',
          status: FavoriteStatus.Added,
        };
        mockAxiosAdapter
          .onPost(
            `${APIRoute.favorites}/${changeFavoritePayload.offerId}/${changeFavoritePayload.status}`
          )
          .reply(201, {});

        await store.dispatch(changeFavorite(changeFavoritePayload));
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([
          changeFavorite.pending.type,
          changeFavorite.fulfilled.type,
        ]);
      });
    });
  });

  describe('Favorites Selectors', () => {
    const mockFavoriteOffer = makeFakeOffer();
    const state = {
      favorites: {
        favorites: [mockFavoriteOffer],
        requestStatus: RequestStatus.Idle,
      },
    };

    it('returns favorites list from the state', () => {
      const { favorites } = state.favorites;
      const result = selectFavorites(state);
      expect(result).toEqual(favorites);
    });

    it('returns request status from the state', () => {
      const { requestStatus } = state.favorites;
      const result = selectFavoritesStatus(state);
      expect(result).toEqual(requestStatus);
    });
  });

  describe('Favorites Reducers', () => {
    describe('fetchFavorites', () => {
      it('sets "requestStatus" to "Loading" with "fetchFavorites.pending"', () => {
        const expectedState = {
          favorites: [],
          requestStatus: RequestStatus.Loading,
        };

        const result = favoritesSlice.reducer(
          initialState.favorites,
          fetchFavorites.pending
        );

        expect(result).toEqual(expectedState);
      });

      it('sets "favorites" to payload, "requestStatus" to "Success" with "fetchFavorites.fulfilled" action', () => {
        const mockFavoriteOffer = makeFakeOffer();
        const expectedState = {
          favorites: [mockFavoriteOffer],
          requestStatus: RequestStatus.Success,
        };

        const result = favoritesSlice.reducer(
          initialState.favorites,
          fetchFavorites.fulfilled([mockFavoriteOffer], '', undefined)
        );

        expect(result).toEqual(expectedState);
      });

      it('sets "requestStatus" to "Failed" with "checkAuth.rejected" action', () => {
        const expectedState = {
          favorites: [],
          requestStatus: RequestStatus.Failed,
        };

        const result = favoritesSlice.reducer(
          initialState.favorites,
          fetchFavorites.rejected(null, '', undefined)
        );

        expect(result).toEqual(expectedState);
      });
    });

    describe('changeFavorite', () => {
      it('sets "requestStatus" to "Loading" with "changeFavorite.pending"', () => {
        const expectedState = {
          favorites: [],
          requestStatus: RequestStatus.Loading,
        };

        const result = favoritesSlice.reducer(
          initialState.favorites,
          changeFavorite.pending
        );

        expect(result).toEqual(expectedState);
      });

      it('adds offer to "favorites" if the status is "added" with "changeFavorite.fulfilled" action', () => {
        const mockedFavoriteOffer = makeFakeOffer();
        const expectedState = {
          favorites: [mockedFavoriteOffer],
          requestStatus: RequestStatus.Success,
        };

        const result = favoritesSlice.reducer(
          initialState.favorites,
          changeFavorite.fulfilled(
            { offer: mockedFavoriteOffer, status: FavoriteStatus.Added },
            '',
            {
              offerId: 'testId',
              status: FavoriteStatus.Added,
            }
          )
        );
        expect(result).toEqual(expectedState);
      });

      it('removes offer from "favorites" if the status is "removed" with "changeFavorite.fulfilled" action', () => {
        const mockedFavoriteOffer = makeFakeOffer();
        const mockedOfferToRemove = { ...makeFakeOffer(), id: 'testId' };
        const mockedInitialState = {
          favorites: [mockedFavoriteOffer, mockedOfferToRemove],
          requestStatus: RequestStatus.Success,
        };
        const expectedState = {
          favorites: [mockedFavoriteOffer],
          requestStatus: RequestStatus.Success,
        };

        const result = favoritesSlice.reducer(
          mockedInitialState,
          changeFavorite.fulfilled(
            { offer: mockedOfferToRemove, status: FavoriteStatus.Removed },
            '',
            {
              offerId: 'testId',
              status: FavoriteStatus.Removed,
            }
          )
        );
        expect(result).toEqual(expectedState);
      });

      it('sets "requestStatus" to "Failed" "changeFavorite.rejected" action', () => {
        const expectedState = {
          favorites: [],
          requestStatus: RequestStatus.Failed,
        };

        const result = favoritesSlice.reducer(
          initialState.favorites,
          changeFavorite.rejected(null, '', {
            offerId: 'testId',
            status: FavoriteStatus.Added,
          })
        );

        expect(result).toEqual(expectedState);
      });
    });
  });
});
