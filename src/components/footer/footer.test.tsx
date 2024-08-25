import { screen } from '@testing-library/react';
import Footer from './footer';
import { renderWithRouter } from '../../utils/mock-component';

describe('Component: Footer', () => {
  it('renders correctly', () => {
    renderWithRouter(<Footer />);

    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
