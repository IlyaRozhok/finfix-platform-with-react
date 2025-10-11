import { Body, Controller, Post } from "@nestjs/common";
import { RecurringExpensesService } from "./recurring-expenses.service";
import { RecurringExpense } from "./recurring-expense.entity";
import { ENDPOINTS, ROUTE_SEGMENTS } from "@/shared/router";

@Controller(ROUTE_SEGMENTS.ONBOARDING)
export class RecurringExpensesController {
  constructor(
    private readonly recurringExpensesService: RecurringExpensesService
  ) {}

  @Post(ENDPOINTS.ONBOARDING.EXPENSES)
  async createExpense(@Body() dto: RecurringExpense[]) {
    console.log("dto", dto);
    const expenses = await this.recurringExpensesService.updateExpenses(dto);
    return expenses;
  }
}
