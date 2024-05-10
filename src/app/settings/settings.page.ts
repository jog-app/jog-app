import { Component, OnDestroy } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton, IonCard, IonCardTitle, IonCardHeader, IonCardSubtitle, IonList, IonInput, IonItem, IonDatetime } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
  selector: 'app-record-page',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss'],
  standalone: true,
  imports: [IonDatetime, IonItem, IonInput, IonList, IonCardSubtitle, IonCardHeader, IonCardTitle, IonCard, 
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainerComponent,
  ],
})
export class SettingsPage {
    
}

