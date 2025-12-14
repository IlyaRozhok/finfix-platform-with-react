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

  }
}
