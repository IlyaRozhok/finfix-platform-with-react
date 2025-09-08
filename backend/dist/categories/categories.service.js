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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const category_entity_1 = require("./category.entity");
const typeorm_2 = require("typeorm");
let CategoriesService = class CategoriesService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async seedDefaults(userId) {
        const exists = await this.categoryRepository.count({ where: { userId } });
        if (exists)
            return;
        const categories = [
            { userId, kind: category_entity_1.CategoryKind.EXPENSE, name: "House", isSystem: true },
            {
                userId,
                kind: category_entity_1.CategoryKind.EXPENSE,
                name: "Food & Drinks",
                isSystem: true,
            },
            { userId, kind: category_entity_1.CategoryKind.EXPENSE, name: "Transport", isSystem: true },
            {
                userId,
                kind: category_entity_1.CategoryKind.EXPENSE,
                name: "Restaurant",
                isSystem: true,
            },
            {
                userId,
                kind: category_entity_1.CategoryKind.EXPENSE,
                name: "Coffee or snacks",
                isSystem: true,
            },
            { userId, kind: category_entity_1.CategoryKind.EXPENSE, name: "Sport", isSystem: true },
            { userId, kind: category_entity_1.CategoryKind.EXPENSE, name: "Health", isSystem: true },
            {
                userId,
                kind: category_entity_1.CategoryKind.EXPENSE,
                name: "Personal Care",
                isSystem: true,
            },
            { userId, kind: category_entity_1.CategoryKind.EXPENSE, name: "Cinema", isSystem: true },
            { userId, kind: category_entity_1.CategoryKind.EXPENSE, name: "Gifts", isSystem: true },
            {
                userId,
                kind: category_entity_1.CategoryKind.EXPENSE,
                name: "Telecommunication",
                isSystem: true,
            },
            {
                userId,
                kind: category_entity_1.CategoryKind.EXPENSE,
                name: "Emergency fund",
                isSystem: true,
            },
            { userId, kind: category_entity_1.CategoryKind.EXPENSE, name: "Family", isSystem: true },
            { userId, kind: category_entity_1.CategoryKind.INCOME, name: "Salary", isSystem: true },
            { userId, kind: category_entity_1.CategoryKind.INCOME, name: "Freelance", isSystem: true },
        ];
        await this.categoryRepository.save(categories);
    }
    async findOnboardingCategories(uid) {
        return await this.categoryRepository.find({
            select: { id: true, name: true },
            where: {
                kind: category_entity_1.CategoryKind.EXPENSE,
                userId: uid,
            },
            order: {
                name: "ASC",
            },
        });
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map