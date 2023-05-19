import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Currency } from 'src/app/models/currency.model';

@Component({
  selector: 'app-convert-form',
  templateUrl: './convert-form.component.html',
  styleUrls: ['./convert-form.component.scss']
})
export class ConvertFormComponent implements OnInit, OnDestroy {
  @Input() set currencies(value: Currency[] | null) {
    if (value) {
      this.currenciesList = value;
      this.currenciesMap = new Map<string, Currency>(value?.map(curr => [curr.cc, curr]));
      this.value1.updateValueAndValidity();
    }
  };

  currenciesMap: Map<string, Currency>;

  currenciesList: Currency[];

  @Input() defaultValue1: number = 100;

  @Input() defaultValue2: number = 0;

  @Input() defaultCurrency1: string;

  @Input() defaultCurrency2: string;

  value1 = new FormControl<number>(0);

  currency1 = new FormControl<string>('');

  value2 = new FormControl<number>(0);

  currency2 = new FormControl<string>('');

  convertForm = new FormGroup({
    value1: this.value1,
    currency1: this.currency1,
    value2: this.value2,
    currency2: this.currency2
  });

  subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.value1.patchValue(this.defaultValue1);
    this.value2.patchValue(this.defaultValue2);
    this.currency1.patchValue(this.defaultCurrency1);
    this.currency2.patchValue(this.defaultCurrency2);

    this.subscription.add(
      this.value1.valueChanges
        .subscribe((value) => this.value2.patchValue(
          this.calculateValue(
            value || 0,
            this.currenciesMap.get(this.currency1.value || '')?.rate || 0,
            this.currenciesMap.get(this.currency2.value || '')?.rate || 0,
          ), { emitEvent: false }))
    );
    this.subscription.add(
      this.value2.valueChanges
        .subscribe((value) => this.value1.patchValue(
          this.calculateValue(
            value || 0,
            this.currenciesMap.get(this.currency2.value || '')?.rate || 0,
            this.currenciesMap.get(this.currency1.value || '')?.rate || 0,
          ), { emitEvent: false }))
    );
    this.subscription.add(
      this.currency1.valueChanges
        .subscribe((value) => this.value1.patchValue(
          this.calculateValue(
            this.value1.value || 0,
            this.currenciesMap.get(this.convertForm.value.currency1 || '')?.rate || 0,
            this.currenciesMap.get(value || '')?.rate || 0,
          ), { emitEvent: false }))
    );
    this.subscription.add(
      this.currency2.valueChanges
        .subscribe((value) => this.value2.patchValue(
          this.calculateValue(
            this.value2.value || 0,
            this.currenciesMap.get(this.convertForm.value.currency2 || '')?.rate || 0,
            this.currenciesMap.get(value || '')?.rate || 0,
          ), { emitEvent: false }))
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  calculateValue(value: number, rate1: number, rate2: number): number {
    return value * rate1 / rate2;
  }
}
