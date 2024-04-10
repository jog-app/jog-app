import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateTimeUtilsService {
  constructor() {}

  public convertUnixTimestampToUTC(unixTimestamp: number): string {
    return new Date(unixTimestamp).toISOString();
  }
}
