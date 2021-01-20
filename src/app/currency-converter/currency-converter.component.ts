import { CurrencyPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Observable, Observer, Subject } from 'rxjs';
import { Currency } from './models/currencies';
import { Rate } from './models/rate';
import { Rates } from './models/rates';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent {
  private readonly apiBaseURL = "https://api.exchangeratesapi.io/latest"

  currencies: string[] = [];

  chachedRates: number[] = [1];

  private oldToValues = {
    input: 0,
    currency: "CAD",
  }

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


  getFrom(type: "currency" | "input", index: number) {
    return this.formGroup.get("froms")!.get(index.toString())?.get(type) as FormControl;
  }

  getTo(type: "currency" | "input") {
    return this.formGroup.get("to")!.get(type) as FormControl;
  }

  get froms() {
    return this.formGroup.get("froms") as FormArray;
  }

  get toGroup() {
    return this.formGroup.get("to") as FormGroup;
  }

  constructor(private httpClient: HttpClient) {
    this.listenToChanges();

    httpClient.get<Rates>(this.apiBaseURL).subscribe((rates: Rates) => this.handleRates(rates));
  }

  listenToChanges() {
    this.froms.valueChanges.subscribe(this.fromsChanged.bind(this));
    this.toGroup.valueChanges.subscribe(this.toChanged.bind(this));
  }

  private getCurrencyRateObservable<T>(from: Currency, to: Currency) {
    return this.httpClient.get<T>(`${this.apiBaseURL}?base=${from}&symbols=${to}`)
  }

  fromsChanged() {
    let result = 0;
    let requsetToChangeToInput = new Subject<number>();

    requsetToChangeToInput.subscribe(() => {
      console.log("request done");
      this.getTo("input").setValue(result.toFixed(2), { emitEvent: false });
      this.oldToValues.input = this.getTo("input").value;
      requsetToChangeToInput.complete();
    });

    for (let i = 0; i < this.froms.controls.length; i++) {
      this.getCurrencyRateObservable<Rate>(this.getFrom("currency", i).value, this.getTo("currency").value)
        .subscribe((rate: Rate) => {
          result += this.getFrom("input", i).value * rate.rates[this.getTo("currency").value as Currency]!;
          if (i === this.froms.controls.length - 1)
            requsetToChangeToInput.next();
        });
    }

  }

  toChanged() {
    if (this.froms.controls.length == 1) {
      this.getCurrencyRateObservable<Rate>(this.getTo("currency").value, this.getFrom("currency", 0).value)
        .subscribe((rate: Rate) => {
          this.getFrom("input", 0).setValue((this.getTo("input").value * rate.rates[this.getFrom("currency", 0).value as Currency]!).toFixed(2), { emitEvent: false });
        });
    }
    else {
      let scale = 1;
      if (this.oldToValues.currency !== this.getTo("currency").value) {
        this.getCurrencyRateObservable<Rate>(this.oldToValues.currency as Currency, this.getTo("currency").value)
          .subscribe((rate: Rate) => scale = rate.rates[this.getTo("currency").value as Currency]!);
      }
      if (this.oldToValues.input != 0) {
        scale *= this.getTo("input").value / this.oldToValues.input;
        for (let i = 0; i < this.froms.controls.length; i++)
          this.getFrom("input", i).setValue((this.getFrom("input", i).value * scale).toFixed(2), { emitEvent: false });
      }
    }

    this.oldToValues.input = this.getTo("input").value;
    this.oldToValues.currency = this.getTo("currency").value;
  }

  handleRates(rates: Rates) {
    for (let currencyName in rates.rates)
      this.currencies.push(currencyName);
  }

  addNewCurrency() {
    this.froms.push(new FormGroup({
      currency: new FormControl("CAD"),
      input: new FormControl(""),
    }));
  }

  removeLastCurrency() {
    this.froms.controls.pop();
    this.fromsChanged();
  }
}
