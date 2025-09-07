import { Component } from '@angular/core';
import { CoreModule } from '@abp/ng.core';
import { HostDashboardComponent } from './host-dashboard/host-dashboard.component';
import { TenantDashboardComponent } from './tenant-dashboard/tenant-dashboard.component';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  template: `
    <app-host-dashboard *abpPermission="'VisaFlowing.Dashboard.Host'"></app-host-dashboard>
    <app-tenant-dashboard *abpPermission="'VisaFlowing.Dashboard.Tenant'"></app-tenant-dashboard>
  `,
  // ABP yetki yapısı için CoreModule ve çocuk standalone komponentler:
  imports: [CoreModule, HostDashboardComponent, TenantDashboardComponent],
})
export class DashboardComponent {}
