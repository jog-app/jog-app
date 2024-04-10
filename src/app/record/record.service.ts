import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivitiesRequestService } from '../services/activities-request.service';
import { ActivityForCreation } from '../models/ActivityForCreation.interface';
import { GeoLocationUtilsService } from '../services/geo-location-utils.service';

@Injectable({
  providedIn: 'root',
})
export class RecordService {
  constructor(
    private activitiesRequestService: ActivitiesRequestService,
    private geoLocationUtils: GeoLocationUtilsService
  ) {}

  private readonly coordinateStream = new BehaviorSubject<
    GeolocationPosition[]
  >([]);
  public readonly coordinateStream$ = this.coordinateStream.asObservable();

  public getCoordinateStream() {
    return this.coordinateStream.value;
  }

  public setNewCoordinate(newValue: GeolocationPosition) {
    const currentValue = this.getCoordinateStream();
    this.coordinateStream.next([...currentValue, newValue]);
  }

  public saveActivity() {
    console.log('### Coordinate Stream', this.getCoordinateStream());

    const convertedGeoPositions = this.getCoordinateStream().map((position) =>
      this.geoLocationUtils.mapGeoLocationPositionToGeoPositionForCreation(
        position
      )
    );

    console.log('Converted Geo Positions', convertedGeoPositions);

    // Mocked data
    const newActivity: ActivityForCreation = {
      name: 'Run in the park',
      type: 'Run',
      date: '2024-03-28T06:00:00Z',
      duration: '01:30:45',
      distance: 10.0,
      geoPositions: [...convertedGeoPositions],
    };

    this.activitiesRequestService
      .postActivity(newActivity)
      .subscribe((data) => {
        console.log('### Save Current Run - Response', data);
      });
  }
}
