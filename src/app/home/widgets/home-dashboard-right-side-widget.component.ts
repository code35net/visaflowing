import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@abp/ng.core';
import { CustomerBasketService } from '../services/home.service';
import { BasketWithNavigationPropertiesDto } from '../../proxy/baskets';

@Component({
  selector: 'app-home-dashboard-right-side-widget',
  templateUrl: 'home-dashboard-right-side-widget.component.html',
  standalone: true,
  imports: [CommonModule, CoreModule],
})
export class HomeDashboardRightSideWidgetComponent implements OnInit {
  private readonly service = inject(CustomerBasketService);

  baskets: BasketWithNavigationPropertiesDto[] = [];
  loading = true;

  ngOnInit(): void {
    this.loadBaskets();
  }

  loadBaskets(): void {
    this.service.getBasketsThisWeek().subscribe({
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
}
