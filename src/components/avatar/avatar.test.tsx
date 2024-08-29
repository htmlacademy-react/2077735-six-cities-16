import { render, screen } from '@testing-library/react';
import Avatar from './avatar';

describe('Component: Avatar', () => {
  const user = {
    name: 'John Doe',
    avatarUrl: 'testAvatarUrl',
    isPro: false,
    email: 'test@test.test',
    token: 'secret',
  };

  it('renders correctly', () => {
    const { getByTestId } = screen;

    render(<Avatar user={user} classNamePrefix={''} />);

    expect(getByTestId('avatar')).toBeInTheDocument();
  });

  it('renders "Pro" badge if the user is pro', () => {
    const { getByText } = screen;
    const proUser = { ...user, isPro: true };
    const expectedText = /Pro/i;

    render(<Avatar user={proUser} classNamePrefix={''} />);

    expect(getByText(expectedText)).toBeInTheDocument();
  });

  it('renders user name correctly', () => {
    const { getByText } = screen;
    const expectedText = /John Doe/i;

    render(<Avatar user={user} classNamePrefix={''} />);

    expect(getByText(expectedText)).toBeInTheDocument();
  });

  it('renders avatar image', () => {
    const { getByAltText } = screen;
    const expectedText = /avatar/i;

    render(<Avatar user={user} classNamePrefix={''} />);

    expect(getByAltText(expectedText)).toBeInTheDocument();
  });
});
