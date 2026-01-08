import { Controller, Get, Param, Req } from "@nestjs/common";
import { MonobankService } from "./monobank.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ClientInfoRespDto } from "@/integrations/monobank/dto";

@ApiTags("integrations")
@Controller("integrations")
export class MonobankController {
  constructor(private readonly monobankService: MonobankService) {}

  @ApiResponse({
    status: 200,
    type: ClientInfoRespDto,
    description: "Monobank client info fetched",
  })
  @ApiOperation({ summary: "Get client info" })
  @Get("monobank/client-info")
  async syncMonobank() {
    return await this.monobankService.getClientInfo();
  }

  @ApiOperation({ summary: "Get transactions" })
  @Get("monobank/transactions")
  getTransactions(
    @Param("from") from: string,
    @Param("to") to: string,
    @Param("accountId") accountId: string,
    @Req() req
  ) {
    return this.monobankService.getTransactions(from, to, accountId);
  }
}
