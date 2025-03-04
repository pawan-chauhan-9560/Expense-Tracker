import { Request, Response } from 'express';

export const getMonthlyReport = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: 'Monthly report generated' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch monthly report', error });
  }
};

export const getYearlyReport = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: 'Yearly report generated' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch yearly report', error });
  }
};