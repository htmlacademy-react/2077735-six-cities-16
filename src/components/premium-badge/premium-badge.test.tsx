import { render, screen } from '@testing-library/react';
import PremiumBadge from './premium-badge';

describe('Component: PremiumBadge', () => {
  it('renders', () => {
    const expectedText = /Premium/i;

    render(<PremiumBadge />);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
