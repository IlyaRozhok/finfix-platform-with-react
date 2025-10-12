import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category, CategoryKind } from "./onboarding.entity";
import { User } from "@/users/user.entity";
import { UsersService } from "@/users/users.service";

@Injectable()
export class OnboardingService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly usersService: UsersService
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

  async getSummary(uid: string) {
    const user = await this.usersService.findById(uid);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const resData = {
      currency: user.currency,
      incomes: user.incomes,
      isOnboarded: user.isOnboarded,
    };
    return resData;
  }
}
