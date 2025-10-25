import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
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
    if (!uid) {
      throw new BadRequestException("User id not provided");
    }
    const debts = await this.DebtsRepository.find({
      where: {
        userId: uid,
      },
    });
    return debts;
  }

  async createDebts(dto: CreateDebtDto[]): Promise<Debt[]> {
    if (!dto.length) {
      throw new BadRequestException("Payload did not provided");
    }
    const debts = dto.map((d) =>
      this.DebtsRepository.create({
        //@ts-ignore
        userId: d.userId,
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

  async deleteDebt(id: string) {
    console.log("id", id);
    if (!id) {
      throw new BadRequestException("Debt id not provided");
    }
    const debt = await this.DebtsRepository.findBy({ id });

    if (!debt) {
      throw new NotFoundException(`Debt with id ${id} not found`);
    }

    await this.DebtsRepository.remove(debt);

    return debt;
  }
}
