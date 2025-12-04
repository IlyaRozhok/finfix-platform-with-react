import { Body, Controller, Delete, Get, HttpCode, Param, Post, Req } from '@nestjs/common';
import { EventIncomesService } from './event-incomes.service';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { ENDPOINTS } from '@/shared/router';
import { plainToInstance } from 'class-transformer';
import { CreateEventIncomeDto, EventIncomeResDto } from './dto';
import { ResRegularIncomesDto } from '../regular-incomes/dto';

@Controller('event-incomes')
export class EventIncomesController {
  constructor(private readonly eventIncomesService: EventIncomesService) {}

  @ApiOperation({ summary: "Create event income" })
  @Post(ENDPOINTS.REGULAR_INCOMES.CREATE)
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

  @ApiOperation({ summary: "Get event incomes" })
  @Get(ENDPOINTS.REGULAR_INCOMES.GET)
  async getEventIncomes(@Req() req) {
    const userId = req.user.sub;
    const eventIncomes = await this.eventIncomesService.getAll(userId);
    return plainToInstance(ResRegularIncomesDto, eventIncomes, {
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
