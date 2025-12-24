import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class ClientInfoRespDto {

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  accounts: [
    {
      id: string;
      currencyCode: number;
      balance: number;
      creditLimit: number;
      maskedPan: [],
      type: string;
      iban: string;
    }
    ]

}

