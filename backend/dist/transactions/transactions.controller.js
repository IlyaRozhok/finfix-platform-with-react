"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const create_transaction_dto_1 = require("./create-transaction.dto");
const transactions_service_1 = require("./transactions.service");
const types_1 = require("./types");
let TransactionsController = class TransactionsController {
    constructor(transactionService) {
        this.transactionService = transactionService;
    }
    async create(req, dto) {
        const userId = req.user.sub;
        if (dto.type === types_1.TransactionType.EXPENSE ||
            dto.type === types_1.TransactionType.INCOME) {
            if (dto.installmentId || dto.debtId)
                throw new common_1.BadRequestException("installmentId/debtId not allowed for this type");
        }
        if (dto.type === types_1.TransactionType.INSTALLMENT_PAYMENT &&
            !dto.installmentId) {
            throw new common_1.BadRequestException("installmentId is required for installment_payment");
        }
        if (dto.type === types_1.TransactionType.DEBT_PAYMENT && !dto.debtId) {
            throw new common_1.BadRequestException("debtId is required for debt_payment");
        }
        return this.transactionService.create(userId, dto);
    }
};
exports.TransactionsController = TransactionsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_transaction_dto_1.CreateTransactionDto]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "create", null);
exports.TransactionsController = TransactionsController = __decorate([
    (0, common_1.Controller)("transactions"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [transactions_service_1.TransactionsService])
], TransactionsController);
//# sourceMappingURL=transactions.controller.js.map