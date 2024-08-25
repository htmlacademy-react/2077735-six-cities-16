import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectCurrentCity } from '../../store/slices/city';
import { fetchOffers } from '../../store/slices/offers';
import MainLocationsList from '../../components/main-locations-list/main-locations-list';
import NoOffers from '../../components/no-offers/no-offers';
import OffersListContainer from '../../components/offers-list-container/offers-list-container';
import Spinner from '../../components/spinner/spinner';
import { useEffect } from 'react';
import Layout from '../../components/layout/layout';
import { useCityOffers } from '../../hooks/use-city-offers';

export default function Main() {
  const currentCity = useAppSelector(selectCurrentCity);

  const { hasOffers, isLoading, offers } = useCityOffers(currentCity.name);
  const isEmpty = !isLoading && !hasOffers;
  const showOffers = !isLoading && hasOffers;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);

  return (
    <Layout
      pageClassName={cn('page page--gray page--main', {
        'page__main--index-empty': isEmpty,
      })}
    >
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
        {showOffers && (
          <OffersListContainer
            offers={offers}
            isEmpty={isEmpty}
            currentCity={currentCity}
          />
        )}
      </main>
    </Layout>
  );
}
