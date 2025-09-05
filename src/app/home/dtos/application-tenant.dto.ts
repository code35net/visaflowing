export interface ApplicationTenantDto {
    id: string;
    reservationDate: string; // ISO format: "2025-04-07"
    reservationTime: string; // ISO TimeOnly: "10:30:00"
    tenantName: string;
    tenantId: string;
    customerName: string;
    customerSurname: string;
  }
