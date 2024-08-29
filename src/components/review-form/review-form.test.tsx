import { screen } from '@testing-library/react';
import ReviewForm from './review-form';
import { renderWithStore } from '../../utils/mock-component';
import { RequestStatus } from '../../const';

describe('Component: ReviewForm', () => {
  const expectedText = /Your review/i;

  it('renders', () => {
    renderWithStore(<ReviewForm />, {
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
