import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Accounts } from "@/entities/accounts.entity";
import { Repository } from "typeorm";
import { CreateAccountDto, AccountsResDto } from "@/accounts/dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Accounts)
    private readonly AccountRepository: Repository<Accounts>,
  ) {}

  async create(dto: CreateAccountDto, userId: string) {
    const newAccount = this.AccountRepository.create({ ...dto, userId });
    return await this.AccountRepository.save(newAccount)
  }

  async findAll(userId: string) {
    const accounts = await this.AccountRepository.find({
      where: {
        userId
      },
      order: {
        type: "DESC"
      }
    })

    if (!accounts.length) {
      throw new NotFoundException("Accounts not found")
    }

    return plainToInstance(AccountsResDto, accounts, {
      excludeExtraneousValues: true
    });
  }
}
