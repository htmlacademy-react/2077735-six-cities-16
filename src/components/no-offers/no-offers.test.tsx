import { render, screen } from '@testing-library/react';
import { LocationsNames } from '../../const';
import NoOffers from '../no-offers/no-offers';

describe('Component: NoOffers', () => {
  it('renders', () => {
    const expectedText =
      /We could not find any property available at the moment in Paris/i;

    render(<NoOffers currentLocation={LocationsNames[0]} />);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
