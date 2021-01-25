import { from } from "rxjs"
import { Currency } from "./currencies";

export interface Rates {
  base: Currency,
  date: Date,
  rates: {
    [key in Currency]: number
  }
}