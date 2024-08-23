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
  makeFakeUser,
} from '../../test-mocks';
import { APIRoute, AuthorizationStatus, RequestStatus } from '../../const';
import {
  checkAuth,
  login,
  logout,
  selectAuthorizationStatus,
  selectCurrentUser,
  selectRequestStatus,
} from './auth';
import { LoginData } from '../../types';
import * as tokenStorage from '../../services/token';
import { authSlice } from './auth';

describe('Auth Slice', () => {
  describe('Auth Thunks', () => {
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

    describe('checkAuth', () => {
      it('dispatches "checkAuth.pending" and "checkAuth.fulfilled" with "checkAuth" thunk', async () => {
        mockAxiosAdapter.onGet(APIRoute.login).reply(200);

        await store.dispatch(checkAuth());
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([
          checkAuth.pending.type,
          checkAuth.fulfilled.type,
        ]);
      });

      it('dispatches "checkAuth.pending" and "checkAuth.rejected" when server response is 400', async () => {
        mockAxiosAdapter.onGet(APIRoute.login).reply(400);

        await store.dispatch(checkAuth());
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([
          checkAuth.pending.type,
          checkAuth.rejected.type,
        ]);
      });
    });

    describe('login', () => {
      it('dispatches "login.pending", "login.fulfilled" when server response is 200', async () => {
        const fakeUser: LoginData = {
          email: 'test@test.ru',
          password: '123abc',
        };
        const fakeServerResponse = { token: 'secret' };
        mockAxiosAdapter.onPost(APIRoute.login).reply(200, fakeServerResponse);

        await store.dispatch(login(fakeUser));
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([login.pending.type, login.fulfilled.type]);
      });

      it('calls "saveToken" once with the received token', async () => {
        const fakeUser: LoginData = {
          email: 'test@test.ru',
          password: '123abc',
        };
        const fakeServerResponse = { token: 'secret' };
        mockAxiosAdapter.onPost(APIRoute.login).reply(200, fakeServerResponse);
        const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

        await store.dispatch(login(fakeUser));

        expect(mockSaveToken).toBeCalledTimes(1);
        expect(mockSaveToken).toBeCalledWith(fakeServerResponse.token);
      });
    });

    describe('logout', () => {
      it('dispatches "logout.pending", "logout.fulfilled" when server response is 204', async () => {
        mockAxiosAdapter.onDelete(APIRoute.logout).reply(204);

        await store.dispatch(logout());
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([logout.pending.type, logout.fulfilled.type]);
      });

      it('calls "dropToken" ones with "logout"', async () => {
        mockAxiosAdapter.onDelete(APIRoute.logout).reply(204);
        const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

        await store.dispatch(logout());

        expect(mockDropToken).toBeCalledTimes(1);
      });
    });
  });

  describe('Auth Selectors', () => {
    const mockUser = makeFakeUser();
    const state = {
      auth: {
        userData: mockUser,
        authorizationStatus: AuthorizationStatus.NotAuth,
        requestStatus: RequestStatus.Idle,
      },
    };

    it('returns current user from the state', () => {
      const { userData } = state.auth;
      const result = selectCurrentUser(state);
      expect(result).toEqual(userData);
    });

    it('returns request status from the state', () => {
      const { requestStatus } = state.auth;
      const result = selectRequestStatus(state);
      expect(result).toEqual(requestStatus);
    });

    it('returns authorization status from the state', () => {
      const { authorizationStatus } = state.auth;
      const result = selectAuthorizationStatus(state);
      expect(result).toEqual(authorizationStatus);
    });
  });

  describe('Auth Reducers', () => {
    it('returns initial state with empty action', () => {
      const emptyAction = { type: '' };
      const expectedState = {
        authorizationStatus: AuthorizationStatus.Unknown,
        userData: null,
        requestStatus: RequestStatus.Idle,
      };

      const result = authSlice.reducer(expectedState, emptyAction);

      expect(result).toEqual(expectedState);
    });

    describe('checkAuth', () => {
      it('sets "requestStatus" to "Loading", "authorizationStatus" to "unknown" with "checkAuth.pending"', () => {
        const expectedState = {
          userData: null,
          authorizationStatus: AuthorizationStatus.Unknown,
          requestStatus: RequestStatus.Loading,
        };

        const result = authSlice.reducer(initialState.auth, checkAuth.pending);

        expect(result).toEqual(expectedState);
      });

      it('sets "userData" to payload, "requestStatus" to "Success", "authorizationStatus" to "AUTH" with "checkAuth.fulfilled" action', () => {
        const userData = makeFakeUser();
        const expectedState = {
          userData,
          authorizationStatus: AuthorizationStatus.Auth,
          requestStatus: RequestStatus.Success,
        };

        const result = authSlice.reducer(
          initialState.auth,
          checkAuth.fulfilled(userData, '', undefined)
        );

        expect(result).toEqual(expectedState);
      });

      it('sets "userData" to "null", "requestStatus" to "Success", "authorizationStatus" to "NOT_AUTH" with "checkAuth.rejected" action', () => {
        const expectedState = {
          userData: null,
          authorizationStatus: AuthorizationStatus.NotAuth,
          requestStatus: RequestStatus.Failed,
        };

        const result = authSlice.reducer(
          initialState.auth,
          checkAuth.rejected(null, '', undefined)
        );

        expect(result).toEqual(expectedState);
      });
    });

    describe('login', () => {
      it('sets "requestStatus" to "Loading", "authorizationStatus" to "unknown" with "login.pending"', () => {
        const expectedState = {
          userData: null,
          authorizationStatus: AuthorizationStatus.Unknown,
          requestStatus: RequestStatus.Loading,
        };

        const result = authSlice.reducer(initialState.auth, login.pending);

        expect(result).toEqual(expectedState);
      });

      it('sets "userData" to payload, "requestStatus" to "Success", "authorizationStatus" to "AUTH" with "login.fulfilled" action', () => {
        const userData = {
          name: 'Test',
          avatarUrl: 'test.png',
          isPro: false,
          email: 'test@test',
          token: 'secret',
        };
        const expectedState = {
          userData,
          authorizationStatus: AuthorizationStatus.Auth,
          requestStatus: RequestStatus.Success,
        };

        const result = authSlice.reducer(
          initialState.auth,
          login.fulfilled(userData, '', {
            email: 'test@test.com',
            password: '123test',
          })
        );
        expect(result).toEqual(expectedState);
      });

      it('sets "userData" to "null", "requestStatus" to "Success", "authorizationStatus" to "NOT_AUTH" with "login.rejected" action', () => {
        const expectedState = {
          userData: null,
          authorizationStatus: AuthorizationStatus.NotAuth,
          requestStatus: RequestStatus.Failed,
        };

        const result = authSlice.reducer(
          initialState.auth,
          login.rejected(null, '', {
            email: 'test@test.com',
            password: '123test',
          })
        );

        expect(result).toEqual(expectedState);
      });
    });

    describe('logout', () => {
      it('sets "userData" to null, "requestStatus" to "Success", "authorizationStatus" to "NOT_AUTH" with "logout.fulfilled" action', () => {
        const expectedState = {
          userData: null,
          authorizationStatus: AuthorizationStatus.NotAuth,
          requestStatus: RequestStatus.Success,
        };

        const result = authSlice.reducer(
          initialState.auth,
          logout.fulfilled(undefined, '', undefined)
        );

        expect(result).toEqual(expectedState);
      });
    });
  });
});
