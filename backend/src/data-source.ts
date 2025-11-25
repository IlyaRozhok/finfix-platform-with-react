import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { envFileMap } from "./shared/envFileMap";

require("dotenv").config({
  path: envFileMap[process.env.NODE_ENV || "development"],
});

export default new DataSource({
  type: "postgres",
  host: process.env.PG_HOST || "localhost",
  port: +(process.env.PG_PORT || 5432),
  username: process.env.PG_USER || "postgres",
  password: process.env.PG_PASSWORD || "postgres",
  database: process.env.PG_DBNAME || "finfix",
  entities: ["src/**/*.entity.ts"],
  migrations: ["src/migrations/*.ts"],
  synchronize: true,
  logging: false,
});
