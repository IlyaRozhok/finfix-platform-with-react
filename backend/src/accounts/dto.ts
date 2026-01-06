import {
  IsString,
  IsEnum,
  MinLength,
  MaxLength,
  IsOptional,
  IsIn,
} from "class-validator";
import { AccountType } from "@/shared/enums";

const ALLOWED_CURRENCIES = ["UAH", "USD", "EUR", "GBP"] as const;
const ALLOWED_CRYPTO_COINS = [
  "USDT",
  "USDC",
  "BTC",
  "ETH",
  "SOL",
  "BNB",
  "XRP",
] as const;

export class CreateAccountDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @IsEnum(AccountType)
  type: AccountType;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  description?: string;

  @IsIn(ALLOWED_CURRENCIES)
  @IsOptional()
  currency: string;

  @IsIn(ALLOWED_CRYPTO_COINS)
  @IsOptional()
  cryptoCoin: string;

}