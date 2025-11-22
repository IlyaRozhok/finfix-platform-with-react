import { Module } from "@nestjs/common";
import { StatsService } from "./stats.service";
import { StatsController } from "./stats.controller";
import { UsersModule } from "@/users/users.module";
import { DebtsModule } from "@/debts/debts.module";
import { RecurringExpensesModule } from "@/recurring-expenses/recurring-expenses.module";
import { InstallmentsModule } from "@/installments/installments.module";

@Module({
  controllers: [StatsController],
  providers: [StatsService],
  imports: [
    UsersModule,
    DebtsModule,
    RecurringExpensesModule,
    InstallmentsModule,
  ],
})
export class StatsModule {}
