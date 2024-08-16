import { capitalizeFirstChar } from '../../helpers/capitalize-first-char';
import {
  getBadroomsString,
  getAdultsString,
} from '../../helpers/getPluralString';
import { useAuthCheck } from '../../hooks/use-auth-check';
import { OfferDetail, Review } from '../../types';
import Avatar from '../avatar/avatar';
import FavoriteButton from '../favorite-button/favorite-button';
import OfferRating from '../offer-rating/offer-rating';
import PremiumBadge from '../premium-badge/premium-badge';
import ReviewForm from '../review-form/review-form';
import ReviewsList from '../reviews-list/reviews-list';

type OfferContainerProps = {
  reviews: Review[];
  currentOffer: OfferDetail;
};

export default function OfferContainer({
  reviews,
  currentOffer,
}: OfferContainerProps) {
  const {
    id,
    isFavorite,
    isPremium,
    title,
    rating,
    type,
    bedrooms,
    maxAdults,
    price,
    goods,
    host,
    description,
  } = currentOffer;
  const isAuth = useAuthCheck();
  return (
    <div className="offer__container container">
      <div className="offer__wrapper">
        {isPremium && <PremiumBadge isOfferDetail />}
        <div className="offer__name-wrapper">
          <h1 className="offer__name">{title}</h1>
          <FavoriteButton offerId={id} classNamePrefix="offer" isFavorite={isFavorite} />
        </div>
        <OfferRating rating={rating} isOfferDetail />
        <ul className="offer__features">
          <li className="offer__feature offer__feature--entire">
            {capitalizeFirstChar(type)}
          </li>
          <li className="offer__feature offer__feature--bedrooms">
            {getBadroomsString(bedrooms)}
          </li>
          <li className="offer__feature offer__feature--adults">
            {getAdultsString(maxAdults)}
          </li>
        </ul>
        <div className="offer__price">
          <b className="offer__price-value">€{price}</b>
          <span className="offer__price-text">&nbsp;night</span>
        </div>
        <div className="offer__inside">
          <h2 className="offer__inside-title">What&apos;s inside</h2>
          <ul className="offer__inside-list">
            {goods.map((goodsItem) => (
              <li key={goodsItem} className="offer__inside-item">
                {goodsItem}
              </li>
            ))}
          </ul>
        </div>
        <div className="offer__host">
          <h2 className="offer__host-title">Meet the host</h2>
          <div className="offer__host-user user">
            <Avatar user={host} classNamePrefix="offer" />
          </div>
          <div className="offer__description">
            <p className="offer__text">{description}</p>
          </div>
        </div>
        <section className="offer__reviews reviews">
          <ReviewsList reviews={reviews} />
          {isAuth && <ReviewForm />}
        </section>
      </div>
    </div>
  );
}
