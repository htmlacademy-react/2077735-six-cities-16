import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectCurrentCity } from '../../store/slices/current-city';
import {
  fetchOffers,
  selectOffersByCityName,
  selectRequestStatus,
} from '../../store/slices/offers';
import MainLocationsList from '../../components/main-locations-list/main-locations-list';
import NoOffers from '../../components/no-offers/no-offers';
import OffersListContainer from '../../components/offers-list-container/offers-list-container';
import { RequestStatus } from '../../const';
import Spinner from '../../components/spinner/spinner';
import { useEffect } from 'react';
import { getToken } from '../../services/token';
import { checkAuth } from '../../store/slices/auth';

export default function Main() {
  const currentCity = useAppSelector(selectCurrentCity);
  const offers = useAppSelector((state) =>
    selectOffersByCityName(state, currentCity.name)
  );
  const requestStatus = useAppSelector(selectRequestStatus);

  const isLoading = requestStatus === RequestStatus.Loading;
  const isEmpty = !isLoading && !offers.length;
  const hasOffers = !isLoading && offers.length;

  const dispatch = useAppDispatch();
  const token = getToken();

  useEffect(() => {
    if (token) {
      dispatch(checkAuth());
    }
    dispatch(fetchOffers());
  }, [token, dispatch]);

  return (
    <main
      className={cn(
        'page__main page__main--index',
        isEmpty && 'page__main--index-empty'
      )}
    >
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <MainLocationsList />
      </div>
      {isLoading && <Spinner />}
      {isEmpty && <NoOffers currentLocation={currentCity.name} />}
      {hasOffers && (
        <OffersListContainer
          offers={offers}
          isEmpty={isEmpty}
          currentCity={currentCity}
        />
      )}
    </main>
  );
}
