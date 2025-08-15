import { Injectable, NotFoundException } from '@nestjs/common';
import { DistrictRepository } from './repository';
import { Province } from 'generated/prisma';

@Injectable()
export class DistrictService {
    constructor(private readonly districtRepository: DistrictRepository) {}

    async findAll(provinceId: Province['id']) {
        const distritcs = await this.districtRepository.findAll(provinceId);
        if (!distritcs) throw new NotFoundException('Distritcs not found');
        return distritcs;
    }
}
