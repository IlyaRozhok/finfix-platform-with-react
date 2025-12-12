import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from "@nestjs/common";
import { InstallmentsService } from "./installments.service";
import { CreateInstallmentDto, UpdateInstallmentDto } from "./dto";
import { ROUTE_SEGMENTS } from "@/shared/router";
import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@UseGuards(JwtAuthGuard)
@ApiTags("Installments")
@Controller()
export class InstallmentsController {
  constructor(private readonly installmentsService: InstallmentsService) {}
  @ApiOperation({ summary: "Create installments" })
  @Post(`${ROUTE_SEGMENTS.INSTALLMENTS}/create-installments`)
  async createInstallments(@Body() dto: CreateInstallmentDto[]) {
    const installments = await this.installmentsService.createInstallments(dto);
    return installments;
  }

  @ApiOperation({ summary: "Update installment" })
  @ApiResponse({
    status: 202,
    type: UpdateInstallmentDto,
    description: "Installment updated",
  })
  @Put(ROUTE_SEGMENTS.INSTALLMENTS)
  async updateInstallment(
    @Body() dto: UpdateInstallmentDto,
    @Req() req,
    @Param("id") id: string,
  ) {
    const userId = req.user.sub;
    return await this.installmentsService.update(dto, userId, id);
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

  @ApiOperation({ summary: "Delete installment" })
  @ApiResponse({
    status: 204,
    description: "Installment deleted",
  })
  @Delete(`${ROUTE_SEGMENTS.INSTALLMENTS}/:id`)
  async deleteInstallment(@Req() req, @Param("id") id: string) {
    const userId = req.user.sub;
    await this.installmentsService.delete(userId);
  }
}
