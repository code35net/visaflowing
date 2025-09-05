import { Routes } from '@angular/router';
import { authGuard, permissionGuard } from '@abp/ng.core';

export const APPLICATION_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => {
      return import('./components/application.component').then(c => c.ApplicationComponent);
    },
    canActivate: [authGuard, permissionGuard],
  },
];
