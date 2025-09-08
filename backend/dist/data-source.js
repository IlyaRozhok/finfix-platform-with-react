"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const envFileMap_1 = require("./shared/envFileMap");
require("dotenv").config({
    path: envFileMap_1.envFileMap[process.env.NODE_ENV || "development"],
});
exports.default = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST || "localhost",
    port: +(process.env.POSTGRES_PORT || 5432),
    username: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "postgres",
    database: process.env.POSTGRES_DB || "finfix",
    entities: ["src/**/*.entity.ts"],
    migrations: ["src/migrations/*.ts"],
    synchronize: false,
    logging: false,
});
//# sourceMappingURL=data-source.js.map