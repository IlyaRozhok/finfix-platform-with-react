import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { StatsService } from "./stats.service";
import { ENDPOINTS } from "@/shared/router";
import { ROUTE_SEGMENTS } from "@/shared/router";
import { ResOverviewDto } from "./dto";
import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@UseGuards(JwtAuthGuard)
@ApiTags("Statistics")
@Controller(ROUTE_SEGMENTS.STATS)
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get(ENDPOINTS.STATS.OVERVIEW)
  @ApiOperation({ summary: "Get user financial overview" })
  @ApiResponse({
    status: 204,
    description: "Overview statistics returned successfully",
    type: ResOverviewDto,
  })
  async getOverview(@Req() req) {
    const uid = req.user.sub;
    return this.statsService.getOverview({ uid });
  }

  @ApiOperation({ summary: "Get all incomes" })
  @Get(ENDPOINTS.STATS.INCOMES)
  async getAllIncomes(@Req() req) {
    const userId = req.user.sub;
    return await this.statsService.findAllIncomes(userId);
  }
}
