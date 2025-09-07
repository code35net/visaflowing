import { NgModule } from '@angular/core';
import { PageModule } from '@abp/ng.components/page';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeDashboardLeftSideWidgetComponent } from './widgets/home-dashboard-left-side-widget.component';
import { HomeDashboardRightSideWidgetComponent } from './widgets/home-dashboard-right-side-widget.component';
import { HomeDashboardMiddleWidgetComponent } from './widgets/home-dashboard-middle-widget.component';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [SharedModule, HomeRoutingModule, PageModule,HomeDashboardLeftSideWidgetComponent,HomeDashboardRightSideWidgetComponent,HomeDashboardMiddleWidgetComponent],
  providers: [HomeDashboardLeftSideWidgetComponent,HomeDashboardRightSideWidgetComponent,HomeDashboardMiddleWidgetComponent]
})
export class HomeModule {}
