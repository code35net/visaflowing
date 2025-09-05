import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListService, TrackByService } from '@abp/ng.core';
import { finalize, tap,switchMap, map, catchError } from 'rxjs/operators';
import { Observable,of, throwError } from 'rxjs';


import { ApplicationStatus } from '../../../proxy/applications/application-status.enum';
import type {
  ApplicationWithNavigationPropertiesDto,
  ApplicationReservationUpdateDto,
  ApplicationCreateDto,
  ApplicationUpdateDto,
  ApplicationDto,
} from '../../../proxy/applications/models';
import { ApplicationService } from '../../../proxy/applications/application.service';
import { BasketItemService } from '../../../proxy/basket-items/basket-item.service';
import {
  NgbDateStruct,
  NgbInputDatepicker,
} from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export abstract class AbstractApplicationDetailViewService {
  protected readonly fb = inject(FormBuilder);
  protected readonly track = inject(TrackByService);

  public readonly proxyService = inject(ApplicationService);
  public readonly proxyBasketService = inject(BasketItemService);
  public readonly list = inject(ListService);

  public readonly getCustomerLookup   = this.proxyService.getCustomerLookup.bind(this.proxyService);
public readonly getSourceLookup     = this.proxyService.getSourceLookup.bind(this.proxyService);
public readonly getOutSourceLookup  = this.proxyService.getOutSourceLookup.bind(this.proxyService);
public readonly getCountryLookup    = this.proxyService.getCountryLookup.bind(this.proxyService);
public readonly getMainProductLookup= this.proxyService.getMainProductLookup.bind(this.proxyService);

public readonly getCurrencyLookup   = this.proxyBasketService.getCurrencyLookup.bind(this.proxyBasketService);


  activeNavId: string = 'app';

  isBusy = false;
  isVisible = false;
  reservationMode = false;

  selected?: ApplicationWithNavigationPropertiesDto;
  form!: FormGroup;

  /** Template’te min tarih için kullanılıyor (bugün ve sonrası) */
  minReservationDate: NgbDateStruct = this.toNgbDate(new Date().toISOString())!;
  /** Template’te min saat için kullanılıyor (opsiyonel) */
  minReservationTime: string | null = '09:00';

  // -------------------- PUBLIC API --------------------

  create() {
    this.selected = undefined;
    this.reservationMode = false;
    this.buildFormForCreate();
    this.showForm();
  }

  update(record: ApplicationWithNavigationPropertiesDto) {
    this.selected = record;
    this.reservationMode = false;
    this.buildFormForEdit(record);
    this.showForm();
  }

  openReservation(record: ApplicationWithNavigationPropertiesDto) {
    this.selected = record;
    this.activeNavId = 'app';
    this.reservationMode = true;
    this.buildFormForReservation(record);
    this.showForm();
  }

  showForm() {
    this.isVisible = true;
  }

  hideForm() {
    this.isVisible = false;
  }

  changeVisible($event: boolean) {
    this.isVisible = $event;
  }

  /** Template’te temizle butonu için */
  clearDate(controlName: string, dp?: NgbInputDatepicker) {
    this.form?.get(controlName)?.reset();
    dp?.close();
  }

  submitForm() {
    if (!this.form) {
      console.error('Form is not initialized');
      return;
    }

    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(key => {
        const control = this.form.get(key);
        if (control && control.invalid) {
          control.markAsTouched();
          control.markAsDirty();
        }
      });
      console.log('Form is invalid:', this.form.errors, this.form.value);
      return;
    }

    if (this.isBusy) return;

    // 1) Reservation Mode
    if (this.reservationMode && this.selected) {
      this.isBusy = true;

      const v = this.form.value;
      const dto: ApplicationReservationUpdateDto = {
        reservationDate: this.toDateOnly(v.reservationDate),
        reservationTime: this.toTimeOnly(v.reservationTime),
        notes: v.notes ?? null,
        trackingCode: v.trackingCode ?? null,
      };

      if (!dto.reservationDate) {
        this.form.get('reservationDate')?.setErrors({ required: true });
        this.isBusy = false;
        return;
      }

      this.proxyService
        .updateReservation(this.selected.application.id, dto)
        .pipe(finalize(() => (this.isBusy = false)))
        .subscribe(updated => {
          this.selected!.application.reservationDate =
            updated.reservationDate ?? dto.reservationDate;
          this.selected!.application.reservationTime =
            updated.reservationTime ?? dto.reservationTime;
          this.selected!.application.trackingCode =
            updated.trackingCode ?? dto.trackingCode;
          this.hideForm();
          this.list.get();
        });

      return;
    }

    // 2) Create
    if (!this.selected) {
  this.isBusy = true;
  this.createRequest()
    .pipe(finalize(() => (this.isBusy = false)))
    .subscribe({
      next: () => { this.hideForm(); this.list.get(); },
      error: (err) => this.handleApiError(err, 'Create'),
    });
  return;
}

    // 3) Update
    this.isBusy = true;
this.updateRequest()
  .pipe(finalize(() => (this.isBusy = false)))
  .subscribe({
    next: () => { this.hideForm(); this.list.get(); },
    error: (err) => this.handleApiError(err, 'Update'),
  });
  }

  private handleApiError(err: any, where: string) {
  const body = err?.error;
  const abp = body?.error; // ABP formatı: { error: { code, message, details, validationErrors } }

  console.error(`[${where}] API Error:`, err);
  console.log('Raw body:', body);

  const msg =
    abp?.message ||
    body?.message ||
    err?.message ||
    'Unexpected error';

  const details = abp?.details || body?.details || null;

  this.form.setErrors({ api: msg });
  // Toaster kullanıyorsan burada göster:
  // this.toaster.error(msg, details ?? undefined);
}



  // -------------------- REQUESTS --------------------

private createRequest(): Observable<ApplicationDto> {
  const v = this.form.value;

  const dto: ApplicationCreateDto = this.stripNulls({
    customerId:  v.customerId,
    sourceId:    v.sourceId,
    outSourceId: v.outSourceId,
    countryId:   v.countryId,
    isDocumented: v.isDocumented ?? false,
    hasInvoice:   v.hasInvoice ?? false,

    // Domain create kodunda ApplicationStatus parametresi kullanılıyor → gönderelim
    applicationStatus: ApplicationStatus.NoReserved,

    // Backend create içinde sepete ve basketItem’a kendisi yazıyor
    basketItems: [
      {
        productId:  v.mainProductId,
        currencyId: v.currencyId,
        amount:     Number(v.amount), // numaraya çevir
        piece:      1,
        sourceId:   v.sourceId,       // <-- KRİTİK: backend dto.SourceId okuyor
      },
    ],

    notes:           v.notes || null,
    refCode:         v.refCode || null,
    reservationDate: this.toDateOnly(v.reservationDate), // boşsa null olur → sorun değil
    reservationTime: this.toTimeOnly(v.reservationTime),
    trackingCode:    v.trackingCode || null,
  } as Partial<ApplicationCreateDto>) as ApplicationCreateDto;

  return this.proxyService.create(dto);
}


/** shallow strip helper */
private stripNulls<T extends Record<string, any>>(obj: T): T {
  const o: any = Array.isArray(obj) ? [] : {};
  for (const k of Object.keys(obj)) {
    const v = (obj as any)[k];
    if (v === null || v === undefined) continue;
    if (Array.isArray(v)) o[k] = v.map(x => this.stripNulls(x));
    else if (typeof v === 'object') o[k] = this.stripNulls(v);
    else o[k] = v;
  }
  return o;
}



  private updateRequest(): Observable<ApplicationDto> {
    const v = this.form.value;

    const dto: ApplicationUpdateDto = {
      notes: v.notes || null,
      refCode: v.refCode || null,
      reservationDate: this.toDateOnly(v.reservationDate),
      reservationTime: this.toTimeOnly(v.reservationTime),
      trackingCode: v.trackingCode || null,
      isDocumented: v.isDocumented ?? false,
      concurrencyStamp: this.selected?.application.concurrencyStamp,
    } as ApplicationUpdateDto;

    return this.proxyService.update(this.selected!.application.id, dto);
  }

  // -------------------- FORMs --------------------

  private buildFormForCreate() {
    this.form = this.fb.group({
      customerId: [null, [Validators.required]],
      sourceId: [null, [Validators.required]],
      outSourceId: [null, [Validators.required]],
      countryId: [null, [Validators.required]],
      mainProductId: [null, [Validators.required]],

      isDocumented: [false],
      hasInvoice: [false],

      currencyId: [null, [Validators.required]],
      amount: [null, [Validators.required, Validators.min(0.01)]],

      notes: [null],
      refCode: [null],
      reservationDate: [null],
      reservationTime: [null],
      trackingCode: [null],
    });
  }

  private buildFormForEdit(record: ApplicationWithNavigationPropertiesDto) {
    const app = record.application;

    this.form = this.fb.group({
      customerId: [{ value: app.customerId ?? null, disabled: true }],
      sourceId:   [{ value: app.sourceId ?? null,   disabled: true }],
      outSourceId:[{ value: app.outSourceId ?? null,disabled: true }],
      countryId:  [{ value: app.countryId ?? null,  disabled: true }],
      mainProductId: [{ value: null, disabled: true }], // edit’te kullanılmıyor

      isDocumented: [app.isDocumented ?? false],
      hasInvoice: [{ value: false, disabled: true }],   // edit’te kullanılmıyor

      currencyId: [{ value: null, disabled: true }],    // edit’te kullanılmıyor
      amount:     [{ value: null, disabled: true }],    // edit’te kullanılmıyor

      notes: [app.notes ?? null],
      refCode: [app.refCode ?? null],
      reservationDate: [this.toNgbDate(app.reservationDate)],
      reservationTime: [app.reservationTime ?? null],
      trackingCode: [app.trackingCode ?? null],
    });
  }

  private buildFormForReservation(record: ApplicationWithNavigationPropertiesDto) {
    const { reservationDate, reservationTime, notes, trackingCode } = record.application;

    this.form = this.fb.group({
      reservationDate: [this.toNgbDate(reservationDate), [Validators.required]],
      reservationTime: [reservationTime ?? null, [Validators.required]],
      notes: [notes ?? null],
      trackingCode: [trackingCode ?? null, [Validators.required]],
    });
  }

  // -------------------- HELPERS --------------------

  private toNgbDate(iso?: string | null) {
    if (!iso) {
      // bugün
      const now = new Date();
      return { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
    }
    const d = new Date(iso);
    if (isNaN(d.getTime())) return null;
    return { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() };
  }

  /** Backend DateOnly bekliyorsa: yyyy-MM-dd gönderiyoruz */
  private toDateOnly(val: any): string | null {
    if (!val) return null;

    if (typeof val === 'object' && 'year' in val && 'month' in val && 'day' in val) {
      const y = (val.year as number).toString().padStart(4, '0');
      const m = (val.month as number).toString().padStart(2, '0');
      const d = (val.day as number).toString().padStart(2, '0');
      return `${y}-${m}-${d}`;
    }

    // String/Date desteği
    const d = new Date(val);
    if (isNaN(d.getTime())) return null;
    const y = d.getFullYear().toString().padStart(4, '0');
    const m = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  /** HH:mm[:ss] -> HH:mm:ss */
  private toTimeOnly(val: any): string | null {
    if (!val) return null;

    if (typeof val === 'string') {
      const parts = val.split(':');
      if (parts.length < 2) return null;
      const h = (parts[0] || '0').padStart(2, '0');
      const m = (parts[1] || '0').padStart(2, '0');
      const s = (parts[2] || '0').padStart(2, '0');
      return `${h}:${m}:${s}`;
    }

    if (typeof val === 'object' && 'hour' in val && 'minute' in val) {
      const h = (val.hour ?? 0).toString().padStart(2, '0');
      const m = (val.minute ?? 0).toString().padStart(2, '0');
      const s = (val.second ?? 0).toString().padStart(2, '0');
      return `${h}:${m}:${s}`;
    }

    return null;
  }
}
