import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { InstallmentsService } from "./installments.service";
import { CreateInstallmentDto } from "./dto";
import { ENDPOINTS, ROUTE_SEGMENTS } from "@/shared/router";
import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { ApiTags } from "@nestjs/swagger";

@UseGuards(JwtAuthGuard)
@ApiTags("Installments")
@Controller(ROUTE_SEGMENTS.INSTALLMENTS)
export class InstallmentsController {
  constructor(private readonly installmentsService: InstallmentsService) {}

  @Post(ENDPOINTS.INSTALLMENTS.CREATE)
  async createInstallment(@Body() dtos: CreateInstallmentDto[]) {
    console.log("dtos", dtos);
    const installments = await this.installmentsService.createInstallment(dtos);
    return installments;
  }

  @Get(`${ENDPOINTS.INSTALLMENTS.GET}/:uid`)
  async getInstallments(@Req() req) {
    const uid = req.user.sub;
    const installments = await this.installmentsService.getInstallments(uid);
    return installments;
  }
}
