import { BadRequestException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Installment } from "./installment.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateInstallmentDto } from "./dto";
import { addMonths, format, parseISO } from "date-fns";

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

      const interestRate = 1.9;
      const monthlyPayment = Math.floor(
        Number(d.totalAmount) / Number(d.totalPayments)
      );
      const monthlyInteres = (Number(d.totalAmount) / 100) * interestRate;
      console.log("m interes", monthlyInteres);
      const totalInteres = monthlyInteres * d.totalPayments;

      const start = parseISO(d.startDate); // 2024-03-18T00:00:00.000Z
      if (isNaN(start.getTime()))
        throw new BadRequestException("Invalid startDate");
      const end = addMonths(start, Number(d.totalPayments));
      const startDateSQL = format(start, "yyyy-MM-dd");
      const endDateSQL = format(end, "yyyy-MM-dd");
      //@ts-ignore
      const entities = this.installmentRepository.create({
        //@ts-ignore
        userId: d.userId,
        startDate: startDateSQL,
        endDate: endDateSQL,
        totalAmount: d.totalAmount + totalInteres,
        totalPayments: d.totalPayments,
        monthlyPayment: monthlyPayment + monthlyInteres,
        status: d.status ?? "active",

        description: d.description.trim(),
      });
      return entities;
    });

    console.log("SAVED", entities);
    // return await this.installmentRepository.save(entities)
  }
}
