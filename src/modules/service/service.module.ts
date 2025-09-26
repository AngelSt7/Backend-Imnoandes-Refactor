import { Module } from "@nestjs/common";
import { ServiceRepository } from "./repository";
import { ServiceController } from "./service.controller";
import { ServiceService } from "./service.service";
import { CommonModule } from "src/common";

@Module({
  imports: [CommonModule],
  controllers: [ServiceController],
  providers: [ServiceService, ServiceRepository],
})
export class ServiceModule {}
