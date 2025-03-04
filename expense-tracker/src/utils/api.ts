import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const registerUser = async (email: string, password: string) => {
  const response = await api.post("/auth/register", { email, password });
  return response.data;
};

export const loginUser = async (email: string, password: string) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

// Expense APIs
export const getExpenses = async () => {
  const response = await api.get("/expenses");
  return response.data;
};

export const addExpense = async (expense: {
  description: string;
  amount: number;
  category: string;
  date: string;
}) => {
  const response = await api.post("/expenses/addExpense", expense);
  return response.data;
};

export const updateExpense = async (id: string, updatedExpense: object) => {
  const response = await api.put(`/expenses/${id}`, updatedExpense);
  return response.data;
};

export const deleteExpense = async (id: string) => {
  const response = await api.delete(`/expenses/${id}`);
  return response.data;
};

// Budget APIs
export const getBudgets = async () => {
  const response = await api.get("/budgets");
  return response.data;
};

export const setBudget = async (budget: {
  category: string;
  limit: number;
}) => {
  const response = await api.post("/budgets/addbudgets", budget);
  return response.data;
};

export const updateBudget = async (id: string, updatedBudget: object) => {
  const response = await api.put(`/budgets/${id}`, updatedBudget);
  return response.data;
};

export const deleteBudget = async (id: string) => {
  const response = await api.delete(`/budgets/${id}`);
  return response.data;
};

//Reports

// api.ts
// ../utils/api.ts
export const getMonthlyReport = async (month: string, year: string) => {
  const response = await api.get(
    `/reports/monthly?month=${month}&year=${year}`,
    { responseType: "blob" } // specify blob response
  );
  return response.data;
};

export const getYearlyReport = async (year: string) => {
  const response = await api.get(`/reports/yearly?year=${year}`, {
    responseType: "blob", // specify blob response
  });
  return response.data;
};

