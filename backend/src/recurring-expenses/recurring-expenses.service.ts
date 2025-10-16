import { BadRequestException, Injectable } from "@nestjs/common";
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

  async getExpenses(uid: string) {
    console.log("uid", uid);
    // if (!uid) {
    //   throw new BadRequestException("User id not provided");
    // }
    const expenses = await this.ReccuringExpensesRepository.find({
      where: {
        userId: uid,
      },
    });

    return expenses;
  }
}
