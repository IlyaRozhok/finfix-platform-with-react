import { Controller, Get, UseGuards, Query } from "@nestjs/common";
import { OnboardingService } from "./onboarding.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { ROUTE_SEGMENTS, ENDPOINTS } from "../shared/router";

@UseGuards(JwtAuthGuard)
@Controller(ROUTE_SEGMENTS.ONBOARDING)
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}

  @Get(ENDPOINTS.ONBOARDING.CATEGORIES)
  async findOnboardingCategories(@Query("uid") uid: string) {
    return this.onboardingService.findOnboardingCategories(uid);
  }

  @Get(ENDPOINTS.ONBOARDING.CURRENCIES)
  async findOnboardingCurrencies(@Query("uid") uid: string) {
    return this.onboardingService.findOnboardingCurrencies(uid);
  }
}
