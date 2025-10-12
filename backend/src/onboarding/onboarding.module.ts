import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OnboardingController } from "./onboarding.controller";
import { OnboardingService } from "./onboarding.service";
import { Category } from "./onboarding.entity";
import { UsersModule } from "@/users/users.module";
import { User } from "@/users/user.entity";
import { UsersService } from "@/users/users.service";

@Module({
  imports: [TypeOrmModule.forFeature([Category, User]), UsersModule],
  controllers: [OnboardingController],
  providers: [OnboardingService, UsersService],
  exports: [OnboardingService],
})
export class CategoriesModule {}
