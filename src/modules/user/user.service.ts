import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'generated/prisma';
import { UpdateEmailDto, UpdatePasswordDto, UpdatePhoneDto } from './dto';
import { UserRepository } from './repository/user.repository';
import * as bcrypt from 'bcrypt';
import { CACHE_KEYS } from '@/cache/cache-keys';
import { CacheUtilsService } from '@/common/services';

@Injectable()
export class UserService {

  constructor(
    private readonly UserRepository: UserRepository,
    private readonly cacheUtilsService: CacheUtilsService
  ) { }

  async updatePhone(user: User, dto: UpdatePhoneDto) {
    if (user.phone === dto.phone) throw new BadRequestException('The new number cannot be the same as the current one.');
    const existUser = await this.UserRepository.findByCondition('phone', dto.phone);
    if (existUser) throw new BadRequestException('Phone number already in use.')
    await this.UserRepository.updateInfo(user.id, { phone: dto.phone });
    await await this.cacheUtilsService.deleteKeys([`${CACHE_KEYS.USER}/${user.id}`])
    return {
      message: 'Phone number updated successfully'
    }
  }

  async updateEmail(user: User, dto: UpdateEmailDto) {
    if (user.email === dto.email) throw new BadRequestException('The new email cannot be the same as the current one.');
    const existUser = await this.UserRepository.findByCondition('email', dto.email);
    if (existUser) throw new BadRequestException('Email already in use.')
    await this.UserRepository.updateInfo(user.id, { email: dto.email });
    await await this.cacheUtilsService.deleteKeys([`${CACHE_KEYS.USER}/${user.id}`])
    return {
      message: 'Email updated successfully'
    }
  }

  async updatePassword(user: User, dto: UpdatePasswordDto) {
    const userDB = await this.UserRepository.findByCondition('email', dto.email)
    if (!userDB) throw new BadRequestException('You must use a local account to recover your password');
    const match = await bcrypt.compare(dto.currentPassword, userDB.password!)
    if (!match) throw new BadRequestException('The password is incorrect');
    const passwordHash = await bcrypt.hash(dto.newPassword, 10);
    await this.UserRepository.updateInfo(user.id, { password: passwordHash });
    await this.cacheUtilsService.deleteKeys([`${CACHE_KEYS.USER}/${userDB.id}`]);
    return {
      message: 'Password updated successfully'
    }
  }

}
