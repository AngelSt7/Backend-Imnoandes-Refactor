import { Injectable } from '@nestjs/common';
import { addMinutes } from 'date-fns';

@Injectable()
export class DateService {

    convert(date: Date | undefined) : Date | undefined {
        if (date === undefined) return undefined
        const isoDate = new Date(date)
        return isoDate;
    }

    expiresAt(): Date {
        const now = new Date();
        const expires = addMinutes(now, 10);
        return expires;
    }

}
