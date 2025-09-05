import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { LocalizationPipe, AutofocusDirective } from '@abp/ng.core';
import {
  DateAdapter,
  TimeAdapter,
  ModalComponent,
  ModalCloseDirective,
  ButtonComponent,
} from '@abp/ng.theme.shared';

import {
  NgbNavModule,
  NgbDatepickerModule,
  NgbTimepickerModule,
  NgbDateAdapter,
  NgbTimeAdapter,
} from '@ng-bootstrap/ng-bootstrap';
import { SourceDetailViewService } from '../services/source-detail.service';

@Component({
  selector: 'app-source-detail-modal',
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    NgbNavModule,
    NgxValidateCoreModule,
    AutofocusDirective,
    ModalCloseDirective,
    LocalizationPipe,
    ModalComponent,
    ButtonComponent,
  ],
  providers: [
    { provide: NgbDateAdapter, useClass: DateAdapter },
    { provide: NgbTimeAdapter, useClass: TimeAdapter },
  ],
  templateUrl: './source-detail.component.html',
  styles: [],
})
export class SourceDetailModalComponent {
  public readonly service = inject(SourceDetailViewService);
}
