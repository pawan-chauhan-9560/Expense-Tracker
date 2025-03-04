import { Router } from 'express';
import { getMonthlyReportExport, getYearlyReportExport } from '../controllers/reportController';

const reportRouter = Router();

reportRouter.get('/monthly', getMonthlyReportExport);
reportRouter.get('/yearly', getYearlyReportExport);

export default reportRouter;