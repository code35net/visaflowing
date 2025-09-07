import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

const oAuthConfig = {
  issuer: 'https://localhost:44343/',
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
      url: 'https://localhost:44373',
      rootNamespace: 'CODE35.VisaFlowing',
    },
    AbpAccountPublic: {
      url: oAuthConfig.issuer,
      rootNamespace: 'AbpAccountPublic',
    },
  },
  remoteEnv: {
    url: '/getEnvConfig',
    mergeStrategy: 'deepmerge'
  }
} as Environment;
