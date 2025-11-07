import { Body, Controller, Post } from "@nestjs/common";
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
}
