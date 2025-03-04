import React, { useEffect, useState } from "react";
import {
  getBudgets,
  setBudget,
  updateBudget,
  deleteBudget,
} from "../utils/api";
import { motion } from "framer-motion";

interface Budget {
  id: string;
  category: string;
  limit: number;
}

const Budgets: React.FC = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState<number>(0);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      const data = await getBudgets();
      setBudgets(data);
    } catch (error) {
      console.error("Error fetching budgets:", error);
    }
  };

  const handlesetBudget = async () => {
    if (!category || limit <= 0) return alert("Please enter valid details");

    try {
      const newBudget = await setBudget({ category, limit });
      setBudgets([...budgets, newBudget]);
      setCategory("");
      setLimit(0);
    } catch (error) {
      console.error("Error adding budget:", error);
    }
  };

  const handleUpdateBudget = async () => {
    if (!editingBudget) return;

    try {
      const updatedBudget = await updateBudget(editingBudget.id, {
        category: editingBudget.category,
        limit: editingBudget.limit,
      });

      setBudgets(
        budgets.map((b) => (b.id === updatedBudget.id ? updatedBudget : b))
      );
      setEditingBudget(null);
    } catch (error) {
      console.error("Error updating budget:", error);
    }
  };

  const handleDeleteBudget = async (id: string) => {
    if (!confirm("Are you sure you want to delete this budget?")) return;

    try {
      await deleteBudget(id);
      setBudgets(budgets.filter((b) => b.id !== id));
    } catch (error) {
      console.error("Error deleting budget:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-600 p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-white text-center mb-8"
      >
        Manage Budgets
      </motion.h1>

      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105">
        <input
          type="text"
          placeholder="Category"
          value={editingBudget ? editingBudget.category : category}
          onChange={(e) =>
            editingBudget
              ? setEditingBudget({ ...editingBudget, category: e.target.value })
              : setCategory(e.target.value)
          }
          className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="number"
          placeholder="Budget Limit"
          value={editingBudget ? editingBudget.limit : limit}
          onChange={(e) =>
            editingBudget
              ? setEditingBudget({
                  ...editingBudget,
                  limit: Number(e.target.value),
                })
              : setLimit(Number(e.target.value))
          }
          className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {editingBudget ? (
          <button
            onClick={handleUpdateBudget}
            className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition cursor-pointer"
          >
            Update Budget
          </button>
        ) : (
          <button
            onClick={handlesetBudget}
            className="w-full bg-green-500 text-white py-3 rounded hover:bg-green-600 transition cursor-pointer"
          >
            Add Budget
          </button>
        )}
      </div>

      <div className="mt-8">
        {budgets.length === 0 ? (
          <p className="text-center text-white">No budgets added yet.</p>
        ) : (
          <ul className="max-w-2xl mx-auto">
            {budgets.map((budget) => (
              <motion.li
                key={budget.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white p-4 rounded-lg shadow-md mb-4 flex justify-between items-center hover:shadow-xl transition transform hover:scale-105"
              >
                <div>
                  <p className="font-bold text-gray-700">{budget.category}</p>
                  <p className="text-gray-600">Limit: ₹{budget.limit}</p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => setEditingBudget(budget)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteBudget(budget.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Budgets;
