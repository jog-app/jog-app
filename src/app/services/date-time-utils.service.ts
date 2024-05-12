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
    
    let hoursValue;
    if (hours < 10) {
      hoursValue = `0${hours}`;
    } else {
      hoursValue = hours;
    }

    let minutesValue;
    if (minutes < 10) {
      minutesValue = `0${minutes}`;
    } else {
      minutesValue = minutes;
    }

    let secondsValue;
    if (remainingSeconds < 10) {
      secondsValue = `0${remainingSeconds}`;
    } else {
      secondsValue = remainingSeconds;
    }

    if (hours < 10) {
      hours
    }
    return `${hoursValue}:${minutesValue}:${secondsValue}`;
  }
}
