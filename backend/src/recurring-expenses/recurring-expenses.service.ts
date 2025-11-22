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

    const userId = dto[0]?.userId;
    if (!userId) {
      throw new BadRequestException("User ID is required");
    }

    const results: RecurringExpense[] = [];

    for (const expenseDto of dto) {
      if (expenseDto.id) {
        const existingExpense = await this.ReccuringExpensesRepository.findOne({
          where: { id: expenseDto.id, userId },
        });

        if (existingExpense) {
          existingExpense.categoryId = expenseDto.categoryId;
          existingExpense.amount = expenseDto.amount;
          existingExpense.description = expenseDto.description || "";
          results.push(
            await this.ReccuringExpensesRepository.save(existingExpense)
          );
        } else {
          const newExpense =
            this.ReccuringExpensesRepository.create(expenseDto);
          results.push(await this.ReccuringExpensesRepository.save(newExpense));
        }
      } else {
        const newExpense = this.ReccuringExpensesRepository.create(expenseDto);
        results.push(await this.ReccuringExpensesRepository.save(newExpense));
      }
    }

    return results;
  }

  async getExpenses(uid: string) {
    if (!uid) {
      throw new BadRequestException("User id not provided");
    }
    const expenses = await this.ReccuringExpensesRepository.find({
      where: {
        userId: uid,
      },
      relations: ["category"],
    });

    return expenses;
  }

  async deleteExpense(expenseId: string) {
    const expenses = await this.ReccuringExpensesRepository.delete({
      id: expenseId,
    });

    return expenses;
  }
}
