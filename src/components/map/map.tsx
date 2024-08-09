import leaflet, { LayerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useRef, useEffect } from 'react';
import cn from 'classnames';
import useMap from '../../hooks/use-map';
import { MARKER_URL } from '../../const';

import type { Offer, Location } from '../../types';

type MapProps = {
  cityLocation: Location;
  offers?: Offer[];
  activeOffer?: string | null;
  activeOfferLocation?: Location;
};

const defaultCustomIcon = leaflet.icon({
  iconUrl: MARKER_URL.DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

const currentCustomIcon = leaflet.icon({
  iconUrl: MARKER_URL.CURRENT,
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

export default function Map(props: MapProps): JSX.Element {
  const { cityLocation, offers, activeOffer, activeOfferLocation } = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, cityLocation);
  const markerLayer = useRef<LayerGroup>(leaflet.layerGroup());

  useEffect(() => {
    if (map) {
      map.setView(
        [cityLocation.latitude, cityLocation.longitude],
        cityLocation.zoom
      );
      markerLayer.current.addTo(map);
      markerLayer.current.clearLayers();
    }
  }, [cityLocation, map]);

  useEffect(() => {
    if (map && offers) {
      offers.forEach((offer) => {
        if (offer.location) {
          leaflet
            .marker(
              {
                lat: offer.location.latitude,
                lng: offer.location.longitude,
              },
              {
                icon:
                  activeOffer && activeOffer === offer.id
                    ? currentCustomIcon
                    : defaultCustomIcon,
              }
            )
            .addTo(markerLayer.current);
        }
      });
    }
  }, [map, offers, activeOffer]);

  useEffect(() => {
    if (map && activeOfferLocation) {
      leaflet
        .circle([activeOfferLocation.latitude, activeOfferLocation.longitude], {
          color: 'none',
          fillColor: '#1975c8',
          fillOpacity: 0.5,
          radius: 800,
        })
        .addTo(markerLayer.current);
    }
  }, [map, activeOfferLocation]);

  return (
    <section
      className={cn('map', {
        'offer__map': activeOfferLocation,
        'cities__map': !activeOfferLocation,
      })}
      style={{ height: '500px' }}
      ref={mapRef}
    />
  );
}
