import { Injectable } from '@nestjs/common';
import { ServiceRepository } from './repository';

@Injectable()
export class ServiceService {
    constructor(private readonly serviceRepository: ServiceRepository) {}
    async findAll() {
        return await this.serviceRepository.findAll();
    }
}
