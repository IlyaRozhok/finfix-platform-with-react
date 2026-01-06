import {
  IsString,
  IsEnum,
  MinLength,
  MaxLength,
  IsOptional,
  IsIn,
  IsNotEmpty,
  ValidateIf,
} from "class-validator";
import { AccountAssetType, AccountProvider, AccountType } from "@/shared/enums";

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

  @IsString()
  @IsOptional()
  @MaxLength(100)
  description?: string;

  @IsEnum(AccountType)
  type: AccountType;

  @IsEnum(AccountAssetType)
  assetType: AccountAssetType;

  @IsString()
  @IsNotEmpty()
  @MaxLength(16)
  @ValidateIf((o: CreateAccountDto) => o.assetType === AccountAssetType.FIAT)
  @IsIn(ALLOWED_CURRENCIES)
  @ValidateIf((o: CreateAccountDto) => o.assetType === AccountAssetType.CRYPTO)
  @IsIn(ALLOWED_CRYPTO_COINS)
  assetCode: string;

  @IsEnum(AccountProvider)
  provider: AccountProvider;

  @ValidateIf((o) => o.provider !== AccountProvider.MANUAL)
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  externalId?: string;
}