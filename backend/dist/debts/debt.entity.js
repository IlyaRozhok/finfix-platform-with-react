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
exports.Debt = exports.DebtType = void 0;
const user_entity_1 = require("../users/user.entity");
const typeorm_1 = require("typeorm");
var DebtType;
(function (DebtType) {
    DebtType["LOAN"] = "loan";
    DebtType["CREDIT_CARD"] = "credit_card";
})(DebtType || (exports.DebtType = DebtType = {}));
let Debt = class Debt {
};
exports.Debt = Debt;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Debt.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "user_id", type: "uuid" }),
    __metadata("design:type", String)
], Debt.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (u) => u.debts, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", user_entity_1.User)
], Debt.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Debt.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "debt_type",
        type: "enum",
        enum: DebtType,
        enumName: "debt_type",
    }),
    __metadata("design:type", String)
], Debt.prototype, "debtType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "total_debt", type: "numeric", precision: 14, scale: 2 }),
    __metadata("design:type", String)
], Debt.prototype, "totalDebt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "monthly_payment",
        type: "numeric",
        precision: 14,
        scale: 2,
        nullable: true,
    }),
    __metadata("design:type", String)
], Debt.prototype, "monthlyPayment", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "interest_rate_monthly",
        type: "numeric",
        precision: 6,
        scale: 3,
        nullable: true,
    }),
    __metadata("design:type", String)
], Debt.prototype, "interestRateMonthly", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "grace_period_days", type: "int", nullable: true }),
    __metadata("design:type", Number)
], Debt.prototype, "gracePeriodDays", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ name: "start_date", type: "date" }),
    __metadata("design:type", String)
], Debt.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "statement_day", type: "smallint", nullable: true }),
    __metadata("design:type", Number)
], Debt.prototype, "statementDay", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "due_day", type: "smallint", nullable: true }),
    __metadata("design:type", Number)
], Debt.prototype, "dueDay", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_closed", type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], Debt.prototype, "isClosed", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at", type: "timestamptz" }),
    __metadata("design:type", Date)
], Debt.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at", type: "timestamptz" }),
    __metadata("design:type", Date)
], Debt.prototype, "updatedAt", void 0);
exports.Debt = Debt = __decorate([
    (0, typeorm_1.Entity)("debts"),
    (0, typeorm_1.Index)("idx_debts_user_active", ["userId"], { where: '"is_closed" = false' })
], Debt);
//# sourceMappingURL=debt.entity.js.map