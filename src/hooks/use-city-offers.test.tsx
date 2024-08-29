import { renderHook } from '@testing-library/react';
import { renderWithStore } from '../utils/mock-component';
import { RequestStatus } from '../const';
import { makeFakeOffer } from '../utils/test-mocks';
import useCityOffers from './use-city-offers';

describe('Hook: useCityOffers', () => {
  it('returns "hasOffers: true" if the offers list has entries for the passed city name', () => {
    const mockOffer = makeFakeOffer();
    mockOffer.city.name = 'Paris';
    const { Wrapper: wrapper } = renderWithStore(null, {
      preloadedState: {
        offers: {
          activeOffer: '',
          offers: [mockOffer],
          requestStatus: RequestStatus.Success,
        },
      },
    });
    const { result } = renderHook(() => useCityOffers('Paris'), { wrapper });

    expect(result.current.hasOffers).toBe(true);
  });

  it('returns "hasOffers: false" if the offers list has no entries for the passed city name', () => {
    const mockOffer = makeFakeOffer();
    mockOffer.city.name = 'Amsterdam';
    const { Wrapper: wrapper } = renderWithStore(null, {
      preloadedState: {
        offers: {
          activeOffer: '',
          offers: [mockOffer],
          requestStatus: RequestStatus.Success,
        },
      },
    });
    const { result } = renderHook(() => useCityOffers('Paris'), { wrapper });

    expect(result.current.hasOffers).toBe(false);
  });

  it('returns "hasOffers: false" if the offers list is empty', () => {
    const { Wrapper: wrapper } = renderWithStore(null, {
      preloadedState: {
        offers: {
          activeOffer: '',
          offers: [],
          requestStatus: RequestStatus.Success,
        },
      },
    });
    const { result } = renderHook(() => useCityOffers('Paris'), { wrapper });

    expect(result.current.hasOffers).toBe(false);
  });

  it('returns "isLoading: true" if offers request status is "Loading"', () => {
    const { Wrapper: wrapper } = renderWithStore(null, {
      preloadedState: {
        offers: {
          activeOffer: '',
          offers: [],
          requestStatus: RequestStatus.Loading,
        },
      },
    });
    const { result } = renderHook(() => useCityOffers('Paris'), { wrapper });

    expect(result.current.isLoading).toBe(true);
  });

  it('returns "isLoading: false" if offers request status is not "Loading"', () => {
    const { Wrapper: wrapper } = renderWithStore(null, {
      preloadedState: {
        offers: {
          activeOffer: '',
          offers: [],
          requestStatus: RequestStatus.Success,
        },
      },
    });
    const { result } = renderHook(() => useCityOffers('Paris'), { wrapper });

    expect(result.current.isLoading).toBe(false);
  });

  it('returns offers list for the passed city name', () => {
    const firstOffer = makeFakeOffer();
    const secondOffer = makeFakeOffer();

    firstOffer.city.name = 'Paris';
    secondOffer.city.name = 'Amsterdam';

    const { Wrapper: wrapper } = renderWithStore(null, {
      preloadedState: {
        offers: {
          activeOffer: '',
          offers: [firstOffer, secondOffer],
          requestStatus: RequestStatus.Loading,
        },
      },
    });
    const { result } = renderHook(() => useCityOffers('Paris'), { wrapper });

    expect(result.current.offers).toStrictEqual([firstOffer]);
  });
});
