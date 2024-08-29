import { screen } from '@testing-library/react';
import FavoriteCount from './favorite-count';
import { renderWithStore } from '../../utils/mock-component';
import { RequestStatus } from '../../const';
import { makeFakeOffer } from '../../utils/test-mocks';

describe('Component: FavoriteCount', () => {
  it('renders correctly', () => {
    const firstFavorite = makeFakeOffer();
    const secondFavorite = makeFakeOffer();
    renderWithStore(<FavoriteCount />, {
      preloadedState: {
        favorites: {
          favorites: [firstFavorite, secondFavorite],
          requestStatus: RequestStatus.Success,
        },
      },
    });
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
