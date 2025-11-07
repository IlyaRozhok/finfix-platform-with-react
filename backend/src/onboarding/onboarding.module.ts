import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OnboardingController } from "./onboarding.controller";
import { OnboardingService } from "./onboarding.service";
import { Category } from "./onboarding.entity";
import { UsersModule } from "@/users/users.module";
import { User } from "@/users/user.entity";
import { UsersService } from "@/users/users.service";
import { RecurringExpensesModule } from "@/recurring-expenses/recurring-expenses.module";
import { RecurringExpense } from "@/recurring-expenses/recurring-expense.entity";
import { InstallmentsModule } from "@/installments/installments.module";
import { Installment } from "@/installments/installment.entity";
import { Debt } from "@/debts/debt.entity";
import { DebtsModule } from "@/debts/debts.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Category,
      User,
      RecurringExpense,
      Installment,
      Debt,
    ]),
    UsersModule,
    RecurringExpensesModule,
    InstallmentsModule,
    DebtsModule,
  ],
  controllers: [OnboardingController],
  providers: [OnboardingService, UsersService],
  exports: [OnboardingService],
})
export class OnboadingModule {}
