import { DataSource } from "typeorm";
import { User } from "../entities/user";
import { Expense } from "../entities/expense";
import { Budget } from "../entities/budget";
import { Report } from "../entities/report";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "ep-sweet-credit-a81zq8ke-pooler.eastus2.azure.neon.tech",
  port: 5432,
  username: "neondb_owner",
  password: "npg_6KkdV9pbSuDR",
  database: "neondb",
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: true,
  logging: false,
  entities: [User, Expense, Budget, Report], 
});
