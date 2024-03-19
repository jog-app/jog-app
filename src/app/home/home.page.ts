import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
} from '@ionic/angular/standalone';
import { ActivitiesRequestService } from '../services/activities-request.service';
import { Activity } from '../models/activity.interface';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonLabel,
    IonItem,
    IonList,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    HttpClientModule
  ],
  providers: [],
})
export class HomePage implements OnInit {
  constructor(private activitiesRequestService: ActivitiesRequestService) {}

  public activities: Activity[] = [];

  ngOnInit() {
    // console.log('HomePage ngOnInit');
    this.activitiesRequestService
      .getActivities()
      .subscribe((data: Activity[]) => {
        console.log('** home page', data);
        this.activities = data;
      });
  }
}
