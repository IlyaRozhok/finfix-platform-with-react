import { ApiProperty } from "@nestjs/swagger";

export class ResRegularIncomesDto {
  @ApiProperty({ example: "uuid" })
  id: string;

  @ApiProperty({ example: 130000, description: "Amount of income" })
  amount: number;

  @ApiProperty({
    example: "Salary from IN1",
    description: "Description of income",
  })
  description: string;

  @ApiProperty({ example: "uuid", description: "User id" })
  userId: string;

  @ApiProperty({
    example: "2025-11-25T22:09:22.969Z",
    description: "createdAt",
  })
  createdAt: string;

  @ApiProperty({
    example: "2025-11-25T22:09:22.969Z",
    description: "updatedAt",
  })
  updatedAt: string;
}
