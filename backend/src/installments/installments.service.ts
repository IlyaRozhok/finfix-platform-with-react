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

  async createInstallment(dtos: CreateInstallmentDto) {
    if (!Array.isArray(dtos) || dtos.length === 0) {
      throw new BadRequestException("Payload must be a non-empty array");
    }
  }
}
