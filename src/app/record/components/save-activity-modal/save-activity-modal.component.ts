import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
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
    ReactiveFormsModule,
  ],
})
export class SaveActivityModalComponent implements OnInit {
  name: string = '';

  saveActivityForm = new FormGroup({
    name: new FormControl(''),
    activityType: new FormControl(''),
  });

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    console.log('### SaveActivityModalComponent ngOnInit');
  }

  cancel() {
    return this.modalController.dismiss(null, 'cancel');
  }

  confirm() {
    // const { name, activityType } = this.saveActivityForm.value;

    return this.modalController.dismiss(this.saveActivityForm.value, 'confirm');
  }
}
