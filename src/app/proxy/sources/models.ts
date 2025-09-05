import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface GetSourcesInput extends GetSourcesInputBase {
}

export interface GetSourcesInputBase extends PagedAndSortedResultRequestDto {
  filterText?: string;
  shortName?: string;
  fullname?: string;
  phone?: string;
  isOutSource?: boolean;
  isSupplier?: boolean;
  address?: string;
  taxNo?: string;
  taxOffice?: string;
}

export interface SourceCreateDto extends SourceCreateDtoBase {
}

export interface SourceCreateDtoBase {
  shortName: string;
  fullname: string;
  phone: string;
  isOutSource: boolean;
  isSupplier: boolean;
  address?: string;
  taxNo?: string;
  taxOffice?: string;
}

export interface SourceDto extends SourceDtoBase {
}

export interface SourceDtoBase extends FullAuditedEntityDto<string> {
  shortName?: string;
  fullname?: string;
  phone?: string;
  isOutSource: boolean;
  isSupplier: boolean;
  address?: string;
  taxNo?: string;
  taxOffice?: string;
  concurrencyStamp?: string;
}

export interface SourceExcelDownloadDto extends SourceExcelDownloadDtoBase {
}

export interface SourceExcelDownloadDtoBase {
  downloadToken?: string;
  filterText?: string;
  shortName?: string;
  fullname?: string;
  phone?: string;
  isOutSource?: boolean;
  isSupplier?: boolean;
  address?: string;
  taxNo?: string;
  taxOffice?: string;
}

export interface SourceUpdateDto extends SourceUpdateDtoBase {
}

export interface SourceUpdateDtoBase {
  shortName: string;
  fullname: string;
  phone: string;
  isOutSource: boolean;
  isSupplier: boolean;
  address?: string;
  taxNo?: string;
  taxOffice?: string;
  concurrencyStamp?: string;
}
