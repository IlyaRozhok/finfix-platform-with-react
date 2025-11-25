import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { IncomesService } from "./incomes.service";
import { ENDPOINTS, ROUTE_SEGMENTS } from "@/shared/router";
import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ResRegularIncomesDto } from "./dto";

@UseGuards(JwtAuthGuard)
@ApiTags("Incomes")
@Controller(ROUTE_SEGMENTS.STATS)
export class IncomesController {
  constructor(private readonly incomesService: IncomesService) {}

  @ApiResponse({
    status: 200,
    type: ResRegularIncomesDto,
    isArray: true,
    description: "Get regular incomes",
  })
  @ApiOperation({ summary: "Get regular incomes" })
  @Get(ENDPOINTS.STATS.REGULAR_INCOMES)
  async getRegularIncomes(@Req() req) {
    const { uid } = req.user.sub;
    return await this.incomesService.getRegularIncomes(uid);
  }

  @ApiOperation({ summary: "Get event incomes" })
  @Get(ENDPOINTS.STATS.EVENT_INCOMES)
  async getEventrIncomes(@Req() req) {
    const { uid } = req.user.sub;
    return await this.incomesService.getEventIncomes(uid);
  }
}
