import { createSlice } from '@reduxjs/toolkit';
import { Review } from '../../types';
import { createAppAsyncThunk } from '../with-types';
import { APIRoute, RequestStatus } from '../../const';
import { RootState } from '../store';

export const fetchReviews = createAppAsyncThunk(
  'offer/fetchReviews',
  async (offerId: string, { extra: api }) => {
    const { data } = await api.get<Review[]>(`${APIRoute.reviews}/${offerId}`);
    return data;
  }
);

type ReviewsState = {
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
      });
  },
});

export const selectReviews = (state: RootState) => state.reviews.reviews;

export default reviewsSlice.reducer;
