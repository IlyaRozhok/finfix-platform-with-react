import { Controller, Get } from "@nestjs/common";

@Controller()
export class LivenessController {
  @Get("liveness")
  async liveness() {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
    };
  }
}
