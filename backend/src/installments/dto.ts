import {
  IsUUID,
  IsDateString,
  IsInt,
  IsBoolean,
  IsNotEmpty,
  IsString,
  Min,
  IsOptional,
} from "class-validator";
import { Transform } from "class-transformer";

export class CreateInstallmentDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  totalAmount: number;

  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  totalPayments: number;

  @IsString()
  status: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
