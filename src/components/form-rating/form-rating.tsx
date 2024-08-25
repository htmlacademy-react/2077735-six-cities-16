import { Fragment } from 'react';
import { RATING } from '../../const';

type FormRatingProps = {
  disabled: boolean;
};

export default function FormRating({
  disabled,
}: FormRatingProps) {
  return (
    <div className="reviews__rating-form form__rating" data-testid="form-rating">
      {RATING.map((item) => (
        <Fragment key={item.title}>
          <input
            className="form__rating-input visually-hidden"
            name="rating"
            id={`${item.stars}-stars`}
            type="radio"
            defaultValue={item.stars}
            disabled={disabled}
          />
          <label
            htmlFor={`${item.stars}-stars`}
            className="reviews__rating-label form__rating-label"
            title={item.title}
          >
            <svg className="form__star-image" width={37} height={33}>
              <use xlinkHref="#icon-star" />
            </svg>
          </label>
        </Fragment>
      ))}
    </div>
  );
}
