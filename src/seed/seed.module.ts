import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { Car, CarSchema } from 'src/cars/entities/car.entity';
import { AuthModule } from 'src/auth/auth.module';
import { User, UserSchema } from 'src/auth/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Car.name, schema: CarSchema },
      { name: User.name, schema: UserSchema },
    ]),
    AuthModule
  ],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
