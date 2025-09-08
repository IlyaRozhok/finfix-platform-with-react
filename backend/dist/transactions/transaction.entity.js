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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const typeorm_1 = require("typeorm");
const category_entity_1 = require("../categories/category.entity");
const installment_entity_1 = require("../installments/installment.entity");
const debt_entity_1 = require("../debts/debt.entity");
const user_entity_1 = require("../users/user.entity");
const types_1 = require("./types");
const decimal_transformer_1 = require("../shared/decimal.transformer");
let Transaction = class Transaction {
};
exports.Transaction = Transaction;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Transaction.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "user_id", type: "uuid" }),
    __metadata("design:type", String)
], Transaction.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (u) => u.transactions, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", user_entity_1.User)
], Transaction.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: types_1.TransactionType, enumName: "transaction_type" }),
    __metadata("design:type", String)
], Transaction.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "category_id", type: "uuid", nullable: true }),
    __metadata("design:type", String)
], Transaction.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category, { nullable: true, onDelete: "SET NULL" }),
    (0, typeorm_1.JoinColumn)({ name: "category_id" }),
    __metadata("design:type", category_entity_1.Category)
], Transaction.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "installment_id", type: "uuid", nullable: true }),
    __metadata("design:type", String)
], Transaction.prototype, "installmentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => installment_entity_1.Installment, { nullable: true, onDelete: "SET NULL" }),
    (0, typeorm_1.JoinColumn)({ name: "installment_id" }),
    __metadata("design:type", installment_entity_1.Installment)
], Transaction.prototype, "installment", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "debt_id", type: "uuid", nullable: true }),
    __metadata("design:type", String)
], Transaction.prototype, "debtId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => debt_entity_1.Debt, { nullable: true, onDelete: "SET NULL" }),
    (0, typeorm_1.JoinColumn)({ name: "debt_id" }),
    __metadata("design:type", debt_entity_1.Debt)
], Transaction.prototype, "debt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "numeric",
        precision: 14,
        scale: 2,
        transformer: decimal_transformer_1.DecimalTransformer,
    }),
    __metadata("design:type", String)
], Transaction.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ name: "occurred_at", type: "timestamptz" }),
    __metadata("design:type", Date)
], Transaction.prototype, "occurredAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Transaction.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at", type: "timestamptz" }),
    __metadata("design:type", Date)
], Transaction.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at", type: "timestamptz" }),
    __metadata("design:type", Date)
], Transaction.prototype, "updatedAt", void 0);
exports.Transaction = Transaction = __decorate([
    (0, typeorm_1.Entity)("transactions")
], Transaction);
//# sourceMappingURL=transaction.entity.js.map