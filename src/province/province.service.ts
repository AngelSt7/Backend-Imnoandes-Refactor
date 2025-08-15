import { Injectable, NotFoundException } from '@nestjs/common';
import { Department } from 'generated/prisma';
import { ProvinceRepository } from './repository';

@Injectable()
export class ProvinceService {

    constructor(private readonly provinceRepository: ProvinceRepository){}
    
    async findAll(departmentId: Department['id']){
        const provinces = await this.provinceRepository.findAll(departmentId);
        if(!provinces) throw new NotFoundException('Provinces not found');
        return provinces
    }

}
