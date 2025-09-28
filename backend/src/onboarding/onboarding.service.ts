import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category, CategoryKind } from "./onboarding.entity";
import { Repository } from "typeorm";

@Injectable()
export class OnboardingService {
  constructor(
    @InjectRepository(Category)
    private onboardingRepository: Repository<Category>
  ) {}

  async findOnboardingCategories(uid: string) {
    return await this.onboardingRepository.find({
      select: { id: true, name: true },
      where: {
        kind: CategoryKind.EXPENSE,
        userId: uid,
      },
      order: {
        name: "ASC",
      },
    });
  }

  async findOnboardingCurrencies(uid: string) {
    return await this.onboardingRepository.find({
      select: { id: true, name: true },
      where: {
        kind: CategoryKind.EXPENSE,
        userId: uid,
      },
      order: {
        name: "ASC",
      },
    });
  }
}