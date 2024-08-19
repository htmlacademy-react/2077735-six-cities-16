import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectCurrentCity } from '../../store/slices/current-city';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { NEARBY_OFFERS_COUNT, RequestStatus } from '../../const';
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
import { fetchReviews } from '../../store/slices/reviews';
import Spinner from '../../components/spinner/spinner';
import { Offer } from '../../types';
import Layout from '../../components/layout/layout';
import NotFoundPage from '../not-found-page/not-found-page';
import { ImageGallery } from '../../components/image-gallery/image-gallery';
import { setActiveOffer } from '../../store/slices/offers';

export default function OfferPage() {
  const { id: offerId } = useParams();
  const dispatch = useAppDispatch();

  const currentOffer = useAppSelector(selectOffer);
  const offerRequestStatus = useAppSelector(selectOfferRequestStatus);
  const currentCity = useAppSelector(selectCurrentCity);
  const allOffersNearby = useAppSelector(selectOffersNearby);
  const offersNearbyList = allOffersNearby.slice(0, NEARBY_OFFERS_COUNT);
  const pointsOnMap = [currentOffer, ...offersNearbyList];

  let title, images;
  if (currentOffer) {
    title = currentOffer.title;
    images = currentOffer.images;
  }

  useEffect(() => {
    Promise.all([
      dispatch(fetchOfferById(offerId as string)),
      dispatch(fetchOffersNearby(offerId as string)),
      dispatch(fetchReviews(offerId as string)),
    ]);
    dispatch(setActiveOffer(offerId as string));
  }, [dispatch, offerId]);

  if (offerRequestStatus === RequestStatus.Loading) {
    return <Spinner />;
  }

  if (offerRequestStatus === RequestStatus.Failed || !currentOffer) {
    return <NotFoundPage />;
  }

  return (
    <Layout pageClassName="page">
      <main className="page__main page__main--offer">
        <section className="offer">
          <ImageGallery images={images} title={title} />
          <OfferContainer currentOffer={currentOffer} />
          <Map
            cityLocation={currentCity.location}
            offers={pointsOnMap as Offer[]}
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
