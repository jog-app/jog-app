import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonGrid,
  IonCard,
  IonCardTitle,
  IonCardHeader,
  IonCardSubtitle,
  IonCardContent,
  IonItem,
  IonList,
  IonLabel,
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { AccelListenerEvent, Motion } from '@capacitor/motion';
import { Geolocation, Position } from '@capacitor/geolocation';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    IonLabel,
    IonList,
    IonItem,
    IonCardContent,
    IonCardSubtitle,
    IonCardHeader,
    IonCardTitle,
    IonCard,
    IonGrid,
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainerComponent,
    DatePipe,
  ],
})
export class Tab1Page {
  constructor() {}

  position: Position | null = null;
  motionData: AccelListenerEvent | null = null;
  watchingGps: boolean = false;

  courseLocationPermission: boolean = false;
  locationPermission : boolean = false;

  checkSensorPermissions() {
    console.log('Checking sensor permissions');
  }

  checkGpsPermissions() {
    Geolocation.checkPermissions().then((permissionsResult) => {
      console.log('Permissions:', permissionsResult);
    });
  }

  requestGpsPermissions() {
    Geolocation.requestPermissions().then((permissionsResult) => {
      console.log('Permissions:', permissionsResult);
    });
  }

  async checkMotionSensorsPermissions() {
    try {
      // Hacky -> Check if the method exists before calling it
      // It is only available on iOS and Android (not desktop)
      await (DeviceMotionEvent as any).requestPermission();
    } catch (e) {
      console.error(e);
    }
  }

  

  startSensors() {
    this.checkGpsPermissions();

    Motion.addListener('accel', (event) => {
      console.log('Accel event fired', event);
      this.motionData = event;
      console.log('Motion data:', this.motionData);
      console.log('Position:', this.position);
    });
  }

  stopSensors() {
    Motion.removeAllListeners();
  }

  async getCoords() {
    const coordinates = await Geolocation.getCurrentPosition();
    console.log('Current position:', coordinates);
  }

  async watchCoords() {
    if (this.watchingGps) {
      this.stopGps();
      this.watchingGps = false;
    } else {
      Geolocation.watchPosition(
        { enableHighAccuracy: true },
        (position, err) => {
          console.log('New position:', position);
          this.position = position;
        }
      );
      this.watchingGps = true;
    }
  }

  async stopGps() {
    Geolocation.clearWatch({ id: 'watch' });
  }
}
