import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import dotenv from "dotenv";
import "reflect-metadata";
import expenseRoutes from "./routes/expenseRoutes";
import budgetRoutes from "./routes/budgetRoutes";
import reportRoutes from "./routes/reportRoutes";
import { authMiddleware } from "./middleware/authMiddleware";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/expenses", authMiddleware, expenseRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/reports", authMiddleware, reportRoutes);

export default app;
