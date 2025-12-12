import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Installment } from "../entities/installment.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateInstallmentDto } from "./dto";
import { addMonths, format, parseISO } from "date-fns";
import { generateInstallment } from "@/installments/lib/generateInstallment";

@Injectable()
export class InstallmentsService {
  constructor(
    @InjectRepository(Installment)
    private readonly installmentRepository: Repository<Installment>,
  ) {}

  async findAll(uid: string): Promise<Installment[]> {
    if (!uid) {
      throw new BadRequestException("User id not provided");
    }
    const installments = await this.installmentRepository.find({
      where: {
        userId: uid,
      },
    });

    return installments;
  }

  async createInstallments(
    dtos: CreateInstallmentDto[],
  ): Promise<Installment[]> {
    if (!Array.isArray(dtos) || dtos.length === 0) {
      throw new BadRequestException("Payload must be a non-empty array");
    }

    const entities = dtos.map((d) => {
      if (d.totalPayments <= 0) {
        throw new BadRequestException("totalPayments must be > 0");
      }

      const interestRate = 1.9;
      const monthlyPayment = Math.floor(
        Number(d.totalAmount) / Number(d.totalPayments),
      );
      const monthlyInteres = (Number(d.totalAmount) / 100) * interestRate;
      const totalInteres = monthlyInteres * d.totalPayments;

      const start = parseISO(d.startDate);
      if (isNaN(start.getTime())) {
        throw new BadRequestException(
          "Invalid startDate format. Expected ISO format: 2024-03-18T00:00:00.000Z",
        );
      }
      const end = addMonths(start, Number(d.totalPayments));
      const startDateSQL = format(start, "yyyy-MM-dd");
      const endDateSQL = format(end, "yyyy-MM-dd");

      const entity = this.installmentRepository.create({
        ...(d.id && { id: d.id }),
        userId: d.userId,
        startDate: startDateSQL,
        endDate: endDateSQL,
        totalAmount: Number(d.totalAmount) + totalInteres,
        totalPayments: d.totalPayments,
        monthlyPayment: monthlyPayment + monthlyInteres,
        description: d.description.trim(),
      });
      return entity;
    });

    return await this.installmentRepository.save(entities);
  }

  async createInstallment(dto: CreateInstallmentDto) {
    const entity = generateInstallment(dto);
    const installmentEntity = this.installmentRepository.create(entity);
    return await this.installmentRepository.save(installmentEntity);
  }

  async update(dto: Partial<CreateInstallmentDto>, userId: string, id: string) {
    const currentInstallment = await this.installmentRepository.findOne({where: {id, userId}});
    Object.assign(currentInstallment, dto);
    const updatedInstallment = generateInstallment(currentInstallment)
    Object.assign(currentInstallment, updatedInstallment);

    return this.installmentRepository.save(currentInstallment);
  }

  async delete(id: string, userId: string) {
    const result = await this.installmentRepository.delete({ id, userId });

    if (result.affected === 0) {
      throw new NotFoundException("Installment not found");
    }
  }
}
