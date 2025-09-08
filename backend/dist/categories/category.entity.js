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
exports.Category = exports.CategoryKind = void 0;
const user_entity_1 = require("../users/user.entity");
const typeorm_1 = require("typeorm");
var CategoryKind;
(function (CategoryKind) {
    CategoryKind["EXPENSE"] = "expense";
    CategoryKind["INCOME"] = "income";
})(CategoryKind || (exports.CategoryKind = CategoryKind = {}));
let Category = class Category {
};
exports.Category = Category;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Category.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "user_id", type: "uuid" }),
    __metadata("design:type", String)
], Category.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (u) => u.categories, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", user_entity_1.User)
], Category.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: CategoryKind, enumName: "category_kind" }),
    __metadata("design:type", String)
], Category.prototype, "kind", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ length: 64 }),
    __metadata("design:type", String)
], Category.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_system", type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], Category.prototype, "isSystem", void 0);
exports.Category = Category = __decorate([
    (0, typeorm_1.Entity)("categories"),
    (0, typeorm_1.Unique)("uq_categories_user_kind_name", ["userId", "kind", "name"])
], Category);
//# sourceMappingURL=category.entity.js.map