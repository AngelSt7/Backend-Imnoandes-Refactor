import { Injectable } from '@nestjs/common';

@Injectable()
export class CollectionDiffService {

    preparedData(newData: string[] | null = [], currentData: string[]) {
        const { adds, deletes } = this.getAddsAndDeletes(newData!, currentData);
        return { adds, deletes };
    }

    private getAddsAndDeletes(newData: string[], dataDB: string[]) {
        return {
            adds: this.getAdds(newData, dataDB),
            deletes: this.getDeletes(newData, dataDB)
        };
    }

    private getAdds(newData: string[], dataDB: string[]) {
        return Array.from(new Set(newData.filter(x => !dataDB.includes(x))));
    }

    private getDeletes(newData: string[], dataDB: string[]) {
        return Array.from(new Set(dataDB.filter(x => !newData.includes(x))));
    }

}
