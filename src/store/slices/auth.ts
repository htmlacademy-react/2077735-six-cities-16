import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../store';
import { APIRoute, AuthorizationStatus, RequestStatus } from '../../const';
import { AuthedUser, AuthRequest } from '../../types';
import { createAppAsyncThunk } from '../with-types';
import { dropToken, saveToken } from '../../services/token';

export const checkAuth = createAppAsyncThunk(
  'auth/checkAuth',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<AuthedUser>(APIRoute.login);
    return data;
  }
);

export const login = createAppAsyncThunk(
  'auth/login',
  async ({ email, password }: AuthRequest, { extra: api }) => {
    const { data } = await api.post<AuthedUser>(APIRoute.login, {
      email,
      password,
    });
    saveToken(data.token);
    return data;
  }
);

export const logout = createAppAsyncThunk(
  'auth/logout',
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.logout);
    dropToken();
  }
);

interface AuthState {
  userData: AuthedUser | null;
  authorizationStatus: AuthorizationStatus;
  requestStatus: RequestStatus;
}

const initialState: AuthState = {
  userData: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  requestStatus: RequestStatus.Idle,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.requestStatus = RequestStatus.Success;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(login.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
        state.authorizationStatus = AuthorizationStatus.NotAuth;
      });
  },
});

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.userData;
export const selectRequestStatus = (state: RootState) =>
  state.auth.requestStatus;
export const selectAuthorizationStatus = (state: RootState) =>
  state.auth.authorizationStatus;
