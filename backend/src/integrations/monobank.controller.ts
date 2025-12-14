import { Controller, Get } from "@nestjs/common";
import { MonobankService } from './monobank.service';
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("integrations")
@Controller('integrations')
export class MonobankController {
  constructor(private readonly monobankService: MonobankService) {}

  @ApiOperation({summary: "Get monobank data"})
  @Get("monobank")
  syncMonobank() {
    return this.monobankService.syncMonobank();
  }
}
