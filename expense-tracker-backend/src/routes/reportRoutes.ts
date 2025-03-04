import { Router } from 'express';
import { getMonthlyReport, getYearlyReport } from '../controllers/reportController';

const reportRouter = Router();

reportRouter.get('/monthly', getMonthlyReport);
reportRouter.get('/yearly', getYearlyReport);

export default reportRouter;