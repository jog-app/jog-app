import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivitiesRequestService } from '../services/activities-request.service';
import { ActivityForCreation } from '../models/ActivityForCreation.interface';
import { GeoLocationUtilsService } from '../services/geo-location-utils.service';
import { DateTimeUtilsService } from '../services/date-time-utils.service';

@Injectable({
  providedIn: 'root',
})
export class RecordService {
  constructor(
    private activitiesRequestService: ActivitiesRequestService,
    private geoLocationUtils: GeoLocationUtilsService,
    private dateTimeUtils: DateTimeUtilsService
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

  public saveActivity(
    activityName: string,
    activityType: string,
    timeElapsed: number
  ) {
    const convertedGeoPositions = this.getCoordinateStream().map((position) =>
      this.geoLocationUtils.mapGeoLocationPositionToGeoPositionForCreation(
        position
      )
    );

    // Get todays date-time in UTC format
    const activityDateTime = this.dateTimeUtils.todaysDateTimeInISO();

    const activityDuration =
      this.dateTimeUtils.convertSecondsToHHMMSS(timeElapsed);

    const activityDistance =
      this.geoLocationUtils.calculateTotalDistanceTraveled(
        this.getCoordinateStream()
      );

    // Mocked data
    const newActivity: ActivityForCreation = {
      name: activityName,
      type: activityType,
      date: activityDateTime,
      duration: activityDuration,
      distance: activityDistance ?? 0,
      geoPositions: [...convertedGeoPositions],
    };

    this.activitiesRequestService
      .postActivity(newActivity)
      .subscribe((data) => {
        console.log('### Save Current Run - Response', data);
      });
  }
}
