import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NgbDateAdapter,
  NgbCollapseModule,
  NgbDatepickerModule,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { ListService, LocalizationPipe, PermissionDirective } from '@abp/ng.core';
import {
  DateAdapter,
  NgxDatatableDefaultDirective,
  NgxDatatableListDirective,
} from '@abp/ng.theme.shared';
import { VisaViewService } from '../services/visa-child.service';
import { VisaDetailViewService } from '../services/visa-child-detail.service';
import { VisaDetailModalComponent } from './visa-child-detail.component';
import { AbstractVisaComponent } from './visa-child.abstract.component';

@Component({
  selector: 'app-visa',
  imports: [
    NgbCollapseModule,
    NgbDatepickerModule,
    NgbDropdownModule,
    NgxValidateCoreModule,
    NgxDatatableModule,
    NgxDatatableDefaultDirective,
    NgxDatatableListDirective,
    PermissionDirective,
    LocalizationPipe,
    VisaDetailModalComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NgbDateAdapter, useClass: DateAdapter },
    ListService,
    VisaViewService,
    VisaDetailViewService,
  ],
  templateUrl: './visa-child.component.html',
})
export class VisaComponent extends AbstractVisaComponent {}
