import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../constants';
import { Activity } from '../models/activity.interface';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActivitiesRequestService {
  constructor(private http: HttpClient, private userService: UserService) {}

  /**
   * @description Get activities for the current user
   */
  public getActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(
      `${Constants.apiPath}/users/${this.userService.getUserId()}/activities`
    );
  }
}
