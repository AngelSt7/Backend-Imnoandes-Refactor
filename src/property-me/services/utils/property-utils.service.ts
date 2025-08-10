import { Injectable } from '@nestjs/common';

@Injectable()
export class PropertyUtilsService {
    getAdds(newData: string[], dataDB: string[]) {
        return Array.from(new Set(newData.filter(x => !dataDB.includes(x))));
    }

    getDeletes(newData: string[], dataDB: string[]) {
        return Array.from(new Set(dataDB.filter(x => !newData.includes(x))));
    }
}
