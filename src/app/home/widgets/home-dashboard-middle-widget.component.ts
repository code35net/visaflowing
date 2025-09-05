import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@abp/ng.core';
import { AppBasketStatisticService } from '../services/home.service';
import { BasketWithNavigationPropertiesDto } from '../../proxy/baskets';
import { ApplicationTenantDto } from '../dtos/application-tenant.dto';

@Component({
  selector: 'app-home-dashboard-middle-widget',
  templateUrl: 'home-dashboard-middle-widget.component.html',
  standalone: true,
  imports: [CommonModule, CoreModule],
})
export class HomeDashboardMiddleWidgetComponent implements OnInit {
  private readonly service = inject(AppBasketStatisticService);

  baskets: BasketWithNavigationPropertiesDto[] = [];
  applications: ApplicationTenantDto[] = [];
  loading = true;

  ngOnInit(): void {
    this.loadBaskets();
    this.loadApplications();
  }

  loadBaskets(): void {
    this.service.getBasketsLastWeek().subscribe({
      next: data => {
        this.baskets = data;
        this.loading = false;
      },
      error: err => {
        this.loading = false;
        console.error(err);
      },
    });
  }

  loadApplications(): void {
    this.service.getApplicationsCompleteLastWeek().subscribe({
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

  // Sum of paymentSum
  get totalPaymentSum(): number {
    return this.baskets.reduce((sum, b) => sum + (b?.paymentSum || 0), 0);
  }

  // Sum of collectionSum
  get totalCollectionSum(): number {
    return this.baskets.reduce((sum, b) => sum + (b?.collectionSum || 0), 0);
  }

  get applicationCount(): number {
    return this.applications?.length || 0;
  }
}
