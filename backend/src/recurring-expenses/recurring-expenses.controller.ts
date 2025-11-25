import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
import { RecurringExpensesService } from "./recurring-expenses.service";
import { RecurringExpense } from "../entities/recurring-expense.entity";
import { ENDPOINTS, ROUTE_SEGMENTS } from "@/shared/router";
import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { ApiTags } from "@nestjs/swagger";

@UseGuards(JwtAuthGuard)
@ApiTags("Expenses")
@Controller(ROUTE_SEGMENTS.ONBOARDING)
export class RecurringExpensesController {
  constructor(
    private readonly recurringExpensesService: RecurringExpensesService
  ) {}

  @Post(ENDPOINTS.ONBOARDING.EXPENSES)
  async createExpense(@Body() dto: RecurringExpense[]) {
    const expenses = await this.recurringExpensesService.updateExpenses(dto);
    return expenses;
  }

  @Get(ENDPOINTS.ONBOARDING.EXPENSES)
  async getOnboardingExpenses(@Param("uid") uid: string) {
    const expenses = await this.recurringExpensesService.getExpenses(uid);
    return expenses;
  }

  @Delete(`${ENDPOINTS.ONBOARDING.EXPENSES}/:expenseId`)
  async deleteExpense(@Param("expenseId") expenseId: string) {
    const expense =
      await this.recurringExpensesService.deleteExpense(expenseId);
    return expense;
  }
}
