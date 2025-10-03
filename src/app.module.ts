import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule, FavoriteModule, ImagesModule, LocationModule, PropertyMeModule, PropertyPublicModule, ServiceModule, UserModule } from "./modules";
import { CommonModule } from "./common";
import { SeedModule } from "./seed";
import { EmailModule } from "./modules/email";


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
    FavoriteModule,
  ]
})
export class AppModule { }
