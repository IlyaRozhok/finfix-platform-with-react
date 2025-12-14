import {
  Body,
  Controller,
  Post,
  UseGuards,
  Req,
  BadRequestException,
} from "@nestjs/common";
import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";

import { CreateTransactionDto } from "./create-transaction.dto";
import { TransactionsService } from "./transactions.service";
import { TransactionType } from "./types";

@Controller("transactions")
@UseGuards(JwtAuthGuard)
export class TransactionsController {
  constructor(private readonly transactionService: TransactionsService) {}

  @Post()
  async create(@Req() req, @Body() dto: CreateTransactionDto) {
    const userId = (req.user as { sub: string }).sub;

  }
}
