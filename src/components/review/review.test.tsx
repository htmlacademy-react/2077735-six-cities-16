import { render, screen } from '@testing-library/react';
import OfferReview from './review';
import { makeFakeComment } from '../../utils/test-mocks';

describe('Component: OfferReview', () => {
  const mockReview = makeFakeComment();
  mockReview.comment = 'Lorem Ipsum';
  const expectedText = mockReview.comment;

  it('renders', () => {
    render(<OfferReview review={mockReview} />);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
