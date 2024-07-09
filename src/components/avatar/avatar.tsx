import { AVATAR_SIZE } from '../../const';

export default function Avatar() {
  return (
    <div className="reviews__avatar-wrapper user__avatar-wrapper">
      <img
        className="reviews__avatar user__avatar"
        src="img/avatar-max.jpg"
        width={AVATAR_SIZE.REVIEW}
        height={AVATAR_SIZE.REVIEW}
        alt="Reviews avatar"
      />
    </div>
  );
}
