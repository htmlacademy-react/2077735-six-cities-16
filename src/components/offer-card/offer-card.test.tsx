import { screen } from '@testing-library/react';
import { internet } from 'faker';
import OfferCard from './offer-card';
import { makeFakeOffer } from '../../utils/test-mocks';
import { renderWithRouterAndRedux } from '../../utils/mock-component';
import { AuthorizationStatus, RequestStatus } from '../../const';

describe('Component: OfferCard', () => {
  it('renders', () => {
    const mockOffer = makeFakeOffer();
    const { id, title, price, type, isPremium, isFavorite, rating } = mockOffer;
    const previewImage = internet.url();

    renderWithRouterAndRedux(
      <OfferCard
        id={id}
        title={title}
        price={price}
        type={type}
        isPremium={isPremium}
        isFavorite={isFavorite}
        previewImage={previewImage}
        rating={rating}
        className=""
        onCardHover={() => {}}
      />,
      {
        preloadedState: {
          auth: {
            userData: null,
            authorizationStatus: AuthorizationStatus.Auth,
            requestStatus: RequestStatus.Success,
          },
        },
      }
    );

    expect(screen.getByText(title)).toBeInTheDocument();
  });
});
