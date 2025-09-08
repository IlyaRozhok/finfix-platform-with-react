import { Repository } from "typeorm";
import { Transaction } from "./transaction.entity";
import { CreateTransactionDto } from "./create-transaction.dto";
export declare class TransactionsService {
    private repo;
    constructor(repo: Repository<Transaction>);
    create(userId: string, dto: CreateTransactionDto): Promise<Transaction>;
}
