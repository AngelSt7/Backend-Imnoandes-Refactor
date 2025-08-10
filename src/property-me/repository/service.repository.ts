import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { Prisma, Property, User } from 'generated/prisma';

@Injectable()
export class SeriviceRepository {
    private logger = new Logger(SeriviceRepository.name)
    constructor(
        private readonly prisma: PrismaService
    ) { }


}
