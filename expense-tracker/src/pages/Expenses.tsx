import React, { useEffect, useState } from "react";
import {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
} from "../utils/api";
import { motion } from "framer-motion";

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
}

const Expenses: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const handleAddExpense = async () => {
    if (!description || amount <= 0 || !category || !date)
      return alert("Please fill all fields");
    try {
      const newExpense = await addExpense({
        description,
        amount,
        category,
        date,
      });
      setExpenses([...expenses, newExpense]);
      clearForm();
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const clearForm = () => {
    setDescription("");
    setAmount(0);
    setCategory("");
    setDate("");
    setEditingExpense(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-600 p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-white text-center mb-8"
      >
        Manage Expenses
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg"
      >
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          onClick={handleAddExpense}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 cursor-pointer"
        >
          Add Expense
        </button>
      </motion.div>
    </div>
  );
};

export default Expenses;
