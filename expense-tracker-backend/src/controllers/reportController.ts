import { Parser } from "json2csv";
import ExcelJS from "exceljs";
import { Expense } from "../entities/expense";
import { AppDataSource } from "../config/data-source";
import { Between } from "typeorm";

// CSV Export for Monthly Report
export const getMonthlyReportExport = async (req: any, res: any) => {
  try {
    const userId = req.user.id;
    const { month, year } = req.query;

    // Create date boundaries.
    const startDate = new Date(`${year}-${month}-01`)
      .toISOString()
      .split("T")[0];
    const endDate = new Date(`${year}-${Number(month) + 1}-01`)
      .toISOString()
      .split("T")[0];

    const expenseRepository = AppDataSource.getRepository(Expense);
    const expenses = await expenseRepository.find({
      where: {
        user_id: userId,
        date: Between(startDate, endDate),
      },
    });

    const fields = ["date", "category", "amount", "description"];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(expenses);

    res.header("Content-Type", "text/csv");
    res.attachment("monthly_report.csv");
    return res.send(csv);
  } catch (error) {
    console.error("Error generating monthly CSV report:", error);
    return res.status(500).json({ message: "Failed to fetch monthly report", error });
  }
};
    
// Excel Export for Yearly Report
export const getYearlyReportExport = async (req: any, res: any) => {
  try {
    const userId = req.user.id;
    const { year } = req.query;

    // Define the date boundaries for the entire year.
    const startDate = new Date(`${year}-01-01`).toISOString().split("T")[0];
    const endDate = new Date(`${year}-12-31`).toISOString().split("T")[0];

    const expenseRepository = AppDataSource.getRepository(Expense);
    const expenses = await expenseRepository.find({
      where: {
        user_id: userId,
        date: Between(startDate, endDate),
      },
    });

    // Create an Excel workbook and worksheet.
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Yearly Report");

    // Define columns.
    worksheet.columns = [
      { header: "Date", key: "date", width: 15 },
      { header: "Category", key: "category", width: 15 },
      { header: "Amount", key: "amount", width: 10 },
      { header: "Description", key: "description", width: 30 },
    ];

    // Add rows.
    expenses.forEach((expense) => {
      const formattedDate = new Date(expense.date).toISOString().split("T")[0];
      worksheet.addRow({
        date: formattedDate,
        category: expense.category,
        amount: expense.amount,
        description: expense.description,
      });
    });

    // Write to buffer and send.
    const buffer = await workbook.xlsx.writeBuffer();
    res.header(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.attachment("yearly_report.xlsx");
    return res.send(buffer);
  } catch (error) {
    console.error("Error generating yearly Excel report:", error);
    return res.status(500).json({ message: "Failed to fetch yearly report", error });
  }
};
