import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { OFFERS } from './mocks/offers';
import { FAV_OFFERS } from './mocks/favorites';
import { COMMENTS } from './mocks/comments';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      offersCount={OFFERS.length}
      offers={OFFERS}
      favorites={FAV_OFFERS}
      comments={COMMENTS}
    />
  </React.StrictMode>
);
