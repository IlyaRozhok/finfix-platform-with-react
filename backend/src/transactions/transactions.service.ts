import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Transaction } from "@/entities/transaction.entity";
import { validateInvariants } from "@/transactions/lib/validateInvariants";
import { CreateTransactionDto } from "@/transactions/dto";

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  async create(dto: CreateTransactionDto, userId: string) {
    validateInvariants(dto);
    const transaction = this.transactionRepository.create({ ...dto, userId });
    return await this.transactionRepository.save(transaction)
  }
}
