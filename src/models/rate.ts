import { Currency } from "./currencies";

export interface Rate {
  base: Currency,
  date: Date,
  rates: {
    [key in Currency]?: number;
  }
}