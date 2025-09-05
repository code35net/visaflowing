import { Routes } from '@angular/router';
import { authGuard, permissionGuard } from '@abp/ng.core';

export const CURRENCY_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => {
      return import('./components/currency.component').then(c => c.CurrencyComponent);
    },
    canActivate: [authGuard, permissionGuard],
  },
];
