import { EventEmitter, Injectable } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root',
})
export class SensorsService {
  constructor() {}

  private watchingGps: boolean = false;
  public readonly positionEventEmitter =
    new EventEmitter<GeolocationPosition | null>();

  private geolocationRef: Promise<string> | null = null;

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
      this.geolocationRef = Geolocation.watchPosition(
        { enableHighAccuracy: true },
        (position, err) => {
          console.log('New position:', position);
          // Emit the position values to subscribers
          // FIXME: CAN WE ALWAYS CAST THIS TO GeolocationPosition? []
          this.positionEventEmitter.emit(position as GeolocationPosition);
        }
      );
    }
  }

  public async stopGpsTracking() {
    const geolocationRefId = await this.geolocationRef;
    if (geolocationRefId) {
      Geolocation.clearWatch({ id: geolocationRefId });
      this.watchingGps = false;
    }
  }

  //TODO: Motion Sensor Functionality
  public startMotionSensor() {
    console.log('startMotionSensor');
  }

  public stopMotionSensor() {
    console.log('startMotionSensor');
  }
}
