import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonCard,
  IonCardTitle,
  IonCardHeader,
  IonCardSubtitle,
  IonList,
  IonInput,
  IonItem,
  IonDatetime,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-record-page',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss'],
  standalone: true,
  imports: [
    IonDatetime,
    IonItem,
    IonInput,
    IonList,
    IonCardSubtitle,
    IonCardHeader,
    IonCardTitle,
    IonCard,
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    CommonModule,
    FormsModule,
  ],
})
export class SettingsPage {}
