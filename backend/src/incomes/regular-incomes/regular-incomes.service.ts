import { RegularIncomes } from "@/entities/incomes/income-regular.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {
  CreateRegularIncomeDto,
  UpdateRegularIncomeDto,
  ResRegularIncomesDto,
  CreateRegularIncomeResDto,
} from "./dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class RegularIncomesService {
  constructor(
    @InjectRepository(RegularIncomes)
    private readonly regularIncomesRepository: Repository<RegularIncomes>
  ) {}

  async getAll(userId: string) {
    const incomes = await this.regularIncomesRepository.find({
      where: {
        userId,
      },
    });

    return plainToInstance(ResRegularIncomesDto, incomes, {
      excludeExtraneousValues: true,
    });
  }

  async create(userId: string, dto: CreateRegularIncomeDto) {
    const income = this.regularIncomesRepository.create({
      userId,
      amount: dto.amount,
      description: dto.description,
    });

    const savedIncome = await this.regularIncomesRepository.save(income);

    return plainToInstance(CreateRegularIncomeResDto, savedIncome, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(userId: string, id: string) {
    const income = await this.regularIncomesRepository.findOne({
      where: { id, userId },
    });

    if (!income) {
      throw new NotFoundException("Regular income not found");
    }

    return plainToInstance(ResRegularIncomesDto, income, {
      excludeExtraneousValues: true,
    });
  }

  async delete(userId: string, id: string) {
    const result = await this.regularIncomesRepository.delete({ userId, id });
    if (result.affected === 0) {
      throw new NotFoundException("Regular income not found");
    }
  }

  async update(userId: string, id: string, dto: UpdateRegularIncomeDto) {
    const income = await this.regularIncomesRepository.findOne({
      where: { id, userId },
    });

    if (!income) {
      throw new NotFoundException("Regular income not found");
    }

    Object.assign(income, dto);
    const updatedIncome = await this.regularIncomesRepository.save(income);

    return plainToInstance(UpdateRegularIncomeDto, updatedIncome, {
      excludeExtraneousValues: true,
    });
  }
}
