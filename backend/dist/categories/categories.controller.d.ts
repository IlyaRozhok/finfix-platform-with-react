import { CategoriesService } from "./categories.service";
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    findOnboardingCategories(uid: string): Promise<import("./category.entity").Category[]>;
}
