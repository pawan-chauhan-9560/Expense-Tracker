import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { getExpenses, getBudgets } from "../utils/api";
import { motion } from "framer-motion";

interface Expense {
  id: string;
  amount: number;
  category: string;
}

interface Budget {
  id: string;
  category: string;
  limit: number;
}

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [remainingBudget, setRemainingBudget] = useState(0);
  const [categorySummary, setCategorySummary] = useState<
    Record<string, number>
  >({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expensesData = await getExpenses();
        const budgetsData = await getBudgets();

        setExpenses(expensesData);
        setBudgets(budgetsData);

        const total = expensesData.reduce(
          (sum: any, expense: any) => sum + Number(expense.amount),
          0
        );
        setTotalExpenses(total);

        const totalBudget = budgetsData.reduce(
          (sum: any, budget: any) => sum + Number(budget.limit),
          0
        );
        setRemainingBudget(totalBudget - total);

        const summary: Record<string, number> = {};
        expensesData.forEach((expense: any) => {
          const amount = Number(expense.amount);
          summary[expense.category] = (summary[expense.category] || 0) + amount;
        });
        setCategorySummary(summary);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 p-6">
      <main className="flex-grow w-full max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-white text-center mb-8"
        >
          Welcome, {user?.email}!
        </motion.h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-8 rounded-3xl shadow-xl text-center hover:shadow-2xl transition transform hover:scale-105"
          >
            <h2 className="text-lg font-semibold text-gray-700">
              Total Expenses
            </h2>
            <p className="text-4xl font-bold text-blue-700">₹{totalExpenses}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white p-8 rounded-3xl shadow-xl text-center hover:shadow-2xl transition transform hover:scale-105"
          >
            <h2 className="text-lg font-semibold text-gray-700">
              Remaining Budget
            </h2>
            <p className="text-4xl font-bold text-green-700">
              ₹{remainingBudget}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white p-8 rounded-3xl shadow-xl text-center hover:shadow-2xl transition transform hover:scale-105"
          >
            <h2 className="text-lg font-semibold text-gray-700">
              Category Summary
            </h2>
            <ul className="text-base text-gray-600 space-y-2">
              {Object.entries(categorySummary).length === 0 ? (
                <p className="text-gray-500">No expenses yet.</p>
              ) : (
                Object.entries(categorySummary).map(([category, amount]) => (
                  <li
                    key={category}
                    className="font-medium flex justify-between border-b pb-2 border-gray-200"
                  >
                    <span>{category}</span>{" "}
                    <span className="font-bold text-indigo-600">₹{amount}</span>
                  </li>
                ))
              )}
            </ul>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
