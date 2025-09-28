import { Controller, Get, UseGuards, Query } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { ROUTE_SEGMENTS, ENDPOINTS } from "../shared/router";
import { categories } from "@/shared/consts";

// @UseGuards(JwtAuthGuard)
@Controller(ROUTE_SEGMENTS.ONBOARDING)
export class OnboardingController {
  @Get(ENDPOINTS.ONBOARDING.CATEGORIES)
  async findOnboardingCategories(@Query("uid") uid: string) {
    return categories;
  }

  @Get(ENDPOINTS.ONBOARDING.CURRENCIES)
  async findOnboardingCurrencies(@Query("uid") uid: string) {
    // return this.onboardingService.findOnboardingCurrencies(uid);
  }
}
