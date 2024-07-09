import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Offer } from '../../types';
import { capitalize } from '../../helpers/capitalize';
import { IMG_SIZE } from '../../const';

type ReducedOffer = Omit<Offer, 'city' | 'location'>;
type isFavorites = { isFavorites?: boolean };
type OfferCardProps = ReducedOffer & isFavorites;

export default function OfferCard({
  id,
  title,
  price,
  type,
  isPremium,
  isFavorite,
  previewImage,
  rating,
  isFavorites,
}: OfferCardProps) {
  const [isActiveCard, setIsActiveCard] = useState('');

  function handleMouseOver() {
    setIsActiveCard(id);
    console.log(isActiveCard);
  }
  return (
    <article
      onMouseOver={handleMouseOver}
      className={`${
        isFavorites ? 'favorites__card' : 'cities__card'
      } place-card`}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div
        className={`${
          isFavorites ? 'favorites__image-wrapper' : 'cities__image-wrapper'
        } place-card__image-wrapper`}
      >
        <a href="#">
          <img
            className="place-card__image"
            src={previewImage}
            width={isFavorites ? IMG_SIZE.WIDTH.FAVORITES : IMG_SIZE.WIDTH.MAIN}
            height={
              isFavorites ? IMG_SIZE.HEIGHT.FAVORITES : IMG_SIZE.HEIGHT.MAIN
            }
            alt="Place image"
          />
        </a>
      </div>
      <div
        className={`${isFavorites && 'favorites__card-info'} place-card__info`}
      >
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${
              isFavorite && 'place-card__bookmark-button--active button'
            }`}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: '80%' }} />
            <span className="visually-hidden">Rating {rating}</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{capitalize(type)}</p>
      </div>
    </article>
  );
}
