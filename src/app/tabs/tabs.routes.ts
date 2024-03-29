import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('../home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'sensors',
        loadComponent: () =>
          import('../sensors/sensors.page').then((m) => m.SensorsPage),
      },
      {
        path: 'tab3',
        loadComponent: () =>
          import('../record/record.page').then((m) => m.RecordPage),
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];
