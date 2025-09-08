"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const categories_module_1 = require("./categories/categories.module");
const debts_module_1 = require("./debts/debts.module");
const recurring_expenses_module_1 = require("./recurring-expenses/recurring-expenses.module");
const recurring_incomes_module_1 = require("./recurring-incomes/recurring-incomes.module");
const installments_module_1 = require("./installments/installments.module");
const transactions_module_1 = require("./transactions/transactions.module");
const envFileMap_1 = require("./shared/envFileMap");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: envFileMap_1.envFileMap[process.env.NODE_ENV ?? "development"],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: "postgres",
                    host: configService.get("POSTGRES_HOST") ?? "localhost",
                    port: parseInt(configService.get("POSTGRES_PORT")),
                    username: configService.get("POSTGRES_USER"),
                    password: configService.get("POSTGRES_PASSWORD"),
                    database: configService.get("POSTGRES_DB"),
                    entities: [__dirname + "/**/*.entity{.ts,.js}"],
                    synchronize: false,
                    autoLoadEntities: true,
                }),
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            categories_module_1.CategoriesModule,
            debts_module_1.DebtsModule,
            recurring_expenses_module_1.RecurringExpensesModule,
            recurring_incomes_module_1.RecurringIncomesModule,
            installments_module_1.InstallmentsModule,
            transactions_module_1.TransactionsModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map