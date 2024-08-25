import { toast } from 'react-hot-toast';
import FormRating from '../form-rating/form-rating';
import { useState, FormEvent, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { postReview } from '../../store/slices/reviews';

type HTMLReviewForm = HTMLFormElement & {
  rating: RadioNodeList;
  review: HTMLTextAreaElement;
};

export default function ReviewForm() {
  const [isSubmitDisabled, setSubmitDisabled] = useState(true);
  const [isFormDisabled, setFormDisabled] = useState(false);

  const { id: offerId } = useParams();
  const formRef = useRef<HTMLReviewForm>(null);
  const dispatch = useAppDispatch();

  useEffect(() => () => formRef.current?.reset(), [offerId]);

  const handleError = () => {
    setFormDisabled(false);
    setSubmitDisabled(false);
    return 'Something went wrong';
  };

  const handleSuccess = () => {
    setFormDisabled(false);
    formRef.current?.reset();
    return 'Comment sent!';
  };

  function handleInput(event: FormEvent<HTMLReviewForm>) {
    const form = event.currentTarget;
    const review = form.review.value;
    const rating = form.rating.value;
    setSubmitDisabled(review.length < 50 || review.length > 300 || !rating);
  }

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget as HTMLReviewForm;
    event.preventDefault();
    setSubmitDisabled(true);
    setFormDisabled(true);
    if (!offerId) {
      return;
    }

    toast.promise(
      dispatch(
        postReview({
          body: {
            comment: form.review.value,
            rating: Number(form.rating.value),
          },
          offerId,
        })
      ).unwrap(),
      {
        error: handleError,
        loading: 'Sending...',
        success: handleSuccess,
      }
    );
  };

  return (
    <form
      className="reviews__form form"
      onSubmit={handleFormSubmit}
      onInput={handleInput}
      ref={formRef}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <FormRating disabled={isFormDisabled} />
      <textarea
        className="reviews__textarea form__textarea"
        disabled={isFormDisabled}
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          disabled={isSubmitDisabled}
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
