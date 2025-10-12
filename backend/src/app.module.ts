import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { CategoriesModule } from "./onboarding/onboarding.module";
import { DebtsModule } from "./debts/debts.module";
import { RecurringExpensesModule } from "./recurring-expenses/recurring-expenses.module";
import { InstallmentsModule } from "./installments/installments.module";
import { TransactionsModule } from "./transactions/transactions.module";
import { envFileMap } from "./shared/envFileMap";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envFileMap[process.env.NODE_ENV ?? "development"],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>("POSTGRES_HOST") ?? "localhost",
        port: parseInt(configService.get<string>("POSTGRES_PORT")),
        username: configService.get<string>("POSTGRES_USER"),
        password: configService.get<string>("POSTGRES_PASSWORD"),
        database: configService.get<string>("POSTGRES_DB"),
        entities: [__dirname + "/**/*.entity{.ts,.js}"],
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    AuthModule,
    UsersModule,
    CategoriesModule,
    DebtsModule,
    RecurringExpensesModule,
    InstallmentsModule,
    TransactionsModule,
  ],
})
export class AppModule {}
