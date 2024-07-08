import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Offer } from '../../const';
import { capitalize } from '../../helpers/capitalize';

type OfferCardProps = Omit<Offer, 'city' | 'location'>;

export default function OfferCard({
  id,
  title,
  price,
  type,
  isPremium,
  isFavorite,
  previewImage,
  rating,
}: OfferCardProps) {
  const [isActiveCard, setIsActiveCard] = useState('');

  function handleMouseOver() {
    setIsActiveCard(id);
    console.log(isActiveCard);
  }
  return (
    <article onMouseOver={handleMouseOver} className="cities__card place-card">
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img
            className="place-card__image"
            src={previewImage}
            width={260}
            height={200}
            alt="Place image"
          />
        </a>
      </div>
      <div className="place-card__info">
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
