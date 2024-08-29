import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { AppThunkDispatch } from './test-mocks';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactElement, ReactNode } from 'react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { RenderOptions } from '@testing-library/react';
import { AppStore, RootState } from '../store/store';
import { createAPI } from '../services/api';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

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

function prepareMockStore(preloadedState: Partial<RootState>) {
  const axios = createAPI();
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<
    RootState,
    Action<string>,
    AppThunkDispatch
  >(middleware);
  const mockStore = mockStoreCreator(preloadedState);

  return mockStore;
}

export function renderWithStore(
  component: React.ReactElement | null,
  extendedRenderOptions: ExtendedRenderOptions = {}
) {
  const { preloadedState = {}, ...renderOptions } = extendedRenderOptions;
  const mockStore = prepareMockStore(preloadedState);

  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={mockStore}>{children}</Provider>
  );

  if (!component) {
    return {
      Wrapper,
      mockStore,
    };
  }

  return {
    Wrapper,
    mockStore,
    ...render(component, { wrapper: Wrapper, ...renderOptions }),
  };
}

export const renderWithRouterAndRedux = (
  component: React.ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {},
  { route = '/' } = {}
) => {
  const { preloadedState = {}, ...renderOptions } = extendedRenderOptions;
  const mockStore = prepareMockStore(preloadedState);
  window.history.pushState({}, 'Initial Page', route);

  const Wrapper: React.FC = ({ children }: PropsWithChildren) => (
    <Provider store={mockStore}>
      <MemoryRouter>{children}</MemoryRouter>
    </Provider>
  );

  return {
    user: userEvent.setup(),
    mockStore,
    ...render(component, { wrapper: Wrapper, ...renderOptions }),
  };
};
