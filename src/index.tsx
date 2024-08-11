import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './components/app/app';

import { FAV_OFFERS } from './mocks/favorites';
import { COMMENTS } from './mocks/comments';
import { fetchOffers } from './store/slices/offers-slice';

import type { Offer } from './types';

store.dispatch(fetchOffers());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App favorites={FAV_OFFERS as Offer[]} reviews={COMMENTS} />
    </Provider>
  </React.StrictMode>
);
