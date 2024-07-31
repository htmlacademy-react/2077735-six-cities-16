import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Offer } from '../../types';
import { capitalize } from '../../helpers/capitalize';
import { APP_ROUTE } from '../../const';
import OfferRating from '../offer-rating/offer-rating';
import FavoriteButton from '../favorite-button/favorite-button';
import PremiumBadge from '../premium-badge/premium-badge';

type ReducedOffer = Omit<Offer, 'city' | 'location'>;
type isFavorites = { className: string };
type OfferCardProps = ReducedOffer & isFavorites;

const FAVORITES_CLASS_NAME = 'favorites';

export default function OfferCard({
  id,
  title,
  price,
  type,
  isPremium,
  isFavorite,
  previewImage,
  rating,
  className,
}: OfferCardProps) {
  const [, setIsActiveCard] = useState('');

  const imgWidth = className === FAVORITES_CLASS_NAME ? 150 : 260;
  const imgHeight = className === FAVORITES_CLASS_NAME ? 110 : 200;

  function handleMouseOver() {
    setIsActiveCard(id);
  }
  return (
    <article
      onMouseOver={handleMouseOver}
      className={`${className}__card place-card`}
    >
      {isPremium && <PremiumBadge />}
      <div className={`${className}__image-wrapper place-card__image-wrapper`}>
        <Link to={APP_ROUTE.OFFER.replace(':id', id)}>
          <img
            className="place-card__image"
            src={previewImage}
            width={imgWidth}
            height={imgHeight}
            alt="Place image"
          />
        </Link>
      </div>
      <div
        className={`${
          className === FAVORITES_CLASS_NAME ? 'favorites__card-info' : ''
        } place-card__info`}
      >
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <FavoriteButton className="place-card" isFavorite={isFavorite} />
        </div>
        <OfferRating rating={rating} />
        <h2 className="place-card__name">
          <Link to={APP_ROUTE.OFFER.replace(':id', id)}>{title}</Link>
        </h2>
        <p className="place-card__type">{capitalize(type)}</p>
      </div>
    </article>
  );
}
