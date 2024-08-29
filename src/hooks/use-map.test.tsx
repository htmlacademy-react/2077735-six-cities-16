import { renderHook } from '@testing-library/react';
import useMap from './use-map';

describe('Hook: useFavoritesCount', () => {
  it('returns map object with passed coordinates', () => {
    const mapRef = { current: document.createElement('div') };
    const city = { latitude: 51.505, longitude: -0.09, zoom: 13 };

    const { result } = renderHook(() => useMap(mapRef, city));

    expect(result.current).not.toBeNull();
    expect(result.current?.options).toStrictEqual({
      center: { lat: 51.505, lng: -0.09 },
      zoom: 13,
    });
  });
});
