import { Injectable, NotFoundException } from '@nestjs/common';
import { CompleteAccountDto, CreateUserDto } from '@/modules/auth/dto';
import { BcryptService } from '@/modules/auth/services';
import { DateService } from '@/modules/auth/services';
import { User } from 'generated/prisma';
import { HandleErrorsService } from '@/common/services';
import { UserRepository } from '@/modules/auth/repository';

@Injectable()
export class UserService {

    private readonly context = 'auth'

    constructor(
        private readonly userRepository: UserRepository,
        private readonly dateService: DateService,
        private readonly bcryptService: BcryptService,
        private readonly handleErrorsService: HandleErrorsService
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        try {
            const birthDate = this.dateService.convert(createUserDto.birthDate);
            const password = await this.bcryptService.hash(createUserDto.password);
            const user = await this.userRepository.create({ ...createUserDto, birthDate, password });
            return user;
        } catch (error) {
            this.handleErrorsService.handleError(error, this.context)
        }
    }

    async completeAccount(completeAccountDto: CompleteAccountDto, userId: User['id']) {
        try {
            const birthDate = this.dateService.convert(completeAccountDto.birthDate);
            return await this.userRepository.completeAccount({ ...completeAccountDto, birthDate, id: userId });
        } catch (error) {
            this.handleErrorsService.handleError(error, this.context)
        }
    }

    async confirm(id: User['id']): Promise<User> {
        return await this.userRepository.confirm(id);
    }

    async find(term: User['id'] | User['email']) {
        const user = await this.userRepository.find(term);
        if (!user) throw new NotFoundException('User not found');
        return user
    }

    async recover(id: User['id'], password: string): Promise<User> {
        const passwordHash = await this.bcryptService.hash(password);
        const user = await this.userRepository.recover(id, passwordHash);
        return user;
    }

    async exist(email: User['email']) {
        return await this.userRepository.find(email);
    }

}
