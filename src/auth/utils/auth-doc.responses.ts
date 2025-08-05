import { ValidResponses } from "../interfaces";
import { authDescriptions } from "./auth-descriptions";

export const AUTH_REGISTER_RESPONSE = [
  { response: ValidResponses.create, description: authDescriptions.created },
  { response: ValidResponses.conflict, description: authDescriptions.conflict },
];

export const AUTH_LOGIN_RESPONSE = [
  { response: ValidResponses.read, description: authDescriptions.loginSuccess },
  { response: ValidResponses.badRequest, description: authDescriptions.invalidCredentials },
  { response: ValidResponses.notFound, description: authDescriptions.notFound },
];

export const AUTH_CONFIRM_ACCOUNT_RESPONSE = [
  { response: ValidResponses.read, description: authDescriptions.confirmed },
  { response: ValidResponses.notFound, description: authDescriptions.tokenNotFound },
];

export const AUTH_REQUEST_TOKEN_RESPONSE = [
  { response: ValidResponses.read, description: authDescriptions.tokenSent },
  { response: ValidResponses.notFound, description: authDescriptions.notFound },
];

export const AUTH_FORGOT_PASSWORD_RESPONSE = [
  { response: ValidResponses.read, description: authDescriptions.resetTokenSent },
  { response: ValidResponses.notFound, description: authDescriptions.notFound },
];

export const AUTH_RECOVER_PASSWORD_RESPONSE = [
  { response: ValidResponses.read, description: authDescriptions.passwordChanged },
  { response: ValidResponses.notFound, description: authDescriptions.tokenNotFound },
  { response: ValidResponses.notFound, description: authDescriptions.notFound }
];