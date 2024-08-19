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
        const fakeServerReplay = { token: 'secret' };
        mockAxiosAdapter.onPost(APIRoute.login).reply(200, fakeServerReplay);

        await store.dispatch(login(fakeUser));
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([login.pending.type, login.fulfilled.type]);
      });

      it('calls "saveToken" once with the received token', async () => {
        const fakeUser: LoginData = {
          email: 'test@test.ru',
          password: '123abc',
        };
        const fakeServerReplay = { token: 'secret' };
        mockAxiosAdapter.onPost(APIRoute.login).reply(200, fakeServerReplay);
        const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

        await store.dispatch(login(fakeUser));

        expect(mockSaveToken).toBeCalledTimes(1);
        expect(mockSaveToken).toBeCalledWith(fakeServerReplay.token);
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
    const mockedState = initialState;

    it('returns current user from state', () => {
      mockedState.auth.userData = mockUser;
      const userData = mockedState.auth.userData;
      const result = selectCurrentUser(mockedState);
      expect(result).toEqual(userData);
    });

    it('returns request status from state', () => {
      mockedState.auth.requestStatus = RequestStatus.Success;
      const status = mockedState.auth.requestStatus;
      const result = selectRequestStatus(mockedState);
      expect(result).toEqual(status);
    });

    it('returns authorization status from state', () => {
      mockedState.auth.authorizationStatus = AuthorizationStatus.Auth;
      const status = mockedState.auth.authorizationStatus;
      const result = selectAuthorizationStatus(mockedState);
      expect(result).toEqual(status);
    });
  });
});
