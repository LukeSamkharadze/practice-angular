import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { Currency } from './models/currencies';
import { Rate } from './models/rate';
import { Rates } from './models/rates';

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
  oldToValues = {
    input: 0,
    currency: "CAD",
  }

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

    httpClient.get<Rates>("https://api.exchangeratesapi.io/latest").subscribe((rates: Rates) => this.handleRates(rates));
  }

  listenToChanges() {
    this.froms.valueChanges.subscribe(this.fromsChanged.bind(this));
    this.toGroup.valueChanges.subscribe(this.toChanged.bind(this));
  }

  fromsChanged() {
    let result = 0;
    let requsetToChangeToInput = new Subject<number>();

    for (let i = 0; i < this.froms.controls.length; i++) {
      this.httpClient.get(`https://api.exchangeratesapi.io/latest?base=${this.getFrom("currency", i).value}&symbols=${this.getTo("currency").value}`)
        .subscribe((rate: any) => {
          result += this.getFrom("input", i).value * rate.rates[this.getTo("currency").value];
          if (i === this.froms.controls.length - 1)
            requsetToChangeToInput.next();
        });
    }

    requsetToChangeToInput.subscribe(() => {
      this.getTo("input").setValue(result.toFixed(2), { emitEvent: false });
      this.oldToValues.input = this.getTo("input").value;
      requsetToChangeToInput.complete();
    });
  }

  toChanged() {
    if (this.froms.controls.length == 1) {
      this.httpClient.get<Rate>(`https://api.exchangeratesapi.io/latest?base=${this.getTo("currency").value}&symbols=${this.getFrom("currency", 0).value}`)
        .subscribe((rate: Rate) => {
          let selectValue: Currency = this.getFrom("currency", 0).value;
          if (Object.values(Currency).includes(selectValue))
            this.getFrom("input", 0).setValue((this.getTo("input").value * rate.rates[selectValue]!).toFixed(2), { emitEvent: false });
        });
    }
    else {
      let scale = 1;
      if (this.oldToValues.currency !== this.getTo("currency").value) {
        this.httpClient.get<Rate>(`https://api.exchangeratesapi.io/latest?base=${this.oldToValues.currency}&symbols=${this.getTo("currency").value}`)
          .subscribe((rate: Rate) => {
            let selectValue: Currency = this.getTo("currency").value;
            if (Object.values(Currency).includes(selectValue))
              scale = rate.rates[selectValue]!;
          });
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
