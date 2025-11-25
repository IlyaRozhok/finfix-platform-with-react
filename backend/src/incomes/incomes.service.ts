import { RegularIncomes } from "@/entities/incomes/income-regular.entity";
import { EventIncomes } from "@/entities/incomes/income-event.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class IncomesService {
  constructor(
    @InjectRepository(RegularIncomes)
    private readonly regularIncomesRepository: Repository<RegularIncomes>,

    @InjectRepository(EventIncomes)
    private readonly eventIncomesRepository: Repository<EventIncomes>
  ) {}

  async getRegularIncomes(uid: string) {
    return await this.regularIncomesRepository.find({
      where: {
        userId: uid,
      },
    });
  }

  async getEventIncomes(uid: string) {
    return await this.eventIncomesRepository.find({
      where: {
        userId: uid,
      },
    });
  }
}
