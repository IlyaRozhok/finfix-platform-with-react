import {
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from "class-validator";

export class CreateDebtDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsUUID()
  userId: string;

  @IsString()
  totalDebt: string;

  @IsNumberString()
  interest: string;

  @IsString()
  @IsOptional()
  @Length(0, 200)
  description: string;
}
