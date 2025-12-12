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
import { ApiProperty } from "@nestjs/swagger";

export class CreateInstallmentDto {
  @IsOptional()
  @IsUUID()
  @IsOptional()
  id?: string;

  @ApiProperty({
    description: "Date of start an installment",
    example: "6b277f4d-f0a5-4954-9976-f88bc97f8e96",
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: "Date of start an installment",
    example: "2025-07-01T19:08:37.000Z",
  })
  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @ApiProperty({ description: "Total amount of installment", example: 20000 })
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  totalAmount: number;

  @ApiProperty({ description: "Total number of payments", example: 6 })
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  totalPayments: number;

  @ApiProperty({ example: "iPhone 17 Pro", description: "Description" })
  @IsString()
  @IsNotEmpty()
  description: string;
}

export class UpdateInstallmentDto {
  @ApiProperty({
    description: "Date of start an installment",
    example: "2025-07-01T19:08:37.000Z",
  })
  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @ApiProperty({ description: "Total amount of installment", example: 20000 })
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  totalAmount: number;

  @ApiProperty({ description: "Total number of payments", example: 6 })
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  totalPayments: number;

  @ApiProperty({ example: "iPhone 17 Pro", description: "Description" })
  @IsString()
  @IsNotEmpty()
  description: string;
}
