import { ValidResponses } from "src/auth/interfaces";
import { CarDescriptions } from "./car.descriptions";

export const CAR_CREATE_RESPONSE = [
  { response: ValidResponses.create, description: CarDescriptions.created },
  { response: ValidResponses.badRequest, description: CarDescriptions.invalidData },
  { response: ValidResponses.unauthorized, description: CarDescriptions.unauthorized },
  { response: ValidResponses.conflict, description: CarDescriptions.conflict }
];

export const CAR_READ_RESPONSE = [
  { response: ValidResponses.read, description: CarDescriptions.fetched },
  { response: ValidResponses.badRequest, description: CarDescriptions.invalidData },
  { response: ValidResponses.notFound, description: CarDescriptions.notFound },
  { response: ValidResponses.unauthorized, description: CarDescriptions.unauthorized }
];

export const CAR_UPDATE_RESPONSE = [
  { response: ValidResponses.update, description: CarDescriptions.updated },
  { response: ValidResponses.badRequest, description: CarDescriptions.invalidData },
  { response: ValidResponses.unauthorized, description: CarDescriptions.unauthorized },
  { response: ValidResponses.conflict, description: CarDescriptions.conflict },
  { response: ValidResponses.notFound, description: CarDescriptions.notFound },
]

export const CAR_DELETE_RESPONSES = [
  { response: ValidResponses.delete, description: CarDescriptions.deleted },
  { response: ValidResponses.badRequest, description: CarDescriptions.invalidData },
  { response: ValidResponses.unauthorized, description: CarDescriptions.unauthorized },
]

