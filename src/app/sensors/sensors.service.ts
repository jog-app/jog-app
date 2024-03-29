import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SensorsService {
  constructor() {}

  public startMotionSensor() {
    console.log('startMotionSensor');
  }

  public stopMotionSensor() {
    console.log('startMotionSensor');
  }
}
