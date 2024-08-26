import { Link } from 'react-router-dom';
import { Offer } from '../../types';
import { capitalizeFirstChar } from '../../helpers/capitalize-first-char';
import { AppRoute, CardSize } from '../../const';
import Rating from '../rating/rating';
import FavoriteButton from '../favorite-button/favorite-button';
import PremiumBadge from '../premium-badge/premium-badge';

type ReducedOffer = Omit<Offer, 'city' | 'location'>;
type isFavorites = { className: string };
type onCardHover = { onCardHover?: (offerId: string) => void };
type OfferCardProps = ReducedOffer & isFavorites & onCardHover;

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
  onCardHover,
}: OfferCardProps) {
  const imgWidth =
    className === FAVORITES_CLASS_NAME
      ? CardSize.Favorites.Width
      : CardSize.Main.Width;
  const imgHeight =
    className === FAVORITES_CLASS_NAME
      ? CardSize.Favorites.Hight
      : CardSize.Main.Hight;

  const handleMouseEnter = () => {
    if (onCardHover) {
      onCardHover(id);
    }
  };

  const handleMouseLeave = () => {
    if (onCardHover) {
      onCardHover('');
    }
  };

  return (
    <article
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${className}__card place-card`}
    >
      {isPremium && <PremiumBadge />}
      <div className={`${className}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${AppRoute.Offer}/${id}`}>
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
          <FavoriteButton
            classNamePrefix="place-card"
            isFavorite={isFavorite}
            offerId={id}
          />
        </div>
        <Rating classNamePrefix="place-card" rating={rating} />
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{capitalizeFirstChar(type)}</p>
      </div>
    </article>
  );
}
