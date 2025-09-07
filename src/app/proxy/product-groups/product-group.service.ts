import type { GetProductGroupsInput, ProductGroupCreateDto, ProductGroupDto, ProductGroupExcelDownloadDto, ProductGroupUpdateDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { DownloadTokenResultDto } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class ProductGroupService {
  apiName = 'Default';
  

  create = (input: ProductGroupCreateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ProductGroupDto>({
      method: 'POST',
      url: '/api/app/product-groups',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/product-groups/${id}`,
    },
    { apiName: this.apiName,...config });
  

  deleteAll = (input: GetProductGroupsInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/app/product-groups/all',
      params: { filterText: input.filterText, name: input.name, isMain: input.isMain, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  deleteByIds = (productgroupIds: string[], config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/app/product-groups',
      params: { productgroupIds },
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ProductGroupDto>({
      method: 'GET',
      url: `/api/app/product-groups/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getDownloadToken = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, DownloadTokenResultDto>({
      method: 'GET',
      url: '/api/app/product-groups/download-token',
    },
    { apiName: this.apiName,...config });
  

  getList = (input: GetProductGroupsInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<ProductGroupDto>>({
      method: 'GET',
      url: '/api/app/product-groups',
      params: { filterText: input.filterText, name: input.name, isMain: input.isMain, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListAsExcelFile = (input: ProductGroupExcelDownloadDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, Blob>({
      method: 'GET',
      responseType: 'blob',
      url: '/api/app/product-groups/as-excel-file',
      params: { downloadToken: input.downloadToken, filterText: input.filterText, name: input.name, isMain: input.isMain },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: ProductGroupUpdateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ProductGroupDto>({
      method: 'PUT',
      url: `/api/app/product-groups/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
