import { Routes } from '@angular/router';
import { authGuard, permissionGuard } from '@abp/ng.core';

export const SOURCE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => {
      return import('./components/source.component').then(c => c.SourceComponent);
    },
    canActivate: [authGuard, permissionGuard],
  },
];
