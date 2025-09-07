// src/app/home/home.component.ts

import { Component, ViewChild, inject } from '@angular/core';
import { AuthService, ConfigStateService } from '@abp/ng.core';
import { HomeDashboardLeftSideWidgetComponent } from '../home/widgets/home-dashboard-left-side-widget.component';
import { CommonModule } from '@angular/common';
import {HomeDashboardMiddleWidgetComponent} from "./widgets/home-dashboard-middle-widget.component";
import {HomeDashboardRightSideWidgetComponent} from "./widgets/home-dashboard-right-side-widget.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, HomeDashboardLeftSideWidgetComponent, HomeDashboardMiddleWidgetComponent, HomeDashboardRightSideWidgetComponent],
})
export class HomeComponent {
  private authService = inject(AuthService);
  private configStateService = inject(ConfigStateService);

  // Giriş yapılıp yapılmadığını template'de kullanmak için
  get hasLoggedIn(): boolean {
    return this.authService.isAuthenticated;
  }

  // Kiracı kontrolü (opsiyonel: kiracı içeriği göstermek için)
  get isTenant(): boolean {
    const tenant = this.configStateService.getOne('currentTenant');
    return !!tenant && !!tenant.id;
  }

  @ViewChild('homeDashboardLeftSideWidget', { static: false })
  homeDashboardLeftSideWidget: HomeDashboardLeftSideWidgetComponent;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}
}
