import { BadRequestException, Injectable } from "@nestjs/common";
import { Debt } from "./debt.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateDebtDto } from "./dto";

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
  // :Promise<Debt[]>
  async createDebts(dto: CreateDebtDto[]) {
    if (!dto.length) {
      throw new BadRequestException("Payload did not provided");
    }
    const debts = dto.map((d) =>
      this.DebtsRepository.create({
        //@ts-ignore
        userId: d.userId as any,
        description: d.description ?? null,
        interest: Number(d.interest),
        totalDebt: Number(d.totalDebt),
        debtType: "credit_card",
        monthlyPayment: (Number(d.totalDebt) * Number(d.interest)) / 100,
        isClosed: false,
      })
    );

    return await this.DebtsRepository.save(debts);
  }
}
