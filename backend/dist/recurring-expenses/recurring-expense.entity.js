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
exports.RecurringExpense = void 0;
const typeorm_1 = require("typeorm");
const category_entity_1 = require("../categories/category.entity");
const user_entity_1 = require("../users/user.entity");
let RecurringExpense = class RecurringExpense {
};
exports.RecurringExpense = RecurringExpense;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], RecurringExpense.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "user_id", type: "uuid" }),
    __metadata("design:type", String)
], RecurringExpense.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (u) => u.recurringExpenses, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", user_entity_1.User)
], RecurringExpense.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "category_id", type: "uuid" }),
    __metadata("design:type", String)
], RecurringExpense.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category, { onDelete: "RESTRICT" }),
    (0, typeorm_1.JoinColumn)({ name: "category_id" }),
    __metadata("design:type", category_entity_1.Category)
], RecurringExpense.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], RecurringExpense.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "numeric", precision: 14, scale: 2 }),
    __metadata("design:type", String)
], RecurringExpense.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_mandatory", type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], RecurringExpense.prototype, "isMandatory", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ name: "start_date", type: "date" }),
    __metadata("design:type", String)
], RecurringExpense.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "end_date", type: "date", nullable: true }),
    __metadata("design:type", String)
], RecurringExpense.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at", type: "timestamptz" }),
    __metadata("design:type", Date)
], RecurringExpense.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at", type: "timestamptz" }),
    __metadata("design:type", Date)
], RecurringExpense.prototype, "updatedAt", void 0);
exports.RecurringExpense = RecurringExpense = __decorate([
    (0, typeorm_1.Entity)("recurring_expense")
], RecurringExpense);
//# sourceMappingURL=recurring-expense.entity.js.map