import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from "@nestjs/common";

import { ENDPOINTS, ROUTE_SEGMENTS } from "@/shared/router";
import { DebtsService } from "./debt.service";
import { CreateDebtDto } from "./dto";
import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";

@UseGuards(JwtAuthGuard)
@ApiTags("Debts")
@Controller(ROUTE_SEGMENTS.ONBOARDING)
export class DebtsController {
  constructor(private readonly DebtsService: DebtsService) {}

  @Get(`${ENDPOINTS.ONBOARDING.DEBTS}`)
  async getOnboardingDebts(@Req() req) {
    const uid = req.user.sub;
    const debts = await this.DebtsService.findAll(uid);
    return debts;
  }

  @ApiOperation({ summary: "Create debts" })
  @ApiBody({ type: [CreateDebtDto] })
  @Post(ENDPOINTS.ONBOARDING.DEBTS)
  async createDebt(@Body() dto: CreateDebtDto[]) {
    const debts = await this.DebtsService.create(dto);
    return debts;
  }

  @Put(`${ENDPOINTS.ONBOARDING.DEBTS}/:id`)
  async updateDebt(@Param("id") id: string, @Body() dto: CreateDebtDto) {
    const debt = await this.DebtsService.update(id, dto);
    return debt;
  }

  @Delete(`${ENDPOINTS.ONBOARDING.DEBTS}/:id`)
  async deleteDebt(@Req() id: string) {
    const debt = await this.DebtsService.delete(id);
    return debt;
  }
}
