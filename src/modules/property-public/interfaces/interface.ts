import { LocationService } from "@/modules/location/location.service";

export type IdsLocation = Awaited<ReturnType<LocationService['getIdsLocations']>>
