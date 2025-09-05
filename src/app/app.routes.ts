import { authGuard, permissionGuard } from '@abp/ng.core';
import { Routes } from '@angular/router';
import { GDPR_COOKIE_CONSENT_ROUTES } from './gdpr-cookie-consent/gdpr-cookie-consent.routes';
import { CUSTOMER_ROUTES } from './customers/customer/customer-routes';
import { CURRENCY_ROUTES } from './currencies/currency/currency-routes';
import { PRODUCT_GROUP_ROUTES } from './product-groups/product-group/product-group-routes';
import { SOURCE_ROUTES } from './sources/source/source-routes';
import { COUNTRY_ROUTES } from './countries/country/country-routes';
import { APPLICATION_ROUTES } from './applications/application/application-routes';
import { BASKET_ROUTES } from './baskets/basket/basket-routes';
import { TRANSACTION_ROUTES } from './transactions/transaction/transaction-routes';

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./home/home.component').then(c => c.HomeComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(c => c.DashboardComponent),
    canActivate: [authGuard, permissionGuard],
  },
  {
    path: 'account',
    loadChildren: () => import('@volo/abp.ng.account/public').then(c => c.createRoutes()),
  },
  {
    path: 'gdpr',
    loadChildren: () => import('@volo/abp.ng.gdpr').then(c => c.createRoutes()),
  },
  {
    path: 'identity',
    loadChildren: () => import('@volo/abp.ng.identity').then(c => c.createRoutes()),
  },
  {
    path: 'language-management',
    loadChildren: () => import('@volo/abp.ng.language-management').then(c => c.createRoutes()),
  },
  {
    path: 'saas',
    loadChildren: () => import('@volo/abp.ng.saas').then(c => c.createRoutes()),
  },
  {
    path: 'audit-logs',
    loadChildren: () => import('@volo/abp.ng.audit-logging').then(c => c.createRoutes()),
  },
  {
    path: 'openiddict',
    loadChildren: () => import('@volo/abp.ng.openiddictpro').then(c => c.createRoutes()),
  },
  {
    path: 'text-template-management',
    loadChildren: () => import('@volo/abp.ng.text-template-management').then(c => c.createRoutes()),
  },
  {
    path: 'file-management',
    loadChildren: () => import('@volo/abp.ng.file-management').then(c => c.createRoutes()),
  },
  {
    path: 'gdpr-cookie-consent',
    children: GDPR_COOKIE_CONSENT_ROUTES,
  },
  {
    path: 'setting-management',
    loadChildren: () => import('@abp/ng.setting-management').then(c => c.createRoutes()),
  },
  { path: 'customers', children: CUSTOMER_ROUTES },
  { path: 'applications', children: APPLICATION_ROUTES },
  { path: 'baskets', children: BASKET_ROUTES },
  { path: 'transactions', children: TRANSACTION_ROUTES },
  { path: 'product-groups', children: PRODUCT_GROUP_ROUTES },
  { path: 'sources', children: SOURCE_ROUTES },
  { path: 'countries', children: COUNTRY_ROUTES },
  { path: 'currencies', children: CURRENCY_ROUTES },
  {
  path: 'reports/finance',
  loadComponent: () => import('./reports/finance/finance-reports.component').then(m => m.FinanceReportsComponent)
  }
  ,
  {
  path: 'reports/agent',
  loadComponent: () => import('./reports/agent/agent-report.component').then(m => m.AgentReportsComponent)
  },
  {
  path: 'reports/process',
  loadComponent: () => import('./reports/process/process-reports.component').then(m => m.ProcessReportsComponent)
  },
];
