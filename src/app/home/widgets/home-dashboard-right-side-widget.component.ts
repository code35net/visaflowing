import { Component, OnInit, inject } from '@angular/core';
import { CustomerBasketService } from '../services/home.service';
//import { ListService } from '@abp/ng.core';
import { CommonModule } from '@angular/common'; // NgIf, NgFor, date pipe vs.
//import { AbpCoreModule } from '@abp/ng.core';
import { CoreModule } from '@abp/ng.core';
import { BasketWithNavigationPropertiesDto } from '../../proxy/baskets';

@Component({
  selector: 'app-home-dashboard-right-side-widget',
  templateUrl: 'home-dashboard-right-side-widget.component.html',
  //styleUrls: ['home-dashboard-right-side-widget.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    CoreModule
    //AbpCoreModule
  ],
})
export class HomeDashboardRightSideWidgetComponent implements OnInit {
  private service = inject(CustomerBasketService);

  baskets: BasketWithNavigationPropertiesDto[] = [];
  loading = true;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  ngOnInit(): void {
    this.loadBaskets();
  }

  loadBaskets(): void {
    this.service.getBasketsThisWeek().subscribe({
      next: (data) => {
        this.baskets = data;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
      },
    });
  }
}
