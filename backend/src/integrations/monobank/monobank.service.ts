import { Injectable } from '@nestjs/common';
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { firstValueFrom } from "rxjs";

@Injectable()
export class MonobankService {
  private baseUrl: string;
  private token: string;
  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
  ) {
    this.baseUrl = config.getOrThrow("MONOBANK_URL");
    this.token = config.getOrThrow("MONOBANK_TOKEN");
  }

  async getClientInfo() {
    const res = await firstValueFrom(
      this.httpService.get(this.baseUrl, {
        headers: {
          "X-Token": this.token
        }
      })
    )
    return res.data
  }

  async getTransactions(from: string, to: string, accountId: string) {
    const res = await firstValueFrom(
      this.httpService.get(
        `https://api.monobank.ua/personal/statement/${accountId}/${from}/${to}`,
        {
          headers: {
            "X-Token": this.token,
          },
        },
      ),
    );

    console.log("RESPONSE!!!", res)
    return res.data
  }
}
