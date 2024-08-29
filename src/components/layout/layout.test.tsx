import { screen } from '@testing-library/react';
import { makeFakeOffer } from '../../utils/test-mocks';
import Layout from './layout';
import { renderWithRouter } from '../../utils/mock-component';

describe('Component: Layout', () => {
  const { getByText, getByTestId } = screen;
  const mockOffer = makeFakeOffer();
  mockOffer.title = 'test title';
  it('renders', () => {
    renderWithRouter(
      <Layout pageClassName="" isLoginPage>
        <span>children</span>
      </Layout>
    );

    expect(getByTestId('layout')).toBeInTheDocument();
    expect(getByTestId('header')).toBeInTheDocument();
    expect(getByText('children')).toBeInTheDocument();
  });
});
