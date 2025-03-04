// Reports.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { getMonthlyReport, getYearlyReport } from "../utils/api";

const Reports: React.FC = () => {
  const [reportType, setReportType] = useState<"monthly" | "yearly">("monthly");
  const [month, setMonth] = useState("01"); // default month (January)
  const [year, setYear] = useState(new Date().getFullYear().toString());

  // Function to download file using blob response
  const handleExportToFile = async () => {
    try {
      let blob;
      let filename = "";
      if (reportType === "monthly") {
        blob = await getMonthlyReport(month, year);
        filename = "monthly_report.csv";
      } else {
        blob = await getYearlyReport(year);
        filename = "yearly_report.xlsx";
      }
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading report:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 p-4 sm:p-6 md:p-8 rounded-3xl">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-4xl sm:text-5xl font-extrabold text-white text-center mb-10 drop-shadow-lg"
      >
        Expense Reports
      </motion.h1>

      {/* Report Type Selector */}
      <div className="flex flex-col sm:flex-row justify-center items-center mb-8 w-full max-w-lg">
        {["monthly", "yearly"].map((type) => (
          <motion.button
            key={type}
            onClick={() => setReportType(type as "monthly" | "yearly")}
            className={`w-full sm:w-auto px-6 py-3 m-2 rounded-xl font-bold transition-all shadow-xl focus:outline-none focus:ring-4 ${
              reportType === type
                ? "bg-white text-gray-900 scale-105 ring-yellow-400"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)} Report
          </motion.button>
        ))}
      </div>

      {/* Selectors for month/year */}
      {reportType === "monthly" && (
        <div className="flex justify-center mb-8 w-full max-w-sm">
          <input
            type="month"
            value={`${year}-${month}`}
            onChange={(e) => {
              const [newYear, newMonth] = e.target.value.split("-");
              setYear(newYear);
              setMonth(newMonth);
            }}
            className="w-full px-4 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-yellow-300 shadow-md"
          />
        </div>
      )}
      {reportType === "yearly" && (
        <div className="flex justify-center mb-8 w-full max-w-xs">
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full px-4 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-yellow-300 shadow-md"
            min="2000"
            max={new Date().getFullYear()}
          />
        </div>
      )}

      {/* Export Button */}
      <div className="w-full flex justify-center mt-6">
        <motion.button
          onClick={handleExportToFile}
          className="w-full sm:w-auto bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-4 rounded-xl shadow-2xl font-bold transition-all focus:outline-none focus:ring-4 focus:ring-green-300"
          whileHover={{ scale: 1.05, backgroundColor: "#2dbe6c" }}
          whileTap={{ scale: 0.95 }}
        >
          Export Report
        </motion.button>
      </div>
    </div>
  );
};

export default Reports;
