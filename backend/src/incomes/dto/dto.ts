import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Exclude, Expose, Type } from "class-transformer";
import {
  IsDate,
  IsDateString,
  IsInt,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from "class-validator";

export class ResRegularIncomesDto {
  @Expose()
  @ApiProperty({ example: "id" })
  id: string;

  @Expose()
  @ApiProperty({ example: 130000, description: "Amount of income" })
  amount: number;

  @Expose()
  @ApiProperty({
    example: "Salary from IN1",
    description: "Description of income",
  })
  description: string;
}

export class CreateRegularIncomeDto {
  @IsInt()
  @Type(() => Number)
  @Min(1, { message: "Quantity must be a positive integer." })
  @ApiProperty({ example: 100000 })
  amount: number;

  @IsString()
  @MaxLength(50)
  @ApiProperty({
    example: "Salary",
  })
  description: string;
}

@Exclude()
export class CreateRegularIncomeResDto {
  @Expose()
  @ApiProperty({ example: "id" })
  id: string;

  @Expose()
  @ApiProperty({ example: 130000 })
  amount: number;

  @Expose()
  @ApiProperty({
    example: "Salary",
  })
  description: string;
}
@Exclude()
export class EventIncomeResDto {
  @Expose()
  @ApiProperty({ example: "63ve3...", description: "id" })
  id: string;

  @Expose()
  @ApiProperty({ example: 130000 })
  amount: number;

  @Expose()
  @ApiProperty({ example: "Freelance project" })
  description: string;

  @Expose()
  @ApiProperty({
    example: "2025-11-20T10:00:00.000Z",
    description: "Date of income",
  })
  date: Date;
}

export class CreateEventIncomeDto {
  @IsInt()
  @Type(() => Number)
  @Min(1, { message: "Quantity must be a positive integer." })
  @ApiProperty({ example: 100000 })
  amount: number;

  @IsString()
  @MaxLength(50)
  @ApiProperty({
    example: "Sold old iPhone",
  })
  description: string;

  @ApiProperty({
    example: "?",
    description: "Date of incomes",
  })
  @IsDate()
  @Type(() => Date)
  @ApiProperty({
    example: "2025-11-20T10:00:00.000Z",
    description: "Date of income (ISO 8601)",
  })
  date: Date;
}

export class UpdateRegularIncomeDto extends PartialType(
  CreateRegularIncomeDto
) {}
