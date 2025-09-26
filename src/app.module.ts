import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule, EmailModule, ImagesModule, LocationModule, PropertyMeModule, PropertyPublicModule, ServiceModule, UserModule } from "./modules";
import { CommonModule } from "./common";
import { SeedModule } from "./seed";
import { FavoritesModule } from './modules/favorites/favorites.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    CommonModule,
    ImagesModule,
    PropertyMeModule,
    PropertyPublicModule,
    SeedModule,
    ServiceModule,
    LocationModule,
    EmailModule,
    UserModule,
    FavoritesModule,
  ]
})
export class AppModule {}
