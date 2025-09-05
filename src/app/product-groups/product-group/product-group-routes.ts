import { Routes } from '@angular/router';
import { authGuard, permissionGuard } from '@abp/ng.core';

export const PRODUCT_GROUP_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => {
      return import('./components/product-group.component').then(c => c.ProductGroupComponent);
    },
    canActivate: [authGuard, permissionGuard],
  },
];
