import { Routes } from '@angular/router';
import { authGuard, permissionGuard } from '@abp/ng.core';

export const BASKET_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => {
      return import('./components/basket.component').then(c => c.BasketComponent);
    },
    canActivate: [authGuard, permissionGuard],
  },
];
