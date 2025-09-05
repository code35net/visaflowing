import { Routes } from '@angular/router';
import { authGuard, permissionGuard } from '@abp/ng.core';

export const CUSTOMER_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => {
      return import('./components/customer.component').then(c => c.CustomerComponent);
    },
    canActivate: [authGuard, permissionGuard],
  },
];
