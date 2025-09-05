import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { LocalizationPipe, AutofocusDirective } from '@abp/ng.core'; // <- pipe & directive’i tekil import ediyorsun ama module de ekleyelim
import { ThemeSharedModule } from '@abp/ng.theme.shared';
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
  NgbDateStruct,
  NgbTypeaheadModule,          // <-- eklendi (ihtiyaca göre)
} from '@ng-bootstrap/ng-bootstrap';

import { CommercialUiModule } from '@volo/abp.commercial.ng.ui';   // <-- ÖNEMLİ
import { ApplicationDetailViewService } from '../services/application-detail.service';

@Component({
  selector: 'app-application-detail-modal',
  changeDetection: ChangeDetectionStrategy.Default,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    // ABP & Commercial UI
    ThemeSharedModule,          // <-- abp-validation-summary vb.
    CommercialUiModule,         // <-- abp-lookup-*

    // ng-bootstrap
    NgbDatepickerModule,
    NgbTimepickerModule,
    NgbNavModule,
    NgbTypeaheadModule,

    // tekil abp bileşenleri (kalsın)
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
  templateUrl: './application-detail.component.html',
  styles: [],
})
export class ApplicationDetailModalComponent {
  public readonly service = inject(ApplicationDetailViewService);

  minReservationDate: NgbDateStruct;

  constructor() {
    this.minReservationDate = this.getTodayAsNgbDate();
  }

  getTodayAsNgbDate(): NgbDateStruct {
    const today = new Date();
    return { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };
  }
}
