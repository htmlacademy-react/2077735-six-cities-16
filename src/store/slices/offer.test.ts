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
import { APIRoute, RequestStatus } from '../../const';
import {
  fetchOfferById,
  fetchOffersNearby,
  offerSlice,
  selectOffer,
  selectOfferRequestStatus,
  selectOffersNearby,
} from './offer';

describe('Offer Slice', () => {
  describe('Offer Thunks', () => {
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
        offer: {},
      });
    });

    describe('fetchOffersNearby', () => {
      it('dispatches "fetchOffersNearby.pending" and "fetchOffersNearby.fulfilled" with "fetchOffersNearby" thunk', async () => {
        mockAxiosAdapter
          .onGet(`${APIRoute.offers}/testOfferId/nearby`)
          .reply(200);

        await store.dispatch(fetchOffersNearby('testOfferId'));
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([
          fetchOffersNearby.pending.type,
          fetchOffersNearby.fulfilled.type,
        ]);
      });

      it('dispatches "fetchOffersNearby.pending" and "fetchOffersNearby.rejected" when server response is 404', async () => {
        mockAxiosAdapter
          .onGet(`${APIRoute.offers}/testOfferId/nearby`)
          .reply(404);

        await store.dispatch(fetchOffersNearby('testOfferId'));
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([
          fetchOffersNearby.pending.type,
          fetchOffersNearby.rejected.type,
        ]);
      });
    });

    describe('fetchOfferById', () => {
      it('dispatches "fetchOfferById.pending" and "fetchOfferById.fulfilled" with "fetchOfferById" thunk', async () => {
        mockAxiosAdapter.onGet(`${APIRoute.offers}/testOfferId`).reply(200);

        await store.dispatch(fetchOfferById('testOfferId'));
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([
          fetchOfferById.pending.type,
          fetchOfferById.fulfilled.type,
        ]);
      });

      it('dispatches "fetchOfferById.pending" and "fetchOfferById.rejected" when server response is 404', async () => {
        mockAxiosAdapter.onGet(`${APIRoute.offers}/testOfferId`).reply(404);

        await store.dispatch(fetchOfferById('testOfferId'));
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([
          fetchOfferById.pending.type,
          fetchOfferById.rejected.type,
        ]);
      });
    });

    describe('Offer Selectors', () => {
      const mockedOffer = makeFakeOffer();
      const state = {
        offer: {
          offer: mockedOffer,
          nearby: [mockedOffer],
          requestStatus: RequestStatus.Idle,
        },
      };

      it('returns offer from the state', () => {
        const { offer } = state.offer;
        const result = selectOffer(state);
        expect(result).toEqual(offer);
      });

      it('returns request status from the state', () => {
        const { requestStatus } = state.offer;
        const result = selectOfferRequestStatus(state);
        expect(result).toEqual(requestStatus);
      });

      it('returns a list of offers nearby from the state', () => {
        const { nearby } = state.offer;
        const result = selectOffersNearby(state);
        expect(result).toEqual(nearby);
      });
    });

    describe('Favorites Reducers', () => {
      describe('fetchOfferById', () => {
        it('sets "requestStatus" to "Loading" with "fetchOfferById.pending"', () => {
          const expectedState = {
            offer: null,
            nearby: [],
            requestStatus: RequestStatus.Loading,
          };

          const result = offerSlice.reducer(
            initialState.offer,
            fetchOfferById.pending
          );

          expect(result).toEqual(expectedState);
        });

        it('sets "offer" to payload, "requestStatus" to "Success" with "fetchOfferById.fulfilled" action', () => {
          const mockedOffer = makeFakeOffer();
          const expectedState = {
            offer: mockedOffer,
            nearby: [],
            requestStatus: RequestStatus.Success,
          };

          const result = offerSlice.reducer(
            initialState.offer,
            fetchOfferById.fulfilled(mockedOffer, '', 'testOfferId')
          );

          expect(result).toEqual(expectedState);
        });

        it('sets "requestStatus" to "Failed" with "fetchOfferById.rejected" action', () => {
          const expectedState = {
            offer: null,
            nearby: [],
            requestStatus: RequestStatus.Failed,
          };

          const result = offerSlice.reducer(
            initialState.offer,
            fetchOfferById.rejected(null, '', 'testOfferId')
          );

          expect(result).toEqual(expectedState);
        });
      });

      describe('fetchOffersNearby', () => {
        it('sets "nearby" to payload with "fetchOffersNearby.fulfilled" action', () => {
          const mockedOfferNearby = makeFakeOffer();
          const expectedState = {
            offer: null,
            nearby: [mockedOfferNearby],
            requestStatus: RequestStatus.Idle,
          };

          const result = offerSlice.reducer(
            initialState.offer,
            fetchOffersNearby.fulfilled([mockedOfferNearby], '', 'testOfferId')
          );

          expect(result).toEqual(expectedState);
        });
      });
    });
  });
});
