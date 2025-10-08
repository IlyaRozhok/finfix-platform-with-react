import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OnboardingController } from "./onboarding.controller";
import { OnboardingService } from "./onboarding.service";
import { Category } from "./onboarding.entity";
import { UsersModule } from "@/users/users.module";

@Module({
  imports: [TypeOrmModule.forFeature([Category]), UsersModule],
  controllers: [OnboardingController],
  providers: [OnboardingService],
  exports: [OnboardingService],
})
export class CategoriesModule {}
