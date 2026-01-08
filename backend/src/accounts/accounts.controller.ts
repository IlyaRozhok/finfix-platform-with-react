import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AccountsService } from './accounts.service';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ENDPOINTS, ROUTE_SEGMENTS } from "@/shared/router";
import { AccountsResDto, CreateAccountDto } from "@/accounts/dto";
import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { plainToInstance } from "class-transformer";
@ApiTags("Accounts")
@UseGuards(JwtAuthGuard)
@Controller(ROUTE_SEGMENTS.ACCOUNTS)
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @ApiOperation({ summary: "Create account" })
  @ApiResponse({
    status: 201,
    type: CreateAccountDto,
    description: "Account created",
  })
  @Post(ENDPOINTS.ACCOUNTS.CREATE)
  async createAccount(@Req() req, @Body() dto: CreateAccountDto) {
    const userId = req.user.sub;
    return await this.accountsService.create(dto, userId);
  }

  @ApiOperation({ summary: "Fetch all accounts" })
  @ApiResponse({
    status: 200,
    type: AccountsResDto,
    description: "Accounts fetched",
  })
  @Get()
  async fetchAccounts(@Req() req) {
    const userId = req.user.sub;
    return plainToInstance(AccountsResDto, this.accountsService.findAll(userId), {
      excludeExtraneousValues: true
    });
  }
}
