import { Router } from 'express';
import { getBudgets, setBudget, updateBudget, deleteBudget } from '../controllers/budgetController';

const budgetRouter = Router();

budgetRouter.get('/', getBudgets);
budgetRouter.post('/addbudgets', setBudget);
budgetRouter.put('/:id', updateBudget);
budgetRouter.delete('/:id', deleteBudget);

export default budgetRouter;