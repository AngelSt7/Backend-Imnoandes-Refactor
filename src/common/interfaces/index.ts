import { ValidResponses } from "src/auth/interfaces";

export type StringFieldsOf<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

export interface ResponseEntry {
  response: ValidResponses;
  description: string;
}