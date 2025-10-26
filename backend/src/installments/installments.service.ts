import { BadRequestException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Installment } from "./installment.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateInstallmentDto } from "./dto";

@Injectable()
export class InstallmentsService {
  constructor(
    @InjectRepository(Installment)
    private readonly installmentRepository: Repository<Installment>
  ) {}

  async createInstallment(dtos: CreateInstallmentDto[]) {
    if (!Array.isArray(dtos) || dtos.length === 0) {
      throw new BadRequestException("Payload must be a non-empty array");
    }

    const entities = dtos.map((d) => {
      if (d.totalPayments <= 0) {
        throw new BadRequestException("totalPayments must be > 0");
      }

      const monthlyPayment = Math.floor(d.totalAmount / d.totalPayments);

      return this.installmentRepository.create({
        //@ts-ignore
        userId: d.userId,
        startDate: d.startDate,
        totalAmount: d.totalAmount,
        totalPayments: d.totalPayments,
        monthlyPayment,
        isClosed: d.isClosed ?? false,
        description: d.description.trim(),
      });
    });
    console.log("entities", entities);
  }
}
