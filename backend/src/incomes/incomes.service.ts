import { Incomes } from "@/entities/incomes/income-regular.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class IncomesService {
  constructor(
    @InjectRepository(Incomes)
    private readonly incomesRepository: Repository<Incomes>
  ) {}

  async getIncomes(uid: string) {
    return await this.incomesRepository.find({
      where: {
        userId: uid,
      },
    });
  }
}
