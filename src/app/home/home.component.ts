// src/app/home/home.component.ts
import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, ConfigStateService } from '@abp/ng.core';
import { HomeDashboardLeftSideWidgetComponent } from '../home/widgets/home-dashboard-left-side-widget.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    // Widget de standalone ise direkt ekleyin:
    HomeDashboardLeftSideWidgetComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  // inject() kullanıyoruz (constructor yok)
  private readonly authService = inject(AuthService);
  private readonly configStateService = inject(ConfigStateService);

  @ViewChild('homeDashboardLeftSideWidget', { static: false })
  homeDashboardLeftSideWidget!: HomeDashboardLeftSideWidgetComponent;

  get hasLoggedIn(): boolean {
    return this.authService.isAuthenticated;
  }

  get isTenant(): boolean {
    const tenant = this.configStateService.getOne('currentTenant');
    return !!tenant && !!tenant.id;
  }
}
