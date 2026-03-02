import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import supabase from "../client";

const IncomeChart = (props) => {
  const [incomeData, setIncomeData] = useState([]);
  const [dateRangeText, setDateRangeText] = useState("");

  useEffect(() => {
    const fetchIncome = async () => {
      const uid = props.data.userID;
      const timePeriod = props.data.time?.toLowerCase() || "monthly";
      const today = new Date();
      let dateFrom;

      if (timePeriod === "yearly") {
        dateFrom = new Date(
          today.getFullYear() - 1,
          today.getMonth(),
          today.getDate()
        );
      } else if (timePeriod === "weekly") {
        dateFrom = new Date(today.setDate(today.getDate() - 7));
      } else {
        dateFrom = new Date(today.setDate(today.getDate() - 30));
      }

      const formatDate = (date) =>
        date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      const rangeText =
        timePeriod === "yearly"
          ? `${dateFrom.toLocaleDateString("en-US", { month: "short", year: "numeric" })} - ${new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" })}`
          : `${formatDate(dateFrom)} - ${formatDate(new Date())}`;
      setDateRangeText(rangeText);

      const { data, error } = await supabase
        .from("Transactions Log")
        .select("date, amount")
        .eq("userID", uid)
        .gte("date", dateFrom.toISOString().split("T")[0])
        .gt("amount", 0); // Only positive values = income

      if (error) {
        console.error("Error fetching income data:", error.message);
        return;
      }

      if (!data || data.length === 0) {
        setIncomeData([]);
        return;
      }

      const grouped = {};
      data.forEach(({ date, amount }) => {
        const d = new Date(date);
        const numericAmount = Number(amount);
        let key;

        if (timePeriod === "yearly") {
          key = d.toLocaleString("en-US", { month: "long" });
        } else if (timePeriod === "weekly") {
          key = d.toLocaleDateString("en-US", { weekday: "short" });
        } else {
          key = d.getDate().toString().padStart(2, "0");
        }

        grouped[key] = (grouped[key] || 0) + numericAmount;
      });

      const formatted = Object.entries(grouped).map(
        ([label, total_amount]) => ({
          label,
          total_amount,
        })
      );

      setIncomeData(formatted);
    };

    fetchIncome();
  }, [props.data.time, props.data.userID]);

  return (
    <article className="chart-card">
      <header className="chart-card-header">
        <div>
          <h2 className="chart-title">Income Overview ({props.data.time})</h2>
          <p className="chart-range">{dateRangeText}</p>
        </div>
      </header>
      {incomeData.length > 0 ? (
        <div className="chart-wrap">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={incomeData}>
              <XAxis dataKey="label" tick={{ fontSize: 12 }} />
              <YAxis domain={["auto", "auto"]} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="total_amount" fill="#0e7490" name="Total Income" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="chart-empty">No income records found for this range.</p>
      )}
    </article>
  );
};

export default IncomeChart;
