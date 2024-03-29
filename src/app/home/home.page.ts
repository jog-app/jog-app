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
  IonCardContent, IonButton } from '@ionic/angular/standalone';
import { ActivitiesRequestService } from '../services/activities-request.service';
import { Activity } from '../models/activity.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [IonButton, 
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
    DatePipe,
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
        this.activities = data;
      });
  }
}
