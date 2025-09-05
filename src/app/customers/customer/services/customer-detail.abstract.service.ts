// customer/services/customer-detail.abstract.service.ts
import { inject, Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
} from '@angular/forms';
import { ListService, TrackByService } from '@abp/ng.core';
import { finalize, tap } from 'rxjs/operators';
import { customerSexOptions, CustomerSex } from '../../../proxy/customers/customer-sex.enum';
import { CustomerService } from '../../../proxy/customers/customer.service';
import { communicationTypeOptions } from '../../../proxy/customers/communication-type.enum';
import type { PassportCreateDto } from '../../../proxy/passports/models';
import type { ContactInfoCreateDto } from '../../../proxy/contact-infos/models';
import type { CustomerDto } from '../../../proxy/customers/models';

@Injectable()
export abstract class AbstractCustomerDetailViewService {
  protected readonly fb = inject(FormBuilder);
  protected readonly track = inject(TrackByService);

  public readonly proxyService = inject(CustomerService);
  public readonly list = inject(ListService);

  customerSexOptions = customerSexOptions;
  communicationTypeOptions = communicationTypeOptions;

  isBusy = false;
  isVisible = false;
  selected = {} as any;
  form!: FormGroup;

  /** Accessor for convenience */
  get contactInfos(): FormArray {
    return this.form.get('contactInfos') as FormArray;
  }

  /** Factory for an empty ContactInfo row */
createContactInfoGroup(ci?: ContactInfoCreateDto): FormGroup {
    return this.fb.group({
      type: [ci?.type ?? null, [Validators.required]],
      name: [ci?.name ?? null, [Validators.required]],
    });
  }

  /** Only create scenario—never pulls defaults from `selected` */
  buildForm() {

    const { name, surname, maidenName, birthPlace, birthDay, identityNo, nationality, sex } =
    this.selected || {};

    this.form = this.fb.group({
      // --- Customer fields ---
      name: [name ?? null, [Validators.required]],
      surname: [surname ?? null, [Validators.required]],
      maidenName: [maidenName ?? null, []],
      birthPlace: [birthPlace ?? null, [Validators.required]],
      birthDay: [birthDay ?? null, []],
      identityNo: [identityNo ?? null, [Validators.required]],
      nationality: [nationality ?? null, [Validators.required]],
      sex: [sex ?? null, [Validators.required]],

      // --- Passport subgroup (empty!) ---
      passport: this.fb.group({
        number: [null, [Validators.required]],
        isMain: [true],
        issuedBy: [null, [Validators.required]],
        state: [null, [Validators.required]],
        startDate: [null],
        validDate: [null],
      }),

      // --- ContactInfos FormArray with one empty entry ---
      contactInfos: this.fb.array([ this.createContactInfoGroup() ]),
    });
  }

  /** Shows a fresh form for create */
  showForm() {
    this.buildForm();
    this.isVisible = true;
  }

  /** Hook for your “new” button */
  create() {
    this.selected = undefined;
    this.showForm();
  }

  update(record: CustomerDto) {
      this.selected = record;
      //console.log(this.selected);
      this.showForm();
    }


  hideForm() {
    this.isVisible = false;
  }

  /** Package up exactly what CustomerCreateDto expects */
  protected createRequest() {
    const v = this.form.value;

    //console.log("create request");

    if (this.selected) {
      return this.proxyService.update(this.selected.id, {
        ...v,
        concurrencyStamp: this.selected.concurrencyStamp,
      });
    }

    return this.proxyService.create({
      name: v.name,
      surname: v.surname,
      maidenName: v.maidenName,
      birthPlace: v.birthPlace,
      birthDay: v.birthDay,
      identityNo: v.identityNo,
      nationality: v.nationality,
      // Cast the string into the enum
      sex: v.sex as CustomerSex,

      passport: v.passport as PassportCreateDto,
      contactInfos: v.contactInfos as ContactInfoCreateDto[],
    });
  }

  /** Fired by your submit button */
  submitForm() {
    //console.log(this.form.value);
    //console.log("Geçersiz alanlar:", this.getInvalidControlNames(this.form));

    if (this.selected) { // sadece güncellemede kontrol etsin
      this.form.setControl('passport', this.fb.array([]));
      this.form.setControl('contactInfos', this.fb.array([]));
    }


    if (this.form.invalid) return;
    this.isBusy = true;

    this.createRequest()
      .pipe(
        finalize(() => (this.isBusy = false)),
        tap(() => this.hideForm())
      )
      .subscribe(() => this.list.get());
  }



  /** Helpers for dynamic ContactInfo rows */
  addContactInfo() {
    this.contactInfos.push(this.createContactInfoGroup());
  }
  removeContactInfo(i: number) {
    if (this.contactInfos.length > 1) {
      this.contactInfos.removeAt(i);
    }
  }


  getInvalidControlNames(form: FormGroup): string[] {
    return Object.keys(form.controls).filter(key => {
      const control = form.get(key);
      return control?.invalid;
    });
  }


}
