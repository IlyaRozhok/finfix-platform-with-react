import { ApiProperty } from "@nestjs/swagger";
import {
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from "class-validator";

export class CreateDebtDto {
  @IsUUID()
  @ApiProperty({ example: "4b1c9f5e-..." })
  userId: string;

  @ApiProperty({ example: "147897.09" })
  @IsString()
  totalDebt: string;

  @ApiProperty({
    example: "3.4",
    nullable: true,
    description: "3.4% / month",
  })
  @IsNumberString()
  interest: string;

  @ApiProperty({ example: "Monobank black credit limit" })
  @IsString()
  @IsOptional()
  @Length(0, 200)
  description: string;
}
