import { Routes } from '@angular/router';
import { authGuard, permissionGuard } from '@abp/ng.core';

export const TRANSACTION_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => {
      return import('./components/transaction.component').then(c => c.TransactionComponent);
    },
    canActivate: [authGuard, permissionGuard],
  },
];
