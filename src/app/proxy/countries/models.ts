import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface CountryCreateDto extends CountryCreateDtoBase {
}

export interface CountryCreateDtoBase {
  name: string;
}

export interface CountryDto extends CountryDtoBase {
}

export interface CountryDtoBase extends FullAuditedEntityDto<string> {
  name?: string;
  concurrencyStamp?: string;
}

export interface CountryExcelDownloadDto extends CountryExcelDownloadDtoBase {
}

export interface CountryExcelDownloadDtoBase {
  downloadToken?: string;
  filterText?: string;
  name?: string;
}

export interface CountryUpdateDto extends CountryUpdateDtoBase {
}

export interface CountryUpdateDtoBase {
  concurrencyStamp?: string;
}

export interface GetCountriesInput extends GetCountriesInputBase {
}

export interface GetCountriesInputBase extends PagedAndSortedResultRequestDto {
  filterText?: string;
  name?: string;
}
