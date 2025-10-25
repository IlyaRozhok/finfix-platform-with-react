import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";

import { ENDPOINTS, ROUTE_SEGMENTS } from "@/shared/router";
import { DebtsService } from "./debt.service";

@Controller(ROUTE_SEGMENTS.ONBOARDING)
export class DebtsController {
  constructor(private readonly DebtsService: DebtsService) {}

  @Get(`${ENDPOINTS.ONBOARDING.DEBTS}/:uid`)
  async getOnboardingDebts(@Param("uid") uid: string) {
    const expenses = await this.DebtsService.getDebts(uid);
    return expenses;
  }

  @Post(ENDPOINTS.ONBOARDING.DEBTS)
  async createExpense(@Body() dto: RecurringExpense[]) {
    const expenses = await this.recurringExpensesService.updateExpenses(dto);
    return expenses;
  }
}
