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
exports.User = void 0;
const category_entity_1 = require("../categories/category.entity");
const debt_entity_1 = require("../debts/debt.entity");
const installment_entity_1 = require("../installments/installment.entity");
const recurring_expense_entity_1 = require("../recurring-expenses/recurring-expense.entity");
const recurring_income_entity_1 = require("../recurring-incomes/recurring-income.entity");
const transaction_entity_1 = require("../transactions/transaction.entity");
const typeorm_1 = require("typeorm");
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, length: 255 }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "google_sub", unique: true, type: "text" }),
    __metadata("design:type", String)
], User.prototype, "googleSub", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "user_name", length: 150 }),
    __metadata("design:type", String)
], User.prototype, "userName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "avatar_url", type: "text", nullable: true }),
    __metadata("design:type", String)
], User.prototype, "avatarUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_onboarded", type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isOnboarded", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "currency", type: "char", length: 3, default: "UAH" }),
    __metadata("design:type", String)
], User.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at", type: "timestamptz" }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at", type: "timestamptz" }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => category_entity_1.Category, (c) => c.user),
    __metadata("design:type", Array)
], User.prototype, "categories", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => recurring_expense_entity_1.RecurringExpense, (e) => e.user),
    __metadata("design:type", Array)
], User.prototype, "recurringExpenses", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => recurring_income_entity_1.RecurringIncome, (i) => i.user),
    __metadata("design:type", Array)
], User.prototype, "recurringIncomes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => installment_entity_1.Installment, (i) => i.user),
    __metadata("design:type", Array)
], User.prototype, "installments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => debt_entity_1.Debt, (d) => d.user),
    __metadata("design:type", Array)
], User.prototype, "debts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => transaction_entity_1.Transaction, (t) => t.user),
    __metadata("design:type", Array)
], User.prototype, "transactions", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)("users")
], User);
//# sourceMappingURL=user.entity.js.map