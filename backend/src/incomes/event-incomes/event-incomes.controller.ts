import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { EventIncomesService } from "./event-incomes.service";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ENDPOINTS, ROUTE_SEGMENTS } from "@/shared/router";
import { plainToInstance } from "class-transformer";
import { CreateEventIncomeDto, EventIncomeResDto } from "./dto";
import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@ApiTags("Event Incomes")
@Controller(ROUTE_SEGMENTS.INCOMES)
export class EventIncomesController {
  constructor(private readonly eventIncomesService: EventIncomesService) {}

  @ApiOperation({ summary: "Create event income" })
  @Post(ENDPOINTS.EVENT_INCOMES.CREATE)
  async createEventIncome(
    @Req() req,
    @Body() dto: CreateEventIncomeDto
  ): Promise<EventIncomeResDto> {
    const userId = req.user.sub;

    const createdEventIncome = await this.eventIncomesService.create(
      userId,
      dto
    );

    return plainToInstance(EventIncomeResDto, createdEventIncome, {
      excludeExtraneousValues: true,
    });
  }
  @ApiResponse({
    status: 201,
    type: EventIncomeResDto,
    description: "Created regular income",
  })
  @ApiOperation({ summary: "Get event incomes" })
  @Get(ENDPOINTS.EVENT_INCOMES.GET)
  async getEventIncomes(@Req() req) {
    const userId = req.user.sub;

    console.log("userID", userId);
    const eventIncomes = await this.eventIncomesService.getAll(userId);
    return plainToInstance(EventIncomeResDto, eventIncomes, {
      excludeExtraneousValues: true,
    });
  }

  @HttpCode(204)
  @ApiOperation({ summary: "Delete event income" })
  @ApiParam({ name: "id", type: "string", description: "Income ID (uuid)" })
  @Delete(ENDPOINTS.EVENT_INCOMES.BY_ID)
  async deleteEventIncome(@Req() req, @Param("id") id: string) {
    const userId = req.user.sub;
    await this.eventIncomesService.delete(userId, id);
  }
}
