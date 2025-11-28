import { Body, Controller, Delete, Get, Post, Req, UseGuards } from "@nestjs/common";
import { IncomesService } from "./incomes.service";
import { ENDPOINTS, ROUTE_SEGMENTS } from "@/shared/router";
import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import {
  CreateEventIncomeDto,
  CreateRegularIncomeDto,
  CreateRegularIncomeResDto,
  EventIncomeResDto,
  ResRegularIncomesDto,
} from "./dto/dto";
import { plainToInstance } from "class-transformer";

@UseGuards(JwtAuthGuard)
@ApiTags("Incomes")
@Controller(ROUTE_SEGMENTS.INCOMES)
export class IncomesController {
  constructor(private readonly incomesService: IncomesService) {}

  @ApiResponse({
    status: 201,
    type: ResRegularIncomesDto,
    isArray: true,
    description: "Regular incomes fetched",
  })
  @ApiOperation({ summary: "Get regular incomes" })
  @Get(ENDPOINTS.INCOMES.FIND_REGULAR)
  async getRegularIncomes(@Req() req) {
    const uid = req.user.sub;
    const incomes = await this.incomesService.findRegularIncomes(uid);
    return plainToInstance(ResRegularIncomesDto, incomes, {
      excludeExtraneousValues: true,
    });
  }

  @ApiResponse({
    status: 201,
    type: CreateRegularIncomeResDto,
    description: "Regular regular income",
  })
  @ApiOperation({ summary: "Create regular income" })
  @Post(ENDPOINTS.INCOMES.REGULAR_CREATE)
  async createRegularIncomes(
    @Req() req,
    @Body() dto: CreateRegularIncomeDto
  ): Promise<CreateRegularIncomeResDto> {
    const userId = req.user.sub;

    const createdRegularIncomes =
      await this.incomesService.createRegularIncomes(userId, dto);

    return plainToInstance(CreateRegularIncomeResDto, createdRegularIncomes, {
      excludeExtraneousValues: true,
    });
  }

  @ApiOperation({ summary: "Create event income" })
  @Post(ENDPOINTS.INCOMES.EVENT_CREATE)
  async createEventIncome(
    @Req() req,
    @Body() dto: CreateEventIncomeDto
  ): Promise<EventIncomeResDto> {
    const userId = req.user.sub;

    const createdEventIncome = await this.incomesService.createEventIncome(
      userId,
      dto
    );

    return plainToInstance(EventIncomeResDto, createdEventIncome, {
      excludeExtraneousValues: true,
    });
  }

  @ApiOperation({ summary: "Get event incomes" })
  @Get(ENDPOINTS.INCOMES.FIND_EVENT)
  async getEventrIncomes(@Req() req) {
    const userId = req.user.sub;
    const eventIncomes = await this.incomesService.findEventIncomes(userId);
    return plainToInstance(ResRegularIncomesDto, eventIncomes, {
      excludeExtraneousValues: true,
    });
  }
  @ApiOperation({ summary: "Get all incomes" })
  @Get(ENDPOINTS.INCOMES.FIND_ALL)
  async getAllIncomes(@Req() req) {
    const userId = req.user.sub;

    const { regular, events } =
      await this.incomesService.findAllIncomes(userId);

    const regularDto = plainToInstance(ResRegularIncomesDto, regular, {
      excludeExtraneousValues: true,
    });

    const eventsDto = plainToInstance(EventIncomeResDto, events, {
      excludeExtraneousValues: true,
    });

    return { regular: regularDto, events: eventsDto };
  }

  @Delete()
  async deleteRegularIncome(@Req() req) {
    const uid = req.user.sub;

    
  }
}
