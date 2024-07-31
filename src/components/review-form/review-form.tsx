import FormButton from '../form-button/form-button';
import FormRating from '../form-rating/form-rating';
import { useState, ChangeEvent } from 'react';

export default function ReviewForm() {
  const [reviewText, setReviewText] = useState('');
  const [, setUserRating] = useState(0);

  const handleRatingChange = (rating: number) => {
    setUserRating(rating);
  };

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(event.target.value);
  };

  // console.log('rating', userRating);
  // console.log('reviewText', reviewText);

  return (
    <form className="reviews__form form">
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <FormRating handleRatingChange={handleRatingChange} />
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleTextChange}
        value={reviewText}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <FormButton />
      </div>
    </form>
  );
}
