import { Injectable, inject } from '@angular/core';
import { RestService, Rest, type PagedResultDto } from '@abp/ng.core';
import { ApplicationTenantDto } from '../dtos/application-tenant.dto';
import type {
  BasketCreateDto,
  BasketDto,
  BasketWithNavigationPropertiesDto,
  GetBasketsInput
} from '../../proxy/baskets';

@Injectable({
  providedIn: 'root',
})
export class ApplicationTenantService {
  private restService = inject(RestService);

  apiName = 'Default';

  getApplicationsThisWeek = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, ApplicationTenantDto[]>(
      {
        method: 'GET',
        url: `/api/app/applications/application-this-week`,
      },
      { apiName: this.apiName, ...config }
    );

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}
}

@Injectable({
  providedIn: 'root',
})
export class CustomerBasketService {
  private restService = inject(RestService);

  apiName = 'Default';


  getBasketsThisWeek = ( config?: Partial<Rest.Config>) =>
    this.restService.request<any, BasketWithNavigationPropertiesDto[]>({
        method: 'GET',
        url: '/api/app/baskets/baskets-this-week',
      },
      { apiName: this.apiName,...config });

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);


  constructor() {}
}

@Injectable({
  providedIn: 'root',
})
export class AppBasketStatisticService {
  private restService = inject(RestService);

  apiName = 'Default';


  getBasketsLastWeek = ( config?: Partial<Rest.Config>) =>
    this.restService.request<any, BasketWithNavigationPropertiesDto[]>({
        method: 'GET',
        url: '/api/app/baskets/baskets-last-week',
      },
      { apiName: this.apiName,...config });

  getApplicationsCompleteLastWeek = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, ApplicationTenantDto[]>(
      {
        method: 'GET',
        url: `/api/app/applications/application-complete-last-week`,
      },
      { apiName: this.apiName, ...config }
    );

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}
}
