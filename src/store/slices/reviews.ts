import { createSelector, createSlice } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from '../with-types';
import { APIRoute, RequestStatus } from '../../const';
import { RootState } from '../store';

import type { PostReviewProps, Review } from '../../types';
import { compareDates } from '../../helpers/compare-dates';

export const fetchReviews = createAppAsyncThunk(
  'offer/fetchReviews',
  async (offerId: string, { extra: api }) => {
    const { data } = await api.get<Review[]>(`${APIRoute.reviews}/${offerId}`);
    return data;
  }
);

export const postReview = createAppAsyncThunk(
  'offer/postReview',
  async ({ offerId, body }: PostReviewProps, { extra: api }) => {
    const { data } = await api.post<Review>(
      `${APIRoute.reviews}/${offerId}`,
      body
    );
    return data;
  }
);

export type ReviewsState = {
  reviews: Review[];
  requestStatus: RequestStatus;
};

const initialState: ReviewsState = {
  reviews: [],
  requestStatus: RequestStatus.Idle,
};

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(fetchReviews.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(postReview.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
      });
  },
});

export const selectReviews = createSelector(
  (state: RootState) => state.reviews.reviews,
  (reviews) => [...reviews].sort(compareDates)
);
