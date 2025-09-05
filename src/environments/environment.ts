import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

const oAuthConfig = {
  issuer: 'https://testauth.visaflow.tr/',
  redirectUri: baseUrl,
  clientId: 'VisaFlowing_App',
  responseType: 'code',
  scope: 'offline_access VisaFlowing',
  requireHttps: true,
  impersonation: {
    tenantImpersonation: true,
    userImpersonation: true,
  }
};

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'Visa Flow CRM',
    logoUrl: '../assets/brand/visaflow-logo.png',
  },
  oAuthConfig,
  apis: {
    default: {
      url: 'https://testapi.visaflow.tr/',
      rootNamespace: 'CODE35.VisaFlowing',
    },
    AbpAccountPublic: {
      url: oAuthConfig.issuer,
      rootNamespace: 'AbpAccountPublic',
    },
  },
} as Environment;
