import { Request, Response } from 'express';
import { Expense } from '../entities/expense';
import { AppDataSource } from "../config/data-source";

export const getExpenses = async (req: Request, res: Response) => {
  try {
    const expenseRepository = AppDataSource.getRepository(Expense);
    const expenses = await expenseRepository.find();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch expenses', error });
  }
};

export const addExpense = async (req: Request, res: Response) => {
  try {
    const expenseRepository = AppDataSource.getRepository(Expense);
    const newExpense = expenseRepository.create(req.body);
    const savedExpense = await expenseRepository.save(newExpense);
    res.status(201).json(savedExpense);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add expense', error });
  }
};

export const updateExpense = async (req: any, res: any) => {
  try {
    const expenseRepository = AppDataSource.getRepository(Expense);
    const expense = await expenseRepository.findOne(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    const updatedExpense = await expenseRepository.save({ ...expense, ...req.body });
    res.status(200).json(updatedExpense);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update expense', error });
  }
};

export const deleteExpense = async (req: any, res: any) => {
  try {
    const expenseRepository = AppDataSource.getRepository(Expense);
    const expense = await expenseRepository.findOne(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    await expenseRepository.remove(expense);
    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete expense', error });
  }
};