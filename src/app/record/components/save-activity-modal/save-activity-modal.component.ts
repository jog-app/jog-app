import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular';
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
  IonButtons,
  IonItem,
  IonInput,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-save-activity-modal',
  templateUrl: './save-activity-modal.component.html',
  styleUrls: ['./save-activity-modal.component.scss'],
  standalone: true,
  imports: [
    IonInput,
    IonItem,
    IonButtons,
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
    FormsModule,
  ],
})
export class SaveActivityModalComponent implements OnInit {
  name: string = '';

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    console.log('### SaveActivityModalComponent ngOnInit');
  }

  cancel() {
    return this.modalController.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalController.dismiss(this.name, 'confirm');
  }
}
