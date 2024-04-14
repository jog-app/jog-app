import { Injectable } from '@angular/core';
import { GeolocationPosition, Position } from '@capacitor/geolocation';
import { GeoPositionForCreation } from '../models/GeoPositionForCreation.interface';
import { DateTimeUtilsService } from './date-time-utils.service';
import { retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeoLocationUtilsService {
  constructor(private dateTimeUtils: DateTimeUtilsService) {}

  public mapGeoLocationPositionToGeoPositionForCreation(
    position: Position
  ): GeoPositionForCreation {
    console.log('### Position Object', position);

    const convertedTimeStamp = this.dateTimeUtils.convertUnixTimestampToISO(
      position.timestamp
    );

    const geoPositionForCreation: GeoPositionForCreation = {
      timestamp: convertedTimeStamp,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      altitude: position.coords.altitude ?? undefined,
      accuracy: position.coords.accuracy,
      altitudeAccuracy: position.coords.altitudeAccuracy ?? undefined,
      heading: position.coords.heading ?? undefined,
      speed: position.coords.speed ?? undefined,
    };

    return geoPositionForCreation;
  }

  public calculateTotalDistanceTraveled(positions: Position[]): number {
    let distance = 0;
    for (let i = 0; i < positions.length - 1; i++) {
      const pos1 = positions[i];
      const pos2 = positions[i + 1];
      distance += this.calculateDistanceBetweenTwoGeoPositions(pos1, pos2);
    }

    return distance;
  }

  /**
   * @description Haversine formula - used to calculate the distance between two geo positions
   * @link https://en.wikipedia.org/wiki/Haversine_formula
   */
  // TODO: [] Should we use the Haversine formula or the Vincenty formula?
  // TODO: [] Should this be calculated on the server-side instead? I could just send the coordinates to the server and let it calculate the distance
  public calculateDistanceBetweenTwoGeoPositions(
    pos1: Position,
    pos2: Position
  ): number {
    const lat1 = pos1.coords.latitude;
    const lon1 = pos1.coords.longitude;
    const lat2 = pos2.coords.latitude;
    const lon2 = pos2.coords.longitude;


    // Haversine formula
    const R = 6371e3; // metres
    const lr1 = this.degreesToRadians(lat1);
    const lr2 = this.degreesToRadians(lat2);
    const dlr = this.degreesToRadians(lat2 - lat1);
    const dlo = this.degreesToRadians(lon2 - lon1);

    const a =
      Math.sin(dlr / 2) * Math.sin(dlr / 2) +
      Math.cos(lr1) * Math.cos(lr2) * Math.sin(dlo / 2) * Math.sin(dlo / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;

    return d;
  }

  public degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
}
