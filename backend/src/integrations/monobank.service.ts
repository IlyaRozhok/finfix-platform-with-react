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

  async syncMonobank() {

    const res = await firstValueFrom(
      this.httpService.get(this.baseUrl, {
        headers: {
          "X-Token": this.token
        }
      })
    )

    console.log('res', res.data)
    return res.data
  }
}
