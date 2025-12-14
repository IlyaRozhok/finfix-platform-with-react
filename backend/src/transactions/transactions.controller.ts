import {
  Body,
  Controller,
  Post,
  UseGuards,
  Req,
  BadRequestException,
} from "@nestjs/common";
import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { TransactionsService } from "./transactions.service";
import { CreateTransactionDto } from "@/transactions/dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Transactions")
@Controller("transactions")
@UseGuards(JwtAuthGuard)
export class TransactionsController {
  constructor(private readonly transactionService: TransactionsService) {}

  @ApiOperation({ summary: "Create transaction" })
  @ApiResponse({
    status: 201,
    type: CreateTransactionDto,
    description: "Transaction created",
  })
  @Post()
  async create(@Req() req, @Body() dto: CreateTransactionDto) {
    const userId = req.user.sub;
    return await this.transactionService.create(dto, userId);
  }
}
