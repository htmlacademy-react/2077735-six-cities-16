import { Navigate, useParams } from 'react-router-dom';
import { getMockNearOfferCardsById, getMockOffer } from '../../mocks/offers';
import { APP_ROUTE, LOCATIONS } from '../../const';
import OfferContainer from '../../components/offer-container/offer-container';
import OffersList from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';

import type { LocationName, Review } from '../../types';

type OfferProps = {
  reviews: Review[];
};

export default function OfferPage({ reviews }: OfferProps) {
  const { id: offerId } = useParams();

  const nearbyOffersCards = getMockNearOfferCardsById(offerId);
  const currentOffer = getMockOffer();
  const currentCity = currentOffer.city.name as LocationName;

  if (!currentOffer) {
    return <Navigate to={APP_ROUTE.NOT_FOUND} replace />;
  }

  return (
    <main className="page__main page__main--offer">
      <section className="offer">
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            {currentOffer.images.map((image) => (
              <div key={image} className="offer__image-wrapper">
                <img className="offer__image" src={image} alt="Photo studio" />
              </div>
            ))}
          </div>
        </div>
        <OfferContainer reviews={reviews} currentOffer={currentOffer} />
        {/* <section className="offer__map map" /> */}
        <Map
          city={LOCATIONS[currentCity]}
          offers={nearbyOffersCards}
          activeOffer={currentOffer.id}
          activeOfferLocation={currentOffer.location}
        />
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">
            Other places in the neighbourhood
          </h2>
          <div className="near-places__list places__list">
            <OffersList offers={nearbyOffersCards} className={'near-places'} />
          </div>
        </section>
      </div>
    </main>
  );
}
