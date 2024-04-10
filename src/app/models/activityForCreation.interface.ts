import { GeoPositionForCreation } from './GeoPositionForCreation.interface';

export interface ActivityForCreation {
  name: string;
  type: string;
  date: Date | string;
  duration: string;
  distance: number;
  geoPositions: GeoPositionForCreation[];
}
