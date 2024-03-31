import { EventEmitter, Injectable } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root',
})
export class SensorsService {
  constructor() {}

  private watchingGps: boolean = false;
  public readonly positionEventEmitter = new EventEmitter<Position | null>();

  // Location Permissions
  public locationPermission: boolean = false;
  public courseLocationPermission: boolean = false;

  public checkGpsPermissions() {
    Geolocation.checkPermissions().then((permissionsResult) => {
      console.log('Permissions:', permissionsResult);
    });
  }

  public requestGpsPermissions() {
    Geolocation.requestPermissions().then((permissionsResult) => {
      console.log('Permissions:', permissionsResult);
    });
  }

  public async startGpsTracking() {
    if (this.watchingGps) {
      this.stopGpsTracking();
      this.watchingGps = false;
    } else {
      this.watchingGps = true;
      Geolocation.watchPosition(
        { enableHighAccuracy: true },
        (position, err) => {
          console.log('New position:', position);
          // Emit the position values to subscribers
          this.positionEventEmitter.emit(position);
        }
      );
    }
  }

  public async stopGpsTracking() {
    Geolocation.clearWatch({ id: 'watch' });
  }

  // Motion Sensors
  public startMotionSensor() {
    console.log('startMotionSensor');
  }

  public stopMotionSensor() {
    console.log('startMotionSensor');
  }
}
