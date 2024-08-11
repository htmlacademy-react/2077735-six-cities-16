import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store';
import { AuthorizationStatus } from '../../const';

interface AuthState {
  username: string | null;
  authorizationStatus: AuthorizationStatus;
}

const initialState: AuthState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  username: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authorisationRequired(state, action: PayloadAction<AuthorizationStatus>) {
      state.authorizationStatus = action.payload;
    },
    // userLoggedIn(state, action: PayloadAction<string>) {
    //   state.username = action.payload
    // },
    // userLoggedOut(state) {
    //   state.username = null
    // },
  },
});

export const { authorisationRequired } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUsername = (state: RootState) => state.auth.username;
