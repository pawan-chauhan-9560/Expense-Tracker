import { Router } from 'express';
import { getExpenses, addExpense, updateExpense, deleteExpense } from '../controllers/expenseController';

const expenseRouter = Router();

expenseRouter.get('/', getExpenses);
expenseRouter.post('/addExpense', addExpense);
expenseRouter.put('/:id', updateExpense);
expenseRouter.delete('/:id', deleteExpense);

export default expenseRouter;