import { Budget } from "../entities/budget";
import { AppDataSource } from "../config/data-source";

export const getBudgets = async (req: any, res: any) => {
  try {
    const budgetRepository = AppDataSource.getRepository(Budget);
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No user ID provided" });    }

    const budgets = await budgetRepository.find({ where: { user_id: userId } });
    res.status(200).json(budgets);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch budgets", error });
  }
};

export const setBudget = async (req: any, res: any) => {
  try {
    const budgetRepository = AppDataSource.getRepository(Budget);
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No user ID found" });
    }
    const newBudget = budgetRepository.create({
      ...req.body,
      user_id: userId,
    });
    const savedBudget = await budgetRepository.save(newBudget);
    res.status(201).json(savedBudget);
  } catch (error) {
    res.status(500).json({ message: "Failed to set budget", error });
  }
};

export const updateBudget = async (req: any, res: any) => {
  try {
    const budgetRepository = AppDataSource.getRepository(Budget);
    const budget = await budgetRepository.findOne({
      where: { id: req.params.id },
    });
    
    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }
    const updatedBudget = await budgetRepository.save({
      ...budget,
      ...req.body,
    });
    res.status(200).json(updatedBudget);
  } catch (error) {
    res.status(500).json({ message: "Failed to update budget", error });
  }
};

export const deleteBudget = async (req: any, res: any) => {
  try {
    const budgetRepository = AppDataSource.getRepository(Budget);
    const budget = await budgetRepository.findOne({
      where: { id: req.params.id },
    });
    
    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }
    await budgetRepository.remove(budget);
    res.status(200).json({ message: "Budget deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete budget", error });
  }
};
