import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./onboarding.entity";
import { OnboardingService } from "./onboarding.service";
import { OnboardingController } from "./onboarding.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [OnboardingController],
  providers: [OnboardingService],
  exports: [OnboardingService],
})
export class CategoriesModule {}
