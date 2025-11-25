import { Module } from "@nestjs/common";
import { IncomesService } from "./incomes.service";
import { IncomesController } from "./incomes.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RegularIncomes } from "@/entities/incomes/income-regular.entity";
import { EventIncomes } from "@/entities/incomes/income-event.entity";

@Module({
  imports: [TypeOrmModule.forFeature([RegularIncomes, EventIncomes])],
  controllers: [IncomesController],
  providers: [IncomesService],
})
export class IncomesModule {}
