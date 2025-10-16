import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OnboardingController } from "./onboarding.controller";
import { OnboardingService } from "./onboarding.service";
import { Category } from "./onboarding.entity";
import { UsersModule } from "@/users/users.module";
import { User } from "@/users/user.entity";
import { UsersService } from "@/users/users.service";
import { RecurringExpensesService } from "@/recurring-expenses/recurring-expenses.service";
import { RecurringExpensesModule } from "@/recurring-expenses/recurring-expenses.module";
import { RecurringExpense } from "@/recurring-expenses/recurring-expense.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, User, RecurringExpense]),
    UsersModule,
    RecurringExpensesModule,
  ],
  controllers: [OnboardingController],
  providers: [OnboardingService, UsersService, RecurringExpensesService],
  exports: [OnboardingService],
})
export class CategoriesModule {}
