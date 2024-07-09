import FormButton from '../form-button/form-button';
import FormRating from '../form-rating/form-rating';
import { useState, ChangeEvent } from 'react';

export default function ReviewForm() {
  const [userReview, setUserReview] = useState({
    text: '',
  });

  const handleFieldChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = evt.target;
    setUserReview({ ...userReview, [name]: value });
  };

  return (
    <form className="reviews__form form">
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <FormRating />
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        defaultValue={''}
        onChange={handleFieldChange}
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
