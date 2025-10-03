import { Injectable } from '@nestjs/common';
import isEqual from 'fast-deep-equal';

@Injectable()
export class CompareObjectService {

    compareObject(newObject: any, originalObject: any): boolean {
        return isEqual(newObject, originalObject);
    }

}
