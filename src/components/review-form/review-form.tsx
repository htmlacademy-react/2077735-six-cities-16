import FormButton from '../form-button/form-button';
import FormRating from '../form-rating/form-rating';
import { useState, ChangeEvent, FormEvent } from 'react';

import type { PostReviewProps } from '../../types';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { postReview } from '../../store/slices/reviews';

export default function ReviewForm() {
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: '',
  });
  const { id: offerId } = useParams();
  const dispatch = useAppDispatch();

  const handleRatingChange = (rating: number) => {
    setNewReview({ ...newReview, rating });
  };

  const handleTextChange = ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
    setNewReview({ ...newReview, comment: target.value });
  };

  const handleFormSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    if (!offerId) {
      return;
    }
    const data: PostReviewProps = {
      offerId,
      body: {
        ...newReview,
      },
    };

    dispatch(postReview(data));
  };

  return (
    <form className="reviews__form form" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <FormRating onRatingChange={handleRatingChange} />
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleTextChange}
        value={newReview.comment}
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
