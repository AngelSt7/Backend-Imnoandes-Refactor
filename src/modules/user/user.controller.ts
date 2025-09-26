import { Controller, Body, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'generated/prisma';
import { UpdateEmailDto, UpdatePasswordDto, UpdatePhoneDto } from './dto';
import { Auth, GetUser } from '@/modules/auth/decorators';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Auth()
  @Patch('/phone')
  update(
    @GetUser() user: User,
    @Body() dto: UpdatePhoneDto
  ) {
    return this.userService.updatePhone(user, dto);
  }

  @Auth('LOCAL')
  @Patch('/email')
  updateEmail(
    @GetUser() user: User,
    @Body() dto: UpdateEmailDto
  ) {
    return this.userService.updateEmail(user, dto);
  }

  @Auth('LOCAL')
  @Patch('/password')
  updatePassword(
    @GetUser() user: User,
    @Body() dto: UpdatePasswordDto
  ) {
    return this.userService.updatePassword(user, dto);
  }
}
