import { MaxCount } from '../../const';
import { OfferDetail } from '../../types';

type ImageGalleryProps = Partial<Pick<OfferDetail, 'images' | 'title'>>;

export function ImageGallery({ images = [], title }: ImageGalleryProps) {
  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {images.slice(0, MaxCount.GalleryImages).map((image) => (
          <div className="offer__image-wrapper" key={image}>
            <img alt={title} className="offer__image" src={image} />
          </div>
        ))}
      </div>
    </div>
  );
}
