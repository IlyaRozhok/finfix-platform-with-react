import { RegularIncomes } from "@/entities/incomes/income-regular.entity";
import { EventIncomes } from "@/entities/incomes/income-event.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateRegularIncomeDto } from "./dto/dto";

@Injectable()
export class IncomesService {
  constructor(
    @InjectRepository(RegularIncomes)
    private readonly regularIncomesRepository: Repository<RegularIncomes>,

    @InjectRepository(EventIncomes)
    private readonly eventIncomesRepository: Repository<EventIncomes>
  ) {}

  async findRegularIncomes(userId: string) {
    return await this.regularIncomesRepository.find({
      where: {
        userId,
      },
    });
  }

  async findEventIncomes(userId: string) {
    return await this.eventIncomesRepository.find({
      where: {
        userId,
      },
    });
  }

  async createRegularIncomes(
    userId: string,
    dto: CreateRegularIncomeDto
  ): Promise<RegularIncomes> {
    const income = this.regularIncomesRepository.create({
      userId,
      amount: dto.amount,
      description: dto.description,
    });

    return await this.regularIncomesRepository.save(income);
  }

  async findAllIncomes(userId: string) {
    const [regular, events] = await Promise.all([
      this.findRegularIncomes(userId),
      this.findEventIncomes(userId),
    ]);

    return { regular, events };
  }
}
