import {
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from "class-validator";

export class CreateRecurringExpenseDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsUUID() userId: string;

  @IsUUID()
  categoryId: string;

  @IsNumberString()
  amount: string;

  @IsString()
  @IsOptional()
  @Length(0, 200)
  description?: string;
}
