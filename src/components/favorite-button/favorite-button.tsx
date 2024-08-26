import { useNavigate } from 'react-router-dom';
import useAuthCheck from '../../hooks/use-auth-check';
import { AppRoute, FavoriteButtonSize } from '../../const';
import { useAppDispatch } from '../../store/hooks';
import { changeFavorite } from '../../store/slices/favorites';
import { useState } from 'react';

type FavoriteButtonProps = {
  classNamePrefix: string;
  isFavorite: boolean;
  offerId: string;
};

const OFFER_CLASS_NAME = 'offer';

export default function FavoriteButton({
  classNamePrefix,
  isFavorite = false,
  offerId,
}: FavoriteButtonProps) {
  const imgWidth =
    classNamePrefix === OFFER_CLASS_NAME
      ? FavoriteButtonSize.Offer.Width
      : FavoriteButtonSize.Card.Width;
  const imgHeight =
    classNamePrefix === OFFER_CLASS_NAME
      ? FavoriteButtonSize.Offer.Hight
      : FavoriteButtonSize.Card.Hight;

  const [isOn, setIsOn] = useState(isFavorite);
  const isLoggedIn = useAuthCheck();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isActive = isLoggedIn && isOn;

  const favoriteLabel = `${isActive ? 'In' : 'To'} bookmarks`;

  const handleClick = () => {
    if (!isLoggedIn) {
      return navigate(AppRoute.Login);
    }

    dispatch(changeFavorite({ offerId, status: Number(!isOn) }));
    setIsOn((prev) => !prev);
  };

  return (
    <button
      className={`${classNamePrefix}__bookmark-button ${
        isActive ? `${classNamePrefix}__bookmark-button--active` : ''
      } button`}
      type="button"
      onClick={handleClick}
    >
      <svg
        className={`${classNamePrefix}__bookmark-icon`}
        width={imgWidth}
        height={imgHeight}
      >
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">{favoriteLabel}</span>
    </button>
  );
}
