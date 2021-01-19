import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import * as CurrenciesResponse from "./models/rates";

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit {
  currencies: string[] = [];
  observable: Observable<Object> | undefined;

  formGroup: FormGroup = new FormGroup({
    default: new FormControl("0"),
    optional: new FormArray([])
  })

  constructor(private httpClient: HttpClient) {
    this.observable = httpClient.get("https://api.exchangeratesapi.io/latest");
    this.observable.subscribe(o => this.handleRates(o));
  }

  handleRates(response: any) {
    for (let currencyName in response.rates)
      this.currencies.push(currencyName);
  }

  addNewCurrency() {
    (this.formGroup.get("optional") as FormArray).push(new FormControl("0"))
  }

  getAddedControls(): AbstractControl[] {
    return (this.formGroup.get("optional") as FormArray).controls;
  }

  ngOnInit(): void { }
}
