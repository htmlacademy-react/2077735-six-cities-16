import { AvatarSize } from '../../const';
import { capitalizeFirstChar } from '../../helpers/capitalize-first-char';
import { User } from '../../types';

type AvatarProps = {
  user: User;
  classNamePrefix: string;
};

export default function Avatar({ user, classNamePrefix }: AvatarProps) {
  const { name, isPro, avatarUrl } = user;
  const isOfferDetail = classNamePrefix === 'offer';
  return (
    <>
      <div
        className={`${classNamePrefix}__avatar-wrapper ${
          isPro ? `${classNamePrefix}__avatar-wrapper--pro` : ''
        } user__avatar-wrapper`}
        data-testid="avatar"
      >
        <img
          className={`${classNamePrefix}__avatar user__avatar`}
          src={avatarUrl}
          width={isOfferDetail ? AvatarSize.Offer : AvatarSize.Review}
          height={isOfferDetail ? AvatarSize.Offer : AvatarSize.Review}
          alt={`${capitalizeFirstChar(classNamePrefix)} avatar`}
        />
      </div>
      <span className={`${classNamePrefix}__user-name`}>{name}</span>
      {isPro && <span className="offer__user-status">Pro</span>}
    </>
  );
}
