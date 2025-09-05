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
import { ContactInfoViewService } from '../services/contact-info-child.service';
import { ContactInfoDetailViewService } from '../services/contact-info-child-detail.service';
import { ContactInfoDetailModalComponent } from './contact-info-child-detail.component';
import { AbstractContactInfoComponent } from './contact-info-child.abstract.component';

@Component({
  selector: 'app-contact-info',
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
    ContactInfoDetailModalComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NgbDateAdapter, useClass: DateAdapter },
    ListService,
    ContactInfoViewService,
    ContactInfoDetailViewService,
  ],
  templateUrl: './contact-info-child.component.html',
})
export class ContactInfoComponent extends AbstractContactInfoComponent {}
