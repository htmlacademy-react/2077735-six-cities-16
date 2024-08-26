import { Icon, Marker, layerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useRef, useEffect, memo } from 'react';
import cn from 'classnames';
import useMap from '../../hooks/use-map';
import { MarkerUrl } from '../../const';

import type { Offer, Location } from '../../types';
import { useAppSelector } from '../../store/hooks';
import { selectActiveOffer } from '../../store/slices/offers';

type MapProps = {
  cityLocation: Location;
  offers: Offer[];
  activeOfferLocation?: Location;
};

const defaultMarkerIcon = new Icon({
  iconUrl: MarkerUrl.Default,
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

const currentMarkerIcon = new Icon({
  iconUrl: MarkerUrl.Current,
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

function Map_(props: MapProps): JSX.Element {
  const { cityLocation, offers, activeOfferLocation } = props;
  const activeOffer = useAppSelector(selectActiveOffer);

  const mapRef = useRef(null);
  const map = useMap(mapRef, cityLocation);

  useEffect(() => {
    if (map && cityLocation) {
      map.setView(
        [cityLocation.latitude, cityLocation.longitude],
        cityLocation.zoom
      );
    }
  }, [cityLocation, map]);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });
        marker
          .setIcon(
            offer.id === activeOffer ? currentMarkerIcon : defaultMarkerIcon
          )
          .addTo(markerLayer);
      });
      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, activeOffer]);

  return (
    <section
      className={cn('map', activeOfferLocation ? 'offer__map' : 'cities__map')}
      style={{ height: '500px' }}
      ref={mapRef}
    />
  );
}

const Map = memo(Map_);
export default Map;
