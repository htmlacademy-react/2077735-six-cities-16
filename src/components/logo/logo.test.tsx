import { screen } from '@testing-library/react';
import { renderWithRouter } from '../../utils/mock-component';
import Logo from './logo';

describe('Component: Logo', () => {
  it('renders', () => {
    renderWithRouter(<Logo />);

    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
  });
});
