import { Injectable } from "@nestjs/common";
import { Debt } from "./debt.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class DebtsService {
  constructor(
    @InjectRepository(Debt)
    private readonly DebtsRepository: Repository<Debt>
  ) {}

  async getDebts(uid: string) {
    console.log("uid", uid);
    // if (!uid) {
    //   throw new BadRequestException("User id not provided");
    // }
    const debts = await this.DebtsRepository.find({
      where: {
        userId: uid,
      },
    });

    return debts;
  }
}
