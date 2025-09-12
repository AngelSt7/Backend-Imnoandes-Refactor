import { Service } from "generated/prisma";

export interface ServiceToProperty {
  service: {
    service: Service['service'];
  };
}
