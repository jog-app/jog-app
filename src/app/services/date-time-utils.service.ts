import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateTimeUtilsService {
  constructor() {}

  public convertUnixTimestampToISO(unixTimestamp: number): string {
    return new Date(unixTimestamp).toISOString();
  }

  public todaysDateTimeInISO(): string {
    return new Date().toISOString();
  }

  public convertSecondsToHHMMSS(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours}:${minutes}:${remainingSeconds}`;
  }
}
