import { Module } from "@nestjs/common";
import { InstallmentsService } from "./installments.service";
import { InstallmentsController } from "./installments.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Installment } from "./installment.entity";
import { OnboadingModule } from "@/onboarding/onboarding.module";
import { Category } from "@/onboarding/onboarding.entity";
import { OnboardingService } from "@/onboarding/onboarding.service";

@Module({
  imports: [TypeOrmModule.forFeature([Installment, Category]), OnboadingModule],
  controllers: [InstallmentsController],
  providers: [InstallmentsService, OnboardingService],
})
export class InstallmentsModule {}
