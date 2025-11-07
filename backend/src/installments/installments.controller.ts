import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { InstallmentsService } from "./installments.service";
import { CreateInstallmentDto } from "./dto";
import { ENDPOINTS, ROUTE_SEGMENTS } from "@/shared/router";

@Controller(ROUTE_SEGMENTS.ONBOARDING)
export class InstallmentsController {
  constructor(private readonly installmentsService: InstallmentsService) {}

  @Post(ENDPOINTS.ONBOARDING.INSTALLMENTS)
  async createInstallment(@Body() dtos: CreateInstallmentDto[]) {
    console.log("dtos", dtos);
    const installments = await this.installmentsService.createInstallment(dtos);
    return installments;
  }

  @Get(`${ENDPOINTS.ONBOARDING.INSTALLMENTS}/:uid`)
  async getInstallments(@Param("uid") uid: string) {
    const installments = await this.installmentsService.getInstallments(uid);
    return installments;
  }
}
