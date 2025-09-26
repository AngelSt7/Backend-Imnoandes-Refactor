import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CommonModule } from '@/common';
import { UserRepository } from '@/modules/user/repository';
import { AuthModule } from '@/modules/auth';

@Module({
  imports: [CommonModule, AuthModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
