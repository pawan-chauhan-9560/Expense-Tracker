import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getMonthlyReport, getYearlyReport } from "../utils/api";
import * as XLSX from "xlsx";

interface ReportData {
  date: string;
  category: string;
  amount: number;
}

const Reports: React.FC = () => {
  const [monthlyReport, setMonthlyReport] = useState<ReportData[]>([]);
  const [yearlyReport, setYearlyReport] = useState<ReportData[]>([]);
  const [reportType, setReportType] = useState<"monthly" | "yearly">("monthly");

  useEffect(() => {
    fetchReport();
  }, [reportType]);

  const fetchReport = async () => {
    try {
      if (reportType === "monthly") {
        const data = await getMonthlyReport();
        setMonthlyReport(data);
      } else {
        const data = await getYearlyReport();
        setYearlyReport(data);
      }
    } catch (error) {
      console.error("Error fetching report:", error);
    }
  };

  const handleExportToCSV = (data: ReportData[], filename: string) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Report");
    XLSX.writeFile(wb, filename);
  };

  const reportData = reportType === "monthly" ? monthlyReport : yearlyReport;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-indigo-400 to-purple-600 p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-white text-center mb-8"
      >
        Expense Reports
      </motion.h1>

      {/* Report Type Selector */}
      <div className="flex justify-center mb-6">
        {["monthly", "yearly"].map((type) => (
          <motion.button
            key={type}
            onClick={() => setReportType(type as "monthly" | "yearly")}
            className={`px-6 py-3 rounded-lg mx-2 font-semibold transition transform hover:scale-105 shadow-md ${
              reportType === type ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
            whileTap={{ scale: 0.9 }}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)} Report
          </motion.button>
        ))}
      </div>

      {/* Report Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="overflow-x-auto max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg"
      >
        {reportData.length === 0 ? (
          <p className="text-center text-gray-600">No data available.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="text-left p-3">Date</th>
                <th className="text-left p-3">Category</th>
                <th className="text-left p-3">Amount</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="p-3">{item.date}</td>
                  <td className="p-3">{item.category}</td>
                  <td className="p-3 font-semibold text-blue-600">
                    ₹{item.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </motion.div>

      {/* Export Button */}
      {reportData.length > 0 && (
        <div className="text-center mt-6">
          <motion.button
            onClick={() =>
              handleExportToCSV(reportData, `${reportType}-report.xlsx`)
            }
            className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md font-semibold transition transform hover:scale-105 hover:bg-green-600"
            whileTap={{ scale: 0.9 }}
          >
            Export to Excel
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default Reports;
