import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import { Setting } from './mocks/offers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offersCount={Setting.offersCount} places={Setting.places} />
  </React.StrictMode>
);
