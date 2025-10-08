import { Controller, Get, UseGuards, Query, Post, Body } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { ROUTE_SEGMENTS, ENDPOINTS } from "../shared/router";
import { categories } from "@/shared/consts";

import { UsersService } from "../users/users.service";
import { UpdateCurrencyDto } from "./update-currency.dto";

@Controller(ROUTE_SEGMENTS.ONBOARDING)
export class OnboardingController {
  constructor(private readonly userService: UsersService) {}

  @Get(ENDPOINTS.ONBOARDING.CATEGORIES)
  async findOnboardingCategories(@Query("uid") uid: string) {
    return categories;
  }

  @Post(ENDPOINTS.ONBOARDING.CURRENCIES)
  async setOnboardingCurrencies(@Body() dto: UpdateCurrencyDto) {
    const updatedUser = await this.userService.updateCurrency(
      dto.uid,
      dto.currency
    );
    return updatedUser;
  }
}
