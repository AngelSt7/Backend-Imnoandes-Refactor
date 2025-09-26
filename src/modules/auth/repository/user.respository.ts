import { Injectable } from '@nestjs/common';
import { CreateUserDto, oAuthGoogleDto } from '../dto';
import { User } from 'generated/prisma';
import { isEmail, IsEmail } from 'class-validator';
import { CompleteAccountDto } from '../dto/register/complete-account.dto';
import { PrismaService } from '@/common/services';

@Injectable()
export class UserRepository {

    constructor(
        private readonly prisma : PrismaService
    ) { }

    create(user: CreateUserDto){
        return this.prisma.user.create({ data: user });
    }

    completeAccount(user: CompleteAccountDto){
        return this.prisma.user.update({where: { id: user.id }, data: user });
    }

    createToGoogle(user: oAuthGoogleDto){
        return this.prisma.user.create({ data: user });
    }

    confirm(id: User['id']){
        return this.prisma.user.update({where: { id }, data: { confirmed: true } });
    }

    find(term: User['id'] | User['email']){
        return this.prisma.user.findUnique({ where: 
            isEmail(term) ? { email: term } : { id: term }
        });
    }

    recover(id: User['id'], password: string){
        return this.prisma.user.update({where: { id }, data: { password } });
    }

}
