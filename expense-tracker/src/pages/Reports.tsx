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
      // Create a URL for the blob and create a temporary link to download it.
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

      {/* Selectors for month/year */}
      {reportType === "monthly" && (
        <div className="flex justify-center mb-6">
          <input
            type="month"
            value={`${year}-${month}`}
            onChange={(e) => {
              const [newYear, newMonth] = e.target.value.split("-");
              setYear(newYear);
              setMonth(newMonth);
            }}
            className="px-4 py-2 rounded-lg"
          />
        </div>
      )}
      {reportType === "yearly" && (
        <div className="flex justify-center mb-6">
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="px-4 py-2 rounded-lg"
            min="2000"
            max={new Date().getFullYear()}
          />
        </div>
      )}

      {/* Export Button */}
      <div className="text-center mt-6">
        <motion.button
          onClick={handleExportToFile}
          className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md font-semibold transition transform hover:scale-105 hover:bg-green-600"
          whileTap={{ scale: 0.9 }}
        >
          Export Report
        </motion.button>
      </div>
    </div>
  );
};

export default Reports;
