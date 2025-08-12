import { Injectable } from '@nestjs/common';
import { UpdatePropertyMeDto } from 'src/property-me/dto';

@Injectable()
export class ServiceToPropertyUtilsService {

    preparedData(updateServicesId: UpdatePropertyMeDto['servicesId'] = [], servicesId: string []) {
        const { adds, deletes } = this.getAddsAndDeletes(updateServicesId, servicesId);
        return { adds, deletes };
    }

    getAddsAndDeletes(newData: string[], dataDB: string[]) {
        return {
            adds: this.getAdds(newData, dataDB),
            deletes: this.getDeletes(newData, dataDB)
        };
    }

    getAdds(newData: string[], dataDB: string[]) {
        return Array.from(new Set(newData.filter(x => !dataDB.includes(x))));
    }

    getDeletes(newData: string[], dataDB: string[]) {
        return Array.from(new Set(dataDB.filter(x => !newData.includes(x))));
    }
}
