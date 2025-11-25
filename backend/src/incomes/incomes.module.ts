import { Module } from "@nestjs/common";
import { IncomesService } from "./incomes.service";
import { IncomesController } from "./incomes.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Incomes } from "@/entities/incomes/income-regular.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Incomes])],
  controllers: [IncomesController],
  providers: [IncomesService],
})
export class IncomesModule {}
