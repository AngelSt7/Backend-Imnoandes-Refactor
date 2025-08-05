import { ValidResponses } from "src/auth/interfaces";
import { ImageDescriptions } from "./image-descriptions";

export const IMAGE_UPLOAD_RESPONSE = [
  { response: ValidResponses.create, description: ImageDescriptions.created },
  { response: ValidResponses.badRequest, description: ImageDescriptions.invalidData },
];

export const IMAGE_REMOVE_RESPONSE = [
  { response: ValidResponses.delete, description: ImageDescriptions.deleted },
  { response: ValidResponses.badRequest, description: ImageDescriptions.invalidData },
];