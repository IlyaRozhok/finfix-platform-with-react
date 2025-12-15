import {
  Body,
  Controller,
  Post,
  UseGuards,
  Req,
  BadRequestException,
  Get,
} from "@nestjs/common";
import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { TransactionsService } from "./transactions.service";
import { CreateTransactionDto, TransactionsResDto } from "@/transactions/dto";
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

  @ApiOperation({ summary: "Get transactions" })
  @ApiResponse({
    status: 200,
    type: TransactionsResDto,
    description: "Transaction created",
  })
  @Get()
  async getTransactions(@Req() req) {
    const userId = req.user.sub;
    const transactions = await this.transactionService.getTransactions(userId);
    return 
  }
}
