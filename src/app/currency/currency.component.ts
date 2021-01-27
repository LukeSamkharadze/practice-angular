import { CurrencyPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { promise } from 'protractor';
import { forkJoin, Observable, Observer, of, Subject } from 'rxjs';
import { CurrencyService } from 'src/services/currency.service';
import { Currency } from '../../models/currencies';
import { Rate } from '../../models/rate';
import { Rates } from '../../models/rates';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent {
  constructor(private currencyService: CurrencyService) {
    this.listenToChanges();
    this.requestCurrencyNames();
  }

  private readonly apiBaseURL = "https://api.exchangeratesapi.io/latest"
  private oldToValues = {
    input: 0,
    currency: "CAD",
  }

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


  private listenToChanges() {
    this.froms.valueChanges.subscribe(this.fromsChanged.bind(this));
    this.toGroup.valueChanges.subscribe(this.toChanged.bind(this));
  }

  private fromsChanged() {
    let observables = Array
      .apply(null, Array((this.froms.controls.length)))
      .map((control, index) => this.currencyService.getCurrencyRate<Rate>(this.getFrom("currency", index).value, this.getTo("currency").value))

    forkJoin(observables).subscribe(results => {
      let result = results
        .map((rate, index) => this.getFrom("input", index).value * rate.rates[this.getTo("currency").value as Currency]!)
        .reduce((acc, curr) => acc + curr);

      this.getTo("input").setValue(result.toFixed(2), { emitEvent: false });
      this.oldToValues.input = result;
    });
  }

  private toChanged() {
    if (this.froms.controls.length == 1) {
      this.currencyService.getCurrencyRate<Rate>(this.getTo("currency").value, this.getFrom("currency", 0).value)
        .subscribe((rate: Rate) =>
          this.getFrom("input", 0).setValue((this.getTo("input").value * rate.rates[this.getFrom("currency", 0).value as Currency]!).toFixed(2), { emitEvent: false })
        );
    }
    else {
      let scale = 1;
      if (this.oldToValues.currency !== this.getTo("currency").value) {
        this.currencyService.getCurrencyRate<Rate>(this.oldToValues.currency as Currency, this.getTo("currency").value)
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

  private requestCurrencyNames() {
    this.currencyService.getCurrencyNames().subscribe((rates: Rates) => {
      for (let currencyName in rates.rates)
        this.currencies.push(currencyName);
    });
  }

  public addNewCurrency() {
    this.froms.push(new FormGroup({
      currency: new FormControl("CAD"),
      input: new FormControl(""),
    }));
  }

  public tryRemoveCurrency() {
    if (this.froms.controls.length > 1) {
      this.froms.controls.pop();
      this.fromsChanged();
    }
  }
}
