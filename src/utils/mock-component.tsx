import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { AppThunkDispatch } from './test-mocks';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactElement, ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { RenderOptions } from '@testing-library/react';
import { AppStore, RootState } from '../store/store';
import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

export const renderWithRouter = (
  ui: ReactElement<ReactNode>,
  { route = '/' } = {}
) => {
  window.history.pushState({}, 'Test page', route);

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: BrowserRouter }),
  };
};

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export function withStore(
  component: React.ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {}
) {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<
    RootState,
    Action<string>,
    AppThunkDispatch
  >(middleware);
  const { preloadedState = {}, ...renderOptions } = extendedRenderOptions;
  const mockStore = mockStoreCreator(preloadedState);

  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={mockStore}>{children}</Provider>
  );

  return {
    mockStore,
    mockAxiosAdapter,
    ...render(component, { wrapper: Wrapper, ...renderOptions }),
  };
}
