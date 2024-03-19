import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../constants';
import { Activity } from '../models/activity.interface';

@Injectable({
  providedIn: 'root',
})
export class ActivitiesRequestService {
  constructor(private http: HttpClient) {}

  public getActivities() {
    return this.http.get<Activity[]>(`${Constants.apiPath}/activities`);
  }
}
