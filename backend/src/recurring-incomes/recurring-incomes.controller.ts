import { Body, Controller, Post } from "@nestjs/common";
import { RecurringIncomesService } from "./recurring-incomes.service";
import { ENDPOINTS } from "@/shared/router";
import { UpdateCurrencyDto } from "@/onboarding/index.dto";

@Controller("recurring-incomes")
export class RecurringIncomesController {
  constructor(
    private readonly recurringIncomesService: RecurringIncomesService
  ) {}
}
