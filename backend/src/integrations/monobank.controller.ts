import { Controller, Get, Param, Req } from "@nestjs/common";
import { MonobankService } from './monobank.service';
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("integrations")
@Controller('integrations')
export class MonobankController {
  constructor(private readonly monobankService: MonobankService) {}

  @ApiOperation({summary: "Get client info"})
  @Get("monobank/client-info")
  syncMonobank() {
    return this.monobankService.getClientInfo();
  }

  @ApiOperation({summary: "Get transactions"})
  @Get("monobank/transactions")
  getTransactions(@Param("from") from: string, @Param("to") to: string, @Param("accountId") accountId: string, @Req() req) {
    console.log(req)
    return this.monobankService.getTransactions(from, to, accountId)
  }

}
