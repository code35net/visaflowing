import { Component, OnInit, inject } from '@angular/core';
import { ApplicationTenantDto } from '../dtos/application-tenant.dto';
import { ApplicationTenantService } from '../services/home.service';
//import { ListService } from '@abp/ng.core';
import { CommonModule } from '@angular/common'; // NgIf, NgFor, date pipe vs.
//import { AbpCoreModule } from '@abp/ng.core';
import { CoreModule } from '@abp/ng.core';

@Component({
  selector: 'app-home-dashboard-left-side-widget',
  templateUrl: 'home-dashboard-left-side-widget.component.html',
  styleUrls: ['home-dashboard-left-side-widget.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    CoreModule
    //AbpCoreModule
  ],
})
export class HomeDashboardLeftSideWidgetComponent implements OnInit {
  private service = inject(ApplicationTenantService);

  applications: ApplicationTenantDto[] = [];
  loading = true;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications(): void {
    this.service.getApplicationsThisWeek().subscribe({
      next: (data) => {
        this.applications = data;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
      },
    });
  }
}
