import { renderHook } from '@testing-library/react';
import { renderWithStore } from '../utils/mock-component';
import { MaxCount, RequestStatus } from '../const';
import { makeFakeComment } from '../utils/test-mocks';
import useReviews from './use-reviews';

describe('Hook: useReviews', () => {
  it('returns correct amount of reviews', () => {
    const mockReviews = Array.from({ length: 15 }, () => makeFakeComment());

    const { Wrapper: wrapper } = renderWithStore(null, {
      preloadedState: {
        reviews: {
          reviews: mockReviews,
          requestStatus: RequestStatus.Success,
        },
      },
    });
    const { result } = renderHook(() => useReviews(), { wrapper });

    expect(result.current.reviewsToRender).toHaveLength(MaxCount.Reviews);
  });

  it('returns correct reviews count', () => {
    const mockReviews = Array.from({ length: 15 }, () => makeFakeComment());

    const { Wrapper: wrapper } = renderWithStore(null, {
      preloadedState: {
        reviews: {
          reviews: mockReviews,
          requestStatus: RequestStatus.Success,
        },
      },
    });
    const { result } = renderHook(() => useReviews(), { wrapper });

    expect(result.current.reviewsCount).toBe(15);
  });
});
