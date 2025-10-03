import { VALID_RESPONSES } from "src/constants";

export type StringFieldsOf<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

export interface ResponseEntry {
  response: VALID_RESPONSES;
  description: string;
}