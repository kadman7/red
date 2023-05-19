import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";
import { Currency } from "../models/currency.model";

@Injectable({
  providedIn: 'root',
})
export class ApiBankService {
  constructor(private httpClient: HttpClient) {}

  getCurrencies(): Observable<Currency[]> {
    return this.httpClient.get<Currency[]>('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
      .pipe(catchError(() => []));
  }
}
