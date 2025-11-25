import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTransactionDto } from "./create-transaction.dto";
import { Transaction } from "@/entities/transaction.entity";

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction) private repo: Repository<Transaction>
  ) {}

  async create(userId: string, dto: CreateTransactionDto) {
    const entity = this.repo.create({
      userId,
      type: dto.type,
      amount: dto.amount.toFixed(2),
      occurredAt: new Date(dto.occurredAt),
      categoryId: dto.categoryId ?? null,
      installmentId: dto.installmentId ?? null,
      debtId: dto.debtId ?? null,
      note: dto.note ?? null,
    });
    return this.repo.save(entity);
  }
}
