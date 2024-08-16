import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectCurrentCity } from '../../store/slices/current-city';
import { Navigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { APP_ROUTE, NEARBY_OFFERS_COUNT, RequestStatus } from '../../const';
import OfferContainer from '../../components/offer-container/offer-container';
import OffersList from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';
import {
  fetchOfferById,
  fetchOffersNearby,
  selectOffer,
  selectOfferRequestStatus,
  selectOffersNearby,
} from '../../store/slices/offer';
import { fetchReviews, selectReviews } from '../../store/slices/reviews';
import Spinner from '../../components/spinner/spinner';
import { Offer } from '../../types';
import Layout from '../../components/layout/layout';

export default function OfferPage() {
  const { id: offerId } = useParams();
  const dispatch = useAppDispatch();

  const currentOffer = useAppSelector(selectOffer);
  const offerRequestStatus = useAppSelector(selectOfferRequestStatus);
  const currentCity = useAppSelector(selectCurrentCity);
  const allOffersNearby = useAppSelector(selectOffersNearby);
  const reviews = useAppSelector(selectReviews);

  const offersNearbyList = allOffersNearby.slice(0, NEARBY_OFFERS_COUNT);
  const pointsOnMap = [currentOffer, ...offersNearbyList];

  useEffect(() => {
    Promise.all([
      dispatch(fetchOfferById(offerId as string)),
      dispatch(fetchOffersNearby(offerId as string)),
      dispatch(fetchReviews(offerId as string)),
    ]);
  }, [dispatch, offerId]);

  if (offerRequestStatus === RequestStatus.Loading) {
    return <Spinner />;
  }

  if (offerRequestStatus === RequestStatus.Failed || !currentOffer) {
    return <Navigate to={APP_ROUTE.NOT_FOUND} replace />;
  }

  return (
    <Layout pageClassName='page'>
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {currentOffer?.images.map((image) => (
                <div key={image} className="offer__image-wrapper">
                  <img
                    className="offer__image"
                    src={image}
                    alt="Photo studio"
                  />
                </div>
              ))}
            </div>
          </div>
          <OfferContainer reviews={reviews} currentOffer={currentOffer} />
          <Map
            cityLocation={currentCity.location}
            offers={pointsOnMap as Offer[]}
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
              <OffersList offers={offersNearbyList} className={'near-places'} />
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}
