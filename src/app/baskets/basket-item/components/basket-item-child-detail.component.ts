import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NgbNavModule,
  NgbDatepickerModule,
  NgbTimepickerModule,
  NgbDateAdapter,
  NgbTimeAdapter,
} from '@ng-bootstrap/ng-bootstrap';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { LocalizationPipe, AutofocusDirective } from '@abp/ng.core';
import {
  DateAdapter,
  TimeAdapter,
  ModalComponent,
  ButtonComponent,
  ModalCloseDirective,
} from '@abp/ng.theme.shared';

import { LookupSelectComponent, LookupInputComponent } from '@volo/abp.commercial.ng.ui';

import { BasketItemDetailViewService } from '../services/basket-item-child-detail.service';

@Component({
  selector: 'app-basket-item-detail-modal',
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
    LookupSelectComponent,

    LookupInputComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NgbDateAdapter, useClass: DateAdapter },
    { provide: NgbTimeAdapter, useClass: TimeAdapter },
  ],
  templateUrl: './basket-item-child-detail.component.html',
})
export class BasketItemDetailModalComponent {
  public readonly service = inject(BasketItemDetailViewService);
}
