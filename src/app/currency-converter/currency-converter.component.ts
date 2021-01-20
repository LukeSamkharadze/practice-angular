import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { reduce } from 'rxjs/operators';

import * as CurrenciesResponse from "./models/rates";

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent {
  currencies: string[] = [];

  formGroup: FormGroup = new FormGroup({
    froms: new FormArray([
      new FormGroup({
        currency: new FormControl("CAD"),
        input: new FormControl(""),
      }
      )]),
    to: new FormGroup({
      currency: new FormControl("CAD"),
      input: new FormControl(""),
    }),
  })

  chachedRates: number[] = [1];

  getFrom(type: "currency" | "input", index: number) {
    return this.formGroup.get("froms")!.get(index.toString())?.get(type) as FormControl;
  }

  getTo(type: "currency" | "input") {
    return this.formGroup.get("to")!.get(type) as FormControl;
  }

  get froms() {
    return this.formGroup.get("froms") as FormArray;
  }

  constructor(private httpClient: HttpClient) {
    this.listenToChanges();

    httpClient.get("https://api.exchangeratesapi.io/latest").subscribe(o => this.handleRates(o));
  }

  listenToChanges() {
    this.froms.valueChanges.subscribe(this.fromsChanged.bind(this));
    // this.fromCurrency.valueChanges.subscribe(this.fromCurrencyChanged.bind(this));
    // this.toInput.valueChanges.subscribe(this.toInputChanged.bind(this));
    // this.toCurrency.valueChanges.subscribe(this.toCurrencyChanged.bind(this));
  }

  fromsChanged() {
    let result = 0;
    let requsetToChangeToInput = new Subject<number>();

    for (let i = 0; i < this.froms.controls.length; i++) {
      this.httpClient.get(`https://api.exchangeratesapi.io/latest?base=${this.getFrom("currency", i).value}&symbols=${this.getTo("currency").value}`)
        .subscribe((response: any) => {
          result += this.getFrom("input", i).value * response.rates[this.getTo("currency").value];
          if (i === this.froms.controls.length - 1) {
            requsetToChangeToInput.next();
          }
          // this.chachedFromToRate = response.rates[this.toCurrency.value];
          // this.getTo("input").setValue(this.fromInput.value)
        });
    }

    requsetToChangeToInput.subscribe(() => {
      this.getTo("input").setValue(result.toFixed(2), { emitEvent: false })
    });

    // this.toInput.setValue((this.fromInput.value * this.chachedFromToRate).toFixed(2), { emitEvent: false });
  }

  // fromCurrencyChanged(value: any) {
  //   this.currentCurrencyObservable = this.httpClient.get(`https://api.exchangeratesapi.io/latest?base=${this.fromCurrency.value}&symbols=${this.toCurrency.value}`);
  //   this.currentCurrencyObservable.subscribe((response: any) => {
  //     this.chachedFromToRate = response.rates[this.toCurrency.value];
  //     this.fromInputChanged(this.fromInput.value)
  //   });
  // }

  // fromInputChanged(value: any) {
  //   this.toInput.setValue((this.fromInput.value * this.chachedFromToRate).toFixed(2), { emitEvent: false });
  // }

  // toInputChanged() {
  //   this.fromInput.setValue((this.toInput.value / this.chachedFromToRate).toFixed(2), { emitEvent: false });
  // }

  // toCurrencyChanged() {
  //   this.currentCurrencyObservable = this.httpClient.get(`https://api.exchangeratesapi.io/latest?base=${this.fromCurrency.value}&symbols=${this.toCurrency.value}`);
  //   this.currentCurrencyObservable.subscribe((response: any) => {
  //     this.chachedFromToRate = response.rates[this.toCurrency.value];
  //     this.fromInputChanged(this.fromInput.value)
  //   });
  // }

  handleRates(response: any) {
    for (let currencyName in response.rates)
      this.currencies.push(currencyName);
  }

  addNewCurrency() {
    this.froms.push(new FormGroup({
      currency: new FormControl("CAD"),
      input: new FormControl(""),
    }));
  }
}
