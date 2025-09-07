import { Injectable } from '@nestjs/common';
import { Service } from '../../generated/prisma/index';
import { ServiceRepository } from './repository';

@Injectable()
export class ServiceService {
    constructor(private readonly serviceRepository: ServiceRepository) {}
    async findAll() {
        return await this.serviceRepository.findAll();
    }
}
