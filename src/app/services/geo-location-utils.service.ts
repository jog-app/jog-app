import { Injectable } from '@angular/core';
import { GeolocationPosition, Position } from '@capacitor/geolocation';
import { GeoPositionForCreation } from '../models/GeoPositionForCreation.interface';

@Injectable({
  providedIn: 'root',
})
export class GeoLocationUtilsService {
  constructor() {}

  public mapGeoLocationPositionToGeoPositionForCreation(
    position: Position
  ): GeoPositionForCreation {
    console.log('### Position Object', position);

    // TODO: Make date-time-utils service []
    const convertedTimeStamp = new Date(position.timestamp).toISOString();

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
}
