import { Routes } from '@angular/router';
import { authGuard, permissionGuard } from '@abp/ng.core';

export const COUNTRY_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => {
      return import('./components/country.component').then(c => c.CountryComponent);
    },
    canActivate: [authGuard, permissionGuard],
  },
];
