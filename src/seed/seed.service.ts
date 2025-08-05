import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/auth/entities/user.entity';
import { Car } from 'src/cars/entities/car.entity';
import { seedData } from 'src/data/seed.data';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Car.name)
    private readonly carModel: Model<Car>,
    @InjectModel(User.name)
    private readonly authModel: Model<User>,
  ) { }
  async executeSeed(): Promise<string> {
    await this.deleteDocuments();
    const passwordHash = await bcrypt.hash(seedData.user.password, 10);
    const user = await this.authModel.create({...seedData.user, password: passwordHash});

    const dataWhitUser = seedData.cars.map(car => ({ ...car, userId: user._id }));
    await this.carModel.insertMany(dataWhitUser);

    return 'Seed executed successfully';
  }

  async deleteDocuments(): Promise<void> {
    await this.carModel.deleteMany({});
    await this.authModel.deleteMany({});
  }
}
