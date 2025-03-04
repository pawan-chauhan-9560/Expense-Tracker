import { DataSource } from "typeorm";
import { User } from "../entities/user";
import { Expense } from "../entities/expense";
import { Budget } from "../entities/budget";
import { Report } from "../entities/report";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as any, 
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  username: process.env.DB_USERNAME?.trim(), 
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: true,
  logging: false,
  entities: [User, Expense, Budget, Report],
});
