import { CreateTransactionDto } from "./create-transaction.dto";
import { TransactionsService } from "./transactions.service";
export declare class TransactionsController {
    private readonly transactionService;
    constructor(transactionService: TransactionsService);
    create(req: any, dto: CreateTransactionDto): Promise<import("./transaction.entity").Transaction>;
}
