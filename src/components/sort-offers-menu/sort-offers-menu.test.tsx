import { render, screen } from '@testing-library/react';
import SortOffersMenu from './sort-offers-menu';

describe('Component: SortOffersMenu', () => {
  const expectedText = /Sort by/i;

  it('renders', () => {
    render(
      <SortOffersMenu currentSortOption="popular" onOptionChange={() => {}} />
    );

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
