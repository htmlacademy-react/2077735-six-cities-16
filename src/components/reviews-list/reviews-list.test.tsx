import { screen } from '@testing-library/react';
import { renderWithStore } from '../../utils/mock-component';
import { RequestStatus } from '../../const';
import ReviewsList from './reviews-list';

describe('Component: ReviewsList', () => {
  const expectedText = /Reviews/i;

  it('renders', () => {
    renderWithStore(<ReviewsList />, {
      preloadedState: {
        reviews: {
          reviews: [],
          requestStatus: RequestStatus.Success,
        },
      },
    });

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
