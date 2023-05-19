import { Injectable } from "@angular/core";
import { map, Observable, share } from "rxjs";
import { Currency } from "../models/currency.model";
import { ApiBankService } from "./api.bank.service";

@Injectable({
  providedIn: 'root',
})
export class CurrenciesService {
  constructor(private apiBankService: ApiBankService) {}

  allCurrencies$: Observable<Currency[]>;

  headerCurrencies$: Observable<Currency[]>;

  convertFormCurrencies$: Observable<Currency[]>;

  defaultCurrency1: string = 'USD';

  defaultCurrency2: string = 'UAH';

  loadCurrencies(): void {
    this.allCurrencies$ = this.apiBankService.getCurrencies().pipe(share());
    this.headerCurrencies$ = this.allCurrencies$.pipe(
      map(
        (allCurrencies) => allCurrencies.filter((currency) => ['USD', 'EUR'].includes(currency.cc))
      )
    );
    this.convertFormCurrencies$ = this.allCurrencies$.pipe(
      map(
        (allCurrencies) => allCurrencies
          .filter((currency) => ['USD', 'EUR'].includes(currency.cc))
          .concat({ cc: 'UAH', rate: 1 })
      )
    );
  }
}
