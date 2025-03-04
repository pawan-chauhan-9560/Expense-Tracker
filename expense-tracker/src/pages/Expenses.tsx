import React, { useEffect, useState } from "react";
import {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
} from "../utils/api";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

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
  const [filter, setFilter] = useState({ date: "", category: "", amount: "" });

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

  const handleAddOrUpdateExpense = async () => {
    if (!description || amount <= 0 || !category || !date) {
     return Swal.fire({
        icon: "info",
        title: "info",
        text: "Please fill all fields..",
      });
    }
    try {
      if (editingExpense) {
        const updatedExpense = await updateExpense(editingExpense.id, {
          description,
          amount,
          category,
          date,
        });
        setExpenses(
          expenses.map((exp) =>
            exp.id === updatedExpense.id ? updatedExpense : exp
          )
        );
        Swal.fire({
          icon: "info",
          title: "info",
          text: "Data updated succefully..",
        });
      } else {
        const newExpense = await addExpense({
          description,
          amount,
          category,
          date,
        });
        setExpenses([...expenses, newExpense]);
        fetchExpenses();
        Swal.fire({
          icon: "info",
          title: "info",
          text: "Data Save succefully..",
        });
      }
      clearForm();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message || "Something went wrong!",
      });
    }
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
    setDescription(expense.description);
    setAmount(expense.amount);
    setCategory(expense.category);
    setDate(expense.date);
  };

  const handleDeleteExpense = async (id: string) => {
    try {
      await deleteExpense(id);
      setExpenses(expenses.filter((exp) => exp.id !== id));
      Swal.fire({
        icon: "info",
        title: "info",
        text: "Data deleted succefully...",
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message || "Something went wrong!",
      });
    }
  };

  const clearForm = () => {
    setDescription("");
    setAmount(0);
    setCategory("");
    setDate("");
    setEditingExpense(null);
  };

  const filteredExpenses = expenses.filter(
    (exp) =>
      (!filter.date || exp.date === filter.date) &&
      (!filter.category ||
        exp.category.toLowerCase().includes(filter.category.toLowerCase())) &&
      (!filter.amount || exp.amount.toString().includes(filter.amount))
  );

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
          onClick={handleAddOrUpdateExpense}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 cursor-pointer"
        >
          {editingExpense ? "Update Expense" : "Add Expense"}
        </button>
      </motion.div>

      <div className="max-w-4xl mx-auto mt-8 overflow-x-auto">
        <div className="flex flex-wrap gap-4 mb-4">
          <input
            type="date"
            placeholder="Filter by Date"
            onChange={(e) => setFilter({ ...filter, date: e.target.value })}
            className="p-2 border rounded w-full sm:w-auto"
          />
          <input
            type="text"
            placeholder="Filter by Category"
            onChange={(e) => setFilter({ ...filter, category: e.target.value })}
            className="p-2 border rounded w-full sm:w-auto"
          />
          <input
            type="text"
            placeholder="Filter by Amount"
            onChange={(e) => setFilter({ ...filter, amount: e.target.value })}
            className="p-2 border rounded w-full sm:w-auto"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3">Description</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Category</th>
                <th className="p-3">Date</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((exp,index) => (
                <tr key={exp?.id || index} className="border-b">
                  <td className="p-3">{exp.description}</td>
                  <td className="p-3">₹{exp.amount}</td>
                  <td className="p-3">{exp.category}</td>
                  <td className="p-3">{exp.date}</td>
                  <td className="p-3 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <button
                      onClick={() => handleEditExpense(exp)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteExpense(exp.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
