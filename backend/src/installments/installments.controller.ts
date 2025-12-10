import {Body, Controller, Delete, Get, Param, Post, Req, UseGuards} from "@nestjs/common";
import { InstallmentsService } from "./installments.service";
import { CreateInstallmentDto } from "./dto";
import { ROUTE_SEGMENTS } from "@/shared/router";
import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@UseGuards(JwtAuthGuard)
@ApiTags("Installments")
@Controller()
export class InstallmentsController {
  constructor(private readonly installmentsService: InstallmentsService) {}

  @Post(`${ROUTE_SEGMENTS.INSTALLMENTS}/create-installments`)
  async createInstallments(@Body() dto: CreateInstallmentDto[]) {
    const installments = await this.installmentsService.createInstallments(dto);
    return installments;
  }

  @Get(ROUTE_SEGMENTS.INSTALLMENTS)
  async getInstallments(@Req() req) {
    const uid = req.user.sub;
    const installments = await this.installmentsService.findAll(uid);
    return installments;
  }

  @ApiBody({ type: CreateInstallmentDto })
  @ApiResponse({
    status: 201,
    type: CreateInstallmentDto,
    description: "Installment created",
  })
  @ApiOperation({ summary: "Create installment" })
  @Post(`${ROUTE_SEGMENTS.INSTALLMENTS}/create`)
  async createInstallment(@Body() dto: CreateInstallmentDto) {
    const installment = await this.installmentsService.createInstallment(dto);
    return installment;
  }

  @ApiOperation({ summary: "Delete installment"})
  @Delete(`${ROUTE_SEGMENTS.INSTALLMENTS}/:id`)
  async deleteInstallment(@Req() req,@Param("id") id: string) {

  const userId = req.user.sub;
  await this.installmentsService.delete(userId)
  }
}
