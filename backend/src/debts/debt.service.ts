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

  async updateDebts(dto: CreateDebtDto[]): Promise<Debt[]> {
    if (!dto.length) {
      throw new BadRequestException("Payload did not provided");
    }

    const userId = dto[0]?.userId;
    if (!userId) {
      throw new BadRequestException("User ID is required");
    }

    const results: Debt[] = [];

    for (const debtDto of dto) {
      if (debtDto.id) {
        const existingDebt = await this.DebtsRepository.findOne({
          where: { id: debtDto.id, userId },
        });

        if (existingDebt) {
          existingDebt.interest = debtDto.interest;
          existingDebt.totalDebt = debtDto.totalDebt;
          existingDebt.description = debtDto.description || "";
          results.push(await this.DebtsRepository.save(existingDebt));
        } else {
          const newDebt = this.DebtsRepository.create(debtDto);
          results.push(await this.DebtsRepository.save(newDebt));
        }
      } else {
        const newDebt = this.DebtsRepository.create(debtDto);
        results.push(await this.DebtsRepository.save(newDebt));
      }
    }

    return results;
  }
}
