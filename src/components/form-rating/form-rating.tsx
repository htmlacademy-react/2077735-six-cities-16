import React from 'react';
import { RATING } from '../../const';

type FormRatingProps = {
  onRatingChange: (rating: number) => void;
};

export default function FormRating({ onRatingChange }: FormRatingProps) {
  const handleRatingChange = (event: React.FormEvent) => {
    if (event.target instanceof HTMLInputElement) {
      onRatingChange(Number(event.target.value));
    }
  };
  return (
    <div
      className="reviews__rating-form form__rating"
      onChange={handleRatingChange}
    >
      {RATING.map((item) => (
        <div key={item.title}>
          <input
            className="form__rating-input visually-hidden"
            name="rating"
            id={`${item.stars}-stars`}
            type="radio"
            value={item.stars}
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
        </div>
      ))}
    </div>
  );
}
