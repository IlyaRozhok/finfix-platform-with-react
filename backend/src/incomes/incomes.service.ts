import { RegularIncomes } from "@/entities/incomes/income-regular.entity";
import { EventIncomes } from "@/entities/incomes/income-event.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateEventIncomeDto, CreateRegularIncomeDto } from "./dto/dto";

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

  async createEventIncome(
    userId: string,
    dto: CreateEventIncomeDto
  ): Promise<EventIncomes> {
    const income = this.eventIncomesRepository.create({
      userId,
      amount: dto.amount,
      description: dto.description,
      date: dto.date, // уже Date
    });

    return await this.eventIncomesRepository.save(income);
  }

  async findOneRegularIncome(userId: string) {
    await this.regularIncomesRepository.findOne({
      where: { userId },
    });
  }

  async deleteRegularIncome(userId: string, id: string) {
    const result = await this.regularIncomesRepository.delete({ userId, id });
    if (result.affected === 0) {
      throw new NotFoundException("Regular income not found");
    }
  }

  async deleteEventIncome(userId: string, id: string) {
    const result = await this.eventIncomesRepository.delete({ userId, id });
    if (result.affected === 0) {
      throw new NotFoundException("Event income not found");
    }
  }
}
