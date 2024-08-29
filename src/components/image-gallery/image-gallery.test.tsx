import { render, screen } from '@testing-library/react';
import { ImageGallery } from './image-gallery';
import { makeFakeOffer } from '../../utils/test-mocks';
import { MaxCount } from '../../const';

describe('Component: ImageGallery', () => {
  const mockOffer = makeFakeOffer();
  mockOffer.title = 'test title';
  it('renders correct amount of images', () => {
    render(<ImageGallery title={mockOffer.title} images={mockOffer.images} />);

    expect(screen.getAllByAltText('test title')).toHaveLength(
      MaxCount.GalleryImages
    );
  });
});
