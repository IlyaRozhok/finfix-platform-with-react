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
exports.Installment = void 0;
const user_entity_1 = require("../users/user.entity");
const typeorm_1 = require("typeorm");
let Installment = class Installment {
};
exports.Installment = Installment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Installment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "user_id", type: "uuid" }),
    __metadata("design:type", String)
], Installment.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (u) => u.installments, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", user_entity_1.User)
], Installment.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Installment.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ name: "start_date", type: "date" }),
    __metadata("design:type", String)
], Installment.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "total_amount", type: "numeric", precision: 14, scale: 2 }),
    __metadata("design:type", String)
], Installment.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "monthly_payment", type: "numeric", precision: 14, scale: 2 }),
    __metadata("design:type", String)
], Installment.prototype, "monthlyPayment", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "total_payments", type: "int" }),
    __metadata("design:type", Number)
], Installment.prototype, "totalPayments", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_closed", type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], Installment.prototype, "isClosed", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at", type: "timestamptz" }),
    __metadata("design:type", Date)
], Installment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at", type: "timestamptz" }),
    __metadata("design:type", Date)
], Installment.prototype, "updatedAt", void 0);
exports.Installment = Installment = __decorate([
    (0, typeorm_1.Entity)("installments")
], Installment);
//# sourceMappingURL=installment.entity.js.map