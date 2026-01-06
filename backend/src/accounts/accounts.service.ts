import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Accounts } from "@/entities/accounts.entity";
import { Repository } from "typeorm";

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Accounts)
    private readonly AccountRepository: Repository<Accounts>
  ) {}

  async create() {

  }
}
