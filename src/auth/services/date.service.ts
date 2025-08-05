import { Injectable } from '@nestjs/common';

@Injectable()
export class DateService {

    convert(dateString: string | undefined): string | undefined {
        if (dateString === undefined) return undefined
        const isoDate = new Date(dateString).toISOString();
        return isoDate;
    }

    expiresAt(): Date {
        const now = new Date();
        const expires = new Date(now.getTime() + 10 * 60000);
        return expires;
    }

}
