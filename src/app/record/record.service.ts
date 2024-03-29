import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActivitiesRequestService } from '../services/activities-request.service';
import { ActivityForCreation } from '../models/activityForCreation.interface';

@Injectable({
  providedIn: 'root',
})
export class RecordService {
  constructor(private activitiesRequestService: ActivitiesRequestService) {}

  private readonly coordinateStream = new BehaviorSubject<number[][]>([]);
  public readonly coordinateStream$ = this.coordinateStream.asObservable();

  public getCoordinateStream() {
    return this.coordinateStream.value;
  }

  public setNewCoordinate(newValue: number[]) {
    const currentValue = this.getCoordinateStream();
    this.coordinateStream.next([...currentValue, newValue]);
  }

  public saveActivity() {
    // Mocked data
    const newActivity: ActivityForCreation = {
      name: 'Run w Boggy',
      type: 'Run',
      date: '2024-03-28T06:00:00Z',
      duration: '01:30:45',
      distance: 10.0,
    };

    this.activitiesRequestService
      .postActivity(newActivity)
      .subscribe((data) => {
        console.log('### Save Current Run - Response', data);
      });
  }
}
