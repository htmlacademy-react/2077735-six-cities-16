import React from 'react';

type FormRatingProps = {
  handleRatingChange: (rating: number) => void;
};

export default function FormRating({ handleRatingChange }: FormRatingProps) {
  const onRatingChange = (event: React.FormEvent) => {
    if (event.target instanceof HTMLInputElement) {
      handleRatingChange(Number(event.target.value));
    }
  };
  return (
    <div
      className="reviews__rating-form form__rating"
      onChange={onRatingChange}
    >
      {[5, 4, 3, 2, 1].map((starValue) => (
        <div key={starValue}>
          <input
            className="form__rating-input visually-hidden"
            name="rating"
            id={`${starValue}-stars`}
            type="radio"
            value={starValue}
          />
          <label
            htmlFor={`${starValue}-stars`}
            className="reviews__rating-label form__rating-label"
            title="perfect"
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
