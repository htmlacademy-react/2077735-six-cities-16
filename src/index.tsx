import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './components/app/app';

import { OFFERS } from './mocks/offers';
import { FAV_OFFERS } from './mocks/favorites';
import { COMMENTS } from './mocks/comments';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        offersCount={OFFERS.length}
        offers={OFFERS}
        favorites={FAV_OFFERS}
        reviews={COMMENTS}
      />
    </Provider>
  </React.StrictMode>
);
