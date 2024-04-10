import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonCard,
  IonCardTitle,
  IonCardSubtitle,
  IonCardHeader,
  IonCardContent,
  IonModal,
} from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular';

import { fromLonLat } from 'ol/proj';
import { RecordService } from './record.service';
import { SensorsService } from '../sensors/sensors.service';
import { Observable, Subject, takeUntil, timer } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Position } from '@capacitor/geolocation';
import { MapService } from '../components/map/map.service';
import { MapComponent } from '../components/map/map.component';
import { SaveActivityModalComponent } from './components/save-activity-modal/save-activity-modal.component';

@Component({
  selector: 'app-record-page',
  templateUrl: 'record.page.html',
  styleUrls: ['record.page.scss'],
  standalone: true,
  imports: [
    IonModal,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCard,
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    AsyncPipe,
    MapComponent,
  ],
})
export class RecordPage {
  constructor(
    private recordService: RecordService,
    public sensorsService: SensorsService,
    private mapService: MapService,
    private modalController: ModalController
  ) {}

  public activityRunning: boolean = false;
  public timer$: Observable<number> | undefined;
  private stopTimer$ = new Subject<boolean>();
  public timeElapsed: number = 0;
  public lastKnownPosition: number[] | null = null;

  ngOnInit() {
    // TODO: When should we unsubscribe from this? []
    // a) When the component is destroyed
    // b) When the activity is ended
    // c) When the activity is paused?
    this.sensorsService.positionEventEmitter.subscribe(
      (position: GeolocationPosition) => {
        this.mapService.addPointToMap(position);
        this.recordService.setNewCoordinate(position);
      }
    );
  }

  async openSaveActivityModal() {
    const modal = await this.modalController.create({
      component: SaveActivityModalComponent,
    });

    modal.present();

    // Extract data from modal
    const { data, role } = await modal.onWillDismiss();

    console.log('data', data);
    console.log('role', role);

    if (role === 'confirm') {
      // Use extracted data to call record service "save" function
      console.log('Modal Closed', data);
    }
  }

  startActivity() {
    this.timer$ = timer(0, 1000).pipe(takeUntil(this.stopTimer$));
    this.sensorsService.startGpsTracking();
    // this.sensorsService.startMotionSensor();
    this.activityRunning = true;
  }

  pauseActivity() {
    this.sensorsService.stopMotionSensor();
    this.activityRunning = false;
    this.stopTimer$.next(true);
  }

  endActivity() {
    this.pauseActivity();
    this.sensorsService.stopGpsTracking();
    this.recordService.saveActivity();
  }
}
