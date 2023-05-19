import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Currency } from './models/currency.model';
import { CurrenciesService } from './services/currencies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private currenciesService: CurrenciesService) {}

  headerCurrencies$: Observable<Currency[]>;

  convertFormCurrencies$: Observable<Currency[]>;

  defaultCurrency1: string;

  defaultCurrency2: string;

  ngOnInit(): void {
    this.currenciesService.loadCurrencies();

    this.headerCurrencies$ = this.currenciesService.headerCurrencies$;

    this.convertFormCurrencies$ = this.currenciesService.convertFormCurrencies$;

    this.defaultCurrency1 = this.currenciesService.defaultCurrency1;

    this.defaultCurrency2 = this.currenciesService.defaultCurrency2;
  }
}
