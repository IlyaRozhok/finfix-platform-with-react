import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category, CategoryKind } from "./onboarding.entity";

@Injectable()
export class OnboardingService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ) {}

  // async findOnboardingCategories(uid: string) {
  //   return await this.categoryRepository.find({
  //     select: { id: true, name: true },
  //     where: {
  //       // kind: CategoryKind.EXPENSE,
  //       userId: uid,
  //     },
  //     order: {
  //       name: "ASC",
  //     },
  //   });
  // }

  // async findOnboardingCurrencies(uid: string) {
  //   return await this.categoryRepository.find({
  //     select: { id: true, name: true },
  //     where: {
  //       kind: CategoryKind.EXPENSE,
  //       userId: uid,
  //     },
  //     order: {
  //       name: "ASC",
  //     },
  //   });
  // }

  async setCategories(dto: Category[]) {
    const categories = this.categoryRepository.create(dto);
    return await this.categoryRepository.save(categories);
  }

  async getCategories() {
    const categories = await this.categoryRepository.find();
    return categories;
  }
}
