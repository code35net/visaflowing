import { ABP, eLayoutType } from '@abp/ng.core';

export const CUSTOMER_BASE_ROUTES: ABP.Route[] = [
  {
    path: '/customers',
    iconClass: 'fas fa-users',
    name: '::Menu:Customers',
    layout: eLayoutType.application,
    requiredPolicy: 'VisaFlowing.Customers',
    breadcrumbText: '::Customers',
  },
];
