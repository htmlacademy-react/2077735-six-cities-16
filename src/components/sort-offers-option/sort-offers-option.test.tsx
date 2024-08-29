import { render, screen } from '@testing-library/react';
import SortOffersOption from './sort-offers-option';

describe('Component: SortOffersOption', () => {
  const expectedText = /popular/i;

  it('renders', () => {
    render(
      <SortOffersOption
        sortingOption="popular"
        currentType="popular"
        onOptionClick={() => {}}
      />
    );

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
