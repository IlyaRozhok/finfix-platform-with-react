import { Category } from "./category.entity";
import { Repository } from "typeorm";
export declare class CategoriesService {
    private categoryRepository;
    constructor(categoryRepository: Repository<Category>);
    seedDefaults(userId: string): Promise<void>;
    findOnboardingCategories(uid: string): Promise<Category[]>;
}
