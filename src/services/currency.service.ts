import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Currency } from 'src/models/currencies';
import { Rates } from 'src/models/rates';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  constructor(private httpClient: HttpClient) { }

  getCurrencyNames() {
    return this.httpClient.get<Rates>(environment.currencyApiUrl).pipe(delay(2000));
  }

  getCurrencyRate<T>(from: Currency, to: Currency) {
    return this.httpClient.get<T>(`${environment.currencyApiUrl}?base=${from}&symbols=${to}`).pipe(delay(2000));
  }
}
