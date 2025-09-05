import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@abp/ng.core';
import { ApplicationTenantDto } from '../dtos/application-tenant.dto';
import { ApplicationTenantService } from '../services/home.service';

@Component({
  selector: 'app-home-dashboard-left-side-widget',
  templateUrl: 'home-dashboard-left-side-widget.component.html',
  styleUrls: ['home-dashboard-left-side-widget.component.scss'],
  standalone: true,
  imports: [CommonModule, CoreModule],
})
export class HomeDashboardLeftSideWidgetComponent implements OnInit {
  private readonly service = inject(ApplicationTenantService);

  applications: ApplicationTenantDto[] = [];
  loading = true;

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications(): void {
    this.service.getApplicationsThisWeek().subscribe({
      next: data => {
        this.applications = data;
        this.loading = false;
      },
      error: err => {
        this.loading = false;
        console.error(err);
      },
    });
  }
}
