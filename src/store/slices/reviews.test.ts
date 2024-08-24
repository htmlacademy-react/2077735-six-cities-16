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
  makeFakeComment,
} from '../../test-mocks';
import { APIRoute, RequestStatus } from '../../const';
import { reviewsSlice, fetchReviews, selectReviews } from './reviews';

describe('Reviews Slice', () => {
  describe('Reviews Thunks', () => {
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
        reviews: {},
      });
    });

    describe('fetchReviews', () => {
      it('dispatches "fetchReviews.pending" and "fetchReviews.fulfilled" with "fetchReviews" thunk', async () => {
        mockAxiosAdapter.onGet(`${APIRoute.reviews}/testOfferId`).reply(200);

        await store.dispatch(fetchReviews('testOfferId'));
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([
          fetchReviews.pending.type,
          fetchReviews.fulfilled.type,
        ]);
      });

      it('dispatches "fetchReviews.pending" and "fetchReviews.rejected" when server response is 404', async () => {
        mockAxiosAdapter.onGet(`${APIRoute.reviews}/testOfferId`).reply(404);

        await store.dispatch(fetchReviews('testOfferId'));
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([
          fetchReviews.pending.type,
          fetchReviews.rejected.type,
        ]);
      });
    });
  });

  describe('Reviews Selectors', () => {
    const mockedReview = makeFakeComment();
    const state = {
      reviews: {
        reviews: [mockedReview],
        requestStatus: RequestStatus.Idle,
      },
    };

    it('returns reviews list from the state', () => {
      const { reviews } = state.reviews;
      const result = selectReviews(state);
      expect(result).toEqual(reviews);
    });
  });

  describe('Reviews Reducers', () => {
    describe('fetchReviews', () => {
      it('sets "requestStatus" to "Loading" with "fetchReviews.pending"', () => {
        const expectedState = {
          reviews: [],
          requestStatus: RequestStatus.Loading,
        };

        const result = reviewsSlice.reducer(
          initialState.reviews,
          fetchReviews.pending
        );

        expect(result).toEqual(expectedState);
      });

      it('sets "reviews" to payload, "requestStatus" to "Success" with "fetchReviews.fulfilled" action', () => {
        const mockedReview = makeFakeComment();
        const expectedState = {
          reviews: [mockedReview],
          requestStatus: RequestStatus.Success,
        };

        const result = reviewsSlice.reducer(
          initialState.reviews,
          fetchReviews.fulfilled([mockedReview], '', 'testOfferId')
        );

        expect(result).toEqual(expectedState);
      });

      it('sets "requestStatus" to "Failed" with "checkAuth.rejected" action', () => {
        const expectedState = {
          reviews: [],
          requestStatus: RequestStatus.Failed,
        };

        const result = reviewsSlice.reducer(
          initialState.reviews,
          fetchReviews.rejected(null, '', 'testOfferId')
        );

        expect(result).toEqual(expectedState);
      });
    });
  });
});
