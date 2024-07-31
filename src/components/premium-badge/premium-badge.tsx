type PremiumBadgeProps = {
  isOfferDetail?: boolean;
};

export default function PremiumBadge({ isOfferDetail }: PremiumBadgeProps) {
  return (
    <div className={isOfferDetail ? 'offer__mark' : 'place-card__mark'}>
      <span>Premium</span>
    </div>
  );
}
