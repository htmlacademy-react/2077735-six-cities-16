import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './components/app/app';

import { fetchOffers } from './store/slices/offers';

import type { Offer } from './types';
import { FAV_OFFERS } from './mocks/favorites';

store.dispatch(fetchOffers());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App favorites={FAV_OFFERS as Offer[]} />
    </Provider>
  </React.StrictMode>
);
