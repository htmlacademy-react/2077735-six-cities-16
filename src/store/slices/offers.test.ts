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
} from '../../test-mocks';
import { APIRoute, FavoriteStatus, RequestStatus } from '../../const';
import {
  fetchOffers,
  offersSlice,
  selectActiveOffer,
  selectOffers,
  selectOffersRequestStatus,
} from './offers';
import { changeFavorite } from './favorites';

describe('Offers Slice', () => {
  describe('Offers Thunks', () => {
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
        offers: {},
      });
    });

    describe('fetchOffers', () => {
      it('dispatches "fetchOffers.pending" and "fetchOffers.fulfilled" with "fetchOffers" thunk', async () => {
        mockAxiosAdapter.onGet(APIRoute.offers).reply(200);

        await store.dispatch(fetchOffers());
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([
          fetchOffers.pending.type,
          fetchOffers.fulfilled.type,
        ]);
      });

      it('dispatches "fetchOffers.pending" and "fetchOffers.rejected" when server response is 401', async () => {
        mockAxiosAdapter.onGet(APIRoute.offers).reply(401);

        await store.dispatch(fetchOffers());
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([
          fetchOffers.pending.type,
          fetchOffers.rejected.type,
        ]);
      });
    });
  });

  describe('Offers Selectors', () => {
    const mockedOffer = makeFakeOffer();
    const state = {
      offers: {
        activeOffer: '',
        offers: [mockedOffer],
        requestStatus: RequestStatus.Idle,
      },
    };

    it('returns offers list from the state', () => {
      const { offers } = state.offers;
      const result = selectOffers(state);
      expect(result).toEqual(offers);
    });

    it('returns active offer from the state', () => {
      const { activeOffer } = state.offers;
      const result = selectActiveOffer(state);
      expect(result).toEqual(activeOffer);
    });

    it('returns request status from the state', () => {
      const { requestStatus } = state.offers;
      const result = selectOffersRequestStatus(state);
      expect(result).toEqual(requestStatus);
    });
  });

  describe('Offers Reducers', () => {
    describe('fetchOffers', () => {
      it('sets "requestStatus" to "Loading" with "fetchOffers.pending"', () => {
        const expectedState = {
          activeOffer: '',
          offers: [],
          requestStatus: RequestStatus.Loading,
        };

        const result = offersSlice.reducer(
          initialState.offers,
          fetchOffers.pending
        );

        expect(result).toEqual(expectedState);
      });

      it('sets "offers" to payload, "requestStatus" to "Success" with "fetchOffers.fulfilled" action', () => {
        const mockFavoriteOffer = makeFakeOffer();
        const expectedState = {
          activeOffer: '',
          offers: [mockFavoriteOffer],
          requestStatus: RequestStatus.Success,
        };

        const result = offersSlice.reducer(
          initialState.offers,
          fetchOffers.fulfilled([mockFavoriteOffer], '', undefined)
        );

        expect(result).toEqual(expectedState);
      });

      it('sets "requestStatus" to "Failed" with "checkAuth.rejected" action', () => {
        const expectedState = {
          activeOffer: '',
          offers: [],
          requestStatus: RequestStatus.Failed,
        };

        const result = offersSlice.reducer(
          initialState.offers,
          fetchOffers.rejected(null, '', undefined)
        );

        expect(result).toEqual(expectedState);
      });
    });

    describe('changeFavorite', () => {
      it('finds an offer to change by id and sets its "isFavorite" property accordingly with "changeFavorite.fulfilled" action', () => {
        const mockedFavoriteOffer = makeFakeOffer();
        const mockedOfferToChange = makeFakeOffer();
        mockedOfferToChange.id = 'testId';

        const expectedOfferToChange = {
          ...mockedOfferToChange,
          isFavorite: false,
        };

        const mockedInitialState = {
          activeOffer: '',
          offers: [mockedFavoriteOffer, mockedOfferToChange],
          requestStatus: RequestStatus.Success,
        };
        const expectedState = {
          activeOffer: '',
          offers: [mockedFavoriteOffer, expectedOfferToChange],
          requestStatus: RequestStatus.Success,
        };

        const result = offersSlice.reducer(
          mockedInitialState,
          changeFavorite.fulfilled(
            { offer: expectedOfferToChange, status: FavoriteStatus.Removed },
            '',
            {
              offerId: 'testId',
              status: FavoriteStatus.Removed,
            }
          )
        );
        expect(result).toEqual(expectedState);
      });
    });
  });
});
