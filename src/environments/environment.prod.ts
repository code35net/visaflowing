import { Environment } from '@abp/ng.core';

const baseUrl = 'https://testapp.visaflow.tr';

const oAuthConfig = {
  issuer: 'https://testaputh.visaflow.tr/',
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
  production: true,
  application: {
    baseUrl,
    name: 'VisaFlowing',
  },
  oAuthConfig,
  apis: {
    default: {
      url: 'https://testapi.visaflow.tr',
      rootNamespace: 'CODE35.VisaFlowing',
    },
    AbpAccountPublic: {
      url: oAuthConfig.issuer,
      rootNamespace: 'AbpAccountPublic',
    },
  },
  // remoteEnv: {
  //   url: '/getEnvConfig',
  //   mergeStrategy: 'deepmerge'
  // }
} as Environment;
