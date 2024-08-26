import { Locations } from '../const';
import { City } from '../types';

export function getRandomLocation(locations: typeof Locations): City {
  const randomIndex = Math.floor(Math.random() * locations.length);
  return locations[randomIndex];
}
