import { IMAGE_TYPE } from "generated/prisma";

export interface PropertyImage {
  url: string;
  type?: IMAGE_TYPE | string;
}
