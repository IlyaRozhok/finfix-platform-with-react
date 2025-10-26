import { Module } from "@nestjs/common";
import { InstallmentsService } from "./installments.service";
import { InstallmentsController } from "./installments.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Installment } from "./installment.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Installment])],
  controllers: [InstallmentsController],
  providers: [InstallmentsService],
})
export class InstallmentsModule {}
