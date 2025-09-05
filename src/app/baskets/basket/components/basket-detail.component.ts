import { CoreModule } from '@abp/ng.core';
import { ThemeSharedModule, DateAdapter, TimeAdapter } from '@abp/ng.theme.shared';
import { CommercialUiModule } from '@volo/abp.commercial.ng.ui';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NgbNavModule,
  NgbDatepickerModule,
  NgbTimepickerModule,
  NgbDateAdapter,
  NgbTimeAdapter,
  NgbDateStruct
} from '@ng-bootstrap/ng-bootstrap';
import { BasketDetailViewService } from '../services/basket-detail.service';

@Component({
  selector: 'app-basket-detail-modal',
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [
    CoreModule,
    ThemeSharedModule,
    CommercialUiModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    NgbNavModule
  ],
  providers: [
    { provide: NgbDateAdapter, useClass: DateAdapter },
    { provide: NgbTimeAdapter, useClass: TimeAdapter },
  ],
  templateUrl: './basket-detail.component.html',
  styles: [],
})
export class BasketDetailModalComponent {
  public readonly service = inject(BasketDetailViewService);
  
  // Property to hold minimum allowed payment date
  minPaymentDate: NgbDateStruct;

  constructor() {
    this.minPaymentDate = this.getTodayAsNgbDate();
  }

  getTodayAsNgbDate(): NgbDateStruct {
    const today = new Date();
    return {
      year: today.getFullYear(),
      month: today.getMonth() + 1, // JS months are 0-based
      day: today.getDate()
    };
  }
}
