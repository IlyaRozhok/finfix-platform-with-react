import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";

import { ENDPOINTS, ROUTE_SEGMENTS } from "@/shared/router";
import { DebtsService } from "./debt.service";
import { CreateDebtDto } from "./dto";

@Controller(ROUTE_SEGMENTS.ONBOARDING)
export class DebtsController {
  constructor(private readonly DebtsService: DebtsService) {}

  @Get(`${ENDPOINTS.ONBOARDING.DEBTS}/:uid`)
  async getOnboardingDebts(@Param("uid") uid: string) {
    const expenses = await this.DebtsService.getDebts(uid);
    return expenses;
  }

  @Post(ENDPOINTS.ONBOARDING.DEBTS)
  async createExpense(@Body() dto: CreateDebtDto[]) {
    const expenses = await this.DebtsService.createDebts(dto);
    return expenses;
  }

  @Put(`${ENDPOINTS.ONBOARDING.DEBTS}/:id`)
  async updateDebt(@Param("id") id: string, @Body() dto: CreateDebtDto) {
    const debt = await this.DebtsService.updateDebt(id, dto);
    return debt;
  }

  @Delete(`${ENDPOINTS.ONBOARDING.DEBTS}/:id`)
  async deleteDebt(@Param("id") id: string) {
    const debt = await this.DebtsService.deleteDebt(id);
    return debt;
  }
}
