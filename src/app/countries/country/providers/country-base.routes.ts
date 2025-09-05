import { ABP, eLayoutType } from '@abp/ng.core';

export const COUNTRY_BASE_ROUTES: ABP.Route[] = [
  {
    path: '/countries',
    iconClass: 'fas fa-globe',
    name: '::Menu:Countries',
    layout: eLayoutType.application,
    requiredPolicy: 'VisaFlowing.Countries',
    breadcrumbText: '::Countries',
  },
];
