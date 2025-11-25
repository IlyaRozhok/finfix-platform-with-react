import { Controller, Get, Req } from "@nestjs/common";
import { IncomesService } from "./incomes.service";
import { ENDPOINTS, ROUTE_SEGMENTS } from "@/shared/router";

@Controller(ROUTE_SEGMENTS.INCOMES)
export class IncomesController {
  constructor(private readonly incomesService: IncomesService) {}

  @Get(ENDPOINTS.STATS.INCOMES)
  async getIncomes(@Req() req) {
    const { uid } = req.user.sub;
    return await this.incomesService.getIncomes(uid);
  }
}
