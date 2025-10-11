import { UsersService } from "@/users/users.service";
import {
  BadRequestException,
  Body,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateRecurringExpenseDto } from "./dto";
import { RecurringExpense } from "./recurring-expense.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class RecurringExpensesService {
  constructor(
    @InjectRepository(RecurringExpense)
    private readonly ReccuringExpensesRepository: Repository<RecurringExpense>
  ) {}

  async updateExpenses(
    dto: CreateRecurringExpenseDto[]
  ): Promise<RecurringExpense[]> {
    if (!dto.length) {
      throw new BadRequestException("Payload did not provided");
    }
    const expenses = this.ReccuringExpensesRepository.create(dto);
    return await this.ReccuringExpensesRepository.save(expenses);
  }
}
