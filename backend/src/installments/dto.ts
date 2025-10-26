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

  @IsBoolean()
  isClosed: boolean;

  @IsString()
  @IsNotEmpty()
  description: string;
}
